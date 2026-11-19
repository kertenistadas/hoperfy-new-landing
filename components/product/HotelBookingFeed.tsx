'use client'

import { useEffect, useState } from 'react'
import {
  DEFAULT_PROFIT_PER_NIGHT,
  EXAMPLE_EVENT,
  ORGANISER_SHARE,
  organiserEarnings,
} from '@/lib/hotelRevenue'

// An illustrative example, not real data: no hotel names, no people's names.
const HOTELS = [
  '4★ hotel · 350 m from venue',
  '3★ hotel · 1.2 km from venue',
  '5★ hotel · 600 m from venue',
  'Boutique hotel · 900 m from venue',
  '3★ hotel · 500 m from venue',
  '4★ hotel · 2 km, direct tram',
]
const COUNTRIES = ['Germany', 'the US', 'Poland', 'Spain', 'Sweden', 'France', 'the Netherlands', 'the UK', 'Lithuania']

const TRAVELLERS = Math.round(EXAMPLE_EVENT.attendees * (EXAMPLE_EVENT.outOfTownPct / 100))
const START_BOOKED = Math.round(TRAVELLERS * 0.8)
const NIGHTS = EXAMPLE_EVENT.nights
const SHARE = ORGANISER_SHARE.fullSuite
const PER_BOOKING = organiserEarnings(NIGHTS, DEFAULT_PROFIT_PER_NIGHT, SHARE)
const TICK_MS = 2000
const HOLD_TICKS = 2
const ROWS = 5
const ROW_H = 52
const ROW_GAP = 6
const ROW_STEP = ROW_H + ROW_GAP // the slide-down distance (58px)
const SETTLE_DELAY_MS = 40
const SLIDE = 'transform 700ms cubic-bezier(.34,1.45,.64,1)'
const FEED_MASK = 'linear-gradient(to bottom, transparent 0, #000 14px, #000 70%, transparent)'

// 'pre': new row added, list shifted up one row, nothing moves yet.
// 'run': list slides down into place with a small bounce.
// 'still': no transition (first render, reset, reduced motion).
type Motion = 'still' | 'pre' | 'run'

// Fixed locale so server and client render the same string.
const money = (n: number) => `$${n.toLocaleString('en-US')}`

function BedIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M3 18V6" stroke="#1a6cf5" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M3 14H21V18" stroke="#1a6cf5" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M21 14V12C21 10.3 19.7 9 18 9H11V14" stroke="#1a6cf5" strokeWidth="1.6" strokeLinejoin="round" />
      <circle cx="7" cy="11" r="1.8" stroke="#1a6cf5" strokeWidth="1.6" />
    </svg>
  )
}

export default function HotelBookingFeed() {
  const [booked, setBooked] = useState(START_BOOKED)
  const [motion, setMotion] = useState<Motion>('still')
  // Counts animated ticks; 0 means nothing has animated yet (matches SSR).
  const [tick, setTick] = useState(0)

  // Starts only after mount, so the server HTML and first client render match.
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let current = START_BOOKED
    let held = 0
    let settle: ReturnType<typeof setTimeout> | undefined

    const id = setInterval(() => {
      if (current >= TRAVELLERS) {
        held += 1
        if (held <= HOLD_TICKS) return
        // Reset without animating.
        held = 0
        current = START_BOOKED
        clearTimeout(settle)
        setMotion('still')
        setBooked(current)
        return
      }
      current += 1
      setBooked(current)
      setTick((t) => t + 1)
      if (reduced) {
        setMotion('still')
        return
      }
      // a) new row on top, list shifted up one row, no transition.
      setMotion('pre')
      // b) shortly after, slide the list down into place.
      clearTimeout(settle)
      settle = setTimeout(() => setMotion('run'), SETTLE_DELAY_MS)
    }, TICK_MS)

    return () => {
      clearInterval(id)
      clearTimeout(settle)
    }
  }, [])

  const roomNights = booked * NIGHTS
  const earned = organiserEarnings(roomNights, DEFAULT_PROFIT_PER_NIGHT, SHARE)

  // Alternating two identical keyframe names restarts the animation each tick.
  const phase = tick === 0 ? '' : tick % 2 ? 'A' : 'B'
  const pulse = phase ? `feed-pulse-${phase}` : ''

  const bookings = Array.from({ length: ROWS }, (_, i) => booked - i).filter((id) => id > 0)

  return (
    <div className="w-full h-full flex flex-col bg-white border border-[#e5e7eb] rounded-2xl p-4 shadow-[0_1px_2px_rgba(16,24,40,0.04),0_8px_24px_rgba(16,24,40,0.05)]">
      <p className="text-[15px] font-bold tracking-tight text-[#0a0a0a] mb-2">
        Example: hotel bookings for your event
      </p>

      <div className="grid grid-cols-2 gap-3 mb-2">
        <div className="bg-[#f7f8fa] rounded-xl p-3">
          <p className="text-[11px] text-[#6b7280]">Room nights booked</p>
          <p className="text-[22px] font-black tracking-tight text-[#0a0a0a] leading-none mt-1">
            <span className={`inline-block ${pulse}`}>{roomNights.toLocaleString('en-US')}</span>
          </p>
          <p className="text-[11px] text-[#6b7280] mt-0.5">
            {booked} of {TRAVELLERS} travelling attendees
          </p>
        </div>
        <div className="bg-[#eef4ff] rounded-xl p-3">
          <p className="text-[11px] text-[#6b7280]">Earned for your event</p>
          <p className="text-[22px] font-black tracking-tight text-[#1a6cf5] leading-none mt-1">
            <span className={`inline-block ${pulse}`}>{money(earned)}</span>
          </p>
          <p className="text-[11px] text-[#6b7280] mt-0.5">{Math.round(SHARE * 100)}% of hotel profit</p>
        </div>
      </div>

      <div
        className="overflow-hidden h-[120px] md:h-auto md:flex-1 md:min-h-0"
        style={{ WebkitMaskImage: FEED_MASK, maskImage: FEED_MASK }}
      >
        <div
          className="flex flex-col"
          style={{
            gap: ROW_GAP,
            transform: motion === 'pre' ? `translateY(-${ROW_STEP}px)` : 'translateY(0)',
            transition: motion === 'run' ? SLIDE : 'none',
          }}
        >
          {bookings.map((id, i) => {
            const newest = i === 0
            return (
              <div
                // Keyed by booking id, so each row keeps its element as it moves down.
                key={id}
                className="flex items-center gap-3 shrink-0 border rounded-xl px-3"
                style={{
                  height: ROW_H,
                  opacity: newest && motion === 'pre' ? 0 : 1,
                  borderColor: newest ? '#1a6cf5' : '#e5e7eb',
                  backgroundColor: newest ? '#f5f9ff' : '#ffffff',
                  transition: 'opacity 350ms, border-color 1.2s, background-color 1.2s',
                }}
              >
                <div className="w-8 h-8 rounded-lg bg-[#eef4ff] flex items-center justify-center shrink-0">
                  <BedIcon />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-semibold text-[#0a0a0a] truncate">{HOTELS[id % HOTELS.length]}</p>
                  <p className="text-[11px] text-[#6b7280] truncate">
                    {NIGHTS} nights · Attendee from {COUNTRIES[(id * 5) % COUNTRIES.length]}
                  </p>
                </div>
                <span className="text-[13px] font-semibold text-[#1a6cf5] shrink-0">+{money(PER_BOOKING)}</span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
