import type { Metadata } from 'next'
import { SellerPortal } from './SellerPortal'

export const metadata: Metadata = {
  title: 'Seller Portal',
  description: 'Manage your shop’s story and details on Prime Digital Mall.',
  robots: { index: false },
}

export default function SellerPage() {
  return <SellerPortal />
}
