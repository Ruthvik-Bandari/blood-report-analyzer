import type { Metadata } from "next";
import { Suspense } from "react";
import { ResultsClient } from "./results-client";
import { DashboardSkeleton } from "@/components/common/dashboard-skeleton";

export const metadata: Metadata = {
  title: "Report Results",
  description: "Detailed view of your blood report analysis.",
};

export default function ResultsPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <Suspense fallback={<DashboardSkeleton />}>
        <ResultsClient reportId={params.id} />
      </Suspense>
    </div>
  );
}
