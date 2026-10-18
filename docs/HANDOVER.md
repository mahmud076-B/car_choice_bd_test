# Car Choice BD — Staff & Deploy Handover

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Without Supabase env vars the site runs in **demo mode** (mock vehicles + `.data/` JSON for leads).

## Connect Supabase

1. Create a project at [supabase.com](https://supabase.com).
2. Run SQL from [`supabase/migrations/001_initial_schema.sql`](../supabase/migrations/001_initial_schema.sql).
3. Optionally run [`supabase/seed.sql`](../supabase/seed.sql).
4. Create a public Storage bucket named `vehicle-media`.
5. Copy [`.env.example`](../.env.example) → `.env.local` and fill URL + anon key.
6. Create a staff user in Supabase Auth (email/password).
7. Restart `npm run dev`. Admin login: `/admin/login`.

## Deploy (Vercel)

1. Import the Git repo into Vercel.
2. Set env vars: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `NEXT_PUBLIC_SITE_URL`.
3. Deploy production; point `carchoicebd.com` DNS to Vercel when ready.

## Acceptance smoke test

- [ ] `/stock` filters update the URL and results
- [ ] Card / table toggle works on desktop
- [ ] Vehicle detail gallery + WhatsApp deep link includes model/year/chassis
- [ ] Contact, verify, and pre-order forms save (admin consoles show rows)
- [ ] `/admin` lists vehicles; publish a car → appears on `/stock`
- [ ] Mobile sticky Call / WhatsApp / Verify bar visible under ~640px
- [ ] `/sitemap.xml` and `/robots.txt` load

## Open client decisions

- Confirm hours, emails, Maps pin
- Confirm single WhatsApp number
- Supply transparent logo + multi-photo inventory
- Confirm how-to-buy fee language (do not copy competitor deposits)
