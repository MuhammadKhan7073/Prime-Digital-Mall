'use client'

import Link from 'next/link'
import { CalendarCheck, Trash2, Stethoscope, Wrench, Clock } from 'lucide-react'
import { formatPrice } from '@/lib/format'
import { useHydrated } from '@/lib/useHydrated'
import { useBookings } from '@/store/bookings'
import { Breadcrumbs } from '@/components/Breadcrumbs'

export default function BookingsPage() {
  const hydrated = useHydrated()
  const bookings = useBookings((s) => s.bookings)
  const remove = useBookings((s) => s.remove)

  return (
    <div className="container-app">
      <Breadcrumbs items={[{ label: 'My bookings' }]} />
      <div className="mb-5 flex items-center gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-2xl bg-brand text-brand-fg"><CalendarCheck size={20} /></span>
        <div>
          <h1 className="font-display text-2xl font-bold text-ink">My bookings</h1>
          <p className="text-sm text-muted">{hydrated ? `${bookings.length} appointment${bookings.length === 1 ? '' : 's'} & requests` : 'Loading…'}</p>
        </div>
      </div>

      {!hydrated ? null : bookings.length === 0 ? (
        <div className="card flex flex-col items-center gap-3 p-12 text-center">
          <span className="text-5xl">🗓️</span>
          <p className="font-semibold text-ink">No bookings yet</p>
          <p className="text-sm text-muted">Book a doctor or a home service and it’ll show up here.</p>
          <div className="mt-2 flex gap-2">
            <Link href="/health" className="btn-primary btn-md">Find a doctor</Link>
            <Link href="/services" className="btn-ghost btn-md">Book a service</Link>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {bookings.map((b) => (
            <div key={b.id} className="card flex items-center gap-3 p-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-elevated text-2xl">{b.emoji}</span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className={`inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[10px] font-bold uppercase ${b.type === 'doctor' ? 'bg-brand-soft text-brand' : 'bg-accent-soft text-accent'}`}>
                    {b.type === 'doctor' ? <Stethoscope size={11} /> : <Wrench size={11} />} {b.type}
                  </span>
                  <span className="rounded-md bg-warn/15 px-1.5 py-0.5 text-[10px] font-bold uppercase text-warn">Requested</span>
                </div>
                <p className="mt-1 truncate font-semibold text-ink">{b.title}</p>
                <p className="truncate text-xs text-muted">{b.subtitle}</p>
                <p className="mt-0.5 inline-flex items-center gap-1 text-xs text-faint"><Clock size={12} /> {b.when}{b.mode ? ` · ${b.mode}` : ''} · ref {b.id}</p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className="font-bold text-ink tabular">{formatPrice(b.price)}</span>
                <button onClick={() => remove(b.id)} className="grid h-8 w-8 place-items-center rounded-lg text-faint hover:bg-elevated hover:text-deal"><Trash2 size={16} /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
