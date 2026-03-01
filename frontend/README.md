# 🩸 BloodLens — Blood Report Analyzer

> NLP-powered health blood report analyzer with personalized recommendations.

## Tech Stack

- **Framework:** Next.js 15 (App Router, SSR)
- **Backend:** Hono (running on Next.js API routes)
- **UI:** shadcn/ui + Tailwind CSS
- **Animations:** Motion (framer-motion)
- **Data Fetching:** TanStack React Query
- **Validation:** Zod + React Hook Form + @hookform/resolvers
- **Linting:** Oxlint

## Getting Started

```bash
# Install dependencies (using bun)
bun install

# Run development server
bun dev

# Build for production
bun run build

# Lint
bun run lint
```

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── api/[...route]/     # Hono API catch-all route
│   ├── upload/             # PDF upload page
│   ├── dashboard/          # Health dashboard
│   ├── results/[id]/       # Individual report results
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Landing page
│   ├── loading.tsx         # Global loading skeleton
│   ├── not-found.tsx       # 404 page
│   └── global-error.tsx    # Error page
├── components/
│   ├── ui/                 # shadcn-style base components
│   ├── layout/             # Header, Footer
│   ├── theme/              # Theme color switcher, mode toggle
│   └── common/             # ErrorBoundary, shared components
├── hooks/                  # React Query hooks
├── lib/                    # Utilities, API client, validations, themes
├── providers/              # React Query + Theme + Error providers
├── types/                  # TypeScript interfaces
└── styles/                 # Global CSS with multi-theme system
```

## Theming

7 color themes (Zinc, Rose, Blue, Green, Orange, Violet, Teal) × 2 modes (Light/Dark) = **14 combinations**.

Use the paintbrush icon in the header to switch color themes, and the sun/moon icon for light/dark mode.

## Build Phases

- **Phase 1** ✅ Foundation — Layout, theming, nav, error handling, providers
- **Phase 2** ✅ Upload & Dashboard — Drag-drop upload, Zod validation, biomarker cards, gauges
- **Phase 3** ✅ Results & Polish — Recommendations, critical alerts, PDF export, detail view

## Team

Om Patel · Yash Jain · Ruthvik Bandari

---

⚠️ **Medical Disclaimer:** This tool is for educational purposes only and is NOT a substitute for professional medical advice.
