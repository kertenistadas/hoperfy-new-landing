'use client'

import Link from 'next/link'
import type { SocialProof } from '@/types'

type Props = {
  data: SocialProof
}

export default function SocialProofBar({ data }: Props) {
  if (!data?.companies?.length) return null

  return (
    <section className="py-12 border-t border-[#e5e7eb] bg-[#d1d5db] overflow-hidden">
      <p className="text-[11px] font-semibold tracking-widest uppercase text-[#6b7280] text-center mb-8 px-6">
        {data.label}
      </p>

      {/* Desktop: infinite scrolling marquee */}
      <div className="hidden md:block relative">
        <div className="flex animate-marquee whitespace-nowrap gap-12 items-center">
          {[...data.companies, ...data.companies].map((company, i) => (
            <CompanyLogo key={i} company={company} />
          ))}
        </div>
      </div>

      {/* Mobile: 2-column tile grid */}
      <div className="md:hidden grid grid-cols-2 gap-px bg-[#c4c9d0] mx-6 rounded-xl overflow-hidden">
        {data.companies.map((company, i) => (
          <MobileTile key={i} company={company} />
        ))}
      </div>
    </section>
  )
}

function CompanyLogo({ company }: { company: SocialProof['companies'][0] }) {
  const img = company.logoUrl ? (
    <img
      src={company.logoUrl}
      alt={company.name}
      className="h-8 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity inline-block"
    />
  ) : (
    <span className="text-[14px] font-semibold text-[#6b7280]">{company.name}</span>
  )

  if (company.caseStudyUrl) {
    return (
      <Link href={company.caseStudyUrl} className="flex items-center gap-2 shrink-0 group">
        {img}
        <span className="text-[10px] font-semibold text-[#1a6cf5] bg-white px-2 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Read case study
        </span>
      </Link>
    )
  }

  return <div className="shrink-0">{img}</div>
}

function MobileTile({ company }: { company: SocialProof['companies'][0] }) {
  const content = (
    <div className="bg-[#d1d5db] aspect-square flex flex-col items-center justify-center p-6 relative">
      {company.caseStudyUrl && (
        <span className="absolute top-3 right-3 text-[9px] font-semibold text-[#1a6cf5] bg-white px-2 py-0.5 rounded-full">
          Case study ↗
        </span>
      )}
      {company.logoUrl ? (
        <img
          src={company.logoUrl}
          alt={company.name}
          className="h-10 w-auto object-contain max-w-[120px]"
        />
      ) : (
        <span className="text-[13px] font-semibold text-[#374151] text-center">{company.name}</span>
      )}
    </div>
  )

  if (company.caseStudyUrl) {
    return (
      <Link href={company.caseStudyUrl} className="block hover:bg-[#c4c9d0] transition-colors">
        {content}
      </Link>
    )
  }

  return <div>{content}</div>
}
