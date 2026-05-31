'use client'

import { MapPin, X, Search, Globe, Check } from 'lucide-react'
import { useMemo, useState } from 'react'
import { cn } from '@/lib/cn'
import { allCities } from '@/lib/catalog'
import { waTeam } from '@/lib/whatsapp'
import { useUI } from '@/store/ui'

export function CityPicker() {
  const open = useUI((s) => s.cityPickerOpen)
  const close = useUI((s) => s.closeCityPicker)
  const city = useUI((s) => s.city)
  const setCity = useUI((s) => s.setCity)
  const [q, setQ] = useState('')

  const list = useMemo(() => {
    const t = q.trim().toLowerCase()
    const filtered = t ? allCities.filter((c) => c.name.toLowerCase().includes(t)) : allCities
    return [...filtered].sort((a, b) => Number(b.popular) - Number(a.popular) || a.name.localeCompare(b.name))
  }, [q])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[70] flex items-start justify-center p-4 pt-[8vh]">
      <button aria-label="Close" className="absolute inset-0 bg-ink/40 backdrop-blur-sm animate-fade-in" onClick={close} />
      <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-line bg-surface shadow-pop animate-scale-in">
        <div className="flex items-center justify-between border-b border-line px-4 py-3">
          <h2 className="flex items-center gap-2 font-bold text-ink">
            <MapPin size={18} className="text-brand" /> Choose your city
          </h2>
          <button onClick={close} className="grid h-8 w-8 place-items-center rounded-lg text-faint hover:bg-elevated hover:text-ink">
            <X size={16} />
          </button>
        </div>

        <div className="border-b border-line p-3">
          <div className="flex items-center gap-2 rounded-xl border border-line bg-bg px-3">
            <Search size={16} className="text-faint" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Find your city…"
              className="h-10 w-full bg-transparent text-sm text-ink outline-none placeholder:text-faint"
            />
          </div>
        </div>

        <div className="max-h-[45vh] overflow-y-auto p-2">
          <button
            onClick={() => setCity(null)}
            className={cn('flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm hover:bg-elevated', city === null && 'bg-brand-soft')}
          >
            <Globe size={18} className="text-brand" />
            <span className="flex-1 font-semibold text-ink">All of Pakistan</span>
            {city === null && <Check size={16} className="text-brand" />}
          </button>
          {list.map((c) => (
            <button
              key={c.slug}
              onClick={() => setCity(c.slug)}
              className={cn('flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm hover:bg-elevated', city === c.slug && 'bg-brand-soft')}
            >
              <MapPin size={16} className="text-faint" />
              <span className="flex-1">
                <span className="font-medium text-ink">{c.name}</span>
                <span className="ml-2 text-xs text-faint">{c.province}</span>
              </span>
              {c.popular && city !== c.slug && <span className="text-[10px] font-semibold uppercase text-brand">Popular</span>}
              {city === c.slug && <Check size={16} className="text-brand" />}
            </button>
          ))}
          {!list.length && (
            <div className="px-3 py-6 text-center text-sm text-muted">
              City not listed?{' '}
              <a href={waTeam(`Please add my city: ${q}`)} target="_blank" rel="noreferrer" className="font-semibold text-brand hover:underline">
                Request it
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
