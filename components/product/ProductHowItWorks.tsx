import type { ProductDetail } from '@/types'

type Props = {
  product: ProductDetail
}

export default function ProductHowItWorks({ product }: Props) {
  if (!product.steps?.length && product.slug !== 'hotels-for-events') return null

  if (product.slug === 'hotels-for-events') {
    return (
      <section className="py-24 px-6 bg-[#f9fafb] border-t border-[#e5e7eb]">
        <div className="max-w-5xl mx-auto">
          <div className="mb-16">
            <p className="eyebrow mb-3">How it works</p>
            <h2 className="text-[1.75rem] md:text-[2.25rem] font-black tracking-tight text-[#0a0a0a]">
              {product.howItWorksHeadline ?? 'One conversation. Then we handle everything.'}
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 items-stretch">

            {/* Step 1 */}
            <div className="bg-white border border-[#e5e7eb] rounded-2xl p-6 flex flex-col gap-4 hover:border-[#1a6cf5] hover:shadow-lg hover:shadow-blue-500/5 transition-all h-full">
              <span className="text-[1.5rem] font-light text-[#1a6cf5]">→</span>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-[#1a6cf5]">Define & Delegate</p>
              <h3 className="text-[15px] font-black tracking-tight text-[#0a0a0a]">One 5-minute chat with our team</h3>
              <p className="text-[13px] font-light text-[#6b7280] leading-relaxed">Tell us your event details. We take over direct hotel negotiations and contracts immediately. Access 2,000,000+ properties worldwide.</p>
            </div>

            {/* Step 2 */}
            <div className="bg-white border border-[#e5e7eb] rounded-2xl p-6 flex flex-col gap-4 hover:border-[#1a6cf5] hover:shadow-lg hover:shadow-blue-500/5 transition-all h-full">
              <span className="text-[1.5rem] font-light text-[#1a6cf5]">→</span>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-[#1a6cf5]">Review & Deploy</p>
              <h3 className="text-[15px] font-black tracking-tight text-[#0a0a0a]">Your custom booking page is live</h3>
              <p className="text-[13px] font-light text-[#6b7280] leading-relaxed">We build your branded page with negotiated rates in 5–15 minutes. No technical setup, no developer resources required.</p>
            </div>

            {/* Step 3 */}
            <div className="bg-white border border-[#e5e7eb] rounded-2xl p-6 flex flex-col gap-4 hover:border-[#1a6cf5] hover:shadow-lg hover:shadow-blue-500/5 transition-all h-full">
              <span className="text-[1.5rem] font-bold text-[#1a6cf5]">✓</span>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-[#1a6cf5]">Manage & Scale</p>
              <h3 className="text-[15px] font-black tracking-tight text-[#0a0a0a]">You send one link. We manage all attendees.</h3>
              <p className="text-[13px] font-light text-[#6b7280] leading-relaxed">Your work is done. Hoperfy handles every booking, inquiry, and issue. Your team never manages a hotel query again.</p>
            </div>

          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-24 px-6 bg-[#f9fafb]">
      <div className="max-w-5xl mx-auto">
        {product.howItWorksHeadline && (
          <h2 className="text-[1.75rem] md:text-[2.25rem] font-black tracking-tight text-[#0a0a0a] mb-16 max-w-2xl">
            {product.howItWorksHeadline}
          </h2>
        )}

        <div className="grid md:grid-cols-3 gap-10">
          {product.steps.map((step, i) => (
            <div key={i}>
              <p className="text-[3rem] font-black leading-none text-[#e5e7eb] tracking-tight mb-5">
                {String(i + 1).padStart(2, '0')}
              </p>
              <h3 className="text-[1.125rem] font-black text-[#0a0a0a] mb-3">{step.title}</h3>
              <p className="text-[14px] font-light text-[#6b7280] leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
