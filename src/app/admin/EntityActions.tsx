'use client'

import { Eye, EyeOff, Snowflake, Star, Trash2, RotateCcw } from 'lucide-react'
import { cn } from '@/lib/cn'
import { useAdminOverrides, type EntityState } from '@/store/adminOverrides'

const FLAG_STYLE: Record<EntityState, string> = {
  hidden: 'bg-faint/15 text-faint',
  frozen: 'bg-sky-500/15 text-sky-500',
  featured: 'bg-amber-500/15 text-amber-600',
  removed: 'bg-deal/15 text-deal',
}

/** Render the current moderation badges for an entity. */
export function EntityBadges({ entityKey }: { entityKey: string }) {
  const flags = useAdminOverrides((s) => s.flags[entityKey] ?? [])
  if (!flags.length) return <span className="rounded-md bg-success/15 px-1.5 py-0.5 text-[10px] font-bold uppercase text-success">Live</span>
  return (
    <span className="flex flex-wrap gap-1">
      {flags.map((f) => (
        <span key={f} className={cn('rounded-md px-1.5 py-0.5 text-[10px] font-bold uppercase', FLAG_STYLE[f])}>{f}</span>
      ))}
    </span>
  )
}

/** Action buttons for hide / freeze / feature / remove / restore. */
export function EntityActions({ entityKey, label }: { entityKey: string; label: string }) {
  const flags = useAdminOverrides((s) => s.flags[entityKey] ?? [])
  const toggle = useAdminOverrides((s) => s.toggle)
  const clear = useAdminOverrides((s) => s.clearFlags)
  const has = (f: EntityState) => flags.includes(f)
  const dirty = flags.length > 0
  const removed = has('removed')

  const Btn = ({ active, on, color, icon, title }: { active: boolean; on: () => void; color: string; icon: React.ReactNode; title: string }) => (
    <button
      onClick={on}
      title={title}
      className={cn('grid h-8 w-8 place-items-center rounded-lg border text-muted transition-colors hover:bg-elevated', active ? color : 'border-line')}
    >
      {icon}
    </button>
  )

  return (
    <div className="flex items-center gap-1">
      {!removed && (
        <>
          <Btn active={has('hidden')} on={() => toggle(entityKey, 'hidden', label)} color="border-faint text-faint" icon={has('hidden') ? <EyeOff size={15} /> : <Eye size={15} />} title={has('hidden') ? 'Unhide' : 'Hide from storefront'} />
          <Btn active={has('frozen')} on={() => toggle(entityKey, 'frozen', label)} color="border-sky-500 text-sky-500" icon={<Snowflake size={15} />} title={has('frozen') ? 'Unfreeze' : 'Freeze (visible, not orderable)'} />
          <Btn active={has('featured')} on={() => toggle(entityKey, 'featured', label)} color="border-amber-500 text-amber-600" icon={<Star size={15} className={has('featured') ? 'fill-amber-500' : ''} />} title={has('featured') ? 'Unfeature' : 'Feature (boost)'} />
        </>
      )}
      <Btn active={removed} on={() => toggle(entityKey, 'removed', label)} color="border-deal text-deal" icon={<Trash2 size={15} />} title={removed ? 'Undo remove' : 'Remove'} />
      {dirty && (
        <button onClick={() => clear(entityKey, label)} title="Restore to live" className="grid h-8 w-8 place-items-center rounded-lg border border-line text-success transition-colors hover:bg-success/10">
          <RotateCcw size={15} />
        </button>
      )}
    </div>
  )
}
