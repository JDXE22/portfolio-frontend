# Hello! Welcome to my portfolio

A modern, fast, and accessible developer portfolio built with Next.js, TypeScript, and Tailwind CSS. It showcases projects, tells your story, and lets visitors contact you — with smooth Framer Motion animations and full EN/ES internationalization.

- App Router (Next.js) with `[lang]` dynamic routing for i18n
- Strong typing across components and data
- Fetches content from a simple REST API
- Interactive UI (modals, floating nav pill, scroll progress bar, focus states)
- SEO-optimised: Open Graph, Twitter cards, JSON-LD structured data
- Accessible: skip-to-content link, ARIA labels, keyboard-navigable
- Tests with Vitest + React Testing Library

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Architecture & Structure](#architecture--structure)
- [Getting Started](#getting-started)
- [Environment](#environment)
- [Running, Testing, Building](#running-testing-building)
- [License](#license)

## Overview

The root `/` redirects to `/en` (or `/es`). Each locale renders five main sections:

- **Hero**: animated intro with smooth scroll CTAs
- **About**: bio, soft skills, technical skill indicators, CV download
- **Technologies**: tech-stack grid with knowledge-level badges
- **Projects**: responsive grid + details modal, difficulty/status badges, links
- **Contact**: polished form with async submit

Page entry: [portfolio/app/[lang]/page.tsx](portfolio/app/%5Blang%5D/page.tsx)

## Tech Stack

- Next.js 16 + React 19 (App Router)
- TypeScript
- Tailwind CSS v4 (via PostCSS plugin)
- next-intl 4 — EN/ES internationalisation
- Framer Motion 12 — animations & scroll progress
- Vitest 3 + React Testing Library + JSDOM

## Architecture & Project Structure

For a detailed look at the application's high-level design, data flow, and directory structure, please refer to the [Architecture Documentation](architecture.md).

## Getting Started

- Requirements: Node 18+, a package manager (npm/yarn/pnpm)
- Navigate into the app folder:
  - cd portfolio
- Install dependencies:
  - npm install
- Create a `.env` file (see Environment & API)

## Environment

The app uses two environment variables. In `portfolio/config/env.ts` you can see how `API_BASE_URL` is resolved from `PUBLIC_DB_CONNECTION` (server-side) or `NEXT_PUBLIC_DB_CONNECTION` (client-side). A second variable controls the canonical site URL used for SEO metadata.

Example `.env` (in the `portfolio/` directory):

```
PUBLIC_DB_CONNECTION=https://your-api.example.com
# or (client-side only)
# NEXT_PUBLIC_DB_CONNECTION=https://your-api.example.com

NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

If `API_BASE_URL` is missing, project fetching returns empty arrays and contact submit throws a friendly error. If `NEXT_PUBLIC_SITE_URL` is missing, metadata falls back to `https://davidesparza.dev`.

## Running, Testing, Building

From the `portfolio/` directory:

- Development: `npm run dev`
- Tests (Vitest): `npm test` or `npx vitest`
- Watch mode: `npm run test:watch`
- Build: `npm run build`
- Start production server: `npm start`

Individual test suites:

- `npm run testProjects` — projects section integration tests
- `npm run testContactForm` — contact form tests

## License

Personal portfolio — adapt and reuse responsibly.
