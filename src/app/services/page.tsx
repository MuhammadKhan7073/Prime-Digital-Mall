import type { Metadata } from 'next'
import Link from 'next/link'
import { Wrench, ShieldCheck, Clock, BadgeCheck } from 'lucide-react'
import { categoriesWithCounts, popularOfferings, providersInCity } from '@/lib/services'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { Section } from '@/components/Section'
import { DynIcon } from '@/components/ui/Icon'
import { OfferingCard } from '@/components/OfferingCard'
import { ProviderCard } from '@/components/ProviderCard'

export const metadata: Metadata = { title: 'Services — Home & Professional', description: 'Book cleaning, repairs, beauty, tutoring, movers and more — verified providers across Pakistan.' }

export default function ServicesHome() {
  const cats = categoriesWithCounts()
  const popular = popularOfferings(8)
  const providers = providersInCity(null).slice(0, 8)

  return (
    <div className="flex flex-col gap-8">
      <div className="container-app">
        <Breadcrumbs items={[{ label: 'Services' }]} />
        <div className="overflow-hidden rounded-3xl p-6 text-white sm:p-8" style={{ backgroundImage: 'linear-gradient(135deg, #6d28d9, #a855f7)' }}>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs font-bold backdrop-blur"><Wrench size={13} /> HOME SERVICES</span>
          <h1 className="mt-3 font-display text-3xl font-bold sm:text-4xl">Anything for your home, booked</h1>
          <p className="mt-1 text-white/90">Cleaning, repairs, beauty, tutoring & more — vetted pros at your door.</p>
          <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold">
            <span className="inline-flex items-center gap-1 rounded-full bg-white/20 px-3 py-1.5 backdrop-blur"><BadgeCheck size={13} /> Verified pros</span>
            <span className="inline-flex items-center gap-1 rounded-full bg-white/20 px-3 py-1.5 backdrop-blur"><ShieldCheck size={13} /> Background-checked</span>
            <span className="inline-flex items-center gap-1 rounded-full bg-white/20 px-3 py-1.5 backdrop-blur"><Clock size={13} /> Same-day options</span>
          </div>
        </div>
      </div>

      {/* category grid */}
      <section className="container-app">
        <h2 className="mb-3 font-display text-xl font-bold text-ink">What do you need?</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {cats.map((c) => (
            <Link key={c.slug} href={`/services/${c.slug}`} className="group flex flex-col items-center gap-2 rounded-2xl border border-line bg-surface p-4 text-center transition-all hover:-translate-y-0.5 hover:shadow-card">
              <span className="grid h-12 w-12 place-items-center rounded-xl text-white" style={{ backgroundImage: `linear-gradient(135deg, ${c.from}, ${c.to})` }}><DynIcon name={c.icon} size={22} /></span>
              <span className="text-sm font-semibold text-ink">{c.name}</span>
              <span className="text-[11px] text-faint">{c.count} pros</span>
            </Link>
          ))}
        </div>
      </section>

      <Section title="Popular services" subtitle="Most booked this week" icon={<Wrench size={20} className="text-brand" />}>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {popular.map((o) => <OfferingCard key={o.slug} offering={o} />)}
        </div>
      </Section>

      <Section title="Trusted providers">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {providers.map((p) => <ProviderCard key={p.slug} provider={p} />)}
        </div>
      </Section>
    </div>
  )
}
