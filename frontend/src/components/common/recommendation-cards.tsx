"use client";

import { motion } from "motion/react";
import {
  UtensilsCrossed,
  HeartPulse,
  Stethoscope,
  AlertTriangle,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import type { Recommendation } from "@/types";

const typeConfig = {
  dietary: {
    icon: UtensilsCrossed,
    label: "Dietary",
    color: "text-green-600 dark:text-green-400",
    bg: "bg-green-500/10",
    border: "border-green-500/20",
  },
  lifestyle: {
    icon: HeartPulse,
    label: "Lifestyle",
    color: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
  },
  specialist: {
    icon: Stethoscope,
    label: "Specialist",
    color: "text-orange-600 dark:text-orange-400",
    bg: "bg-orange-500/10",
    border: "border-orange-500/20",
  },
};

const priorityConfig = {
  low: { label: "Low", variant: "secondary" as const },
  medium: { label: "Medium", variant: "secondary" as const },
  high: { label: "High", variant: "warning" as const },
  urgent: { label: "Urgent", variant: "critical" as const },
};

interface RecommendationCardsProps {
  recommendations: Recommendation[];
}

export function RecommendationCards({ recommendations }: RecommendationCardsProps) {
  const urgent = recommendations.filter((r) => r.priority === "urgent");
  const rest = recommendations.filter((r) => r.priority !== "urgent");

  return (
    <div className="space-y-4">
      {/* Urgent alerts banner */}
      {urgent.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl border-2 border-critical/40 bg-critical/5 p-4"
        >
          <div className="mb-3 flex items-center gap-2">
            <AlertTriangle className="h-4.5 w-4.5 text-critical" />
            <h3 className="text-sm font-bold text-critical">
              Requires Immediate Attention ({urgent.length})
            </h3>
          </div>
          <div className="space-y-3">
            {urgent.map((rec, i) => {
              const config = typeConfig[rec.type];
              const Icon = config.icon;
              return (
                <motion.div
                  key={rec.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-start gap-3 rounded-lg border border-critical/20 bg-background/80 p-3"
                >
                  <div className={cn("mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg", config.bg)}>
                    <Icon className={cn("h-4 w-4", config.color)} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold">{rec.title}</p>
                      <Badge variant="critical" className="text-[10px]">Urgent</Badge>
                    </div>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      Related to: {rec.biomarkerName}
                    </p>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                      {rec.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* Regular recommendations */}
      <div className="grid gap-3 sm:grid-cols-2">
        {rest.map((rec, i) => {
          const config = typeConfig[rec.type];
          const priority = priorityConfig[rec.priority];
          const Icon = config.icon;
          return (
            <motion.div
              key={rec.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.04 }}
              className={cn(
                "group rounded-xl border bg-card p-4 transition-all hover:shadow-md",
                config.border
              )}
            >
              <div className="flex items-start gap-3">
                <div className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-lg", config.bg)}>
                  <Icon className={cn("h-4.5 w-4.5", config.color)} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-sm font-semibold leading-tight">{rec.title}</p>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {rec.biomarkerName} · {config.label}
                      </p>
                    </div>
                    <Badge variant={priority.variant} className="shrink-0 text-[10px]">
                      {priority.label}
                    </Badge>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {rec.description}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
