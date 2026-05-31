import { categories, cities, products, reviews, shops } from '@/data/catalog'
import type { Category, City, Product, Review, Shop } from '@/data/types'

export const LOW_STOCK_THRESHOLD = 8
export const FREE_SHIP_THRESHOLD = 2500

export const allProducts = products
export const allShops = shops
export const allCategories = categories
export const allCities = cities

/* ---------------- lookups ---------------- */

export const getProduct = (slug: string): Product | undefined => products.find((p) => p.slug === slug)
export const getShop = (slug: string): Shop | undefined => shops.find((s) => s.slug === slug)
export const getCategory = (slug: string): Category | undefined => categories.find((c) => c.slug === slug)
export const getCity = (slug: string): City | undefined => cities.find((c) => c.slug === slug)

export const shopOf = (p: Product): Shop | undefined => shops.find((s) => s.slug === p.shop)
export const categoryOf = (p: Product): Category | undefined => categories.find((c) => c.slug === p.category)
export const cityOf = (s: Shop): City | undefined => cities.find((c) => c.slug === s.city)

/* ---------------- flags ---------------- */

export const isOnSale = (p: Product): boolean => !!p.compareAt && p.compareAt > p.price
export const isLowStock = (p: Product): boolean => p.stock > 0 && p.stock <= LOW_STOCK_THRESHOLD
export const isSoldOut = (p: Product): boolean => p.stock <= 0
export function discountPct(p: Product): number {
  if (!isOnSale(p)) return 0
  return Math.round(((p.compareAt! - p.price) / p.compareAt!) * 100)
}

/* ---------------- delivery / city ---------------- */

export function availableInCity(s: Shop, citySlug: string): boolean {
  if (s.delivery === 'pakistan') return true
  if (s.city === citySlug) return true
  return !!s.deliversTo?.includes(citySlug)
}

export function deliveryLabel(s: Shop): string {
  if (s.delivery === 'pakistan') return 'Delivers all Pakistan'
  if (s.delivery === 'city') return 'City delivery'
  return 'Pickup only'
}

export const shopsInCity = (citySlug: string): Shop[] => shops.filter((s) => availableInCity(s, citySlug))
export function productsInCity(citySlug: string): Product[] {
  const ok = new Set(shopsInCity(citySlug).map((s) => s.slug))
  return products.filter((p) => ok.has(p.shop))
}

/* ---------------- collections ---------------- */

export const productsByShop = (slug: string): Product[] => products.filter((p) => p.shop === slug)
export const productsByCategory = (slug: string): Product[] => products.filter((p) => p.category === slug)

export const trending = (limit = 8): Product[] =>
  [...products].filter((p) => p.tags.includes('trending') || p.tags.includes('bestseller')).sort((a, b) => b.sold - a.sold).slice(0, limit)
export const bestsellers = (limit = 8): Product[] => [...products].sort((a, b) => b.sold - a.sold).slice(0, limit)
export const newArrivals = (limit = 8): Product[] => [...products].sort((a, b) => a.createdDaysAgo - b.createdDaysAgo).slice(0, limit)
export const flashDeals = (limit = 8): Product[] => products.filter((p) => p.tags.includes('flash') && isOnSale(p)).slice(0, limit)
export const deals = (limit = 48): Product[] => [...products].filter(isOnSale).sort((a, b) => discountPct(b) - discountPct(a)).slice(0, limit)
export const editorPicks = (limit = 6): Product[] => products.filter((p) => p.tags.includes('editor')).slice(0, limit)

/* ---------------- recommendations ---------------- */

export function related(p: Product, limit = 6): Product[] {
  return products
    .filter((x) => x.slug !== p.slug && (x.category === p.category || x.shop === p.shop))
    .sort((a, b) => {
      const score = (x: Product) => (x.category === p.category ? 2 : 0) + (x.shop === p.shop ? 1 : 0) + x.rating / 10
      return score(b) - score(a)
    })
    .slice(0, limit)
}

export function pairsWith(p: Product, limit = 3): Product[] {
  const explicit = (p.pairsWith ?? []).map(getProduct).filter(Boolean) as Product[]
  if (explicit.length >= limit) return explicit.slice(0, limit)
  const filler = products.filter((x) => x.shop === p.shop && x.slug !== p.slug && !explicit.includes(x))
  return [...explicit, ...filler].slice(0, limit)
}

