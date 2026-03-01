# 🏆 Hackathon Plan: Blood Report Analyzer Agent
## Subconscious + Hono — 1 Hour 15 Minutes

> **Goal:** Build an AI agent that a user can chat with to analyze blood report PDFs.  
> The Subconscious agent orchestrates everything — it receives the user's blood report,  
> calls your Hono-hosted custom tools (extract → classify → recommend), and returns  
> a structured health dashboard with dietary/lifestyle recommendations.

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                    FRONTEND (Streamlit / React)          │
│  User uploads PDF → Sends to Subconscious Agent         │
└────────────────────────┬────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────┐
│              SUBCONSCIOUS AGENT (TIM-GPT)               │
│  Long-horizon reasoning engine orchestrates the flow:   │
│  1. Receives user query + PDF content                   │
│  2. Calls extract_biomarkers tool (your Hono endpoint)  │
│  3. Calls classify_values tool (your Hono endpoint)     │
│  4. Calls get_recommendations tool (your Hono endpoint) │
│  5. Synthesizes everything into a health report         │
│  Built-in: web_search for latest medical guidelines     │
└────────────────────────┬────────────────────────────────┘
                         │ HTTP calls to your tools
                         ▼
┌─────────────────────────────────────────────────────────┐
│              HONO API SERVER (Node.js)                   │
│                                                         │
│  POST /tools/extract-biomarkers                         │
│    → Parses PDF text, regex + pattern matching          │
│    → Returns structured biomarker-value-unit triples    │
│                                                         │
│  POST /tools/classify-values                            │
│    → Compares against reference range database          │
│    → Returns classification (Low/Normal/High/Critical)  │
│                                                         │
│  POST /tools/get-recommendations                        │
│    → Matches abnormal biomarkers to knowledge base      │
│    → Returns dietary, lifestyle, specialist recs        │
│                                                         │
│  GET /health → Health check                             │
└─────────────────────────────────────────────────────────┘
```

---

## PHASE 1 — Project Scaffold & Hono Server (15 min)
**Time: 0:00 → 0:15**

- [ ] Initialize Node.js project with Hono + TypeScript
  - `npm init -y && npm i hono @hono/node-server`
  - `npm i -D typescript @types/node tsx`
- [ ] Create `src/index.ts` — Hono server with health check route
- [ ] Create project structure:
  ```
  blood-agent/
  ├── src/
  │   ├── index.ts           # Hono server entry
  │   ├── tools/
  │   │   ├── extract.ts     # Biomarker extraction logic
  │   │   ├── classify.ts    # Value classification logic
  │   │   └── recommend.ts   # Recommendation engine
  │   ├── data/
  │   │   ├── reference-ranges.ts  # WHO/Mayo reference ranges
  │   │   └── knowledge-base.ts    # Food/lifestyle recommendations
  │   └── types.ts           # Shared TypeScript types
  ├── package.json
  └── tsconfig.json
  ```
- [ ] Verify server runs on `localhost:3000`

**Checkpoint:** `curl localhost:3000/health` returns `{ "status": "ok" }`

---

## PHASE 2 — Core Tool Endpoints (25 min)
**Time: 0:15 → 0:40**

### 2A — Extract Biomarkers Tool (10 min)
- [ ] `POST /tools/extract-biomarkers`
  - Input: `{ "report_text": "..." }` (raw text from PDF)
  - Logic: Regex + pattern matching for common biomarkers
    - Match patterns like: `Hemoglobin: 12.5 g/dL (13.0-17.0)`
    - Handle variants: Hb, Hgb, Hemoglobin
    - Extract: biomarker name, value, unit, reference range
  - Output: `{ "biomarkers": [{ name, value, unit, ref_range }] }`
- [ ] Build a comprehensive biomarker alias map (40+ biomarkers)

### 2B — Classify Values Tool (8 min)
- [ ] `POST /tools/classify-values`
  - Input: `{ "biomarkers": [...] }` (from extraction step)
  - Logic: Compare each value against reference ranges DB
    - Categories: LOW, NORMAL, HIGH, CRITICAL
    - Handle unit conversions where needed
  - Output: `{ "classifications": [{ name, value, unit, status, severity }] }`
- [ ] Build reference range database (WHO + Mayo Clinic data)

### 2C — Recommendations Tool (7 min)
- [ ] `POST /tools/get-recommendations`
  - Input: `{ "abnormal_biomarkers": [...] }` (only non-normal values)
  - Logic: Match against knowledge base
    - Dietary recommendations (specific foods)
    - Lifestyle changes
    - Specialist referrals for critical values
  - Output: `{ "recommendations": [{ biomarker, foods, lifestyle, specialist? }] }`
- [ ] Build knowledge base (30+ biomarker → recommendation mappings)

**Checkpoint:** All 3 endpoints return correct JSON when tested with curl

---

## PHASE 3 — Subconscious Agent Integration (15 min)
**Time: 0:40 → 0:55**

- [ ] Create `agent/run-agent.ts` (or `.py` if using Python SDK)
- [ ] Configure Subconscious client with API key
- [ ] Register your 3 Hono endpoints as custom function tools:
  ```javascript
  // Using Subconscious SDK
  const run = client.run({
    engine: "tim-gpt",
    input: {
      instructions: `You are a Blood Report Analyzer agent. The user will provide 
        blood test report text. Your job:
        1. Use extract_biomarkers to parse the report
        2. Use classify_values to determine which are abnormal
        3. Use get_recommendations for abnormal values
        4. Synthesize into a clear, color-coded health summary
        DISCLAIMER: This is educational only, not medical advice.`,
      tools: [
        { type: "platform", id: "web_search" },
        // Custom tools pointing to your Hono server
        { type: "function", name: "extract_biomarkers", 
          url: "YOUR_HONO_URL/tools/extract-biomarkers", method: "POST", ... },
        { type: "function", name: "classify_values",
          url: "YOUR_HONO_URL/tools/classify-values", method: "POST", ... },
        { type: "function", name: "get_recommendations",
          url: "YOUR_HONO_URL/tools/get-recommendations", method: "POST", ... },
      ],
      answerFormat: HealthReport  // Pydantic/Zod schema for structured output
    },
    options: { await_completion: true }
  });
  ```
- [ ] Define structured output schema (HealthReport with biomarkers, classifications, recommendations)
- [ ] Test end-to-end with a sample blood report text
- [ ] Handle edge cases: empty reports, missing values

**Checkpoint:** Agent receives sample report text → calls all 3 tools → returns structured health report

---

## PHASE 4 — Frontend & Demo Polish (12 min)
**Time: 0:55 → 1:07**

- [ ] Build a simple frontend (choose one):
  - **Option A: Streamlit** (fastest for hackathon)
    - PDF upload widget
    - Display results as color-coded cards
  - **Option B: React artifact** (more polished)
    - Clean upload UI → progress indicator → health dashboard
    - Green/Yellow/Red color coding for biomarker status
    - Recommendation cards with food icons
- [ ] Add the medical disclaimer prominently
- [ ] Add sample blood report for demo (pre-loaded)
- [ ] Wire frontend → Subconscious agent → display results

**Checkpoint:** Working demo: upload PDF → see health dashboard with recommendations

---

## PHASE 5 — Testing, Edge Cases & Demo Prep (8 min)
**Time: 1:07 → 1:15**

- [ ] Test with 3 different blood report formats
- [ ] Verify critical value alerts work (e.g., glucose > 400)
- [ ] Verify specialist referrals appear for critical values
- [ ] Prepare 2-minute demo script:
  1. Show the architecture (30 sec)
  2. Upload a blood report (15 sec)
  3. Show agent reasoning steps (30 sec)
  4. Walk through the health dashboard (30 sec)
  5. Highlight: custom tools + structured output + web_search (15 sec)
- [ ] Take screenshots for presentation
- [ ] Final README with setup instructions

**Checkpoint:** Full demo runs cleanly end-to-end

---

## Key Technical Decisions

| Decision | Choice | Why |
|----------|--------|-----|
| Backend framework | **Hono** (Node.js) | Hackathon requirement, ultrafast, TypeScript-native |
| Agent platform | **Subconscious** (TIM-GPT) | Hackathon platform, long-horizon reasoning, tool use |
| Tool registration | **Custom function tools** via URL | Subconscious calls your Hono endpoints directly |
| PDF parsing | **Regex patterns** (hackathon MVP) | Fast to implement, good enough for structured reports |
| Structured output | **Pydantic/Zod schemas** | Type-safe agent responses |
| Frontend | **React/Streamlit** | Quick to build, good demo impact |

---

## What Makes This a Winner

1. **Real-world problem** — Health literacy gap affects millions
2. **Clean architecture** — Subconscious agent orchestrates 3 specialized tools
3. **Custom tool integration** — Shows mastery of the Subconscious platform
4. **Structured output** — Not just chat, but a typed health dashboard
5. **Multi-tool orchestration** — Agent decides tool order and handles edge cases
6. **Built-in web_search** — Agent can look up latest medical guidelines in real-time
7. **Scalable design** — Each tool is independently deployable/improvable

---

## Risk Mitigation

| Risk | Mitigation |
|------|------------|
| Hono server not publicly accessible | Use ngrok/localtunnel to expose localhost |
| Subconscious tool call failures | Add fallback logic in agent instructions |
| PDF text extraction complexity | Pre-extract text, send as string (skip PDF parsing for MVP) |
| Running out of time | Phase 4 is optional — CLI demo works too |

---

*Plan created: March 1, 2026 — Ruthvik's hackathon sprint 🔥*
