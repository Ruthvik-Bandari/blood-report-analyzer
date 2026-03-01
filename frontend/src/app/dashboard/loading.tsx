import { DashboardSkeleton } from "@/components/common/dashboard-skeleton";

export default function DashboardLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <DashboardSkeleton />
    </div>
  );
}
