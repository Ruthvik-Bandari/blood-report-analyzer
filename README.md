# 🩸 Blood Report Analyzer — AI Health Agent

An AI-powered blood test report analysis system built with **Subconscious AI** and **Hono**. Upload a blood report, and the agent extracts biomarkers, classifies values against WHO/Mayo Clinic reference ranges, and generates personalized dietary, lifestyle, and specialist referral recommendations — all with a warm, non-alarming tone.

> **Built at the Subconscious AI Hackathon** — Powered by TIM-GPT engine with custom function tools.

---

## Architecture

```
┌──────────────┐       ┌─────────────────────┐       ┌──────────────────┐
│   Streamlit  │──────▶│  Subconscious Agent  │──────▶│   Hono Server    │
│   Frontend   │       │  (TIM-GPT Engine)    │       │   (Tool Server)  │
│   (Om)       │       │  (Ruthvik)           │       │   (Ruthvik)      │
└──────────────┘       └─────────────────────┘       └──────────────────┘
                              │                             │
                              │ Autonomous tool calls       │
                              ▼                             ▼
                        ┌───────────┐  ┌──────────┐  ┌─────────────┐
                        │ Extract   │  │ Classify │  │ Recommend   │
                        │ Biomarkers│  │ Values   │  │ Diet/Life   │
                        └───────────┘  └──────────┘  └─────────────┘
```

**How it works:**

1. User pastes blood report text into the Streamlit UI
2. The **Subconscious Agent** (TIM-GPT) receives the report and autonomously decides which tools to call
3. It calls **3 custom function tools** hosted on our Hono server via ngrok:
   - `extract_biomarkers` — Parses all biomarker names, values, units, and reference ranges
   - `classify_biomarkers` — Classifies each value as NORMAL / LOW / HIGH / CRITICAL
   - `generate_recommendations` — Returns food, lifestyle advice, and specialist referrals
4. The agent synthesizes results into a friendly, actionable health summary
5. Results display as a color-coded dashboard in Streamlit

---

## Tech Stack

