import { Droplets, AlertTriangle } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Medical disclaimer */}
        <div className="mb-6 flex items-start gap-3 rounded-lg border border-warning/30 bg-warning/5 p-4">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-warning" />
          <p className="text-xs leading-relaxed text-muted-foreground">
            <strong className="text-foreground">Medical Disclaimer:</strong>{" "}
            BloodLens is an educational tool designed for health literacy purposes only.
            It is <strong>not</strong> a substitute for professional medical advice, diagnosis,
            or treatment. Always consult a qualified healthcare provider for medical decisions.
          </p>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Droplets className="h-4 w-4 text-primary" />
            <span>&copy; {new Date().getFullYear()} BloodLens</span>
            <span className="text-border">·</span>
            <span>NLP Course Project</span>
          </div>
          <div className="flex gap-4 text-xs text-muted-foreground">
            <Link href="/" className="transition-colors hover:text-foreground">
              Home
            </Link>
            <Link href="/upload" className="transition-colors hover:text-foreground">
              Upload
            </Link>
            <Link href="/dashboard" className="transition-colors hover:text-foreground">
              Dashboard
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
