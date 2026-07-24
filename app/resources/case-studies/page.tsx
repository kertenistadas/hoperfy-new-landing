import type { Metadata } from 'next'
import Link from 'next/link'
import { client } from '@/sanity/lib/client'
import { socialProofQuery } from '@/sanity/lib/queries'
import type { SocialProof } from '@/types'
import NavWrapper from '@/components/NavWrapper'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Case Studies — How event teams use Hoperfy',
  description:
    'Real results from real event teams. See how professional event organizers use Hoperfy to manage hotel booking and ticket sales.',
  alternates: { canonical: 'https://hoperfy.com/resources/case-studies' },
}

export default async function CaseStudiesPage() {
  const socialProof = await client.fetch<SocialProof>(socialProofQuery).catch(() => null)
  const caseStudies = socialProof?.companies?.filter((c) => c.caseStudyUrl) ?? []

  return (
    <NavWrapper>
      <main>
        <section className="pt-32 pb-16 px-6 border-b border-[#e5e7eb]">
          <div className="max-w-2xl mx-auto text-center">
            <p className="eyebrow mb-6">Case Studies</p>
            <h1 className="text-[2.75rem] md:text-[3.5rem] font-black leading-[1.05] tracking-tight text-[#0a0a0a] mb-6">
              How event teams use Hoperfy
            </h1>
            <p className="text-lg font-light text-[#6b7280] leading-relaxed">
              Real results from real event teams.
            </p>
          </div>
        </section>

        <section className="py-24 px-6">
          <div className="max-w-4xl mx-auto">
            {caseStudies.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-6">
                {caseStudies.map((company, i) => (
                  <Link
                    key={i}
                    href={company.caseStudyUrl!}
                    className="group border border-[#e5e7eb] rounded-xl p-8 hover:border-[#1a6cf5] hover:shadow-lg hover:shadow-blue-500/5 transition-all block"
                  >
                    {company.logoUrl && (
                      <img
                        src={company.logoUrl}
                        alt={company.name}
                        className="h-10 w-auto object-contain mb-6"
                      />
                    )}
                    <h2 className="text-[1.125rem] font-black tracking-tight text-[#0a0a0a] mb-3">
                      {company.name}
                    </h2>
                    <span className="text-[13px] font-medium text-[#1a6cf5] group-hover:underline">
                      Read case study →
                    </span>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-center text-[#9ca3af] text-[15px]">
                Case studies coming soon. Check back shortly.
              </p>
            )}
          </div>
        </section>
      </main>
    </NavWrapper>
  )
}
