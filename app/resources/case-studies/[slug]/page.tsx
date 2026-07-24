import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { PortableText } from '@portabletext/react'
import { client } from '@/sanity/lib/client'
import { caseStudyBySlugQuery } from '@/sanity/lib/queries'
import type { CaseStudy } from '@/types'
import NavWrapper from '@/components/NavWrapper'

export const dynamic = 'force-dynamic'

const BASE_URL = 'https://hoperfy.com'

type Props = {
  params: Promise<{ slug: string }>
}

async function getCaseStudy(slug: string): Promise<CaseStudy | null> {
  return client.fetch<CaseStudy | null>(caseStudyBySlugQuery, { slug }).catch(() => null)
}

function formatDate(iso: string) {
  if (!iso) return ''
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const study = await getCaseStudy(slug)

  if (!study) return { title: 'Not Found' }

  const title = study.metaTitle ?? `${study.title} | Hoperfy Case Study`
  const description = study.metaDescription ?? study.intro ?? ''
  const url = `${BASE_URL}/resources/case-studies/${slug}`

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: 'article',
    },
  }
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params
  const study = await getCaseStudy(slug)

  if (!study) notFound()

  const date = formatDate(study.publishedAt)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: study.title,
    description: study.metaDescription ?? study.intro,
    datePublished: study.publishedAt,
    publisher: { '@type': 'Organization', name: 'Hoperfy', url: BASE_URL },
    about: { '@type': 'Organization', name: study.clientName, url: study.clientWebsite },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${BASE_URL}/resources/case-studies/${slug}`,
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <NavWrapper>
        <main>
          {/* Hero */}
          <section className="pt-20 pb-12 px-6 border-b border-[#e5e7eb]">
            <div className="max-w-3xl mx-auto">
              <Link
                href="/resources/case-studies"
                className="text-[13px] text-[#6b7280] hover:text-[#0a0a0a] transition-colors"
              >
                ← All case studies
              </Link>

              {study.industry && <p className="eyebrow mt-6 mb-3">{study.industry}</p>}
              <h1 className="font-black text-[2rem] md:text-[3rem] tracking-tight text-[#0a0a0a] leading-[1.05]">
                {study.title}
              </h1>

              {study.clientLogoUrl && (
                <img
                  src={study.clientLogoUrl}
                  alt={study.clientName}
                  className="h-12 w-auto object-contain mt-6 mb-4"
                />
              )}
              {date && <p className="text-[13px] text-[#6b7280]">{date}</p>}
            </div>
          </section>

          {/* Key results */}
          {study.keyResults && study.keyResults.length > 0 && (
            <section className="bg-[#f9fafb] border-y border-[#e5e7eb] py-12 px-6">
              <div className="max-w-3xl mx-auto grid grid-cols-3 gap-8 text-center">
                {study.keyResults.map((result, i) => (
                  <div key={i}>
                    <p className="text-[3rem] font-black leading-none text-[#1a6cf5]">{result.value}</p>
                    <p className="text-[13px] text-[#6b7280] mt-1">{result.label}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Article body */}
          <article className="max-w-2xl mx-auto px-6 py-16">
            {study.intro && (
              <p className="text-[1.125rem] text-[#374151] leading-relaxed mb-10 font-light">
                {study.intro}
              </p>
            )}

            {study.challenge && study.challenge.length > 0 && (
              <section className="mb-10">
                <h2 className="font-black text-[1.25rem] mb-4 text-[#0a0a0a]">The Challenge</h2>
                <div className="prose-blog">
                  <PortableText value={study.challenge} />
                </div>
              </section>
            )}

            {study.solution && study.solution.length > 0 && (
              <section className="mb-10">
                <h2 className="font-black text-[1.25rem] mb-4 text-[#0a0a0a]">The Solution</h2>
                <div className="prose-blog">
                  <PortableText value={study.solution} />
                </div>
              </section>
            )}

            {study.result && study.result.length > 0 && (
              <section className="mb-10">
                <h2 className="font-black text-[1.25rem] mb-4 text-[#0a0a0a]">The Result</h2>
                <div className="prose-blog">
                  <PortableText value={study.result} />
                </div>
              </section>
            )}

            {study.quote && study.quote.text && (
              <div className="bg-[#eef4ff] border-l-4 border-[#1a6cf5] rounded-r-xl p-8 my-10">
                <p className="text-[1.125rem] font-light text-[#374151] italic mb-4">
                  “{study.quote.text}”
                </p>
                {study.quote.author && (
                  <p className="font-semibold text-[#0a0a0a]">{study.quote.author}</p>
                )}
                {study.quote.role && (
                  <p className="text-[13px] text-[#6b7280]">{study.quote.role}</p>
                )}
              </div>
            )}

            {study.whyItMatters && (
              <section className="mb-10">
                <h2 className="font-black text-[1.25rem] mb-4 text-[#0a0a0a]">Why It Matters</h2>
                <p className="text-[15px] text-[#6b7280] font-light leading-relaxed">
                  {study.whyItMatters}
                </p>
              </section>
            )}
          </article>

          {/* Related product CTA */}
          {study.relatedProduct && (
            <section className="px-6 pb-24">
              <div className="max-w-2xl mx-auto bg-[#eef4ff] border border-[#b8d0fe] rounded-xl p-8">
                <p className="eyebrow mb-2">Want results like these?</p>
                <h2 className="text-[1.375rem] font-black tracking-tight text-[#0a0a0a] mb-6">
                  Try {study.relatedProduct.title}
                </h2>
                <Link
                  href={`/products/${study.relatedProduct.slug}`}
                  className="inline-block h-12 px-6 leading-[3rem] text-[14px] font-medium bg-[#1a6cf5] text-white rounded-lg hover:bg-[#1558cc] transition-colors"
                >
                  Explore {study.relatedProduct.title} →
                </Link>
              </div>
            </section>
          )}
        </main>
      </NavWrapper>
    </>
  )
}
