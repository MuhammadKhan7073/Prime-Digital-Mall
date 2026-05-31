import { PAYMENT } from '@/data/catalog'
import type { Dish, Restaurant } from '@/data/food'
import type { Doctor, Clinic } from '@/data/health'
import type { Offering, Provider } from '@/data/services'
import { waLink } from './whatsapp'
import { formatPrice } from './format'

/* ---------------- Food ---------------- */

export function waFoodOrder(restaurant: Restaurant, lines: { name: string; qty: number; price: number }[], total: number): string {
  const items = lines.map((l) => `• ${l.name} × ${l.qty} — ${formatPrice(l.price * l.qty)}`).join('\n')
  const msg = `Assalam o Alaikum ${restaurant.name}!\n\nOrder via Prime Digital Mall:\n${items}\n\nTotal: ${formatPrice(total)}\n\nMy details:\nName: \nPhone: \nAddress: `
  return waLink(restaurant.phone, msg)
}

export function waContactRestaurant(r: Restaurant): string {
  return waLink(r.phone, `Assalam o Alaikum ${r.name}! I have a question about your menu on Prime Digital Mall.`)
}

/* ---------------- Health ---------------- */

export function waDoctorBooking(doctor: Doctor, clinic: Clinic | undefined, opts: { when: string; mode: string; name: string; phone: string }): string {
  const msg = `Assalam o Alaikum!\n\nAppointment request via Prime Digital Mall:\n• Doctor: ${doctor.name}\n• Clinic: ${clinic?.name ?? ''}\n• Fee: ${formatPrice(doctor.price)}\n• Mode: ${opts.mode}\n• Preferred: ${opts.when}\n\nPatient: ${opts.name}\nPhone: ${opts.phone}\n\nPlease confirm. JazakAllah!`
  return waLink(clinic?.phone ?? PAYMENT.whatsapp, msg)
}

/* ---------------- Services ---------------- */

export function waServiceBooking(offering: Offering, provider: Provider | undefined, opts: { when: string; name: string; phone: string; address: string }): string {
  const msg = `Assalam o Alaikum ${provider?.name ?? ''}!\n\nService request via Prime Digital Mall:\n• Service: ${offering.name}\n• Starting: ${formatPrice(offering.price)}\n• Preferred: ${opts.when}\n\nName: ${opts.name}\nPhone: ${opts.phone}\nAddress: ${opts.address}\n\nPlease confirm availability & final price.`
  return waLink(provider?.phone ?? PAYMENT.whatsapp, msg)
}

export function waContactProvider(p: Provider): string {
  return waLink(p.phone, `Assalam o Alaikum ${p.name}! I want to ask about your services on Prime Digital Mall.`)
}
