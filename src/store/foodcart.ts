'use client'

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { getDish } from '@/lib/food'

export interface FoodLine {
  slug: string
  qty: number
}

interface FoodCartState {
  /** active restaurant — food carts are single-restaurant by rule */
  restaurant: string | null
  items: FoodLine[]
  /** when adding from a different restaurant, callers confirm then call replaceWith */
  add: (dishSlug: string, restaurantSlug: string) => { conflict: boolean }
  replaceWith: (dishSlug: string, restaurantSlug: string) => void
  setQty: (slug: string, qty: number) => void
  remove: (slug: string) => void
  clear: () => void
}

export const useFoodCart = create<FoodCartState>()(
  persist(
    (set, get) => ({
      restaurant: null,
      items: [],
      add: (dishSlug, restaurantSlug) => {
        const s = get()
        if (s.restaurant && s.restaurant !== restaurantSlug && s.items.length > 0) {
          return { conflict: true }
        }
        set((st) => {
          const existing = st.items.find((i) => i.slug === dishSlug)
          const items = existing
            ? st.items.map((i) => (i.slug === dishSlug ? { ...i, qty: i.qty + 1 } : i))
            : [...st.items, { slug: dishSlug, qty: 1 }]
          return { restaurant: restaurantSlug, items }
        })
        return { conflict: false }
      },
      replaceWith: (dishSlug, restaurantSlug) =>
        set({ restaurant: restaurantSlug, items: [{ slug: dishSlug, qty: 1 }] }),
      setQty: (slug, qty) =>
        set((st) => {
          const items = qty <= 0 ? st.items.filter((i) => i.slug !== slug) : st.items.map((i) => (i.slug === slug ? { ...i, qty } : i))
          return { items, restaurant: items.length ? st.restaurant : null }
        }),
      remove: (slug) =>
        set((st) => {
          const items = st.items.filter((i) => i.slug !== slug)
          return { items, restaurant: items.length ? st.restaurant : null }
        }),
      clear: () => set({ items: [], restaurant: null }),
    }),
    { name: 'pdm-foodcart', storage: createJSONStorage(() => localStorage) },
  ),
)

export const foodCount = (s: FoodCartState) => s.items.reduce((n, i) => n + i.qty, 0)
export const foodSubtotal = (s: FoodCartState) =>
  s.items.reduce((n, i) => n + (getDish(i.slug)?.price ?? 0) * i.qty, 0)
