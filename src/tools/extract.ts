import type { ExtractedBiomarker, ExtractionRequest, ExtractionResponse } from "../types.js";
import { REFERENCE_RANGES, normalizeToStandardName } from "../data/reference-ranges.js";

// ─── Build a flat alias → standardName lookup ──────────────

const ALIAS_MAP = new Map<string, string>();
for (const range of REFERENCE_RANGES) {
  ALIAS_MAP.set(range.standardName.toLowerCase(), range.standardName);
  for (const alias of range.aliases) {
    ALIAS_MAP.set(alias.toLowerCase(), range.standardName);
  }
}

// ─── Regex patterns for different blood report formats ─────

// Pattern 1: "Biomarker Name : 12.5 g/dL  (13.0 - 17.0)"
// Pattern 2: "Biomarker Name    12.5   g/dL   13.0-17.0"
// Pattern 3: "Biomarker Name: 12.5 g/dL"  (no reference range)
// Pattern 4: Table format "Hemoglobin | 12.5 | g/dL | 13.0-17.0"

const VALUE_PATTERN = /(\d+\.?\d*)/;
const UNIT_PATTERN =
  /(g\/dL|mg\/dL|mmol\/L|µIU\/mL|mIU\/L|ng\/mL|ng\/dL|pg\/mL|µg\/dL|cells\/µL|million\/µL|%|fL|pg|U\/L|mm\/hr|mEq\/L|mL\/min\/1\.73m²|10\^3\/µL|10\^6\/µL|thou\/µL|mill\/µL)/i;
const RANGE_PATTERN = /(\d+\.?\d*)\s*[-–—to]\s*(\d+\.?\d*)/;

export function extractBiomarkers(request: ExtractionRequest): ExtractionResponse {
  const { report_text } = request;
  const lines = report_text.split("\n").map((l) => l.trim()).filter(Boolean);
  const biomarkers: ExtractedBiomarker[] = [];
  const notes: string[] = [];
  const seenBiomarkers = new Set<string>();

  for (const line of lines) {
    const lineLower = line.toLowerCase();

    // Try to match each known biomarker alias in this line
    for (const [alias, standardName] of ALIAS_MAP) {
      if (seenBiomarkers.has(standardName)) continue;

      // Check if alias appears in line (word boundary aware)
      const aliasRegex = new RegExp(`(?:^|[\\s|:,;])${escapeRegex(alias)}(?:[\\s|:,;]|$)`, "i");
      if (!aliasRegex.test(lineLower) && !lineLower.startsWith(alias)) continue;

      // Extract numeric value after the biomarker name
      const afterName = line.substring(lineLower.indexOf(alias) + alias.length);
      const valueMatch = afterName.match(VALUE_PATTERN);
      if (!valueMatch) continue;

      const value = parseFloat(valueMatch[1]);
      if (isNaN(value)) continue;

      // Extract unit
      const unitMatch = afterName.match(UNIT_PATTERN);
      const unit = unitMatch ? unitMatch[1] : guessUnit(standardName);

      // Extract reference range
      const rangeMatch = afterName.match(RANGE_PATTERN);
      const referenceRange = rangeMatch ? `${rangeMatch[1]}-${rangeMatch[2]}` : null;

      biomarkers.push({
        name: findOriginalCase(line, alias),
        standardName,
        value,
        unit,
        referenceRange,
      });

      seenBiomarkers.add(standardName);
      break; // Move to next line once we've extracted from this one
    }
  }

  // Also try a general-purpose table/CSV-style parser
  const tableBiomarkers = parseTableFormat(report_text, seenBiomarkers);
  biomarkers.push(...tableBiomarkers);

  if (biomarkers.length === 0) {
    notes.push(
      "No biomarkers could be extracted. The report format may not be supported, or the text may need OCR preprocessing."
    );
  }

  return {
    biomarkers,
    extraction_notes: notes,
    total_found: biomarkers.length,
  };
}

// ─── Table format parser (pipe/tab-separated) ──────────────

function parseTableFormat(
  text: string,
  alreadyFound: Set<string>
): ExtractedBiomarker[] {
  const results: ExtractedBiomarker[] = [];
  // Match lines with pipes or tabs
  const tableLines = text
    .split("\n")
    .filter((l) => l.includes("|") || l.includes("\t"));

  for (const line of tableLines) {
    const cells = line.split(/[|\t]/).map((c) => c.trim()).filter(Boolean);
    if (cells.length < 2) continue;

    for (const cell of cells) {
      const cellLower = cell.toLowerCase().trim();
      const standardName = ALIAS_MAP.get(cellLower);
      if (!standardName || alreadyFound.has(standardName)) continue;

      // Find numeric value in remaining cells
      const valueCells = cells.filter((c) => c !== cell);
      const numericCell = valueCells.find((c) => /^\d+\.?\d*$/.test(c.trim()));
      if (!numericCell) continue;

      const value = parseFloat(numericCell);
      const unitCell = valueCells.find((c) => UNIT_PATTERN.test(c));
      const rangeCell = valueCells.find((c) => RANGE_PATTERN.test(c));

      results.push({
        name: cell,
        standardName,
        value,
        unit: unitCell?.match(UNIT_PATTERN)?.[1] ?? guessUnit(standardName),
        referenceRange: rangeCell?.match(RANGE_PATTERN)
          ? `${rangeCell.match(RANGE_PATTERN)![1]}-${rangeCell.match(RANGE_PATTERN)![2]}`
          : null,
      });
      alreadyFound.add(standardName);
      break;
    }
  }
  return results;
}

// ─── Utility helpers ───────────────────────────────────────

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\\/]/g, "\\$&");
}

function findOriginalCase(line: string, alias: string): string {
  const idx = line.toLowerCase().indexOf(alias);
  if (idx === -1) return alias;
  return line.substring(idx, idx + alias.length);
}

function guessUnit(standardName: string): string {
  const range = REFERENCE_RANGES.find((r) => r.standardName === standardName);
  return range?.unit ?? "unknown";
}
