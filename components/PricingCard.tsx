'use client'

import { useState } from 'react'
import OnboardingModal from '@/components/OnboardingModal'
import type { Pricing } from '@/types'

type Props = {
  pricing: Pricing
  source?: string
}

export default function PricingCard({ pricing, source }: Props) {
  const [modalOpen, setModalOpen] = useState(false)
  const highlighted = pricing.highlighted

  return (
    <div
      className={`border rounded-2xl p-8 ${
        highlighted ? 'border-[#1a6cf5] shadow-lg shadow-blue-500/10 relative' : 'border-[#e5e7eb]'
      }`}
    >
      {highlighted && (
        <span className="absolute top-4 right-4 text-[11px] font-semibold bg-[#1a6cf5] text-white px-3 py-1 rounded-full">
          Most popular
        </span>
      )}

      {pricing.product?.tagline && <p className="eyebrow">{pricing.product.tagline}</p>}
      <h2 className="text-[1.25rem] font-black tracking-tight text-[#0a0a0a] mt-2 mb-1">
        {pricing.product?.title}
      </h2>

      <p className="text-[3.5rem] font-black leading-none text-[#0a0a0a] tracking-tight">
        {pricing.price}
      </p>
      {pricing.priceSuffix && (
        <p className="text-[14px] font-light text-[#6b7280] mt-1">{pricing.priceSuffix}</p>
      )}
      {pricing.tagline && (
        <p className="text-[14px] text-[#6b7280] font-light mt-3 mb-6 italic">{pricing.tagline}</p>
      )}

      <div className="border-t border-[#e5e7eb] mb-6" />

      <ul className="space-y-3 mb-8">
        {pricing.includes?.map((item, i) => (
          <li key={i} className="flex items-start gap-3 text-[14px] text-[#374151]">
            <span className="text-[#1a6cf5] mt-0.5" aria-hidden="true">
              ✓
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={() => setModalOpen(true)}
        className={`w-full h-12 rounded-lg font-medium text-[14px] transition-colors ${
          highlighted
            ? 'bg-[#1a6cf5] text-white hover:bg-[#1558cc]'
            : 'border border-[#e5e7eb] text-[#0a0a0a] hover:border-[#0a0a0a]'
        }`}
      >
        {pricing.cta}
      </button>

      <OnboardingModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        source={source ?? `${pricing.product?.slug ?? 'pricing'}-pricing`}
      />
    </div>
  )
}
