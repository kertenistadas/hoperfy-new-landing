'use client'

import Link from 'next/link'
import { useState } from 'react'
import OnboardingModal from '@/components/OnboardingModal'
import type { Product } from '@/types'

type Props = {
  products: Product[]
}

export default function ProductsSection({ products }: Props) {
  const [modalOpen, setModalOpen] = useState(false)

  // The three blocks below use hardcoded copy; `products` is accepted so the
  // homepage can keep passing Sanity data for future use.
  void products

  return (
    <section id="products" className="border-t border-[#e5e7eb]">
      {/* BLOCK 1 — Full Suite — dark, full width */}
      <div className="bg-[#0a0a0a] px-6 py-24">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Left — copy */}
            <div>
              <p className="eyebrow mb-4" style={{ color: '#4d8ef7' }}>Full event commerce suite</p>
              <h2 className="text-[2rem] md:text-[2.75rem] font-black tracking-tight text-white leading-[1.05] mb-6">
                Take both. Pay less.
              </h2>
              <p className="text-[15px] font-light mb-10" style={{ color: 'rgba(255,255,255,0.6)' }}>
                When you use Hoperfy for hotels and ticketing together, you get better rates on both. Most event teams start with one and add the other within their first event.
              </p>

              {/* Comparison table */}
              <div className="border rounded-xl overflow-hidden mb-10" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
                <div className="grid grid-cols-3 text-[11px] font-semibold uppercase tracking-wider px-4 py-3" style={{ color: 'rgba(255,255,255,0.3)', background: 'rgba(255,255,255,0.03)' }}>
                  <span></span>
                  <span className="text-center text-[#4d8ef7]">Full Suite</span>
                  <span className="text-center">Separately</span>
                </div>
                <div className="grid grid-cols-3 px-4 py-3 border-t" style={{ borderColor: 'rgba(255,255,255,0.07)' }}>
                  <span className="text-[13px]" style={{ color: 'rgba(255,255,255,0.5)' }}>Ticket fee</span>
                  <span className="text-center text-[13px] font-bold text-white">2%</span>
                  <span className="text-center text-[13px]" style={{ color: 'rgba(255,255,255,0.3)' }}>2.5%</span>
                </div>
                <div className="grid grid-cols-3 px-4 py-3 border-t" style={{ borderColor: 'rgba(255,255,255,0.07)' }}>
                  <span className="text-[13px]" style={{ color: 'rgba(255,255,255,0.5)' }}>Hotel payout</span>
                  <span className="text-center text-[13px] font-bold text-white">50%</span>
                  <span className="text-center text-[13px]" style={{ color: 'rgba(255,255,255,0.3)' }}>30%</span>
                </div>
                <div className="grid grid-cols-3 px-4 py-3 border-t" style={{ borderColor: 'rgba(255,255,255,0.07)' }}>
                  <span className="text-[13px]" style={{ color: 'rgba(255,255,255,0.5)' }}>Setup time</span>
                  <span className="text-center text-[13px] font-bold text-white">5 min</span>
                  <span className="text-center text-[13px]" style={{ color: 'rgba(255,255,255,0.3)' }}>5 min each</span>
                </div>
              </div>

              {/* Trust signals */}
              <div className="flex flex-wrap gap-4 mb-10">
                {[
                  'Works for 20 to 70,000 attendees',
                  'No credit card required',
                  'No commitment',
                  'Cancel any time',
                ].map((item, i) => (
                  <span key={i} className="flex items-center gap-1.5 text-[12px]" style={{ color: 'rgba(255,255,255,0.5)' }}>
                    <span className="text-[#1a6cf5]">✓</span> {item}
                  </span>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => setModalOpen(true)}
                  className="h-12 px-8 text-[14px] font-medium bg-[#1a6cf5] text-white rounded-lg hover:bg-[#1558cc] transition-colors"
                >
                  Get the full suite
                </button>
                <a
                  href="https://calendly.com/tadas-hoperfy/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-12 px-8 text-[14px] font-medium border text-white rounded-lg hover:bg-white/10 transition-colors flex items-center justify-center"
                  style={{ borderColor: 'rgba(255,255,255,0.2)' }}
                >
                  Book a demo
                </a>
              </div>
            </div>

            {/* Right — two product screenshots, stacked and rotated */}
            <div className="relative h-[420px] md:h-[500px]">
              {/* Subtle glow behind images */}
              <div
                className="absolute inset-0 rounded-full blur-3xl opacity-20"
                style={{ background: 'radial-gradient(circle, #1a6cf5 0%, transparent 70%)' }}
              />

              {/* Hotels screenshot — top, slightly rotated left */}
              <div
                className="absolute top-0 left-0 right-8 rounded-2xl overflow-hidden shadow-2xl shadow-black/40"
                style={{
                  transform: 'rotate(-1.5deg)',
                  maskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)',
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/product-screenshot.png"
                  alt="Hoperfy hotel booking platform"
                  className="w-full h-auto"
                />
              </div>

              {/* Ticketing screenshot — bottom, slightly rotated right, overlapping */}
              <div
                className="absolute bottom-0 left-8 right-0 rounded-2xl overflow-hidden shadow-2xl shadow-black/40"
                style={{
                  transform: 'rotate(1.5deg)',
                  maskImage: 'linear-gradient(to top, black 70%, transparent 100%)',
                  WebkitMaskImage: 'linear-gradient(to top, black 70%, transparent 100%)',
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/ticketing-screenshot.png"
                  alt="Hoperfy ticketing platform"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BLOCK 2 & 3 — Hotels and Ticketing side by side */}
      <div className="grid md:grid-cols-2">
        {/* Hotels — white bg */}
        <div className="px-10 py-16 border-r border-[#e5e7eb]">
          <p className="eyebrow mb-3">Hotels for Events</p>
          <h3 className="text-[1.5rem] font-black tracking-tight text-[#0a0a0a] mb-3">
            Just need hotel booking?
          </h3>
          <p className="text-[14px] font-light text-[#6b7280] leading-relaxed mb-2">
            White-label hotel booking for your event. We contract the hotels, build the booking page, and handle all delegate support.
          </p>
          <p className="text-[13px] font-medium text-[#1a6cf5] mb-8">
            Free to set up. 30% hotel profit payout.
          </p>
          <ul className="space-y-2.5 mb-8">
            {[
              'White-label booking page — your brand',
              '2,000,000+ hotels worldwide',
              'We contract hotels on your behalf',
              'Full delegate customer service',
              'Cancellations and refunds handled',
            ].map((f, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <span className="text-[#1a6cf5] text-[13px] shrink-0 mt-0.5">✓</span>
                <span className="text-[13px] text-[#374151]">{f}</span>
              </li>
            ))}
          </ul>
          <Link
            href="/products/hotels-for-events"
            className="text-[13px] font-medium text-[#1a6cf5] hover:underline"
          >
            Learn more about Hotels for Events →
          </Link>
        </div>

        {/* Ticketing — light gray bg */}
        <div className="px-10 py-16 bg-[#f9fafb]">
          <p className="eyebrow mb-3">Ticketing for Events</p>
          <h3 className="text-[1.5rem] font-black tracking-tight text-[#0a0a0a] mb-3">
            Just need ticketing?
          </h3>
          <p className="text-[14px] font-light text-[#6b7280] leading-relaxed mb-2">
            Multi-channel ticket sales with instant payouts, unified attendee data, and no monthly fees.
          </p>
          <p className="text-[13px] font-medium text-[#1a6cf5] mb-8">
            2.5% per ticket. No other fees.
          </p>
          <ul className="space-y-2.5 mb-8">
            {[
              'Sell across all channels from one place',
              'Instant payouts as tickets sell',
              'Dynamic pricing and capacity controls',
              'Unified attendee data',
              'QR check-in and access management',
            ].map((f, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <span className="text-[#1a6cf5] text-[13px] shrink-0 mt-0.5">✓</span>
                <span className="text-[13px] text-[#374151]">{f}</span>
              </li>
            ))}
          </ul>
          <Link
            href="/products/ticketing-for-events"
            className="text-[13px] font-medium text-[#1a6cf5] hover:underline"
          >
            Learn more about Ticketing for Events →
          </Link>
        </div>
      </div>

      <OnboardingModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        source="homepage-products"
      />
    </section>
  )
}
