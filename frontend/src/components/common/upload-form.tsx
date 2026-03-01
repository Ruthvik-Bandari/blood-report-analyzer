"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";
import {
  Loader2,
  Upload,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Brain,
  Activity,
  Sparkles,
} from "lucide-react";
import { uploadSchema, type UploadFormData } from "@/lib/validations";
import { useUploadReport } from "@/hooks/use-reports";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { FileDropzone } from "@/components/common/file-dropzone";

const processingSteps = [
  { icon: FileText, label: "Extracting text from PDF…", progress: 25 },
  { icon: Brain, label: "Identifying biomarkers (NER)…", progress: 50 },
  { icon: Activity, label: "Classifying values…", progress: 75 },
  { icon: Sparkles, label: "Generating recommendations…", progress: 95 },
];

export function UploadForm() {
  const router = useRouter();
  const uploadMutation = useUploadReport();
  const [processingStep, setProcessingStep] = useState(0);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<UploadFormData>({
    resolver: zodResolver(uploadSchema),
    defaultValues: {
      patientName: "",
      notes: "",
    },
  });

  const selectedFile = watch("file");

  function handleFileSelect(file: File) {
    setValue("file", file, { shouldValidate: true });
  }

  function handleFileClear() {
    setValue("file", undefined as unknown as File, { shouldValidate: false });
  }

  async function onSubmit(data: UploadFormData) {
    setProcessingStep(0);

    // Simulate stepping through processing stages
    const stepInterval = setInterval(() => {
      setProcessingStep((prev) => {
        if (prev >= processingSteps.length - 1) {
          clearInterval(stepInterval);
          return prev;
        }
        return prev + 1;
      });
    }, 400);

    try {
      const result = await uploadMutation.mutateAsync(data.file);

      clearInterval(stepInterval);
      setProcessingStep(processingSteps.length - 1);

      toast.success("Report analyzed successfully!", {
        description: "Redirecting to your health dashboard…",
      });

      // Brief pause to show success, then redirect
      await new Promise((resolve) => setTimeout(resolve, 800));
      router.push(`/dashboard?reportId=${result.reportId}`);
    } catch (error) {
      clearInterval(stepInterval);

      const message =
        error instanceof Error
          ? error.message
          : "Failed to upload report. Please try again.";

      toast.error("Upload Failed", { description: message });
    }
  }

  const isProcessing = uploadMutation.isPending;

  return (
    <Card className="border-border/50">
      <CardHeader>
        <CardTitle className="text-lg">Upload Details</CardTitle>
        <CardDescription>
          Upload your blood test report PDF. We&apos;ll extract biomarkers, classify them,
          and generate personalized recommendations.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* File Dropzone */}
          <div className="space-y-2">
            <Label>Blood Report PDF *</Label>
            <FileDropzone
              onFileSelect={handleFileSelect}
              onFileClear={handleFileClear}
              selectedFile={selectedFile}
              error={errors.file?.message}
              disabled={isProcessing}
            />
          </div>

          {/* Optional fields */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="patientName">Patient Name (optional)</Label>
              <Input
                id="patientName"
                placeholder="e.g. John Doe"
                disabled={isProcessing}
                {...register("patientName")}
              />
              {errors.patientName && (
                <p className="text-xs text-destructive">{errors.patientName.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes (optional)</Label>
              <Textarea
                id="notes"
                placeholder="Any additional context…"
                className="h-9 min-h-[36px] resize-none"
                disabled={isProcessing}
                {...register("notes")}
              />
              {errors.notes && (
                <p className="text-xs text-destructive">{errors.notes.message}</p>
              )}
            </div>
          </div>

          {/* Processing indicator */}
          <AnimatePresence>
            {isProcessing && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="rounded-lg border bg-muted/30 p-4">
                  <div className="mb-3 flex items-center gap-2 text-sm font-medium">
                    <Loader2 className="h-4 w-4 animate-spin text-primary" />
                    Analyzing your report…
                  </div>
                  <Progress value={processingSteps[processingStep]?.progress ?? 0} className="mb-3" />
                  <div className="space-y-2">
                    {processingSteps.map((step, i) => {
                      const StepIcon = step.icon;
                      const isActive = i === processingStep;
                      const isDone = i < processingStep;

                      return (
                        <motion.div
                          key={step.label}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="flex items-center gap-2.5 text-xs"
                        >
                          {isDone ? (
                            <CheckCircle2 className="h-3.5 w-3.5 text-success" />
                          ) : (
                            <StepIcon
                              className={`h-3.5 w-3.5 ${
                                isActive ? "text-primary animate-pulse" : "text-muted-foreground/40"
                              }`}
                            />
                          )}
                          <span
                            className={
                              isDone
                                ? "text-success line-through"
                                : isActive
                                  ? "font-medium text-foreground"
                                  : "text-muted-foreground/40"
                            }
                          >
                            {step.label}
                          </span>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Error display */}
          <AnimatePresence>
            {uploadMutation.isError && !isProcessing && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="flex items-start gap-3 rounded-lg border border-destructive/30 bg-destructive/5 p-4">
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
                  <div>
                    <p className="text-sm font-medium text-destructive">Upload Failed</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {uploadMutation.error instanceof Error
                        ? uploadMutation.error.message
                        : "Something went wrong. Please try again."}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Submit */}
          <Button
            type="submit"
            size="lg"
            className="w-full gap-2"
            disabled={isProcessing || !selectedFile}
          >
            {isProcessing ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Processing…
              </>
            ) : (
              <>
                <Upload className="h-4 w-4" />
                Analyze Report
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
