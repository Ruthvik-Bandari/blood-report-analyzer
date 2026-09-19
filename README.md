# Blood Report Analyzer — AI Health Agent

Paste a blood report; an agent extracts the biomarkers, classifies each value against WHO and Mayo Clinic reference ranges, and returns dietary, lifestyle and specialist-referral guidance with a mandatory medical disclaimer.

Built at the **Subconscious AI × ACM Hackathon** (finalist). The orchestration is the point: a TIM-GPT agent decides the tool order itself rather than following a fixed script.

![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?logo=typescript&logoColor=white)
![Hono](https://img.shields.io/badge/Hono-4.7-E36002?logo=hono&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-15-000000?logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![Status](https://img.shields.io/badge/status-hackathon%20prototype-orange.svg)

> **Educational project.** Not a medical device and not a substitute for professional advice. See
> [Disclaimer](#disclaimer).

## Contents

- [How it works](#how-it-works)
- [Architecture](#architecture)
- [The three tools](#the-three-tools)
- [Tech stack](#tech-stack)
- [Project status](#project-status)
- [Requirements](#requirements)
- [Quick start](#quick-start)
- [API endpoints](#api-endpoints)
- [Supported biomarkers](#supported-biomarkers)
- [Project structure](#project-structure)
- [Testing](#testing)
- [Team](#team)
- [Disclaimer](#disclaimer)

## How it works

1. A blood report is submitted as text.
2. The **Subconscious agent** (TIM-GPT) receives it and decides autonomously which tools to call and
   in what order.
3. It calls three custom function tools hosted on a local Hono server, exposed through ngrok. The
   platform invokes them server-side.
4. The agent synthesises the results into a plain-language summary.

The agent path is not the only path. The runner health-checks the tool server first, and falls back
to a direct `/tools/full-analysis` call when no API key is present or the agent errors, so the
pipeline stays usable without a Subconscious account. The agent's reasoning trace and token usage
are printed on every run.

## Architecture

```
┌──────────────┐       ┌──────────────────────┐       ┌──────────────────┐
│  Next.js UI  │       │  Subconscious Agent  │──────▶│   Hono Server    │
│  (demo data) │       │    (TIM-GPT)         │       │  (tool server)   │
└──────────────┘       └──────────────────────┘       └──────────────────┘
                                │                            │
                                │ autonomous tool calls      │
                                ▼                            ▼
                    ┌────────────┐  ┌──────────┐  ┌───────────────┐
                    │  Extract   │  │ Classify │  │  Recommend    │
                    │ biomarkers │  │  values  │  │ diet / life   │
                    └────────────┘  └──────────┘  └───────────────┘
```

## The three tools

Each is a JSON-Schema-typed POST endpoint.

**`extract_biomarkers`** — regex and alias-map parsing of name, value, unit and printed reference
range. A word-boundary alias regex covers 21 unit alternatives, a second pass handles pipe- and
tab-delimited table layouts, and results are de-duplicated set-wise.

**`classify_biomarkers`** — compares each value to the reference database, falling back to the range
printed in the report for unknown markers. Emits five statuses — `NORMAL`, `LOW`, `HIGH`,
`CRITICAL_LOW`, `CRITICAL_HIGH` — with a percentage deviation. Critical thresholds are checked
*before* the low/high bands, so a critical value can never be reported as merely high.

**`generate_recommendations`** — looks each abnormal marker up in the knowledge base, selects the low
or high branch, and returns explanation, foods, lifestyle guidance and specialist referral. Urgency
is `urgent` for critical values, `soon` for other abnormals and `routine` for unknown markers.
Results are sorted by urgency and a medical disclaimer is appended unconditionally.

## Tech stack

| Component | Technology | Purpose |
|---|---|---|
| AI agent | [Subconscious AI](https://subconscious.dev) (TIM-GPT) | Autonomous reasoning and tool orchestration |
| Tool server | [Hono](https://hono.dev) + TypeScript | API for the three tool endpoints |
| Agent runner | Python | Registers tools, runs the agent, handles fallback |
| Web UI | Next.js 15, React 19, Tailwind CSS, Radix UI | Dashboard and report views |
| Tunnel | ngrok | Exposes local tools to the Subconscious cloud |
| Data sources | WHO, Mayo Clinic, USDA FoodData | Reference ranges and dietary knowledge |

## Project status

| Piece | Status |
|---|---|
| Hono tool server and all three tools | Working |
| Reference database — **46 biomarkers**, 8 clinical categories | Working |
| Knowledge base — **28 entries**, 957 lines | Working |
| Subconscious agent integration with direct-call fallback | Working |
| Offline pipeline harness | Working — 26 of 26 biomarkers extracted from the sample report, classified 5 normal / 10 low / 11 high, producing 21 recommendations |
| **Next.js UI** | **Runs on demo data.** `frontend/src/lib/mock-data.ts` backs the dashboard and the API route; the UI is not yet wired to the live tool server |
| Automated test suite | None beyond the offline harness |

## Requirements

- Node.js 18+
- Python 3.10+
- A [Subconscious API key](https://subconscious.dev/platform/api-keys) — optional, the fallback path
  works without one
- An ngrok account (free tier is enough) if you want the agent to reach your local server

## Quick start

### 1. Clone

```bash
git clone https://github.com/Ruthvik-Bandari/blood-report-analyzer.git
cd blood-report-analyzer
```

### 2. Start the Hono tool server

```bash
cd backend
npm install
npm run dev          # http://localhost:3000
```

Verify with `curl http://localhost:3000/health`.

### 3. Expose it

```bash
ngrok http 3000      # copy the https://xxx.ngrok-free.app URL
```

### 4. Run the agent

```bash
cd backend
python3 -m venv venv && source venv/bin/activate
pip install -r requirements.txt

export SUBCONSCIOUS_API_KEY="your-key"
python run_agent.py --url https://your-ngrok-url.ngrok-free.app
```

Add `--fallback` to skip the agent and call the pipeline directly.

### 5. Start the web UI

```bash
cd frontend
npm install
npm run dev          # http://localhost:3001
```

The UI currently renders demo data. See [Project status](#project-status).

## API endpoints

| Endpoint | Method | Input | Output |
|---|---|---|---|
| `/health` | GET | — | Server status |
| `/tools/extract-biomarkers` | POST | `{ report_text }` | Extracted biomarker array |
| `/tools/classify-biomarkers` | POST | `{ biomarkers }` | Classifications with severity |
| `/tools/generate-recommendations` | POST | `{ abnormal_biomarkers }` | Diet, lifestyle, specialist advice |
| `/tools/full-analysis` | POST | `{ report_text }` | All three steps in one call |

## Supported biomarkers

46 markers across 8 categories, defined in `backend/src/data/reference-ranges.ts`.

| Category | Biomarkers |
|---|---|
| **CBC** | Hemoglobin, WBC, RBC, Platelets, Hematocrit, MCV, MCH, MCHC, Neutrophils, Lymphocytes, ESR |
| **Liver** | ALT, AST, ALP, Total Bilirubin, Direct Bilirubin, Albumin, Total Protein, GGT |
| **Electrolytes** | Sodium, Potassium, Chloride, Calcium, Phosphorus, Magnesium |
| **Vitamins** | Vitamin D, Vitamin B12, Folate, Iron, Ferritin, TIBC |
| **Lipid Panel** | Total Cholesterol, LDL Cholesterol, HDL Cholesterol, Triglycerides, VLDL Cholesterol |
| **Kidney** | Creatinine, BUN, Uric Acid, eGFR |
| **Diabetes** | Fasting Glucose, HbA1c, Fasting Insulin |
| **Thyroid** | TSH, Free T4, Free T3 |

Each entry carries a standard name, an alias list, a unit, normal bounds, optional critical bounds,
and a category.

## Project structure

```
blood-report-analyzer/
├── backend/
│   ├── run_agent.py              # Subconscious agent runner + fallback path
│   ├── src/
│   │   ├── index.ts              # Hono server, all routes
│   │   ├── agent.ts
│   │   ├── types.ts
│   │   ├── test-local.ts         # Offline pipeline harness
│   │   ├── tools/
│   │   │   ├── extract.ts        # Biomarker extraction
│   │   │   ├── classify.ts       # Classification against reference ranges
│   │   │   └── recommend.ts      # Recommendation generation
│   │   └── data/
│   │       ├── reference-ranges.ts   # 46 biomarkers, 8 categories
│   │       └── knowledge-base.ts     # 28 recommendation entries
│   └── package.json
└── frontend/                     # Next.js 15 dashboard (demo data)
    └── src/
        ├── app/                  # App Router pages
        ├── components/
        └── lib/mock-data.ts
```

## Testing

```bash
cd backend
npm test                          # offline pipeline harness, no server needed
```

Exercise the running server directly:

```bash
curl http://localhost:3000/health

curl -X POST http://localhost:3000/tools/full-analysis \
  -H "Content-Type: application/json" \
  -d '{"report_text": "Hemoglobin 10.2 g/dL 13.0-17.5\nTSH 6.8 uIU/mL 0.4-4.0"}'
```

## Team

| Member | Role | Contributions |
|---|---|---|
| **Ruthvik Bandari** | Backend + Agent | Hono tool server, Subconscious agent integration, reference-range database, knowledge base, ngrok setup |
| **Om Patel** | Frontend | Web dashboard, health cards, API integration |
| **Bhagya** | Testing + Demo | Test reports, endpoint testing, end-to-end QA, demo script, documentation |

## Disclaimer

For **educational purposes only**. This is not a substitute for professional medical advice,
diagnosis or treatment. Always consult a qualified healthcare provider for medical decisions.

---

Built at the Subconscious AI × ACM Hackathon, 2026.
