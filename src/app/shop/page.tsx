import type { Metadata } from 'next'
import { TrendingUp, Sparkles, Store } from 'lucide-react'
import {
  allCategories,
  bestsellers,
  editorPicks,
  flashDeals,
  newArrivals,
  productsByCategory,
  shopsWithCounts,
  trending,
} from '@/lib/catalog'
import { CategoryNav } from '@/components/CategoryNav'
import { CityFeed } from '@/components/CityFeed'
import { FlashStrip } from '@/components/FlashStrip'
import { Section } from '@/components/Section'
import { ProductRow } from '@/components/ProductRow'
import { ShopCard } from '@/components/ShopCard'
import { RecentlyViewed } from '@/components/RecentlyViewed'
import { Breadcrumbs } from '@/components/Breadcrumbs'

export const metadata: Metadata = { title: 'Shopping', description: 'Electronics, fashion, grocery, beauty & more from trusted shops across Pakistan.' }

const SPOTLIGHT = ['electronics', 'fashion', 'grocery', 'beauty']

export default function ShopHome() {
  const shops = shopsWithCounts().sort((a, b) => b.rating - a.rating)

  return (
    <div className="flex flex-col gap-8">
      <section className="container-app">
        <Breadcrumbs items={[{ label: 'Shopping' }]} />
        <CategoryNav categories={allCategories} />
      </section>

      <CityFeed />
      <FlashStrip products={flashDeals(10)} />

      <Section title="Trending now" subtitle="What Pakistan is buying" icon={<TrendingUp size={20} className="text-brand" />} href="/find?q=trending" hrefLabel="See more">
        <ProductRow products={trending(12)} />
      </Section>

      <Section title="New arrivals" icon={<Sparkles size={20} className="text-brand" />}>
        <ProductRow products={newArrivals(12)} />
      </Section>

      {SPOTLIGHT.map((slug) => {
        const cat = allCategories.find((c) => c.slug === slug)!
        return (
          <Section key={slug} title={cat.name} subtitle={cat.blurb} href={`/category/${slug}`}>
            <ProductRow products={productsByCategory(slug).slice(0, 10)} />
          </Section>
        )
      })}

      <Section title="Editor’s picks" icon={<Sparkles size={20} className="text-brand" />}>
        <ProductRow products={editorPicks(10).length ? editorPicks(10) : bestsellers(10)} />
      </Section>

      <Section title="Top shops" icon={<Store size={20} className="text-brand" />} href="/shops">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {shops.slice(0, 5).map((s) => <ShopCard key={s.slug} shop={s} />)}
        </div>
      </Section>

      <RecentlyViewed />
    </div>
  )
}
