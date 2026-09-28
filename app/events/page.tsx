import type { Metadata } from 'next'
import { client } from '@/sanity/lib/client'
import {
  allEventsQuery,
  eventCategoriesQuery,
  eventCitiesQuery,
  eventCountriesQuery,
} from '@/sanity/lib/queries'
import type { EventCategory, EventCity, EventCountry, EventItem } from '@/types'
import { getCutoffDate } from '@/lib/eventUtils'
import NavWrapper from '@/components/NavWrapper'
import EventsDirectory from '@/components/events/EventsDirectory'

export const dynamic = 'force-dynamic'

const BASE_URL = 'https://hoperfy.com'

export const metadata: Metadata = {
  title: { absolute: 'Events Directory — Find Conferences and Events Worldwide | Hoperfy' },
  description:
    'Browse conferences and events by date, category, country and city. Compare venues, attendee numbers and dates across the global events calendar.',
  alternates: { canonical: `${BASE_URL}/events` },
  openGraph: {
    title: 'Events Directory — Find Conferences and Events Worldwide | Hoperfy',
    description:
      'Browse conferences and events by date, category, country and city. Compare venues, attendee numbers and dates across the global events calendar.',
    url: `${BASE_URL}/events`,
    type: 'website',
  },
}

export default async function EventsPage() {
  const cutoff = getCutoffDate()

  const [events, categories, countries, cities] = await Promise.all([
    client.fetch<EventItem[]>(allEventsQuery, { cutoff }).catch(() => null),
    client.fetch<EventCategory[]>(eventCategoriesQuery).catch(() => null),
    client.fetch<EventCountry[]>(eventCountriesQuery).catch(() => null),
    client.fetch<EventCity[]>(eventCitiesQuery).catch(() => null),
  ])

  return (
    <NavWrapper>
      <main>
        <section className="pt-32 pb-8 px-6">
          <div className="max-w-5xl mx-auto">
            <p className="eyebrow mb-3">Events Directory</p>
            <h1 className="text-[2.5rem] md:text-[3.25rem] font-black leading-[1.05] tracking-tight text-[#0a0a0a] mb-5">
              Events Directory
            </h1>
            <p className="text-[16px] font-light text-[#6b7280] leading-relaxed max-w-2xl">
              Browse conferences and events by date, category, country and city. Compare venues,
              attendee numbers and dates across the global events calendar.
            </p>
          </div>
        </section>

        <section className="pb-24 px-6">
          <div className="max-w-5xl mx-auto">
            <EventsDirectory
              events={events ?? []}
              categories={categories ?? []}
              countries={countries ?? []}
              cities={cities ?? []}
            />
          </div>
        </section>
      </main>
    </NavWrapper>
  )
}
