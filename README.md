# Hello! Welcome to my portfolio

A modern, fast, and animated developer portfolio built with Next.js, TypeScript, and Tailwind CSS. It showcases projects, tells your story, and lets visitors contact you — with a little sparkle from a lightweight WebGL particle background.

- App directory (Next.js 13/14 style)
- Strong typing across components and data
- Fetches content from a simple REST API
- Interactive UI (modals, hover details, focus states)
- Tests with Vitest + React Testing Library

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment](#environment)
- [Running, Testing, Building](#running-testing-building)
- [License](#license)

## Overview

This app renders four main sections:

- Hero: animated intro with smooth scroll CTAs (EN/ES copy)
- About: bio, skills, tech stack, social links
- Projects: responsive grid + details modal, badges, links
- Contact: polished form with CC/BCC, attachments, and async submit

Page entry: [portfolio/app/page.tsx](portfolio/app/page.tsx)

## Tech Stack

- Next.js + React (App Router)
- TypeScript
- Tailwind CSS (via PostCSS plugin)
- OGL (WebGL particles)
- Vitest + React Testing Library
- JSDOM for component tests

## Project Structure

```
portfolio/
  app/
    (components)/
      backgrounds/Background.tsx
      layout/Section.tsx
      sections/
        aboutSection/
        contactSection/
        heroSection/
        projectsSection/
      ui/
        Button.tsx
        Modal.tsx
    globals.css
    layout.tsx
    page.tsx
  config/
    env.ts
  data/
    dataApi.ts
  i18n/
    dictionaries.ts
  lib/
    className.ts
    difficultyClass.ts
    errors.ts
    statusClass.ts
  tests/
  types/
  next.config.ts
  postcss.config.mjs
  tsconfig.json
  vitest.config.mts
```

## Getting Started

- Requirements: Node 18+, a package manager (npm/yarn/pnpm)
- Navigate into the app folder:
  - cd portfolio
- Install dependencies:
  - npm install
- Create a `.env` file (see Environment & API)

## Environment

The app expects a base URL for the backend API. In the folder /data there's a file with the api operations there you will see the API_BASE_URL variable which contains either or the PUBLIC_DB | NEXT_PUBLIC_DB_CONNECTION variable that is set in the /config folder

Example `.env` (in the `portfolio/` directory):

```

PUBLIC_DB_CONNECTION=https://your-api.example.com
# or (client-side only)
# NEXT_PUBLIC_DB_CONNECTION=https://your-api.example.com
```

If `API_BASE_URL` is missing, project fetching returns empty arrays and contact submit throws a friendly error.

## Running, Testing, Building

From the `portfolio/` directory:

- Development: run the dev script in [portfolio/package.json](portfolio/package.json)
  - npm run dev
- Tests (Vitest):
  - npm test
  - or: npx vitest
- Build:
  - npm run build
- Start production server:
  - npm start

Note: Commands depend on your package.json scripts; use the equivalents for your package manager.

## License

Personal portfolio — adapt and reuse responsibly.
