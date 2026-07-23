import Link from 'next/link'
import type { BlogPostCard as BlogPostCardType } from '@/types'

function formatDate(iso: string) {
  if (!iso) return ''
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default function BlogPostCard({ post }: { post: BlogPostCardType }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col border border-[#e5e7eb] rounded-xl p-6 hover:border-[#1a6cf5] hover:shadow-lg transition-all"
    >
      {post.category && <p className="eyebrow mb-3">{post.category.title}</p>}

      <h2 className="text-[18px] font-semibold text-[#0a0a0a] group-hover:text-[#1a6cf5] transition-colors">
        {post.title}
      </h2>

      {post.excerpt && (
        <p className="mt-2 text-[14px] font-light text-[#6b7280] leading-relaxed">{post.excerpt}</p>
      )}

      <div className="mt-4 flex items-center gap-2 text-[12px] text-[#9ca3af]">
        <span>{post.author}</span>
        {post.publishedAt && (
          <>
            <span>·</span>
            <span>{formatDate(post.publishedAt)}</span>
          </>
        )}
      </div>

      <span className="mt-4 text-[13px] font-medium text-[#1a6cf5]">Read more →</span>
    </Link>
  )
}
