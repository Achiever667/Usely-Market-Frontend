Project: Usely Market — Frontend

Overview
- Framework: Next.js (app router)
- React version: 19
- Styling: Tailwind CSS (v4), utility-first components
- State: zustand for client state, react-query for data fetching
- GraphQL client: graphql-request
- UI primitives: Radix UI, lucide-react icons

Quick start
1. Install dependencies:

   npm install

2. Run development server:

   npm run dev

3. Build:

   npm run build

Key files & configuration
- Package scripts: [package.json](package.json)
- Next config: [next.config.ts](next.config.ts)
- Routes and middleware: [src/middleware.ts](src/middleware.ts)
- App entry: [src/app/layout.tsx](src/app/layout.tsx) (main app shell)
- Auth layout: [src/app/(auth)/layout.tsx](src/app/(auth)/layout.tsx)
- Admin/dashboard page: [src/app/(admin)/dashboard/page.tsx](src/app/(admin)/dashboard/page.tsx)

Project structure (high level)
- src/app — Next.js app routes and layouts
- src/components — Shared UI components (ui primitives, dashboard containers)
- src/features — Feature folders (auth, products, cart, admin-dashboard, etc.)
- src/lib — helper utilities, env, graphql client, logger
- src/providers — app-level providers (theme, auth, query client)
- src/store — zustand stores (auth, theme, modal, onboarding)
- public/images — static assets used across the app

Auth flow notes
- Route protection is enforced at the edge via `src/middleware.ts` and at component level via `src/guards/*`.
- Auth state persistence is in `src/features/auth/store/auth.store.ts` (uses sessionStorage via zustand persist).
- To bypass auth for local dev, update `src/middleware.ts` carefully (dev-only checks recommended).

UI & components
- UI primitives live under `src/components/ui/` (button, dialog, avatar, icon registry, etc.).
- Icon registry: `src/components/ui/icon/icon-registry.ts` with custom SVGs in `src/components/ui/icon/custom/`.

Editing & conventions
- Tailwind utility classes for styling; class-variance-authority (`cva`) used for variant-driven classes.
- TypeScript used across the codebase; Pylance/tsserver for type checking.

Notes & next steps
- Add an explicit CONTRIBUTING.md with developer env details (node version, environment variables).
- Add testing instructions if tests are introduced (none found).

If you'd like, I can:
- Add this file to the repo (I can commit if you want).
- Generate a `CONTRIBUTING.md` with recommended dev environment and a small checklist.
- Create route redirects so `/admin` redirects to `/dashboard`.
