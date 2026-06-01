'use client'

import { BadgeCheck } from 'lucide-react'
import { useHydrated } from '@/lib/useHydrated'
import { useAdminOverrides } from '@/store/adminOverrides'

/**
 * Verified badge that respects admin overrides:
 * - seed `verified` shows unless admin marked it `unverified`
 * - admin can also `verified` a non-seed-verified business.
 */
export function VerifiedTag({ entityKey, seedVerified, size = 16 }: { entityKey: string; seedVerified: boolean; size?: number }) {
  const hydrated = useHydrated()
  const flags = useAdminOverrides((s) => (hydrated ? s.flags[entityKey] ?? [] : []))
  const verified = flags.includes('verified') || (seedVerified && !flags.includes('unverified'))
  if (!verified) return null
  return <BadgeCheck size={size} className="shrink-0 text-brand" />
}
