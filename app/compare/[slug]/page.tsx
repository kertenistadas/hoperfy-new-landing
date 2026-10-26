import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { PortableText } from '@portabletext/react'
import { client } from '@/sanity/lib/client'
import { comparisonBySlugQuery } from '@/sanity/lib/queries'
import type { Comparison } from '@/types'
import NavWrapper from '@/components/NavWrapper'
import KeyTakeaways from '@/components/blog/KeyTakeaways'
import PostDate from '@/components/blog/PostDate'
import ComparisonTable from '@/components/compare/ComparisonTable'
import { comparisonBodyComponents } from '@/components/compare/comparisonBody'

export const dynamic = 'force-dynamic'

const BASE_URL = 'https://hoperfy.com'

type Props = {
  params: Promise<{ slug: string }>
}

const typeLabels: Record<string, string> = {
  'head-to-head': 'Head to head',
  alternatives: 'Alternatives',
  category: 'Category comparison',
}

async function getComparison(slug: string): Promise<Comparison | null> {
  return client.fetch<Comparison | null>(comparisonBySlugQuery, { slug }).catch(() => null)
}

/** The updated date only counts when it is later than the publish date. */
function laterUpdate(comparison: Comparison) {
  const { publishedAt, updatedAt } = comparison
  return publishedAt && updatedAt && new Date(updatedAt) > new Date(publishedAt) ? updatedAt : null
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const comparison = await getComparison(slug)

  if (!comparison) return {}

  const title = comparison.seoTitle || `${comparison.title} | Hoperfy`
  const description = comparison.metaDescription || comparison.intro || undefined
  const url = `${BASE_URL}/compare/${slug}`

  return {
    title: { absolute: title },
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

export default async function ComparisonPage({ params }: Props) {
  const { slug } = await params
  const comparison = await getComparison(slug)

  if (!comparison) notFound()

  const url = `${BASE_URL}/compare/${slug}`
  const published = comparison.publishedAt || null
  const updated = laterUpdate(comparison)
  const faqs = (comparison.faqs ?? []).filter((faq) => faq.question && faq.answer)

  // Built from the same fields the page renders. No Review, rating or Product markup.
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        '@id': `${url}#article`,
        headline: comparison.title,
        description: comparison.metaDescription || comparison.intro || undefined,
        datePublished: published || undefined,
        dateModified: updated || published || undefined,
        mainEntityOfPage: url,
        author: { '@id': 'https://hoperfy.com/#organization' },
        publisher: { '@id': 'https://hoperfy.com/#organization' },
      },
      ...(faqs.length
        ? [
            {
              '@type': 'FAQPage',
              '@id': `${url}#faq`,
              mainEntity: faqs.map((faq) => ({
                '@type': 'Question',
                name: faq.question,
                acceptedAnswer: { '@type': 'Answer', text: faq.answer },
              })),
            },
          ]
        : []),
    ],
  }

  return (
    <NavWrapper>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="pt-32 pb-24 px-6">
        <article className="max-w-2xl mx-auto">
          <header>
            {comparison.comparisonType && (
              <p className="eyebrow mb-3">{typeLabels[comparison.comparisonType]}</p>
            )}
            <h1 className="text-[2rem] md:text-[3rem] font-black tracking-tight text-[#0a0a0a] mb-4">
              {comparison.title}
            </h1>
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px] text-[#6b7280] mb-8">
              {published && (
                <span>
                  {updated ? (
                    <>
                      Updated <PostDate iso={updated} />
                      <span className="sr-only">
                        , published <PostDate iso={published} />
                      </span>
                    </>
                  ) : (
                    <>
                      Published <PostDate iso={published} />
                    </>
                  )}
                </span>
              )}
              {published && comparison.lastVerified && <span>·</span>}
              {comparison.lastVerified && (
                <span>
                  Last verified <PostDate iso={comparison.lastVerified} />
                </span>
              )}
            </div>
            {comparison.intro && (
              <p className="text-[18px] font-light text-[#374151] leading-relaxed mb-10">
                {comparison.intro}
              </p>
            )}
          </header>

          <KeyTakeaways takeaways={comparison.keyTakeaways} />

          <ComparisonTable table={comparison.comparisonTable} label={`${comparison.title}, comparison table`} />

          {comparison.body && comparison.body.length > 0 && (
            <div className="prose-blog">
              <PortableText value={comparison.body} components={comparisonBodyComponents} />
            </div>
          )}

          {faqs.length > 0 && (
            <section className="mt-16 border-t border-[#e5e7eb] pt-10">
              <h2 className="text-[1.375rem] font-black tracking-tight text-[#0a0a0a] mb-6">
                Frequently asked questions
              </h2>
              <div className="divide-y divide-[#e5e7eb]">
                {faqs.map((faq) => (
                  <div key={faq._key} className="py-5">
                    <h3 className="text-[16px] font-semibold text-[#0a0a0a] mb-2">{faq.question}</h3>
                    <p className="text-[15px] font-light text-[#374151] leading-relaxed whitespace-pre-line">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {comparison.relatedProduct && (
            <div className="mt-12 bg-[#eef4ff] border border-[#b8d0fe] rounded-xl p-6">
              <p className="text-[16px] font-semibold text-[#0a0a0a] mb-3">
                Want to learn more about {comparison.relatedProduct.title}?
              </p>
              <Link
                href={`/products/${comparison.relatedProduct.slug}`}
                className="inline-block text-[14px] font-medium text-[#1a6cf5] hover:text-[#1558cc] transition-colors"
              >
                Explore {comparison.relatedProduct.title} →
              </Link>
            </div>
          )}
        </article>
      </main>
    </NavWrapper>
  )
}
