import type { Metadata } from 'next'
import Link from 'next/link'
import { UtensilsCrossed, Flame } from 'lucide-react'
import { allCuisines, popularDishes, topRestaurants } from '@/lib/food'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { Section } from '@/components/Section'
import { HScroll } from '@/components/HScroll'
import { RestaurantCard } from '@/components/RestaurantCard'
import { DishRow } from '@/components/food/DishRow'

export const metadata: Metadata = { title: 'Food — Restaurants & Delivery', description: 'Order food from top restaurants across Pakistan. Fast delivery, cash on delivery.' }

export default function FoodHome() {
  const restaurants = topRestaurants(12)
  const popular = popularDishes(8)

  return (
    <div className="flex flex-col gap-8">
      <div className="container-app">
        <Breadcrumbs items={[{ label: 'Food' }]} />
        <div className="overflow-hidden rounded-3xl p-6 text-white sm:p-8" style={{ backgroundImage: 'linear-gradient(135deg, #c2410c, #f59e0b)' }}>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs font-bold backdrop-blur"><UtensilsCrossed size={13} /> FOOD DELIVERY</span>
          <h1 className="mt-3 font-display text-3xl font-bold sm:text-4xl">Hungry? Order in minutes</h1>
          <p className="mt-1 text-white/90">Biryani, BBQ, pizza, burgers & more — delivered hot.</p>
        </div>
      </div>

      {/* cuisines */}
      <section className="container-app">
        <HScroll>
          {allCuisines.map((c) => (
            <Link key={c.slug} href={`/food?cuisine=${c.slug}`} className="group flex w-[92px] shrink-0 snap-start flex-col items-center gap-2">
              <span className="grid h-16 w-16 place-items-center rounded-2xl bg-elevated text-3xl shadow-card transition-transform group-hover:-translate-y-0.5 sm:h-18 sm:w-18">{c.emoji}</span>
              <span className="text-center text-xs font-semibold text-ink">{c.name}</span>
            </Link>
          ))}
        </HScroll>
      </section>

      <Section title="Popular dishes" subtitle="What Pakistan is craving" icon={<Flame size={20} className="text-deal" />}>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {popular.map((d) => <DishRow key={d.slug} dish={d} />)}
        </div>
      </Section>

      <Section title="Top restaurants" icon={<UtensilsCrossed size={20} className="text-accent" />}>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {restaurants.map((r) => <RestaurantCard key={r.slug} restaurant={r} />)}
        </div>
      </Section>
    </div>
  )
}
