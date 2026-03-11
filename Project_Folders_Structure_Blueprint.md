# Project Folder Structure Blueprint

## 1. Structural Overview
This project is a modern portfolio website built with **Next.js (App Router)** and **TypeScript**. It follows a feature-based organization for UI components and a standard layer-based organization for shared utilities, types, and data.

### Key Organizational Principles
- **Route-Driven Layout**: Uses the App Router (`app/`) for routing and layouts.
- **Component Co-location**: Reusable UI components are kept in `app/(components)/ui`, while section-specific components are grouped by section in `app/(components)/sections`.
- **Internationalization (i18n)**: All user-facing strings are managed through a centralized i18n system.
- **Data-Driven Content**: Portfolio projects and other data are stored in the `data/` directory.

## 2. Directory Visualization

```text
portfolio/
├── app/                        # Next.js App Router root
│   ├── [lang]/                 # Dynamic route for internationalization
│   └── globals.css             # Root styles
├── components/                 # Shared and section components
│   ├── layout/                 # Layout-specific components (Header, Footer, Nav)
│   ├── sections/               # Feature-based sections (Hero, About, Projects)
│   │   ├── aboutSection/
│   │   ├── contactSection/
│   │   ├── heroSection/
│   │   ├── projectsSection/
│   │   └── technologiesSection/
│   └── ui/                 # Reusable atomic/UI components
├── config/                     # Global configuration
├── data/                       # Project content and JSON data
├── i18n/                       # Internationalization setup and translations
├── lib/                        # Shared utility functions and core logic
├── public/                     # Static assets (images, fonts, etc.)
├── tests/                      # Testing infrastructure
├── types/                      # Global TypeScript definitions
└── ...                         # Core configuration (next.config.ts, tailwind.config.ts)
```

## 3. Key Directory Analysis

| Path | Purpose | Content types |
| :--- | :--- | :--- |
| `components/sections` | Feature-specific sections | `.tsx`, `.test.tsx`, sub-folders |
| `components/ui` | Reusable UI components | `.tsx` |
| `data/` | Content and metadata | `.ts`, `.json` |
| `i18n/` | Localization logic | `.ts`, `.json` |
| `lib/` | Shared utilities | `.ts` |
| `types/` | Domain types | `.ts`, `.d.ts` |

## 4. File Placement Patterns

- **UI Components**: Place in `components/ui` if they are primitive and reusable across multiple sections.
- **Sections**: Place in `components/sections/[sectionName]`.
- **Complex logic**: Extract to `lib/` if it can be shared or to the local component folder if it's specific.
- **Tests**: Integration tests are co-located with their sections. Unit tests for utilities are in `tests/`.

## 5. Naming and Organization Conventions

- **Components**: `PascalCase` (e.g., `FeaturedProjectCard.tsx`).
- **Directories**: `camelCase` (e.g., `projectsSection`).
- **Tests**: `[name].test.tsx` or `[name].[category].test.tsx`.
- **Types**: Shared types in `types/` use `[Domain].types.ts` pattern.

## 6. Recommendations for Structured Improvement

1.  **Move `(components)` outside `app/`**: DONE. Separated routing from component organization.
2.  **Standardize co-location**: DONE. All sections follow the same `camelCase` directory and `PascalCase` file pattern.
3.  **Refine `lib/` folder**: Utility functions are categorized.
4.  **Split `types.ts`**: DONE. Types are now domain-specific (e.g., `ui.types.ts`, `projects.types.ts`).

---
*Last Updated: 2026-03-12*
