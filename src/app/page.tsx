import { TrendingUp } from 'lucide-react'
import {
  allCategories,
  flashDeals,
  productsByCategory,
  trending,
} from '@/lib/catalog'
import { CityFeed } from '@/components/CityFeed'
import { FlashStrip } from '@/components/FlashStrip'
import { Section } from '@/components/Section'
import { ProductRow } from '@/components/ProductRow'
import { RecentlyViewed } from '@/components/RecentlyViewed'
import { VerticalHub } from '@/components/VerticalHub'
import { RestaurantCard } from '@/components/RestaurantCard'
import { DoctorCard } from '@/components/DoctorCard'
import { OfferingCard } from '@/components/OfferingCard'
import { topRestaurants } from '@/lib/food'
import { topDoctors } from '@/lib/health'
import { popularOfferings } from '@/lib/services'
import { UtensilsCrossed, Stethoscope, Wrench } from 'lucide-react'

const SPOTLIGHT = ['electronics', 'fashion', 'grocery', 'beauty']

export default function HomePage() {
  const restaurants = topRestaurants(8)
  const doctors = topDoctors(6)
  const services = popularOfferings(6)

  return (
    <div className="flex flex-col gap-8">
      {/* one platform, four worlds */}
      <section className="container-app pt-2">
        <div className="mb-3">
          <span className="rule-accent mb-2 block" />
          <h1 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">Everything you need, one place</h1>
          <p className="text-sm text-muted">Shop, eat, get well, and get things done — across Pakistan.</p>
        </div>
        <VerticalHub />
      </section>

      {/* personalized by city (shopping) */}
      <CityFeed />

      {/* flash deals (shopping) */}
      <FlashStrip products={flashDeals(10)} />

      {/* trending products */}
      <Section title="Trending now" subtitle="What Pakistan is buying" icon={<TrendingUp size={20} className="text-brand" />} href="/shop" hrefLabel="Shop all">
        <ProductRow products={trending(12)} />
      </Section>

      {/* food cross-sell */}
      <Section title="Hungry?" subtitle="Top restaurants near you" icon={<UtensilsCrossed size={20} className="text-accent" />} href="/food" hrefLabel="Order food">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {restaurants.slice(0, 4).map((r) => <RestaurantCard key={r.slug} restaurant={r} />)}
        </div>
      </Section>

      {/* category spotlights */}
      {SPOTLIGHT.slice(0, 2).map((slug) => {
        const cat = allCategories.find((c) => c.slug === slug)!
        return (
          <Section key={slug} title={cat.name} subtitle={cat.blurb} href={`/category/${slug}`}>
            <ProductRow products={productsByCategory(slug).slice(0, 10)} />
          </Section>
        )
      })}

      {/* health cross-sell */}
      <Section title="Feeling unwell?" subtitle="Book a verified doctor today" icon={<Stethoscope size={20} className="text-sky-500" />} href="/health" hrefLabel="Find a doctor">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {doctors.slice(0, 3).map((d) => <DoctorCard key={d.slug} doctor={d} />)}
        </div>
      </Section>

      {/* services cross-sell */}
      <Section title="Need a hand at home?" subtitle="Cleaning, repairs, beauty & more" icon={<Wrench size={20} className="text-violet-500" />} href="/services" hrefLabel="Book a service">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {services.slice(0, 3).map((o) => <OfferingCard key={o.slug} offering={o} />)}
        </div>
      </Section>

      {/* recently viewed (shopping) */}
      <RecentlyViewed />
    </div>
  )
}
