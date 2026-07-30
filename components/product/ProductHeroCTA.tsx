'use client'

import { useState } from 'react'
import OnboardingModal from '@/components/OnboardingModal'
import type { ProductDetail } from '@/types'

export default function ProductHeroCTA({ product }: { product: ProductDetail }) {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={() => setModalOpen(true)}
          className="h-12 px-8 text-[14px] font-medium bg-[#1a6cf5] text-white rounded-lg hover:bg-[#1558cc] transition-colors"
        >
          {product.heroCta ?? 'Start setting up your event'}
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
      <p className="mt-4 text-[12px] text-[#9ca3af]">No commitment required.</p>
      <OnboardingModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        source={product.slug}
      />
    </>
  )
}
