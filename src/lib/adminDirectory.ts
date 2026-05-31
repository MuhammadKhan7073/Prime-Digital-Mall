/**
 * Unified admin view over every business + listing across all four verticals.
 * Lets the admin panel act on anything with one shape, regardless of vertical.
 */
import { allShops, allProducts, shopOf } from '@/lib/catalog'
import { allRestaurants, allDishes, restaurantOf } from '@/lib/food'
import { allClinics, allDoctors, clinicOf, specialtyName } from '@/lib/health'
import { allProviders, allOfferings, providerOf, priceLabel } from '@/lib/services'

export type Vertical = 'shop' | 'food' | 'health' | 'services'

/** A business (seller/restaurant/clinic/provider). */
export interface AdminBusiness {
  key: string // `${vertical}:business:${slug}`
  vertical: Vertical
  slug: string
  name: string
  emoji: string
  from: string
  to: string
  city: string
  rating: number
  verified: boolean
  href: string
  listingCount: number
}

/** A listing (product/dish/doctor/offering). */
export interface AdminListing {
  key: string // `${vertical}:listing:${slug}`
  businessKey: string
  vertical: Vertical
  slug: string
  name: string
  emoji: string
  from: string
  to: string
  priceLabel: string
  price: number
  href: string
  sub: string
}

export const businessKey = (v: Vertical, slug: string) => `${v}:business:${slug}`
export const listingKey = (v: Vertical, slug: string) => `${v}:listing:${slug}`

export function adminBusinesses(): AdminBusiness[] {
  const out: AdminBusiness[] = []

  for (const s of allShops) {
    out.push({ key: businessKey('shop', s.slug), vertical: 'shop', slug: s.slug, name: s.name, emoji: s.emoji, from: s.from, to: s.to, city: s.city, rating: s.rating, verified: s.verified, href: `/shop/${s.slug}`, listingCount: allProducts.filter((p) => p.shop === s.slug).length })
  }
  for (const r of allRestaurants) {
    out.push({ key: businessKey('food', r.slug), vertical: 'food', slug: r.slug, name: r.name, emoji: r.emoji, from: r.from, to: r.to, city: r.city, rating: r.rating, verified: r.verified, href: `/food/${r.slug}`, listingCount: allDishes.filter((d) => d.restaurant === r.slug).length })
  }
  for (const c of allClinics) {
    out.push({ key: businessKey('health', c.slug), vertical: 'health', slug: c.slug, name: c.name, emoji: c.emoji, from: c.from, to: c.to, city: c.city, rating: c.rating, verified: c.verified, href: `/health/${c.slug}`, listingCount: allDoctors.filter((d) => d.clinic === c.slug).length })
  }
  for (const p of allProviders) {
    out.push({ key: businessKey('services', p.slug), vertical: 'services', slug: p.slug, name: p.name, emoji: p.emoji, from: p.from, to: p.to, city: p.city, rating: p.rating, verified: p.verified, href: `/services/provider/${p.slug}`, listingCount: allOfferings.filter((o) => o.provider === p.slug).length })
  }
  return out
}

export function adminListings(): AdminListing[] {
  const out: AdminListing[] = []

  for (const p of allProducts) {
    const s = shopOf(p)
    out.push({ key: listingKey('shop', p.slug), businessKey: businessKey('shop', p.shop), vertical: 'shop', slug: p.slug, name: p.name, emoji: p.emoji, from: p.from, to: p.to, priceLabel: `Rs ${p.price.toLocaleString('en-US')}`, price: p.price, href: `/product/${p.slug}`, sub: s?.name ?? 'Shop' })
  }
  for (const d of allDishes) {
    const r = restaurantOf(d)
    out.push({ key: listingKey('food', d.slug), businessKey: businessKey('food', d.restaurant), vertical: 'food', slug: d.slug, name: d.name, emoji: d.emoji, from: d.from, to: d.to, priceLabel: `Rs ${d.price.toLocaleString('en-US')}`, price: d.price, href: `/food/${d.restaurant}`, sub: r?.name ?? 'Restaurant' })
  }
  for (const d of allDoctors) {
    const c = clinicOf(d)
    out.push({ key: listingKey('health', d.slug), businessKey: businessKey('health', d.clinic), vertical: 'health', slug: d.slug, name: d.name, emoji: d.emoji, from: d.from, to: d.to, priceLabel: `Rs ${d.price.toLocaleString('en-US')}`, price: d.price, href: `/health/doctor/${d.slug}`, sub: `${specialtyName(d.specialty)}${c ? ' · ' + c.name : ''}` })
  }
  for (const o of allOfferings) {
    const pr = providerOf(o)
    out.push({ key: listingKey('services', o.slug), businessKey: businessKey('services', o.provider), vertical: 'services', slug: o.slug, name: o.name, emoji: o.emoji, from: o.from, to: o.to, priceLabel: priceLabel(o), price: o.price, href: `/book/service/${o.slug}`, sub: pr?.name ?? 'Service' })
  }
  return out
}
