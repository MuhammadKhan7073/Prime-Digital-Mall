'use client'

import { Check } from 'lucide-react'
import type { VariantGroup } from '@/data/types'
import { cn } from '@/lib/cn'

export function VariantPicker({
  groups,
  value,
  onChange,
}: {
  groups: VariantGroup[]
  value: Record<string, string>
  onChange: (name: string, val: string) => void
}) {
  return (
    <div className="flex flex-col gap-3">
      {groups.map((g) => (
        <div key={g.name}>
          <p className="mb-1.5 text-xs font-semibold text-muted">
            {g.name}: <span className="text-ink">{value[g.name]}</span>
          </p>
          <div className="flex flex-wrap gap-2">
            {g.options.map((o) => {
              const active = value[g.name] === o.value
              if (g.type === 'swatch') {
                return (
                  <button
                    key={o.value}
                    type="button"
                    disabled={o.soldOut}
                    title={o.value + (o.soldOut ? ' (sold out)' : '')}
                    onClick={() => onChange(g.name, o.value)}
                    className={cn(
                      'relative grid h-9 w-9 place-items-center rounded-full border-2 transition-all',
                      active ? 'border-brand' : 'border-line hover:border-faint',
                      o.soldOut && 'cursor-not-allowed opacity-40',
                    )}
                  >
                    <span className="h-6 w-6 rounded-full" style={{ backgroundColor: o.swatch }} />
                    {active && <Check size={14} className="absolute text-white mix-blend-difference" />}
                  </button>
                )
              }
              return (
                <button
                  key={o.value}
                  type="button"
                  disabled={o.soldOut}
                  onClick={() => onChange(g.name, o.value)}
                  className={cn(
                    'min-w-[2.75rem] rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors',
                    active ? 'border-brand bg-brand-soft text-brand' : 'border-line text-ink hover:border-faint',
                    o.soldOut && 'cursor-not-allowed text-faint line-through opacity-60',
                  )}
                >
                  {o.value}
                  {o.deltaRupees ? <span className="ml-1 text-xs text-faint">+{o.deltaRupees}</span> : null}
                </button>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
