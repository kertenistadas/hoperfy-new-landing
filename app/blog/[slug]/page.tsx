import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { PortableText, type PortableTextComponents } from '@portabletext/react'
import { client } from '@/sanity/lib/client'
import { blogPostBySlugQuery } from '@/sanity/lib/queries'
import type { BlogPost } from '@/types'
import NavWrapper from '@/components/NavWrapper'
import BlogPostCard from '@/components/blog/BlogPostCard'
import KeyTakeaways from '@/components/blog/KeyTakeaways'
import PostDate from '@/components/blog/PostDate'
import BlogImage from '@/components/blog/BlogImage'

export const dynamic = 'force-dynamic'

const BASE_URL = 'https://hoperfy.com'

type Props = {
  params: Promise<{ slug: string }>
}

async function getPost(slug: string): Promise<BlogPost | null> {
  return client.fetch<BlogPost | null>(blogPostBySlugQuery, { slug }).catch(() => null)
}

const portableTextComponents: PortableTextComponents = {
  types: {
    image: ({ value }) => <BlogImage value={value} />,
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

const TAKEAWAYS_DEPTH = 0.4
const MIN_BLOCKS_TO_SPLIT = 6

/** Only the fields the placement logic needs off a Portable Text block. */
type BodyBlock = { _type?: string; style?: string }

function hasStyle(block: BodyBlock | undefined, style: string) {
  return block?._type === 'block' && block?.style === style
}

/**
 * Index in the body array at which the Key Takeaways block is spliced in.
 *
 * Aims roughly two fifths down the article, then moves forward to the next
 * section heading so the block lands on a boundary instead of interrupting a
 * paragraph. H3 is used only when no H2 follows the target. Articles too short
 * to split keep the block just after the intro, past any leading image.
 */
function takeawaysIndex(body: BodyBlock[]): number {
  if (body.length < MIN_BLOCKS_TO_SPLIT) {
    let i = 0
    while (i < body.length && body[i]?._type === 'image') i++
    return i
  }

  const target = Math.floor(body.length * TAKEAWAYS_DEPTH)

  const nextHeading = (style: string) => {
    for (let i = target; i < body.length; i++) {
      if (hasStyle(body[i], style)) return i
    }
    return -1
  }

  const h2 = nextHeading('h2')
  if (h2 >= 0) return h2

  const h3 = nextHeading('h3')
  if (h3 >= 0) return h3

  return target
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) return {}

  const title = post.metaTitle || post.title
  const description = post.metaDescription || post.excerpt
  const url = `${BASE_URL}/blog/${slug}`

  return {
    title: { absolute: `${title} | Hoperfy` },
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

  const published = post.publishedAt || null
  // An update only counts when it is later than the publish date.
  const updated =
    published && post.updatedAt && new Date(post.updatedAt) > new Date(published)
      ? post.updatedAt
      : null

  const body = post.body ?? []
  const hasTakeaways = Boolean(post.keyTakeaways?.length)

  const splitAt = takeawaysIndex(body)
  const bodyBefore = body.slice(0, splitAt)
  const bodyAfter = body.slice(splitAt)

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
              {published && (
                <>
                  <span>·</span>
                  {updated ? (
                    <span>
                      Updated <PostDate iso={updated} />
                      {/* Publish date stays in the markup for crawlers. */}
                      <span className="sr-only">
                        , published <PostDate iso={published} />
                      </span>
                    </span>
                  ) : (
                    <span>
                      Published <PostDate iso={published} />
                    </span>
                  )}
                </>
              )}
            </div>
            {post.excerpt && (
              <p className="text-[18px] font-light text-[#374151] leading-relaxed mb-10">
                {post.excerpt}
              </p>
            )}
          </header>

          {hasTakeaways ? (
            <>
              {bodyBefore.length > 0 && (
                <div className="prose-blog">
                  <PortableText value={bodyBefore} components={portableTextComponents} />
                </div>
              )}

              <KeyTakeaways
                takeaways={post.keyTakeaways}
                ctaLabel={post.takeawaysCtaLabel}
                ctaHref={post.takeawaysCtaHref}
              />

              {bodyAfter.length > 0 && (
                <div className="prose-blog">
                  <PortableText value={bodyAfter} components={portableTextComponents} />
                </div>
              )}
            </>
          ) : (
            /* Untouched original branch, so articles without takeaways render
               byte for byte as they did before this block existed. */
            <div className="prose-blog">
              {post.body && <PortableText value={post.body} components={portableTextComponents} />}
            </div>
          )}

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
