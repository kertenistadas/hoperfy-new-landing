'use client'

import { useEffect, useRef, useState } from 'react'
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

const countryToRegion: Record<string, string> = {
  // Europe
  AT: 'Europe', BE: 'Europe', BG: 'Europe', HR: 'Europe', CY: 'Europe',
  CZ: 'Europe', DK: 'Europe', EE: 'Europe', FI: 'Europe', FR: 'Europe',
  DE: 'Europe', GR: 'Europe', HU: 'Europe', IE: 'Europe', IT: 'Europe',
  LV: 'Europe', LT: 'Europe', LU: 'Europe', MT: 'Europe', NL: 'Europe',
  PL: 'Europe', PT: 'Europe', RO: 'Europe', SK: 'Europe', SI: 'Europe',
  ES: 'Europe', SE: 'Europe', GB: 'Europe', NO: 'Europe', IS: 'Europe',
  CH: 'Europe', AL: 'Europe', BA: 'Europe', XK: 'Europe', MK: 'Europe',
  ME: 'Europe', RS: 'Europe', MD: 'Europe', UA: 'Europe', BY: 'Europe',
  RU: 'Europe', AM: 'Europe', AZ: 'Europe', GE: 'Europe',
  // North America
  US: 'North America', CA: 'North America', MX: 'North America',
  GT: 'North America', BZ: 'North America', SV: 'North America',
  HN: 'North America', NI: 'North America', CR: 'North America',
  PA: 'North America', CU: 'North America', JM: 'North America',
  HT: 'North America', DO: 'North America', PR: 'North America',
  // South America
  BR: 'South America', AR: 'South America', CO: 'South America',
  PE: 'South America', VE: 'South America', CL: 'South America',
  EC: 'South America', BO: 'South America', PY: 'South America',
  UY: 'South America', GY: 'South America', SR: 'South America',
  // Asia
  CN: 'Asia', JP: 'Asia', IN: 'Asia', KR: 'Asia', ID: 'Asia',
  TH: 'Asia', VN: 'Asia', PH: 'Asia', MY: 'Asia', SG: 'Asia',
  BD: 'Asia', PK: 'Asia', LK: 'Asia', NP: 'Asia', MM: 'Asia',
  KH: 'Asia', LA: 'Asia', MN: 'Asia', TW: 'Asia', HK: 'Asia',
  MO: 'Asia', KZ: 'Asia', UZ: 'Asia', TM: 'Asia', KG: 'Asia',
  TJ: 'Asia', AF: 'Asia',
  // Middle East
  AE: 'Middle East', SA: 'Middle East', QA: 'Middle East', KW: 'Middle East',
  BH: 'Middle East', OM: 'Middle East', YE: 'Middle East', IQ: 'Middle East',
  IR: 'Middle East', IL: 'Middle East', JO: 'Middle East', LB: 'Middle East',
  SY: 'Middle East', TR: 'Middle East', EG: 'Middle East',
  // Africa
  ZA: 'Africa', NG: 'Africa', KE: 'Africa', ET: 'Africa', GH: 'Africa',
  TZ: 'Africa', MA: 'Africa', DZ: 'Africa', TN: 'Africa', UG: 'Africa',
  CI: 'Africa', CM: 'Africa', MZ: 'Africa', ZM: 'Africa', ZW: 'Africa',
  SN: 'Africa', AO: 'Africa', LY: 'Africa', SD: 'Africa', SO: 'Africa',
  // Australia/Oceania
  AU: 'Australia', NZ: 'Australia', PG: 'Australia', FJ: 'Australia',
}

type CitySuggestion = {
  name: string
  country: string
  country_code: string
  admin1: string
}

