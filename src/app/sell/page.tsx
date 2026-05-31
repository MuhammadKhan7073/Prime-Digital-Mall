import type { Metadata } from 'next'
import { SellForm } from './SellForm'

export const metadata: Metadata = {
  title: 'Sell on Prime Digital Mall — List your business',
  description: 'List your shop, restaurant, clinic or service on Prime Digital Mall and reach customers across Pakistan. Free to start.',
  alternates: { canonical: '/sell' },
}

export default function SellPage() {
  return <SellForm />
}
