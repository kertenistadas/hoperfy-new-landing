import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { client } from '@/sanity/lib/client'
import { citiesByCountryQuery, countryBySlugQuery, eventsByCountryQuery } from '@/sanity/lib/queries'
import type { EventCity, EventCountry, EventItem } from '@/types'
import { compareEvents, getCutoffDate } from '@/lib/eventUtils'
import { buildFaqJsonLd } from '@/lib/eventJsonLd'
import NavWrapper from '@/components/NavWrapper'
import EventListCard from '@/components/events/EventListCard'
import ProductFAQ from '@/components/product/ProductFAQ'

export const dynamic = 'force-dynamic'

const BASE_URL = 'https://hoperfy.com'

type Props = {
  params: Promise<{ slug: string }>
}

async function getCountry(slug: string): Promise<EventCountry | null> {
  return client.fetch<EventCountry | null>(countryBySlugQuery, { slug }).catch(() => null)
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const country = await getCountry(slug)

  if (!country) return { title: 'Not Found' }

  const title = country.metaTitle || `Events and Conferences in ${country.name} | Hoperfy`
  const description =
    country.metaDescription ||
    country.description ||
    `Find conferences and events in ${country.name}. Browse dates, venues and cities across the ${country.name} events calendar.`

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: `${BASE_URL}/events/country/${slug}` },
    openGraph: { title, description, url: `${BASE_URL}/events/country/${slug}`, type: 'website' },
  }
}

export default async function CountryEventsPage({ params }: Props) {
  const { slug } = await params
  const country = await getCountry(slug)

  if (!country) notFound()

  const [events, cities] = await Promise.all([
    client
      .fetch<EventItem[]>(eventsByCountryQuery, { country: slug, cutoff: getCutoffDate() })
      .catch(() => null),
    client.fetch<EventCity[]>(citiesByCountryQuery, { country: slug }).catch(() => null),
  ])

  // Upcoming first, past events pushed to the bottom.
  const sorted = [...(events ?? [])].sort(compareEvents)

  const faqs = country.faqs ?? []
  const jsonLd =
    faqs.length > 0
      ? { '@context': 'https://schema.org', ...buildFaqJsonLd(faqs) }
      : null

  return (
    <NavWrapper>
      {jsonLd && (
        <script
          type="application/ld+json"
          async
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <main>
        <section className="pt-32 pb-8 px-6">
          <div className="max-w-5xl mx-auto">
            <nav className="flex items-center gap-2 text-[13px] text-[#9ca3af] mb-6">
              <Link href="/events" className="hover:text-[#0a0a0a] transition-colors">Events</Link>
              <span>/</span>
              <span className="text-[#6b7280]">{country.name}</span>
            </nav>

            <h1 className="text-[2.5rem] md:text-[3.25rem] font-black leading-[1.05] tracking-tight text-[#0a0a0a] mb-5">
              Events in {country.name}
            </h1>

            <p className="text-[16px] font-light text-[#6b7280] leading-relaxed max-w-2xl">
              {country.description ||
                `Find conferences and events in ${country.name}. Browse dates, venues and cities across the ${country.name} events calendar.`}
            </p>

            {country.intro && (
              <p className="text-[16px] font-light text-[#6b7280] leading-relaxed mt-5 max-w-2xl">
                {country.intro}
              </p>
            )}
          </div>
        </section>

        <section className="pb-16 px-6">
          <div className="max-w-5xl mx-auto">
            <p className="text-[13px] text-[#6b7280] mb-4">
              {sorted.length === 0
                ? `No events listed in ${country.name} yet.`
                : `${sorted.length} event${sorted.length === 1 ? '' : 's'}`}
            </p>

            {sorted.length > 0 && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {sorted.map((event) => (
                  <EventListCard key={event._id} event={event} />
                ))}
              </div>
            )}
          </div>
        </section>

        {cities && cities.length > 0 && (
          <section className="pb-24 px-6">
            <div className="max-w-5xl mx-auto border-t border-[#e5e7eb] pt-10">
              <h2 className="text-[1.5rem] font-black tracking-tight text-[#0a0a0a] mb-5">
                Browse by city
              </h2>
              <div className="flex flex-wrap gap-2">
                {cities.map((city) => (
                  <Link
                    key={city._id}
                    href={`/events/city/${city.slug}`}
                    className="text-[13px] text-[#374151] bg-[#f9fafb] border border-[#e5e7eb] rounded-full px-4 py-1.5 hover:border-[#1a6cf5] hover:text-[#1a6cf5] transition-colors"
                  >
                    {city.name}
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {faqs.length > 0 && (
          <ProductFAQ faqs={faqs} title={`Events in ${country.name} — common questions`} />
        )}
      </main>
    </NavWrapper>
  )
}
