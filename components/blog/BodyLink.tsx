import Link from 'next/link'
import type { ReactNode } from 'react'

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

type Props = {
  href: string | undefined
  children: ReactNode
  /** Comparison pages never link out: external links render as plain text there. */
  allowExternal?: boolean
}

/**
 * The one link renderer for Portable Text bodies (blog posts and comparisons).
 * Internal links (a path, or an absolute hoperfy.com URL) open in the same tab
 * through the Next.js router. External links open in a new tab with
 * rel="noopener noreferrer". The Studio's "Open in new tab" checkbox is
 * ignored, so the behaviour is the same everywhere.
 */
export default function BodyLink({ href, children, allowExternal = true }: Props) {
  const path = internalPath(href)
  if (path) return <Link href={path}>{children}</Link>
  if (!allowExternal || !href) return <>{children}</>
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  )
}
