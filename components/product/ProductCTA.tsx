import type { ProductDetail } from '@/types'
import CTAButtons from '@/components/CTAButtons'

type Props = {
  product: ProductDetail
  /** Overrides the default heading. Other product pages keep the template. */
  headline?: string
  /** Overrides the primary button label. Other product pages keep the default. */
  primaryLabel?: string
}

export default function ProductCTA({ product, headline, primaryLabel }: Props) {
  return (
    <section className="py-24 px-6 bg-[#eef4ff]">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-[1.75rem] md:text-[2.25rem] font-black tracking-tight text-[#0a0a0a] mb-8">
          {headline ?? `Ready to try ${product.title}?`}
        </h2>

        <CTAButtons source={`${product.slug}-cta`} primaryLabel={primaryLabel} />
      </div>
    </section>
  )
}
