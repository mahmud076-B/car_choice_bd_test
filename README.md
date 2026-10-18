# Car Choice BD

Japanese reconditioned vehicle importer website for Rajshahi, Bangladesh.

**Stack:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · Supabase (optional) · Vercel-ready

## Quick start

```bash
npm install
npm run dev
```

Demo mode works without Supabase (mock inventory + local `.data/` for form leads).

## Key routes

| Route | Purpose |
|-------|---------|
| `/` | Homepage |
| `/stock` | Live inventory (filters, card/table) |
| `/stock/[slug]` | Vehicle detail + WhatsApp |
| `/pre-order` | Japan sourcing form |
| `/verify-auction-sheet` | Free verification lead |
| `/admin` | Staff dashboard |

## Docs

- Planning pack: [`docs/planning/`](docs/planning/)
- Deploy & staff handover: [`docs/HANDOVER.md`](docs/HANDOVER.md)
- Supabase schema: [`supabase/migrations/001_initial_schema.sql`](supabase/migrations/001_initial_schema.sql)
- Env template: [`.env.example`](.env.example)
