/** Formatting helpers. Prices are stored as whole Pakistani rupees (PKR). */

export function formatPrice(rupees: number): string {
  return `Rs ${Math.round(rupees).toLocaleString('en-US')}`
}

/** Compact counts: 1234 -> "1.2k", 1500000 -> "1.5M". */
export function formatCompact(n: number): string {
  return new Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 1 }).format(n)
}

/** Percentage discount given current + original price. Returns 0 when not on sale. */
export function percentOff(price: number, compareAt?: number): number {
  if (!compareAt || compareAt <= price) return 0
  return Math.round(((compareAt - price) / compareAt) * 100)
}

export function pluralize(n: number, singular: string, plural = singular + 's'): string {
  return `${formatCompact(n)} ${n === 1 ? singular : plural}`
}
