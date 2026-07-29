'use client'

import Link from 'next/link'
import type { SocialProof } from '@/types'

type Props = {
  data: SocialProof
}

export default function SocialProofBar({ data }: Props) {
  if (!data?.companies?.length) return null

  return (
    <section className="py-14 px-6 border-t border-[#e5e7eb] bg-white overflow-hidden">
      <p className="text-[11px] font-semibold tracking-widest uppercase text-[#c4c9d0] text-center mb-10">
        {data.label}
      </p>

      {/* Desktop: infinite marquee */}
      <div className="hidden md:block relative">
        {/* Fade edges left and right */}
        <div
          className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, white, transparent)' }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, white, transparent)' }}
        />

        <div className="flex animate-marquee gap-16 items-end whitespace-nowrap">
          {[...data.companies, ...data.companies].map((company, i) => (
            <DesktopLogo key={i} company={company} />
          ))}
        </div>
      </div>

      {/* Mobile: 2-column grid, no bubbles */}
      <div className="md:hidden grid grid-cols-2 gap-6">
        {data.companies.map((company, i) => (
          <MobileLogo key={i} company={company} />
        ))}
      </div>
    </section>
  )
}

function DesktopLogo({ company }: { company: SocialProof['companies'][0] }) {
  const inner = (
    <div className="flex flex-col items-center gap-2 group shrink-0">
      {company.logoUrl ? (
        <div
          className="flex items-center justify-center rounded-lg px-4 py-2.5 bg-[#f8f8f8] group-hover:bg-[#f3f4f6] transition-colors"
          style={{ minWidth: '100px', minHeight: '48px' }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={company.logoUrl}
            alt={company.name}
            className="h-6 w-auto object-contain opacity-60 group-hover:opacity-100 transition-all duration-300"
            style={{ maxWidth: '100px', filter: 'none' }}
          />
        </div>
      ) : (
        <span className="text-[13px] font-semibold text-[#9ca3af] group-hover:text-[#374151] transition-colors">
          {company.name}
        </span>
      )}
      {company.caseStudyUrl && (
        <span
          className="text-[9px] font-bold text-[#1a6cf5] tracking-wide uppercase whitespace-nowrap"
          style={{
            transform: 'rotate(-2deg)',
            display: 'inline-block',
            borderBottom: '1.5px solid #1a6cf5',
            paddingBottom: '1px',
            marginTop: '4px',
          }}
        >
          Case study ↗
        </span>
      )}
    </div>
  )

  if (company.caseStudyUrl) {
    return <Link href={company.caseStudyUrl}>{inner}</Link>
  }
  return <div>{inner}</div>
}

function MobileLogo({ company }: { company: SocialProof['companies'][0] }) {
  const inner = (
    <div className="flex flex-col items-center justify-center gap-2 py-4 group">
      {company.logoUrl ? (
        <div
          className="flex items-center justify-center rounded-lg px-4 py-2.5 bg-[#f8f8f8] group-hover:bg-[#f3f4f6] transition-colors"
          style={{ minWidth: '100px', minHeight: '48px' }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={company.logoUrl}
            alt={company.name}
            className="h-6 w-auto object-contain opacity-60 group-hover:opacity-100 transition-all duration-300"
            style={{ maxWidth: '90px', filter: 'none' }}
          />
        </div>
      ) : (
        <span className="text-[12px] font-semibold text-[#9ca3af] text-center">
          {company.name}
        </span>
      )}
      {company.caseStudyUrl && (
        <span
          className="text-[9px] font-bold text-[#1a6cf5] tracking-wide uppercase whitespace-nowrap"
          style={{
            transform: 'rotate(-2deg)',
            display: 'inline-block',
            borderBottom: '1.5px solid #1a6cf5',
            paddingBottom: '1px',
            marginTop: '4px',
          }}
        >
          Case study ↗
        </span>
      )}
    </div>
  )

  if (company.caseStudyUrl) {
    return <Link href={company.caseStudyUrl}>{inner}</Link>
  }
  return <div>{inner}</div>
}
