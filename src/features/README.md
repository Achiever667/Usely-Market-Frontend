# Feature Architecture

Business logic belongs in `src/features/*`.

Each feature may own:

- `api`: GraphQL documents and request wrappers.
- `hooks`: feature-specific React Query, form, or UI orchestration hooks.
- `components`: feature UI composed from shared primitives.
- `schemas`: Zod validation and parsing.
- `services`: use-case orchestration.
- `store`: Zustand stores for allowed client state only.
- `types`: domain contracts.
- `utils`: feature-local helpers.

Server state is cached with TanStack Query. Zustand is reserved for auth, cart, theme, modal, and onboarding state.
