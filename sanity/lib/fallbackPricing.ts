import type { Pricing } from '@/types'

/**
 * Hardcoded pricing used when Sanity has no `pricing` documents yet. Shared by
 * the /pricing page and the per-product ProductPricing section so the two never
 * drift.
 */
export const fallbackPricing: Pricing[] = [
  {
    _id: 'hotels-pricing',
    price: 'Free',
    priceSuffix: 'forever',
    tagline: 'We set it up. You keep 100% of the revenue.',
    highlighted: false,
    includes: [
      'White-label hotel booking page',
      'Negotiated rate management',
      'Real-time room block tracking',
      'Automated rooming list exports',
      'Managed setup by our team',
      'Unlimited bookings',
    ],
    cta: 'Get started free',
    product: { title: 'Hotels for Events', slug: 'hotels-for-events', tagline: 'White-label hotel booking' },
  },
  {
    _id: 'ticketing-pricing',
    price: '2.5%',
    priceSuffix: 'per ticket sold',
    tagline: 'Half the fee. Twice the control.',
    highlighted: true,
    includes: [
      'Multi-channel ticket sales',
      'Dynamic pricing and capacity controls',
      'Unified attendee data',
      'Instant payouts',
      'QR check-in and access management',
      'Managed setup by our team',
    ],
    cta: 'Start selling tickets',
    product: { title: 'Ticketing for Events', slug: 'ticketing-for-events', tagline: 'Multi-platform ticket sales' },
  },
]

export const fallbackPricingBySlug: Record<string, Pricing> = {
  'hotels-for-events': fallbackPricing[0],
  'ticketing-for-events': fallbackPricing[1],
}
