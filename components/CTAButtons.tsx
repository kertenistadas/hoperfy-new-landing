'use client'

import { useState } from 'react'
import OnboardingModal from '@/components/OnboardingModal'

type Props = {
  source?: string
}

export default function CTAButtons({ source = 'homepage' }: Props) {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <button
          onClick={() => setModalOpen(true)}
          className="h-12 px-8 text-[14px] font-medium bg-[#1a6cf5] text-white rounded-lg hover:bg-[#1558cc] transition-colors"
        >
          Start setting up your event
        </button>

        <a
          href="https://calendly.com/tadas-hoperfy/30min"
          target="_blank"
          rel="noopener noreferrer"
          className="h-12 px-8 text-[14px] font-medium border border-[#e5e7eb] text-[#0a0a0a] rounded-lg hover:border-[#0a0a0a] transition-colors flex items-center justify-center"
        >
          Talk to us first
        </a>
      </div>

      <OnboardingModal isOpen={modalOpen} onClose={() => setModalOpen(false)} source={source} />
    </>
  )
}
