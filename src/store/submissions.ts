'use client'

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export type SubmissionStatus = 'pending' | 'approved' | 'rejected'

export interface BusinessSubmission {
  id: string
  vertical: 'shop' | 'food' | 'health' | 'services'
  category: string
  businessName: string
  ownerName: string
  city: string
  phone: string
  whatsapp: string
  description: string
  address?: string
  delivery?: string
  status: SubmissionStatus
  createdAt: number
}

interface SubmissionsState {
  items: BusinessSubmission[]
  add: (s: Omit<BusinessSubmission, 'id' | 'status' | 'createdAt'>) => string
  setStatus: (id: string, status: SubmissionStatus) => void
  remove: (id: string) => void
  clear: () => void
}

/**
 * Demo-mode store for business signups (browser-local). Real cross-user
 * persistence comes from Supabase when configured — see src/lib/backend.ts.
 */
export const useSubmissions = create<SubmissionsState>()(
  persist(
    (set) => ({
      items: [],
      add: (s) => {
        const id = 'BIZ-' + Math.floor(100000 + Math.random() * 900000)
        set((st) => ({ items: [{ ...s, id, status: 'pending', createdAt: Date.now() }, ...st.items] }))
        return id
      },
      setStatus: (id, status) => set((st) => ({ items: st.items.map((i) => (i.id === id ? { ...i, status } : i)) })),
      remove: (id) => set((st) => ({ items: st.items.filter((i) => i.id !== id) })),
      clear: () => set({ items: [] }),
    }),
    { name: 'pdm-submissions', storage: createJSONStorage(() => localStorage) },
  ),
)
