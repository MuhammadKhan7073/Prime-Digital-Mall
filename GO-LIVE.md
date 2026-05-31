# Go Live — Prime Digital Mall

This app is now **SEO + AI-search ready** and builds to static output. Here is the cheapest path to a public, Google-indexed site.

## What's already wired (in code)

- **Metadata**: title/description, Open Graph, Twitter cards, canonical, keywords, `metadataBase`.
- **`/sitemap.xml`** — auto-generated from all products, shops, restaurants, doctors, clinics, services (~147 URLs).
- **`/robots.txt`** — allows all crawlers (incl. AI: GPTBot, PerplexityBot, Google-Extended), blocks cart/checkout.
- **`/manifest.webmanifest`** + SVG icon — installable PWA basics.
- **JSON-LD structured data** for rich results + AI citations:
  - Organization + WebSite (with Sitelinks Search Box) on every page
  - `Product` (price PKR, rating, availability) on product pages
  - `Restaurant` on restaurant pages
  - `Physician` on doctor pages
  - `LocalBusiness` on service-provider pages
- **`/llms.txt`** — summary for AI crawlers.

## Step 1 — Set your real domain (1 min)

Buy a domain (cheapest: Cloudflare Registrar / Namecheap; `.com` ≈ $9–12/yr). Then before building:

```bash
# .env.production  (or set in your host's dashboard)
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

Everything (canonical, sitemap, OG, JSON-LD) picks this up automatically.

## Step 2 — Deploy (free, ~10 min)

**Recommended: Vercel free tier** (zero config for Next.js).

1. Push this folder to a GitHub repo.
2. vercel.com → New Project → import the repo → Deploy.
3. Add your domain in Vercel → Settings → Domains; point DNS as shown.

Alternative (also free): **Cloudflare Pages** or **Netlify** — same idea, connect repo.

> The app is mostly static (SSG), so the free tier comfortably handles real traffic.

## Step 3 — Get indexed (the day you launch)

1. **Google Search Console** (search.google.com/search-console): add your domain, verify (DNS TXT or the HTML tag), then **Sitemaps → submit** `https://yourdomain.com/sitemap.xml`.
2. **Bing Webmaster Tools**: add site, submit same sitemap (Bing powers ChatGPT/Copilot search too).
3. Use Search Console **URL Inspection → Request indexing** on the homepage to speed up first crawl.
4. Verify rich results: Google **Rich Results Test** on a product + doctor URL.

## Step 4 — Help AI search find you

- `robots.txt` already allows `GPTBot`, `PerplexityBot`, `Google-Extended`.
- `llms.txt` + JSON-LD already in place — these are what AI engines read to summarize/cite.
- Keep content text-based (it is) so crawlers can read it without running JS.

## Ongoing (cheap/free)

- Add an OG share image at `public/og.png` (1200×630) for nicer link previews (optional).
- As real listings get added, the sitemap updates automatically on each rebuild.
- Resubmit sitemap in Search Console after big content changes (or wire IndexNow later).

## Minimum cost to be live + indexed

- Hosting: **$0** (Vercel/Cloudflare/Netlify free tier)
- Domain: **~$10/year**
- **Total: ~$10/year.**

Backend (business self-serve, real orders) is a later phase — see `BLUEPRINT_V2.md` and the funding/scale plan. It stays cheap (Supabase/Cloudflare free tiers) until you have real traffic.
