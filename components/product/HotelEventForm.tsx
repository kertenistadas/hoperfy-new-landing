'use client'

import { useState, useEffect, useRef } from 'react'
import OnboardingModal from '@/components/OnboardingModal'

type CitySuggestion = {
  name: string
  country: string
  country_code: string
  admin1?: string
}

const inputClass =
  'w-full h-9 px-4 text-[13px] border border-[#e5e7eb] rounded-lg outline-none focus:border-[#1a6cf5] focus:ring-2 focus:ring-[#1a6cf5]/10 transition-all placeholder:text-[#9ca3af] placeholder:text-[13px] bg-white'
const labelClass = 'block text-[10px] uppercase tracking-wider text-[#9ca3af] mb-1.5'

export default function HotelEventForm() {
  const [eventName, setEventName] = useState('')
  const [city, setCity] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [suggestions, setSuggestions] = useState<CitySuggestion[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const cityRef = useRef<HTMLDivElement>(null)
  const justSelectedRef = useRef(false)

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
      setIsLoading(true)
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
        // Ignore aborts and network errors — the form still works without a suggestion.
      } finally {
        setIsLoading(false)
      }
    }, 400)

    return () => {
      clearTimeout(timer)
      controller.abort()
    }
  }, [city])

  // Close the suggestions dropdown when clicking outside the city field.
  useEffect(() => {
    if (!showSuggestions) return
    function handleClick(e: MouseEvent) {
      if (cityRef.current && !cityRef.current.contains(e.target as Node)) {
        setShowSuggestions(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [showSuggestions])

  function selectSuggestion(s: CitySuggestion) {
    justSelectedRef.current = true
    setCity(`${s.name}, ${s.country}`)
    setSuggestions([])
    setShowSuggestions(false)
  }

  // No save here — the event data is carried into the modal, which writes a
  // single lead on final submit (with the email collected there).
  function handleSubmit() {
    if (!eventName.trim()) return
    setModalOpen(true)
  }

  return (
    <div className="space-y-2.5">
      {/* Event name */}
      <div>
        <label className={labelClass}>Event name</label>
        <input
          type="text"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
          placeholder="e.g. TechConf 2026"
          className={inputClass}
        />
      </div>

      {/* City with autocomplete */}
      <div className="relative" ref={cityRef}>
        <label className={labelClass}>Location</label>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onFocus={() => {
            if (suggestions.length > 0) setShowSuggestions(true)
          }}
          placeholder="City"
          className={inputClass}
        />

        {showSuggestions && (suggestions.length > 0 || isLoading) && (
          <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-[#e5e7eb] rounded-lg shadow-lg overflow-hidden z-20">
            {suggestions.length > 0 ? (
              suggestions.map((s, i) => (
                <button
                  type="button"
                  key={`${s.name}-${s.country_code}-${i}`}
                  onClick={() => selectSuggestion(s)}
                  className="w-full text-left px-4 py-2 hover:bg-[#f9fafb] transition-colors"
                >
                  <span className="text-[13px] font-medium text-[#0a0a0a]">{s.name}</span>
                  <span className="text-[12px] text-[#6b7280] ml-2">
                    {s.admin1 ? `${s.admin1}, ` : ''}
                    {s.country}
                  </span>
                </button>
              ))
            ) : (
              <p className="px-4 py-2 text-[12px] text-[#9ca3af]">Searching…</p>
            )}
          </div>
        )}
      </div>

      {/* Dates side by side */}
      <div className="grid grid-cols-2 gap-2.5">
        <div>
          <label className={labelClass}>Start date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className={`${inputClass} text-[#374151]`}
          />
        </div>
        <div>
          <label className={labelClass}>End date</label>
          <input
            type="date"
            value={endDate}
            min={startDate || undefined}
            onChange={(e) => setEndDate(e.target.value)}
            className={`${inputClass} text-[#374151]`}
          />
        </div>
      </div>

      <div className="pt-1 space-y-2.5">
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!eventName.trim()}
          className="h-10 w-full bg-[#1a6cf5] text-white rounded-lg font-medium text-[13px] hover:bg-[#1558cc] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          Generate hotels for my event →
        </button>

        <a
          href="https://calendly.com/tadas-hoperfy/30min"
          target="_blank"
          rel="noopener noreferrer"
          className="h-10 w-full border border-[#e5e7eb] text-[#0a0a0a] rounded-lg font-medium text-[13px] hover:border-[#0a0a0a] transition-colors flex items-center justify-center"
        >
          Talk to us first
        </a>

        <p className="text-[12px] text-[#9ca3af] text-center">
          No commitment required. Free to set up.
        </p>
      </div>

      <OnboardingModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        source="hotels-hero-form"
        initialEventName={eventName}
        initialEventLocation={city}
        initialEventStartDate={startDate}
        initialEventEndDate={endDate}
      />
    </div>
  )
}
