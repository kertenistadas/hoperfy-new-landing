import type { ProductDetail } from '@/types'

type Props = {
  product: ProductDetail
}

export default function ProductFeatures({ product }: Props) {
  if (!product.featuresList?.length) return null

  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        {product.featuresHeadline && (
          <h2 className="text-[1.75rem] md:text-[2.25rem] font-black tracking-tight text-[#0a0a0a] mb-16 max-w-2xl">
            {product.featuresHeadline}
          </h2>
        )}

        <div className="grid md:grid-cols-2 gap-x-12 gap-y-10">
          {product.featuresList.map((feature, i) => (
            <div key={i} className="flex items-start gap-4">
              <span
                className="mt-2 w-2 h-2 rounded-full bg-[#1a6cf5] shrink-0"
                aria-hidden="true"
              />
              <div>
                <h3 className="text-[16px] font-semibold text-[#0a0a0a] mb-1.5">{feature.title}</h3>
                <p className="text-[14px] font-light text-[#6b7280] leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
