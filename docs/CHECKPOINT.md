# CHECKPOINT.md

> Last updated: 2026-02-01

## Quick Reference

| Item | Value |
|------|-------|
| **Type** | Static portfolio site |
| **Framework** | Astro 5.x |
| **Language** | TypeScript 5.7 |
| **Build** | Docker (primary), npm (alternative) |
| **Dev server** | `docker compose up dev` → localhost:4321 |
| **Prod build** | `docker compose up prod --build` → localhost:8080 |
| **Deploy target** | Cloudflare Pages (static files → `dist/`) |
| **Site URL** | https://hypercoin.dev |

## Directory Structure

```
src/
├── pages/
│   ├── index.astro                 # Home page
│   └── projects/[slug].astro       # Dynamic project detail pages
├── layouts/
│   └── BaseLayout.astro            # HTML shell, meta tags, CSP headers, fonts
├── components/
│   ├── Header.astro                # Logo, tagline, navigation
│   ├── Footer.astro                # Social icons
│   ├── About.astro                 # Horizontal about section
│   ├── ProjectGrid.astro           # Queries content collection, renders grid
│   ├── ProjectCard.astro           # Individual project card
│   ├── StatusBadge.astro           # Status indicator (live/development/planning)
│   └── SkillTag.astro              # Reusable tech tag
├── content/
│   ├── config.ts                   # Zod schema for project frontmatter
│   └── projects/                   # Markdown files (4 projects)
│       ├── btcdiagrams.md
│       ├── hypercharts.md
│       ├── hypercoin-info.md
│       └── ton3s.md
├── scripts/
│   └── scroll-effects.ts           # Header scroll behavior
└── styles/
    └── global.css                  # Design tokens, space theme, responsive styles
```

**Root config files:** `astro.config.mjs`, `tsconfig.json`, `Dockerfile`, `docker-compose.yml`, `nginx.conf`

**Static assets:** `public/images/` (project icons, profile photo)

## Architecture

**Static site generation** — Astro compiles to plain HTML/CSS/JS at build time. No server runtime.

**Content Collections** — Projects defined as markdown in `src/content/projects/` with Zod-validated frontmatter. Schema fields: `title`, `description`, `status` (live|development|planning), `tech[]`, `siteUrl?`, `repoUrl?`, `icon?`, `featured?`, `sortOrder`.

**Routing** — File-based. `index.astro` is the home page. `projects/[slug].astro` generates a page per project markdown file.

**Styling** — CSS custom properties in `global.css`. Primary color: `--primary-orange: #f7931a` (Bitcoin orange). Dark theme (`#0d1117`). Space-themed nebula gradients and starfield animation. Mobile breakpoint at 768px.

**Fonts** — Google Fonts CDN: Inter (body), JetBrains Mono (code/tags).

## Docker Setup

**Development** (`docker compose up dev`):
- `node:20.18-alpine`, port 4321, volume-mounted for hot reload

**Production** (`docker compose up prod --build`):
- Multi-stage: Node build → Nginx 1.27-alpine serve
- Non-root user (appuser:1001), port 8080
- nginx.conf: 1-year static asset cache, security headers, SPA fallback

## Security

Headers configured in both `BaseLayout.astro` (meta tags) and `nginx.conf`:
- Content-Security-Policy (strict, no unsafe-eval)
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- Referrer-Policy: strict-origin-when-cross-origin
- COOP, COEP, CORP policies

**When adding external resources**, update CSP in `src/layouts/BaseLayout.astro`.

## Dependencies

Only 3 npm packages: `astro`, `@astrojs/check`, `typescript`. No dev dependencies.

## Adding a Project

1. Create markdown file in `src/content/projects/` with required frontmatter
2. Build with `docker compose up prod --build` to verify
3. Auto-appears on home page and gets `/projects/[slug]/` route
