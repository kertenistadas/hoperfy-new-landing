import type { Metadata } from 'next'
import Link from 'next/link'
import { client } from '@/sanity/lib/client'
import { eventBySlugQuery, eventsByCityQuery } from '@/sanity/lib/queries'
import type { EventItem } from '@/types'
import { formatEventDate, getCutoffDate, isExpiredEvent, isPastEvent } from '@/lib/eventUtils'
import NavWrapper from '@/components/NavWrapper'
import EventCTAs from '@/components/events/EventCTAs'
import EventListCard from '@/components/events/EventListCard'

export const dynamic = 'force-dynamic'

const BASE_URL = 'https://hoperfy.com'

type Props = {
  params: Promise<{ slug: string }>
}

const formatLabels: Record<string, string> = {
  'in-person': 'In-person',
  hybrid: 'Hybrid',
  virtual: 'Virtual',
}

async function getEvent(slug: string): Promise<EventItem | null> {
  return client.fetch<EventItem | null>(eventBySlugQuery, { slug }).catch(() => null)
}

/** Stand-in copy for events whose description has not been written yet. */
function autoDescription(event: EventItem, dateRange: string) {
  const cityName = event.city?.name ?? ''
  const countryName = event.city?.country?.name ?? ''
  const category = event.category?.title ?? 'industry'

  if (!event.startDate) {
    return `${event.name} takes place in ${cityName}, ${countryName}. Dates to be announced.`
  }

  return `${event.name} takes place in ${cityName}, ${countryName} from ${dateRange}. This ${category.toLowerCase()} event brings together professionals from across the sector. Attendees travelling to ${cityName} can arrange accommodation and event logistics through Hoperfy.`
}

/** Meta descriptions get cut at a word boundary so they never end mid-word. */
function truncate(text: string, max = 160) {
  if (text.length <= max) return text
  const cut = text.slice(0, max - 1)
  return `${cut.replace(/\s+\S*$/, '') || cut}…`
}

