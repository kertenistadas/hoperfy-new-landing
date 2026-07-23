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
      title: 'White-Label Hotel Booking Software for Events | Hoperfy',
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
        question: 'What is white-label hotel booking for events?',
        answer:
          'White-label hotel booking for events means your attendees book hotels through a page that looks and feels like your event brand — your logo, your colors, your domain — without being redirected to Booking.com, Expedia, or any third-party platform. Hoperfy provides this as a managed service for event teams.',
      },
      {
        question: 'How is Hoperfy different from Cvent Passkey?',
        answer:
          "Hoperfy is simpler to set up, faster to go live, and doesn't require enterprise contracts. Unlike Cvent Passkey, Hoperfy also combines hotel booking with event ticketing in one platform, and charges a flat fee instead of taking commission on bookings.",
      },
      {
        question: 'How long does it take to set up hotel booking for my event?',
        answer:
          'Most event teams get their branded hotel booking page live within 24 to 48 hours. You share your event details and hotel contracts, and the Hoperfy team handles the setup. No developers or technical work required on your side.',
      },
      {
        question: 'Does Hoperfy charge commission on hotel bookings?',
        answer:
          'No. Hoperfy charges a flat platform fee. We never take a percentage of your hotel revenue. Every margin point from your negotiated rates stays with you.',
      },
    ],
    compare: {
      competitors: ['Cvent Passkey / EventPipe'],
      features: [
        { label: 'White-label branding', hoperfy: true, competitors: false },
        { label: 'Zero commission fees', hoperfy: true, competitors: false },
        { label: 'Setup in under 48 hours', hoperfy: true, competitors: false },
        { label: 'Built-in event ticketing', hoperfy: true, competitors: false },
        { label: 'Managed setup by our team', hoperfy: true, competitors: false },
        { label: 'Real-time room block tracking', hoperfy: true, competitors: true },
        { label: 'Negotiated rate management', hoperfy: true, competitors: true },
      ],
    },
  },
  'ticketing-for-events': {
    metadata: {
      title: 'Multi-Platform Event Ticketing Software | Hoperfy',
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
          'For professional event teams running their own events, yes. Hoperfy gives you more control over branding, instant payouts instead of delayed settlements, no percentage fees on ticket sales, and unified data across every sales channel — things Eventbrite does not offer.',
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
          'Hoperfy works best for professional event teams running events with 200 or more attendees — conferences, trade shows, festivals, corporate events, and sports tournaments. It is not designed for one-off personal events.',
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
