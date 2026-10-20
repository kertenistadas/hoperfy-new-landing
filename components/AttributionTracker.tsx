'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { recordPageView } from '@/lib/attribution'

/**
 * Records first and last touch attribution on every page view, including
 * client side route changes. Renders nothing.
 */
export default function AttributionTracker() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    recordPageView()
  }, [pathname, searchParams])

  return null
}
