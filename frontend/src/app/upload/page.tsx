import type { Metadata } from "next";
import {
  Upload,
  Shield,
  FileText,
  Zap,
  Lock,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { UploadForm } from "@/components/common/upload-form";

export const metadata: Metadata = {
  title: "Upload Report",
  description: "Upload your blood test report PDF for analysis.",
};

const tips = [
  {
    icon: FileText,
    title: "Supported Formats",
    description: "Digital or scanned PDF blood test reports from any laboratory.",
  },
  {
    icon: Zap,
    title: "Instant Analysis",
    description: "Our NLP pipeline extracts and classifies biomarkers in seconds.",
  },
  {
    icon: Lock,
    title: "Privacy First",
    description: "Reports are processed in-memory and never permanently stored.",
  },
  {
    icon: Shield,
    title: "Educational Only",
    description: "Results are for health literacy. Always consult your doctor.",
  },
];

export default function UploadPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="mb-10 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
          <Upload className="h-6 w-6 text-primary" />
        </div>
        <h1 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
          Upload Blood Report
        </h1>
        <p className="mt-2 text-muted-foreground">
          Upload your blood test PDF and receive a personalized health dashboard.
        </p>
      </div>

      {/* Main Content: Form + Sidebar */}
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Upload Form — 2 cols */}
        <div className="lg:col-span-2">
          <UploadForm />
        </div>

        {/* Tips Sidebar — 1 col */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-muted-foreground">How it works</h3>
          {tips.map(({ icon: Icon, title, description }) => (
            <Card key={title} className="border-border/50 bg-card/50">
              <CardContent className="flex items-start gap-3 p-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Icon className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">{title}</p>
                  <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                    {description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
