'use client'

import { useTicketingFee, type PlatformKey, type CurrencyKey } from './TicketingFeeContext'

function fmt(value: number, currency: string) {
  return `${currency}${Math.round(Math.abs(value)).toLocaleString()}`
}

export default function FeeCalculator() {
  const {
    ticketPrice,
    setTicketPrice,
    ticketsSold,
    setTicketsSold,
    paidPct,
    setPaidPct,
    platform,
    setPlatform,
    currency,
    setCurrency,
    gross,
    hoperfyTotal,
    competitorTotal,
    savings,
    isNegative,
    payoutDelayDays,
    platformLabel,
  } = useTicketingFee()

  const platforms: { key: PlatformKey; label: string }[] = [
    { key: 'eventbrite', label: 'Eventbrite' },
    { key: 'legacy', label: 'Legacy box office' },
    { key: 'diy', label: 'Own site + Stripe' },
  ]

  const currencies: CurrencyKey[] = ['€', '$', '£']

  return (
    <div className="bg-white border border-[#e5e7eb] rounded-2xl p-6 shadow-sm">
      {/* Currency toggle */}
      <div className="flex justify-between items-center mb-6">
        <p className="text-[12px] font-semibold text-[#9ca3af] uppercase tracking-wider">Fee calculator</p>
        <div className="flex bg-[#f3f4f6] rounded-lg p-0.5">
          {currencies.map((c) => (
            <button
              key={c}
              onClick={() => setCurrency(c)}
              className={`text-[12px] font-semibold px-3 py-1 rounded-md transition-all ${
                currency === c ? 'bg-white text-[#0a0a0a] shadow-sm' : 'text-[#6b7280]'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Platform selector */}
      <div className="mb-5">
        <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#9ca3af] mb-2">
          Compare against
        </label>
        <div className="grid grid-cols-3 gap-2">
          {platforms.map((p) => (
            <button
              key={p.key}
              onClick={() => setPlatform(p.key)}
              className={`text-[11px] font-semibold px-2 py-2 rounded-lg border transition-all text-center leading-tight ${
                platform === p.key
                  ? 'border-[#1a6cf5] bg-[#eef4ff] text-[#1a6cf5]'
                  : 'border-[#e5e7eb] text-[#6b7280] hover:border-[#c4c9d0]'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Sliders */}
      <div className="space-y-4 mb-6">
        <div>
          <div className="flex justify-between mb-1.5">
            <label className="text-[11px] font-semibold uppercase tracking-wider text-[#9ca3af]">Tickets per event</label>
            <span className="text-[12px] font-semibold text-[#0a0a0a]">{ticketsSold.toLocaleString()}</span>
          </div>
          <input
            type="range"
            min={50}
            max={20000}
            step={50}
            value={ticketsSold}
            onChange={(e) => setTicketsSold(Number(e.target.value))}
            className="w-full accent-[#1a6cf5] cursor-pointer"
            aria-label="Tickets per event"
            aria-valuetext={`${ticketsSold.toLocaleString()} tickets`}
          />
          <div className="flex justify-between mt-0.5">
            <span className="text-[10px] text-[#c4c9d0]">50</span>
            <span className="text-[10px] text-[#c4c9d0]">20,000</span>
          </div>
        </div>

        <div>
          <div className="flex justify-between mb-1.5">
            <label className="text-[11px] font-semibold uppercase tracking-wider text-[#9ca3af]">Avg ticket price</label>
            <span className="text-[12px] font-semibold text-[#0a0a0a]">{currency}{ticketPrice}</span>
          </div>
          <input
            type="range"
            min={5}
            max={500}
            step={5}
            value={ticketPrice}
            onChange={(e) => setTicketPrice(Number(e.target.value))}
            className="w-full accent-[#1a6cf5] cursor-pointer"
            aria-label="Average ticket price"
            aria-valuetext={`${currency}${ticketPrice} average ticket price`}
          />
          <div className="flex justify-between mt-0.5">
            <span className="text-[10px] text-[#c4c9d0]">{currency}5</span>
            <span className="text-[10px] text-[#c4c9d0]">{currency}500</span>
          </div>
        </div>

        <div>
          <div className="flex justify-between mb-1.5">
            <label className="text-[11px] font-semibold uppercase tracking-wider text-[#9ca3af]">Paid tickets</label>
            <span className="text-[12px] font-semibold text-[#0a0a0a]">{paidPct}%</span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            step={5}
            value={paidPct}
            onChange={(e) => setPaidPct(Number(e.target.value))}
            className="w-full accent-[#1a6cf5] cursor-pointer"
            aria-label="Percentage of paid tickets"
            aria-valuetext={`${paidPct}% paid tickets`}
          />
          <div className="flex justify-between mt-0.5">
            <span className="text-[10px] text-[#c4c9d0]">0%</span>
            <span className="text-[10px] text-[#c4c9d0]">100%</span>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-[#e5e7eb] mb-5" />

      {/* Gross */}
      <div className="flex justify-between items-center mb-4">
        <span className="text-[12px] text-[#6b7280]">Gross ticket revenue</span>
        <span className="text-[13px] font-semibold text-[#0a0a0a]">{fmt(gross, currency)}</span>
      </div>

      {/* Fee comparison */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        <div className="bg-[#eef4ff] rounded-xl p-3">
          <p className="text-[10px] font-semibold text-[#1a6cf5] uppercase tracking-wider mb-1">Hoperfy</p>
          <p className="text-[18px] font-black text-[#1a6cf5]">{fmt(hoperfyTotal, currency)}</p>
          <p className="text-[10px] text-[#6b7280] mt-0.5">total fees · paid instantly</p>
        </div>
        <div className="bg-[#f9fafb] rounded-xl p-3">
          <p className="text-[10px] font-semibold text-[#6b7280] uppercase tracking-wider mb-1">{platformLabel}</p>
          <p className="text-[18px] font-black text-[#0a0a0a]">{fmt(competitorTotal, currency)}</p>
          <p className="text-[10px] text-[#6b7280] mt-0.5">total fees · +{payoutDelayDays}d payout</p>
        </div>
      </div>

      {/* Result */}
      <div
        className={`rounded-xl p-4 ${isNegative ? 'bg-[#f9fafb] border border-[#e5e7eb]' : 'bg-[#eef4ff] border border-[#b8d0fe]'}`}
        aria-live="polite"
      >
        {isNegative ? (
          <>
            <p className="text-[11px] font-semibold text-[#6b7280] uppercase tracking-wider mb-1">
              Hoperfy costs {fmt(Math.abs(savings), currency)} more to run
            </p>
            <p className="text-[14px] font-black text-[#0a0a0a]">Worth checking the trade-off</p>
            <p className="text-[11px] text-[#6b7280] mt-1">
              At this volume a {platformLabel.toLowerCase()} has lower fees. Talk to us before deciding.
            </p>
          </>
        ) : (
          <>
            <p className="text-[11px] font-semibold text-[#1a6cf5] uppercase tracking-wider mb-1">
              You keep {fmt(savings, currency)} more
            </p>
            <p className="text-[14px] font-black text-[#0a0a0a]">
              {fmt(savings, currency)} better off vs {platformLabel}
            </p>
            <p className="text-[11px] text-[#6b7280] mt-1">
              Paid out as tickets sell, not {payoutDelayDays} days after your event.
            </p>
          </>
        )}
      </div>
    </div>
  )
}
