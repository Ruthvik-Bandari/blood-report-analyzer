"use client";

import Link from "next/link";
import { motion } from "motion/react";
import {
  ArrowLeft,
  FileText,
  Calendar,
  Download,
  Activity,
  Sparkles,
} from "lucide-react";
import { useReport } from "@/hooks/use-reports";
import { formatDate, cn } from "@/lib/utils";
import { statusConfig } from "@/lib/status-helpers";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { BiomarkerCard } from "@/components/common/biomarker-card";
import { RecommendationCards } from "@/components/common/recommendation-cards";
import { CriticalAlerts } from "@/components/common/critical-alerts";
import { PdfExportButton } from "@/components/common/pdf-export-button";
import { DashboardSkeleton } from "@/components/common/dashboard-skeleton";
import { ErrorState } from "@/components/common/error-state";

interface ResultsClientProps {
  reportId: string;
}

export function ResultsClient({ reportId }: ResultsClientProps) {
  const { data: report, isLoading, isError, error, refetch } = useReport(reportId);

  if (isLoading) return <DashboardSkeleton />;

  if (isError) {
    return (
      <ErrorState
        title="Report not found"
        message={error instanceof Error ? error.message : "Could not load this report."}
        onRetry={() => refetch()}
      />
    );
  }

  if (!report) return <ErrorState title="Report not found" />;

  const abnormal = report.biomarkers.filter((b) => b.status !== "normal");
  const normal = report.biomarkers.filter((b) => b.status === "normal");
  const categories = [...new Set(report.biomarkers.map((b) => b.category))];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Nav + header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Link href="/dashboard">
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="font-display text-xl font-bold tracking-tight sm:text-2xl">
              Report Details
            </h1>
            <div className="mt-0.5 flex items-center gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <FileText className="h-3 w-3" />
                {report.fileName}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {formatDate(report.uploadedAt)}
              </span>
              <span className="flex items-center gap-1">
                <Activity className="h-3 w-3" />
                {report.biomarkers.length} biomarkers
              </span>
            </div>
          </div>
        </div>
        <PdfExportButton report={report} />
      </div>

      {/* Alerts */}
      <CriticalAlerts biomarkers={report.biomarkers} recommendations={report.recommendations} />

      {/* Overview cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Biomarkers</CardTitle>
          </CardHeader>
          <CardContent>
            <span className="font-display text-3xl font-bold">{report.summary.total}</span>
            <p className="mt-1 text-xs text-muted-foreground">across {categories.length} categories</p>
          </CardContent>
        </Card>
        <Card className="border-success/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-success">Within Normal Range</CardTitle>
          </CardHeader>
          <CardContent>
            <span className="font-display text-3xl font-bold text-success">{report.summary.normal}</span>
            <p className="mt-1 text-xs text-muted-foreground">
              {report.summary.total > 0
                ? `${((report.summary.normal / report.summary.total) * 100).toFixed(0)}% of results`
                : "—"}
            </p>
          </CardContent>
        </Card>
        <Card className="border-destructive/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-destructive">Needs Attention</CardTitle>
          </CardHeader>
          <CardContent>
            <span className="font-display text-3xl font-bold text-destructive">{abnormal.length}</span>
            <p className="mt-1 text-xs text-muted-foreground">
              {report.summary.low} low · {report.summary.high} high · {report.summary.critical} critical
            </p>
          </CardContent>
        </Card>
      </div>

      <Separator />

      {/* Abnormal values section */}
      {abnormal.length > 0 && (
        <div>
          <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-destructive">
            <Activity className="h-4 w-4" />
            Abnormal Values ({abnormal.length})
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {abnormal.map((b, i) => (
              <BiomarkerCard key={b.id} biomarker={b} index={i} />
            ))}
          </div>
        </div>
      )}

      {/* Normal values (collapsed) */}
      {normal.length > 0 && (
        <div>
          <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-success">
            <Activity className="h-4 w-4" />
            Normal Values ({normal.length})
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {normal.map((b, i) => (
              <BiomarkerCard key={b.id} biomarker={b} index={i} />
            ))}
          </div>
        </div>
      )}

      <Separator />

      {/* Recommendations */}
      {report.recommendations.length > 0 && (
        <div>
          <div className="mb-4 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Personalized Recommendations ({report.recommendations.length})
            </h2>
          </div>
          <RecommendationCards recommendations={report.recommendations} />
        </div>
      )}
    </motion.div>
  );
}
