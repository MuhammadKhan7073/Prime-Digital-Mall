'use client'

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

const MAX = 12

interface RecentState {
  slugs: string[]
  visit: (slug: string) => void
  clear: () => void
}

export const useRecent = create<RecentState>()(
  persist(
    (set) => ({
      slugs: [],
      visit: (slug) => set((s) => ({ slugs: [slug, ...s.slugs.filter((x) => x !== slug)].slice(0, MAX) })),
      clear: () => set({ slugs: [] }),
    }),
    { name: 'pdm-recent', storage: createJSONStorage(() => localStorage) },
  ),
)
