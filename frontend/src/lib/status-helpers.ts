import type { BiomarkerStatus } from "@/types";

export const statusConfig: Record<
  BiomarkerStatus,
  {
    label: string;
    color: string;
    bgColor: string;
    textColor: string;
    borderColor: string;
    dotColor: string;
  }
> = {
  normal: {
    label: "Normal",
    color: "hsl(var(--success))",
    bgColor: "bg-success/10",
    textColor: "text-success",
    borderColor: "border-success/30",
    dotColor: "bg-success",
  },
  low: {
    label: "Low",
    color: "hsl(var(--warning))",
    bgColor: "bg-warning/10",
    textColor: "text-warning",
    borderColor: "border-warning/30",
    dotColor: "bg-warning",
  },
  high: {
    label: "High",
    color: "hsl(var(--destructive))",
    bgColor: "bg-destructive/10",
    textColor: "text-destructive",
    borderColor: "border-destructive/30",
    dotColor: "bg-destructive",
  },
  critical: {
    label: "Critical",
    color: "hsl(var(--critical))",
    bgColor: "bg-critical/10",
    textColor: "text-critical",
    borderColor: "border-critical/30",
    dotColor: "bg-critical",
  },
};

export function getStatusBadgeVariant(status: BiomarkerStatus) {
  const map = {
    normal: "success",
    low: "warning",
    high: "destructive",
    critical: "critical",
  } as const;
  return map[status];
}

/**
 * Calculate where a value falls within or outside a reference range.
 * Returns a percentage 0–100 for use in gauge visualization.
 */
export function calculateGaugePercent(
  value: number,
  min: number,
  max: number
): number {
  if (max === min) return 50;
  const range = max - min;
  const padding = range * 0.3; // 30% padding on each side
  const totalRange = range + padding * 2;
  const adjustedValue = value - (min - padding);
  const percent = (adjustedValue / totalRange) * 100;
  return Math.max(0, Math.min(100, percent));
}
