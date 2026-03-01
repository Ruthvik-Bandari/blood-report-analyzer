// ─── Extraction Types ───────────────────────────────────────

export interface ExtractedBiomarker {
  name: string;
  standardName: string; // normalized name (e.g., "Hemoglobin" regardless of input variant)
  value: number;
  unit: string;
  referenceRange: string | null; // raw string from report e.g. "13.0-17.0"
}

export interface ExtractionRequest {
  report_text: string;
}

export interface ExtractionResponse {
  biomarkers: ExtractedBiomarker[];
  extraction_notes: string[];
  total_found: number;
}

// ─── Classification Types ───────────────────────────────────

export type SeverityStatus = "LOW" | "NORMAL" | "HIGH" | "CRITICAL_LOW" | "CRITICAL_HIGH";

export interface ClassifiedBiomarker {
  name: string;
  value: number;
  unit: string;
  status: SeverityStatus;
  referenceMin: number;
  referenceMax: number;
  deviation: string; // e.g., "15% below normal"
}

export interface ClassificationRequest {
  biomarkers: ExtractedBiomarker[];
}

export interface ClassificationResponse {
  classifications: ClassifiedBiomarker[];
  summary: {
    total: number;
    normal: number;
    low: number;
    high: number;
    critical: number;
  };
}

// ─── Recommendation Types ───────────────────────────────────

export interface Recommendation {
  biomarker: string;
  status: SeverityStatus;
  explanation: string;
  foods: string[];
  lifestyle: string[];
  specialist: string | null;
  urgency: "routine" | "soon" | "urgent";
}

export interface RecommendationRequest {
  abnormal_biomarkers: ClassifiedBiomarker[];
}

export interface RecommendationResponse {
  recommendations: Recommendation[];
  general_advice: string[];
  disclaimer: string;
}

// ─── Health Report (Agent Output) ───────────────────────────

export interface HealthReport {
  patient_summary: string;
  biomarkers: ClassifiedBiomarker[];
  recommendations: Recommendation[];
  critical_alerts: string[];
  general_advice: string[];
  disclaimer: string;
}
