# Soro Amidou — portfolio

[![CI](https://github.com/AmidNova/portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/AmidNova/portfolio/actions/workflows/ci.yml)

Personal site of a Data Engineering student (ISEP Paris, AWS and Databricks certified) looking for an internship from January 2027. Dark bento layout, French and English.

- Live: [amidousoro.me](https://amidousoro.me) (Cloudflare Pages) · [aws.amidousoro.me](https://aws.amidousoro.me) (AWS S3 + CloudFront mirror)

## Stack

- React 19, TypeScript, Vite
- Tailwind CSS v4, Framer Motion, lucide / react-icons / devicon
- React Router v7 (home, `/projects`, `/about`, styled 404)
- Vitest + Testing Library

## Layout

```
src/
  components/   cards, pages and shared UI (Marquee, ProjectPreview, …)
  data/         profile.ts — projects, certifications, toolbox, experience
  locales/      fr.ts / en.ts — every visible string
  context/      LangProvider (FR/EN, remembered in localStorage)
  lib/          pure helpers (project filter, …)
  __tests__/    component and behaviour tests
public/         og.png, CV, robots.txt, sitemap.xml
```

Content lives in `src/data/profile.ts` and the two locale files; adding a project there adds it to the home marquee and the `/projects` page.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server on http://localhost:5173 |
| `npm run build` | Type-check (`tsc -b`) and production build to `dist/` |
| `npm run preview` | Serve the built `dist/` |
| `npm run lint` | ESLint |
| `npm run test:run` | Run the test suite once |
| `npm run coverage` | Tests with coverage |

Node version is pinned in `.nvmrc` (22).

## CI and deploy

Every pull request runs lint, tests, the build, a CSP guard, Lighthouse budgets and a file-size guard in GitHub Actions, and gets a live preview on Cloudflare Pages. Merging to `main` deploys Cloudflare Pages, and the AWS mirror once CI passes. Both hosts are described in Terraform (`infra/`). Security headers (strict CSP, HSTS…) live in one file, `public/_headers`, used by both.

**Full write-up: [docs/devops.md](docs/devops.md)**, covering the architecture, pipeline, quality gates, security headers, performance work, runbooks and decision log.
