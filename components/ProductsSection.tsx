import type { Product } from '@/types'

type Props = {
  products: Product[]
}

export default function ProductsSection({ products }: Props) {
  return (
    <section id="products" className="py-24 px-6 border-t border-[#e5e7eb]">
      <div className="max-w-5xl mx-auto">
        <div className="mb-16">
          <p className="eyebrow mb-3">What we build</p>
          <h2 className="text-[1.75rem] md:text-[2.25rem] font-black tracking-tight text-[#0a0a0a]">
            Two products. One platform.
          </h2>
        </div>
        <div className="space-y-12">
          {products.map((product, index) => (
            <ProductCard key={product._id} product={product} flip={index % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ProductCard({ product, flip }: { product: Product; flip: boolean }) {
  return (
    <div
      className="grid gap-12 items-start pb-12 border-b border-[#e5e7eb] last:border-0 last:pb-0"
      style={{ gridTemplateColumns: flip ? '2fr 1fr' : '1fr 2fr' }}
    >
      <div style={{ order: flip ? 2 : 1 }}>
        <div className="inline-block">
          <p className="text-[4rem] md:text-[5rem] font-black leading-none text-[#1a6cf5] tracking-tight">
            {product.stat?.value}
          </p>
          <p className="text-[13px] font-light text-[#6b7280] mt-1">{product.stat?.label}</p>
        </div>
      </div>
      <div style={{ order: flip ? 1 : 2 }}>
        <p className="eyebrow mb-3">{product.tagline}</p>
        <h3 className="text-[1.375rem] font-black tracking-tight text-[#0a0a0a] mb-4">
          {product.title}
        </h3>
        <p className="text-[15px] font-light text-[#6b7280] leading-relaxed mb-8">
          {product.description}
        </p>
        {product.features && product.features.length > 0 && (
          <ul className="space-y-2.5">
            {product.features.map((feature, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#1a6cf5] shrink-0" aria-hidden="true" />
                <span className="text-[14px] text-[#374151]">{feature}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}