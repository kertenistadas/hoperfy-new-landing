import Link from 'next/link'
import type { PortableTextComponents } from '@portabletext/react'
import BlogImage from '@/components/blog/BlogImage'

const SITE_HOSTS = ['hoperfy.com', 'www.hoperfy.com']

/** Returns a site-relative path for links that stay on hoperfy.com, otherwise null. */
export function internalPath(href: string | undefined): string | null {
  if (!href) return null
  if (href.startsWith('/') && !href.startsWith('//')) return href
  if (href.startsWith('#')) return href
  try {
    const url = new URL(href)
    if (url.protocol === 'https:' && SITE_HOSTS.includes(url.hostname)) {
      return `${url.pathname}${url.search}${url.hash}`
    }
  } catch {
    // Not an absolute URL either: treat as external.
  }
  return null
}

/**
 * Comparison pages never link out: an external link would send readers, and
 * link equity, to a competitor. Anything that does not resolve to a path on
 * hoperfy.com renders as its plain text.
 */
export const comparisonBodyComponents: PortableTextComponents = {
  types: {
    image: ({ value }) => <BlogImage value={value} />,
  },
  marks: {
    link: ({ value, children }) => {
      const path = internalPath(value?.href)
      return path ? <Link href={path}>{children}</Link> : <>{children}</>
    },
  },
}
