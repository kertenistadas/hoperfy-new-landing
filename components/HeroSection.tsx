'use client'

import { useState } from 'react'
import type { Hero } from '@/types'
import OnboardingModal from '@/components/OnboardingModal'

type Props = {
  data: Hero
}

export default function HeroSection({ data }: Props) {
  const [email, setEmail] = useState('')
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <section className="pt-32 pb-24 px-6">
      <div className="max-w-2xl mx-auto text-center w-full">
        <p className="eyebrow mb-6">Event commerce infrastructure</p>

        <h1 className="text-[2.75rem] md:text-[3.5rem] font-black leading-[1.05] tracking-tight text-[#0a0a0a] mb-6">
          {data.headline}
        </h1>

        <p className="text-lg font-light text-[#6b7280] leading-relaxed mb-12 max-w-xl mx-auto">
          {data.subtitle}
        </p>

        <div id="signup">
          {/* Email input row */}
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto w-full px-4 sm:px-0">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your work email"
              className="w-full h-12 px-4 text-[14px] border border-[#e5e7eb] rounded-lg outline-none focus:border-[#1a6cf5] focus:ring-2 focus:ring-[#1a6cf5]/10 transition-all placeholder:text-[#9ca3af] bg-white"
            />
            <button
              onClick={() => setModalOpen(true)}
              className="w-full sm:w-auto h-12 px-6 text-[14px] font-medium bg-[#1a6cf5] text-white rounded-lg hover:bg-[#1558cc] transition-colors whitespace-nowrap"
            >
              Create my event →
            </button>
          </div>

          {/* OR divider */}
          <div className="flex items-center gap-4 max-w-md mx-auto mt-4 px-4 sm:px-0">
            <div className="flex-1 h-px bg-[#e5e7eb]" />
            <span className="text-[12px] text-[#9ca3af] font-medium">OR</span>
            <div className="flex-1 h-px bg-[#e5e7eb]" />
          </div>

          {/* Book a demo */}
          <div className="mt-4 px-4 sm:px-0">
            <a
              href="https://calendly.com/tadas-hoperfy/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[14px] font-medium text-[#0a0a0a] hover:text-[#1a6cf5] transition-colors"
            >
              Book a demo
            </a>
          </div>

          {/* Fine print */}
          <p className="mt-4 text-[12px] text-[#9ca3af]">
            No commitment required. First 100 tickets, on us.
          </p>
        </div>
      </div>

      <OnboardingModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        source="homepage-hero"
        initialEmail={email}
      />
    </section>
  )
}
