'use client'

import { useState } from 'react'
import { useTicketingFee } from './TicketingFeeContext'
import OnboardingModal from '@/components/OnboardingModal'

function fmt(value: number, currency: string) {
  return `${currency}${Math.round(Math.abs(value)).toLocaleString()}`
}

export default function TicketingFeeSummary() {
  const {
    savings,
    currency,
    hoperfyTotal,
    competitorTotal,
    platformLabel,
    ticketsSold,
    ticketPrice,
    platform,
  } = useTicketingFee()

  const hotelProfit = Math.round(ticketsSold * 0.3 * 2 * ticketPrice * 2 * 0.10)
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <>
    <section className="py-20 px-6 bg-[#f9fafb] border-t border-[#e5e7eb]">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* Left column */}
          <div>
            {platform === 'diy' ? (
              <>
                <p className="eyebrow mb-3">You could be earning more</p>
                <h2 className="text-[1.75rem] md:text-[2.25rem] font-black tracking-tight text-[#0a0a0a] mb-4">
                  Your attendees are already spending on hotels
                </h2>
                <p className="text-[15px] font-light text-[#6b7280] leading-relaxed mb-6">
                  If {Math.round(ticketsSold * 0.3).toLocaleString()} of your attendees book hotels for {currency}{Math.round(ticketPrice * 2)} avg spend per night, that&apos;s{' '}
                  <span className="font-semibold text-[#0a0a0a]">
                    {currency}{hotelProfit.toLocaleString()} in hotel profit
                  </span>{' '}
                  you could be earning — for free.
                </p>
                <p className="text-[14px] text-[#6b7280] font-light mb-6">
                  Hoperfy hotel booking is free to set up. You earn 30–50% of hotel booking profits. No extra work for your team.
                </p>
                <a
                  href="/products/hotels-for-events"
                  className="text-[13px] font-medium text-[#1a6cf5] hover:underline"
                >
                  Learn about hotel booking for events →
                </a>
              </>
            ) : (
              <>
                <p className="eyebrow mb-3">At your numbers</p>
                <h2 className="text-[1.75rem] md:text-[2.25rem] font-black tracking-tight text-[#0a0a0a] mb-4">
                  You earn {fmt(savings, currency)} more with Hoperfy
                </h2>
                <p className="text-[15px] font-light text-[#6b7280] leading-relaxed mb-4">
                  On {ticketsSold.toLocaleString()} tickets at {currency}{ticketPrice}, Hoperfy&apos;s total fees are {fmt(hoperfyTotal, currency)} vs {fmt(competitorTotal, currency)} with {platformLabel}. That&apos;s {fmt(savings, currency)} that stays in your account — paid out as tickets sell.
                </p>
                <p className="text-[13px] text-[#6b7280] mt-4">
                  Add hotel booking for free and earn an extra{' '}
                  <span className="font-semibold text-[#0a0a0a]">
                    {currency}{hotelProfit.toLocaleString()}
                  </span>{' '}
                  in hotel profit on top.{' '}
                  <button
                    onClick={() => setModalOpen(true)}
                    className="text-[#1a6cf5] hover:underline text-[13px]"
                  >
                    Learn more →
                  </button>
                </p>
              </>
            )}
          </div>

          {/* Right column */}
          <div className="flex flex-col gap-4">
            {platform === 'diy' ? (
              <div className="bg-[#eef4ff] border border-[#b8d0fe] rounded-xl p-6 text-center">
                <p className="text-[11px] font-semibold text-[#1a6cf5] uppercase tracking-wider mb-2">Estimated hotel profit</p>
                <p className="text-[3rem] font-black text-[#1a6cf5] leading-none">
                  {currency}{hotelProfit.toLocaleString()}
                </p>
                <p className="text-[12px] text-[#6b7280] mt-2">
                  estimated hotel profit per event (10% of booking revenue)
                </p>
                <a
                  href="/products/hotels-for-events"
                  className="mt-4 inline-block text-[13px] font-medium bg-[#1a6cf5] text-white px-6 py-2.5 rounded-lg hover:bg-[#1558cc] transition-colors"
                >
                  Add hotel booking — it&apos;s free →
                </a>
              </div>
            ) : (
              <>
                <div className="bg-[#eef4ff] border border-[#b8d0fe] rounded-xl p-5">
                  <p className="text-[10px] font-semibold text-[#1a6cf5] uppercase tracking-widest mb-1">You keep with Hoperfy</p>
                  <p className="text-[2.5rem] font-black text-[#1a6cf5] leading-none">{fmt(savings, currency)}</p>
                  <p className="text-[11px] text-[#6b7280] mt-1">more vs {platformLabel}</p>
                </div>

<div className="bg-white border border-[#e5e7eb] rounded-xl p-5">
                  <p className="text-[10px] font-semibold text-[#6b7280] uppercase tracking-widest mb-1">Possible hotel profit on top</p>
                  <p className="text-[2rem] font-black text-[#0a0a0a] leading-none">
                    +{currency}{hotelProfit.toLocaleString()}
                  </p>
                  <p className="text-[11px] text-[#6b7280] mt-1">estimated if you add hotel booking (free)</p>
                </div>
              </>
            )}
          </div>

        </div>
      </div>
    </section>

    <OnboardingModal
      isOpen={modalOpen}
      onClose={() => setModalOpen(false)}
      source="ticketing-hotel-upsell"
      initialProductInterest="both"
    />
    </>
  )
}
