import type { ProductDetail } from '@/types'

type Props = {
  product: ProductDetail
}

export default function ProductProblems({ product }: Props) {
  if (!product.problems?.length) return null

  return (
    <section className="py-24 px-6 bg-[#f9fafb]">
      <div className="max-w-3xl mx-auto">
        <div className="mb-12">
          <p className="eyebrow mb-3">Objections we hear</p>
          <h2 className="text-[1.75rem] md:text-[2.25rem] font-black tracking-tight text-[#0a0a0a]">
            {product.problemHeadline ?? 'We have heard every objection.'}
          </h2>
        </div>

        <div className="flex flex-col gap-6">
          {product.problems.map((p, i) => (
            <div key={i} className="flex flex-col gap-2">

              {/* Objection bubble - left side */}
              <div className="flex flex-col items-start">
                <span className="text-[10px] font-semibold text-[#9ca3af] uppercase tracking-wider mb-1 ml-3">
                  Event organizer
                </span>
                <div className="bg-[#f3f4f6] rounded-2xl rounded-tl-sm px-5 py-4 max-w-[80%]">
                  <p className="text-[14px] font-semibold text-[#0a0a0a]">{p.title}</p>
                </div>
              </div>

              {/* Response bubble - right side */}
              <div className="flex flex-col items-end">
                <span className="text-[10px] font-semibold text-[#1a6cf5] uppercase tracking-wider mb-1 mr-3">
                  Hoperfy
                </span>
                <div className="bg-[#1a6cf5] rounded-2xl rounded-tr-sm px-5 py-4 max-w-[80%]">
                  <p className="text-[14px] font-light text-white leading-relaxed">{p.description}</p>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
