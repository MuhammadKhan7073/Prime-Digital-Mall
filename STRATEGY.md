# Prime Digital Mall — Product Strategy & Design Law

The single rule everything obeys:

> **Layer 1 is loud and instant. Layer 2 is quiet and optional.**
> A first-time visitor buys in the fewest possible clicks without reading anything.
> A curious visitor (or a proud business) can go as deep as they want — but depth never blocks the sale.

UI is the guide: **color + size + position** tell new users what to do. The primary action is always the biggest, most colored, most central thing on screen.

## The two layers

### Layer 1 — Buy (loud)
Big, brand-colored, central. Zero reading required.
- 1-click **Add** on every card (auto-picks default variant)
- **Buy now** → 1-step checkout
- **Quick view** → buy from the grid, no navigation
- Mobile **sticky buy bar**, slide-in **cart drawer**, **bundle "add all"**
- Food: 1-tap **Add** to food cart. Health/Services: 2-tap **Book**.

### Layer 2 — Explore (quiet)
Muted text-links, collapsed panels, below the fold. Ignored by default, rich when sought.
- **About this shop** — collapsible: story, established date, certifications, highlights, policies, links. De-emphasized (muted label, text trigger, collapsed). Implemented in `ShopAbout.tsx`; data is the optional `Shop.about` field — businesses fill it only if they want.
- Product detail: specs, full description, reviews, frequently-bought-together — all *below* the buy buttons.
- Universal search, filters, city picker — available, never forced.

This split is why the platform can be **both** dead-simple for impulse buyers **and** deep for power users / storytelling businesses, without either hurting the other.

## Impulse-buy flywheel (the growth thesis)
Fewer clicks to buy → more impulse purchases → more sales → more businesses want in → more selection → more customers → repeat. Every feature is judged by: *does it reduce friction to buy, or does it add explorable depth without adding friction?* If neither, it doesn't ship.

## Admin control (current)
Full marketplace moderation, all 4 verticals, businesses **and** individual listings:
- **Hide** (unlist), **Freeze** (visible but "Temporarily unavailable", not orderable), **Feature** (gold ring + pinned to front of its row), **Remove** (soft-delete), **Restore**
- **Edit price** inline (override + reset)
- **Add** business or listing (any vertical)
- **Bulk actions** — multi-select + select-all → hide/freeze/feature/remove/restore many at once
- 4 tabs: Overview (stats + activity log), Signups (approve/reject), Businesses (drill into products), Listings
- Live enforcement via `StorefrontGuard` (reads admin flags, applies to every `data-entity` card across all 162 pages — no rebuild)

> Demo mode today (localStorage, client passcode, `/admin` noindex + robots-blocked). Production = Supabase auth + admin role (policies already in `supabase/schema.sql`). **Do not enable real listings until the security review.**

## Roadmap (next, in rough priority)

**Conversion / impulse**
- One-tap reorder ("buy again") from order history
- "Customers also bought" carousel on cart
- Save card/address for true 1-tap repeat checkout (needs backend)
- Urgency cues: low-stock, "X bought today" (data exists, surface more)

**Business depth (Layer 2, opt-in)**
- Seller self-edit of their `about` (story/certs/photos) — behind login
- Shop "Featured products" shelf the seller curates
- Verified-badge request flow + document upload (R2)
- Per-shop announcement banner (sales, Eid hours)

**Admin**
- Orders tab (view/fulfil/refund) — needs orders store wired to checkout
- Verified-badge toggle per business
- CSV export (businesses / signups / orders)
- Audit: who-did-what (needs real auth)
- Analytics (views/clicks/conversion) via PostHog free tier

**Platform**
- Reviews you can write (not just read) — needs auth
- Wishlist → price-drop notification
- Multi-language (Urdu) toggle
- PWA install + push (re-engagement)

**Trust / scale**
- Courier integration (PostEx/Leopards/TCS) for COD + tracking
- Safepay online payments (cards + JazzCash + Easypaisa)
- Ratings that affect ranking

## Architecture guardrails (so future changes stay cheap)
- UI imports **only** from `src/lib/*` — swap data source (static → Supabase) without touching components.
- Every listable thing is an "entity" with a stable key (`vertical:kind:slug`) — admin, guard, and future backend all speak this one shape (`src/lib/adminDirectory.ts`).
- Optional fields (`Shop.about`, price overrides, flags) are additive — older data stays valid, new depth is opt-in.
- Static-export-safe: anything needing the server (real auth, payments) is env-gated and degrades to demo mode.
