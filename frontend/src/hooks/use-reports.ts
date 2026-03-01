import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import type { ReportAnalysis, UploadResponse } from "@/types";

// ─── Query Keys ──────────────────────────────────────────
export const queryKeys = {
  reports: ["reports"] as const,
  report: (id: string) => ["reports", id] as const,
};

// ─── Upload Report ───────────────────────────────────────
export function useUploadReport() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("file", file);
      return apiClient.upload<UploadResponse>("/upload", formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.reports });
    },
  });
}

// ─── Get Report ──────────────────────────────────────────
export function useReport(id: string) {
  return useQuery({
    queryKey: queryKeys.report(id),
    queryFn: () => apiClient.get<ReportAnalysis>(`/reports/${id}`),
    enabled: Boolean(id),
  });
}

// ─── List Reports ────────────────────────────────────────
export function useReports() {
  return useQuery({
    queryKey: queryKeys.reports,
    queryFn: () =>
      apiClient.get<{ reports: ReportAnalysis[]; total: number }>("/reports"),
  });
}
