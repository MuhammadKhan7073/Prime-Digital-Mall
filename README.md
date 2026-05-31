# Prime Digital Mall

Pakistan's **everything platform** — shop products, order food, book doctors, and book home services, in one fast, customer-first web app. Built with Next.js 14 + Tailwind, exported as a fully static site so it hosts **free** and loads instantly.

> No backend required to run or deploy. All catalog data is bundled (`src/data`); cart, wishlist, and bookings persist in the browser. A Supabase-ready backend (`src/lib/backend.ts`) turns on the moment you add env keys — see `BACKEND.md`.

🇵🇰 PKR pricing · WhatsApp ordering · Cash on Delivery / Easypaisa / bank · city-aware.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
```

Production / static export:

```bash
npm run build      # outputs a fully static  out/  folder
npx serve out      # preview the built site
```

Requires Node 18+.

## The four verticals

| Vertical | Path | Model | Has |
|----------|------|-------|-----|
| 🛍 **Shopping** | `/shop` | order → cart → checkout | shops, products, categories, deals |
| 🍔 **Food** | `/food` | order → food cart → checkout | restaurants, dishes, cuisines |
| 🩺 **Health** | `/health` | book → slot/mode → confirm | clinics, doctors, specialties |
| 🔧 **Services** | `/services` | book → date+address → confirm | cleaning, repairs, beauty, tutoring, movers… |

One home **hub** (`/`) routes into all four. Two interaction models only — **order** or **book** — so it never feels like four separate apps.

## What's inside

- **Customer-first, low-click** — 1-click Add, Quick-view modal, Buy-now, slide-in cart drawer, mobile sticky buy bar, bundle "add all".
- **Universal search** (`/find`) + ⌘/Ctrl-K — across products, food, doctors, services.
- **Discovery** — flash-deal countdown, trending / new / category rows, recently viewed, frequently-bought-together, related.
- **Pakistan model** — city picker, per-shop delivery type, WhatsApp order/booking, COD + Easypaisa + Meezan at checkout.
- **Business self-serve** — `/sell` signup → `/admin` approval queue (demo mode = local; real mode = Supabase).
- **Polish** — light/dark, mobile bottom tabs, toasts, gradient+emoji product art (never a broken image), custom "Modern Bazaar" design (Fraunces + Plus Jakarta Sans, warm paper + jade/saffron).
- **SEO + AI-search ready** — `sitemap.xml`, `robots.txt` (AI crawlers allowed), `manifest.webmanifest`, `llms.txt`, OG image, JSON-LD (Organization, WebSite, Product, Restaurant, Physician, LocalBusiness).

## Structure

```
src/
  app/                 routes (home hub, shop, food, health, services, find, sell, admin, cart, checkout, bookings…)
  components/          UI (Header, cards, QuickView, CartDrawer, BookingForm, JsonLd…)
  data/                catalog.ts, food.ts, health.ts, services.ts, verticals.ts + types
  lib/                 query layers (catalog/food/health/services/directory), supabase client, backend
  store/               zustand stores (cart, foodcart, wishlist, recent, ui, bookings, submissions)
supabase/schema.sql    Phase-2 DB schema (tables + RLS + roles + approval gate)
scripts/gen-og.cjs     regenerate the OG share image  (npm run og)
```

## Deploy free (≈$10/yr for a domain, $0 hosting)

Static export → host free on **Cloudflare Pages** (fastest in Pakistan) / Netlify / GitHub Pages. Step-by-step in **`DEPLOY.md`**. Get indexed on Google + AI search the same day (Search Console + Bing → submit `sitemap.xml`).

## Docs

- `DEPLOY.md` — go live + get indexed
- `BACKEND.md` — turn on real multi-user mode (Supabase + admin)
- `BLUEPRINT_V2.md` — architecture of the 4-vertical platform
- `GO-LIVE.md` — SEO/AI-search checklist

## Edit the catalog

Everything is in `src/data/*.ts` (prices in whole PKR). Add a product/restaurant/doctor/provider by appending one object — descriptions, reviews, badges, and pages generate automatically.
