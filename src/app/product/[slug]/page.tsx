import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { BadgeCheck, Check, Plus, ShoppingBag } from 'lucide-react'
import {
  allProducts,
  categoryOf,
  discountPct,
  getProduct,
  isOnSale,
  isSoldOut,
  pairsWith,
  related,
  shopOf,
} from '@/lib/catalog'
import { formatCompact, formatPrice } from '@/lib/format'
import { ProductImage } from '@/components/ui/ProductImage'
import { Stars } from '@/components/ui/Stars'
import { Badge } from '@/components/ui/Badge'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { ProductActions } from '@/components/ProductActions'
import { ProductRow } from '@/components/ProductRow'
import { Reviews } from '@/components/Reviews'
import { Section } from '@/components/Section'
import { DeliveryBadge } from '@/components/DeliveryBadge'
import { ProductSeen } from '@/components/ProductSeen'
import { RecentlyViewed } from '@/components/RecentlyViewed'
import { StickyBuyBar } from '@/components/StickyBuyBar'
import { BundleAddButton } from '@/components/BundleAddButton'
import { ProductJsonLd } from '@/components/JsonLd'

export function generateStaticParams() {
  return allProducts.map((p) => ({ slug: p.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const p = getProduct(params.slug)
  if (!p) return { title: 'Product' }
  return {
    title: p.name,
    description: p.shortDesc,
    alternates: { canonical: `/product/${p.slug}` },
    openGraph: { title: p.name, description: p.shortDesc, type: 'website' },
  }
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProduct(params.slug)
  if (!product) notFound()
  const shop = shopOf(product)!
  const cat = categoryOf(product)
  const fbt = pairsWith(product, 3)
  const fbtTotal = product.price + fbt.reduce((n, p) => n + p.price, 0)

  return (
    <div className="flex flex-col gap-10">
      <ProductSeen slug={product.slug} />
      <StickyBuyBar product={product} />
      <ProductJsonLd
        name={product.name}
        description={product.shortDesc}
        price={product.price}
        rating={product.rating}
        reviewCount={product.reviewCount}
        inStock={!isSoldOut(product)}
        brand={shop.name}
        url={`/product/${product.slug}`}
      />

      <div className="container-app">
        <Breadcrumbs
          items={[
            ...(cat ? [{ label: cat.name, href: `/category/${cat.slug}` }] : []),
            { label: product.name },
          ]}
        />

        <div className="grid gap-6 lg:grid-cols-2 lg:gap-10">
          {/* gallery */}
          <div className="flex flex-col gap-3">
            <div className="relative">
              <ProductImage from={product.from} to={product.to} emoji={product.emoji} className="aspect-square w-full rounded-3xl" emojiClassName="text-[8rem]" />
              <div className="absolute left-3 top-3 flex gap-1.5">
                {isOnSale(product) && <Badge variant="flash">-{discountPct(product)}%</Badge>}
                {product.tags.includes('bestseller') && <Badge variant="bestseller" />}
              </div>
            </div>
            <div className="flex gap-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <ProductImage key={i} from={product.from} to={product.to} emoji={product.emoji} className="h-16 w-16 rounded-xl opacity-60" emojiClassName="text-2xl" />
              ))}
            </div>
          </div>

          {/* info */}
          <div className="flex flex-col gap-3">
            <Link href={`/shop/${shop.slug}`} className="inline-flex w-fit items-center gap-1.5 text-sm font-medium text-muted hover:text-brand">
              <span className="text-base">{shop.emoji}</span> {shop.name}
              {shop.verified && <BadgeCheck size={15} className="text-brand" />}
            </Link>
            <h1 className="text-2xl font-extrabold leading-tight tracking-tight text-ink sm:text-3xl">{product.name}</h1>
            <div className="flex flex-wrap items-center gap-3">
              <Stars rating={product.rating} count={product.reviewCount} showValue />
              <span className="text-sm text-faint">{formatCompact(product.sold)} sold</span>
              <DeliveryBadge shop={shop} />
            </div>

            <ProductActions product={product} shop={shop} />

            {/* highlights */}
            <div className="mt-2 rounded-xl border border-line bg-surface p-4">
              <h3 className="mb-2 text-sm font-bold text-ink">Why you’ll love it</h3>
              <ul className="grid gap-2 sm:grid-cols-2">
                {product.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2 text-sm text-muted">
                    <Check size={16} className="mt-0.5 shrink-0 text-success" /> {h}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* frequently bought together */}
      {fbt.length > 0 && (
        <section className="container-app">
          <h2 className="mb-3 flex items-center gap-2 text-lg font-extrabold text-ink">
            <ShoppingBag size={20} className="text-brand" /> Frequently bought together
          </h2>
          <div className="card flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
            <div className="flex flex-1 flex-wrap items-center gap-2">
              {[product, ...fbt].map((p, i) => (
                <div key={p.slug} className="flex items-center gap-2">
                  {i > 0 && <Plus size={16} className="text-faint" />}
                  <Link href={`/product/${p.slug}`} className="flex flex-col items-center gap-1">
                    <ProductImage from={p.from} to={p.to} emoji={p.emoji} className="h-20 w-20 rounded-xl" emojiClassName="text-3xl" />
                    <span className="w-20 truncate text-center text-xs text-muted">{formatPrice(p.price)}</span>
                  </Link>
                </div>
              ))}
            </div>
            <div className="flex flex-col items-stretch gap-2 border-t border-line pt-3 sm:w-56 sm:border-l sm:border-t-0 sm:pl-4 sm:pt-0">
              <span className="text-sm text-muted">Bundle total</span>
              <span className="text-xl font-extrabold text-ink tabular">{formatPrice(fbtTotal)}</span>
              <BundleAddButton slugs={[product.slug, ...fbt.map((p) => p.slug)]} total={fbtTotal} />
            </div>
          </div>
        </section>
      )}

      {/* description + specs */}
      <section className="container-app grid gap-6 md:grid-cols-[1fr_320px]">
        <div>
          <h2 className="mb-3 text-lg font-extrabold text-ink">Product details</h2>
          <p className="text-sm leading-relaxed text-muted">{product.description}</p>
        </div>
        <div>
          <h2 className="mb-3 text-lg font-extrabold text-ink">Specifications</h2>
          <dl className="overflow-hidden rounded-xl border border-line">
            {product.specs.map((s, i) => (
              <div key={s.label} className={i % 2 ? 'flex justify-between gap-4 bg-surface px-4 py-2.5 text-sm' : 'flex justify-between gap-4 bg-elevated px-4 py-2.5 text-sm'}>
                <dt className="text-muted">{s.label}</dt>
                <dd className="font-medium text-ink">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* related */}
      <Section title="You may also like">
        <ProductRow products={related(product, 12)} />
      </Section>

      {/* reviews */}
      <section className="container-app">
        <h2 className="mb-4 text-lg font-extrabold text-ink">Ratings & reviews</h2>
        <Reviews slug={product.slug} />
      </section>

      <RecentlyViewed excludeSlug={product.slug} />
    </div>
  )
}
