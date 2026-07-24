import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PortableText, type PortableTextComponents } from '@portabletext/react'
import { client } from '@/sanity/lib/client'
import { pageBySlugQuery } from '@/sanity/lib/queries'
import type { Page } from '@/types'
import NavWrapper from '@/components/NavWrapper'

export const dynamic = 'force-dynamic'

const BASE_URL = 'https://hoperfy.com'

type Props = {
  params: Promise<{ slug: string }>
}

async function getPage(slug: string): Promise<Page | null> {
  return client.fetch<Page | null>(pageBySlugQuery, { slug }).catch(() => null)
}

const portableTextComponents: PortableTextComponents = {
  marks: {
    link: ({ value, children }) => {
      const href = value?.href ?? '#'
      const blank = value?.blank
      return (
        <a href={href} {...(blank ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
          {children}
        </a>
      )
    },
  },
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const page = await getPage(slug)

  if (!page) return { title: 'Not Found' }

  return {
    title: page.title,
    description: page.metaDescription ?? '',
    alternates: { canonical: `${BASE_URL}/resources/${slug}` },
  }
}

export default async function ResourcePage({ params }: Props) {
  const { slug } = await params
  const page = await getPage(slug)

  if (!page) notFound()

  return (
    <NavWrapper>
      <main className="pt-28 pb-24 px-6">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-[1.75rem] md:text-[2.5rem] font-black tracking-tight text-[#0a0a0a] mb-8">
            {page.title}
          </h1>
          <div className="prose-legal">
            <PortableText value={page.body ?? []} components={portableTextComponents} />
          </div>
        </div>
      </main>
    </NavWrapper>
  )
}
