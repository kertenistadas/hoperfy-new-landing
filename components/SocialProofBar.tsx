'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import type { SocialProof } from '@/types'

type Props = {
  data: SocialProof
}

export default function SocialProofBar({ data }: Props) {
  const companies = data?.companies ?? []

  // Deterministic order for SSR + first client render (no shuffle) so the markup
  // matches on hydration; the shuffle happens only after mount below.
  const [mobileCompanies, setMobileCompanies] = useState<SocialProof['companies']>(() => {
    const withCaseStudy = companies.filter((c) => c.caseStudyUrl)
    const withoutCaseStudy = companies.filter((c) => !c.caseStudyUrl)
    return [...withCaseStudy, ...withoutCaseStudy].slice(0, 6)
  })

  // Shuffle the non-case-study logos client-side after mount.
  useEffect(() => {
    const withCaseStudy = companies.filter((c) => c.caseStudyUrl)
    const withoutCaseStudy = companies.filter((c) => !c.caseStudyUrl)
    const shuffled = [...withoutCaseStudy].sort(() => Math.random() - 0.5)
    setMobileCompanies([...withCaseStudy, ...shuffled].slice(0, 6))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!data?.companies?.length) return null

  return (
    <section className="py-14 px-6 border-t border-[#e5e7eb] bg-white overflow-hidden">
      <p className="text-[11px] font-semibold tracking-widest uppercase text-[#c4c9d0] text-center mb-10">
        Trusted by 100+ events and event teams
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
        {mobileCompanies.map((company, i) => (
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
          className="relative flex items-center justify-center rounded-xl px-5 py-3 transition-colors group-hover:bg-[#e0e2e5]"
          style={{ minWidth: '110px', minHeight: '52px', background: '#e8e9eb' }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={company.logoUrl}
            alt={company.name}
            className="h-6 w-auto object-contain opacity-60 group-hover:opacity-100 transition-all duration-300"
            style={{ maxWidth: '100px', filter: 'none' }}
          />
          {company.caseStudyUrl && (
            <span
              className="absolute bottom-1.5 right-2 text-[8px] font-bold text-[#1a6cf5] tracking-wide uppercase"
              style={{
                transform: 'rotate(-1.5deg)',
                borderBottom: '1px solid #1a6cf5',
                lineHeight: 1,
              }}
            >
              Case study ↗
            </span>
          )}
        </div>
      ) : (
        <span className="text-[13px] font-semibold text-[#9ca3af] group-hover:text-[#374151] transition-colors">
          {company.name}
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
          className="relative flex items-center justify-center rounded-xl px-5 py-3 transition-colors group-hover:bg-[#e0e2e5]"
          style={{ minWidth: '110px', minHeight: '52px', background: '#e8e9eb' }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={company.logoUrl}
            alt={company.name}
            className="h-6 w-auto object-contain opacity-60 group-hover:opacity-100 transition-all duration-300"
            style={{ maxWidth: '90px', filter: 'none' }}
          />
          {company.caseStudyUrl && (
            <span
              className="absolute bottom-1.5 right-2 text-[8px] font-bold text-[#1a6cf5] tracking-wide uppercase"
              style={{
                transform: 'rotate(-1.5deg)',
                borderBottom: '1px solid #1a6cf5',
                lineHeight: 1,
              }}
            >
              Case study ↗
            </span>
          )}
        </div>
      ) : (
        <span className="text-[12px] font-semibold text-[#9ca3af] text-center">
          {company.name}
        </span>
      )}
    </div>
  )

  if (company.caseStudyUrl) {
    return <Link href={company.caseStudyUrl}>{inner}</Link>
  }
  return <div>{inner}</div>
}
