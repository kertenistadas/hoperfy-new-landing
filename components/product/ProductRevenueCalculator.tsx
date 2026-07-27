'use client'

import { useState } from 'react'
import OnboardingModal from '@/components/OnboardingModal'

const regionRates: Record<string, number> = {
  Europe: 30,
  'North America': 60,
  Asia: 45,
  'Middle East': 60,
  'South America': 45,
  Australia: 60,
  Africa: 32,
}

const cityRegionMap: Record<string, string> = {
  // Europe
  berlin: 'Europe', london: 'Europe', paris: 'Europe', amsterdam: 'Europe',
  madrid: 'Europe', rome: 'Europe', barcelona: 'Europe', vienna: 'Europe',
  lisbon: 'Europe', dublin: 'Europe', brussels: 'Europe', zurich: 'Europe',
  stockholm: 'Europe', oslo: 'Europe', copenhagen: 'Europe', helsinki: 'Europe',
  warsaw: 'Europe', prague: 'Europe', budapest: 'Europe', vilnius: 'Europe',
  riga: 'Europe', tallinn: 'Europe', kaunas: 'Europe', milan: 'Europe',
  // North America
  'new york': 'North America', 'los angeles': 'North America', chicago: 'North America',
  'san francisco': 'North America', miami: 'North America', toronto: 'North America',
  vancouver: 'North America', montreal: 'North America', boston: 'North America',
  seattle: 'North America', 'las vegas': 'North America', austin: 'North America',
  // Asia
  tokyo: 'Asia', singapore: 'Asia', 'hong kong': 'Asia', seoul: 'Asia',
  bangkok: 'Asia', shanghai: 'Asia', beijing: 'Asia', mumbai: 'Asia',
  delhi: 'Asia', bangalore: 'Asia', 'kuala lumpur': 'Asia', jakarta: 'Asia',
  // Middle East
  dubai: 'Middle East', 'abu dhabi': 'Middle East', riyadh: 'Middle East',
  doha: 'Middle East', kuwait: 'Middle East', 'tel aviv': 'Middle East',
  istanbul: 'Middle East', cairo: 'Middle East',
  // South America
  'sao paulo': 'South America', 'buenos aires': 'South America', bogota: 'South America',
  lima: 'South America', santiago: 'South America', 'rio de janeiro': 'South America',
  // Australia
  sydney: 'Australia', melbourne: 'Australia', brisbane: 'Australia',
  perth: 'Australia', auckland: 'Australia',
  // Africa
  'cape town': 'Africa', johannesburg: 'Africa', nairobi: 'Africa',
  lagos: 'Africa', casablanca: 'Africa', accra: 'Africa',
}

function detectRegion(cityInput: string): string {
  const normalized = cityInput.toLowerCase().trim()
  if (!normalized) return ''
  for (const [key, value] of Object.entries(cityRegionMap)) {
    if (normalized.includes(key) || key.includes(normalized)) {
      return value
    }
  }
  return ''
}

