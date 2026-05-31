'use client'

import { History } from 'lucide-react'
import { getProducts } from '@/lib/catalog'
import { useHydrated } from '@/lib/useHydrated'
import { useRecent } from '@/store/recent'
import { Section } from '@/components/Section'
import { ProductRow } from '@/components/ProductRow'

export function RecentlyViewed({ excludeSlug }: { excludeSlug?: string }) {
  const hydrated = useHydrated()
  const slugs = useRecent((s) => s.slugs)
  if (!hydrated) return null
  const products = getProducts(slugs.filter((s) => s !== excludeSlug))
  if (products.length < 2) return null
  return (
    <Section title="Recently viewed" icon={<History size={20} className="text-brand" />}>
      <ProductRow products={products} />
    </Section>
  )
}
