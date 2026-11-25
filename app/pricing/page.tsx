import type { Metadata } from 'next'
import NavWrapper from '@/components/NavWrapper'
import PricingGrid from '@/components/PricingGrid'
import ProductFAQ from '@/components/product/ProductFAQ'
import CTAButtons from '@/components/CTAButtons'
import CompetitorCheckNote from '@/components/CompetitorCheckNote'
import RelatedComparisons from '@/components/compare/RelatedComparisons'

export const metadata: Metadata = {
  title: { absolute: 'Pricing — Simple, transparent pricing | Hoperfy' },
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

// Competitor cells are checked against each competitor's own published pages
// (see CompetitorCheckNote). Unverifiable cells say "Not publicly listed".
const comparisonRows: ComparisonRow[] = [
  { feature: 'Ticketing fee, excluding payment processing', hoperfy: '2%', eventbrite: 'US: 3.7% + $1.79 per ticket', cvent: 'Quote-based' },
  { feature: 'Hotels + ticketing in one platform', hoperfy: '✓', eventbrite: 'Not publicly listed', cvent: 'With Cvent Registration' },
  { feature: 'Free events', hoperfy: 'Free', eventbrite: 'US: Free', cvent: 'Per-registration fee' },
  { feature: 'Instant payouts', hoperfy: '✓ As tickets sell', eventbrite: '✓', cvent: 'Not publicly listed' },
  { feature: 'White-label branding', hoperfy: '✓', eventbrite: 'Branded checkout widget', cvent: 'Custom branded booking site' },
  { feature: 'Monthly fee', hoperfy: 'None', eventbrite: 'US: optional plans from $15/month', cvent: 'Not publicly listed' },
  { feature: 'Payment processing fee', hoperfy: '0.1%–2.9%', eventbrite: 'US: 2.9% per order', cvent: 'Not publicly listed' },
]

const pricingFaqs = [
  {
    question: 'Are there any hidden fees on ticketing?',
    answer:
      'No. You pay 2.5% per paid ticket, or 2% if you also use Hoperfy hotel booking. On top of that, your bank or payment provider charges a processing fee of 0.1% to 2.9%, depending on your location, card type and currency. No setup fee, no monthly fee, no payout fee, no fee on refunds.',
  },
  {
    question: 'What payment processing fees apply?',
    answer: 'Hoperfy uses Stripe for card payment processing and accepts direct payments. Banks charge between 0.1% and 2.9% per transaction depending on your location, card type, and transfer currency. You can also connect your own payment provider if you prefer.',
  },
  {
    question: 'Can I use both products together?',
    answer: 'Yes. Many event teams use both hotel booking and ticketing through Hoperfy. Hotel booking stays free but the payout goes from 30% to 50% per booking, and ticketing goes down from 2.5% to 2% per ticket.',
  },
  {
    question: 'Is there a long-term contract?',
    answer: 'No. There are no lock-in contracts.',
  },
]

/** Renders a competitor-column cell, coloring the ✓ / ✗ marks. */
function CompareCell({ value }: { value: string }) {
  if (value === '✓') return <span className="text-[#1a6cf5]">✓</span>
  if (value === '✗') return <span className="text-[#9ca3af]">✗</span>
  return <span className="text-[#374151]">{value}</span>
}

export default function PricingPage() {
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
        <PricingGrid />

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
                    <th className="py-4 px-5">Cvent</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row, i) => (
                    <tr key={row.feature} className={i % 2 === 0 ? 'bg-white' : 'bg-[#f9fafb]'}>
                      <td className="py-4 px-5 text-[14px] text-[#374151]">{row.feature}</td>
                      <td className="py-4 px-5 text-[14px]">
                        {row.hoperfy.startsWith('✓') ? (
                          <span className="font-semibold text-[#1a6cf5]">{row.hoperfy}</span>
                        ) : (
                          <span className="font-semibold text-[#0a0a0a]">{row.hoperfy}</span>
                        )}
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
            <p className="mt-4 text-[12px] text-[#9ca3af]">
              Cvent Passkey for hotel rooms, Cvent Registration for tickets.
            </p>
            <CompetitorCheckNote className="mt-1" />

            <div className="mt-8">
              <p className="text-[14px] text-[#6b7280]">Comparing platforms in more detail?</p>
              <RelatedComparisons product="ticketing-for-events" location="pricing" className="mt-3" />
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
