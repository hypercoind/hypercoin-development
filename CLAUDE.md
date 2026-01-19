# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static portfolio website for a Bitcoin/FOSS developer. Built with Astro and TypeScript using content collections for project management.

## Development (Docker - Primary Workflow)

Docker is the primary build and test workflow for this project.

```bash
# Development with hot reload
docker compose up dev

# Production build and serve
docker compose up prod --build

# Standalone production build
docker build -t hypercoin-dev .
docker run -p 8080:80 hypercoin-dev
```

- Development server available at http://localhost:4321
- Production server available at http://localhost:8080

## Local Development (Alternative)

For local development without Docker:

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Architecture

### File Structure
```
src/
├── content/
│   ├── config.ts           # Project schema definition
│   └── projects/           # Project markdown files
├── layouts/
│   └── BaseLayout.astro    # HTML shell, meta tags, fonts
├── components/
│   ├── Header.astro        # Site header with logo, tagline, nav
│   ├── Footer.astro        # Site footer with social icons
│   ├── ProjectCard.astro   # Individual project card
│   ├── ProjectGrid.astro   # Grid of all projects
│   ├── About.astro         # Compact horizontal about section
│   ├── StatusBadge.astro   # Project status indicator
│   └── SkillTag.astro      # Reusable skill/tech tag
├── pages/
│   ├── index.astro         # Home page
│   └── projects/
│       └── [slug].astro    # Dynamic project detail pages
├── styles/
│   └── global.css          # Design tokens and base styles
└── scripts/
    └── scroll-effects.ts   # Header scroll behavior
```

### Content Collections

Projects are defined as markdown files in `src/content/projects/` with frontmatter:

```yaml
---
title: Project Name
description: Short description
status: live | development | planning
tech:
  - Technology1
  - Technology2
siteUrl: https://example.com (optional)
repoUrl: https://github.com/... (optional)
icon: /images/icon.jpg (optional)
featured: true | false
sortOrder: 1
---

Detailed project content in markdown...
```

### Design Tokens

CSS custom properties defined in `src/styles/global.css`:
- `--primary-orange: #f7931a` (Bitcoin orange)
- `--dark-bg: #0d1117`
- `--card-bg: #161b22`
- Mobile responsive at 768px breakpoint

## Security Headers

The site includes comprehensive security meta tags in BaseLayout.astro:
- Content Security Policy (CSP)
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- Strict Referrer-Policy

When adding new external resources, update the CSP meta tag in `src/layouts/BaseLayout.astro`.

## Adding New Projects

1. Create a new markdown file in `src/content/projects/`
2. Add required frontmatter (title, description, status, tech)
3. Write project content in markdown
4. Rebuild with `docker compose up prod --build` to verify
5. The project will automatically appear on the home page and get its own detail page at `/projects/[slug]/`

## External Dependencies

- Astro 5.x
- TypeScript
- Google Fonts: Inter (body text), JetBrains Mono (code/tags)

## Deployment

The site outputs static files to `dist/` and is configured for Cloudflare Pages deployment.
