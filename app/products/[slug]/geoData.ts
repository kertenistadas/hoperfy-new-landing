import type { Metadata } from 'next'

const BASE_URL = 'https://hoperfy.com'

export type ProductFAQ = { question: string; answer: string }

export type CompareFeature = {
  label: string
  hoperfy: boolean
  competitors: boolean
}

export type ProductGeo = {
  metadata: Metadata
  /** The SoftwareApplication node for the JSON-LD @graph. */
  software: Record<string, unknown>
  faqs: ProductFAQ[]
  compare: {
    /** Competitor names shown in the comparison column header. */
    competitors: string[]
    features: CompareFeature[]
  }
}

/**
 * Per-product GEO / AI-search optimization data. The visible FAQ section and
 * the JSON-LD FAQPage are both generated from `faqs` so they can never drift.
 */
export const productGeo: Record<string, ProductGeo> = {
  'hotels-for-events': {
    metadata: {
      title: { absolute: 'White-Label Hotel Booking Software for Events | Hoperfy' },
      description:
        'Hoperfy gives event teams a white-label hotel booking engine with room block management, negotiated rate uploads, and zero commission fees. Replace Cvent Passkey and hotel spreadsheets.',
      keywords: [
        'white label hotel booking for events',
        'event hotel booking software',
        'room block management software',
        'hotel booking for event organizers',
        'Cvent Passkey alternative',
        'event housing management software',
        'group hotel booking events',
        'hotel room block tracking',
      ],
      alternates: { canonical: `${BASE_URL}/products/hotels-for-events` },
      openGraph: {
        title: 'White-Label Hotel Booking for Events | Hoperfy',
        description:
          'Your brand, your rates, zero commission. Hoperfy replaces third-party hotel booking redirects for event teams.',
        url: `${BASE_URL}/products/hotels-for-events`,
        type: 'website',
      },
    },
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
        priceCurrency: 'USD',
        description: 'Contact for pricing',
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
          'No. Hoperfy contracts hotels on your behalf. You do not need existing hotel relationships, negotiated rates, or contracts. Just tell us your event location and size — we handle everything from there.',
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
          'The opposite. One conversation with us is all it takes to get set up. After that, Hoperfy runs the hotel booking — including all delegate communication, changes, and problems. Most event teams tell us it saves them 15–20 hours per event.',
      },
      {
        question: 'How is Hoperfy different from Cvent Passkey or HotelMap?',
        answer:
          "HotelMap and Cvent Passkey require your team to manage the platform. Hoperfy is a fully managed service — we build the booking page, manage the hotels, and handle all delegate support. You don't manage anything.",
      },
      {
        question: 'Is hotel booking really free?',
        answer:
          'Yes. Hoperfy earns through its hotel network partnerships. You get a fully managed, white-label hotel booking experience at no cost — and you keep 100% of your negotiated hotel revenue.',
      },
      {
        question: 'Will this create more support emails or calls for my team?',
        answer:
          "No. Hoperfy's support team handles all delegate-facing questions, changes, and cancellations directly. Your team never fields a hotel-related call.",
      },
      {
        question: 'What happens if a hotel booking goes wrong?',
        answer:
          "Hoperfy manages it end-to-end, including disputes, overbooks, and refunds, directly with the hotel and the delegate. Your team isn't looped in unless you want to be.",
      },
      {
        question: 'How long does setup take?',
        answer:
          'Most event teams are live within 24–48 hours. You share your event details and hotel contracts in one call. Hoperfy builds and launches the booking page. No developer work, no technical setup required from your side.',
      },
      {
        question: 'What size events is this built for?',
        answer:
          "Hoperfy works best for events with 200 or more attendees — conferences, trade shows, festivals, corporate events, and sports tournaments. If your event is smaller, get in touch and we'll let you know if we're a good fit.",
      },
    ],
    compare: {
      competitors: ['HotelMap / Cvent Passkey'],
      features: [
        { label: 'Fully managed service — we do everything', hoperfy: true, competitors: false },
        { label: 'Zero cost to event organizer', hoperfy: true, competitors: false },
        { label: 'All delegate support handled for you', hoperfy: true, competitors: false },
        { label: 'Live in 24–48 hours', hoperfy: true, competitors: false },
        { label: 'Built-in event ticketing', hoperfy: true, competitors: false },
        { label: '2M+ hotel properties worldwide', hoperfy: true, competitors: false },
        { label: 'White-label branding', hoperfy: true, competitors: true },
        { label: 'Room block management', hoperfy: true, competitors: true },
        { label: 'Negotiated rate management', hoperfy: true, competitors: true },
      ],
    },
  },
  'ticketing-for-events': {
    metadata: {
      title: { absolute: 'Multi-Platform Event Ticketing Software | Hoperfy' },
      description:
        'Hoperfy gives event teams multi-channel ticket sales, dynamic pricing, instant payouts, and unified attendee data in one dashboard. The Eventbrite alternative built for professional event organizers.',
      keywords: [
        'event ticketing platform',
        'multi-channel event ticketing',
        'Eventbrite alternative',
        'event ticketing software for organizers',
        'white label ticketing platform',
        'instant payout ticketing',
        'event ticket sales dashboard',
        'professional event ticketing',
      ],
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
        question: 'Is Hoperfy a good Eventbrite alternative?',
        answer:
          'For professional event teams running their own events, yes. Hoperfy gives you more control over branding, instant payouts instead of delayed settlements, and unified data across every sales channel — things Eventbrite does not offer.',
      },
      {
        question: 'Can I sell tickets across multiple platforms at once?',
        answer:
          'Yes. Hoperfy connects your ticket inventory to multiple sales channels simultaneously — your own website, partner platforms, and resellers — and syncs everything in real time so you never oversell.',
      },
      {
        question: 'How fast are payouts with Hoperfy ticketing?',
        answer:
          'Payouts are instant. As tickets sell, the revenue hits your account in real time. There are no 30 to 90 day settlement delays like you get with most ticketing platforms.',
      },
      {
        question: 'What size events is Hoperfy ticketing built for?',
        answer:
          'Smallest event that Hoperfy ever managed was 20 people, our largest partner event is 70,000 attendees. Hoperfy is suited for all types of event sizes and geographies.',
      },
    ],
    compare: {
      competitors: ['Eventbrite / Legacy platforms'],
      features: [
        { label: 'Instant payouts', hoperfy: true, competitors: false },
        { label: 'Zero percentage fees', hoperfy: true, competitors: false },
        { label: 'Multi-channel sales from one dashboard', hoperfy: true, competitors: false },
        { label: 'White-label branding', hoperfy: true, competitors: false },
        { label: 'Built-in hotel booking', hoperfy: true, competitors: false },
        { label: 'QR check-in', hoperfy: true, competitors: true },
        { label: 'Dynamic pricing', hoperfy: true, competitors: true },
      ],
    },
  },
}

/** Builds the JSON-LD @graph (SoftwareApplication + FAQPage) for a product. */
export function buildProductJsonLd(geo: ProductGeo) {
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
    ],
  }
}
