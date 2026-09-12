'use client'

import { useEffect, useState } from 'react'
import type { SocialProof } from '@/types'

export default function SpeakerHousingLogoBar({ data }: { data: SocialProof | null }) {
  const [logos, setLogos] = useState<SocialProof['companies']>([])

  useEffect(() => {
    if (!data?.companies?.length) return
    const shuffled = [...data.companies].sort(() => Math.random() - 0.5)
    setLogos(shuffled.slice(0, 7))
  }, [data])

  if (!logos.length) return null

  return (
    <div className="mt-8">
      <p className="text-[10px] font-semibold tracking-widest uppercase text-[#c4c9d0] text-center mb-4">
        Trusted by 100+ events and event teams
      </p>

      {/* Desktop — all 7 */}
      <div className="hidden md:grid grid-cols-7 border-l border-t border-[#f3f4f6]">
        {logos.map((company, i) => (
          <LogoCell key={i} company={company} />
        ))}
      </div>

      {/* Mobile — first 3 */}
      <div className="md:hidden grid grid-cols-3 border-l border-t border-[#f3f4f6]">
        {logos.slice(0, 3).map((company, i) => (
          <LogoCell key={i} company={company} />
        ))}
      </div>
    </div>
  )
}

function LogoCell({ company }: { company: SocialProof['companies'][0] }) {
  return (
    <div className="flex items-center justify-center px-4 py-5 border-r border-b border-[#ebebeb] h-20 group bg-[#f5f5f5] hover:bg-[#eeeeee] transition-colors">
      {company.logoUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={company.logoUrl}
          alt={company.name}
          className="h-6 w-auto object-contain max-w-[90px] opacity-70 group-hover:opacity-100 transition-all duration-300"
        />
      ) : (
        <span className="text-[12px] font-semibold text-[#9ca3af] text-center">{company.name}</span>
      )}
    </div>
  )
}
