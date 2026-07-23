'use client'

import { useState } from 'react'
import OnboardingModal from '@/components/OnboardingModal'

type Props = {
  source?: string
  darkMode?: boolean
}

export default function CTAButtons({ source = 'homepage', darkMode = false }: Props) {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <button
          onClick={() => setModalOpen(true)}
          className={`h-12 px-8 text-[14px] font-medium rounded-lg transition-colors ${
            darkMode
              ? 'bg-white text-[#0a0a0a] hover:bg-white/90'
              : 'bg-[#1a6cf5] text-white hover:bg-[#1558cc]'
          }`}
        >
          Start setting up your event
        </button>

        <a
          href="https://calendly.com/tadas-hoperfy/30min"
          target="_blank"
          rel="noopener noreferrer"
          className={`h-12 px-8 text-[14px] font-medium rounded-lg transition-colors flex items-center justify-center ${
            darkMode
              ? 'border border-white text-white hover:bg-white/10'
              : 'border border-[#e5e7eb] text-[#0a0a0a] hover:border-[#0a0a0a]'
          }`}
        >
          Talk to us first
        </a>
      </div>

      <OnboardingModal isOpen={modalOpen} onClose={() => setModalOpen(false)} source={source} />
    </>
  )
}
