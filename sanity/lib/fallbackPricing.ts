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
    tagline: 'We set it up. You keep the revenue.',
    highlighted: false,
    includes: [
      'White-label hotel booking page',
      'Negotiated rate management',
      'Real-time room block tracking',
      'Automated rooming list exports',
      'Managed setup by our team',
      'Unlimited bookings',
      'Full customer service handled by Hoperfy',
      'Cancellations, changes, and payments managed for you',
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
  {
    _id: 'both-pricing',
    price: 'Free + 2.5%',
    priceSuffix: 'hotels free · 2.5% per ticket',
    tagline: 'The complete event commerce suite.',
    highlighted: false,
    includes: [
      'Everything in Hotels for Events',
      'Everything in Ticketing for Events',
      'Single dashboard for hotels and tickets',
      'One team, one setup, one point of contact',
      'Full customer service handled by Hoperfy',
      'Priority support',
    ],
    cta: 'Get the full suite',
    product: { title: 'Hotels + Ticketing', slug: 'both', tagline: 'Complete event commerce' },
  },
]

export const fallbackPricingBySlug: Record<string, Pricing> = {
  'hotels-for-events': fallbackPricing[0],
  'ticketing-for-events': fallbackPricing[1],
}
