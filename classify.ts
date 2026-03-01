import type {
  ExtractedBiomarker,
  ClassifiedBiomarker,
  ClassificationResult,
  Classification,
} from "../types.js";
import { findReferenceRange } from "../data/reference-ranges.js";

/**
 * Classifies a single biomarker value against reference ranges.
 */
function classifyBiomarker(biomarker: ExtractedBiomarker): ClassifiedBiomarker {
  const ref = findReferenceRange(biomarker.name);

  if (!ref) {
    return {
      ...biomarker,
      classification: "UNKNOWN",
      normalRange: null,
      criticalRange: null,
      percentDeviation: null,
    };
  }

  let classification: Classification;
  let percentDeviation: number | null = null;

  const { value } = biomarker;
  const { normalRange, criticalRange } = ref;

  if (value < criticalRange.low) {
    classification = "CRITICAL_LOW";
    percentDeviation = ((normalRange.low - value) / normalRange.low) * 100;
  } else if (value > criticalRange.high) {
    classification = "CRITICAL_HIGH";
    percentDeviation = ((value - normalRange.high) / normalRange.high) * 100;
  } else if (value < normalRange.low) {
    classification = "LOW";
    percentDeviation = ((normalRange.low - value) / normalRange.low) * 100;
  } else if (value > normalRange.high) {
    classification = "HIGH";
    percentDeviation = ((value - normalRange.high) / normalRange.high) * 100;
  } else {
    classification = "NORMAL";
    // Calculate how centered within normal range
    const midpoint = (normalRange.low + normalRange.high) / 2;
    percentDeviation = ((value - midpoint) / midpoint) * 100;
  }

  return {
    ...biomarker,
    classification,
    normalRange: { low: normalRange.low, high: normalRange.high },
    criticalRange: { low: criticalRange.low, high: criticalRange.high },
    percentDeviation: Math.round(percentDeviation * 10) / 10,
  };
}

/**
 * Classifies an array of extracted biomarkers and produces a summary.
 */
export function classifyBiomarkers(
  biomarkers: ExtractedBiomarker[]
): ClassificationResult {
  const classified = biomarkers.map(classifyBiomarker);

  const summary = {
    total: classified.length,
    normal: classified.filter((b) => b.classification === "NORMAL").length,
    low: classified.filter((b) => b.classification === "LOW").length,
    high: classified.filter((b) => b.classification === "HIGH").length,
    criticalLow: classified.filter((b) => b.classification === "CRITICAL_LOW").length,
    criticalHigh: classified.filter((b) => b.classification === "CRITICAL_HIGH").length,
    unknown: classified.filter((b) => b.classification === "UNKNOWN").length,
  };

  return {
    success: true,
    classified,
    summary,
  };
}
