# BookHaven — Implementation guide

This document describes how this repository is built and how to run it locally. It complements the assignment-focused [`README.md`](README.md); architectural conventions for agents are in [`AGENTS.md`](AGENTS.md) and [`CLAUDE.md`](CLAUDE.md).

## Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 (configured in `src/app/globals.css`, no `tailwind.config.js`) |
| UI | shadcn/ui-style components under `src/components/ui/` |
| ORM | Prisma v6 |
| Database | PostgreSQL |
| Testing | Jest + React Testing Library (`jest-environment-jsdom`) |

## Prerequisites

- **Node.js** — use an LTS version compatible with Next.js 16 (see project `package.json` engines if added).
- **PostgreSQL** — running instance you can connect to (local install, Docker, or cloud).

## Install dependencies

```bash
npm install
```

## Environment variables

Copy [`.env.example`](.env.example) to `.env` in the project root (`.env` is gitignored). Prisma expects:

```bash
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"
```

Replace `USER`, `PASSWORD`, `HOST`, `PORT`, and `DATABASE` with your PostgreSQL credentials and database name.

Example for a default local Postgres user and database:

```bash
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/bookhaven?schema=public"
```

Ensure the database exists before syncing the schema:

```bash
createdb bookhaven   # or use pgAdmin / Docker / cloud console
```

## Database setup

### 1. Sync schema and generate the client

**Option A — Quick local sync (no migration files)**

```bash
npm run db:push
npx prisma generate   # usually run automatically with push; run explicitly if needed
```

**Option B — Migrations (recommended for production-like workflows)**

```bash
npx prisma migrate dev --name init
```

This creates migration SQL under `prisma/migrations/` and applies it.

### 2. Seed book data

Seed reads from `src/lib/books.ts` and upserts into the `Book` table:

```bash
npm run db:seed
```

Re-running the seed updates existing rows when the upsert `update` block includes changed fields.

### Useful Prisma commands

| Command | Purpose |
|---------|---------|
| `npx prisma studio` | Browse/edit data in the browser |
| `npx prisma migrate dev` | Create and apply a new migration after schema changes |
| `npm run db:push` | Push `schema.prisma` to the DB without creating migration files |
| `npm run db:seed` | Run `prisma/seed.ts` |

## Run the app

### Development

```bash
npm run dev
```

Opens the Next.js dev server (Turbopack by default in recent Next versions). The app is typically at `http://localhost:3000`.

### Production build

```bash
npm run build
npm run start
```

Ensure `DATABASE_URL` is set in the deployment environment and migrations (or `db push`) have been applied before `npm run start`.

## Quality checks

| Script | Command |
|--------|---------|
| Lint | `npm run lint` |
| Lint (fix) | `npm run lint:fix` |
| Format | `npm run format` |
| Tests | `npm run test` |
| Tests (watch) | `npm run test:watch` |

Before committing, it is useful to run format, lint, and tests together:

```bash
npm run format && npm run lint && npm run test
```

## Project layout (high level)

- `src/app/` — App Router routes (`page.tsx`, `layout.tsx`, `error.tsx`, API routes, etc.)
- `src/components/` — UI primitives (`ui/`), features (`features/`), layout (`layout/`), providers (`providers/`)
- `src/context/` — React contexts (e.g. cart, book list)
- `src/lib/` — DB client (`db.ts`), services (`services/`), static seed data (`books.ts`), utilities
- `src/constants/` — Routes and UI strings
- `prisma/` — `schema.prisma`, `seed.ts`, migrations (if using `migrate dev`)

## PostgreSQL via Docker (optional)

If you prefer not to install Postgres on the host, run a container and point `DATABASE_URL` at it. Example:

```bash
docker run --name bookhaven-postgres \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=bookhaven \
  -p 5432:5432 \
  -d postgres:16
```

Then use:

```bash
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/bookhaven?schema=public"
```

## Troubleshooting

- **`PrismaClientInitializationError` / connection refused** — Postgres is not running or `DATABASE_URL` host/port/user/password/database is wrong.
- **Empty homepage / “run seed” messaging** — Run `npm run db:seed` after the schema is applied.
- **Schema drift** — After pulling changes that alter `prisma/schema.prisma`, run `npm run db:push` or `npx prisma migrate dev` again, then re-seed if needed.

For deeper conventions (services, caching keys, cart hydration, testing mocks), see [`AGENTS.md`](AGENTS.md).
