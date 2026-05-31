import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { BadgeCheck, Clock, Bike, MessageCircle, MapPin } from 'lucide-react'
import { allRestaurants, dishCategories, dishesOf, getRestaurant } from '@/lib/food'
import { getCity } from '@/lib/catalog'
import { formatPrice } from '@/lib/format'
import { waContactRestaurant } from '@/lib/wa-verticals'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { Stars } from '@/components/ui/Stars'
import { DishRow } from '@/components/food/DishRow'
import { RestaurantJsonLd } from '@/components/JsonLd'

export function generateStaticParams() {
  return allRestaurants.map((r) => ({ restaurant: r.slug }))
}
export function generateMetadata({ params }: { params: { restaurant: string } }): Metadata {
  const r = getRestaurant(params.restaurant)
  return { title: r ? r.name : 'Restaurant', description: r?.tagline }
}

export default function RestaurantPage({ params }: { params: { restaurant: string } }) {
  const r = getRestaurant(params.restaurant)
  if (!r) notFound()
  const cats = dishCategories(r.slug)
  const dishes = dishesOf(r.slug)
  const city = getCity(r.city)

  return (
    <div className="flex flex-col gap-6">
      <RestaurantJsonLd name={r.name} description={r.tagline} rating={r.rating} reviewCount={r.ratingCount} city={city?.name ?? 'Pakistan'} url={`/food/${r.slug}`} />
      <div className="container-app">
        <Breadcrumbs items={[{ label: 'Food', href: '/food' }, { label: r.name }]} />
        <div className="overflow-hidden rounded-3xl border border-line">
          <div className="h-28 sm:h-36" style={{ backgroundImage: `linear-gradient(135deg, ${r.from}, ${r.to})` }} />
          <div className="flex flex-col gap-4 bg-surface p-4 sm:flex-row sm:items-end sm:p-6">
            <div className="-mt-16 grid h-20 w-20 shrink-0 place-items-center rounded-2xl border-4 border-surface bg-elevated text-4xl shadow-card">{r.emoji}</div>
            <div className="flex-1">
              <h1 className="flex items-center gap-1.5 font-display text-2xl font-bold text-ink">{r.name}{r.verified && <BadgeCheck size={20} className="text-brand" />}</h1>
              <p className="text-sm text-muted">{r.tagline}</p>
              <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted">
                <Stars rating={r.rating} count={r.ratingCount} showValue />
                <span className="inline-flex items-center gap-1"><Clock size={13} /> {r.deliveryMins} min</span>
                <span className="inline-flex items-center gap-1"><Bike size={13} /> {formatPrice(r.deliveryFee)} delivery</span>
                <span className="inline-flex items-center gap-1"><MapPin size={13} /> {city?.name}</span>
                <span>Min order {formatPrice(r.minOrder)}</span>
              </div>
            </div>
            <a href={waContactRestaurant(r)} target="_blank" rel="noreferrer" className="btn-wa btn-md shrink-0"><MessageCircle size={17} /> Contact</a>
          </div>
        </div>
      </div>

      {!r.open && (
        <div className="container-app">
          <div className="rounded-xl border border-warn/40 bg-warn/10 px-4 py-3 text-sm font-medium text-warn">This restaurant is currently closed — you can still browse the menu and order on WhatsApp.</div>
        </div>
      )}

      <div className="container-app flex flex-col gap-6">
        {cats.map((cat) => (
          <section key={cat}>
            <h2 className="mb-3 font-display text-xl font-bold text-ink">{cat}</h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {dishes.filter((d) => d.category === cat).map((d) => <DishRow key={d.slug} dish={d} />)}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
