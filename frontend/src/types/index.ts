export type BiomarkerStatus = "normal" | "low" | "high" | "critical";

export interface Biomarker {
  id: string;
  name: string;
  value: number;
  unit: string;
  referenceRange: {
    min: number;
    max: number;
  };
  status: BiomarkerStatus;
  category: string;
}

export interface ReportAnalysis {
  id: string;
  fileName: string;
  uploadedAt: string;
  biomarkers: Biomarker[];
  summary: {
    total: number;
    normal: number;
    low: number;
    high: number;
    critical: number;
  };
  recommendations: Recommendation[];
}

export interface Recommendation {
  id: string;
  biomarkerName: string;
  type: "dietary" | "lifestyle" | "specialist";
  title: string;
  description: string;
  priority: "low" | "medium" | "high" | "urgent";
}

export interface UploadResponse {
  success: boolean;
  reportId: string;
  message: string;
}

export interface ApiError {
  message: string;
  code: string;
  status: number;
}
