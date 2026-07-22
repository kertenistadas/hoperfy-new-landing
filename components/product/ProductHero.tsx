import type { ProductDetail } from '@/types'
import CTAButtons from '@/components/CTAButtons'

type Props = {
  product: ProductDetail
}

export default function ProductHero({ product }: Props) {
  return (
    <section className="pt-32 pb-24 px-6">
      <div className="max-w-2xl mx-auto text-center">
        <p className="eyebrow mb-6">{product.tagline}</p>

        <h1 className="text-[2.75rem] md:text-[3.5rem] font-black leading-[1.05] tracking-tight text-[#0a0a0a] mb-6">
          {product.heroHeadline}
        </h1>

        <p className="text-lg font-light text-[#6b7280] leading-relaxed mb-12 max-w-xl mx-auto">
          {product.heroSubtitle}
        </p>

        <div id="signup">
          <CTAButtons source={product.slug} />

          <p className="mt-4 text-[12px] text-[#9ca3af]">
            No commitment required.
          </p>
        </div>
      </div>
    </section>
  )
}
