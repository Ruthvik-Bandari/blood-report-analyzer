import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";

import { extractBiomarkers } from "./tools/extract.js";
import { classifyBiomarkers } from "./tools/classify.js";
import { generateRecommendations } from "./tools/recommend.js";

import type {
  ExtractionRequest,
  ClassificationRequest,
  RecommendationRequest,
} from "./types.js";

const app = new Hono();

// ─── Middleware ─────────────────────────────────────────────

app.use("*", cors()); // Allow Subconscious to call our endpoints
app.use("*", logger());
app.use("*", prettyJSON());

// ─── Health Check ──────────────────────────────────────────

app.get("/", (c) =>
  c.json({
    name: "Blood Report Analyzer — Hono Tool Server",
    version: "1.0.0",
    status: "healthy",
    tools: [
      "POST /tools/extract-biomarkers",
      "POST /tools/classify-values",
      "POST /tools/get-recommendations",
      "POST /tools/full-analysis",
    ],
    disclaimer:
      "Educational tool only. Not a substitute for professional medical advice.",
  })
);

app.get("/health", (c) => c.json({ status: "ok", timestamp: new Date().toISOString() }));

// ─── Tool 1: Extract Biomarkers ────────────────────────────

app.post("/tools/extract-biomarkers", async (c) => {
  try {
    const body = (await c.req.json()) as ExtractionRequest;

    if (!body.report_text || typeof body.report_text !== "string") {
      return c.json({ error: "Missing or invalid 'report_text' field" }, 400);
    }

    const result = extractBiomarkers(body);
    return c.json(result);
  } catch (err) {
    return c.json({ error: "Extraction failed", details: String(err) }, 500);
  }
});

// ─── Tool 2: Classify Values ──────────────────────────────

app.post("/tools/classify-values", async (c) => {
  try {
    const body = (await c.req.json()) as ClassificationRequest;

    if (!body.biomarkers || !Array.isArray(body.biomarkers)) {
      return c.json({ error: "Missing or invalid 'biomarkers' array" }, 400);
    }

    const result = classifyBiomarkers(body);
    return c.json(result);
  } catch (err) {
    return c.json({ error: "Classification failed", details: String(err) }, 500);
  }
});

// ─── Tool 3: Get Recommendations ──────────────────────────

app.post("/tools/get-recommendations", async (c) => {
  try {
    const body = (await c.req.json()) as RecommendationRequest;

    if (!body.abnormal_biomarkers || !Array.isArray(body.abnormal_biomarkers)) {
      return c.json(
        { error: "Missing or invalid 'abnormal_biomarkers' array" },
        400
      );
    }

    const result = generateRecommendations(body);
    return c.json(result);
  } catch (err) {
    return c.json({ error: "Recommendation generation failed", details: String(err) }, 500);
  }
});

// ─── Bonus: Full Pipeline in One Call ─────────────────────
// (Useful for testing — the agent will call tools individually)

app.post("/tools/full-analysis", async (c) => {
  try {
    const body = (await c.req.json()) as ExtractionRequest;

    if (!body.report_text || typeof body.report_text !== "string") {
      return c.json({ error: "Missing or invalid 'report_text' field" }, 400);
    }

    // Step 1: Extract
    const extraction = extractBiomarkers(body);

    // Step 2: Classify
    const classification = classifyBiomarkers({ biomarkers: extraction.biomarkers });

    // Step 3: Get recommendations for abnormal values
    const abnormal = classification.classifications.filter(
      (c) => c.status !== "NORMAL"
    );
    const recommendations = generateRecommendations({
      abnormal_biomarkers: abnormal,
    });

    return c.json({
      extraction,
      classification,
      recommendations,
      summary: {
        total_biomarkers: extraction.total_found,
        ...classification.summary,
        total_recommendations: recommendations.recommendations.length,
      },
    });
  } catch (err) {
    return c.json({ error: "Full analysis failed", details: String(err) }, 500);
  }
});

// ─── Start Server ──────────────────────────────────────────

const PORT = parseInt(process.env.PORT ?? "3000", 10);

serve({ fetch: app.fetch, port: PORT }, (info) => {
  console.log(`\n🩸 Blood Report Analyzer — Tool Server`);
  console.log(`   Running on http://localhost:${info.port}`);
  console.log(`\n   Endpoints:`);
  console.log(`   GET  /              → Server info`);
  console.log(`   GET  /health        → Health check`);
  console.log(`   POST /tools/extract-biomarkers    → Parse report text`);
  console.log(`   POST /tools/classify-values       → Classify biomarkers`);
  console.log(`   POST /tools/get-recommendations   → Get health advice`);
  console.log(`   POST /tools/full-analysis          → All-in-one pipeline`);
  console.log(`\n   ⚠️  Educational tool only. Not medical advice.\n`);
});
