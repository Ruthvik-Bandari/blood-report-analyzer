"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { FileText, Upload, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function EmptyDashboard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border/60 bg-muted/10 px-6 py-20"
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
        <FileText className="h-8 w-8 text-primary" />
      </div>

      <h3 className="mt-5 font-display text-lg font-semibold">No reports yet</h3>
      <p className="mt-1.5 max-w-sm text-center text-sm text-muted-foreground">
        Upload your first blood test report to see a color-coded health dashboard
        with personalized recommendations.
      </p>

      <Link href="/upload" className="mt-6">
        <Button className="gap-2">
          <Upload className="h-4 w-4" />
          Upload Your First Report
          <ArrowRight className="h-4 w-4" />
        </Button>
      </Link>
    </motion.div>
  );
}
