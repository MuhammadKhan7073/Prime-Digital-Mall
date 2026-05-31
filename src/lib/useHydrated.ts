'use client'

import { useEffect, useState } from 'react'

/** True only after first client mount — guards against SSR/client markup mismatch. */
export function useHydrated(): boolean {
  const [hydrated, setHydrated] = useState(false)
  useEffect(() => setHydrated(true), [])
  return hydrated
}
