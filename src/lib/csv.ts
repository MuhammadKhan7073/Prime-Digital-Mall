/** Tiny CSV builder + browser download. */

function esc(v: unknown): string {
  const s = v == null ? '' : String(v)
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s
}

export function toCSV(rows: Record<string, unknown>[]): string {
  if (rows.length === 0) return ''
  const cols = Object.keys(rows[0])
  const head = cols.join(',')
  const body = rows.map((r) => cols.map((c) => esc(r[c])).join(',')).join('\n')
  return `${head}\n${body}`
}

export function downloadCSV(filename: string, rows: Record<string, unknown>[]): void {
  if (typeof window === 'undefined') return
  const csv = toCSV(rows)
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}
