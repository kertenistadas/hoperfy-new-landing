import type { ProductDetail } from '@/types'

type Props = {
  product: ProductDetail
}

export default function ProductStats({ product }: Props) {
  if (!product.stats?.length) return null

  return (
    <section className="py-24 px-6 bg-white border-t border-[#e5e7eb]">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-3 gap-10">
          {product.stats.map((stat, i) => (
            <div key={i}>
              <p className="text-[3.5rem] md:text-[4rem] font-black leading-none text-[#1a6cf5] tracking-tight">
                {stat.value}
              </p>
              <p className="text-[14px] font-light text-[#6b7280] mt-3">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