export default function ProductRevenueCalculator() {
  const [attendees, setAttendees] = useState(500)
  const [attendeesInput, setAttendeesInput] = useState('500')
  const [outOfTown, setOutOfTown] = useState(30)
  const [days, setDays] = useState(2)
  const [city, setCity] = useState('')
  const [region, setRegion] = useState('')
  const [currency, setCurrency] = useState<'USD' | 'EUR'>('USD')
  const [suggestions, setSuggestions] = useState<CitySuggestion[]>([])
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)

  // Skip the next suggestion fetch when `city` changed because of a selection.
  const justSelectedRef = useRef(false)

  const outOfTownCount = Math.round(attendees * (outOfTown / 100))
  const nights = outOfTownCount * days
  const rate = region ? regionRates[region] ?? 30 : 30
  const total = nights * rate
  const currencySymbol = currency === 'USD' ? '$' : '€'

  // Debounced city autocomplete via the free Open-Meteo geocoding API.
  useEffect(() => {
    if (justSelectedRef.current) {
      justSelectedRef.current = false
      return
    }

    if (city.trim().length < 3) {
      setSuggestions([])
      setShowSuggestions(false)
      return
    }

    const controller = new AbortController()
    const timer = setTimeout(async () => {
      setIsLoadingSuggestions(true)
      try {
        const res = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
            city.trim(),
          )}&count=5&language=en&format=json`,
          { signal: controller.signal },
        )
        const data: { results?: Array<Partial<CitySuggestion>> } = await res.json()
        const results: CitySuggestion[] = (data.results ?? []).map((r) => ({
          name: r.name ?? '',
          country: r.country ?? '',
          country_code: r.country_code ?? '',
          admin1: r.admin1 ?? '',
        }))
        setSuggestions(results)
        setShowSuggestions(true)
      } catch {
        // Ignore aborts and network errors — the calculator still works without a region.
      } finally {
        setIsLoadingSuggestions(false)
      }
    }, 400)

    return () => {
      clearTimeout(timer)
      controller.abort()
    }
  }, [city])

  function selectSuggestion(s: CitySuggestion) {
    justSelectedRef.current = true
    setCity(`${s.name}, ${s.country}`)
    setRegion(countryToRegion[s.country_code] ?? '')
    setSuggestions([])
    setShowSuggestions(false)
  }

  return (
    <section className="py-24 px-6 bg-[#0a0a0a]">
      <div className="max-w-5xl mx-auto">
        {/* Header - centered above both columns */}
        <div className="text-center mb-16">
          <p className="eyebrow mb-4" style={{ color: '#4d8ef7' }}>Revenue calculator</p>
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
              <div className="flex gap-3 items-start">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => {
                      setCity(e.target.value)
                      setRegion('')
                    }}
                    onFocus={() => {
                      if (suggestions.length > 0) setShowSuggestions(true)
                    }}
                    placeholder="e.g. Berlin, New York, Dubai..."
                    className="w-full h-11 px-4 text-[14px] bg-white/10 border rounded-lg outline-none text-white placeholder:text-white/30 focus:border-[#1a6cf5] transition-all"
                    style={{ borderColor: 'rgba(255,255,255,0.2)' }}
                  />

                  {showSuggestions && suggestions.length > 0 && (
                    <div className="absolute left-0 right-0 top-full mt-2 bg-[#1a1a1a] border border-white/10 rounded-lg overflow-hidden z-10">
                      {suggestions.map((s, i) => (
                        <button
                          type="button"
                          key={`${s.name}-${s.country_code}-${i}`}
                          onClick={() => selectSuggestion(s)}
                          className="w-full text-left px-4 py-3 hover:bg-white/10 cursor-pointer text-white text-[14px] block"
                        >
                          <span className="font-medium">{s.name}</span>
                          <span className="text-white/50 text-[12px] ml-2">
                            {s.admin1 ? `${s.admin1}, ` : ''}
                            {s.country}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}

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
                  {city.length > 2 && !region && !showSuggestions && !isLoadingSuggestions && (
                    <p className="mt-2 text-[11px]" style={{ color: 'rgba(255,255,255,0.4)' }}>
                      City not recognised — using global average rate
                    </p>
                  )}
                </div>

                <div className="flex items-center bg-white/10 rounded-lg p-0.5 h-11 shrink-0">
                  <button
                    onClick={() => setCurrency('USD')}
                    className={`text-[12px] font-semibold px-3 h-full rounded-md transition-all ${
                      currency === 'USD' ? 'bg-white text-[#0a0a0a]' : 'text-white/50 hover:text-white'
                    }`}
                  >
                    USD
                  </button>
                  <button
                    onClick={() => setCurrency('EUR')}
                    className={`text-[12px] font-semibold px-3 h-full rounded-md transition-all ${
                      currency === 'EUR' ? 'bg-white text-[#0a0a0a]' : 'text-white/50 hover:text-white'
                    }`}
                  >
                    EUR
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-8 mb-10">
              {/* Total attendees - number input */}
              <div className="mb-8">
                <div className="flex justify-between mb-2">
                  <label className="text-[13px]" style={{ color: 'rgba(255,255,255,0.5)' }}>Total attendees</label>
                </div>
                <input
                  type="number"
                  min={10}
                  max={500000}
                  value={attendeesInput}
                  onChange={(e) => {
                    setAttendeesInput(e.target.value)
                    const val = Number(e.target.value)
                    if (val >= 10) setAttendees(val)
                  }}
                  onBlur={(e) => {
                    const val = Number(e.target.value)
                    if (!e.target.value || val < 10) {
                      setAttendeesInput('100')
                      setAttendees(100)
                    } else if (val > 500000) {
                      setAttendeesInput('500000')
                      setAttendees(500000)
                    }
                  }}
                  className="w-full h-11 px-4 text-[14px] font-semibold text-white bg-white/10 border rounded-lg outline-none focus:border-[#1a6cf5] transition-all"
                  style={{ borderColor: 'rgba(255,255,255,0.2)' }}
                  placeholder="e.g. 500"
                />
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

            <p className="text-[3.5rem] md:text-[4rem] font-black text-white leading-none tracking-tight">
              {currencySymbol}{total.toLocaleString()}
            </p>
            <p className="text-[14px] font-light mt-2" style={{ color: 'rgba(255,255,255,0.5)' }}>
              in profit your event generates per event
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
