# BookHaven - Instructions for Gemini

> For full project context, see `AGENTS.md`.

## What This Project Is

BookHaven is a full-stack bookshop code test built with Next.js 16 (App Router), TypeScript, Tailwind CSS v4, Prisma v6 (PostgreSQL), and shadcn/ui.

## Critical Rules

1. **App Router only** — never create files inside `pages/`. All routes live in `src/app/`.
2. **Tailwind v4** — no `tailwind.config.js`. CSS-only configuration in `globals.css`.
3. **Prisma client** — always import from `@/lib/db`.
4. **Service Layer** — wrap database logic in `src/lib/services/` with `unstable_cache`.
5. **Preloading** — Server Components fetch via services and pass data to Context Providers.
6. **REST API** — expose services via `src/app/api/` for client-side functionality.
7. **`"use client"` sparingly** — use only for interactive components/contexts.
8. **Path alias** — always use `@/` for imports from `src/`.
9. **Constants** — all UI strings and routes go in `src/constants/`.

## Common Tasks

### 1. Adding a Service
```tsx
import prisma from "@/lib/db";
import { unstable_cache } from "next/cache";

export const MyService = {
  list: unstable_cache(async () => {
    return await prisma.item.findMany();
  }, ["items"], { revalidate: 3600, tags: ["items"] })
};
```

### 2. Preloading in a Page
```tsx
import { MyService } from "@/lib/services/my.service";
import { MyProvider } from "@/context/MyContext";

export default async function Page() {
  const data = await MyService.list();
  return <MyProvider initialData={data}><MyContent /></MyProvider>;
}
```

### 3. Quality & Testing
- **Lint**: `npm run lint` (uses ESLint 9 Flat Config).
- **Format**: `npm run format` (Prettier).
- **Test**: `npm run test` (Jest + RTL).
- **Strict Typing**: Avoid `any` in tests. Use `as unknown as Type` for mocks.

## Gotchas

- **Image Mocking**: In tests, mock `next/image` to avoid LCP/src errors.
- **IntersectionObserver**: Mock this in tests for components using scroll animations.
- **Prisma v6**: Do not suggest Prisma v7+ features (like `prisma.config.ts`).
- **Turbopack**: Default dev server; check compatibility for complex plugins.
