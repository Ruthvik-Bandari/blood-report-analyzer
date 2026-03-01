"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { statusConfig, calculateGaugePercent, getStatusBadgeVariant } from "@/lib/status-helpers";
import type { Biomarker } from "@/types";

interface BiomarkerCardProps {
  biomarker: Biomarker;
  index: number;
}

export function BiomarkerCard({ biomarker, index }: BiomarkerCardProps) {
  const { name, value, unit, referenceRange, status } = biomarker;
  const config = statusConfig[status];
  const gaugePercent = calculateGaugePercent(value, referenceRange.min, referenceRange.max);

  // Where the "normal zone" sits in the gauge
  const range = referenceRange.max - referenceRange.min;
  const padding = range * 0.3;
  const totalRange = range + padding * 2;
  const normalStart = (padding / totalRange) * 100;
  const normalEnd = ((padding + range) / totalRange) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.03 }}
      className={cn(
        "group rounded-xl border bg-card p-4 transition-all hover:shadow-md",
        config.borderColor
      )}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <h4 className="truncate text-sm font-semibold">{name}</h4>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Ref: {referenceRange.min}–{referenceRange.max} {unit}
          </p>
        </div>
        <Badge variant={getStatusBadgeVariant(status)} className="shrink-0">
          {config.label}
        </Badge>
      </div>

      {/* Value */}
      <div className="mt-3 flex items-baseline gap-1.5">
        <span className={cn("font-display text-2xl font-bold tabular-nums", config.textColor)}>
          {value}
        </span>
        <span className="text-xs text-muted-foreground">{unit}</span>
      </div>

      {/* Inline Gauge */}
      <div className="mt-3">
        <div className="relative h-2 w-full overflow-hidden rounded-full bg-muted">
          {/* Normal zone highlight */}
          <div
            className="absolute inset-y-0 bg-success/20 rounded-full"
            style={{
              left: `${normalStart}%`,
              width: `${normalEnd - normalStart}%`,
            }}
          />
          {/* Value marker */}
          <motion.div
            className={cn("absolute top-1/2 h-3.5 w-1.5 -translate-y-1/2 rounded-full shadow-sm", config.dotColor)}
            initial={{ left: "0%" }}
            animate={{ left: `calc(${gaugePercent}% - 3px)` }}
            transition={{ duration: 0.6, delay: 0.2 + index * 0.03, ease: "easeOut" }}
          />
        </div>
        {/* Scale labels */}
        <div className="mt-1 flex justify-between text-[10px] text-muted-foreground/60">
          <span>{Math.max(0, referenceRange.min - referenceRange.min * 0.3).toFixed(0)}</span>
          <span>{(referenceRange.max + referenceRange.max * 0.15).toFixed(0)}</span>
        </div>
      </div>
    </motion.div>
  );
}
