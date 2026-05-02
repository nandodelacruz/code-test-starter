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
- **Testing**: Tests are mandatory for all new services, API routes, and complex UI components. Run `npm run test` before submitting changes.

## Architectural Patterns

### 1. Service Layer
All database operations and business logic should be encapsulated in a service class located in `src/lib/services/`.
- Services should be stateless.
- Use `next/cache` (`unstable_cache`) for data fetching to optimize performance.
- Example: `BookService.list(query?: string)`

### 2. Preloading & Context Pattern
To ensure fast initial renders while maintaining client-side interactivity:
1. **Preload** data in a Server Component using a service.
2. **Initialize** a Feature Context (e.g., `BookListProvider`) with the preloaded data.
3. **Consume** the context in Client Components to handle local state (like search query) and subsequent API updates.

### 3. REST API Pattern
Expose service methods via API routes in `src/app/api/` for client-side interactions.
- API routes should be thin wrappers around the Service Layer.
- Use proper HTTP status codes and standard JSON responses.

## Commands

```bash
npm run dev        # Start the development server
npm run test       # Run all Jest tests
npm run lint       # Run ESLint 9 check
npm run lint:fix   # Auto-fix lint issues
npm run format     # Format code with Prettier
npm run db:push    # Sync Prisma schema
npm run db:seed    # Seed initial data
```

## Testing Guidelines

- **Location**: Tests live in `__tests__/` subdirectories next to the source file.
- **Mandatory Coverage**: 
  - **Services**: Mock Prisma and cache to test logic.
  - **API Routes**: Mock the service layer and `NextResponse`.
  - **Context/UI**: Use React Testing Library to verify state transitions and side effects (e.g., debounced API calls).
- **Mocks**: Always use proper TypeScript types when mocking (e.g., `as unknown as NextRequest`) rather than `any`.
- **Clean Tests**: Avoid console errors/warnings in tests by mocking external dependencies (like `next/image` or `IntersectionObserver`).

## Development Workflow

1. **Implement Logic**: Create/update the Service.
2. **Write Tests**: Add unit tests for the Service.
3. **Expose API**: Create the API route (if needed) and test it.
4. **Build UI**: Create/update components and Context, then add UI tests.
5. **Verify**: Run `npm run format`, `npm run lint`, and `npm run test`.

## Cart Requirements

- Cart state must be **centralised** (React Context or equivalent).
- Minimum prop drilling.
- Cart must **persist** across page refreshes (use `localStorage`).
- Support: Add to cart, Remove from cart, view total.
