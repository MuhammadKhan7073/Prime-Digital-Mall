'use client'

import Link from 'next/link'
import { MapPin, ChevronRight, Sparkles } from 'lucide-react'
import { getCity, productsInCity, shopsInCity } from '@/lib/catalog'
import { useHydrated } from '@/lib/useHydrated'
import { useUI } from '@/store/ui'
import { Section } from '@/components/Section'
import { ProductRow } from '@/components/ProductRow'
import { ShopCard } from '@/components/ShopCard'

export function CityFeed() {
  const hydrated = useHydrated()
  const city = useUI((s) => s.city)
  const openCityPicker = useUI((s) => s.openCityPicker)

  if (!hydrated) return null

  if (!city) {
    return (
      <div className="container-app">
        <button
          onClick={openCityPicker}
          className="flex w-full items-center gap-4 rounded-2xl border border-brand/30 bg-brand-soft p-4 text-left transition-shadow hover:shadow-card"
        >
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-brand text-brand-fg">
            <MapPin size={22} />
          </span>
          <span className="flex-1">
            <span className="block font-bold text-ink">Choose your city</span>
            <span className="block text-sm text-muted">See local shops and faster delivery near you.</span>
          </span>
          <ChevronRight size={20} className="text-brand" />
        </button>
      </div>
    )
  }

  const c = getCity(city)
  const shops = shopsInCity(city).slice(0, 6)
  const products = [...productsInCity(city)].sort((a, b) => b.sold - a.sold).slice(0, 12)

  return (
    <>
      <Section
        title={`Popular in ${c?.name ?? 'your city'}`}
        subtitle="Shops that deliver to you"
        icon={<Sparkles size={20} className="text-brand" />}
        href="/search"
        hrefLabel="Browse all"
      >
        <ProductRow products={products} />
      </Section>

      <Section title={`Shops delivering to ${c?.name ?? 'you'}`} className="mt-8" href="/shops" hrefLabel="All shops">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {shops.map((s) => (
            <ShopCard key={s.slug} shop={s} />
          ))}
        </div>
      </Section>
    </>
  )
}
