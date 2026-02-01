# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Codebase Reference

**Before exploring the codebase manually, read `docs/CHECKPOINT.md` first.** It contains a comprehensive map of project architecture, directory structure, module inventory, and critical paths.

## Project Overview

Static portfolio website for a Bitcoin/FOSS developer. Built with Astro 5.x and TypeScript, using content collections for project management. Deploys as static files to Cloudflare Pages.

## Build & Dev Commands

Docker is the primary workflow:

```bash
docker compose up dev          # Dev server with hot reload → localhost:4321
docker compose up prod --build # Production build + serve → localhost:8080
```

Local alternative:

```bash
npm install
npm run dev      # Dev server
npm run build    # Type-check (astro check) + build → dist/
npm run preview  # Preview production build
```

`npm run build` runs `astro check && astro build` — type errors will fail the build.

## Architecture

- **Static output** — Astro compiles to plain HTML/CSS/JS. No server runtime.
- **Content collections** — Projects are markdown files in `src/content/projects/` with Zod-validated frontmatter (schema in `src/content/config.ts`). Each file auto-generates a page at `/projects/[slug]/`.
- **Routing** — File-based via `src/pages/`. Home page is `index.astro`, project details via `projects/[slug].astro`.
- **Styling** — CSS custom properties in `src/styles/global.css`. Bitcoin orange (`#f7931a`) primary. Dark theme. Space-themed visual effects. Mobile breakpoint at 768px.
- **Production Docker** — Multi-stage build: Node builder → Nginx 1.27-alpine with non-root user.

## Key Constraints

- **CSP headers** are defined in both `src/layouts/BaseLayout.astro` (meta tags) and `nginx.conf`. When adding external resources (scripts, fonts, APIs), update the CSP in BaseLayout.astro.
- **Google Fonts** loaded via CDN: Inter (body) and JetBrains Mono (code/tags). Already allowed in CSP.
- Static images go in `public/images/`.

## Adding a Project

Create a markdown file in `src/content/projects/` with frontmatter matching the schema in `src/content/config.ts` (required: `title`, `description`, `status`, `tech`). It auto-appears on the home page and gets a detail page.
