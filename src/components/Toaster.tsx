'use client'

import Link from 'next/link'
import { Check, Info, X } from 'lucide-react'
import { useUI } from '@/store/ui'

export function Toaster() {
  const toasts = useUI((s) => s.toasts)
  const dismiss = useUI((s) => s.dismissToast)

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-20 z-[90] flex flex-col items-center gap-2 px-4 lg:bottom-6">
      {toasts.map((t) => (
        <div
          key={t.id}
          className="pointer-events-auto flex w-full max-w-sm items-center gap-3 rounded-xl border border-line bg-surface px-4 py-3 shadow-pop animate-slide-up"
        >
          <span className={t.kind === 'success' ? 'grid h-7 w-7 place-items-center rounded-full bg-success/15 text-success' : 'grid h-7 w-7 place-items-center rounded-full bg-brand-soft text-brand'}>
            {t.kind === 'success' ? <Check size={16} /> : <Info size={16} />}
          </span>
          <span className="flex-1 text-sm font-medium text-ink">{t.message}</span>
          {t.href && (
            <Link href={t.href} onClick={() => dismiss(t.id)} className="text-sm font-semibold text-brand hover:underline">
              {t.hrefLabel ?? 'View'}
            </Link>
          )}
          <button onClick={() => dismiss(t.id)} className="grid h-6 w-6 place-items-center rounded-md text-faint hover:bg-elevated hover:text-ink">
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  )
}
