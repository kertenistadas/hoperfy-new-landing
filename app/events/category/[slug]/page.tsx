import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { client } from '@/sanity/lib/client'
import { categoryBySlugQuery, eventsByCategoryQuery } from '@/sanity/lib/queries'
import type { EventCategory, EventItem } from '@/types'
import { compareEvents, getCutoffDate } from '@/lib/eventUtils'
import NavWrapper from '@/components/NavWrapper'
import EventListCard from '@/components/events/EventListCard'
import ProductFAQ from '@/components/product/ProductFAQ'
import { buildFaqJsonLd } from '@/lib/eventJsonLd'

export const dynamic = 'force-dynamic'

const BASE_URL = 'https://hoperfy.com'

type Props = {
  params: Promise<{ slug: string }>
}

async function getCategory(slug: string): Promise<EventCategory | null> {
  return client.fetch<EventCategory | null>(categoryBySlugQuery, { slug }).catch(() => null)
}

function autoDescription(title: string) {
  const lower = title.toLowerCase()
  return `Browse ${lower} conferences and events worldwide. Compare dates, venues, cities and attendee numbers across the ${lower} events calendar.`
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const category = await getCategory(slug)

  if (!category) return { title: 'Not Found' }

  const title = category.metaTitle || `${category.title} Events and Conferences | Hoperfy`
  const description =
    category.metaDescription || category.description || autoDescription(category.title)

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: `${BASE_URL}/events/category/${slug}` },
    openGraph: { title, description, url: `${BASE_URL}/events/category/${slug}`, type: 'website' },
  }
}

export default async function CategoryEventsPage({ params }: Props) {
  const { slug } = await params
  const category = await getCategory(slug)

  if (!category) notFound()

  const events = await client
    .fetch<EventItem[]>(eventsByCategoryQuery, { category: slug, cutoff: getCutoffDate() })
    .catch(() => null)

  // Upcoming first, past events pushed to the bottom.
  const sorted = [...(events ?? [])].sort(compareEvents)

  const faqs = category.faqs ?? []
  const pageUrl = `${BASE_URL}/events/category/${slug}`

  const collectionNode = {
    '@type': 'CollectionPage',
    name: `${category.title} Events`,
    description:
      category.metaDescription || category.description || autoDescription(category.title),
    url: pageUrl,
    isPartOf: { '@type': 'WebSite', name: 'Hoperfy', url: BASE_URL },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: sorted.length,
      itemListElement: sorted.slice(0, 25).map((event, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: `${BASE_URL}/events/${event.slug}`,
        name: event.name,
      })),
    },
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [collectionNode, ...(faqs.length > 0 ? [buildFaqJsonLd(faqs)] : [])],
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
          <section className="pt-32 pb-8 px-6">
            <div className="max-w-5xl mx-auto">
              <nav className="flex items-center gap-2 text-[13px] text-[#9ca3af] mb-6">
                <Link href="/events" className="hover:text-[#0a0a0a] transition-colors">Events</Link>
                <span>/</span>
                <span className="text-[#6b7280]">{category.title}</span>
              </nav>

              <p className="eyebrow mb-3">Events Directory</p>
              <h1 className="text-[2.5rem] md:text-[3.25rem] font-black leading-[1.05] tracking-tight text-[#0a0a0a] mb-5">
                {category.title} Events
              </h1>
              <p className="text-[16px] font-light text-[#6b7280] leading-relaxed">
                {sorted.length === 0
                  ? `No ${category.title.toLowerCase()} events listed yet.`
                  : `${sorted.length} ${category.title.toLowerCase()} event${sorted.length === 1 ? '' : 's'} in the directory.`}
              </p>

              {category.intro && (
                <p className="text-[16px] font-light text-[#6b7280] leading-relaxed mt-5 max-w-2xl">
                  {category.intro}
                </p>
              )}
            </div>
          </section>

          <section className={faqs.length > 0 ? 'pb-16 px-6' : 'pb-24 px-6'}>
            <div className="max-w-5xl mx-auto">
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
            <ProductFAQ faqs={faqs} title={`${category.title} events — common questions`} />
          )}
        </main>
      </NavWrapper>
    </>
  )
}
