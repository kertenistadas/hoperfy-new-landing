'use client'

import Link from 'next/link'
import { useTicketingFee } from './TicketingFeeContext'

function fmt(value: number, currency: string) {
  return `${currency}${Math.round(Math.abs(value)).toLocaleString()}`
}

export default function TicketingFeeSummary() {
  const {
    savings,
    isNegative,
    currency,
    gross,
    hoperfyTotal,
    competitorTotal,
    platformLabel,
    payoutDelayDays,
    ticketsSold,
    ticketPrice,
  } = useTicketingFee()

  return (
    <section className="py-20 px-6 bg-[#f9fafb] border-t border-[#e5e7eb]">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left — dynamic result */}
          <div>
            <p className="eyebrow mb-3">At your numbers</p>
            <h2 className="text-[1.75rem] md:text-[2.25rem] font-black tracking-tight text-[#0a0a0a] mb-4">
              {isNegative
                ? `Hoperfy costs ${fmt(Math.abs(savings), currency)} more than ${platformLabel}`
                : `You keep ${fmt(savings, currency)} more with Hoperfy`}
            </h2>
            <p className="text-[15px] font-light text-[#6b7280] leading-relaxed mb-6">
              {isNegative
                ? `At ${ticketsSold.toLocaleString()} tickets at ${currency}${ticketPrice}, a ${platformLabel.toLowerCase()} has lower platform fees. The trade-off is a ${payoutDelayDays}-day payout delay and no hotel revenue layer. Talk to us if you are at this scale.`
                : `On ${ticketsSold.toLocaleString()} tickets at ${currency}${ticketPrice}, Hoperfy's fees are ${fmt(hoperfyTotal, currency)} vs ${fmt(competitorTotal, currency)} with ${platformLabel}. That ${fmt(savings, currency)} lands in your account as tickets sell — not ${payoutDelayDays} days after your event.`}
            </p>
            <Link
              href="https://calendly.com/tadas-hoperfy/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13px] font-medium text-[#1a6cf5] hover:underline"
            >
              Book 30 minutes to talk through your numbers →
            </Link>
          </div>

          {/* Right — breakdown */}
          <div className="space-y-3">
            <div className="bg-white border border-[#e5e7eb] rounded-xl p-5">
              <div className="flex justify-between items-center mb-3">
                <p className="text-[13px] font-semibold text-[#0a0a0a]">Hoperfy</p>
                <p className="text-[13px] font-black text-[#1a6cf5]">{fmt(hoperfyTotal, currency)}</p>
              </div>
              <div className="h-2 bg-[#eef4ff] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#1a6cf5] rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(100, (hoperfyTotal / Math.max(hoperfyTotal, competitorTotal, 1)) * 100)}%` }}
                />
              </div>
              <p className="text-[11px] text-[#6b7280] mt-1.5">Paid out instantly as tickets sell</p>
            </div>

            <div className="bg-white border border-[#e5e7eb] rounded-xl p-5">
              <div className="flex justify-between items-center mb-3">
                <p className="text-[13px] font-semibold text-[#0a0a0a]">{platformLabel}</p>
                <p className="text-[13px] font-black text-[#0a0a0a]">{fmt(competitorTotal, currency)}</p>
              </div>
              <div className="h-2 bg-[#f3f4f6] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#374151] rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(100, (competitorTotal / Math.max(hoperfyTotal, competitorTotal, 1)) * 100)}%` }}
                />
              </div>
              <p className="text-[11px] text-[#6b7280] mt-1.5">Released {payoutDelayDays} days after your event</p>
            </div>

            <div className="bg-[#f9fafb] border border-[#e5e7eb] rounded-xl p-4 text-center">
              <p className="text-[11px] text-[#6b7280] mb-0.5">Gross ticket revenue</p>
              <p className="text-[20px] font-black text-[#0a0a0a]">{fmt(gross, currency)}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
