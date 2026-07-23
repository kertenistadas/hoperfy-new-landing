import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { client } from '@/sanity/lib/client'
import { blogPostsByCategoryQuery, blogCategoriesQuery } from '@/sanity/lib/queries'
import type { BlogPostCard as BlogPostCardType, BlogCategory } from '@/types'
import NavWrapper from '@/components/NavWrapper'
import BlogPostCard from '@/components/blog/BlogPostCard'

export const dynamic = 'force-dynamic'

const BASE_URL = 'https://hoperfy.com'

type Props = {
  params: Promise<{ slug: string }>
}

function pillClass(active: boolean) {
  return `text-[12px] font-medium px-3 py-1 rounded-full transition-colors ${
    active ? 'bg-[#1a6cf5] text-white' : 'bg-[#f3f4f6] text-[#374151] hover:bg-[#e5e7eb]'
  }`
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const categories = await client.fetch<BlogCategory[]>(blogCategoriesQuery).catch(() => [])
  const category = categories.find((c) => c.slug === slug)

  if (!category) return {}

  const url = `${BASE_URL}/blog/category/${slug}`

  return {
    title: `${category.title} | Hoperfy Blog`,
    description: category.description || `Articles about ${category.title} from the Hoperfy blog.`,
    alternates: { canonical: url },
    openGraph: {
      title: `${category.title} | Hoperfy Blog`,
      description: category.description || `Articles about ${category.title} from the Hoperfy blog.`,
      url,
      type: 'website',
    },
  }
}

export default async function BlogCategoryPage({ params }: Props) {
  const { slug } = await params

  const [posts, categories] = await Promise.all([
    client.fetch<BlogPostCardType[]>(blogPostsByCategoryQuery, { category: slug }).catch(() => []),
    client.fetch<BlogCategory[]>(blogCategoriesQuery).catch(() => []),
  ])

  const category = categories.find((c) => c.slug === slug)

  if (!category) notFound()

  return (
    <NavWrapper>
      <main className="pt-32 pb-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12">
            <p className="eyebrow mb-3">From the blog</p>
            <h1 className="text-[2rem] md:text-[3rem] font-black tracking-tight text-[#0a0a0a] mb-4">
              {category.title}
            </h1>
            {category.description && (
              <p className="text-[16px] font-light text-[#6b7280] max-w-2xl">{category.description}</p>
            )}
          </div>

          {/* Category filter pills */}
          <div className="flex flex-wrap gap-2 mb-12">
            <Link href="/blog" className={pillClass(false)}>
              All
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat._id}
                href={`/blog/category/${cat.slug}`}
                className={pillClass(cat.slug === slug)}
              >
                {cat.title}
              </Link>
            ))}
          </div>

          {posts.length === 0 ? (
            <p className="text-[15px] text-[#6b7280]">No posts yet. Check back soon.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {posts.map((post) => (
                <BlogPostCard key={post._id} post={post} />
              ))}
            </div>
          )}
        </div>
      </main>
    </NavWrapper>
  )
}
