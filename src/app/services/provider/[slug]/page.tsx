import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { BadgeCheck, CheckCircle2, Zap, MessageCircle, ShieldCheck } from 'lucide-react'
import { allProviders, categoryName, getProvider, offeringsOf } from '@/lib/services'
import { getCity } from '@/lib/catalog'
import { formatCompact } from '@/lib/format'
import { waContactProvider } from '@/lib/wa-verticals'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { Stars } from '@/components/ui/Stars'
import { OfferingCard } from '@/components/OfferingCard'
import { ServiceJsonLd } from '@/components/JsonLd'

export function generateStaticParams() {
  return allProviders.map((p) => ({ slug: p.slug }))
}
export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const p = getProvider(params.slug)
  return { title: p ? p.name : 'Provider', description: p?.tagline }
}

export default function ProviderPage({ params }: { params: { slug: string } }) {
  const p = getProvider(params.slug)
  if (!p) notFound()
  const offerings = offeringsOf(p.slug)
  const city = getCity(p.city)

  return (
    <div className="flex flex-col gap-6">
      <ServiceJsonLd name={p.name} description={p.tagline} rating={p.rating} reviewCount={p.ratingCount} city={city?.name ?? 'Pakistan'} url={`/services/provider/${p.slug}`} />
      <div className="container-app">
        <Breadcrumbs items={[{ label: 'Services', href: '/services' }, { label: categoryName(p.category), href: `/services/${p.category}` }, { label: p.name }]} />
        <div className="overflow-hidden rounded-3xl border border-line">
          <div className="h-28 sm:h-36" style={{ backgroundImage: `linear-gradient(135deg, ${p.from}, ${p.to})` }} />
          <div className="flex flex-col gap-4 bg-surface p-4 sm:flex-row sm:items-end sm:p-6">
            <div className="-mt-16 grid h-20 w-20 shrink-0 place-items-center rounded-2xl border-4 border-surface bg-elevated text-4xl shadow-card">{p.emoji}</div>
            <div className="flex-1">
              <h1 className="flex items-center gap-1.5 font-display text-2xl font-bold text-ink">{p.name}{p.verified && <BadgeCheck size={20} className="text-brand" />}</h1>
              <p className="text-sm text-muted">{p.tagline}</p>
              <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted">
                <Stars rating={p.rating} count={p.ratingCount} showValue />
                <span className="inline-flex items-center gap-1"><CheckCircle2 size={13} className="text-success" /> {formatCompact(p.jobsDone)} jobs done</span>
                <span className="inline-flex items-center gap-1"><Zap size={13} className="text-accent" /> {p.responseLabel}</span>
                <span>{city?.name}</span>
              </div>
            </div>
            <a href={waContactProvider(p)} target="_blank" rel="noreferrer" className="btn-wa btn-md shrink-0"><MessageCircle size={17} /> Contact</a>
          </div>
        </div>
      </div>

      <div className="container-app">
        <div className="mb-3 flex items-center gap-2 rounded-xl border border-line bg-elevated px-4 py-2.5 text-sm text-muted">
          <ShieldCheck size={16} className="text-success" /> Verified provider · transparent pricing · pay after service
        </div>
        <h2 className="mb-3 font-display text-xl font-bold text-ink">Services offered</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {offerings.map((o) => <OfferingCard key={o.slug} offering={o} />)}
        </div>
      </div>
    </div>
  )
}
