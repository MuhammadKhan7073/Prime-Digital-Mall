# Deploy Prime Digital Mall — live on the internet for ~$10/year

This app is a **fully static export** (`output: 'export'` → builds to `out/`). Ordering is via WhatsApp, so **no server is needed**. That means free hosting with unlimited bandwidth.

> **Total cost to be live + on Google + AI search: one `.com` domain (~$10/yr). Hosting, HTTPS, CI/CD, indexing = $0.**

---

## Step 1 — Build locally (sanity check)

```bash
npm install
npm run build      # produces the static  out/  folder
npx serve out      # preview at http://localhost:3000
```

`out/` is the entire website.

---

## Step 2 — Put the code on GitHub (free)

```bash
git init
git add .
git commit -m "Prime Digital Mall"
# create an empty repo on github.com, then:
git remote add origin https://github.com/YOURNAME/prime-digital-mall.git
git push -u origin main
```

---

## Step 3 — Deploy on Cloudflare Pages (free, fastest in Pakistan)

Cloudflare has data centers in Karachi/Lahore/Islamabad → lowest latency for PK users, unlimited free bandwidth.

1. dash.cloudflare.com → **Workers & Pages → Create → Pages → Connect to Git** → pick your repo.
2. Build settings:
   - **Build command:** `npm run build`
   - **Build output directory:** `out`
   - **Environment variable:** `NEXT_PUBLIC_SITE_URL = https://yourdomain.com`
3. **Save and Deploy.** You get a free `*.pages.dev` URL immediately.

*(Vercel or Netlify work identically — connect repo, output dir `out`. Cloudflare recommended for PK speed + truly free bandwidth. Vercel's free tier forbids commercial use — needs $20/mo Pro for a real store, so prefer Cloudflare.)*

---

## Step 4 — Buy a domain & attach (~$10/yr)

1. Buy at **Cloudflare Registrar** (at-cost, ~$10.46/yr for `.com`, free WHOIS privacy). `.pk` is possible via PKNIC but pricier/slower — start with `.com`.
2. Cloudflare Pages → project → **Custom domains → Set up a domain** → enter your domain. DNS + HTTPS auto-configure.
3. Set build env `NEXT_PUBLIC_SITE_URL` to your real `https://yourdomain.com` and redeploy (fixes all sitemap/canonical/OG/JSON-LD URLs).

---

## Step 5 — Set your real WhatsApp + payment details

Edit `src/data/catalog.ts` → `PAYMENT`:
- `whatsapp` — your WhatsApp **Business** number (the order pipeline)
- `easypaisa`, `bank` — your real accounts

Commit + push → auto-redeploys.

---

## Step 6 — Get indexed on Google + AI search (free, day 1)

1. **Google Search Console** → add domain → verify via Cloudflare DNS TXT → **Sitemaps → submit** `https://yourdomain.com/sitemap.xml`.
   - Or HTML-tag method: set `metadata.verification = { google: 'TOKEN' }` in `src/app/layout.tsx`.
2. **Bing Webmaster Tools** → import from Google → submit sitemap. (Bing powers Copilot + feeds AI engines.)
3. **URL Inspection → Request indexing** on the homepage.
4. **Rich Results Test** on a product + a doctor URL → confirms structured data.

### Already done in code (no action needed)
- `sitemap.xml` (147 URLs, auto-updates on rebuild), `robots.txt` (AI crawlers allowed), `manifest.webmanifest`, `llms.txt`, `_headers` (caching/security)
- JSON-LD: Organization, WebSite+Search, Product, Restaurant, Physician, LocalBusiness
- Open Graph, Twitter cards, canonical, mobile-first, fast static pages

---

## Optional next (cheap, higher ranking)

- Add a 1200×630 `public/og.png` for nicer link/AI-chat previews.
- Add product `sku` + per-product `og:image` for full Google Shopping eligibility.
- Wire **IndexNow** (instant Bing/Yandex indexing) when listings change often.

---

## When you outgrow static (Phase 2 — business self-serve)

Static stays free until you want sellers to add themselves / real online orders. Cheapest path (still ~$0/mo to start): **Supabase** (Postgres + auth + approval gate) + **Cloudflare R2** (image storage, zero egress) + **Safepay** (cards + JazzCash + Easypaisa in one API; Stripe is unavailable in Pakistan). The UI already reads through `src/lib/*.ts` — swap those to query the DB and the components don't change. See `BLUEPRINT_V2.md`.
