import type { Metadata } from 'next'

/**
 * Site-wide openGraph defaults. Deliberately has no `url`: metadata merges
 * shallowly, so anything here is inherited by every route that omits openGraph.
 * A route that sets its own openGraph replaces this object, so spread it back in.
 */
export const siteOpenGraph = {
  locale: 'en_US',
  type: 'website',
  siteName: 'Hoperfy',
  title: 'Hoperfy — Hotel Booking & Ticketing for Event Teams',
  description: 'White-label hotel booking and multi-platform ticketing built for event teams. Sell more, manage less.',
  images: [{ url: 'https://hoperfy.com/og-image.png', width: 1200, height: 630, alt: 'Hoperfy — Event Commerce Platform' }],
} satisfies Metadata['openGraph']
