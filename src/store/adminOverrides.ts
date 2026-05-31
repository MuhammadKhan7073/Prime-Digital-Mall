'use client'

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

/** Moderation state an admin can apply to any business or listing. */
export type EntityState = 'hidden' | 'frozen' | 'featured' | 'removed'

export interface CustomEntity {
  key: string
  kind: 'business' | 'listing'
  vertical: 'shop' | 'food' | 'health' | 'services'
  name: string
  emoji: string
  from: string
  to: string
  city?: string
  price?: number
  sub?: string
  businessKey?: string
  createdAt: number
}

export interface PriceOverride {
  key: string
  price: number
}

export interface LogEntry {
  id: number
  ts: number
  action: string
  target: string
}

interface AdminState {
  /** entityKey -> set of flags. removed = soft-deleted; hidden = unlisted; frozen = visible but locked; featured = boosted. */
  flags: Record<string, EntityState[]>
  /** admin-added custom businesses/listings (on top of the seed catalog). */
  custom: CustomEntity[]
  /** price overrides by listing key. */
  prices: Record<string, number>
  log: LogEntry[]

  has: (key: string, state: EntityState) => boolean
  toggle: (key: string, state: EntityState, label: string) => void
  setFlag: (key: string, state: EntityState, on: boolean, label: string) => void
  /** Apply one flag (or restore) to many entities at once, logged as a single batch. */
  bulkApply: (keys: string[], action: EntityState | 'restore') => void
  clearFlags: (key: string, label: string) => void
  addCustom: (e: Omit<CustomEntity, 'createdAt'>) => void
  removeCustom: (key: string) => void
  setPrice: (key: string, price: number, label: string) => void
  clearPrice: (key: string) => void
  resetAll: () => void
}

let logSeq = 0

export const useAdminOverrides = create<AdminState>()(
  persist(
    (set, get) => ({
      flags: {},
      custom: [],
      prices: {},
      log: [],

      has: (key, state) => (get().flags[key] ?? []).includes(state),

      toggle: (key, state, label) => {
        const on = !(get().flags[key] ?? []).includes(state)
        get().setFlag(key, state, on, label)
      },

      setFlag: (key, state, on, label) =>
        set((s) => {
          const cur = new Set(s.flags[key] ?? [])
          if (on) {
            cur.add(state)
            // hidden/removed/frozen are mutually exclusive lifecycle states; featured is independent.
            if (state === 'removed') { cur.delete('hidden'); cur.delete('frozen'); cur.delete('featured') }
            if (state === 'hidden') { cur.delete('frozen') }
            if (state === 'frozen') { cur.delete('hidden') }
          } else cur.delete(state)
          const flags = { ...s.flags, [key]: Array.from(cur) }
          if (cur.size === 0) delete flags[key]
          const entry: LogEntry = { id: ++logSeq, ts: Date.now(), action: `${on ? 'set' : 'unset'} ${state}`, target: label }
          return { flags, log: [entry, ...s.log].slice(0, 100) }
        }),

      bulkApply: (keys, action) =>
        set((s) => {
          const flags = { ...s.flags }
          for (const key of keys) {
            if (action === 'restore') { delete flags[key]; continue }
            const cur = new Set(flags[key] ?? [])
            cur.add(action)
            if (action === 'removed') { cur.delete('hidden'); cur.delete('frozen'); cur.delete('featured') }
            if (action === 'hidden') cur.delete('frozen')
            if (action === 'frozen') cur.delete('hidden')
            flags[key] = Array.from(cur)
          }
          const entry: LogEntry = { id: ++logSeq, ts: Date.now(), action: `bulk ${action}`, target: `${keys.length} items` }
          return { flags, log: [entry, ...s.log].slice(0, 100) }
        }),

      clearFlags: (key, label) =>
        set((s) => {
          const flags = { ...s.flags }
          delete flags[key]
          const entry: LogEntry = { id: ++logSeq, ts: Date.now(), action: 'restore', target: label }
          return { flags, log: [entry, ...s.log].slice(0, 100) }
        }),

      addCustom: (e) =>
        set((s) => {
          const entry: LogEntry = { id: ++logSeq, ts: Date.now(), action: `add ${e.kind}`, target: e.name }
          return { custom: [{ ...e, createdAt: Date.now() }, ...s.custom], log: [entry, ...s.log].slice(0, 100) }
        }),

      removeCustom: (key) =>
        set((s) => ({ custom: s.custom.filter((c) => c.key !== key) })),

      setPrice: (key, price, label) =>
        set((s) => {
          const entry: LogEntry = { id: ++logSeq, ts: Date.now(), action: `set price Rs ${price}`, target: label }
          return { prices: { ...s.prices, [key]: price }, log: [entry, ...s.log].slice(0, 100) }
        }),

      clearPrice: (key) =>
        set((s) => {
          const prices = { ...s.prices }
          delete prices[key]
          return { prices }
        }),

      resetAll: () => set({ flags: {}, custom: [], prices: {}, log: [] }),
    }),
    { name: 'pdm-admin-overrides', storage: createJSONStorage(() => localStorage) },
  ),
)
