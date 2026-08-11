'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import type { SocialProof } from '@/types'

type Props = {
  data: SocialProof
}

export default function SocialProofBar({ data }: Props) {
  if (!data?.companies?.length) return null

  const withCaseStudy = data.companies.filter(c => c.caseStudyUrl)
  const withoutCaseStudy = data.companies.filter(c => !c.caseStudyUrl)

  const desktopLogos = [
    ...withCaseStudy,
    ...withoutCaseStudy,
  ].slice(0, 10)

  const [mobileLogos, setMobileLogos] = useState<typeof data.companies>([])

  useEffect(() => {
    const shuffled = [...withoutCaseStudy].sort(() => Math.random() - 0.5)
    const combined = [...withCaseStudy, ...shuffled].slice(0, 6)
    setMobileLogos(combined)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <section className="border-t border-b border-[#e5e7eb] bg-white">

      <p className="text-[11px] font-semibold tracking-widest uppercase text-[#c4c9d0] text-center py-6">
        Trusted by 100+ events and event teams
      </p>

      {/* Desktop grid — full width, 5 columns */}
      <div className="hidden md:grid grid-cols-5 border-l border-t border-[#f3f4f6]">
        {desktopLogos.map((company, i) => (
          <LogoCell key={i} company={company} />
        ))}
      </div>

      {/* Mobile grid — full width, 3 columns */}
      <div className="md:hidden grid grid-cols-3 border-l border-t border-[#f3f4f6]">
        {(mobileLogos.length > 0 ? mobileLogos : [...withCaseStudy, ...withoutCaseStudy].slice(0, 6)).map((company, i) => (
          <LogoCell key={i} company={company} />
        ))}
      </div>

    </section>
  )
}

function LogoCell({ company }: { company: SocialProof['companies'][0] }) {
  const inner = (
    <div className="relative flex flex-col items-center justify-center px-6 py-8 border-r border-b border-[#f3f4f6] h-24 group hover:bg-[#f9fafb] transition-colors">
      {company.logoUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={company.logoUrl}
          alt={company.name}
          className="h-7 w-auto object-contain max-w-[110px] grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
        />
      ) : (
        <span className="text-[13px] font-semibold text-[#9ca3af] group-hover:text-[#374151] transition-colors text-center">
          {company.name}
        </span>
      )}
      {company.caseStudyUrl && (
        <span
          className="absolute bottom-2 right-2 text-[8px] font-bold text-[#1a6cf5] uppercase tracking-wide"
          style={{ transform: 'rotate(-1.5deg)', borderBottom: '1px solid #1a6cf5', display: 'inline-block' }}
        >
          Case study ↗
        </span>
      )}
    </div>
  )

  if (company.caseStudyUrl) {
    return (
      <Link href={company.caseStudyUrl}>
        {inner}
      </Link>
    )
  }

  return <div>{inner}</div>
}
