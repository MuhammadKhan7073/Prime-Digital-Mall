import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { verticals } from '@/data/verticals'
import { DynIcon } from '@/components/ui/Icon'

/** Big four-vertical chooser for the home hub. */
export function VerticalHub() {
  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {verticals.map((v) => (
        <Link
          key={v.slug}
          href={v.href}
          className="group relative flex flex-col justify-between overflow-hidden rounded-3xl p-5 text-white shadow-card transition-transform hover:-translate-y-0.5 sm:p-6"
          style={{ backgroundImage: `linear-gradient(140deg, ${v.from}, ${v.to})` }}
        >
          <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/15 blur-xl transition-transform group-hover:scale-125" />
          <span className="relative grid h-11 w-11 place-items-center rounded-2xl bg-white/20 backdrop-blur">
            <DynIcon name={v.icon} size={24} />
          </span>
          <div className="relative mt-6">
            <h3 className="font-display text-xl font-bold">{v.name}</h3>
            <p className="mt-0.5 text-sm text-white/85">{v.blurb}</p>
            <span className="mt-3 inline-flex items-center gap-1 text-sm font-bold">
              {v.cta} <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </span>
          </div>
        </Link>
      ))}
    </div>
  )
}
