import type {
  ClassifiedBiomarker,
  ClassificationRequest,
  ClassificationResponse,
  SeverityStatus,
  ExtractedBiomarker,
} from "../types.js";
import { findReferenceRange } from "../data/reference-ranges.js";

export function classifyBiomarkers(
  request: ClassificationRequest
): ClassificationResponse {
  const classifications: ClassifiedBiomarker[] = [];

  for (const biomarker of request.biomarkers) {
    const classification = classifySingle(biomarker);
    classifications.push(classification);
  }

  // Build summary
  const summary = {
    total: classifications.length,
    normal: classifications.filter((c) => c.status === "NORMAL").length,
    low: classifications.filter((c) => c.status === "LOW").length,
    high: classifications.filter((c) => c.status === "HIGH").length,
    critical: classifications.filter(
      (c) => c.status === "CRITICAL_LOW" || c.status === "CRITICAL_HIGH"
    ).length,
  };

  return { classifications, summary };
}

function classifySingle(biomarker: ExtractedBiomarker): ClassifiedBiomarker {
  const ref = findReferenceRange(biomarker.standardName);

  // If no reference range found, try parsing from the report itself
  let refMin: number;
  let refMax: number;

  if (ref) {
    refMin = ref.min;
    refMax = ref.max;
  } else if (biomarker.referenceRange) {
    const parts = biomarker.referenceRange.split("-").map((s) => parseFloat(s.trim()));
    if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
      refMin = parts[0];
      refMax = parts[1];
    } else {
      // No reference range available — mark as NORMAL with a note
      return {
        name: biomarker.standardName,
        value: biomarker.value,
        unit: biomarker.unit,
        status: "NORMAL",
        referenceMin: 0,
        referenceMax: 0,
        deviation: "No reference range available — unable to classify",
      };
    }
  } else {
    return {
      name: biomarker.standardName,
      value: biomarker.value,
      unit: biomarker.unit,
      status: "NORMAL",
      referenceMin: 0,
      referenceMax: 0,
      deviation: "No reference range available — unable to classify",
    };
  }

  // Determine status
  const value = biomarker.value;
  let status: SeverityStatus;
  let deviation: string;

  // Check critical thresholds first
  if (ref?.criticalLow !== null && ref?.criticalLow !== undefined && value <= ref.criticalLow) {
    status = "CRITICAL_LOW";
    const pct = ((refMin - value) / refMin * 100).toFixed(1);
    deviation = `Critically low — ${pct}% below normal minimum. Immediate attention required.`;
  } else if (ref?.criticalHigh !== null && ref?.criticalHigh !== undefined && value >= ref.criticalHigh) {
    status = "CRITICAL_HIGH";
    const pct = ((value - refMax) / refMax * 100).toFixed(1);
    deviation = `Critically high — ${pct}% above normal maximum. Immediate attention required.`;
  } else if (value < refMin) {
    status = "LOW";
    const pct = ((refMin - value) / refMin * 100).toFixed(1);
    deviation = `${pct}% below the normal minimum of ${refMin} ${biomarker.unit}`;
  } else if (value > refMax) {
    status = "HIGH";
    const pct = ((value - refMax) / refMax * 100).toFixed(1);
    deviation = `${pct}% above the normal maximum of ${refMax} ${biomarker.unit}`;
  } else {
    status = "NORMAL";
    deviation = `Within normal range (${refMin}–${refMax} ${biomarker.unit})`;
  }

  return {
    name: biomarker.standardName,
    value,
    unit: biomarker.unit,
    status,
    referenceMin: refMin,
    referenceMax: refMax,
    deviation,
  };
}