/** Title tags stay within 60 chars. Only the event name is shortened, on a word boundary. */
function eventTitle(name: string, cityName: string, max = 60) {
  const suffix = `${cityName ? `, ${cityName}` : ''} | Hoperfy`
  const room = max - suffix.length
  if (name.length <= room) return `${name}${suffix}`
  const head = name.slice(0, room + 1)
  const cut = /\s/.test(head) ? head.replace(/\s+\S*$/, '').replace(/[\s,:;-]+$/, '') : ''
  return `${cut || name.slice(0, room)}${suffix}`
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const event = await getEvent(slug)

  // Missing and long-expired events share one page that must stay out of the index.
  if (!event || isExpiredEvent(event.endDate, event.startDate)) {
    return { title: 'This event is over | Hoperfy', robots: { index: false } }
  }

  const cityName = event.city?.name ?? ''
  const dateRange = formatEventDate(event.startDate, event.endDate)
  const title = eventTitle(event.name, cityName)
  const description = truncate(event.description || autoDescription(event, dateRange))

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: `${BASE_URL}/events/${slug}` },
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/events/${slug}`,
      type: 'website',
    },
  }
}

export default async function EventPage({ params }: Props) {
  const { slug } = await params
  const event = await getEvent(slug)

  if (!event || isExpiredEvent(event.endDate, event.startDate)) {
    return <ExpiredEvent />
  }

  const cityName = event.city?.name ?? ''
  const citySlug = event.city?.slug
  const countryName = event.city?.country?.name ?? ''
  const countrySlug = event.city?.country?.slug
  const dateRange = formatEventDate(event.startDate, event.endDate)
  const past = isPastEvent(event.endDate, event.startDate)
  const description = event.description || autoDescription(event, dateRange)

  const otherEvents = citySlug
    ? await client
        .fetch<EventItem[]>(eventsByCityQuery, { city: citySlug, cutoff: getCutoffDate() })
        .then((list) => (list ?? []).filter((e) => e.slug !== event.slug).slice(0, 3))
        .catch(() => [])
    : []

  const details: { label: string; value: string }[] = []
  if (event.venue) details.push({ label: 'Venue', value: event.venue })
  if (typeof event.attendees === 'number') {
    details.push({ label: 'Expected attendees', value: event.attendees.toLocaleString('en-GB') })
  }
  if (event.ticketPriceFrom) details.push({ label: 'Tickets from', value: event.ticketPriceFrom })
  if (event.organizer) details.push({ label: 'Organizer', value: event.organizer })
  if (event.format) details.push({ label: 'Format', value: formatLabels[event.format] ?? event.format })

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.name,
    // schema.org requires startDate; an unannounced event simply omits it
    // rather than emitting a placeholder date.
    ...(event.startDate ? { startDate: event.startDate } : {}),
    ...(event.endDate ? { endDate: event.endDate } : {}),
    eventAttendanceMode:
      event.format === 'virtual'
        ? 'https://schema.org/OnlineEventAttendanceMode'
        : event.format === 'hybrid'
        ? 'https://schema.org/MixedEventAttendanceMode'
        : 'https://schema.org/OfflineEventAttendanceMode',
    eventStatus: 'https://schema.org/EventScheduled',
    description,
    ...(event.logoUrl ? { image: event.logoUrl } : {}),
    location: {
      '@type': 'Place',
      name: event.venue || cityName,
      address: {
        '@type': 'PostalAddress',
        addressLocality: cityName,
        addressCountry: countryName,
      },
    },
    ...(event.organizer
      ? { organizer: { '@type': 'Organization', name: event.organizer, ...(event.website ? { url: event.website } : {}) } }
      : {}),
    url: `${BASE_URL}/events/${slug}`,
  }

  return (
    <>
      <script
        type="application/ld+json"
        async
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <NavWrapper>
        <main>
          {/* Header */}
          <section className="pt-32 pb-10 px-6">
            <div className="max-w-5xl mx-auto">
              <nav className="flex flex-wrap items-center gap-2 text-[13px] text-[#9ca3af] mb-6">
                <Link href="/events" className="hover:text-[#0a0a0a] transition-colors">Events</Link>
                {countrySlug && (
                  <>
                    <span>/</span>
                    <Link href={`/events/country/${countrySlug}`} className="hover:text-[#0a0a0a] transition-colors">
                      {countryName}
                    </Link>
                  </>
                )}
                {citySlug && (
                  <>
                    <span>/</span>
                    <Link href={`/events/city/${citySlug}`} className="hover:text-[#0a0a0a] transition-colors">
                      {cityName}
                    </Link>
                  </>
                )}
              </nav>

              {event.logoUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={event.logoUrl} alt={event.name} className="h-12 w-auto object-contain max-w-[180px] mb-6" />
              )}

              <div className="flex flex-wrap items-center gap-3 mb-4">
                {event.category?.title && (
                  <span className="text-[11px] text-[#374151] bg-[#f9fafb] border border-[#e5e7eb] rounded-full px-3 py-1">
                    {event.category.title}
                  </span>
                )}
                {past && (
                  <span className="bg-[#f3f4f6] text-[#9ca3af] text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full">
                    Past event
                  </span>
                )}
              </div>

              <h1 className="text-[2.25rem] md:text-[3rem] font-black leading-[1.05] tracking-tight text-[#0a0a0a] mb-4">
                {event.name}
              </h1>

              <p className="text-[18px] font-medium text-[#1a6cf5] mb-2">{dateRange}</p>

              <p className="text-[15px] text-[#6b7280] mb-6">
                {citySlug ? (
                  <Link href={`/events/city/${citySlug}`} className="hover:text-[#0a0a0a] transition-colors">
                    {cityName}
                  </Link>
                ) : (
                  cityName
                )}
                {countryName && <span>, </span>}
                {countrySlug ? (
                  <Link href={`/events/country/${countrySlug}`} className="hover:text-[#0a0a0a] transition-colors">
                    {countryName}
                  </Link>
                ) : (
                  countryName
                )}
              </p>

              {event.website && (
                <a
                  href={event.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[14px] font-medium text-[#1a6cf5] hover:underline"
                >
                  Visit event website →
                </a>
              )}
            </div>
          </section>

          {/* Details */}
          {details.length > 0 && (
            <section className="pb-10 px-6">
              <div className="max-w-5xl mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {details.map((detail) => (
                    <div key={detail.label} className="rounded-xl border border-[#e5e7eb] p-4">
                      <p className="text-[10px] uppercase tracking-wider text-[#9ca3af] mb-1.5">{detail.label}</p>
                      <p className="text-[14px] font-medium text-[#0a0a0a]">{detail.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Description — authored copy, or generated stand-in copy */}
          <section className="pb-10 px-6">
            <div className="max-w-5xl mx-auto">
              <p className="text-[15px] font-light text-[#6b7280] leading-relaxed max-w-2xl">
                {description}
              </p>
            </div>
          </section>

          {/* CTAs */}
          <section className="pb-16 px-6">
            <div className="max-w-5xl mx-auto">
              <EventCTAs
                eventName={event.name}
                eventLocation={[cityName, countryName].filter(Boolean).join(', ')}
                eventStartDate={event.startDate}
                eventEndDate={event.endDate}
              />
            </div>
          </section>

          {/* Other events in this city */}
          {otherEvents.length > 0 && (
            <section className="pb-24 px-6">
              <div className="max-w-5xl mx-auto">
                <h2 className="text-[1.5rem] font-black tracking-tight text-[#0a0a0a] mb-6">
                  Other events in {cityName}
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {otherEvents.map((other) => (
                    <EventListCard key={other._id} event={other} />
                  ))}
                </div>
              </div>
            </section>
          )}
        </main>
      </NavWrapper>
    </>
  )
}

function ExpiredEvent() {
  return (
    <NavWrapper>
      <main className="pt-32 pb-24 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-[5rem] font-black text-[#e5e7eb] leading-none mb-4">🗓</p>
          <h1 className="text-[2rem] font-black tracking-tight text-[#0a0a0a] mb-4">This event is over.</h1>
          <p className="text-[16px] font-light text-[#6b7280] mb-8">
            The event you are looking for has already taken place. Browse upcoming conferences and events instead.
          </p>
          <Link
            href="/events"
            className="h-12 px-8 text-[14px] font-medium bg-[#1a6cf5] text-white rounded-lg hover:bg-[#1558cc] transition-colors inline-flex items-center"
          >
            Find more events →
          </Link>
        </div>
      </main>
    </NavWrapper>
  )
}
