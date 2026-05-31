'use client'

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { getProduct } from '@/lib/catalog'

export interface CartLine {
  id: string
  slug: string
  qty: number
  /** Selected variant values keyed by group name, e.g. { Color: 'Black', Size: 'M' }. */
  variant: Record<string, string>
  addedAt: number
}

function lineId(slug: string, variant: Record<string, string>): string {
  const v = Object.keys(variant).sort().map((k) => `${k}=${variant[k]}`).join('&')
  return v ? `${slug}::${v}` : slug
}

/** Unit price in rupees including per-variant deltas. */
export function lineUnitPrice(line: CartLine): number {
  const p = getProduct(line.slug)
  if (!p) return 0
  let price = p.price
  for (const g of p.variantGroups ?? []) {
    const opt = g.options.find((o) => o.value === line.variant[g.name])
    if (opt?.deltaRupees) price += opt.deltaRupees
  }
  return price
}

interface CartState {
  items: CartLine[]
  saved: CartLine[]
  add: (slug: string, qty?: number, variant?: Record<string, string>) => void
  remove: (id: string) => void
  setQty: (id: string, qty: number) => void
  clear: () => void
  saveForLater: (id: string) => void
  moveToCart: (id: string) => void
  removeSaved: (id: string) => void
}

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      saved: [],
      add: (slug, qty = 1, variant = {}) =>
        set((s) => {
          const id = lineId(slug, variant)
          const existing = s.items.find((i) => i.id === id)
          if (existing) return { items: s.items.map((i) => (i.id === id ? { ...i, qty: i.qty + qty } : i)) }
          return { items: [{ id, slug, qty, variant, addedAt: Date.now() }, ...s.items] }
        }),
      remove: (id) => set((s) => ({ items: s.items.filter((i) => i.id !== id) })),
      setQty: (id, qty) =>
        set((s) => ({ items: qty <= 0 ? s.items.filter((i) => i.id !== id) : s.items.map((i) => (i.id === id ? { ...i, qty } : i)) })),
      clear: () => set({ items: [] }),
      saveForLater: (id) =>
        set((s) => {
          const line = s.items.find((i) => i.id === id)
          if (!line) return s
          return { items: s.items.filter((i) => i.id !== id), saved: [line, ...s.saved.filter((i) => i.id !== id)] }
        }),
      moveToCart: (id) =>
        set((s) => {
          const line = s.saved.find((i) => i.id === id)
          if (!line) return s
          const existing = s.items.find((i) => i.id === id)
          const items = existing ? s.items.map((i) => (i.id === id ? { ...i, qty: i.qty + line.qty } : i)) : [line, ...s.items]
          return { saved: s.saved.filter((i) => i.id !== id), items }
        }),
      removeSaved: (id) => set((s) => ({ saved: s.saved.filter((i) => i.id !== id) })),
    }),
    { name: 'pdm-cart', storage: createJSONStorage(() => localStorage) },
  ),
)

export const cartCount = (s: CartState) => s.items.reduce((n, i) => n + i.qty, 0)
export const cartSubtotal = (s: CartState) => s.items.reduce((n, i) => n + lineUnitPrice(i) * i.qty, 0)