export default function ProductRevenueCalculator() {
  const [attendees, setAttendees] = useState(500)
  const [outOfTown, setOutOfTown] = useState(30)
  const [days, setDays] = useState(2)
  const [city, setCity] = useState('')
  const [region, setRegion] = useState('')
  const [currency, setCurrency] = useState<'USD' | 'EUR'>('USD')
  const [modalOpen, setModalOpen] = useState(false)

  const outOfTownCount = Math.round(attendees * (outOfTown / 100))
  const nights = outOfTownCount * days
  const rate = region ? regionRates[region] ?? 30 : 30
  const total = nights * rate
  const currencySymbol = currency === 'USD' ? '$' : '€'

  return (
    <section className="py-24 px-6 bg-[#0a0a0a]">
      <div className="max-w-5xl mx-auto">
        {/* Header - centered above both columns */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <p className="eyebrow" style={{ color: '#4d8ef7' }}>Revenue calculator</p>
            <div className="flex items-center bg-white/10 rounded-full p-0.5 ml-4">
              <button
                onClick={() => setCurrency('USD')}
                className={`text-[11px] font-semibold px-3 py-1 rounded-full transition-all ${
                  currency === 'USD' ? 'bg-white text-[#0a0a0a]' : 'text-white/50'
                }`}
              >
                USD
              </button>
              <button
                onClick={() => setCurrency('EUR')}
                className={`text-[11px] font-semibold px-3 py-1 rounded-full transition-all ${
                  currency === 'EUR' ? 'bg-white text-[#0a0a0a]' : 'text-white/50'
                }`}
              >
                EUR
              </button>
            </div>
          </div>
          <h2 className="text-[2rem] md:text-[2.5rem] font-black tracking-tight text-white mb-4">
            How much are your attendees already spending on hotels?
          </h2>
          <p className="text-[15px] font-light" style={{ color: 'rgba(255,255,255,0.5)' }}>
            Move the sliders to see the revenue your event generates — for someone else right now.
          </p>
        </div>

        {/* Two column layout on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left column - city, sliders and result */}
          <div>
            {/* City / region detection */}
            <div className="mb-10">
              <label className="block text-[13px] mb-2" style={{ color: 'rgba(255,255,255,0.5)' }}>
                Where is your event taking place?
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={city}
                  onChange={(e) => {
                    setCity(e.target.value)
                    setRegion(detectRegion(e.target.value))
                  }}
                  placeholder="e.g. Berlin, New York, Dubai..."
                  className="w-full h-11 px-4 text-[14px] bg-white/10 border rounded-lg outline-none text-white placeholder:text-white/30 focus:border-[#1a6cf5] transition-all"
                  style={{ borderColor: 'rgba(255,255,255,0.2)' }}
                />
                {region && (
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#1a6cf5]/20 text-[#4d8ef7]">
                      {region}
                    </span>
                    <span className="text-[11px]" style={{ color: 'rgba(255,255,255,0.4)' }}>
                      avg. {currencySymbol}{regionRates[region]}/night
                    </span>
                  </div>
                )}
                {city.length > 2 && !region && (
                  <p className="mt-2 text-[11px]" style={{ color: 'rgba(255,255,255,0.4)' }}>
                    City not recognised — using global average rate
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-8 mb-10">
              {/* Slider 1 */}
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-[13px]" style={{ color: 'rgba(255,255,255,0.5)' }}>Total attendees</span>
                  <span className="text-[13px] font-semibold text-white">{attendees.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={50000}
                  step={50}
                  value={attendees}
                  onChange={(e) => setAttendees(Number(e.target.value))}
                  className="w-full cursor-pointer accent-[#1a6cf5]"
                />
                <div className="flex justify-between mt-1">
                  <span className="text-[11px]" style={{ color: 'rgba(255,255,255,0.3)' }}>10</span>
                  <span className="text-[11px]" style={{ color: 'rgba(255,255,255,0.3)' }}>50,000</span>
                </div>
              </div>

              {/* Slider 2 */}
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-[13px]" style={{ color: 'rgba(255,255,255,0.5)' }}>Out of town attendees</span>
                  <span className="text-[13px] font-semibold text-white">{outOfTown}%</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  step={5}
                  value={outOfTown}
                  onChange={(e) => setOutOfTown(Number(e.target.value))}
                  className="w-full cursor-pointer accent-[#1a6cf5]"
                />
                <div className="flex justify-between mt-1">
                  <span className="text-[11px]" style={{ color: 'rgba(255,255,255,0.3)' }}>0%</span>
                  <span className="text-[11px]" style={{ color: 'rgba(255,255,255,0.3)' }}>100%</span>
                </div>
              </div>

              {/* Slider 3 */}
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-[13px]" style={{ color: 'rgba(255,255,255,0.5)' }}>Event duration (days)</span>
                  <span className="text-[13px] font-semibold text-white">{days} {days === 1 ? 'day' : 'days'}</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={14}
                  step={1}
                  value={days}
                  onChange={(e) => setDays(Number(e.target.value))}
                  className="w-full cursor-pointer accent-[#1a6cf5]"
                />
                <div className="flex justify-between mt-1">
                  <span className="text-[11px]" style={{ color: 'rgba(255,255,255,0.3)' }}>1 day</span>
                  <span className="text-[11px]" style={{ color: 'rgba(255,255,255,0.3)' }}>14 days</span>
                </div>
              </div>
            </div>

            <div className="border-t mb-8" style={{ borderColor: 'rgba(255,255,255,0.1)' }} />

            <p className="text-[13px] mb-3" style={{ color: 'rgba(255,255,255,0.5)' }}>
              {outOfTownCount.toLocaleString()} out-of-town attendees × {days} {days === 1 ? 'night' : 'nights'} × {currencySymbol}{rate}/night = {nights.toLocaleString()} hotel nights
            </p>
            <p className="text-[3.5rem] md:text-[4rem] font-black text-white leading-none tracking-tight">
              {currencySymbol}{total.toLocaleString()}
            </p>
            <p className="text-[14px] font-light mt-2" style={{ color: 'rgba(255,255,255,0.5)' }}>
              in profit your event generates per edition
            </p>
            <p className="text-[14px] font-medium mt-1" style={{ color: '#4d8ef7' }}>
              Hoperfy helps you capture it — for free.
            </p>
          </div>

          {/* Right column - product showcase card */}
          <div className="bg-white/5 border rounded-xl p-8" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
            <p className="eyebrow mb-3" style={{ color: '#4d8ef7' }}>Hotels for Events by Hoperfy</p>
            <h3 className="text-[1.25rem] font-black text-white tracking-tight mb-2">
              White-label hotel booking. Fully managed. Free.
            </h3>
            <p className="text-[14px] font-light mb-8" style={{ color: 'rgba(255,255,255,0.5)' }}>
              Your branded hotel booking page, live in 5 minutes. Hoperfy handles setup, delegate support, cancellations, and payments. Your team does nothing.
            </p>
            <div className="grid grid-cols-1 gap-3">
              {[
                'White-label booking page — your brand',
                'Negotiated rate management',
                'Real-time room block tracking',
                'Automated rooming list exports',
                'All delegate support by Hoperfy',
                'Cancellations and refunds handled for you',
                'Live in 5 minutes',
                'Zero cost to your team',
              ].map((feature, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <span className="text-[#1a6cf5] font-bold text-[14px] shrink-0 mt-0.5">✓</span>
                  <span className="text-[13px]" style={{ color: 'rgba(255,255,255,0.7)' }}>{feature}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-3">
              <button
                onClick={() => setModalOpen(true)}
                className="w-full h-12 px-8 text-[14px] font-medium bg-white text-[#0a0a0a] rounded-lg hover:bg-white/90 transition-colors"
              >
                Set up hotel booking — it&apos;s free
              </button>
              <a
                href="https://calendly.com/tadas-hoperfy/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full h-12 px-8 text-[14px] font-medium border text-white rounded-lg hover:bg-white/10 transition-colors flex items-center justify-center"
                style={{ borderColor: 'rgba(255,255,255,0.3)' }}
              >
                Book a demo
              </a>
            </div>
          </div>
        </div>
      </div>

      <OnboardingModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        source="hotels-calculator"
      />
    </section>
  )
}
