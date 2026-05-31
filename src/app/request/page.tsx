'use client'

import { useState } from 'react'
import Link from 'next/link'
import { MessageCircle, MapPin, Lightbulb, Store, HelpCircle, Check } from 'lucide-react'
import { cn } from '@/lib/cn'
import { allCities } from '@/lib/catalog'
import { waTeam } from '@/lib/whatsapp'
import { Breadcrumbs } from '@/components/Breadcrumbs'

type Kind = 'city' | 'feature' | 'shop' | 'help'

const KINDS: { key: Kind; label: string; icon: typeof MapPin; hint: string }[] = [
  { key: 'city', label: 'Add my city', icon: MapPin, hint: 'Tell us where you want delivery next.' },
  { key: 'feature', label: 'Suggest a feature', icon: Lightbulb, hint: 'An idea that would make shopping easier?' },
  { key: 'shop', label: 'List my shop', icon: Store, hint: 'Sell on Prime Digital Mall.' },
  { key: 'help', label: 'Get help', icon: HelpCircle, hint: 'Question about an order or the site.' },
]

export default function RequestPage() {
  const [kind, setKind] = useState<Kind>('city')
  const [name, setName] = useState('')
  const [city, setCity] = useState('')
  const [message, setMessage] = useState('')

  const active = KINDS.find((k) => k.key === kind)!
  const valid = message.trim().length > 2

  const compose = () => {
    const lines = [
      `Prime Digital Mall — ${active.label}`,
      name.trim() && `From: ${name.trim()}`,
      kind === 'city' && city.trim() && `City: ${city.trim()}`,
      '',
      message.trim(),
    ].filter(Boolean)
    return waTeam(lines.join('\n'))
  }

  return (
    <div className="container-app max-w-3xl">
      <Breadcrumbs items={[{ label: 'Requests' }]} />

      <div className="mb-6">
        <span className="rule-accent mb-3 block" />
        <h1 className="text-3xl font-extrabold tracking-tight text-ink">Tell us what you need</h1>
        <p className="mt-1 text-muted">Missing a city, an idea, or need a hand? Send it straight to our team on WhatsApp.</p>
      </div>

      {/* kind selector */}
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {KINDS.map((k) => {
          const Icon = k.icon
          const on = kind === k.key
          return (
            <button
              key={k.key}
              onClick={() => setKind(k.key)}
              className={cn(
                'flex flex-col items-center gap-2 rounded-2xl border p-4 text-center transition-all',
                on ? 'border-brand bg-brand-soft shadow-card' : 'border-line bg-surface hover:border-faint',
              )}
            >
              <span className={cn('grid h-10 w-10 place-items-center rounded-xl', on ? 'bg-brand text-brand-fg' : 'bg-elevated text-muted')}>
                <Icon size={20} />
              </span>
              <span className={cn('text-sm font-semibold', on ? 'text-brand' : 'text-ink')}>{k.label}</span>
            </button>
          )
        })}
      </div>

      <div className="card mt-4 flex flex-col gap-4 p-5">
        <p className="text-sm text-muted">{active.hint}</p>

        <div className="grid gap-3 sm:grid-cols-2">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name (optional)" className="input" />
          {kind === 'city' && (
            <input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="City you want added"
              list="city-list"
              className="input"
            />
          )}
        </div>
        <datalist id="city-list">
          {allCities.map((c) => (
            <option key={c.slug} value={c.name} />
          ))}
        </datalist>

        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
          placeholder={
            kind === 'feature'
              ? 'Describe the feature and why it would help…'
              : kind === 'shop'
                ? 'Your shop name, what you sell, and your city…'
                : kind === 'help'
                  ? 'What do you need help with?'
                  : 'Anything else we should know (area, what you shop for)…'
          }
          className="input h-auto resize-none py-3"
        />

        <a
          href={valid ? compose() : undefined}
          target="_blank"
          rel="noreferrer"
          aria-disabled={!valid}
          className={cn('btn-wa btn-lg w-full', !valid && 'pointer-events-none opacity-50')}
        >
          <MessageCircle size={18} /> Send on WhatsApp
        </a>
        <p className="flex items-center justify-center gap-1.5 text-center text-xs text-faint">
          <Check size={13} className="text-success" /> Opens WhatsApp with your message ready — just hit send.
        </p>
      </div>

      <p className="mt-4 text-center text-sm text-muted">
        Just want to browse?{' '}
        <Link href="/" className="font-semibold text-brand hover:underline">
          Back to shopping
        </Link>
      </p>
    </div>
  )
}
