import type { Metadata } from 'next'
import { CompareView } from './CompareView'

export const metadata: Metadata = { title: 'Compare Products' }

export default function ComparePage() {
  return <CompareView />
}
