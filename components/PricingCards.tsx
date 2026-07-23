'use client'

import type { Pricing } from '@/types'
import PricingCard from '@/components/PricingCard'

export default function PricingCards({ pricing }: { pricing: Pricing[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {pricing.map((item) => (
        <PricingCard key={item._id} pricing={item} />
      ))}
    </div>
  )
}
