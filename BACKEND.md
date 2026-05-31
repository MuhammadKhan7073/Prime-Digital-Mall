# Phase 2 — Backend (business self-serve + admin)

The app ships in **two modes**, chosen automatically by env vars:

| Mode | When | Business signups & admin queue live in | Cost |
|---|---|---|---|
| **Demo** (default) | no Supabase env vars | the browser (localStorage) | $0, free static |
| **Real** | `NEXT_PUBLIC_SUPABASE_URL` + `NEXT_PUBLIC_SUPABASE_ANON_KEY` set | Supabase Postgres (all users, all devices) | $0 on free tier |

Demo mode is for showing the flow / screenshots / investor demo. Real mode is a true multi-user marketplace. **Same UI, same code** — only the data source changes.

## Pages added

- **`/sell`** — business self-serve signup (multi-step). Submits to Supabase when configured; always also opens a prefilled WhatsApp message to you.
- **`/admin`** — passcode-gated dashboard: see pending businesses, approve/reject, stats. Reads Supabase when configured, else the local demo queue.

> The `/admin` passcode is `NEXT_PUBLIC_ADMIN_CODE` (default `prime-admin`). This is a light client gate for the demo. **For production, put `/admin` behind Supabase Auth with an `admin` role** (the SQL policies + `is_admin()` are already written for this).

## Turn on Real mode (free, ~15 min)

1. Create a free project at **supabase.com**.
2. **SQL Editor** → paste & run `supabase/schema.sql` (creates tables + row-level security + roles).
3. **Project Settings → API** → copy the **Project URL** and **anon public key**.
4. Set env vars (host dashboard or `.env.local`):
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
   ```
5. Redeploy. `/sell` now writes to Postgres; `/admin` reads from it across all users.
6. Make yourself admin: sign up, then in SQL Editor:
   ```sql
   update profiles set role='admin' where id = (select id from auth.users where email='you@example.com');
   ```

## Images (when you add product photos)

Use **Cloudflare R2** (10 GB free, zero egress): upload via presigned URL, store the public URL in `listings.image_url`. Keeps Supabase storage/bandwidth free.

## Payments (when you take online payment)

Launch with **COD + bank transfer** (already in checkout). Add **Safepay** later (one API for cards + JazzCash + Easypaisa + bank; Stripe is unavailable for PK businesses).

## Going fully dynamic (catalog from DB)

Today the public catalog is the curated data in `src/data/*`. To make **approved seller listings** appear publicly, point the read functions in `src/lib/catalog.ts` / `food.ts` / `health.ts` / `services.ts` at Supabase (`listings` where `status='approved'`), merged with the seed data. Components don't change — they only import from `src/lib/*`. Do this once you have real sellers; until then the curated catalog keeps the site full and SEO-rich.
