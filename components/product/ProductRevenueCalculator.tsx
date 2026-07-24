'use client'

import { useState } from 'react'
import OnboardingModal from '@/components/OnboardingModal'

type SliderProps = {
  label: string
  min: number
  max: number
  step: number
  value: number
  display: string
  onChange: (value: number) => void
}

function Slider({ label, min, max, step, value, display, onChange }: SliderProps) {
  return (
    <div className="mb-8">
      <div className="flex justify-between mb-2">
        <span className="text-[13px] text-white/50">{label}</span>
        <span className="text-[13px] font-semibold text-white">{display}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-[#1a6cf5] cursor-pointer"
      />
    </div>
  )
}

export default function ProductRevenueCalculator() {
  const [attendees, setAttendees] = useState(500)
  const [percentage, setPercentage] = useState(70)
  const [spend, setSpend] = useState(200)
  const [modalOpen, setModalOpen] = useState(false)

  const total = Math.round(attendees * (percentage / 100) * spend)

  return (
    <section className="py-24 px-6 bg-[#0a0a0a]">
      <div className="max-w-3xl mx-auto text-center">
        <p className="eyebrow mb-3 text-[#4d8ef7]">Revenue calculator</p>
        <h2 className="text-[2rem] md:text-[2.5rem] font-black tracking-tight text-white mb-4">
          How much are your attendees already spending on hotels?
        </h2>
        <p className="text-[15px] font-light text-white/50 mb-12">
          Move the sliders to see the revenue your event is generating — for someone else right now.
        </p>

        <div className="text-left">
          <Slider
            label="Total attendees"
            min={100}
            max={10000}
            step={100}
            value={attendees}
            display={attendees.toLocaleString()}
            onChange={setAttendees}
          />
          <Slider
            label="% booking hotels"
            min={10}
            max={100}
            step={5}
            value={percentage}
            display={`${percentage}%`}
            onChange={setPercentage}
          />
          <Slider
            label="Average hotel spend per attendee (€)"
            min={50}
            max={1000}
            step={25}
            value={spend}
            display={`€${spend.toLocaleString()}`}
            onChange={setSpend}
          />
        </div>

        <div className="mt-4">
          <p className="text-[4rem] md:text-[5rem] font-black text-white leading-none">
            €{total.toLocaleString()}
          </p>
          <p className="text-[14px] text-white/50 mt-2">
            spent by your attendees on hotels per event
          </p>
          <p className="text-[#4d8ef7] font-medium mt-1">
            That&apos;s revenue Hoperfy can help you capture — for free.
          </p>
        </div>

        <div className="border-t border-white/10 my-10" />

        <div className="flex gap-4 justify-center flex-wrap">
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="bg-white text-[#0a0a0a] h-12 px-8 rounded-lg font-medium text-[14px] hover:bg-white/90 transition-colors"
          >
            Set up hotel booking — it&apos;s free
          </button>
          <a
            href="https://calendly.com/tadas-hoperfy/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-white/30 text-white h-12 px-8 rounded-lg font-medium text-[14px] hover:bg-white/10 transition-colors flex items-center justify-center"
          >
            Book a demo
          </a>
        </div>
      </div>

      <OnboardingModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        source="hotels-revenue-calculator"
      />
    </section>
  )
}
