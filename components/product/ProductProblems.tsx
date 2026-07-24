import type { ProductDetail } from '@/types'

type Props = {
  product: ProductDetail
}

export default function ProductProblems({ product }: Props) {
  if (!product.problems?.length) return null

  return (
    <section className="py-24 px-6 bg-[#f9fafb]">
      <div className="max-w-5xl mx-auto">
        {product.problemHeadline && (
          <h2 className="text-[1.75rem] md:text-[2.25rem] font-black tracking-tight text-[#0a0a0a] mb-16 max-w-2xl">
            {product.problemHeadline}
          </h2>
        )}

        <div className="grid md:grid-cols-3 gap-8">
          {product.problems.map((problem, i) => (
            <div key={i} className="border border-[#e5e7eb] bg-white rounded-xl p-6">
              <p className="text-[13px] font-semibold text-[#e5e7eb] mb-4">
                {String(i + 1).padStart(2, '0')}
              </p>
              <h3 className="text-[1.125rem] font-black text-[#0a0a0a] mb-3">{problem.title}</h3>
              <p className="text-[14px] font-light text-[#6b7280] leading-relaxed">
                {problem.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
