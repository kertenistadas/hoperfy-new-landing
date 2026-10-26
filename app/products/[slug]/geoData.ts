import type { Metadata } from 'next'

const BASE_URL = 'https://hoperfy.com'

export type ProductFAQ = { question: string; answer: string }

export type ProductGeo = {
  metadata: Metadata
  /** Optional hero eyebrow. Falls back to the product's tagline when unset. */
  eyebrow?: string
  /** The SoftwareApplication node for the JSON-LD @graph. */
  software: Record<string, unknown>
  faqs: ProductFAQ[]
}

/**
 * Per-product GEO / AI-search optimization data. The visible FAQ section and
 * the JSON-LD FAQPage are both generated from `faqs` so they can never drift.
 */
export const productGeo: Record<string, ProductGeo> = {
  'hotels-for-events': {
    metadata: {
      title: { absolute: 'Event Housing & Hotel Booking for Event Organizers | Hoperfy' },
      description:
        'Free, fully managed event housing for event organizers. We contract the hotels and handle every attendee query. Your team does nothing.',
      alternates: { canonical: `${BASE_URL}/products/hotels-for-events` },
      openGraph: {
        title: 'Event Housing & Hotel Booking for Event Organizers | Hoperfy',
        description:
          'Free, fully managed event housing for event organizers. We contract the hotels and handle every attendee query. Your team does nothing.',
        url: `${BASE_URL}/products/hotels-for-events`,
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Event Housing & Hotel Booking for Event Organizers | Hoperfy',
        description:
          'Free, fully managed event housing for event organizers. We contract the hotels and handle every attendee query. Your team does nothing.',
      },
    },
    eyebrow: 'Event housing for conference, festival and tournament organizers',
    software: {
      '@type': 'SoftwareApplication',
      name: 'Hotels for Events by Hoperfy',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      description:
        'White-label hotel booking software for event teams. Manage room blocks, upload negotiated rates, and give attendees a branded booking experience with zero commission fees.',
      url: `${BASE_URL}/products/hotels-for-events`,
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'EUR',
        description: 'Contact for pricing',
      },
      // Machine-readable counterpart to the negative definition in the hero.
      audience: {
        '@type': 'Audience',
        audienceType: 'Event organizers',
      },
      publisher: {
        '@type': 'Organization',
        name: 'Hoperfy',
        url: BASE_URL,
      },
      featureList: [
        'White-label hotel booking flow',
        'Negotiated rate management',
        'Real-time room block inventory sync',
        'Group block tracking and pickup reporting',
        'Automated rooming list exports',
        'Zero commission fees',
      ],
    },
    faqs: [
      {
        question: 'Do I need to have hotel contracts already in place?',
        answer:
          'No. Hoperfy is a full-service event housing management solution. We contract hotels on your behalf across 2,000,000+ properties worldwide. No existing hotel relationships, negotiated rates, or contracts required — just tell us your event location and size.',
      },
      {
        question: 'How many hotels does Hoperfy work with?',
        answer:
          'Hoperfy has access to over 2,000,000 hotel properties worldwide, covering practically every country and city. Whether your event is in a major capital or a smaller destination, we will find and contract the right hotels for your attendees.',
      },
      {
        question:
          'We tried working with hotels before and it always created extra support. Why would this be different?',
        answer:
          "Because with Hoperfy, the support doesn't come to you. Every delegate question, cancellation, or booking issue goes directly to Hoperfy's team. We handle it end-to-end. You are never in the middle.",
      },
      {
        question: "Our team is already stretched. Won't this add to the workload?",
        answer:
          'The opposite. Most event teams spend 15–20 hours per event on hotel coordination — chasing room block software updates, handling delegate queries, managing contracts. Hoperfy removes that entire workload. One conversation to set up, then we run everything.',
      },
      {
        question: 'How is Hoperfy different from Cvent Passkey or HotelMap?',
        answer:
          "Hoperfy is a fully managed white-label hotel booking service for events. We build the booking page, manage the hotels, handle room block tracking, and support all delegate queries. You do nothing after the first call.",
      },
      {
        question: 'Is hotel booking really free?',
        answer:
          "Yes. Hoperfy's white-label hotel booking for events is free to set up. We earn through hotel network partnerships. You get a fully managed event hotel booking platform at no cost — and keep 30–50% of hotel revenue profits.",
      },
      {
        question: 'What happens if a hotel booking goes wrong?',
        answer:
          "Hoperfy manages it end-to-end, including disputes, overbooks, and refunds, directly with the hotel and the delegate. Your team isn't looped in unless you want to be.",
      },
      {
        question: 'How long does setup take?',
        answer:
          'Most event teams are live in up to 5 minutes. You share your event details and hotel contracts in one call. Hoperfy builds and launches the booking page. No developer work, no technical setup required from your side.',
      },
      {
        question: 'What size events is this built for?',
        answer:
          "Hoperfy works best for events with 200 or more attendees — conferences, trade shows, festivals, corporate events, and sports tournaments. If your event is smaller, get in touch and we'll let you know if we're a good fit.",
      },
      {
        question: 'Is Hoperfy a good alternative to EventPipe or Cvent Passkey?',
        answer:
          "Yes, if you want the work done for you. Hoperfy is fully managed: we do the work, not your team. You get white-label branding, 2M+ properties, instant setup, and zero platform fees.",
      },
    ],
  },
  'ticketing-for-events': {
    metadata: {
      title: { absolute: 'Multi-Platform Event Ticketing Software | Hoperfy' },
      description:
        'Multi-channel ticket sales, dynamic pricing, instant payouts and unified reporting, built for event organizers.',
      alternates: { canonical: `${BASE_URL}/products/ticketing-for-events` },
      openGraph: {
        title: 'Multi-Platform Event Ticketing | Hoperfy',
        description:
          'Sell across every channel, get paid instantly, own your attendee data. The ticketing platform built for serious event teams.',
        url: `${BASE_URL}/products/ticketing-for-events`,
        type: 'website',
      },
    },
    software: {
      '@type': 'SoftwareApplication',
      name: 'Ticketing for Events by Hoperfy',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      description:
        'Multi-platform event ticketing software for professional event organizers. Sell tickets across multiple channels, get instant payouts, and manage all attendee data in one dashboard.',
      url: `${BASE_URL}/products/ticketing-for-events`,
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
        description: 'Contact for pricing',
      },
      publisher: {
        '@type': 'Organization',
        name: 'Hoperfy',
        url: BASE_URL,
      },
      featureList: [
        'Multi-channel ticket sales',
        'Dynamic pricing and capacity controls',
        'Unified attendee data across all platforms',
        'Instant payouts with no hidden fees',
        'QR code check-in and access management',
        'Real-time sales dashboard',
      ],
    },
    faqs: [
      {
        question: 'So what does it actually cost?',
        answer:
          'Free events: nothing at all. Paid tickets: a flat 2.5% platform fee, plus Stripe processing of roughly 1.5–2.9% depending on card type and region. You can connect your own payment gateway and keep your negotiated processing rate.',
      },
      {
        question: 'How can payouts be instant?',
        answer:
          'Funds settle to your connected account as sales happen rather than being pooled and released after the event. There is no 30–90 day settlement window and no manual payout request.',
      },
      {
        question: 'Is Hoperfy a good Eventbrite alternative?',
        answer:
          'For organisers running their own events, yes. You get white-label branding, payouts as tickets sell, and unified data across every sales channel.',
      },
      {
        question: 'What size events is this built for?',
        answer:
          'The smallest event on Hoperfy was 20 people; the largest was 70,000. The setup process is the same either way — we do it for you.',
      },
      {
        question: 'Can I sell on my own site and partner platforms at once?',
        answer:
          'Yes. One inventory pool syncs across your site, partner platforms and resellers in real time, so you cannot oversell a tier.',
      },
      {
        question: 'Do I own my attendee data?',
        answer:
          'Yes. Every sale from every channel lands in your dashboard with the buyer details. It is your list, exportable — not an audience we resell back to you.',
      },
    ],
  },
  'speaker-housing': {
    metadata: {
      title: { absolute: 'Speaker Housing Management for Events | Hoperfy' },
      description:
        'Hoperfy manages speaker accommodation end to end: booking rooms, sending vouchers to speakers, and handling every change.',
      alternates: { canonical: `${BASE_URL}/products/speaker-housing` },
      openGraph: {
        title: 'Speaker Housing Management for Events | Hoperfy',
        description:
          'Send us the speaker list. Hoperfy books the rooms, sends vouchers, and handles every change. Your team gets zero speaker housing emails.',
        url: `${BASE_URL}/products/speaker-housing`,
        type: 'website',
      },
    },
    software: {
      '@type': 'SoftwareApplication',
      name: 'Speaker Housing by Hoperfy',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      description:
        'Fully managed speaker accommodation service for event teams. Hoperfy books hotels, sends vouchers directly to speakers, handles all changes, and maintains a live rooming list — with zero work from your team after the initial briefing.',
      url: `${BASE_URL}/products/speaker-housing`,
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
        description: 'Contact for pricing',
      },
      publisher: {
        '@type': 'Organization',
        name: 'Hoperfy',
        url: BASE_URL,
      },
      featureList: [
        'Booking across multiple hotels by speaker tier',
        'Vouchers and confirmations sent directly to speakers',
        'All speaker accommodation questions handled by Hoperfy',
        'Extensions, cancellations and changes managed during travel',
        'Single live rooming list',
        'Works independently of other Hoperfy products',
      ],
    },
    faqs: [
      {
        question: 'Does this only work if we use Hoperfy for attendee hotel booking too?',
        answer:
          'No. Speaker housing is a standalone service. You can use it whether or not you use Hoperfy for anything else. Just send us your speaker list and we handle the rest.',
      },
      {
        question: 'How do speakers receive their hotel confirmation?',
        answer:
          'Directly from Hoperfy. We send the booking confirmation and voucher to each speaker at the email address you provide. You do not need to forward anything or chase anyone.',
      },
      {
        question: 'What happens if a speaker needs to change their dates or cancel?',
        answer:
          'They contact Hoperfy, not you. We handle all modifications directly with the speaker and the hotel, update the rooming list, and issue a new voucher where needed. Your team is not in the loop unless you want to be.',
      },
      {
        question: 'Can speakers stay at different hotels?',
        answer:
          'Yes. We can book speakers across multiple properties — typically grouped by tier, proximity to the venue, or individual preference. You still receive one consolidated rooming list showing who is where.',
      },
      {
        question: 'Do you have a limit on how many speakers you can manage?',
        answer:
          'No. We handle speaker lists from a handful of keynotes to conferences with 200 or more speakers. The process is the same regardless of size.',
      },
      {
        question: 'Can you arrange flights and transfers as well?',
        answer:
          'Yes, on request. If you need flights or airport transfers arranged for speakers, let us know when you brief us and we will include them as part of the service.',
      },
    ],
  },
}

/**
 * Builds the JSON-LD @graph for a product page: SoftwareApplication, FAQPage,
 * Organization and BreadcrumbList.
 *
 * The FAQPage is generated from `geo.faqs`, the same array the visible FAQ
 * section renders from, so the two can never drift apart.
 *
 * The Organization node reuses the site-wide @id from app/layout.tsx so the
 * two declarations merge into one entity rather than competing.
 */
export function buildProductJsonLd(geo: ProductGeo, product: { slug: string; title: string }) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      geo.software,
      {
        '@type': 'FAQPage',
        mainEntity: geo.faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      },
      {
        '@type': 'Organization',
        '@id': `${BASE_URL}/#organization`,
        name: 'Hoperfy',
        url: BASE_URL,
        logo: `${BASE_URL}/logo.png`,
        contactPoint: {
          '@type': 'ContactPoint',
          email: 'hello@hoperfy.com',
          contactType: 'customer support',
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
          { '@type': 'ListItem', position: 2, name: 'Products', item: `${BASE_URL}/products` },
          {
            '@type': 'ListItem',
            position: 3,
            name: product.title,
            item: `${BASE_URL}/products/${product.slug}`,
          },
        ],
      },
    ],
  }
}
