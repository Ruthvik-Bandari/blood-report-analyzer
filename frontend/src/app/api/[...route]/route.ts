import { Hono } from "hono";
import { handle } from "hono/vercel";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { HTTPException } from "hono/http-exception";
import { generateMockReport } from "@/lib/mock-data";
import type { ReportAnalysis } from "@/types";

const app = new Hono().basePath("/api");

// ─── In-Memory Store (replaced by DB in production) ─────
const reportStore = new Map<string, ReportAnalysis>();

// ─── Middleware ───────────────────────────────────────────
app.use("*", logger());
app.use("*", cors());

// ─── Health Check ────────────────────────────────────────
app.get("/health", (c) => {
  return c.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    version: "0.2.0",
  });
});

// ─── Upload Endpoint ─────────────────────────────────────
app.post("/upload", async (c) => {
  try {
    const body = await c.req.parseBody();
    const file = body.file;

    if (!file || !(file instanceof File)) {
      throw new HTTPException(400, {
        message: "No PDF file provided. Please upload a valid blood report PDF.",
      });
    }

    if (file.type !== "application/pdf") {
      throw new HTTPException(400, {
        message: "Invalid file type. Only PDF files are accepted.",
      });
    }

    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      throw new HTTPException(400, {
        message: "File too large. Maximum size is 10MB.",
      });
    }

    // Simulate processing delay (NLP pipeline would go here)
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const reportId = crypto.randomUUID();
    const report = generateMockReport(reportId, file.name);
    reportStore.set(reportId, report);

    return c.json({
      success: true,
      reportId,
      message: "Report analyzed successfully.",
    });
  } catch (error) {
    if (error instanceof HTTPException) {
      throw error;
    }
    throw new HTTPException(500, {
      message: "An unexpected error occurred while processing your upload.",
    });
  }
});

// ─── Get Report by ID ────────────────────────────────────
app.get("/reports/:id", (c) => {
  const id = c.req.param("id");
  const report = reportStore.get(id);

  if (!report) {
    const demoReport = generateMockReport(id, "demo_report.pdf");
    return c.json(demoReport);
  }

  return c.json(report);
});

// ─── List Reports ────────────────────────────────────────
app.get("/reports", (c) => {
  const reports = Array.from(reportStore.values()).sort(
    (a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
  );
  return c.json({ reports, total: reports.length });
});

// ─── Delete Report ───────────────────────────────────────
app.delete("/reports/:id", (c) => {
  const id = c.req.param("id");
  const existed = reportStore.delete(id);

  if (!existed) {
    throw new HTTPException(404, { message: "Report not found." });
  }

  return c.json({ success: true, message: "Report deleted." });
});

// ─── Global Error Handler ────────────────────────────────
app.onError((err, c) => {
  if (err instanceof HTTPException) {
    return c.json(
      {
        message: err.message,
        code: `HTTP_${err.status}`,
        status: err.status,
      },
      err.status
    );
  }

  console.error("Unhandled API error:", err);
  return c.json(
    {
      message: "Internal server error",
      code: "INTERNAL_ERROR",
      status: 500,
    },
    500
  );
});

app.notFound((c) => {
  return c.json(
    {
      message: `Route not found: ${c.req.method} ${c.req.path}`,
      code: "NOT_FOUND",
      status: 404,
    },
    404
  );
});

export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const DELETE = handle(app);
export const PATCH = handle(app);
