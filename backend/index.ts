import { Hono } from "hono";
import { cors } from "hono/cors";
import { serve } from "@hono/node-server";
import { extractBiomarkers } from "./tools/extract.js";
import { classifyBiomarkers } from "./tools/classify.js";
import { generateRecommendations } from "./tools/recommend.js";
import type { FullAnalysisResult } from "./types.js";

const app = new Hono();

// ─── Middleware ────────────────────────────────────────────────────
app.use("/*", cors());

// ─── Health Check ─────────────────────────────────────────────────
app.get("/health", (c) => {
  return c.json({
    status: "ok",
    service: "blood-report-analyzer",
    version: "1.0.0",
    timestamp: new Date().toISOString(),
    endpoints: [
      "GET  /health",
      "POST /tools/extract-biomarkers",
      "POST /tools/classify-biomarkers",
      "POST /tools/generate-recommendations",
      "POST /tools/full-analysis",
    ],
  });
});

// ─── Tool 1: Extract Biomarkers ───────────────────────────────────
app.post("/tools/extract-biomarkers", async (c) => {
  try {
    const body = await c.req.json();
    const reportText: string = body.report_text;

    if (!reportText || typeof reportText !== "string") {
      return c.json({ error: "Missing or invalid 'report_text' in request body" }, 400);
    }

    const result = extractBiomarkers(reportText);
    return c.json(result);
  } catch (err) {
    return c.json({ error: "Failed to extract biomarkers", details: String(err) }, 500);
  }
});

// ─── Tool 2: Classify Biomarkers ──────────────────────────────────
app.post("/tools/classify-biomarkers", async (c) => {
  try {
    const body = await c.req.json();
    const biomarkers = body.biomarkers;

    if (!biomarkers || !Array.isArray(biomarkers)) {
      return c.json({ error: "Missing or invalid 'biomarkers' array in request body" }, 400);
    }

    const result = classifyBiomarkers(biomarkers);
    return c.json(result);
  } catch (err) {
    return c.json({ error: "Failed to classify biomarkers", details: String(err) }, 500);
  }
});

// ─── Tool 3: Generate Recommendations ─────────────────────────────
app.post("/tools/generate-recommendations", async (c) => {
  try {
    const body = await c.req.json();
    const classified = body.classified;

    if (!classified || !Array.isArray(classified)) {
      return c.json(
        { error: "Missing or invalid 'classified' array in request body" },
        400
      );
    }

    const result = generateRecommendations(classified);
    return c.json(result);
  } catch (err) {
    return c.json(
      { error: "Failed to generate recommendations", details: String(err) },
      500
    );
  }
});

// ─── Full Analysis Pipeline ───────────────────────────────────────
// Runs all 3 tools in sequence — this is what Om's frontend calls.
app.post("/tools/full-analysis", async (c) => {
  try {
    const body = await c.req.json();
    const reportText: string = body.report_text;

    if (!reportText || typeof reportText !== "string") {
      return c.json({ error: "Missing or invalid 'report_text' in request body" }, 400);
    }

    // Stage 1: Extract
    const extraction = extractBiomarkers(reportText);

    // Stage 2: Classify
    const classification = classifyBiomarkers(extraction.biomarkers);

    // Stage 3: Recommend
    const recommendations = generateRecommendations(classification.classified);

    const result: FullAnalysisResult = {
      extraction,
      classification,
      recommendations,
      timestamp: new Date().toISOString(),
    };

    return c.json(result);
  } catch (err) {
    return c.json(
      { error: "Full analysis failed", details: String(err) },
      500
    );
  }
});

// ─── Start Server ─────────────────────────────────────────────────
const PORT = Number(process.env.PORT) || 3000;

serve(
  {
    fetch: app.fetch,
    port: PORT,
  },
  (info) => {
    console.log(`\n🩸 Blood Report Analyzer Server`);
    console.log(`   Running on http://localhost:${info.port}`);
    console.log(`   Health check: http://localhost:${info.port}/health`);
    console.log(`\n   Endpoints:`);
    console.log(`   POST /tools/extract-biomarkers`);
    console.log(`   POST /tools/classify-biomarkers`);
    console.log(`   POST /tools/generate-recommendations`);
    console.log(`   POST /tools/full-analysis\n`);
  }
);

export default app;
