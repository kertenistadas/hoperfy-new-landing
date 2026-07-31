import FeeCalculator from './FeeCalculator'
import type { ProductDetail } from '@/types'
import CTAButtons from '@/components/CTAButtons'

export default function TicketingHero({ product }: { product: ProductDetail }) {
  return (
    <section className="pt-32 pb-0 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-10 items-start mb-8">
          {/* Left — copy */}
          <div>
            <p className="eyebrow mb-4">{product.tagline}</p>
            <h1 className="text-[2.5rem] md:text-[3rem] font-black leading-[1.05] tracking-tight text-[#0a0a0a] mb-6">
              {product.heroHeadline ?? 'See exactly what your ticketing platform is keeping'}
            </h1>
            <p className="text-[15px] font-light text-[#6b7280] leading-relaxed mb-8">
              {product.heroSubtitle ??
                'Every paid ticket carries a percentage fee and a settlement delay. Move the sliders to see what that costs you — and what you would keep with Hoperfy.'}
            </p>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-4 mb-8 border-t border-[#e5e7eb] pt-6">
              {[
                { value: '2.5%', label: 'flat platform fee' },
                { value: '0 days', label: 'payout delay' },
                { value: '20–70k', label: 'attendees supported' },
              ].map((stat, i) => (
                <div key={i}>
                  <p className="text-[1.5rem] font-black text-[#1a6cf5] leading-none">{stat.value}</p>
                  <p className="text-[11px] text-[#6b7280] mt-1">{stat.label}</p>
                </div>
              ))}
            </div>

            <CTAButtons source="ticketing-hero" />
          </div>

          {/* Right — calculator */}
          <div>
            <FeeCalculator />
          </div>
        </div>
      </div>
    </section>
  )
}
