import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { Clock, Check, ShieldCheck } from 'lucide-react'
import { allOfferings, categoryName, getOffering, priceLabel, providerOf } from '@/lib/services'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { ProductImage } from '@/components/ui/ProductImage'
import { Stars } from '@/components/ui/Stars'
import { BookingForm } from '@/components/BookingForm'

export function generateStaticParams() {
  return allOfferings.map((o) => ({ slug: o.slug }))
}
export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const o = getOffering(params.slug)
  return { title: o ? `Book ${o.name}` : 'Book service', description: o?.shortDesc }
}

export default function BookServicePage({ params }: { params: { slug: string } }) {
  const o = getOffering(params.slug)
  if (!o) notFound()
  const provider = providerOf(o)

  return (
    <div className="container-app">
      <Breadcrumbs items={[{ label: 'Services', href: '/services' }, { label: categoryName(o.category), href: `/services/${o.category}` }, { label: o.name }]} />

      <div className="grid gap-6 lg:grid-cols-[1fr_400px]">
        <div>
          <div className="card flex flex-col gap-4 p-5 sm:flex-row">
            <ProductImage from={o.from} to={o.to} emoji={o.emoji} className="h-28 w-28 shrink-0 rounded-2xl" emojiClassName="text-5xl" />
            <div className="flex-1">
              <h1 className="font-display text-2xl font-bold text-ink">{o.name}</h1>
              {provider && <Link href={`/services/provider/${provider.slug}`} className="text-sm font-medium text-brand hover:underline">{provider.name}</Link>}
              <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted">
                <Stars rating={o.rating} count={o.reviewCount} showValue />
                <span className="inline-flex items-center gap-1"><Clock size={13} /> {o.durationLabel}</span>
                <span className="font-bold text-ink">{priceLabel(o)}</span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted">{o.shortDesc}</p>
            </div>
          </div>

          <div className="card mt-4 p-5">
            <h2 className="mb-2 font-bold text-ink">What’s included</h2>
            <ul className="grid gap-2 sm:grid-cols-2">
              {['Verified, trained staff', 'Transparent pricing', 'Reschedule anytime', 'Pay after the job'].map((h) => (
                <li key={h} className="flex items-center gap-2 text-sm text-muted"><Check size={15} className="text-success" /> {h}</li>
              ))}
            </ul>
            <div className="mt-3 flex items-center gap-2 rounded-xl bg-elevated px-3 py-2 text-xs text-muted">
              <ShieldCheck size={14} className="text-success" /> Final price confirmed by the provider before work begins.
            </div>
          </div>
        </div>

        <aside className="lg:sticky lg:top-32 lg:h-fit">
          <BookingForm
            type="service"
            slug={o.slug}
            providerSlug={provider?.slug ?? ''}
            title={o.name}
            subtitle={provider?.name ?? categoryName(o.category)}
            emoji={o.emoji}
            price={o.price}
            needsAddress
            waPhone={provider?.phone}
          />
        </aside>
      </div>
    </div>
  )
}
