import Image from 'next/image'
import type { SocialProof } from '@/types'

type Props = {
  data: SocialProof
}

export default function SocialProofBar({ data }: Props) {
  if (!data?.companies?.length) return null

  return (
    <section className="py-12 px-6 border-t border-[#e5e7eb]">
      <div className="max-w-5xl mx-auto">
        <p className="text-[11px] font-semibold tracking-widest uppercase text-[#9ca3af] text-center mb-8">
          {data.label}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
          {data.companies.map((company) =>
            company.logoUrl ? (
              <Image
                key={company.name}
                src={company.logoUrl}
                alt={company.name}
                width={120}
                height={32}
                className="h-7 w-auto object-contain opacity-50 grayscale hover:opacity-70 transition-opacity"
              />
            ) : (
              <span key={company.name} className="text-[13px] font-medium text-[#9ca3af]">
                {company.name}
              </span>
            )
          )}
        </div>
      </div>
    </section>
  )
}
