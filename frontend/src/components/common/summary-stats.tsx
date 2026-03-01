"use client";

import { motion } from "motion/react";
import { CheckCircle2, TrendingDown, TrendingUp, AlertOctagon } from "lucide-react";
import { cn } from "@/lib/utils";

interface SummaryStatsProps {
  total: number;
  normal: number;
  low: number;
  high: number;
  critical: number;
}

const stats = [
  {
    key: "normal" as const,
    label: "Normal",
    icon: CheckCircle2,
    color: "text-success",
    bg: "bg-success/10",
    ring: "ring-success/20",
  },
  {
    key: "low" as const,
    label: "Low",
    icon: TrendingDown,
    color: "text-warning",
    bg: "bg-warning/10",
    ring: "ring-warning/20",
  },
  {
    key: "high" as const,
    label: "High",
    icon: TrendingUp,
    color: "text-destructive",
    bg: "bg-destructive/10",
    ring: "ring-destructive/20",
  },
  {
    key: "critical" as const,
    label: "Critical",
    icon: AlertOctagon,
    color: "text-critical",
    bg: "bg-critical/10",
    ring: "ring-critical/20",
  },
];

export function SummaryStats({ total, normal, low, high, critical }: SummaryStatsProps) {
  const values = { normal, low, high, critical };

  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
      {stats.map(({ key, label, icon: Icon, color, bg, ring }, i) => (
        <motion.div
          key={key}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: i * 0.06 }}
          className={cn(
            "relative overflow-hidden rounded-xl border bg-card p-4 ring-1",
            ring
          )}
        >
          <div className="flex items-center justify-between">
            <div className={cn("flex h-9 w-9 items-center justify-center rounded-lg", bg)}>
              <Icon className={cn("h-4.5 w-4.5", color)} />
            </div>
            <span className={cn("font-display text-2xl font-bold tabular-nums", color)}>
              {values[key]}
            </span>
          </div>
          <p className="mt-2 text-xs font-medium text-muted-foreground">{label}</p>
          {total > 0 && (
            <div className="mt-2 h-1 overflow-hidden rounded-full bg-muted">
              <motion.div
                className={cn("h-full rounded-full", bg.replace("/10", ""))}
                initial={{ width: 0 }}
                animate={{ width: `${(values[key] / total) * 100}%` }}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.06 }}
                style={{ backgroundColor: `var(--${key === "normal" ? "success" : key === "low" ? "warning" : key === "high" ? "destructive" : "critical"})` }}
              />
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
}
