import type { Product } from '@/data/types'

/** Pick the first available option for each variant group — enables true 1-click add. */
export function defaultVariant(p: Product): Record<string, string> {
  const out: Record<string, string> = {}
  for (const g of p.variantGroups ?? []) {
    const opt = g.options.find((o) => !o.soldOut) ?? g.options[0]
    if (opt) out[g.name] = opt.value
  }
  return out
}

export function variantSummary(variant: Record<string, string>): string {
  return Object.values(variant).join(', ')
}
