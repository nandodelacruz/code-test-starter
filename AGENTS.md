# BookHaven - AI Agent Instructions

## Project Overview

BookHaven is an online bookshop built as a code test. It is a full-stack Next.js application with a PostgreSQL database.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| UI Components | shadcn/ui (manual setup) |
| ORM | Prisma v6 |
| Database | PostgreSQL (local via Homebrew) |
| Testing | Jest + React Testing Library |

## Project Structure

```
src/
  app/             # Next.js App Router pages (NOT pages/ directory)
    layout.tsx     # Root layout
    page.tsx       # Homepage (Server Component, fetches from DB)
    cart/          # Cart page (to be built)
    globals.css    # Tailwind v4 + shadcn CSS variables
  components/
    ui/            # shadcn/ui base components (Button, Card, etc.)
    features/      # Feature-specific components (BookCard, CartItem, etc.)
    layout/        # Layout components (Header, Footer, etc.)
  lib/
    db.ts          # Singleton Prisma client
    books.ts       # Static book data (used for seeding)
    utils.ts       # cn() utility for class merging
  constants/       # Centralised string constants
prisma/
  schema.prisma    # Database schema (Book model)
  seed.ts          # Seed script for initial data
```

## Key Conventions

- **App Router only**: All pages live in `src/app/`. There is no `pages/` directory.
- **Server Components by default**: Pages fetch data directly from the database using Prisma. Only add `"use client"` when interactivity is required.
- **Path alias**: Use `@/` as the alias for `src/`. Example: `import { cn } from "@/lib/utils"`.
- **Database access**: Always import Prisma from `@/lib/db`, not directly from `@prisma/client`.
- **Constants**: All UI strings, route paths, and config values should live in `src/constants/`.
- **Tailwind v4**: This project uses Tailwind CSS v4. Do NOT use `tailwind.config.js`. Configuration is done via `globals.css` using the `@import "tailwindcss"` directive.
- **shadcn/ui**: Components are manually placed in `src/components/ui/`. Do NOT run `npx shadcn-ui add` — add components manually.
- **Image Optimization**: Use `next/image`. For above-the-fold images (like the first row of books), always use the `priority` prop to satisfy LCP requirements.
- **Linting & Formatting**: This project uses ESLint 9 (Flat Config) and Prettier. Always run `npm run format` and `npm run lint` before committing.

## Commands

```bash
npm run dev        # Start the development server
npm run build      # Build for production
npm run test       # Run Jest tests
npm run test:watch # Run Jest in watch mode
npm run lint       # Run ESLint 9 (flat config)
npm run lint:fix   # Auto-fix lint issues
npm run format     # Format code with Prettier
npm run db:push    # Sync Prisma schema to the database
npm run db:seed    # Seed the database with initial book data
```

## Database Setup (Local)

1. PostgreSQL is running via Homebrew (`brew services start postgresql@17`)
2. Database name: `bookshop`
3. Connection string is in `.env` (not committed to git)
4. Run `npx prisma generate` after any schema changes before using the Prisma client

## Testing Guidelines

- Tests live alongside source files in `__tests__/` directories or as `*.test.tsx` files.
- Use React Testing Library for component tests.
- Test **behaviour**, not implementation details.
- Minimum 11 tests required (per README), covering cart operations and key components.
- Mock Prisma for unit tests to avoid hitting the real database.

## Cart Requirements

- Cart state must be **centralised** (React Context or equivalent).
- Minimum prop drilling.
- Cart must **persist** across page refreshes (use `localStorage`).
- Support: Add to cart, Remove from cart, view total.
