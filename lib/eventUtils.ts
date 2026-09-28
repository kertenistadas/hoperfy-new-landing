export function getCutoffDate(): string {
  const d = new Date()
  d.setMonth(d.getMonth() - 12)
  return d.toISOString().split('T')[0]
}

export function isPastEvent(endDate: string | undefined, startDate: string): boolean {
  const compareDate = endDate || startDate
  return new Date(compareDate) < new Date()
}

export function isExpiredEvent(endDate: string | undefined, startDate: string): boolean {
  const compareDate = endDate || startDate
  const cutoff = new Date()
  cutoff.setMonth(cutoff.getMonth() - 12)
  return new Date(compareDate) < cutoff
}

export function formatDateRange(startDate: string, endDate?: string): string {
  if (!startDate) return ''

  const start = new Date(startDate)
  const opts: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', year: 'numeric' }

  if (!endDate || endDate === startDate) {
    return start.toLocaleDateString('en-GB', opts)
  }

  const end = new Date(endDate)
  const sameYear = start.getFullYear() === end.getFullYear()
  const sameMonth = sameYear && start.getMonth() === end.getMonth()

  // 12–14 Mar 2026 · 28 Feb – 2 Mar 2026 · 30 Dec 2026 – 2 Jan 2027
  if (sameMonth) {
    return `${start.getDate()}–${end.toLocaleDateString('en-GB', opts)}`
  }
  if (sameYear) {
    return `${start.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })} – ${end.toLocaleDateString('en-GB', opts)}`
  }
  return `${start.toLocaleDateString('en-GB', opts)} – ${end.toLocaleDateString('en-GB', opts)}`
}
