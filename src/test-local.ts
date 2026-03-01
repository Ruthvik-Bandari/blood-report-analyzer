// Run this with: npx tsx src/test-local.ts
// Tests all 3 tool endpoints against a sample blood report

import { extractBiomarkers } from "./tools/extract.js";
import { classifyBiomarkers } from "./tools/classify.js";
import { generateRecommendations } from "./tools/recommend.js";

const SAMPLE_REPORT = `
COMPLETE BLOOD COUNT (CBC)
Hemoglobin: 10.2 g/dL (13.0-17.0)
WBC: 11500 cells/µL (4500-11000)
RBC: 4.1 million/µL (4.5-5.5)
Platelets: 180000 cells/µL (150000-400000)
Hematocrit: 32 % (36-52)
MCV: 72 fL (80-100)

LIPID PANEL
Total Cholesterol: 245 mg/dL (<200)
LDL Cholesterol: 165 mg/dL (<100)
HDL Cholesterol: 35 mg/dL (40-60)
Triglycerides: 220 mg/dL (<150)

DIABETES PANEL
Fasting Glucose: 118 mg/dL (70-100)
HbA1c: 6.1 % (4.0-5.6)

THYROID
TSH: 5.8 µIU/mL (0.4-4.0)
Free T4: 0.7 ng/dL (0.8-1.8)

LIVER FUNCTION
ALT: 72 U/L (7-56)
AST: 45 U/L (10-40)
Total Bilirubin: 0.9 mg/dL (0.1-1.2)

KIDNEY FUNCTION
Creatinine: 1.4 mg/dL (0.6-1.2)
BUN: 24 mg/dL (7-20)

VITAMINS
Vitamin D: 15 ng/mL (30-100)
Vitamin B12: 180 pg/mL (200-900)
Iron: 45 µg/dL (60-170)
Ferritin: 8 ng/mL (12-300)

ELECTROLYTES
Sodium: 140 mEq/L (136-145)
Potassium: 4.2 mEq/L (3.5-5.0)
Calcium: 9.1 mg/dL (8.5-10.5)
`;

console.log("═".repeat(60));
console.log("🧪 BLOOD REPORT ANALYZER — LOCAL TEST");
console.log("═".repeat(60));

// ─── Step 1: Extract ───────────────────────────────────────

console.log("\n📋 STEP 1: Extracting biomarkers...\n");
const extraction = extractBiomarkers({ report_text: SAMPLE_REPORT });
console.log(`   Found ${extraction.total_found} biomarkers:`);
for (const b of extraction.biomarkers) {
  console.log(`   • ${b.standardName}: ${b.value} ${b.unit} (ref: ${b.referenceRange ?? "N/A"})`);
}

// ─── Step 2: Classify ──────────────────────────────────────

console.log("\n\n🏥 STEP 2: Classifying values...\n");
const classification = classifyBiomarkers({ biomarkers: extraction.biomarkers });
console.log(`   Summary: ${classification.summary.normal} normal, ${classification.summary.low} low, ${classification.summary.high} high, ${classification.summary.critical} critical\n`);

for (const c of classification.classifications) {
  const icon =
    c.status === "NORMAL" ? "🟢" :
    c.status.includes("CRITICAL") ? "🔴" : "🟡";
  console.log(`   ${icon} ${c.name}: ${c.value} ${c.unit} → ${c.status}`);
  if (c.status !== "NORMAL") {
    console.log(`      └─ ${c.deviation}`);
  }
}

// ─── Step 3: Recommendations ───────────────────────────────

const abnormal = classification.classifications.filter((c) => c.status !== "NORMAL");
console.log(`\n\n💊 STEP 3: Generating recommendations for ${abnormal.length} abnormal values...\n`);
const recommendations = generateRecommendations({ abnormal_biomarkers: abnormal });

for (const rec of recommendations.recommendations) {
  const urgencyIcon = rec.urgency === "urgent" ? "🚨" : rec.urgency === "soon" ? "⚡" : "📌";
  console.log(`\n${urgencyIcon} ${rec.biomarker} (${rec.status})`);
  console.log(`   ${rec.explanation}`);
  if (rec.foods.length > 0) {
    console.log(`   🍽️  Foods: ${rec.foods.slice(0, 3).join(", ")}...`);
  }
  if (rec.lifestyle.length > 0) {
    console.log(`   🏃 Lifestyle: ${rec.lifestyle[0]}`);
  }
  if (rec.specialist) {
    console.log(`   👨‍⚕️ Specialist: ${rec.specialist}`);
  }
}

console.log(`\n\n${"═".repeat(60)}`);
console.log(`✅ All 3 tools working correctly!`);
console.log(`   ${extraction.total_found} biomarkers extracted`);
console.log(`   ${abnormal.length} abnormal values found`);
console.log(`   ${recommendations.recommendations.length} recommendations generated`);
console.log(`${"═".repeat(60)}\n`);

console.log(recommendations.disclaimer);
