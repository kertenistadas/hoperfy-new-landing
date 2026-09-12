'use client'

import { useState } from 'react'
import OnboardingModal from '@/components/OnboardingModal'

type Props = {
  headline: string
  body: string
  ctaText?: string
  flip?: boolean
  gradient: string
  children: React.ReactNode
}

export default function SpeakerHousingSection({ headline, body, ctaText = 'Hand over speaker housing', flip = false, gradient, children }: Props) {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <>
      <div className="py-14 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">

            {/* Text column */}
            <div className={flip ? 'md:order-2' : 'md:order-1'}>
              <h3 className="text-[1.75rem] md:text-[2rem] font-black tracking-tight text-[#0a0a0a] leading-[1.15] mb-4">
                {headline}
              </h3>
              <p className="text-[14px] font-light text-[#6b7280] leading-relaxed mb-6">
                {body}
              </p>
              <button
                onClick={() => setModalOpen(true)}
                className="h-10 px-5 text-[13px] font-medium bg-[#0a0a0a] text-white rounded-full hover:bg-[#1a1a1a] transition-colors"
              >
                {ctaText}
              </button>
            </div>

            {/* Visual column */}
            <div className={flip ? 'md:order-1' : 'md:order-2'}>
              <div
                className="rounded-2xl p-6 md:p-8 aspect-[4/3] flex items-center justify-center"
                style={{ background: gradient }}
              >
                {children}
              </div>
            </div>

          </div>
        </div>
      </div>

      <OnboardingModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        source="speaker-housing"
      />
    </>
  )
}
