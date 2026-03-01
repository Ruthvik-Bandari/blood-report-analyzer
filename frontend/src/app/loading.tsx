import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <Skeleton className="mx-auto h-8 w-48" />
        <Skeleton className="mx-auto mt-6 h-14 w-full max-w-xl" />
        <Skeleton className="mx-auto mt-3 h-14 w-full max-w-md" />
        <Skeleton className="mx-auto mt-6 h-5 w-full max-w-lg" />
        <Skeleton className="mx-auto mt-2 h-5 w-full max-w-sm" />
        <div className="mt-10 flex justify-center gap-4">
          <Skeleton className="h-12 w-48 rounded-lg" />
          <Skeleton className="h-12 w-48 rounded-lg" />
        </div>
      </div>
    </div>
  );
}
