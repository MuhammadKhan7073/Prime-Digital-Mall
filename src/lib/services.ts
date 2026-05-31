import { offerings, providers, serviceCategories } from '@/data/services'
import type { Offering, Provider, ServiceCategory } from '@/data/services'

export const allProviders = providers
export const allServiceCategories = serviceCategories
export const allOfferings = offerings

export const getProvider = (slug: string): Provider | undefined => providers.find((p) => p.slug === slug)
export const getOffering = (slug: string): Offering | undefined => offerings.find((o) => o.slug === slug)
export const getServiceCategory = (slug: string): ServiceCategory | undefined => serviceCategories.find((c) => c.slug === slug)
export const providerOf = (o: Offering): Provider | undefined => providers.find((p) => p.slug === o.provider)

export const offeringsOf = (providerSlug: string): Offering[] => offerings.filter((o) => o.provider === providerSlug)
export const providersByCategory = (slug: string): Provider[] => providers.filter((p) => p.category === slug)
export const offeringsByCategory = (slug: string): Offering[] => offerings.filter((o) => o.category === slug)
export const popularOfferings = (limit = 10): Offering[] => offerings.filter((o) => o.popular).slice(0, limit)

export function categoryName(slug: string): string {
  return serviceCategories.find((c) => c.slug === slug)?.name ?? slug
}

export function providersInCity(citySlug: string | null): Provider[] {
  if (!citySlug) return providers
  const local = providers.filter((p) => p.city === citySlug)
  return local.length ? local : providers
}

export function priceLabel(o: Offering): string {
  const rs = `Rs ${o.price.toLocaleString('en-US')}`
  switch (o.priceType) {
    case 'from': return `From ${rs}`
    case 'hourly': return `${rs}/hr`
    case 'visit': return `${rs} visit`
    case 'fixed':
    default: return rs
  }
}

export function categoriesWithCounts(): (ServiceCategory & { count: number })[] {
  return serviceCategories.map((c) => ({ ...c, count: providersByCategory(c.slug).length }))
}
