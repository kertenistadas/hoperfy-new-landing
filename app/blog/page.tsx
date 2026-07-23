import type { Metadata } from 'next'
import { Suspense } from 'react'
import { client } from '@/sanity/lib/client'
import { blogPostsQuery, blogCategoriesQuery } from '@/sanity/lib/queries'
import type { BlogPostCard, BlogCategory } from '@/types'
import NavWrapper from '@/components/NavWrapper'
import BlogList from '@/components/blog/BlogList'

export const dynamic = 'force-dynamic'

const BASE_URL = 'https://hoperfy.com'

export const metadata: Metadata = {
  title: 'Blog | Hoperfy',
  description: 'Strategy, tools, and industry thinking for professional event organizers.',
  alternates: { canonical: `${BASE_URL}/blog` },
  openGraph: {
    title: 'Insights for event teams | Hoperfy',
    description: 'Strategy, tools, and industry thinking for professional event organizers.',
    url: `${BASE_URL}/blog`,
    type: 'website',
  },
}

export default async function BlogIndexPage() {
  const [posts, categories] = await Promise.all([
    client.fetch<BlogPostCard[]>(blogPostsQuery).catch(() => []),
    client.fetch<BlogCategory[]>(blogCategoriesQuery).catch(() => []),
  ])

  return (
    <NavWrapper>
      <main className="pt-32 pb-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12">
            <p className="eyebrow mb-3">From the blog</p>
            <h1 className="text-[2rem] md:text-[3rem] font-black tracking-tight text-[#0a0a0a] mb-4">
              Insights for event teams
            </h1>
            <p className="text-[16px] font-light text-[#6b7280] max-w-2xl">
              Strategy, tools, and industry thinking for professional event organizers.
            </p>
          </div>

          <Suspense>
            <BlogList posts={posts} categories={categories} />
          </Suspense>
        </div>
      </main>
    </NavWrapper>
  )
}
