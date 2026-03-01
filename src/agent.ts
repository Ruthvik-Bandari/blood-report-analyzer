import { Subconscious } from "subconscious-sdk";

// ─── Configuration ─────────────────────────────────────────

const SUBCONSCIOUS_API_KEY = process.env.SUBCONSCIOUS_API_KEY ?? "YOUR_API_KEY";
const HONO_BASE_URL = process.env.HONO_BASE_URL ?? "http://localhost:3000"; // Replace with ngrok URL in production

const client = new Subconscious({ apiKey: SUBCONSCIOUS_API_KEY });

// ─── Agent System Instructions ─────────────────────────────

const SYSTEM_INSTRUCTIONS = `
You are a Blood Report Analyzer agent — an expert health literacy assistant that helps users understand their blood test results.

## Your Workflow:
When a user provides blood report text, follow these steps IN ORDER:

1. **EXTRACT**: Call the extract_biomarkers tool with the full report text. This parses the report and identifies all biomarker-value-unit triples.

2. **CLASSIFY**: Take the extracted biomarkers and call the classify_values tool. This compares each value against WHO and Mayo Clinic reference ranges and categorizes them as LOW, NORMAL, HIGH, CRITICAL_LOW, or CRITICAL_HIGH.

3. **RECOMMEND**: For any biomarkers that are NOT NORMAL, call the get_recommendations tool. This provides dietary advice, lifestyle changes, and specialist referrals.

4. **SYNTHESIZE**: Combine all results into a clear, structured health report for the user:
   - Start with a brief overall summary
   - List CRITICAL values first with ⚠️ urgent alerts
   - Show all biomarkers with color indicators: 🟢 Normal, 🟡 Low/High, 🔴 Critical
   - Provide specific, actionable dietary recommendations
   - Suggest lifestyle changes
   - Recommend specialist consultations where needed
   - End with general health advice

## Important Rules:
- ALWAYS display the medical disclaimer prominently at the start
- NEVER diagnose conditions — only classify values against reference ranges
- If extraction finds zero biomarkers, ask the user to check the report format
- If you're unsure about a value, say so — do not guess
- Be empathetic but factual — patients may be anxious about results
- Use web_search if the user asks about a specific condition or latest guidelines

## Disclaimer (include at start of every analysis):
"⚕️ IMPORTANT: This analysis is for educational purposes only and is NOT a substitute for professional medical advice. Please consult your healthcare provider for medical decisions."
`.trim();

// ─── Run the Agent ─────────────────────────────────────────

export async function analyzeBloodReport(reportText: string) {
  console.log("🩸 Starting blood report analysis...\n");

  const run = await client.run({
    engine: "tim-gpt",
    input: {
      instructions: SYSTEM_INSTRUCTIONS,
      messages: [
        {
          role: "user",
          content: `Please analyze this blood report:\n\n${reportText}`,
        },
      ],
      tools: [
        // Built-in web search for latest medical info
        { type: "platform", id: "web_search" },

        // Custom Tool 1: Extract biomarkers from report text
        {
          type: "function",
          name: "extract_biomarkers",
          description:
            "Extracts biomarker names, values, units, and reference ranges from blood report text. Send the full report text as input.",
          url: `${HONO_BASE_URL}/tools/extract-biomarkers`,
          method: "POST",
          timeout: 15,
          parameters: {
            type: "object",
            properties: {
              report_text: {
                type: "string",
                description: "The full text content of the blood report",
              },
            },
            required: ["report_text"],
            additionalProperties: false,
          },
        },

        // Custom Tool 2: Classify biomarker values
        {
          type: "function",
          name: "classify_values",
          description:
            "Classifies extracted biomarkers as LOW, NORMAL, HIGH, or CRITICAL by comparing against WHO and Mayo Clinic reference ranges.",
          url: `${HONO_BASE_URL}/tools/classify-values`,
          method: "POST",
          timeout: 10,
          parameters: {
            type: "object",
            properties: {
              biomarkers: {
                type: "array",
                description: "Array of extracted biomarkers from the extract_biomarkers tool",
                items: {
                  type: "object",
                  properties: {
                    name: { type: "string" },
                    standardName: { type: "string" },
                    value: { type: "number" },
                    unit: { type: "string" },
                    referenceRange: { type: "string", nullable: true },
                  },
                },
              },
            },
            required: ["biomarkers"],
            additionalProperties: false,
          },
        },

        // Custom Tool 3: Get recommendations
        {
          type: "function",
          name: "get_recommendations",
          description:
            "Generates dietary, lifestyle, and specialist referral recommendations for abnormal biomarker values.",
          url: `${HONO_BASE_URL}/tools/get-recommendations`,
          method: "POST",
          timeout: 10,
          parameters: {
            type: "object",
            properties: {
              abnormal_biomarkers: {
                type: "array",
                description:
                  "Array of classified biomarkers that are NOT NORMAL (only include LOW, HIGH, CRITICAL_LOW, or CRITICAL_HIGH)",
                items: {
                  type: "object",
                  properties: {
                    name: { type: "string" },
                    value: { type: "number" },
                    unit: { type: "string" },
                    status: { type: "string" },
                    referenceMin: { type: "number" },
                    referenceMax: { type: "number" },
                    deviation: { type: "string" },
                  },
                },
              },
            },
            required: ["abnormal_biomarkers"],
            additionalProperties: false,
          },
        },
      ],
    },
    options: { await_completion: true },
  });

  console.log("✅ Analysis complete!\n");
  console.log("─".repeat(60));
  console.log(run.result.answer);
  console.log("─".repeat(60));

  // Optionally show reasoning steps
  if (run.result.reasoning) {
    console.log("\n📋 Agent Reasoning Steps:");
    console.log(JSON.stringify(run.result.reasoning, null, 2));
  }

  return run.result;
}

// ─── CLI Runner ────────────────────────────────────────────

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

// Run if executed directly
const isDirectRun = process.argv[1]?.includes("agent");
if (isDirectRun) {
  const customReport = process.argv[2]; // Optional: pass report text as CLI arg

  analyzeBloodReport(customReport ?? SAMPLE_REPORT).catch((err) => {
    console.error("❌ Agent error:", err);
    process.exit(1);
  });
}
