import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { allServiceCategories, getServiceCategory, offeringsByCategory, providersByCategory } from '@/lib/services'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { Section } from '@/components/Section'
import { DynIcon } from '@/components/ui/Icon'
import { OfferingCard } from '@/components/OfferingCard'
import { ProviderCard } from '@/components/ProviderCard'

// 'provider' is a sibling static route — exclude from dynamic params.
export function generateStaticParams() {
  return allServiceCategories.map((c) => ({ category: c.slug }))
}
export function generateMetadata({ params }: { params: { category: string } }): Metadata {
  const c = getServiceCategory(params.category)
  return { title: c ? c.name : 'Service', description: c?.blurb }
}

export default function ServiceCategoryPage({ params }: { params: { category: string } }) {
  const c = getServiceCategory(params.category)
  if (!c) notFound()
  const offerings = offeringsByCategory(c.slug)
  const providers = providersByCategory(c.slug)

  return (
    <div className="flex flex-col gap-8">
      <div className="container-app">
        <Breadcrumbs items={[{ label: 'Services', href: '/services' }, { label: c.name }]} />
        <div className="flex items-center gap-4">
          <span className="grid h-14 w-14 place-items-center rounded-2xl text-white shadow-card" style={{ backgroundImage: `linear-gradient(135deg, ${c.from}, ${c.to})` }}><DynIcon name={c.icon} size={26} /></span>
          <div>
            <h1 className="font-display text-2xl font-bold text-ink">{c.name}</h1>
            <p className="text-sm text-muted">{c.blurb} · {providers.length} providers</p>
          </div>
        </div>
      </div>

      <Section title="Book a service">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {offerings.map((o) => <OfferingCard key={o.slug} offering={o} />)}
        </div>
      </Section>

      <Section title="Providers near you">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {providers.map((p) => <ProviderCard key={p.slug} provider={p} />)}
        </div>
      </Section>
    </div>
  )
}
