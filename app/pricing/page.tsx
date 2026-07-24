import type { Metadata } from 'next'
import { client } from '@/sanity/lib/client'
import { pricingQuery } from '@/sanity/lib/queries'
import { fallbackPricing } from '@/sanity/lib/fallbackPricing'
import type { Pricing } from '@/types'
import NavWrapper from '@/components/NavWrapper'
import PricingCards from '@/components/PricingCards'
import ProductFAQ from '@/components/product/ProductFAQ'
import CTAButtons from '@/components/CTAButtons'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Pricing — Simple, transparent pricing | Hoperfy',
  description:
    'Hotel booking for events is free. Ticketing is 2.5% per ticket. No monthly fees, no hidden charges, no surprises.',
  alternates: { canonical: 'https://hoperfy.com/pricing' },
}

type ComparisonRow = {
  feature: string
  hoperfy: string
  eventbrite: string
  cvent: string
}

const comparisonRows: ComparisonRow[] = [
  { feature: 'Hotel booking fee', hoperfy: 'Free', eventbrite: 'N/A', cvent: 'Commission-based' },
  { feature: 'Ticket fee', hoperfy: '2.5%', eventbrite: '3.7% + €0.99', cvent: 'Custom / high' },
  { feature: 'Instant payouts', hoperfy: '✓', eventbrite: '✗', cvent: '✗' },
  { feature: 'White-label branding', hoperfy: '✓', eventbrite: '✗', cvent: 'Partial' },
  { feature: 'Managed setup', hoperfy: '✓', eventbrite: '✗', cvent: '✗' },
  { feature: 'Hotels + ticketing in one platform', hoperfy: '✓', eventbrite: '✗', cvent: '✗' },
  { feature: 'Monthly fee', hoperfy: 'None', eventbrite: 'None', cvent: 'Yes' },
  { feature: 'Lock-in contract', hoperfy: 'None', eventbrite: 'None', cvent: 'Yes' },
]

const pricingFaqs = [
  {
    question: 'How is hotel booking free?',
    answer:
      'Hoperfy earns through its hotel network partnerships. You get a fully managed, white-label hotel booking experience at no cost — and you keep hotel revenue.',
  },
  {
    question: 'Are there any hidden fees on ticketing?',
    answer:
      'No. The 2.5% fee is all-in. No setup fee, no monthly fee, no payout fee, no fee on refunds. You always know exactly what you are paying.',
  },
  {
    question: 'What is included in managed setup?',
    answer:
      'Our team builds your hotel booking page or ticketing setup for you. We handle the configuration, branding, and hotel connections. Most setups go live within 5mins - 1hour.',
  },
  {
    question: 'Is there a minimum event size?',
    answer:
      'Hoperfy works with small / medium / large events, our biggest partner event is 70000 attendees, smallest 20.',
  },
  {
    question: 'Can I use both products together?',
    answer:
      'Yes. Many event teams use both hotel booking and ticketing through Hoperfy. Hotel booking stays free, and ticketing is still 2.5% per ticket.',
  },
  {
    question: 'Is there a long-term contract?',
    answer:
      'No. There are no lock-in contracts. You pay per event or per ticket — nothing more.',
  },
]

/** Renders a competitor-column cell, coloring the ✓ / ✗ marks. */
function CompareCell({ value }: { value: string }) {
  if (value === '✓') return <span className="text-[#1a6cf5]">✓</span>
  if (value === '✗') return <span className="text-[#9ca3af]">✗</span>
  return <span className="text-[#374151]">{value}</span>
}

export default async function PricingPage() {
  const sanityPricing = await client.fetch<Pricing[]>(pricingQuery).catch(() => [])
  const pricing = sanityPricing && sanityPricing.length > 0 ? sanityPricing : fallbackPricing

  return (
    <NavWrapper>
      <main>
        {/* Hero */}
        <section className="max-w-2xl mx-auto text-center pt-32 pb-16 px-6">
          <p className="eyebrow mb-3">Pricing</p>
          <h1 className="text-[2rem] md:text-[3rem] font-black tracking-tight text-[#0a0a0a] mb-4">
            Simple pricing. No surprises.
          </h1>
          <p className="text-[16px] font-light text-[#6b7280]">
            Hotel booking is free. Ticketing is 2.5% per ticket. Use both together and manage
            everything from one place.
          </p>
        </section>

        {/* Pricing cards */}
        <section className="max-w-6xl mx-auto px-6 pb-24">
          <PricingCards pricing={pricing} />
        </section>

        {/* Comparison table */}
        <section className="py-24 px-6 border-t border-[#e5e7eb]">
          <div className="max-w-3xl mx-auto">
            <div className="mb-12">
              <p className="eyebrow mb-3">Compare</p>
              <h2 className="text-[1.75rem] md:text-[2.25rem] font-black tracking-tight text-[#0a0a0a]">
                See how we compare to the competition
              </h2>
            </div>

            <div className="border border-[#e5e7eb] rounded-xl overflow-hidden overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#f9fafb] text-[12px] font-semibold uppercase tracking-wider text-[#6b7280]">
                    <th className="py-4 px-5">Feature</th>
                    <th className="py-4 px-5">Hoperfy</th>
                    <th className="py-4 px-5">Eventbrite</th>
                    <th className="py-4 px-5">Cvent Passkey</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row, i) => (
                    <tr key={row.feature} className={i % 2 === 0 ? 'bg-white' : 'bg-[#f9fafb]'}>
                      <td className="py-4 px-5 text-[14px] text-[#374151]">{row.feature}</td>
                      <td className="py-4 px-5 text-[14px] text-[#1a6cf5] font-semibold">
                        {row.hoperfy}
                      </td>
                      <td className="py-4 px-5 text-[14px]">
                        <CompareCell value={row.eventbrite} />
                      </td>
                      <td className="py-4 px-5 text-[14px]">
                        <CompareCell value={row.cvent} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <ProductFAQ faqs={pricingFaqs} title="Questions about pricing" />

        {/* Final CTA */}
        <section className="bg-[#0a0a0a] text-white py-24 px-6">
          <div className="max-w-2xl mx-auto text-center">
            <p className="eyebrow mb-3 text-[#4d8ef7]">Get started</p>
            <h2 className="text-[1.75rem] md:text-[2.25rem] font-black tracking-tight text-white mb-4">
              Start with hotels for free.
            </h2>
            <p className="text-[16px] font-light text-white/60 mb-8">
              Add ticketing when you are ready. No contracts, no monthly fees.
            </p>
            <CTAButtons source="pricing-cta" darkMode />
          </div>
        </section>
      </main>
    </NavWrapper>
  )
}
