/**
 * Local test script — run with: npm test (or npx tsx src/test-local.ts)
 * Tests the extraction → classification → recommendation pipeline directly.
 */
import { extractBiomarkers } from "./tools/extract.js";
import { classifyBiomarkers } from "./tools/classify.js";
import { generateRecommendations } from "./tools/recommend.js";

// ─── Sample Blood Report Text ─────────────────────────────────────
// Simulates a typical pathology lab report with mixed formats.
const SAMPLE_REPORT = `
PATHOLOGY LABORATORY REPORT
Patient: John Doe | Age: 45 | Sex: Male
Date: 2026-02-20 | Report ID: BL-2026-0442

═══════════════════════════════════════════════════════
COMPLETE BLOOD COUNT (CBC)
═══════════════════════════════════════════════════════
Test                    Result      Unit          Reference Range
───────────────────────────────────────────────────────
Hemoglobin              10.2        g/dL          13.0 - 17.5
RBC Count               3.8         million/µL    4.5 - 6.0
WBC Count               8500        cells/µL      4000 - 11000
Platelet Count          210         ×10³/µL       150 - 400
Hematocrit              31.5        %             38.0 - 54.0
MCV                     82          fL            80 - 100
MCH                     26.8        pg            27 - 33
MCHC                    32.4        g/dL          32 - 36
RDW                     16.2        %             11.5 - 14.5
ESR                     35          mm/hr         0 - 20

Differential Count:
Neutrophils             65          %             40 - 70
Lymphocytes             25          %             20 - 40
Monocytes               6           %             2 - 8
Eosinophils             3           %             1 - 4
Basophils               1           %             0 - 1

═══════════════════════════════════════════════════════
METABOLIC PANEL
═══════════════════════════════════════════════════════
Fasting Glucose         128         mg/dL         70 - 100
HbA1c                   6.8         %             4.0 - 5.6
BUN                     22          mg/dL         7 - 20
Creatinine              1.4         mg/dL         0.6 - 1.2
Uric Acid               8.2         mg/dL         3.0 - 7.0
Sodium                  141         mEq/L         136 - 145
Potassium               4.8         mEq/L         3.5 - 5.0
Calcium                 9.2         mg/dL         8.5 - 10.5

═══════════════════════════════════════════════════════
LIPID PANEL
═══════════════════════════════════════════════════════
Total Cholesterol       245         mg/dL         < 200
LDL Cholesterol         162         mg/dL         < 100
HDL Cholesterol         38          mg/dL         40 - 60
Triglycerides           225         mg/dL         < 150
VLDL Cholesterol        45          mg/dL         5 - 40

═══════════════════════════════════════════════════════
LIVER FUNCTION
═══════════════════════════════════════════════════════
ALT (SGPT)              68          U/L           7 - 56
AST (SGOT)              45          U/L           10 - 40
Total Bilirubin         0.8         mg/dL         0.1 - 1.2
Albumin                 4.0         g/dL          3.5 - 5.5
Total Protein           7.2         g/dL          6.0 - 8.3

═══════════════════════════════════════════════════════
THYROID FUNCTION
═══════════════════════════════════════════════════════
TSH                     6.8         µIU/mL        0.4 - 4.0
Free T4                 0.7         ng/dL         0.8 - 1.8
Free T3                 2.1         pg/mL         2.0 - 4.4

═══════════════════════════════════════════════════════
VITAMINS & MINERALS
═══════════════════════════════════════════════════════
Vitamin D               18          ng/mL         30 - 100
Vitamin B12             380         pg/mL         200 - 900
Iron                    45          µg/dL         60 - 170
Ferritin                12          ng/mL         20 - 250
`;

// ─── Run Pipeline ─────────────────────────────────────────────────
console.log("═══════════════════════════════════════════════════════");
console.log("  🩸 Blood Report Analyzer — Local Test");
console.log("═══════════════════════════════════════════════════════\n");

// Stage 1: Extract
console.log("📋 STAGE 1: Extraction");
console.log("─────────────────────────────────────────────────────");
const extraction = extractBiomarkers(SAMPLE_REPORT);
console.log(`Found ${extraction.rawCount} biomarkers:\n`);
for (const b of extraction.biomarkers) {
  console.log(`  • ${b.name}: ${b.value} ${b.unit}${b.referenceRange ? ` [${b.referenceRange}]` : ""}`);
}

// Stage 2: Classify
console.log("\n\n🏷️  STAGE 2: Classification");
console.log("─────────────────────────────────────────────────────");
const classification = classifyBiomarkers(extraction.biomarkers);
console.log(`\nSummary:`);
console.log(`  ✅ Normal:       ${classification.summary.normal}`);
console.log(`  ⬇️  Low:          ${classification.summary.low}`);
console.log(`  ⬆️  High:         ${classification.summary.high}`);
console.log(`  🔴 Critical Low:  ${classification.summary.criticalLow}`);
console.log(`  🔴 Critical High: ${classification.summary.criticalHigh}`);
console.log(`  ❓ Unknown:       ${classification.summary.unknown}`);

console.log(`\nDetails:`);
for (const b of classification.classified) {
  const icon =
    b.classification === "NORMAL" ? "🟢" :
    b.classification === "LOW" || b.classification === "HIGH" ? "🟡" :
    b.classification === "CRITICAL_LOW" || b.classification === "CRITICAL_HIGH" ? "🔴" : "⚪";
  console.log(
    `  ${icon} ${b.name}: ${b.value} ${b.unit} → ${b.classification}${b.percentDeviation !== null ? ` (${b.percentDeviation}% deviation)` : ""}`
  );
}

// Stage 3: Recommendations
console.log("\n\n💊 STAGE 3: Recommendations");
console.log("─────────────────────────────────────────────────────");
const recommendations = generateRecommendations(classification.classified);

if (recommendations.criticalAlerts.length > 0) {
  console.log("\n🚨 CRITICAL ALERTS:");
  for (const alert of recommendations.criticalAlerts) {
    console.log(`  ${alert}`);
  }
}

console.log(`\n${recommendations.recommendations.length} recommendation(s) generated:\n`);
for (const rec of recommendations.recommendations) {
  const urgencyIcon =
    rec.urgency === "urgent" ? "🔴" : rec.urgency === "soon" ? "🟡" : "🟢";
  console.log(`${urgencyIcon} ${rec.biomarkerName} (${rec.classification}) — Urgency: ${rec.urgency}`);
  console.log(`   ${rec.explanation}`);
  if (rec.dietaryAdvice.length > 0) {
    console.log(`   🍽️  Foods:`);
    for (const food of rec.dietaryAdvice.slice(0, 3)) {
      console.log(`      • ${food.food} — ${food.reason}`);
    }
  }
  if (rec.lifestyleAdvice.length > 0) {
    console.log(`   🏃 Lifestyle:`);
    for (const tip of rec.lifestyleAdvice.slice(0, 2)) {
      console.log(`      • ${tip}`);
    }
  }
  if (rec.specialistReferral) {
    console.log(`   👨‍⚕️ See: ${rec.specialistReferral}`);
  }
  console.log();
}

console.log("\n" + recommendations.disclaimer);
console.log("\n═══════════════════════════════════════════════════════");
console.log("  ✅ Test complete!");
console.log("═══════════════════════════════════════════════════════\n");
