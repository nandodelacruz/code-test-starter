# BookHaven - Instructions for Claude

> For full project context, see `AGENTS.md`.

## What This Project Is

BookHaven is a full-stack bookshop code test built with Next.js 16 (App Router), TypeScript, Tailwind CSS v4, Prisma v6 (PostgreSQL), and shadcn/ui.

## Critical Rules

1. **App Router only** — never create files inside `pages/`. All routes live in `src/app/`.
2. **Tailwind v4** — do not generate a `tailwind.config.js`. Configuration is CSS-only via `@import "tailwindcss"` in `globals.css`.
3. **Prisma client** — always import from `@/lib/db`, not directly from `@prisma/client`.
4. **`"use client"` sparingly** — Pages are Server Components by default. Only mark a file as a Client Component when it requires hooks (`useState`, `useEffect`) or browser APIs.
5. **Path alias** — always use `@/` for imports from `src/`.
6. **shadcn components** — located in `src/components/ui/`. Do NOT run the shadcn CLI.
7. **Constants** — new string literals (labels, routes, messages) go in `src/constants/`.
8. **Linting** — uses ESLint 9 (flat config). Configuration is in `eslint.config.mjs`.
9. **Image Optimization** — use `priority` prop for above-the-fold images.

## Common Tasks

### Adding a New Page

Create `src/app/<route>/page.tsx` as an `async` Server Component that fetches from Prisma directly:

```tsx
import prisma from "@/lib/db";

export default async function MyPage() {
  const data = await prisma.book.findMany();
  return <div>{/* render */}</div>;
}
```

### Adding a Client Component (e.g., Cart)

```tsx
"use client";

import { useState } from "react";
```

### Running Quality Checks

```bash
npm run lint
npm run format
npm run test
npm run test:watch
```

## Gotchas

- **Prisma v7 breaking change**: This project uses Prisma **v6**. Do not suggest `prisma.config.ts` or remove the `url` field from `schema.prisma`. That change only applies to v7+.
- **Tailwind v4 init**: Do not run `npx tailwindcss init`. The project is already configured via `globals.css`.
- **Next.js 16 + Turbopack**: The dev server uses Turbopack by default. Some older plugins may have compatibility issues.
