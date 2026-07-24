'use client'

import { useState } from 'react'
import OnboardingModal from '@/components/OnboardingModal'

export default function ProductRevenueCalculator() {
  const [attendees, setAttendees] = useState(500)
  const [outOfTown, setOutOfTown] = useState(30)
  const [days, setDays] = useState(2)
  const [modalOpen, setModalOpen] = useState(false)

  const outOfTownCount = Math.round(attendees * (outOfTown / 100))
  const nights = outOfTownCount * days
  const total = nights * 60

  return (
    <section className="py-24 px-6 bg-[#0a0a0a]">
      <div className="max-w-3xl mx-auto text-center">
        <p className="eyebrow mb-4" style={{ color: '#4d8ef7' }}>Revenue calculator</p>
        <h2 className="text-[2rem] md:text-[2.5rem] font-black tracking-tight text-white mb-4">
          How much are your attendees already spending on hotels?
        </h2>
        <p className="text-[15px] font-light mb-12" style={{ color: 'rgba(255,255,255,0.5)' }}>
          Move the sliders to see the revenue your event generates — for someone else right now.
        </p>

        <div className="text-left space-y-8 mb-12">
          {/* Slider 1 */}
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-[13px]" style={{ color: 'rgba(255,255,255,0.5)' }}>Total attendees</span>
              <span className="text-[13px] font-semibold text-white">{attendees.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min={1}
              max={500000}
              step={100}
              value={attendees}
              onChange={(e) => setAttendees(Number(e.target.value))}
              className="w-full cursor-pointer accent-[#1a6cf5]"
            />
            <div className="flex justify-between mt-1">
              <span className="text-[11px]" style={{ color: 'rgba(255,255,255,0.3)' }}>1</span>
              <span className="text-[11px]" style={{ color: 'rgba(255,255,255,0.3)' }}>500,000</span>
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

        <div className="border-t mb-10" style={{ borderColor: 'rgba(255,255,255,0.1)' }} />

        <p className="text-[13px] mb-4" style={{ color: 'rgba(255,255,255,0.5)' }}>
          {outOfTownCount.toLocaleString()} out-of-town attendees × {days} {days === 1 ? 'night' : 'nights'} = {nights.toLocaleString()} hotel nights
        </p>

        <p className="text-[4rem] md:text-[5rem] font-black text-white leading-none tracking-tight">
          €{total.toLocaleString()}
        </p>
        <p className="text-[14px] font-light mt-2" style={{ color: 'rgba(255,255,255,0.5)' }}>
          in hotel revenue your event generates per edition
        </p>
        <p className="text-[14px] font-medium mt-2" style={{ color: '#4d8ef7' }}>
          Hoperfy helps you capture it — for free.
        </p>

        <div className="border-t mt-10 mb-10" style={{ borderColor: 'rgba(255,255,255,0.1)' }} />

        <div className="text-left bg-white/5 border rounded-xl p-8" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
          <p className="eyebrow mb-3" style={{ color: '#4d8ef7' }}>Hotels for Events by Hoperfy</p>
          <h3 className="text-[1.25rem] font-black text-white tracking-tight mb-2">
            White-label hotel booking. Fully managed. Free.
          </h3>
          <p className="text-[14px] font-light mb-8" style={{ color: 'rgba(255,255,255,0.5)' }}>
            Your branded hotel booking page, live in 24–48 hours. Hoperfy handles setup, delegate support, cancellations, and payments. Your team does nothing.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              'White-label booking page — your brand',
              'Negotiated rate management',
              'Real-time room block tracking',
              'Automated rooming list exports',
              'All delegate support by Hoperfy',
              'Cancellations and refunds handled for you',
              'Live in 24–48 hours',
              'Zero cost to your team',
            ].map((feature, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <span className="text-[#1a6cf5] font-bold text-[14px] shrink-0 mt-0.5">✓</span>
                <span className="text-[13px]" style={{ color: 'rgba(255,255,255,0.7)' }}>{feature}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t mt-10 mb-10" style={{ borderColor: 'rgba(255,255,255,0.1)' }} />

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => setModalOpen(true)}
            className="h-12 px-8 text-[14px] font-medium bg-white text-[#0a0a0a] rounded-lg hover:bg-white/90 transition-colors"
          >
            Set up hotel booking — it&apos;s free
          </button>
          <a
            href="https://calendly.com/tadas-hoperfy/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="h-12 px-8 text-[14px] font-medium border text-white rounded-lg hover:bg-white/10 transition-colors flex items-center justify-center"
            style={{ borderColor: 'rgba(255,255,255,0.3)' }}
          >
            Book a demo
          </a>
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
