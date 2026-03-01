import { z } from "zod";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ACCEPTED_FILE_TYPES = ["application/pdf"];

export const uploadSchema = z.object({
  file: z
    .instanceof(File, { message: "Please select a file to upload." })
    .refine((file) => file.size > 0, "File cannot be empty.")
    .refine(
      (file) => file.size <= MAX_FILE_SIZE,
      `File size must be less than ${MAX_FILE_SIZE / 1024 / 1024}MB.`
    )
    .refine(
      (file) => ACCEPTED_FILE_TYPES.includes(file.type),
      "Only PDF files are accepted."
    ),
  patientName: z
    .string()
    .min(1, "Patient name is required.")
    .max(100, "Name must be under 100 characters.")
    .optional(),
  notes: z
    .string()
    .max(500, "Notes must be under 500 characters.")
    .optional(),
});

export type UploadFormData = z.infer<typeof uploadSchema>;

export const reportFilterSchema = z.object({
  status: z.enum(["all", "normal", "low", "high", "critical"]).default("all"),
  category: z.string().optional(),
  search: z.string().optional(),
});

export type ReportFilterData = z.infer<typeof reportFilterSchema>;
