'use client'

import { useEffect } from 'react'
import { useRecent } from '@/store/recent'

/** Records a product visit for the "recently viewed" rail. Renders nothing. */
export function ProductSeen({ slug }: { slug: string }) {
  const visit = useRecent((s) => s.visit)
  useEffect(() => {
    visit(slug)
  }, [slug, visit])
  return null
}
