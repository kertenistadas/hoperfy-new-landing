'use client'

import Link from 'next/link'
import PricingCard from '@/components/PricingCard'
import { fallbackPricingBySlug } from '@/sanity/lib/fallbackPricing'
import type { Pricing } from '@/types'

type Props = {
  pricing: Pricing | null
  productSlug: string
}

export default function ProductPricing({ pricing, productSlug }: Props) {
  const data = pricing ?? fallbackPricingBySlug[productSlug]

  if (!data) return null

  return (
    <section className="py-24 px-6 bg-[#f9fafb] border-t border-[#e5e7eb]">
      <div className="max-w-3xl mx-auto">
        <div className="mb-12">
          <p className="eyebrow mb-3">Pricing</p>
          <h2 className="text-[1.75rem] md:text-[2.25rem] font-black tracking-tight text-[#0a0a0a]">
            What does it cost?
          </h2>
        </div>

        <div className="bg-white rounded-2xl">
          <PricingCard pricing={data} source={`${productSlug}-product-pricing`} />
        </div>

        <div className="mt-6">
          <Link href="/pricing" className="text-[13px] text-[#1a6cf5] hover:text-[#1558cc] transition-colors">
            See full pricing comparison →
          </Link>
        </div>
      </div>
    </section>
  )
}
