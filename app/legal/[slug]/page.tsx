import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PortableText, type PortableTextComponents } from '@portabletext/react'
import { client } from '@/sanity/lib/client'
import { legalPageQuery } from '@/sanity/lib/queries'
import type { LegalPage } from '@/types'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

export const dynamic = 'force-dynamic'

const BASE_URL = 'https://hoperfy.com'

type Props = {
  params: Promise<{ slug: string }>
}

async function getLegalPage(slug: string): Promise<LegalPage | null> {
  return client
    .fetch<LegalPage | null>(legalPageQuery, { slug })
    .catch(() => null)
}

const portableTextComponents: PortableTextComponents = {
  marks: {
    link: ({ value, children }) => {
      const href = value?.href ?? '#'
      const blank = value?.blank
      return (
        <a
          href={href}
          {...(blank ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
          {children}
        </a>
      )
    },
  },
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const page = await getLegalPage(slug)

  if (!page) return {}

  return {
    title: page.title,
    description: `${page.title} — Hoperfy`,
    alternates: { canonical: `${BASE_URL}/legal/${slug}` },
    robots: { index: true, follow: true },
  }
}

export default async function LegalPageRoute({ params }: Props) {
  const { slug } = await params
  const page = await getLegalPage(slug)

  if (!page) notFound()

  const lastUpdated = page.lastUpdated
    ? new Date(page.lastUpdated).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null

  return (
    <>
      <Nav />
      <main className="pt-32 pb-24 px-6">
        <article className="max-w-2xl mx-auto">
          <h1 className="text-[2rem] md:text-[2.5rem] font-black tracking-tight text-[#0a0a0a] mb-3">
            {page.title}
          </h1>
          {lastUpdated && (
            <p className="text-[13px] text-[#6b7280] mb-12">Last updated {lastUpdated}</p>
          )}

          <div className="prose-legal">
            {page.body && (
              <PortableText value={page.body} components={portableTextComponents} />
            )}
          </div>
        </article>
      </main>
      <Footer />
    </>
  )
}
