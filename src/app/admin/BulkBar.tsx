'use client'

import { Eye, EyeOff, Snowflake, Star, Trash2, RotateCcw, X } from 'lucide-react'
import { useAdminOverrides } from '@/store/adminOverrides'

/** Floating action bar shown when one or more entities are selected. */
export function BulkBar({ selected, onClear }: { selected: string[]; onClear: () => void }) {
  const bulkApply = useAdminOverrides((s) => s.bulkApply)
  if (selected.length === 0) return null

  const act = (a: Parameters<typeof bulkApply>[1]) => {
    bulkApply(selected, a)
    onClear()
  }

  const Btn = ({ on, icon, label, color }: { on: () => void; icon: React.ReactNode; label: string; color: string }) => (
    <button onClick={on} className={`inline-flex h-9 items-center gap-1.5 rounded-lg px-3 text-xs font-semibold ${color}`}>
      {icon} {label}
    </button>
  )

  return (
    <div className="fixed inset-x-0 bottom-16 z-50 flex justify-center px-3 lg:bottom-6">
      <div className="container-app flex max-w-3xl flex-wrap items-center gap-2 rounded-2xl border border-line bg-surface/95 px-3 py-2.5 shadow-pop backdrop-blur">
        <span className="rounded-lg bg-brand px-2.5 py-1 text-xs font-bold text-brand-fg">{selected.length} selected</span>
        <Btn on={() => act('hidden')} icon={<EyeOff size={14} />} label="Hide" color="border border-line text-faint hover:bg-elevated" />
        <Btn on={() => act('frozen')} icon={<Snowflake size={14} />} label="Freeze" color="border border-line text-sky-500 hover:bg-elevated" />
        <Btn on={() => act('featured')} icon={<Star size={14} />} label="Feature" color="border border-line text-amber-600 hover:bg-elevated" />
        <Btn on={() => act('removed')} icon={<Trash2 size={14} />} label="Remove" color="border border-line text-deal hover:bg-deal/10" />
        <Btn on={() => act('restore')} icon={<RotateCcw size={14} />} label="Restore" color="border border-line text-success hover:bg-success/10" />
        <button onClick={onClear} className="ml-auto grid h-9 w-9 place-items-center rounded-lg text-faint hover:bg-elevated hover:text-ink" title="Clear selection"><X size={16} /></button>
      </div>
    </div>
  )
}
