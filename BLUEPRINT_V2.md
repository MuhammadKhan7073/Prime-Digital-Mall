# Prime Digital Mall — Everything Platform (Blueprint V2)

Goal: one Pakistani platform for **everything** — shopping, food, healthcare, and home/professional services — while staying customer-first, low-click, and uncluttered. Each vertical feels native, but they share one identity, one cart-or-booking habit, one WhatsApp/COD backbone.

## 1. Verticals

| Vertical | Slug | What it holds | Provider noun | Listing noun | Primary action |
|----------|------|---------------|---------------|--------------|----------------|
| **Shopping** | `shop` | products from shops (existing) | Shop | Product | Add to cart / Buy now |
| **Food** | `food` | restaurants & their menus | Restaurant | Dish | Add to food cart / Order |
| **Health** | `health` | clinics, doctors, labs, pharmacy | Clinic | Doctor / Service | Book appointment |
| **Services** | `services` | home + professional services | Provider | Offering | Request / Book |

Services umbrella (the "everything else"): **Cleaning, Repairs (AC/appliance/plumbing/electrician), Beauty & Salon at home, Tutoring, Movers, Car wash/Auto, Photography, Events & Catering, Tailoring, Pest control, Laundry**.

## 2. Two interaction paradigms (keeps UX coherent, not 4 random apps)

- **ORDER** → has a cart, quantities, checkout, price now. Used by **Shopping + Food**.
  - Shopping cart and Food cart are *separate stores* (different fulfilment, can't mix a sofa with biryani in one delivery) but use the **same cart UI patterns**.
- **BOOK / REQUEST** → pick date/time or describe need → confirm. No upfront online payment required (COD / pay-at-service / WhatsApp). Used by **Health + Services**.
  - A lightweight **bookings store** (localStorage) holds requested appointments so the user sees "My bookings".

This 2-paradigm split is the backbone: every screen a user hits is either "shop/order" or "book/request". No third mental model.

## 3. Information architecture / routes

```
/                         vertical hub (choose vertical) + personalized city feed
/shop                     existing storefront home (products)        [ORDER]
  /category/[slug]
  /shop/[slug]            (a Shop)
  /product/[slug]
/food                     restaurants landing                        [ORDER]
  /food/[restaurant]      menu + dish add-to-foodcart
  /food/dish/[slug]       dish detail (optional deep link)
/health                   clinics & doctors landing                  [BOOK]
  /health/[clinic]        clinic profile + doctors + book
  /health/doctor/[slug]   doctor detail + booking
/services                 services categories landing                [BOOK]
  /services/[category]    providers in a category
  /services/provider/[slug] provider profile + offerings + request
/book/[type]/[slug]       unified booking flow (doctor | provider)
/search                   universal search across ALL verticals
/deals                    cross-vertical offers
/cart                     shopping cart            (ORDER)
/foodcart                 food cart                (ORDER)
/checkout                 shopping checkout
/foodcheckout            food checkout
/bookings                 my appointments/requests (BOOK)
/wishlist, /request       (existing)
```

## 4. Data layout (`src/data`)

- `types.ts`         — shared + per-vertical types (extend, don't break existing)
- `catalog.ts`       — shopping (existing: cities, categories, shops, products, reviews, PAYMENT)
- `food.ts`          — `cuisines`, `restaurants`, `dishes`
- `health.ts`        — `specialties`, `clinics`, `doctors`
- `services.ts`      — `serviceCategories`, `providers`, `offerings`
- `verticals.ts`     — the 4-vertical registry (name, slug, icon, color, paradigm, blurb)

Query layer in `src/lib/`: `food.ts`, `health.ts`, `services.ts`, `directory.ts` (universal search/aggregate). UI imports only from lib — swap for backend later.

## 5. Stores (`src/store`, zustand + persist)

- `cart.ts`     (existing — shopping)
- `foodcart.ts` (new — restaurant-scoped; one active restaurant at a time, classic food-app rule)
- `bookings.ts` (new — appointments/service requests with status: requested)
- `wishlist`, `recent`, `ui` (existing; `ui` gains `vertical` current-context + foodcart drawer)

## 6. Shared model fields (consistency across verticals)

Every **provider** (Shop/Restaurant/Clinic/Provider) shares: `slug, name, city, rating, ratingCount, verified, emoji, from,to (gradient), tagline, phone`.
Every **listing** (Product/Dish/Doctor/Offering) shares: `slug, name, providerSlug, price (or "from" price / fee), rating, emoji, from,to, shortDesc`.
→ lets one `ListingCard` + one `ProviderCard` render any vertical with thin wrappers.

## 7. Trust & conversion (carried into every vertical)

- City-aware ("available in Lahore"), verified badges, ratings, response time.
- Low-click: Food = 1-tap add; Health/Services = "Book" opens prefilled date/slot picker, 2 taps to request.
- WhatsApp order/booking fallback everywhere (team + provider numbers).
- COD / pay-at-service messaging; no forced signup.

## 8. Build order

1. ✅ Blueprint (this file)
2. Data + types + lib + stores (foundation) → tsc clean
3. UI: vertical switcher in header, home hub, 3 landing pages + detail pages, booking flow, food cart → build clean
4. Verify: tsc + build + run + probe every route + adversarial review

## 9. Non-goals (deliberate, to avoid clutter)

- No real payment gateway (COD/WhatsApp as designed).
- No seller/provider onboarding dashboards in the buyer UI (providers "come automatically"; manage via data/WhatsApp).
- No mixing carts across verticals.
- No auth walls.
