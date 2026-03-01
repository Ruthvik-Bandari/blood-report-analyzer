"use client";

import { useSearchParams } from "next/navigation";
import { motion } from "motion/react";
import {
  LayoutDashboard,
  FileText,
  Calendar,
  Upload,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { useReport } from "@/hooks/use-reports";
import { DEMO_REPORT } from "@/lib/mock-data";
import { formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { SummaryStats } from "@/components/common/summary-stats";
import { BiomarkerGrid } from "@/components/common/biomarker-grid";
import { CriticalAlerts } from "@/components/common/critical-alerts";
import { RecommendationCards } from "@/components/common/recommendation-cards";
import { PdfExportButton } from "@/components/common/pdf-export-button";
import { DashboardSkeleton } from "@/components/common/dashboard-skeleton";
import { EmptyDashboard } from "@/components/common/empty-dashboard";
import { ErrorState } from "@/components/common/error-state";

export function DashboardClient() {
  const searchParams = useSearchParams();
  const reportId = searchParams.get("reportId");

  const {
    data: fetchedReport,
    isLoading,
    isError,
    error,
    refetch,
  } = useReport(reportId ?? "");

  const report = reportId ? fetchedReport : DEMO_REPORT;
  const isDemo = !reportId;

  if (reportId && isLoading) {
    return <DashboardSkeleton />;
  }

  if (reportId && isError) {
    return (
      <ErrorState
        title="Failed to load report"
        message={
          error instanceof Error
            ? error.message
            : "Could not load the report. It may have been deleted or the link is invalid."
        }
        onRetry={() => refetch()}
      />
    );
  }

  if (!report) {
    return <EmptyDashboard />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Header bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <LayoutDashboard className="h-5 w-5 text-primary" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-display text-xl font-bold tracking-tight sm:text-2xl">
                Health Dashboard
              </h1>
              {isDemo && (
                <Badge variant="secondary" className="text-[10px]">
                  Demo Data
                </Badge>
              )}
            </div>
            <div className="mt-0.5 flex items-center gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <FileText className="h-3 w-3" />
                {report.fileName}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {formatDate(report.uploadedAt)}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <PdfExportButton report={report} />
          <Link href="/upload">
            <Button variant="outline" size="sm" className="gap-2">
              <Upload className="h-3.5 w-3.5" />
              New Report
            </Button>
          </Link>
        </div>
      </div>

      <Separator />

      {/* Critical Alerts */}
      <CriticalAlerts
        biomarkers={report.biomarkers}
        recommendations={report.recommendations}
      />

      {/* Summary Stats */}
      <SummaryStats
        total={report.summary.total}
        normal={report.summary.normal}
        low={report.summary.low}
        high={report.summary.high}
        critical={report.summary.critical}
      />

      {/* Biomarker Grid */}
      <div>
        <h2 className="mb-4 text-sm font-semibold text-muted-foreground uppercase tracking-wider">
          Biomarker Results ({report.biomarkers.length})
        </h2>
        <BiomarkerGrid biomarkers={report.biomarkers} />
      </div>

      <Separator />

      {/* Recommendations */}
      {report.recommendations.length > 0 && (
        <div>
          <div className="mb-4 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              Recommendations ({report.recommendations.length})
            </h2>
          </div>
          <RecommendationCards recommendations={report.recommendations} />
        </div>
      )}
    </motion.div>
  );
}
