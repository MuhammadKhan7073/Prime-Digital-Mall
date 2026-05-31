import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/data/verticals'
import { allCategories, allProducts, allShops } from '@/lib/catalog'
import { allRestaurants } from '@/lib/food'
import { allClinics, allDoctors, allSpecialties } from '@/lib/health'
import { allOfferings, allProviders, allServiceCategories } from '@/lib/services'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const u = (path: string) => `${SITE_URL}${path}`
  const now = new Date('2026-05-31')

  const statics = [
    '', '/shop', '/food', '/health', '/services', '/deals', '/shops', '/find', '/request', '/bookings', '/cart',
  ].map((p) => ({ url: u(p || '/'), lastModified: now, changeFrequency: 'daily' as const, priority: p === '' ? 1 : 0.8 }))

  const entries: MetadataRoute.Sitemap = [
    ...statics,
    ...allCategories.map((c) => ({ url: u(`/category/${c.slug}`), lastModified: now, changeFrequency: 'daily' as const, priority: 0.7 })),
    ...allShops.map((s) => ({ url: u(`/shop/${s.slug}`), lastModified: now, changeFrequency: 'weekly' as const, priority: 0.6 })),
    ...allProducts.map((p) => ({ url: u(`/product/${p.slug}`), lastModified: now, changeFrequency: 'weekly' as const, priority: 0.6 })),
    ...allRestaurants.map((r) => ({ url: u(`/food/${r.slug}`), lastModified: now, changeFrequency: 'weekly' as const, priority: 0.6 })),
    ...allSpecialties.map((s) => ({ url: u(`/health/specialty/${s.slug}`), lastModified: now, changeFrequency: 'weekly' as const, priority: 0.6 })),
    ...allClinics.map((c) => ({ url: u(`/health/${c.slug}`), lastModified: now, changeFrequency: 'weekly' as const, priority: 0.5 })),
    ...allDoctors.map((d) => ({ url: u(`/health/doctor/${d.slug}`), lastModified: now, changeFrequency: 'weekly' as const, priority: 0.6 })),
    ...allServiceCategories.map((c) => ({ url: u(`/services/${c.slug}`), lastModified: now, changeFrequency: 'weekly' as const, priority: 0.6 })),
    ...allProviders.map((p) => ({ url: u(`/services/provider/${p.slug}`), lastModified: now, changeFrequency: 'weekly' as const, priority: 0.5 })),
    ...allOfferings.map((o) => ({ url: u(`/book/service/${o.slug}`), lastModified: now, changeFrequency: 'weekly' as const, priority: 0.5 })),
  ]
  return entries
}
