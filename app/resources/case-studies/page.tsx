import type { Metadata } from 'next'
import Link from 'next/link'
import { client } from '@/sanity/lib/client'
import { caseStudiesQuery } from '@/sanity/lib/queries'
import type { CaseStudyCard } from '@/types'
import NavWrapper from '@/components/NavWrapper'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Case Studies — How event teams use Hoperfy',
  description:
    'Real results from real event teams. See how professional event organizers use Hoperfy to manage hotel booking and ticket sales.',
  alternates: { canonical: 'https://hoperfy.com/resources/case-studies' },
}

const collectionJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Hoperfy Case Studies',
  description:
    'Real results from event teams using Hoperfy hotel booking and ticketing software.',
  url: 'https://hoperfy.com/resources/case-studies',
}

export default async function CaseStudiesPage() {
  const caseStudies = await client.fetch<CaseStudyCard[]>(caseStudiesQuery).catch(() => [])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />
      <NavWrapper>
        <main>
          <section className="pt-32 pb-16 px-6 border-b border-[#e5e7eb]">
            <div className="max-w-2xl mx-auto text-center">
              <p className="eyebrow mb-6">Case Studies</p>
              <h1 className="text-[2.75rem] md:text-[3.5rem] font-black leading-[1.05] tracking-tight text-[#0a0a0a] mb-6">
                How event teams use Hoperfy
              </h1>
              <p className="text-lg font-light text-[#6b7280] leading-relaxed">
                Real results from real event organizers.
              </p>
            </div>
          </section>

          <section className="max-w-4xl mx-auto px-6 py-24">
            {caseStudies.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-6">
                {caseStudies.map((study) => (
                  <Link
                    key={study._id}
                    href={`/resources/case-studies/${study.slug}`}
                    className="group border border-[#e5e7eb] rounded-xl p-8 hover:border-[#1a6cf5] hover:shadow-lg transition-all block"
                  >
                    {study.clientLogoUrl && (
                      <img
                        src={study.clientLogoUrl}
                        alt={study.clientName}
                        className="h-10 w-auto object-contain mb-6"
                      />
                    )}
                    {study.industry && <p className="eyebrow mb-2">{study.industry}</p>}
                    <h2 className="text-[1.125rem] font-black tracking-tight text-[#0a0a0a]">
                      {study.clientName}
                    </h2>
                    {study.intro && (
                      <p className="line-clamp-2 text-[14px] text-[#6b7280] font-light mt-2 mb-4">
                        {study.intro}
                      </p>
                    )}
                    {study.keyResults && study.keyResults.length > 0 && (
                      <div className="flex gap-3 flex-wrap mb-6">
                        {study.keyResults.map((result, i) => (
                          <span
                            key={i}
                            className="bg-[#eef4ff] text-[#1a6cf5] text-[12px] font-semibold px-3 py-1 rounded-full"
                          >
                            {result.value} {result.label}
                          </span>
                        ))}
                      </div>
                    )}
                    <span className="text-[13px] font-medium text-[#1a6cf5] group-hover:underline">
                      Read case study →
                    </span>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-center text-[#9ca3af] text-[15px]">Case studies coming soon.</p>
            )}
          </section>
        </main>
      </NavWrapper>
    </>
  )
}
