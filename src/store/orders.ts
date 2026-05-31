'use client'

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export type OrderStatus = 'placed' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled'
export const ORDER_FLOW: OrderStatus[] = ['placed', 'confirmed', 'shipped', 'delivered']

export interface OrderItem {
  name: string
  qty: number
  price: number
  variant?: string
}

export interface Order {
  id: string
  kind: 'shop' | 'food'
  items: OrderItem[]
  subtotal: number
  delivery: number
  total: number
  name: string
  phone: string
  address: string
  city: string
  payment: 'cod' | 'easypaisa' | 'bank'
  restaurant?: string
  status: OrderStatus
  createdAt: number
}

interface OrdersState {
  orders: Order[]
  place: (o: Omit<Order, 'id' | 'status' | 'createdAt'> & { ref: string }) => void
  setStatus: (id: string, status: OrderStatus) => void
  remove: (id: string) => void
  clear: () => void
}

export const useOrders = create<OrdersState>()(
  persist(
    (set) => ({
      orders: [],
      place: ({ ref, ...o }) =>
        set((s) => ({ orders: [{ ...o, id: ref, status: 'placed', createdAt: Date.now() }, ...s.orders] })),
      setStatus: (id, status) => set((s) => ({ orders: s.orders.map((o) => (o.id === id ? { ...o, status } : o)) })),
      remove: (id) => set((s) => ({ orders: s.orders.filter((o) => o.id !== id) })),
      clear: () => set({ orders: [] }),
    }),
    { name: 'pdm-orders', storage: createJSONStorage(() => localStorage) },
  ),
)
