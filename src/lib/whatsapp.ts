import { PAYMENT } from '@/data/catalog'
import type { Product, Shop } from '@/data/types'
import { formatPrice } from './format'

/** Convert local PK number (03xx...) to international wa.me format (92xx...). */
export function waNumber(local: string): string {
  const digits = local.replace(/\D/g, '')
  if (digits.startsWith('0')) return '92' + digits.slice(1)
  if (digits.startsWith('92')) return digits
  return digits
}

export function waLink(local: string, message: string): string {
  return `https://wa.me/${waNumber(local)}?text=${encodeURIComponent(message)}`
}

/** Order a single product directly from a shop. */
export function waOrder(product: Product, shop: Shop, opts?: { qty?: number; variant?: Record<string, string> }): string {
  const qty = opts?.qty ?? 1
  const v = opts?.variant && Object.keys(opts.variant).length ? ` (${Object.values(opts.variant).join(', ')})` : ''
  const msg = `Assalam o Alaikum ${shop.name}!\n\nI want to order from Prime Digital Mall:\n• ${product.name}${v} × ${qty}\n• Price: ${formatPrice(product.price)}\n\nPlease confirm availability and delivery. JazakAllah!`
  return waLink(shop.phone, msg)
}

/** Just talk to the shop. */
export function waContactShop(shop: Shop): string {
  return waLink(shop.phone, `Assalam o Alaikum ${shop.name}! I have a question about your products on Prime Digital Mall.`)
}

/** Reach the Prime Digital Mall support team. */
export function waTeam(message = 'Assalam o Alaikum! I need help with Prime Digital Mall.'): string {
  return waLink(PAYMENT.whatsapp, message)
}

/** Send a full cart as an order message to support. */
export function waCartOrder(lines: { name: string; qty: number; price: number; variant?: string }[], total: number): string {
  const items = lines.map((l) => `• ${l.name}${l.variant ? ` (${l.variant})` : ''} × ${l.qty} — ${formatPrice(l.price * l.qty)}`).join('\n')
  const msg = `Assalam o Alaikum! New order from Prime Digital Mall:\n\n${items}\n\nTotal: ${formatPrice(total)}\n\nMy details:\nName: \nPhone: \nAddress: \nCity: `
  return waLink(PAYMENT.whatsapp, msg)
}
