// ─── Extraction Types ─────────────────────────────────────────────
export interface ExtractedBiomarker {
  name: string;
  value: number;
  unit: string;
  referenceRange: string | null;
}

export interface ExtractionResult {
  success: boolean;
  biomarkers: ExtractedBiomarker[];
  rawCount: number;
  errors: string[];
}

// ─── Classification Types ─────────────────────────────────────────
export type Classification =
  | "NORMAL"
  | "LOW"
  | "HIGH"
  | "CRITICAL_LOW"
  | "CRITICAL_HIGH"
  | "UNKNOWN";

export interface ClassifiedBiomarker extends ExtractedBiomarker {
  classification: Classification;
  normalRange: { low: number; high: number } | null;
  criticalRange: { low: number; high: number } | null;
  percentDeviation: number | null;
}

export interface ClassificationResult {
  success: boolean;
  classified: ClassifiedBiomarker[];
  summary: {
    total: number;
    normal: number;
    low: number;
    high: number;
    criticalLow: number;
    criticalHigh: number;
    unknown: number;
  };
}

// ─── Recommendation Types ─────────────────────────────────────────
export interface FoodRecommendation {
  food: string;
  reason: string;
}

export interface Recommendation {
  biomarkerName: string;
  classification: Classification;
  explanation: string;
  dietaryAdvice: FoodRecommendation[];
  lifestyleAdvice: string[];
  specialistReferral: string | null;
  urgency: "routine" | "soon" | "urgent";
}

export interface RecommendationResult {
  success: boolean;
  recommendations: Recommendation[];
  criticalAlerts: string[];
  disclaimer: string;
}

// ─── Full Analysis Types ──────────────────────────────────────────
export interface FullAnalysisResult {
  extraction: ExtractionResult;
  classification: ClassificationResult;
  recommendations: RecommendationResult;
  timestamp: string;
}
