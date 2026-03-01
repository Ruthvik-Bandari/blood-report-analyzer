import type { ExtractedBiomarker, ExtractionResult } from "../types.js";
import { REFERENCE_RANGES } from "../data/reference-ranges.js";

// ─── Extraction Patterns ──────────────────────────────────────────
// Blood reports have varied formats. We use multiple regex strategies:
// 1. Table rows: "Biomarker Name    12.5    mg/dL    (13.0 - 17.0)"
// 2. Key-value:  "Hemoglobin: 12.5 g/dL"
// 3. Inline:     "Hemoglobin 12.5 g/dL [13.0-17.0]"

const UNITS_PATTERN =
  /(?:g\/dL|mg\/dL|mmol\/L|µIU\/mL|mIU\/L|ng\/mL|ng\/dL|pg\/mL|µg\/dL|µg\/L|cells\/µL|million\/µL|×10[³3]\/µL|10\^3\/µL|%|fL|pg|U\/L|mm\/hr|mEq\/L|mL\/min\/1\.73m²|IU\/L|pmol\/L)/i;

const REFERENCE_RANGE_PATTERN =
  /[\[\(]?\s*(\d+\.?\d*)\s*[-–—to]+\s*(\d+\.?\d*)\s*[\]\)]?/;

/**
 * Build a lookup map of alias → reference range entry for fast matching.
 */
function buildAliasMap(): Map<string, (typeof REFERENCE_RANGES)[number]> {
  const map = new Map<string, (typeof REFERENCE_RANGES)[number]>();
  for (const ref of REFERENCE_RANGES) {
    map.set(ref.name.toLowerCase(), ref);
    for (const alias of ref.aliases) {
      map.set(alias.toLowerCase(), ref);
    }
  }
  return map;
}

const ALIAS_MAP = buildAliasMap();

/**
 * Attempts to match a text fragment to a known biomarker.
 */
function matchBiomarker(
  text: string
): (typeof REFERENCE_RANGES)[number] | null {
  const normalized = text.toLowerCase().trim();

  // Direct match
  if (ALIAS_MAP.has(normalized)) {
    return ALIAS_MAP.get(normalized)!;
  }

  // Substring match — find the longest alias that matches
  let bestMatch: (typeof REFERENCE_RANGES)[number] | null = null;
  let bestLength = 0;
  for (const [alias, ref] of ALIAS_MAP) {
    if (normalized.includes(alias) && alias.length > bestLength) {
      bestMatch = ref;
      bestLength = alias.length;
    }
  }

  return bestMatch;
}

/**
 * Extracts biomarkers from blood report text using multi-strategy parsing.
 */
export function extractBiomarkers(reportText: string): ExtractionResult {
  const biomarkers: ExtractedBiomarker[] = [];
  const errors: string[] = [];
  const seen = new Set<string>();

  const lines = reportText.split("\n");

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.length < 3) continue;

    // Strategy 1: Try to match a known biomarker name in this line
    const matched = matchBiomarker(trimmed);
    if (!matched) continue;

    // Already extracted this biomarker? Skip duplicate
    if (seen.has(matched.name)) continue;

    // Extract numeric value — find a number that's NOT part of a reference range
    // We look for standalone numbers in the line
    const numberMatches = [...trimmed.matchAll(/(?<!\d[.\-–—])\b(\d+\.?\d*)\b/g)];
    if (numberMatches.length === 0) continue;

    // The first reasonable number is usually the value
    // Skip numbers that are clearly part of the biomarker name
    let value: number | null = null;
    for (const match of numberMatches) {
      const num = parseFloat(match[1]);
      // Skip obviously wrong values (like "12" from "Vitamin B12")
      if (match.index !== undefined) {
        const before = trimmed.slice(0, match.index);
        // If the number appears to be part of a biomarker name (e.g., B12, T3, T4), skip
        if (/[A-Za-z]$/.test(before.trim()) && num < 20) continue;
      }
      value = num;
      break;
    }

    if (value === null) continue;

    // Extract unit
    const unitMatch = trimmed.match(UNITS_PATTERN);
    const unit = unitMatch ? unitMatch[0] : matched.unit;

    // Extract reference range from the line
    let referenceRange: string | null = null;
    const refRangeMatch = trimmed.match(REFERENCE_RANGE_PATTERN);
    if (refRangeMatch) {
      referenceRange = `${refRangeMatch[1]} - ${refRangeMatch[2]}`;
    }

    seen.add(matched.name);
    biomarkers.push({
      name: matched.name,
      value,
      unit,
      referenceRange,
    });
  }

  // If line-by-line parsing found very few, try a more aggressive whole-text approach
  if (biomarkers.length < 3) {
    for (const ref of REFERENCE_RANGES) {
      if (seen.has(ref.name)) continue;

      // Check if any alias appears in the full text
      const fullTextLower = reportText.toLowerCase();
      const aliasFound = ref.aliases.find((a) => fullTextLower.includes(a));
      if (!aliasFound) continue;

      // Find the alias position and look for a number nearby
      const idx = fullTextLower.indexOf(aliasFound);
      const nearby = reportText.slice(idx, idx + 120);
      const numMatch = nearby.match(/(\d+\.?\d*)\s*/);
      if (!numMatch) continue;

      const value = parseFloat(numMatch[1]);
      // Sanity check: avoid matching single digits or very large numbers that are likely not biomarker values
      if (value === 0 || (value < 0.01 && ref.normalRange.low > 0.1)) continue;

      const unitMatch = nearby.match(UNITS_PATTERN);

      seen.add(ref.name);
      biomarkers.push({
        name: ref.name,
        value,
        unit: unitMatch ? unitMatch[0] : ref.unit,
        referenceRange: null,
      });
    }
  }

  return {
    success: biomarkers.length > 0,
    biomarkers,
    rawCount: biomarkers.length,
    errors,
  };
}
