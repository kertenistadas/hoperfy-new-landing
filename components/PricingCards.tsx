'use client'

import type { Pricing } from '@/types'
import PricingCard from '@/components/PricingCard'

export default function PricingCards({ pricing }: { pricing: Pricing[] }) {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {pricing.map((item) => (
        <PricingCard key={item._id} pricing={item} />
      ))}
    </div>
  )
}
