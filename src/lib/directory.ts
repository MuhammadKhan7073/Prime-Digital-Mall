/** Universal cross-vertical search aggregator. */

import { allProducts, allShops, categoryOf } from '@/lib/catalog'
import { allDishes, allRestaurants, restaurantOf } from '@/lib/food'
import { allDoctors, allClinics, clinicOf, specialtyName } from '@/lib/health'
import { allOfferings, allProviders, providerOf, priceLabel } from '@/lib/services'

export type ResultKind = 'product' | 'shop' | 'dish' | 'restaurant' | 'doctor' | 'clinic' | 'offering' | 'provider'

export interface UniversalResult {
  kind: ResultKind
  vertical: 'shop' | 'food' | 'health' | 'services'
  label: string
  sub: string
  href: string
  emoji: string
  from: string
  to: string
  price?: string
}

function has(text: string, q: string): boolean {
  return text.toLowerCase().includes(q)
}

export function universalSearch(query: string, limitPer = 6): UniversalResult[] {
  const q = query.trim().toLowerCase()
  if (!q) return []
  const out: UniversalResult[] = []

  for (const p of allProducts) {
    if (out.filter((r) => r.kind === 'product').length >= limitPer) break
    if (has(`${p.name} ${p.shortDesc}`, q)) out.push({ kind: 'product', vertical: 'shop', label: p.name, sub: categoryOf(p)?.name ?? 'Product', href: `/product/${p.slug}`, emoji: p.emoji, from: p.from, to: p.to, price: `Rs ${p.price.toLocaleString('en-US')}` })
  }
  for (const s of allShops) {
    if (has(s.name, q)) out.push({ kind: 'shop', vertical: 'shop', label: s.name, sub: 'Shop', href: `/shop/${s.slug}`, emoji: s.emoji, from: s.from, to: s.to })
  }
  for (const d of allDishes) {
    if (out.filter((r) => r.kind === 'dish').length >= limitPer) break
    if (has(`${d.name} ${d.shortDesc}`, q)) { const r = restaurantOf(d); out.push({ kind: 'dish', vertical: 'food', label: d.name, sub: r?.name ?? 'Dish', href: `/food/${d.restaurant}`, emoji: d.emoji, from: d.from, to: d.to, price: `Rs ${d.price.toLocaleString('en-US')}` }) }
  }
  for (const r of allRestaurants) {
    if (has(`${r.name} ${r.tagline}`, q)) out.push({ kind: 'restaurant', vertical: 'food', label: r.name, sub: 'Restaurant', href: `/food/${r.slug}`, emoji: r.emoji, from: r.from, to: r.to })
  }
  for (const d of allDoctors) {
    if (has(`${d.name} ${d.shortDesc} ${specialtyName(d.specialty)}`, q)) out.push({ kind: 'doctor', vertical: 'health', label: d.name, sub: specialtyName(d.specialty), href: `/health/doctor/${d.slug}`, emoji: d.emoji, from: d.from, to: d.to, price: `Rs ${d.price.toLocaleString('en-US')}` })
  }
  for (const c of allClinics) {
    if (has(`${c.name} ${c.tagline}`, q)) out.push({ kind: 'clinic', vertical: 'health', label: c.name, sub: 'Clinic', href: `/health/${c.slug}`, emoji: c.emoji, from: c.from, to: c.to })
  }
  for (const o of allOfferings) {
    if (out.filter((r) => r.kind === 'offering').length >= limitPer) break
    if (has(`${o.name} ${o.shortDesc}`, q)) { const p = providerOf(o); out.push({ kind: 'offering', vertical: 'services', label: o.name, sub: p?.name ?? 'Service', href: `/services/provider/${o.provider}`, emoji: o.emoji, from: o.from, to: o.to, price: priceLabel(o) }) }
  }
  for (const p of allProviders) {
    if (has(`${p.name} ${p.tagline}`, q)) out.push({ kind: 'provider', vertical: 'services', label: p.name, sub: 'Service provider', href: `/services/provider/${p.slug}`, emoji: p.emoji, from: p.from, to: p.to })
  }

  return out
}
