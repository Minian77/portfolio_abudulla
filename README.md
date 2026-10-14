# Abdulla Alawad — Portfolio

Dashboard-style portfolio built with Next.js 16, Tailwind CSS v4, and Motion.

## Run locally

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm build && pnpm start
```

## Edit content

All content lives in one file: `src/data/resume.ts` (profile, metrics, experience, projects, skills, languages).
Wrap text in `**double asterisks**` to emphasise it. Add LinkedIn/GitHub via `PROFILE.links`.

## Features

- Sticky sidebar navigation with scroll-spy, breadcrumb top bar
- `⌘K` / `Ctrl K` command palette (navigation, copy email, theme)
- Interactive career timeline linked to role details
- Project cards with outcome metrics and data-flow pipelines
- Filterable technical stack
- Light/dark themes, reduced-motion support, keyboard accessible