export const getProducts = (slugs: string[]): Product[] => slugs.map(getProduct).filter(Boolean) as Product[]

/* ---------------- reviews ---------------- */

export const reviewsFor = (slug: string): Review[] => reviews.filter((r) => r.productSlug === slug)
export function ratingBreakdown(slug: string): Record<number, number> {
  const out: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
  for (const r of reviewsFor(slug)) out[r.rating] = (out[r.rating] ?? 0) + 1
  return out
}

/* ---------------- search + filter ---------------- */

export type Sort = 'relevance' | 'price-asc' | 'price-desc' | 'rating' | 'newest' | 'popular'

export interface FilterOpts {
  query?: string
  category?: string
  shop?: string
  city?: string
  min?: number
  max?: number
  minRating?: number
  inStockOnly?: boolean
  onSaleOnly?: boolean
  freeShipOnly?: boolean
  tags?: string[]
  sort?: Sort
}

function matchesQuery(p: Product, q: string): boolean {
  const hay = `${p.name} ${p.shortDesc} ${p.tags.join(' ')} ${p.shop} ${p.category}`.toLowerCase()
  return q.toLowerCase().split(/\s+/).filter(Boolean).every((t) => hay.includes(t))
}

export function filterProducts(o: FilterOpts): Product[] {
  let list = products.slice()
  if (o.category) list = list.filter((p) => p.category === o.category)
  if (o.shop) list = list.filter((p) => p.shop === o.shop)
  if (o.city) {
    const ok = new Set(shopsInCity(o.city).map((s) => s.slug))
    list = list.filter((p) => ok.has(p.shop))
  }
  if (o.query?.trim()) list = list.filter((p) => matchesQuery(p, o.query!))
  if (o.min != null) list = list.filter((p) => p.price >= o.min!)
  if (o.max != null) list = list.filter((p) => p.price <= o.max!)
  if (o.minRating) list = list.filter((p) => p.rating >= o.minRating!)
  if (o.inStockOnly) list = list.filter((p) => !isSoldOut(p))
  if (o.onSaleOnly) list = list.filter(isOnSale)
  if (o.freeShipOnly) list = list.filter((p) => p.freeShipping)
  if (o.tags?.length) list = list.filter((p) => o.tags!.some((t) => p.tags.includes(t)))

  switch (o.sort) {
    case 'price-asc': list.sort((a, b) => a.price - b.price); break
    case 'price-desc': list.sort((a, b) => b.price - a.price); break
    case 'rating': list.sort((a, b) => b.rating - a.rating); break
    case 'newest': list.sort((a, b) => a.createdDaysAgo - b.createdDaysAgo); break
    case 'popular': list.sort((a, b) => b.sold - a.sold); break
    default:
      if (!o.query) list.sort((a, b) => b.sold - a.sold)
  }
  return list
}

export interface Suggestion {
  type: 'product' | 'shop' | 'category'
  label: string
  href: string
  meta?: string
  emoji?: string
}

export function suggest(query: string, limit = 8): Suggestion[] {
  const q = query.trim().toLowerCase()
  if (!q) return []
  const out: Suggestion[] = []
  for (const p of products) if (p.name.toLowerCase().includes(q)) out.push({ type: 'product', label: p.name, href: `/product/${p.slug}`, meta: categoryOf(p)?.name, emoji: p.emoji })
  for (const s of shops) if (s.name.toLowerCase().includes(q)) out.push({ type: 'shop', label: s.name, href: `/shop/${s.slug}`, meta: 'Shop', emoji: s.emoji })
  for (const c of categories) if (c.name.toLowerCase().includes(q)) out.push({ type: 'category', label: c.name, href: `/category/${c.slug}`, meta: 'Category' })
  return out.slice(0, limit)
}

/* ---------------- stats ---------------- */

export function priceBounds(): { min: number; max: number } {
  const ps = products.map((p) => p.price)
  return { min: Math.min(...ps), max: Math.max(...ps) }
}
export const shopProductCount = (slug: string): number => productsByShop(slug).length
export const categoriesWithCounts = (): (Category & { count: number })[] =>
  categories.map((c) => ({ ...c, count: productsByCategory(c.slug).length }))
export const shopsWithCounts = (): (Shop & { count: number })[] =>
  shops.map((s) => ({ ...s, count: shopProductCount(s.slug) }))
export const popularCities = (): City[] => cities.filter((c) => c.popular)