| Component | Technology | Purpose |
|-----------|-----------|---------|
| **AI Agent** | [Subconscious AI](https://subconscious.dev) (TIM-GPT) | Autonomous reasoning + tool orchestration |
| **Tool Server** | [Hono](https://hono.dev) + TypeScript | Lightweight, fast API for tool endpoints |
| **Frontend** | Streamlit + Plotly | Interactive health dashboard |
| **Tunnel** | ngrok | Exposes local tools to Subconscious cloud |
| **Data Sources** | WHO, Mayo Clinic, USDA FoodData | Reference ranges + dietary knowledge base |

---

## Quick Start

### Prerequisites

- Node.js 18+ 
- Python 3.10+
- [Subconscious API key](https://subconscious.dev/platform/api-keys)
- ngrok account (free tier works)

### 1. Clone and install

```bash
git clone https://github.com/Ruthvik-Bandari/blood-report-analyzer.git
cd blood-report-analyzer
npm install
```

### 2. Start the Hono tool server

```bash
npm run dev
# Server runs on http://localhost:3000
```

Verify: `curl http://localhost:3000/health`

### 3. Expose via ngrok

```bash
ngrok http 3000
# Copy the https://xxx.ngrok-free.app URL
```

### 4. Run the Subconscious agent

```bash
python3 -m venv venv
source venv/bin/activate
pip install subconscious-sdk requests

export SUBCONSCIOUS_API_KEY="your-key"
python run_agent.py --url https://your-ngrok-url.ngrok-free.app
```

### 5. Start the frontend (Om's module)

```bash
cd frontend
pip install streamlit requests plotly
streamlit run app.py
```

---

## API Endpoints

| Endpoint | Method | Input | Output |
|----------|--------|-------|--------|
| `/health` | GET | — | Server status |
| `/tools/extract-biomarkers` | POST | `{ report_text }` | Extracted biomarkers array |
| `/tools/classify-biomarkers` | POST | `{ biomarkers }` | Classifications with severity |
| `/tools/generate-recommendations` | POST | `{ abnormal_biomarkers }` | Diet, lifestyle, specialist advice |
| `/tools/full-analysis` | POST | `{ report_text }` | Complete pipeline (all 3 steps) |

---

## Supported Biomarkers (50+)

| Category | Biomarkers |
|----------|-----------|
| **CBC** | Hemoglobin, RBC, WBC, Platelets, Hematocrit, MCV, MCH, MCHC, RDW, ESR, Neutrophils, Lymphocytes, Monocytes, Eosinophils, Basophils |
| **Metabolic** | Fasting Glucose, HbA1c, BUN, Creatinine, eGFR, Uric Acid |
| **Electrolytes** | Sodium, Potassium, Chloride, Calcium, Magnesium, Phosphorus |
| **Lipid Panel** | Total Cholesterol, LDL, HDL, Triglycerides, VLDL |
| **Liver** | ALT, AST, ALP, Total Bilirubin, Direct Bilirubin, Albumin, Total Protein, GGT |
| **Thyroid** | TSH, Free T3, Free T4, Total T3, Total T4 |
| **Vitamins** | Vitamin D, Vitamin B12, Folate, Iron, Ferritin, TIBC |

---

## Project Structure

```
blood-report-analyzer/
├── src/
│   ├── index.ts                 # Hono server — all API routes
│   ├── types.ts                 # Shared TypeScript types
│   ├── test-local.ts            # Local pipeline test (no server needed)
│   ├── tools/
│   │   ├── extract.ts           # Biomarker extraction (regex + pattern matching)
│   │   ├── classify.ts          # Value classification against reference ranges
│   │   └── recommend.ts         # Recommendation generation from knowledge base
│   └── data/
│       ├── reference-ranges.ts  # WHO/Mayo Clinic ranges for 50+ biomarkers
│       └── knowledge-base.ts    # Dietary, lifestyle, specialist knowledge base
├── frontend/                    # Streamlit dashboard (Om)
│   └── app.py
├── test-reports/                # Test blood report samples (Bhagya)
├── run_agent.py                 # Subconscious agent with custom tools
├── package.json
├── tsconfig.json
└── README.md
```

---

## Subconscious Integration

This project uses the **Subconscious AI platform** for agent orchestration:

- **Engine:** `tim-gpt` (compound engine backed by GPT-4.1 with smart context management)
- **Tools:** 3 custom function tools (`type: "function"`) with `url` pointing to our Hono server
- **Execution:** Subconscious calls tool endpoints server-side — the agent autonomously reasons about which tools to call and in what order
- **SDK:** `subconscious-sdk` (Python) with `client.run()`

The agent's reasoning trace shows how TIM-GPT decomposes the task:
1. Calls `extract_biomarkers` → finds 27 biomarkers
2. Calls `classify_biomarkers` → categorizes each as NORMAL/LOW/HIGH/CRITICAL
3. Calls `generate_recommendations` → generates personalized health advice
4. Synthesizes everything into a friendly summary

---

## Team & Contributions

| Member | Role | Key Contributions |
|--------|------|-------------------|
| **Ruthvik Bandari** | Backend + Agent | Hono tool server (all endpoints), Subconscious agent integration, reference ranges database, knowledge base, ngrok setup |
| **Om Patel** | Frontend | Streamlit dashboard, Plotly gauge charts, color-coded health cards, PDF upload UI |
| **Bhagya** | Testing + Demo | Test report creation, API endpoint testing, end-to-end QA, demo script, README |

### Detailed Breakdown

**Ruthvik (Hono Server + Subconscious Agent):**
- Built the complete Hono TypeScript server with 5 API endpoints
- Created the biomarker extraction engine with multi-strategy parsing (line-by-line + full-text fallback)
- Compiled reference ranges database from WHO and Mayo Clinic guidelines (50+ biomarkers)
- Built the knowledge base with dietary advice, lifestyle recommendations, and specialist referrals for 25+ conditions
- Integrated the Subconscious SDK with 3 custom function tools for autonomous agent execution
- Set up ngrok tunneling for public tool access

**Om (Frontend Development):**
- Built the Streamlit web application with PDF upload and text paste
- Created color-coded health cards (green/yellow/red) for biomarker classification
- Added Plotly gauge charts for visual impact
- Implemented API calls to the Hono server's full-analysis endpoint
- Added sample report button and professional theming

**Bhagya (Testing + Demo):**
- Created 3 diverse test blood reports (healthy, multi-issue, critical)
- Tested all API endpoints with curl for correctness
- Verified frontend displays match classifications
- Wrote the demo script and prepared presentation materials
- Updated documentation and captured screenshots

---

## Testing

```bash
# Local pipeline test (no server needed)
npm test

# Test server endpoints
curl http://localhost:3000/health

curl -X POST http://localhost:3000/tools/full-analysis \
  -H "Content-Type: application/json" \
  -d '{"report_text": "Hemoglobin 10.2 g/dL 13.0-17.5\nTSH 6.8 µIU/mL 0.4-4.0"}'

# Test Subconscious agent
python run_agent.py --url https://your-ngrok-url.ngrok-free.app

# Fallback mode (direct HTTP, no Subconscious)
python run_agent.py --url https://your-ngrok-url.ngrok-free.app --fallback
```

---

## ⚕️ Disclaimer

This tool is for **educational purposes only** and is NOT a substitute for professional medical advice, diagnosis, or treatment. Always consult a qualified healthcare provider for any medical decisions. If you have critical values, please seek immediate medical attention.

---

## NLP Course Context

This project is part of a larger NLP course project that includes:
- **Custom NER** — Fine-tuning PubMedBERT for biomarker entity extraction (future work)
- **TF-IDF vs Semantic Retrieval** — Comparing keyword and dense vector approaches for recommendation matching
- **Annotated Corpus** — 90+ manually annotated blood reports in BIO format

The hackathon build demonstrates the tool server and agent pipeline. The full NLP components (PubMedBERT NER, FAISS retrieval) will be integrated in the complete course project.

---

*Built with ❤️ by Ruthvik, Om, and Bhagya — Subconscious AI Hackathon 2026*
