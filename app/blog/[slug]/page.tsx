import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { PortableText, type PortableTextComponents } from '@portabletext/react'
import { client } from '@/sanity/lib/client'
import { blogPostBySlugQuery } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import type { BlogPost } from '@/types'
import NavWrapper from '@/components/NavWrapper'
import BlogPostCard from '@/components/blog/BlogPostCard'

export const dynamic = 'force-dynamic'

const BASE_URL = 'https://hoperfy.com'

type Props = {
  params: Promise<{ slug: string }>
}

async function getPost(slug: string): Promise<BlogPost | null> {
  return client.fetch<BlogPost | null>(blogPostBySlugQuery, { slug }).catch(() => null)
}

function formatDate(iso: string) {
  if (!iso) return ''
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

const portableTextComponents: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null
      const url = urlFor(value).width(1600).fit('max').auto('format').url()
      return (
        <figure>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={url} alt={value.alt || ''} />
          {value.caption && (
            <figcaption className="text-[13px] text-[#6b7280] text-center mt-2">
              {value.caption}
            </figcaption>
          )}
        </figure>
      )
    },
  },
  marks: {
    link: ({ value, children }) => {
      const href: string = value?.href ?? '#'
      // Internal links use the Next.js router; external links open in a new tab.
      if (href.startsWith('/')) {
        return <Link href={href}>{children}</Link>
      }
      return (
        <a href={href} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      )
    },
  },
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) return {}

  const title = post.metaTitle || post.title
  const description = post.metaDescription || post.excerpt
  const url = `${BASE_URL}/blog/${slug}`

  return {
    title: `${title} | Hoperfy`,
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

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) notFound()

  const date = formatDate(post.publishedAt)

  return (
    <NavWrapper>
      <main className="pt-32 pb-24 px-6">
        <article className="max-w-2xl mx-auto">
          <header>
            {post.category && <p className="eyebrow mb-3">{post.category.title}</p>}
            <h1 className="text-[2rem] md:text-[3rem] font-black tracking-tight text-[#0a0a0a] mb-4">
              {post.title}
            </h1>
            <div className="flex items-center gap-2 text-[13px] text-[#6b7280] mb-8">
              <span>{post.author}</span>
              {date && (
                <>
                  <span>·</span>
                  <span>{date}</span>
                </>
              )}
            </div>
            {post.excerpt && (
              <p className="text-[18px] font-light text-[#374151] leading-relaxed mb-10">
                {post.excerpt}
              </p>
            )}
          </header>

          <div className="prose-blog">
            {post.body && <PortableText value={post.body} components={portableTextComponents} />}
          </div>

          {post.relatedProduct && (
            <div className="mt-12 bg-[#eef4ff] border border-[#b8d0fe] rounded-xl p-6">
              <p className="text-[16px] font-semibold text-[#0a0a0a] mb-3">
                Want to learn more about {post.relatedProduct.title}?
              </p>
              <Link
                href={`/products/${post.relatedProduct.slug}`}
                className="inline-block text-[14px] font-medium text-[#1a6cf5] hover:text-[#1558cc] transition-colors"
              >
                Explore {post.relatedProduct.title} →
              </Link>
            </div>
          )}
        </article>

        {post.relatedPosts && post.relatedPosts.length > 0 && (
          <section className="max-w-5xl mx-auto mt-24">
            <h2 className="text-[1.375rem] font-black tracking-tight text-[#0a0a0a] mb-8">
              More from the blog
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {post.relatedPosts.map((related) => (
                <BlogPostCard key={related._id} post={related} />
              ))}
            </div>
          </section>
        )}
      </main>
    </NavWrapper>
  )
}
