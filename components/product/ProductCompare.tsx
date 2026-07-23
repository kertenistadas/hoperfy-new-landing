type CompareFeature = {
  label: string
  hoperfy: boolean
  competitors: boolean
}

type Props = {
  competitors: string[]
  features: CompareFeature[]
}

function Mark({ on }: { on: boolean }) {
  return on ? (
    <span className="text-[#1a6cf5] text-[18px] font-semibold" aria-label="Included">
      ✓
    </span>
  ) : (
    <span className="text-[#e5e7eb] text-[18px] font-semibold" aria-label="Not included">
      ✗
    </span>
  )
}

export default function ProductCompare({ competitors, features }: Props) {
  if (!features || features.length === 0) return null

  const competitorLabel = competitors.join(' / ')

  return (
    <section className="py-24 px-6 border-t border-[#e5e7eb]">
      <div className="max-w-3xl mx-auto">
        <div className="mb-16">
          <p className="eyebrow mb-3">Why Hoperfy</p>
          <h2 className="text-[1.75rem] md:text-[2.25rem] font-black tracking-tight text-[#0a0a0a]">
            See how we compare
          </h2>
        </div>

        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#e5e7eb]">
              <th className="py-4 pr-4 text-[13px] font-medium text-[#6b7280] font-normal" />
              <th className="py-4 px-4 text-[14px] font-semibold text-[#0a0a0a] text-center w-24">
                Hoperfy
              </th>
              <th className="py-4 pl-4 text-[13px] font-medium text-[#6b7280] text-center">
                {competitorLabel}
              </th>
            </tr>
          </thead>
          <tbody>
            {features.map((feature, i) => (
              <tr key={i} className="border-b border-[#f3f4f6] last:border-0">
                <td className="py-4 pr-4 text-[15px] text-[#374151]">{feature.label}</td>
                <td className="py-4 px-4 text-center">
                  <Mark on={feature.hoperfy} />
                </td>
                <td className="py-4 pl-4 text-center">
                  <Mark on={feature.competitors} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
