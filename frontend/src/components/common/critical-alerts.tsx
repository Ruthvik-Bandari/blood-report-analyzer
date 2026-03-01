"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { AlertOctagon, X, ChevronDown, ChevronUp, Stethoscope } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Biomarker, Recommendation } from "@/types";

interface CriticalAlertsProps {
  biomarkers: Biomarker[];
  recommendations: Recommendation[];
}

export function CriticalAlerts({ biomarkers, recommendations }: CriticalAlertsProps) {
  const [dismissed, setDismissed] = useState(false);
  const [expanded, setExpanded] = useState(true);

  const abnormal = biomarkers.filter((b) => b.status === "high" || b.status === "low" || b.status === "critical");
  const urgentRecs = recommendations.filter((r) => r.priority === "urgent");

  if (abnormal.length === 0 || dismissed) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, height: 0 }}
      className={cn(
        "rounded-xl border-2 overflow-hidden transition-colors",
        urgentRecs.length > 0
          ? "border-critical/50 bg-critical/5"
          : "border-warning/50 bg-warning/5"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2.5">
          <AlertOctagon
            className={cn(
              "h-4.5 w-4.5",
              urgentRecs.length > 0 ? "text-critical" : "text-warning"
            )}
          />
          <span className="text-sm font-semibold">
            {abnormal.length} abnormal value{abnormal.length !== 1 ? "s" : ""} detected
          </span>
          {urgentRecs.length > 0 && (
            <Badge variant="critical" className="text-[10px]">
              {urgentRecs.length} urgent
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={() => setDismissed(true)}
          >
            <X className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      {/* Detail */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="border-t border-border/30 px-4 pb-3 pt-2">
              <div className="flex flex-wrap gap-2">
                {abnormal.map((b) => (
                  <div
                    key={b.id}
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-md border px-2 py-1 text-xs font-medium",
                      b.status === "critical"
                        ? "border-critical/30 bg-critical/10 text-critical"
                        : b.status === "high"
                          ? "border-destructive/30 bg-destructive/10 text-destructive"
                          : "border-warning/30 bg-warning/10 text-warning"
                    )}
                  >
                    <span className={cn(
                      "h-1.5 w-1.5 rounded-full",
                      b.status === "critical" ? "bg-critical" : b.status === "high" ? "bg-destructive" : "bg-warning"
                    )} />
                    {b.name}: {b.value} {b.unit}
                  </div>
                ))}
              </div>
              {urgentRecs.length > 0 && (
                <div className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Stethoscope className="h-3 w-3" />
                  Specialist consultation recommended — see recommendations below
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
