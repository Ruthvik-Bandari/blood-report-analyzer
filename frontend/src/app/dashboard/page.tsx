import type { Metadata } from "next";
import { Suspense } from "react";
import { AlertTriangle } from "lucide-react";
import { DashboardClient } from "@/components/common/dashboard-client";
import { DashboardSkeleton } from "@/components/common/dashboard-skeleton";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "View your blood report analysis with color-coded biomarker results.",
};

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      {/* Medical Disclaimer Banner */}
      <div className="mb-6 flex items-start gap-3 rounded-lg border border-warning/30 bg-warning/5 p-3">
        <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-warning" />
        <p className="text-xs leading-relaxed text-muted-foreground">
          <strong className="text-foreground">Educational tool only.</strong>{" "}
          These results are not a medical diagnosis. Always consult a qualified healthcare
          provider before making any medical decisions.
        </p>
      </div>

      <Suspense fallback={<DashboardSkeleton />}>
        <DashboardClient />
      </Suspense>
    </div>
  );
}
