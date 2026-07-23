'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import type { BlogCategory, BlogPostCard } from '@/types'
import BlogPostCardComponent from './BlogPostCard'

type Props = {
  posts: BlogPostCard[]
  categories: BlogCategory[]
}

function pillClass(active: boolean) {
  return `text-[12px] font-medium px-3 py-1 rounded-full transition-colors ${
    active ? 'bg-[#1a6cf5] text-white' : 'bg-[#f3f4f6] text-[#374151] hover:bg-[#e5e7eb]'
  }`
}

export default function BlogList({ posts, categories }: Props) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const active = searchParams.get('category')

  const filtered = active ? posts.filter((post) => post.category?.slug === active) : posts

  function setCategory(slug: string | null) {
    const params = new URLSearchParams(searchParams.toString())
    if (slug) params.set('category', slug)
    else params.delete('category')
    const qs = params.toString()
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false })
  }

  return (
    <>
      {/* Category filter pills */}
      <div className="flex flex-wrap gap-2 mb-12">
        <button type="button" onClick={() => setCategory(null)} className={pillClass(!active)}>
          All
        </button>
        {categories.map((category) => (
          <button
            key={category._id}
            type="button"
            onClick={() => setCategory(category.slug)}
            className={pillClass(active === category.slug)}
          >
            {category.title}
          </button>
        ))}
      </div>

      {posts.length === 0 ? (
        <p className="text-[15px] text-[#6b7280]">No posts yet. Check back soon.</p>
      ) : filtered.length === 0 ? (
        <p className="text-[15px] text-[#6b7280]">No posts in this category yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filtered.map((post) => (
            <BlogPostCardComponent key={post._id} post={post} />
          ))}
        </div>
      )}
    </>
  )
}
