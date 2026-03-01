"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { BiomarkerCard } from "@/components/common/biomarker-card";
import type { Biomarker, BiomarkerStatus } from "@/types";

interface BiomarkerGridProps {
  biomarkers: Biomarker[];
}

const statusFilters: { value: "all" | BiomarkerStatus; label: string }[] = [
  { value: "all", label: "All" },
  { value: "critical", label: "Critical" },
  { value: "high", label: "High" },
  { value: "low", label: "Low" },
  { value: "normal", label: "Normal" },
];

export function BiomarkerGrid({ biomarkers }: BiomarkerGridProps) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | BiomarkerStatus>("all");

  const categories = useMemo(() => {
    const cats = [...new Set(biomarkers.map((b) => b.category))];
    return ["All", ...cats];
  }, [biomarkers]);

  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = useMemo(() => {
    return biomarkers.filter((b) => {
      const matchesSearch =
        !search ||
        b.name.toLowerCase().includes(search.toLowerCase()) ||
        b.category.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === "all" || b.status === statusFilter;
      const matchesCategory = activeCategory === "All" || b.category === activeCategory;
      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [biomarkers, search, statusFilter, activeCategory]);

  return (
    <div className="space-y-4">
      {/* Search + Status Filter */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-xs flex-1">
          <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search biomarkers…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex items-center gap-1.5 overflow-x-auto">
          <Filter className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
          {statusFilters.map(({ value, label }) => {
            const count =
              value === "all"
                ? biomarkers.length
                : biomarkers.filter((b) => b.status === value).length;
            return (
              <button
                key={value}
                onClick={() => setStatusFilter(value)}
                className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium transition-colors ${
                  statusFilter === value
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border text-muted-foreground hover:border-primary/50"
                }`}
              >
                {label}
                <span className="tabular-nums opacity-60">{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Category Tabs */}
      <Tabs value={activeCategory} onValueChange={setActiveCategory}>
        <TabsList className="h-auto flex-wrap justify-start gap-1 bg-transparent p-0">
          {categories.map((cat) => {
            const count =
              cat === "All"
                ? biomarkers.length
                : biomarkers.filter((b) => b.category === cat).length;
            return (
              <TabsTrigger
                key={cat}
                value={cat}
                className="gap-1.5 rounded-lg data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:shadow-none"
              >
                {cat}
                <Badge variant="secondary" className="h-4 px-1 text-[10px]">
                  {count}
                </Badge>
              </TabsTrigger>
            );
          })}
        </TabsList>

        {categories.map((cat) => (
          <TabsContent key={cat} value={cat} className="mt-4">
            <AnimatePresence mode="wait">
              {filtered.length === 0 ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex h-40 items-center justify-center rounded-xl border border-dashed"
                >
                  <p className="text-sm text-muted-foreground">
                    No biomarkers match your filters.
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="grid"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
                >
                  {filtered.map((biomarker, i) => (
                    <BiomarkerCard key={biomarker.id} biomarker={biomarker} index={i} />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
