# SETUP.md — Agency Website Infrastructure

**Built by:** Urthona (Infrastructure)
**Date:** 2026-03-20

---

## What's Set Up

- **Next.js 14** with App Router + TypeScript
- **Tailwind CSS** configured with full DESIGN_SYSTEM.md theme (colors, fonts, type scale, spacing)
- **Framer Motion** installed for scroll reveals and page transitions
- **Static export** (`output: 'export'`) → builds to `out/` directory
- **Google Fonts**: Space Grotesk (display) + Space Mono loaded via `next/font`
- **SVG assets** copied to `public/svg/`

## Directory Structure

```
site/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout (fonts, metadata)
│   │   ├── page.tsx            # Homepage
│   │   ├── about/page.tsx      # About (placeholder)
│   │   ├── services/page.tsx   # Services (placeholder)
│   │   └── contact/page.tsx    # Contact (placeholder)
│   ├── components/
│   │   ├── Header.tsx          # Navigation bar
│   │   ├── Footer.tsx          # Site footer
│   │   └── ScrollReveal.tsx    # Framer Motion scroll animation wrapper
│   ├── lib/
│   │   └── content.ts          # All site copy as structured data
│   └── styles/
│       └── globals.css         # Tailwind + CSS custom properties
├── public/svg/                 # SVG assets from Enitharmon
├── tailwind.config.js          # Full theme from DESIGN_SYSTEM.md
├── next.config.js              # Static export config
├── tsconfig.json               # TypeScript config with @/ path alias
└── package.json
```

## Commands

```bash
npm run dev       # Dev server at localhost:3000
npm run build     # Production build → out/ directory
npm run serve     # Serve the out/ directory locally
```

## How to View Locally

1. `cd site && npm run build`
2. `npx serve out` — opens at http://localhost:3000
3. Or just open `out/index.html` in a browser

## Deploy to Vercel

1. Push repo to GitHub
2. Import in Vercel dashboard
3. Framework preset: Next.js (auto-detected)
4. No environment variables needed
5. Deploys on every push

No `vercel.json` needed — Next.js static export is auto-detected.

## For Orc (Builder)

- Drop components into `src/components/`
- Pages go in `src/app/<route>/page.tsx`
- All copy lives in `src/lib/content.ts` — import from there
- Use `<ScrollReveal>` wrapper for scroll-triggered animations
- `Header` and `Footer` components are ready to add to layout
- Tailwind theme has all design tokens: `text-display`, `text-h1`, `font-display`, `text-grey-mid`, `max-w-content`, etc.
- Path alias: `@/` maps to `src/`

## Notes

- `trailingSlash: true` in next.config.js for clean static export paths
- `images.unoptimized: true` since we're doing static export (no image optimization API)
- No analytics, no env vars, no CMS — clean v1
