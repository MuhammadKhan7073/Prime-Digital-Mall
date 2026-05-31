# Prime Digital Mall

Pakistan's customer-first marketplace. A fast, self-contained Next.js storefront built for **buyers** — minimum clicks to buy, impulse-friendly, zero setup.

> No database, no backend, no API keys. Clone → install → run. All catalog data is bundled (`src/data`), cart/wishlist persist in the browser.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
```

Production:

```bash
npm run build && npm start
```

Requires Node 18+.

## What's inside

- **Customer-first, no fluff** — lands you in shopping, not marketing. No "how it works", no pricing pages, no seller onboarding in the buyer's face.
- **Fewest clicks to buy (impulse)**
  - 1-click **Add** on every card (auto-picks default variant)
  - **Quick view** modal — buy from the grid without leaving the page
  - **Buy now** → straight to 1-step checkout
  - Slide-in **cart drawer** opens on add, with checkout CTA
- **Discovery everywhere** — Ctrl/⌘+K command search with live suggestions, flash-deal countdown, trending / new / category rows, recently viewed, frequently-bought-together, related items.
- **Pakistan model** — city picker, per-shop delivery type (all-Pakistan / city / pickup), personalized "Popular in your city", PKR pricing, WhatsApp ordering, Easypaisa / Meezan / Cash-on-Delivery at checkout.
- **Basket builders** — free-delivery progress bar, wishlist, save-for-later, bundle pricing.
- **Polished** — light/dark theme, responsive, mobile bottom tab bar, toasts, skeleton-ready design system, gradient+emoji product art (never a broken image).

## Structure

```
src/
  app/                 routes (home, category, shop, product, search, deals, cart, checkout, wishlist)
  components/          UI (Header, ProductCard, QuickView, CartDrawer, ProductBrowser, …)
    ui/                atoms (Price, Stars, Badge, ProductImage, QuantityStepper)
  data/                catalog.ts (shops, products, reviews, cities) + types.ts
  lib/                 catalog queries, formatting, whatsapp links
  store/               zustand stores (cart, wishlist, recent, ui) — persisted
```

## Edit the catalog

Everything lives in `src/data/catalog.ts`:
- `cities`, `categories`, `shops`, and a `seeds[]` array of products (prices in whole PKR).
- Add a product by appending one object to `seeds` — descriptions, reviews, and badges are generated automatically.

## Going to production later

Swap the in-repo data layer for a real backend by reimplementing `src/lib/catalog.ts` against your DB/API — the UI imports only from there. (A Prisma + Postgres schema from earlier iterations is available in the sibling `prime-digital-mall-v2` folder.)

Payment / contact details are centralized in `PAYMENT` (`src/data/catalog.ts`).
