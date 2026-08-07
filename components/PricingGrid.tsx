'use client'

import { useState } from 'react'
import OnboardingModal from '@/components/OnboardingModal'

export default function PricingGrid() {
  const [modalOpen, setModalOpen] = useState(false)
  const [preselectedProduct, setPreselectedProduct] = useState<'hotels' | 'ticketing' | 'both' | undefined>(undefined)

  return (
    <>
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6 items-stretch">

            {/* Card 1 — Full Suite — highlighted */}
            <div className="relative border-2 border-[#1a6cf5] rounded-2xl p-8 bg-white shadow-lg shadow-blue-500/10 flex flex-col">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="bg-[#1a6cf5] text-white text-[11px] font-bold uppercase tracking-widest px-4 py-1 rounded-full">
                  Most popular
                </span>
              </div>

              <p className="eyebrow mb-2">Full Suite</p>
              <p className="text-[13px] font-light text-[#6b7280] mb-6">Hotels + Ticketing together</p>

              <div className="border-t border-[#e5e7eb] pt-6 mb-6 space-y-4">
                <div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-[2.5rem] font-black text-[#0a0a0a] leading-none">2%</span>
                    <span className="text-[13px] text-[#6b7280]">per ticket</span>
                  </div>
                  <p className="text-[11px] text-[#9ca3af] mt-1">Ticketing fee</p>
                </div>
                <div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-[2.5rem] font-black text-green-600 leading-none">50%</span>
                    <span className="text-[13px] text-[#6b7280]">payout</span>
                  </div>
                  <p className="text-[11px] text-[#9ca3af] mt-1">Hotel revenue share</p>
                </div>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {[
                  'Everything in Hotels + Ticketing',
                  'Reduced 2% ticket fee (vs 2.5% separately)',
                  'Higher 50% hotel payout (vs 30% separately)',
                  'One dashboard for hotels and tickets',
                  'One team, one setup, one point of contact',
                ].map((f, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="text-[#1a6cf5] font-bold text-[13px] shrink-0 mt-0.5">✓</span>
                    <span className="text-[13px] text-[#374151]">{f}</span>
                  </li>
                ))}
              </ul>

              <button
                className="w-full h-12 bg-[#1a6cf5] text-white rounded-lg font-medium text-[14px] hover:bg-[#1558cc] transition-colors"
                onClick={() => { setPreselectedProduct('both'); setModalOpen(true) }}
              >
                Get the full suite
              </button>
            </div>

            {/* Card 2 — Ticketing */}
            <div className="border border-[#e5e7eb] rounded-2xl p-8 bg-white flex flex-col">
              <p className="eyebrow mb-2">Ticketing</p>
              <p className="text-[13px] font-light text-[#6b7280] mb-6">Multi-platform ticket sales</p>

              <div className="border-t border-[#e5e7eb] pt-6 mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-[2.5rem] font-black text-[#0a0a0a] leading-none">2.5%</span>
                  <span className="text-[13px] text-[#6b7280]">per ticket</span>
                </div>
                <p className="text-[11px] text-[#9ca3af] mt-1">Platform fee on paid tickets only</p>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {[
                  'Free for free events — no fees',
                  'Multi-channel ticket sales from one dashboard',
                  'Dynamic pricing and capacity controls',
                  'Instant payouts as tickets sell',
                  'Unified attendee data across all channels',
                  'QR check-in and scanner app',
                  'Multiple ticket types per event',
                  'Announcements to all attendees',
                  'Invoicing and receipt generation',
                  'Managed setup by our team',
                ].map((f, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="text-[#1a6cf5] font-bold text-[13px] shrink-0 mt-0.5">✓</span>
                    <span className="text-[13px] text-[#374151]">{f}</span>
                  </li>
                ))}
              </ul>

              <button
                className="w-full h-12 border border-[#e5e7eb] text-[#0a0a0a] rounded-lg font-medium text-[14px] hover:border-[#0a0a0a] transition-colors"
                onClick={() => { setPreselectedProduct('ticketing'); setModalOpen(true) }}
              >
                Start selling tickets
              </button>
            </div>

            {/* Card 3 — Hotels */}
            <div className="border border-[#e5e7eb] rounded-2xl p-8 bg-white flex flex-col">
              <p className="eyebrow mb-2">Hotels</p>
              <p className="text-[13px] font-light text-[#6b7280] mb-6">White-label hotel booking</p>

              <div className="border-t border-[#e5e7eb] pt-6 mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-[2.5rem] font-black text-green-600 leading-none">30%</span>
                  <span className="text-[13px] text-[#6b7280]">hotel payout</span>
                </div>
                <p className="text-[11px] text-[#9ca3af] mt-1">You earn 30% of hotel booking profits</p>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {[
                  'Free to set up — no platform fee',
                  '2,000,000+ hotel properties worldwide',
                  'We contract hotels on your behalf',
                  'White-label booking page — your brand',
                  'Real-time room block tracking',
                  'Automated rooming list exports',
                  'Full delegate customer service by Hoperfy',
                  'Cancellations and refunds handled for you',
                  'Payments managed by Hoperfy',
                  'Live in 5 minutes',
                ].map((f, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="text-green-600 font-bold text-[13px] shrink-0 mt-0.5">✓</span>
                    <span className="text-[13px] text-[#374151]">{f}</span>
                  </li>
                ))}
              </ul>

              <button
                className="w-full h-12 border border-[#e5e7eb] text-[#0a0a0a] rounded-lg font-medium text-[14px] hover:border-[#0a0a0a] transition-colors"
                onClick={() => { setPreselectedProduct('hotels'); setModalOpen(true) }}
              >
                Set up hotel booking free
              </button>
            </div>

          </div>

          <p className="text-[11px] text-[#9ca3af] mt-6 max-w-2xl mx-auto text-center">
            * Bank processing fees may vary between 0.1% and 2.9% depending on your country, card type, and payment provider. These are charged directly by Stripe or your connected payment gateway — not by Hoperfy. Free events are never charged a platform fee.
          </p>
        </div>
      </section>

      <OnboardingModal
        isOpen={modalOpen}
        onClose={() => { setModalOpen(false); setPreselectedProduct(undefined) }}
        source="pricing-page"
        initialProductInterest={preselectedProduct}
      />
    </>
  )
}
