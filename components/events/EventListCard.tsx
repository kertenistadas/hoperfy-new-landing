import Link from 'next/link'
import type { EventItem } from '@/types'
import { formatDateRange, isPastEvent } from '@/lib/eventUtils'

export default function EventListCard({ event }: { event: EventItem }) {
  const past = isPastEvent(event.endDate, event.startDate)

  return (
    <Link
      href={`/events/${event.slug}`}
      className={`relative flex flex-col rounded-xl border border-[#e5e7eb] p-5 transition-colors hover:border-[#1a6cf5] ${
        past ? 'opacity-50 grayscale' : ''
      }`}
    >
      {past && (
        <span className="absolute top-3 right-3 bg-[#f3f4f6] text-[#9ca3af] text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full">
          Past event
        </span>
      )}

      {event.logoUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={event.logoUrl} alt={event.name} className="h-8 w-auto object-contain max-w-[120px] mb-4" />
      )}

      <h3 className="text-[15px] font-semibold text-[#0a0a0a] leading-snug mb-1.5 pr-16">
        {event.name}
      </h3>

      <p className="text-[13px] text-[#1a6cf5] font-medium mb-1">
        {formatDateRange(event.startDate, event.endDate)}
      </p>

      <p className="text-[13px] text-[#6b7280] mb-3">
        {event.city?.name}
        {event.city?.country?.name ? `, ${event.city.country.name}` : ''}
      </p>

      <div className="mt-auto flex flex-wrap items-center gap-2">
        {event.category?.title && (
          <span className="text-[11px] text-[#374151] bg-[#f9fafb] border border-[#e5e7eb] rounded-full px-2.5 py-0.5">
            {event.category.title}
          </span>
        )}
        {event.venue && <span className="text-[11px] text-[#9ca3af]">{event.venue}</span>}
        {typeof event.attendees === 'number' && (
          <span className="text-[11px] text-[#9ca3af]">{event.attendees.toLocaleString('en-GB')} attendees</span>
        )}
      </div>
    </Link>
  )
}
