'use client'

import { useEffect, useState } from 'react'
import { Download, X } from 'lucide-react'

interface BIPEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

/**
 * "Add to home screen" prompt. Appears once the browser fires
 * beforeinstallprompt; dismissible and remembered for the session.
 */
export function InstallPrompt() {
  const [evt, setEvt] = useState<BIPEvent | null>(null)
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem('pdm-install-dismissed')) return
    const onPrompt = (e: Event) => {
      e.preventDefault()
      setEvt(e as BIPEvent)
      setShow(true)
    }
    window.addEventListener('beforeinstallprompt', onPrompt)
    return () => window.removeEventListener('beforeinstallprompt', onPrompt)
  }, [])

  if (!show || !evt) return null

  const install = async () => {
    await evt.prompt()
    await evt.userChoice.catch(() => {})
    setShow(false)
  }
  const dismiss = () => {
    sessionStorage.setItem('pdm-install-dismissed', '1')
    setShow(false)
  }

  return (
    <div className="fixed inset-x-0 bottom-20 z-[60] flex justify-center px-3 lg:bottom-6">
      <div className="container-app flex max-w-md items-center gap-3 rounded-2xl border border-line bg-surface/95 px-4 py-3 shadow-pop backdrop-blur">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand text-brand-fg">🛍️</span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-bold text-ink">Install Prime Digital Mall</p>
          <p className="truncate text-xs text-muted">Add to your home screen for faster, app-like shopping.</p>
        </div>
        <button onClick={install} className="btn-primary btn-sm shrink-0"><Download size={14} /> Install</button>
        <button onClick={dismiss} className="grid h-8 w-8 shrink-0 place-items-center rounded-lg text-faint hover:bg-elevated hover:text-ink" aria-label="Dismiss"><X size={16} /></button>
      </div>
    </div>
  )
}
