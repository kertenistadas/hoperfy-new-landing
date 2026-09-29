/** Minimal shape needed to rank and date-format an event. */
type DatedEvent = { startDate?: string; endDate?: string }

export function getCutoffDate(): string {
  const d = new Date()
  d.setMonth(d.getMonth() - 12)
  return d.toISOString().split('T')[0]
}

export function isPastEvent(endDate?: string, startDate?: string): boolean {
  const compareDate = endDate || startDate
  if (!compareDate) return false
  return new Date(compareDate) < new Date()
}

export function isExpiredEvent(endDate?: string, startDate?: string): boolean {
  const compareDate = endDate || startDate
  if (!compareDate) return false
  const cutoff = new Date()
  cutoff.setMonth(cutoff.getMonth() - 12)
  return new Date(compareDate) < cutoff
}

export function formatEventDate(startDate?: string, endDate?: string): string {
  if (!startDate) return 'Dates TBA'

  const start = new Date(startDate)
  const full: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', year: 'numeric' }

  if (!endDate || endDate === startDate) {
    return start.toLocaleDateString('en-GB', full)
  }

  const end = new Date(endDate)
  const sameYear = start.getFullYear() === end.getFullYear()
  const sameMonth = sameYear && start.getMonth() === end.getMonth()

  // 12–14 Mar 2026 · 28 Feb – 2 Mar 2026 · 30 Dec 2026 – 2 Jan 2027
  if (sameMonth) {
    return `${start.getDate()}–${end.toLocaleDateString('en-GB', full)}`
  }
  if (sameYear) {
    return `${start.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })} – ${end.toLocaleDateString('en-GB', full)}`
  }
  return `${start.toLocaleDateString('en-GB', full)} – ${end.toLocaleDateString('en-GB', full)}`
}

/** Upcoming (0) before past (1) before undated (2). */
function eventRank(event: DatedEvent): number {
  if (!event.startDate) return 2
  return isPastEvent(event.endDate, event.startDate) ? 1 : 0
}

/**
 * Sort comparator shared by the directory and every taxonomy page: soonest
 * upcoming first, then past events, then events whose dates are not announced.
 */
export function compareEvents(a: DatedEvent, b: DatedEvent): number {
  const rankA = eventRank(a)
  const rankB = eventRank(b)
  if (rankA !== rankB) return rankA - rankB
  return (a.startDate ?? '').localeCompare(b.startDate ?? '')
}
