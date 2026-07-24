type Props = {
  features: string[]
  title?: string
}

export default function ProductFullFeatures({ features, title }: Props) {
  if (!features || features.length === 0) return null

  return (
    <section className="py-24 px-6 border-t border-[#e5e7eb]">
      <div className="max-w-5xl mx-auto">
        <p className="eyebrow mb-3">What&apos;s included</p>
        <h2 className="text-[1.75rem] md:text-[2.25rem] font-black tracking-tight text-[#0a0a0a]">
          {title ?? 'Everything included'}
        </h2>

        <div className="grid md:grid-cols-2 gap-x-12 gap-y-4 mt-12">
          {features.map((feature, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className="text-[#1a6cf5] font-bold text-[14px] shrink-0" aria-hidden="true">
                ✓
              </span>
              <span className="text-[14px] text-[#374151]">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
