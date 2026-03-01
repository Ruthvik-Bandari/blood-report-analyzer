"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FileText, Upload, X, AlertCircle, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface FileDropzoneProps {
  onFileSelect: (file: File) => void;
  onFileClear: () => void;
  selectedFile: File | null;
  error?: string;
  disabled?: boolean;
}

function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}

export function FileDropzone({
  onFileSelect,
  onFileClear,
  selectedFile,
  error,
  disabled = false,
}: FileDropzoneProps) {
  const [isDragReject, setIsDragReject] = useState(false);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setIsDragReject(false);
      if (acceptedFiles.length > 0) {
        onFileSelect(acceptedFiles[0]);
      }
    },
    [onFileSelect]
  );

  const onDropRejected = useCallback(() => {
    setIsDragReject(true);
    setTimeout(() => setIsDragReject(false), 3000);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    onDropRejected,
    accept: { "application/pdf": [".pdf"] },
    maxSize: 10 * 1024 * 1024,
    maxFiles: 1,
    disabled,
    multiple: false,
  });

  const hasError = Boolean(error) || isDragReject;

  if (selectedFile) {
    return (
      <div
        className={cn(
          "rounded-xl border-2 border-solid p-4 transition-all",
          error
            ? "border-destructive/50 bg-destructive/5"
            : "border-success/50 bg-success/5"
        )}
      >
        <div className="flex items-start gap-4">
          <div
            className={cn(
              "flex h-12 w-12 shrink-0 items-center justify-center rounded-lg",
              error ? "bg-destructive/10" : "bg-success/10"
            )}
          >
            <FileText
              className={cn(
                "h-6 w-6",
                error ? "text-destructive" : "text-success"
              )}
            />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              {error ? (
                <AlertCircle className="h-4 w-4 shrink-0 text-destructive" />
              ) : (
                <CheckCircle2 className="h-4 w-4 shrink-0 text-success" />
              )}
              <p className="truncate text-sm font-medium">{selectedFile.name}</p>
            </div>
            <p className="mt-0.5 text-xs text-muted-foreground">
              {formatFileSize(selectedFile.size)} · PDF Document
            </p>
            {error && (
              <p className="mt-1.5 text-xs text-destructive">{error}</p>
            )}
          </div>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-8 w-8 shrink-0"
            onClick={(e) => {
              e.stopPropagation();
              onFileClear();
            }}
            disabled={disabled}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div
      {...getRootProps()}
      className={cn(
        "group relative cursor-pointer rounded-xl border-2 border-dashed p-8 text-center transition-all duration-200",
        isDragActive && !isDragReject && "border-primary bg-primary/5 scale-[1.01]",
        hasError && "border-destructive bg-destructive/5",
        !isDragActive && !hasError && "border-border hover:border-primary/50 hover:bg-muted/30",
        disabled && "pointer-events-none opacity-50"
      )}
    >
      <input {...getInputProps()} />

      <div className="flex flex-col items-center gap-3">
        <div
          className={cn(
            "flex h-14 w-14 items-center justify-center rounded-2xl transition-colors",
            isDragActive && !isDragReject && "bg-primary/10",
            hasError && "bg-destructive/10",
            !isDragActive && !hasError && "bg-muted group-hover:bg-primary/10"
          )}
        >
          <Upload
            className={cn(
              "h-6 w-6 transition-colors",
              isDragActive && !isDragReject && "text-primary",
              hasError && "text-destructive",
              !isDragActive && !hasError && "text-muted-foreground group-hover:text-primary"
            )}
          />
        </div>

        {isDragActive && !isDragReject ? (
          <p className="text-sm font-medium text-primary">Drop your PDF here</p>
        ) : isDragReject ? (
          <p className="text-sm font-medium text-destructive">
            Only PDF files under 10MB are accepted
          </p>
        ) : (
          <>
            <div>
              <p className="text-sm font-medium">
                Drag & drop your blood report PDF
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                or click to browse · PDF only · Max 10MB
              </p>
            </div>
          </>
        )}
      </div>

      {error && !selectedFile && (
        <p className="mt-3 text-xs text-destructive">{error}</p>
      )}
    </div>
  );
}
