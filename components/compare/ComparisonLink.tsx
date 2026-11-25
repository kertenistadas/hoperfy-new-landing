'use client'

import Link from 'next/link'
import { trackEvent } from '@/lib/analytics'

type Props = {
  href: string
  location: string
  children: React.ReactNode
}

/** Internal link to a comparison page that reports compare_link_click (consent gated in trackEvent). */
export default function ComparisonLink({ href, location, children }: Props) {
  return (
    <Link
      href={href}
      onClick={() => trackEvent('compare_link_click', { link_url: href, location })}
      className="text-[14px] font-medium text-[#1a6cf5] hover:text-[#1558cc] transition-colors"
    >
      {children}
    </Link>
  )
}
