// Reference ranges compiled from WHO and Mayo Clinic guidelines.
// Each entry includes normal range, critical thresholds, standard unit,
// and common aliases for fuzzy matching during extraction.

export interface ReferenceRange {
  name: string;
  aliases: string[];
  unit: string;
  normalRange: { low: number; high: number };
  criticalRange: { low: number; high: number };
  category: string;
}

export const REFERENCE_RANGES: ReferenceRange[] = [
  // ─── Complete Blood Count (CBC) ───────────────────────────────
  {
    name: "Hemoglobin",
    aliases: ["hb", "hgb", "hemoglobin", "haemoglobin"],
    unit: "g/dL",
    normalRange: { low: 12.0, high: 17.5 },
    criticalRange: { low: 7.0, high: 20.0 },
    category: "CBC",
  },
  {
    name: "RBC Count",
    aliases: ["rbc", "rbc count", "red blood cell count", "red blood cells", "erythrocytes"],
    unit: "million/µL",
    normalRange: { low: 4.0, high: 6.0 },
    criticalRange: { low: 2.5, high: 8.0 },
    category: "CBC",
  },
  {
    name: "WBC Count",
    aliases: ["wbc", "wbc count", "white blood cell count", "white blood cells", "leukocytes", "total wbc", "total leucocyte count", "tlc"],
    unit: "cells/µL",
    normalRange: { low: 4000, high: 11000 },
    criticalRange: { low: 2000, high: 30000 },
    category: "CBC",
  },
  {
    name: "Platelet Count",
    aliases: ["platelets", "platelet count", "plt", "thrombocytes"],
    unit: "×10³/µL",
    normalRange: { low: 150, high: 400 },
    criticalRange: { low: 50, high: 1000 },
    category: "CBC",
  },
  {
    name: "Hematocrit",
    aliases: ["hct", "hematocrit", "haematocrit", "packed cell volume", "pcv"],
    unit: "%",
    normalRange: { low: 36, high: 54 },
    criticalRange: { low: 20, high: 65 },
    category: "CBC",
  },
  {
    name: "MCV",
    aliases: ["mcv", "mean corpuscular volume"],
    unit: "fL",
    normalRange: { low: 80, high: 100 },
    criticalRange: { low: 60, high: 120 },
    category: "CBC",
  },
  {
    name: "MCH",
    aliases: ["mch", "mean corpuscular hemoglobin"],
    unit: "pg",
    normalRange: { low: 27, high: 33 },
    criticalRange: { low: 20, high: 40 },
    category: "CBC",
  },
  {
    name: "MCHC",
    aliases: ["mchc", "mean corpuscular hemoglobin concentration"],
    unit: "g/dL",
    normalRange: { low: 32, high: 36 },
    criticalRange: { low: 28, high: 40 },
    category: "CBC",
  },
  {
    name: "RDW",
    aliases: ["rdw", "red cell distribution width", "rdw-cv"],
    unit: "%",
    normalRange: { low: 11.5, high: 14.5 },
    criticalRange: { low: 9, high: 20 },
    category: "CBC",
  },
  {
    name: "Neutrophils",
    aliases: ["neutrophils", "neutrophil", "neutrophil %", "neutrophils %"],
    unit: "%",
    normalRange: { low: 40, high: 70 },
    criticalRange: { low: 10, high: 90 },
    category: "CBC",
  },
  {
    name: "Lymphocytes",
    aliases: ["lymphocytes", "lymphocyte", "lymphocyte %", "lymphocytes %"],
    unit: "%",
    normalRange: { low: 20, high: 40 },
    criticalRange: { low: 5, high: 80 },
    category: "CBC",
  },
  {
    name: "Monocytes",
    aliases: ["monocytes", "monocyte", "monocyte %"],
    unit: "%",
    normalRange: { low: 2, high: 8 },
    criticalRange: { low: 0, high: 20 },
    category: "CBC",
  },
  {
    name: "Eosinophils",
    aliases: ["eosinophils", "eosinophil", "eosinophil %"],
    unit: "%",
    normalRange: { low: 1, high: 4 },
    criticalRange: { low: 0, high: 15 },
    category: "CBC",
  },
  {
    name: "Basophils",
    aliases: ["basophils", "basophil", "basophil %"],
    unit: "%",
    normalRange: { low: 0, high: 1 },
    criticalRange: { low: 0, high: 5 },
    category: "CBC",
  },
  {
    name: "ESR",
    aliases: ["esr", "erythrocyte sedimentation rate", "sed rate"],
    unit: "mm/hr",
    normalRange: { low: 0, high: 20 },
    criticalRange: { low: 0, high: 100 },
    category: "CBC",
  },

  // ─── Metabolic Panel ─────────────────────────────────────────
  {
    name: "Fasting Glucose",
    aliases: ["glucose", "fasting glucose", "fasting blood sugar", "fbs", "blood sugar", "blood glucose", "plasma glucose"],
    unit: "mg/dL",
    normalRange: { low: 70, high: 100 },
    criticalRange: { low: 40, high: 400 },
    category: "Metabolic",
  },
  {
    name: "HbA1c",
    aliases: ["hba1c", "glycated hemoglobin", "a1c", "glycosylated hemoglobin", "hemoglobin a1c"],
    unit: "%",
    normalRange: { low: 4.0, high: 5.6 },
    criticalRange: { low: 3.0, high: 14.0 },
    category: "Metabolic",
  },
  {
    name: "BUN",
    aliases: ["bun", "blood urea nitrogen", "urea nitrogen", "urea"],
    unit: "mg/dL",
    normalRange: { low: 7, high: 20 },
    criticalRange: { low: 2, high: 80 },
    category: "Metabolic",
  },
  {
    name: "Creatinine",
    aliases: ["creatinine", "serum creatinine", "creat"],
    unit: "mg/dL",
    normalRange: { low: 0.6, high: 1.2 },
    criticalRange: { low: 0.2, high: 10.0 },
    category: "Metabolic",
  },
  {
    name: "eGFR",
    aliases: ["egfr", "estimated gfr", "glomerular filtration rate"],
    unit: "mL/min/1.73m²",
    normalRange: { low: 90, high: 120 },
    criticalRange: { low: 15, high: 200 },
    category: "Metabolic",
  },
  {
    name: "Uric Acid",
    aliases: ["uric acid", "serum uric acid"],
    unit: "mg/dL",
    normalRange: { low: 3.0, high: 7.0 },
    criticalRange: { low: 1.0, high: 12.0 },
    category: "Metabolic",
  },
  {
    name: "Sodium",
    aliases: ["sodium", "na", "na+", "serum sodium"],
    unit: "mEq/L",
    normalRange: { low: 136, high: 145 },
    criticalRange: { low: 120, high: 160 },
    category: "Electrolytes",
  },
  {
    name: "Potassium",
    aliases: ["potassium", "k", "k+", "serum potassium"],
    unit: "mEq/L",
    normalRange: { low: 3.5, high: 5.0 },
    criticalRange: { low: 2.5, high: 6.5 },
    category: "Electrolytes",
  },
  {
    name: "Chloride",
    aliases: ["chloride", "cl", "cl-", "serum chloride"],
    unit: "mEq/L",
    normalRange: { low: 98, high: 106 },
    criticalRange: { low: 80, high: 120 },
    category: "Electrolytes",
  },
  {
    name: "Calcium",
    aliases: ["calcium", "ca", "serum calcium", "total calcium"],
    unit: "mg/dL",
    normalRange: { low: 8.5, high: 10.5 },
    criticalRange: { low: 6.0, high: 14.0 },
    category: "Electrolytes",
  },

  // ─── Lipid Panel ──────────────────────────────────────────────
  {
    name: "Total Cholesterol",
    aliases: ["total cholesterol", "cholesterol", "serum cholesterol"],
    unit: "mg/dL",
    normalRange: { low: 0, high: 200 },
    criticalRange: { low: 0, high: 400 },
    category: "Lipid",
  },
  {
    name: "LDL Cholesterol",
    aliases: ["ldl", "ldl cholesterol", "ldl-c", "low density lipoprotein"],
    unit: "mg/dL",
    normalRange: { low: 0, high: 100 },
    criticalRange: { low: 0, high: 300 },
    category: "Lipid",
  },
  {
    name: "HDL Cholesterol",
    aliases: ["hdl", "hdl cholesterol", "hdl-c", "high density lipoprotein"],
    unit: "mg/dL",
    normalRange: { low: 40, high: 60 },
    criticalRange: { low: 15, high: 100 },
    category: "Lipid",
  },
  {
    name: "Triglycerides",
    aliases: ["triglycerides", "tg", "trigs", "serum triglycerides"],
    unit: "mg/dL",
    normalRange: { low: 0, high: 150 },
    criticalRange: { low: 0, high: 500 },
    category: "Lipid",
  },
  {
    name: "VLDL Cholesterol",
    aliases: ["vldl", "vldl cholesterol", "very low density lipoprotein"],
    unit: "mg/dL",
    normalRange: { low: 5, high: 40 },
    criticalRange: { low: 0, high: 100 },
    category: "Lipid",
  },

  // ─── Liver Function ───────────────────────────────────────────
  {
    name: "ALT",
    aliases: ["alt", "sgpt", "alanine aminotransferase", "alanine transaminase"],
    unit: "U/L",
    normalRange: { low: 7, high: 56 },
    criticalRange: { low: 0, high: 1000 },
    category: "Liver",
  },
  {
    name: "AST",
    aliases: ["ast", "sgot", "aspartate aminotransferase", "aspartate transaminase"],
    unit: "U/L",
    normalRange: { low: 10, high: 40 },
    criticalRange: { low: 0, high: 1000 },
    category: "Liver",
  },
  {
    name: "ALP",
    aliases: ["alp", "alkaline phosphatase"],
    unit: "U/L",
    normalRange: { low: 44, high: 147 },
    criticalRange: { low: 0, high: 1000 },
    category: "Liver",
  },
  {
    name: "Total Bilirubin",
    aliases: ["total bilirubin", "bilirubin", "bilirubin total", "t. bilirubin", "tbil"],
    unit: "mg/dL",
    normalRange: { low: 0.1, high: 1.2 },
    criticalRange: { low: 0, high: 12.0 },
    category: "Liver",
  },
  {
    name: "Direct Bilirubin",
    aliases: ["direct bilirubin", "conjugated bilirubin", "d. bilirubin", "dbil"],
    unit: "mg/dL",
    normalRange: { low: 0, high: 0.3 },
    criticalRange: { low: 0, high: 5.0 },
    category: "Liver",
  },
  {
    name: "Albumin",
    aliases: ["albumin", "serum albumin"],
    unit: "g/dL",
    normalRange: { low: 3.5, high: 5.5 },
    criticalRange: { low: 1.5, high: 7.0 },
    category: "Liver",
  },
  {
    name: "Total Protein",
    aliases: ["total protein", "serum protein", "tp"],
    unit: "g/dL",
    normalRange: { low: 6.0, high: 8.3 },
    criticalRange: { low: 3.0, high: 12.0 },
    category: "Liver",
  },
  {
    name: "GGT",
    aliases: ["ggt", "gamma-glutamyl transferase", "gamma gt", "gamma-gt"],
    unit: "U/L",
    normalRange: { low: 9, high: 48 },
    criticalRange: { low: 0, high: 500 },
    category: "Liver",
  },

  // ─── Thyroid Function ─────────────────────────────────────────
  {
    name: "TSH",
    aliases: ["tsh", "thyroid stimulating hormone", "thyrotropin"],
    unit: "µIU/mL",
    normalRange: { low: 0.4, high: 4.0 },
    criticalRange: { low: 0.01, high: 50.0 },
    category: "Thyroid",
  },
  {
    name: "Free T3",
    aliases: ["free t3", "ft3", "triiodothyronine free", "t3 free"],
    unit: "pg/mL",
    normalRange: { low: 2.0, high: 4.4 },
    criticalRange: { low: 1.0, high: 10.0 },
    category: "Thyroid",
  },
  {
    name: "Free T4",
    aliases: ["free t4", "ft4", "thyroxine free", "t4 free"],
    unit: "ng/dL",
    normalRange: { low: 0.8, high: 1.8 },
    criticalRange: { low: 0.3, high: 5.0 },
    category: "Thyroid",
  },
  {
    name: "Total T3",
    aliases: ["total t3", "t3", "triiodothyronine"],
    unit: "ng/dL",
    normalRange: { low: 80, high: 200 },
    criticalRange: { low: 40, high: 400 },
    category: "Thyroid",
  },
  {
    name: "Total T4",
    aliases: ["total t4", "t4", "thyroxine"],
    unit: "µg/dL",
    normalRange: { low: 5.0, high: 12.0 },
    criticalRange: { low: 2.0, high: 20.0 },
    category: "Thyroid",
  },

  // ─── Vitamins & Minerals ──────────────────────────────────────
  {
    name: "Vitamin D",
    aliases: ["vitamin d", "vit d", "25-hydroxy vitamin d", "25(oh)d", "25-oh vitamin d", "calcidiol"],
    unit: "ng/mL",
    normalRange: { low: 30, high: 100 },
    criticalRange: { low: 5, high: 150 },
    category: "Vitamins",
  },
  {
    name: "Vitamin B12",
    aliases: ["vitamin b12", "vit b12", "b12", "cobalamin", "cyanocobalamin"],
    unit: "pg/mL",
    normalRange: { low: 200, high: 900 },
    criticalRange: { low: 100, high: 2000 },
    category: "Vitamins",
  },
  {
    name: "Folate",
    aliases: ["folate", "folic acid", "vitamin b9", "serum folate"],
    unit: "ng/mL",
    normalRange: { low: 2.7, high: 17.0 },
    criticalRange: { low: 1.0, high: 25.0 },
    category: "Vitamins",
  },
  {
    name: "Iron",
    aliases: ["iron", "serum iron", "fe"],
    unit: "µg/dL",
    normalRange: { low: 60, high: 170 },
    criticalRange: { low: 20, high: 300 },
    category: "Vitamins",
  },
  {
    name: "Ferritin",
    aliases: ["ferritin", "serum ferritin"],
    unit: "ng/mL",
    normalRange: { low: 20, high: 250 },
    criticalRange: { low: 5, high: 1000 },
    category: "Vitamins",
  },
  {
    name: "TIBC",
    aliases: ["tibc", "total iron binding capacity"],
    unit: "µg/dL",
    normalRange: { low: 250, high: 370 },
    criticalRange: { low: 100, high: 600 },
    category: "Vitamins",
  },
  {
    name: "Magnesium",
    aliases: ["magnesium", "mg", "serum magnesium"],
    unit: "mg/dL",
    normalRange: { low: 1.7, high: 2.2 },
    criticalRange: { low: 1.0, high: 4.0 },
    category: "Electrolytes",
  },
  {
    name: "Phosphorus",
    aliases: ["phosphorus", "phosphate", "serum phosphorus", "inorganic phosphorus"],
    unit: "mg/dL",
    normalRange: { low: 2.5, high: 4.5 },
    criticalRange: { low: 1.0, high: 8.0 },
    category: "Electrolytes",
  },
];

/**
 * Finds a reference range by fuzzy-matching against aliases.
 * Normalizes input to lowercase and trims.
 */
export function findReferenceRange(biomarkerName: string): ReferenceRange | null {
  const normalized = biomarkerName.toLowerCase().trim();
  return (
    REFERENCE_RANGES.find(
      (ref) =>
        ref.name.toLowerCase() === normalized ||
        ref.aliases.some((alias) => alias === normalized)
    ) ?? null
  );
}
