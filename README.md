# Portfolio (Next.js) — Workspace Overview

This README describes the current folder layout and a few important notes for development.

Top-level files
- `package.json`, `tsconfig.json`, `next.config.ts` — Next.js + TypeScript config
- `proxy.ts` — request proxy / auth-check implementation used by middleware
- `middleware.ts` — forwards Next.js middleware calls to `proxy.ts` (auth checks)

App (Next.js App Router)
- `app/` — Next.js App Router source
  - `app/layout.tsx`, `app/page.tsx`, `app/globals.css`
  - `app/login/` — public login page (client)
  - `app/admin/login/` — admin login page (client) — uses Supabase client
  - `app/admin/` — protected admin routes (guarded by `proxy.ts` via middleware)
  - `app/api/` — backend/api routes

Components & UI
- `components/` — app-level React components
  - `components/ui/` — shadcn-like primitives (`button.tsx`, `card.tsx`, `badge.tsx`)

Lib & Services
- `app/lib/supabase/` — `createClient()` wrapper for browser (used by client pages)
- `lib/` — utility modules
- `services/` — app services (e.g., `journey.service.ts`)

Public & Database
- `public/` — static assets
- `supabase/` — local DB config and SQL migrations

Important notes
- Environment variables (required in `.env.local` for local dev):
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`

- Authentication flow:
  1. Client pages call `createClient()` and use `supabase.auth` (client) to sign in.
  2. Supabase sets secure session cookies automatically.
  3. `proxy.ts` (invoked via `middleware.ts`) reads cookies server-side and checks `profiles.role`.
  4. Admin routes are redirected if not authenticated or not admin.

- Do NOT set manual cookies like `admin-auth` — Supabase manages sessions.

Quick dev
- Start dev server:
```bash
npm run dev
```

If you want, I can add a `README` section with SQL snippets to create the `profiles` table and promote a user to `admin`.
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
