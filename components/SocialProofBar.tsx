'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import type { SocialProof } from '@/types'

type Props = {
  data: SocialProof
  /** One row only: 6 logos on desktop, 3 on mobile. The homepage keeps the default two rows. */
  singleRow?: boolean
}

export default function SocialProofBar({ data, singleRow = false }: Props) {
  if (!data?.companies?.length) return null

  const desktopCount = singleRow ? 6 : 10
  const mobileCount = singleRow ? 3 : 6
  // The single-row bar runs edge to edge, so it drops the outer left/right lines.
  const gridEdges = singleRow ? 'border-t' : 'border-l border-t'

  const withCaseStudy = data.companies.filter(c => c.caseStudyUrl)
  const withoutCaseStudy = data.companies.filter(c => !c.caseStudyUrl)

  const desktopLogos = [
    ...withCaseStudy,
    ...withoutCaseStudy,
  ].slice(0, desktopCount)

  const [mobileLogos, setMobileLogos] = useState<typeof data.companies>([])

  useEffect(() => {
    const shuffled = [...withoutCaseStudy].sort(() => Math.random() - 0.5)
    const combined = [...withCaseStudy, ...shuffled].slice(0, mobileCount)
    setMobileLogos(combined)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <section className="border-t border-b border-[#e5e7eb] bg-[#f5f5f5]">

      <p className="text-[11px] font-semibold tracking-widest uppercase text-[#b0b0b0] text-center py-6">
        Trusted by 100+ events and event teams
      </p>

      {/* Desktop grid — full width, 5 columns */}
      <div className={`hidden md:grid ${singleRow ? 'grid-cols-6' : 'grid-cols-5'} ${gridEdges} border-[#f3f4f6]`}>
        {desktopLogos.map((company, i, all) => (
          <LogoCell key={i} company={company} noRightBorder={singleRow && i === all.length - 1} />
        ))}
      </div>

      {/* Mobile grid — full width, 3 columns */}
      <div className={`md:hidden grid grid-cols-3 ${gridEdges} border-[#f3f4f6]`}>
        {(mobileLogos.length > 0 ? mobileLogos : [...withCaseStudy, ...withoutCaseStudy].slice(0, mobileCount)).map((company, i, all) => (
          <LogoCell key={i} company={company} noRightBorder={singleRow && i === all.length - 1} />
        ))}
      </div>

    </section>
  )
}

function LogoCell({ company, noRightBorder = false }: { company: SocialProof['companies'][0]; noRightBorder?: boolean }) {
  const inner = (
    <div className={`relative flex flex-col items-center justify-center px-6 py-8 ${noRightBorder ? '' : 'border-r '}border-b border-[#ebebeb] h-24 group bg-[#f5f5f5] hover:bg-[#eeeeee] transition-colors`}>
      {company.logoUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={company.logoUrl}
          alt={company.name ?? ''}
          className="h-7 w-auto object-contain max-w-[110px] opacity-70 group-hover:opacity-100 transition-all duration-300"
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
