# Soro Amidou — portfolio

[![CI](https://github.com/AmidNova/portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/AmidNova/portfolio/actions/workflows/ci.yml)

Personal site of a Data Engineering student (ISEP Paris, AWS and Databricks certified) looking for an internship from January 2027. Dark bento layout, French and English.

- Live: [portfolio-ci3.pages.dev](https://portfolio-ci3.pages.dev) (Cloudflare Pages) · [portfolio-nine-weld-45.vercel.app](https://portfolio-nine-weld-45.vercel.app) (Vercel)

## Stack

- React 19, TypeScript, Vite 7
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

GitHub Actions (`.github/workflows/ci.yml`) runs lint, tests and the build on every pull request and on `main`, and fails if any built file exceeds Cloudflare's 25 MiB limit.

Both hosts build from `main`. Deep links (`/projects`, `/about`) are served by an SPA fallback: Cloudflare Pages does it by default, Vercel through `vercel.json`.
