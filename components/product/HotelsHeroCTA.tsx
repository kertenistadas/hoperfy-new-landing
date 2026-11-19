'use client'

import { useState } from 'react'
import OnboardingModal from '@/components/OnboardingModal'

// Hero CTA on /products/hotels-for-events. Button styles match CTAButtons.
export default function HotelsHeroCTA() {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <div className="mt-6">
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="h-12 px-8 text-[14px] font-medium rounded-lg transition-colors bg-[#1a6cf5] text-white hover:bg-[#1558cc]"
        >
          Generate hotels for my event
        </button>

        <a
          href="https://calendly.com/tadas-hoperfy/30min"
          target="_blank"
          rel="noopener noreferrer"
          className="h-12 px-8 text-[14px] font-medium rounded-lg transition-colors flex items-center justify-center border border-[#e5e7eb] text-[#0a0a0a] hover:border-[#0a0a0a]"
        >
          Talk to us first
        </a>
      </div>

      <p className="text-[13px] text-[#9ca3af] mt-3">No credit card · Free to set up</p>

      <OnboardingModal isOpen={modalOpen} onClose={() => setModalOpen(false)} source="hotels-hero" />
    </div>
  )
}
