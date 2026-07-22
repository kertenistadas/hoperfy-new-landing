import type { ProductDetail } from '@/types'

type Props = {
  product: ProductDetail
}

export default function ProductHowItWorks({ product }: Props) {
  if (!product.steps?.length) return null

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
