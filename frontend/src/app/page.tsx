"use client";

import Link from "next/link";
import {
  Upload,
  Brain,
  Shield,
  Stethoscope,
  ArrowRight,
  FileText,
  Sparkles,
  Activity,
} from "lucide-react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const features = [
  {
    icon: FileText,
    title: "Universal PDF Parsing",
    description:
      "Handles any lab format — digital or scanned. Hybrid extraction with PyMuPDF and Surya OCR with automatic format detection.",
  },
  {
    icon: Brain,
    title: "Biomedical NER",
    description:
      "Fine-tuned PubMedBERT identifies biomarkers, values, units, and reference ranges across inconsistent lab terminologies.",
  },
  {
    icon: Activity,
    title: "Smart Classification",
    description:
      "Classifies each biomarker as Normal, Low, High, or Critical using WHO and Mayo Clinic reference ranges.",
  },
  {
    icon: Sparkles,
    title: "Personalized Recommendations",
    description:
      "Actionable dietary and lifestyle advice powered by semantic retrieval over USDA nutritional data.",
  },
  {
    icon: Shield,
    title: "Critical Alerts",
    description:
      "Flags dangerous values and suggests the right specialist — endocrinologist, hematologist, or nephrologist.",
  },
  {
    icon: Stethoscope,
    title: "Educational, Not Diagnostic",
    description:
      "Designed for health literacy. Always recommends consulting a healthcare provider for medical decisions.",
  },
];

const stats = [
  { value: "90+", label: "Annotated Reports" },
  { value: "4", label: "Entity Types" },
  { value: "0.85+", label: "Target F1 Score" },
  { value: "50+", label: "Biomarkers Covered" },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export default function HomePage() {
  return (
    <div className="relative">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 right-0 h-[500px] w-[500px] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-40 left-0 h-[400px] w-[400px] rounded-full bg-primary/3 blur-3xl" />
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-4 pb-16 pt-20 sm:px-6 sm:pt-28 lg:px-8">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Badge variant="secondary" className="mb-6 gap-1.5 px-3 py-1">
            <Sparkles className="h-3 w-3" />
            NLP-Powered Health Analysis
          </Badge>

          <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Understand your{" "}
            <span className="gradient-text">blood report</span>
            <br />
            in seconds
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Upload any blood test PDF and get a color-coded health dashboard
            with personalized dietary recommendations, lifestyle changes, and
            critical alerts — all powered by biomedical NLP.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/upload">
              <Button size="xl" className="gap-2.5 shadow-lg shadow-primary/20">
                <Upload className="h-4 w-4" />
                Upload Blood Report
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="outline" size="xl" className="gap-2">
                View Demo Dashboard
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="mx-auto mt-20 grid max-w-2xl grid-cols-2 gap-4 sm:grid-cols-4"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {stats.map(({ value, label }) => (
            <motion.div
              key={label}
              variants={item}
              className="rounded-xl border bg-card/50 p-4 text-center backdrop-blur-sm"
            >
              <div className="font-display text-2xl font-bold text-primary">
                {value}
              </div>
              <div className="mt-1 text-xs text-muted-foreground">{label}</div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Features */}
      <section className="border-t bg-muted/20 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
              End-to-end NLP pipeline
            </h2>
            <p className="mt-3 text-muted-foreground">
              From raw PDF to actionable health insights in five processing stages.
            </p>
          </div>

          <motion.div
            className="mx-auto mt-14 grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-3"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
          >
            {features.map(({ icon: Icon, title, description }) => (
              <motion.div key={title} variants={item}>
                <Card className="group h-full border-border/50 bg-card/50 backdrop-blur-sm transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
                  <CardHeader className="pb-3">
                    <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      <Icon className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-base">{title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            className="mx-auto max-w-2xl rounded-2xl border bg-card/50 p-8 text-center backdrop-blur-sm sm:p-12"
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="font-display text-2xl font-bold">
              Ready to analyze your report?
            </h2>
            <p className="mt-3 text-muted-foreground">
              Upload your blood test PDF and get instant insights.
              No sign-up required.
            </p>
            <Link href="/upload" className="mt-6 inline-block">
              <Button size="lg" className="gap-2 shadow-lg shadow-primary/20">
                <Upload className="h-4 w-4" />
                Get Started
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
