'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Calendar, Check, MessageCircle } from 'lucide-react'
import { cn } from '@/lib/cn'
import { formatPrice } from '@/lib/format'
import { waLink } from '@/lib/whatsapp'
import { PAYMENT } from '@/data/catalog'
import { allCities } from '@/lib/catalog'
import { useBookings, type BookingType } from '@/store/bookings'
import { useUI } from '@/store/ui'

export interface BookingFormProps {
  type: BookingType
  slug: string
  providerSlug: string
  title: string
  subtitle: string
  emoji: string
  price: number
  /** preset slot labels (doctors); when absent a date+time input is shown */
  slots?: string[]
  /** consultation/visit modes (doctors) */
  modes?: string[]
  /** require an address (services + home visits) */
  needsAddress?: boolean
  /** WhatsApp number to send the request to (provider/clinic; falls back to team) */
  waPhone?: string
}

export function BookingForm(props: BookingFormProps) {
  const router = useRouter()
  const addBooking = useBookings((s) => s.addBooking)
  const toast = useUI((s) => s.toast)

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [mode, setMode] = useState(props.modes?.[0] ?? '')
  const [slot, setSlot] = useState(props.slots?.[0] ?? '')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [notes, setNotes] = useState('')

  const when = props.slots?.length ? slot : [date, time].filter(Boolean).join(' ')
  const addrFull = props.needsAddress ? [address, city].filter(Boolean).join(', ') : ''
  const valid = name.trim() && phone.trim().length >= 10 && when && (!props.needsAddress || (address.trim() && city))

  /** Build the WhatsApp request message from captured fields (client-side, serializable props only). */
  const waHref = () => {
    const lines = [
      `Assalam o Alaikum!`,
      ``,
      `${props.type === 'doctor' ? 'Appointment' : 'Service'} request via Prime Digital Mall:`,
      `• ${props.type === 'doctor' ? 'Doctor' : 'Service'}: ${props.title}`,
      `• ${props.subtitle}`,
      `• ${props.type === 'doctor' ? 'Fee' : 'Starting'}: ${formatPrice(props.price)}`,
      mode && `• Mode: ${mode}`,
      `• Preferred: ${when}`,
      ``,
      `Name: ${name}`,
      `Phone: ${phone}`,
      addrFull && `Address: ${addrFull}`,
      notes && `Notes: ${notes}`,
      ``,
      `Please confirm. JazakAllah!`,
    ].filter(Boolean) as string[]
    return waLink(props.waPhone || PAYMENT.whatsapp, lines.join('\n'))
  }

  const submit = () => {
    if (!valid) return
    addBooking({
      type: props.type,
      slug: props.slug,
      providerSlug: props.providerSlug,
      title: props.title,
      subtitle: props.subtitle,
      emoji: props.emoji,
      when,
      mode: mode || undefined,
      name,
      phone,
      address: addrFull || undefined,
      notes: notes || undefined,
      price: props.price,
    })
    toast('Booking requested ✓', { href: '/bookings', hrefLabel: 'My bookings' })
    router.push('/bookings')
  }

  return (
    <div className="card flex flex-col gap-4 p-5">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-ink">Request booking</h2>
        <span className="text-sm font-extrabold text-ink tabular">{formatPrice(props.price)}</span>
      </div>

      {props.modes && props.modes.length > 0 && (
        <div>
          <p className="mb-1.5 text-xs font-semibold text-muted">Consultation type</p>
          <div className="flex flex-wrap gap-2">
            {props.modes.map((m) => (
              <button key={m} onClick={() => setMode(m)} className={cn('rounded-lg border px-3 py-1.5 text-sm font-medium capitalize transition-colors', mode === m ? 'border-brand bg-brand-soft text-brand' : 'border-line text-ink hover:border-faint')}>
                {m}
              </button>
            ))}
          </div>
        </div>
      )}

      {props.slots?.length ? (
        <div>
          <p className="mb-1.5 text-xs font-semibold text-muted">Pick a slot</p>
          <div className="flex flex-wrap gap-2">
            {props.slots.map((s) => (
              <button key={s} onClick={() => setSlot(s)} className={cn('rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors', slot === s ? 'border-brand bg-brand-soft text-brand' : 'border-line text-ink hover:border-faint')}>
                {s}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <p className="mb-1.5 text-xs font-semibold text-muted">Preferred date & time</p>
          <div className="flex gap-2">
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="input" />
            <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="input" />
          </div>
        </div>
      )}

      <div className="grid gap-3 sm:grid-cols-2">
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" className="input" />
        <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone (03xx xxxxxxx)" inputMode="tel" className="input" />
      </div>

      {props.needsAddress && (
        <div className="grid gap-3 sm:grid-cols-2">
          <input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address, area" className="input" />
          <select value={city} onChange={(e) => setCity(e.target.value)} className={cn('input', !city && 'text-faint')}>
            <option value="">Select city</option>
            {allCities.map((c) => <option key={c.slug} value={c.slug} className="text-ink">{c.name}</option>)}
          </select>
        </div>
      )}

      <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={2} placeholder="Notes (optional)" className="input h-auto resize-none py-2.5" />

      <button onClick={submit} disabled={!valid} className="btn-primary btn-lg w-full">
        <Check size={18} /> Confirm booking request
      </button>
      {!valid && <p className="-mt-2 text-center text-xs text-faint">Fill name, phone{props.needsAddress ? ', address' : ''} & {props.slots?.length ? 'slot' : 'date'} to continue</p>}

      <a
        href={valid ? waHref() : undefined}
        target="_blank"
        rel="noreferrer"
        aria-disabled={!valid}
        className={cn('btn-wa btn-md w-full', !valid && 'pointer-events-none opacity-50')}
      >
        <MessageCircle size={17} /> Book on WhatsApp instead
      </a>
      <p className="flex items-center justify-center gap-1.5 text-center text-xs text-faint">
        <Calendar size={12} /> No online payment — pay at {props.type === 'doctor' ? 'clinic' : 'service'} or as agreed.
      </p>
    </div>
  )
}
