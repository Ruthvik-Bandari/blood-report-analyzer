"use client";

import { useState } from "react";
import { Download, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import type { ReportAnalysis } from "@/types";
import { statusConfig } from "@/lib/status-helpers";

interface PdfExportButtonProps {
  report: ReportAnalysis;
}

export function PdfExportButton({ report }: PdfExportButtonProps) {
  const [exporting, setExporting] = useState(false);

  async function handleExport() {
    setExporting(true);
    try {
      const printWindow = window.open("", "_blank");
      if (!printWindow) {
        toast.error("Please allow popups to export PDF.");
        return;
      }

      const abnormal = report.biomarkers.filter((b) => b.status !== "normal");
      const statusColor = (s: string) =>
        s === "normal" ? "#22c55e" : s === "low" ? "#eab308" : s === "high" ? "#ef4444" : "#dc2626";

      printWindow.document.write(`<!DOCTYPE html><html><head>
        <title>BloodLens Report — ${report.fileName}</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: #1a1a2e; padding: 40px; max-width: 800px; margin: 0 auto; font-size: 13px; line-height: 1.5; }
          h1 { font-size: 22px; font-weight: 700; margin-bottom: 4px; }
          h2 { font-size: 15px; font-weight: 600; margin: 24px 0 10px; padding-bottom: 6px; border-bottom: 2px solid #e5e7eb; }
          .meta { color: #6b7280; font-size: 12px; margin-bottom: 20px; }
          .disclaimer { background: #fef3c7; border: 1px solid #f59e0b; border-radius: 8px; padding: 10px 14px; font-size: 11px; margin-bottom: 24px; }
          .summary { display: flex; gap: 12px; margin-bottom: 20px; }
          .stat { flex: 1; text-align: center; padding: 12px; border-radius: 8px; border: 1px solid #e5e7eb; }
          .stat-val { font-size: 24px; font-weight: 700; }
          .stat-label { font-size: 11px; color: #6b7280; margin-top: 2px; }
          table { width: 100%; border-collapse: collapse; font-size: 12px; }
          th { text-align: left; padding: 8px 10px; background: #f9fafb; border-bottom: 2px solid #e5e7eb; font-weight: 600; }
          td { padding: 7px 10px; border-bottom: 1px solid #f3f4f6; }
          .badge { display: inline-block; padding: 2px 8px; border-radius: 10px; font-size: 10px; font-weight: 600; color: white; }
          .rec { padding: 10px 14px; border-radius: 8px; border: 1px solid #e5e7eb; margin-bottom: 8px; }
          .rec-title { font-weight: 600; font-size: 13px; }
          .rec-bio { font-size: 11px; color: #6b7280; }
          .rec-desc { font-size: 12px; color: #374151; margin-top: 4px; }
          @media print { body { padding: 20px; } }
        </style>
      </head><body>
        <h1>🩸 BloodLens Health Report</h1>
        <div class="meta">${report.fileName} · Generated ${new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</div>
        <div class="disclaimer">⚠️ <strong>Medical Disclaimer:</strong> This report is for educational purposes only and is not a substitute for professional medical advice. Always consult a qualified healthcare provider.</div>

        <div class="summary">
          <div class="stat"><div class="stat-val" style="color:#22c55e">${report.summary.normal}</div><div class="stat-label">Normal</div></div>
          <div class="stat"><div class="stat-val" style="color:#eab308">${report.summary.low}</div><div class="stat-label">Low</div></div>
          <div class="stat"><div class="stat-val" style="color:#ef4444">${report.summary.high}</div><div class="stat-label">High</div></div>
          <div class="stat"><div class="stat-val" style="color:#dc2626">${report.summary.critical}</div><div class="stat-label">Critical</div></div>
        </div>

        <h2>Biomarker Results (${report.biomarkers.length})</h2>
        <table>
          <thead><tr><th>Biomarker</th><th>Value</th><th>Reference</th><th>Status</th></tr></thead>
          <tbody>
            ${report.biomarkers
              .map(
                (b) =>
                  `<tr><td><strong>${b.name}</strong><br/><span style="color:#6b7280;font-size:11px">${b.category}</span></td><td>${b.value} ${b.unit}</td><td>${b.referenceRange.min}–${b.referenceRange.max}</td><td><span class="badge" style="background:${statusColor(b.status)}">${b.status.toUpperCase()}</span></td></tr>`
              )
              .join("")}
          </tbody>
        </table>

        ${abnormal.length > 0 ? `<h2>Abnormal Values (${abnormal.length})</h2>
        <table>
          <thead><tr><th>Biomarker</th><th>Your Value</th><th>Normal Range</th><th>Deviation</th></tr></thead>
          <tbody>
            ${abnormal.map((b) => {
              const dev = b.status === "low"
                ? `${((b.referenceRange.min - b.value) / b.referenceRange.min * 100).toFixed(1)}% below`
                : `${((b.value - b.referenceRange.max) / b.referenceRange.max * 100).toFixed(1)}% above`;
              return `<tr><td>${b.name}</td><td style="color:${statusColor(b.status)};font-weight:600">${b.value} ${b.unit}</td><td>${b.referenceRange.min}–${b.referenceRange.max} ${b.unit}</td><td>${dev}</td></tr>`;
            }).join("")}
          </tbody>
        </table>` : ""}

        ${report.recommendations.length > 0 ? `<h2>Recommendations (${report.recommendations.length})</h2>
        ${report.recommendations.map((r) =>
          `<div class="rec"><div class="rec-title">${r.title}</div><div class="rec-bio">${r.biomarkerName} · ${r.type} · Priority: ${r.priority}</div><div class="rec-desc">${r.description}</div></div>`
        ).join("")}` : ""}

        <div style="margin-top:30px;padding-top:16px;border-top:1px solid #e5e7eb;font-size:11px;color:#9ca3af;text-align:center">
          Generated by BloodLens · NLP Course Project · ${new Date().getFullYear()}
        </div>
      </body></html>`);

      printWindow.document.close();
      setTimeout(() => {
        printWindow.print();
        setExporting(false);
        toast.success("PDF export ready. Use your browser's Save as PDF option.");
      }, 500);
    } catch {
      toast.error("Failed to generate PDF export.");
      setExporting(false);
    }
  }

  return (
    <Button variant="outline" size="sm" className="gap-2" onClick={handleExport} disabled={exporting}>
      {exporting ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Download className="h-3.5 w-3.5" />}
      Export PDF
    </Button>
  );
}
