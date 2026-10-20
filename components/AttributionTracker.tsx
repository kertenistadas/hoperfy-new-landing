'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { flushAttribution, recordPageView } from '@/lib/attribution'
import { subscribeConsent } from '@/lib/consent'

/**
 * Records first and last touch on every page view, including client side
 * route changes. Renders nothing.
 *
 * Touches are held in memory until analytics consent is granted. When the
 * visitor accepts later in the same visit, they are flushed to storage at
 * that moment, so accepting after landing does not lose the first touch.
 */
export default function AttributionTracker() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    recordPageView()
  }, [pathname, searchParams])

  useEffect(() => subscribeConsent(flushAttribution), [])

  return null
}
