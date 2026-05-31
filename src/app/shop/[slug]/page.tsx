import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { BadgeCheck, MessageCircle, Users, Clock, MapPin } from 'lucide-react'
import { allShops, cityOf, getShop, productsByShop } from '@/lib/catalog'
import { formatCompact } from '@/lib/format'
import { waContactShop } from '@/lib/whatsapp'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { ProductBrowser } from '@/components/ProductBrowser'
import { DeliveryBadge } from '@/components/DeliveryBadge'
import { Stars } from '@/components/ui/Stars'
import { ShopAboutLive } from '@/components/ShopAboutLive'

export function generateStaticParams() {
  return allShops.map((s) => ({ slug: s.slug }))
}
export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const s = getShop(params.slug)
  return { title: s ? s.name : 'Shop', description: s?.tagline }
}

export default function ShopPage({ params }: { params: { slug: string } }) {
  const shop = getShop(params.slug)
  if (!shop) notFound()
  const products = productsByShop(shop.slug)
  const city = cityOf(shop)

  return (
    <div className="flex flex-col gap-2">
      <div className="container-app">
        <Breadcrumbs items={[{ label: 'Shops', href: '/shops' }, { label: shop.name }]} />
      </div>

      {/* banner */}
      <div className="container-app">
        <div className="overflow-hidden rounded-3xl border border-line">
          <div className="h-28 sm:h-36" style={{ backgroundImage: `linear-gradient(135deg, ${shop.from}, ${shop.to})` }} />
          <div className="relative flex flex-col gap-4 bg-surface p-4 sm:flex-row sm:items-end sm:p-6">
            <div className="-mt-16 grid h-20 w-20 shrink-0 place-items-center rounded-2xl border-4 border-surface bg-elevated text-4xl shadow-card sm:h-24 sm:w-24">
              {shop.emoji}
            </div>
            <div className="flex-1">
              <h1 className="flex items-center gap-1.5 text-xl font-extrabold text-ink sm:text-2xl">
                {shop.name}
                {shop.verified && <BadgeCheck size={20} className="text-brand" />}
              </h1>
              <p className="text-sm text-muted">{shop.tagline}</p>
              <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted">
                <Stars rating={shop.rating} count={shop.ratingCount} showValue />
                <span className="inline-flex items-center gap-1"><Users size={13} /> {formatCompact(shop.followers)} followers</span>
                <span className="inline-flex items-center gap-1"><Clock size={13} /> {shop.responseRate}% response</span>
                {city && <span className="inline-flex items-center gap-1"><MapPin size={13} /> {city.name}</span>}
                <DeliveryBadge shop={shop} />
              </div>
            </div>
            <a href={waContactShop(shop)} target="_blank" rel="noreferrer" className="btn-wa btn-md shrink-0">
              <MessageCircle size={17} /> Contact shop
            </a>
          </div>
        </div>
      </div>

      <div className="container-app pt-4">
        <h2 className="mb-4 text-lg font-extrabold text-ink">{products.length} products</h2>
      </div>
      <ProductBrowser products={products} enableCategoryFilter />

      {/* Quiet, optional depth — never obstructs the buy flow above. */}
      <ShopAboutLive slug={shop.slug} name={shop.name} about={shop.about} />
    </div>
  )
}
