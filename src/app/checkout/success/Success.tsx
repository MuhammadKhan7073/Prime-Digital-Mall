'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { CheckCircle2, Package, MessageCircle, Home } from 'lucide-react'
import { waTeam } from '@/lib/whatsapp'

export function Success() {
  const params = useSearchParams()
  const ref = params.get('ref') ?? 'PDM-000000'

  return (
    <div className="container-app flex min-h-[60vh] items-center justify-center">
      <div className="card flex w-full max-w-md flex-col items-center gap-3 p-8 text-center animate-scale-in">
        <span className="grid h-16 w-16 place-items-center rounded-full bg-success/15 text-success">
          <CheckCircle2 size={36} />
        </span>
        <h1 className="text-2xl font-extrabold text-ink">Order confirmed!</h1>
        <p className="text-sm text-muted">Thank you for shopping with Prime Digital Mall. We’ll confirm your order shortly.</p>

        <div className="my-2 w-full rounded-xl border border-line bg-elevated p-4">
          <p className="text-xs text-muted">Order reference</p>
          <p className="text-lg font-extrabold tracking-wider text-ink">{ref}</p>
        </div>

        <div className="flex w-full flex-col gap-2">
          <a href={waTeam(`Hi, I just placed order ${ref}. Please confirm.`)} target="_blank" rel="noreferrer" className="btn-wa btn-lg w-full">
            <MessageCircle size={18} /> Confirm on WhatsApp
          </a>
          <Link href="/" className="btn-ghost btn-md w-full"><Home size={17} /> Continue shopping</Link>
        </div>

        <p className="mt-2 flex items-center gap-1.5 text-xs text-faint">
          <Package size={13} /> Cash on delivery · 7-day easy returns
        </p>
      </div>
    </div>
  )
}
