'use client'

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export type BookingType = 'doctor' | 'service'

export interface Booking {
  id: string
  type: BookingType
  /** doctor slug or offering slug */
  slug: string
  providerSlug: string
  title: string
  subtitle: string
  emoji: string
  when: string
  mode?: string
  name: string
  phone: string
  address?: string
  notes?: string
  price: number
  status: 'requested'
  createdAt: number
}

interface BookingsState {
  bookings: Booking[]
  addBooking: (b: Omit<Booking, 'id' | 'status' | 'createdAt'>) => string
  remove: (id: string) => void
  clear: () => void
}

export const useBookings = create<BookingsState>()(
  persist(
    (set) => ({
      bookings: [],
      addBooking: (b) => {
        const id = 'BK-' + Math.floor(100000 + Math.random() * 900000)
        set((s) => ({ bookings: [{ ...b, id, status: 'requested', createdAt: Date.now() }, ...s.bookings] }))
        return id
      },
      remove: (id) => set((s) => ({ bookings: s.bookings.filter((b) => b.id !== id) })),
      clear: () => set({ bookings: [] }),
    }),
    { name: 'pdm-bookings', storage: createJSONStorage(() => localStorage) },
  ),
)
