import type { Metadata } from 'next'
import { OrderHistory } from './OrderHistory'

export const metadata: Metadata = { title: 'My Orders', robots: { index: false } }

export default function OrdersPage() {
  return <OrderHistory />
}
