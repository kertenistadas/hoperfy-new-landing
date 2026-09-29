import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { client } from '@/sanity/lib/client'
import { cityBySlugQuery, eventsByCityQuery } from '@/sanity/lib/queries'
import type { EventCity, EventItem } from '@/types'
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

async function getCity(slug: string): Promise<EventCity | null> {
  return client.fetch<EventCity | null>(cityBySlugQuery, { slug }).catch(() => null)
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const city = await getCity(slug)

  if (!city) return { title: 'Not Found' }

  const countryName = city.country?.name ?? ''
  const title = city.metaTitle || `Events and Conferences in ${city.name}, ${countryName} | Hoperfy`
  const description =
    city.metaDescription ||
    city.description ||
    city.country?.description ||
    `Find conferences and events in ${city.name}, ${countryName}. Browse dates, venues and ticket information.`

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: `${BASE_URL}/events/city/${slug}` },
    openGraph: { title, description, url: `${BASE_URL}/events/city/${slug}`, type: 'website' },
  }
}

export default async function CityEventsPage({ params }: Props) {
  const { slug } = await params
  const city = await getCity(slug)

  if (!city) notFound()

  const countryName = city.country?.name ?? ''
  const countrySlug = city.country?.slug

  const events = await client
    .fetch<EventItem[]>(eventsByCityQuery, { city: slug, cutoff: getCutoffDate() })
    .catch(() => null)

  // Upcoming first, past events pushed to the bottom.
  const sorted = [...(events ?? [])].sort(compareEvents)

  const blurb =
    city.description ||
    city.country?.description ||
    `Find conferences and events in ${city.name}, ${countryName}. Browse dates, venues and ticket information.`

  const faqs = city.faqs ?? []
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
              <span>/</span>
              <span className="text-[#6b7280]">{city.name}</span>
            </nav>

            <h1 className="text-[2.5rem] md:text-[3.25rem] font-black leading-[1.05] tracking-tight text-[#0a0a0a] mb-5">
              Events in {city.name}
            </h1>

            <p className="text-[16px] font-light text-[#6b7280] leading-relaxed max-w-2xl">
              {blurb}
            </p>

            {city.intro && (
              <p className="text-[16px] font-light text-[#6b7280] leading-relaxed mt-5 max-w-2xl">
                {city.intro}
              </p>
            )}
          </div>
        </section>

        <section className={faqs.length > 0 ? 'pb-16 px-6' : 'pb-24 px-6'}>
          <div className="max-w-5xl mx-auto">
            <p className="text-[13px] text-[#6b7280] mb-4">
              {sorted.length === 0
                ? `No events listed in ${city.name} yet.`
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

        {faqs.length > 0 && (
          <ProductFAQ faqs={faqs} title={`Events in ${city.name} — common questions`} />
        )}
      </main>
    </NavWrapper>
  )
}
