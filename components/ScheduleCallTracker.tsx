'use client'

import { useEffect } from 'react'
import { trackEvent, currentPath } from '@/lib/analytics'

/**
 * Fires schedule_call when a Calendly link is clicked.
 *
 * Calendly is used as plain outbound links across the site, not an embed, so
 * there is no calendly.event_scheduled message to listen for. One delegated
 * listener covers every link without touching their markup or destinations.
 *
 * Note this measures intent to book, not a completed booking. An embed would
 * be needed to observe the booking itself.
 */
export default function ScheduleCallTracker() {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      try {
        const target = e.target as Element | null
        const anchor = target?.closest?.('a[href*="calendly.com"]')
        if (!anchor) return
        trackEvent('schedule_call', { form_location: currentPath() })
      } catch {
        // Never interfere with the navigation.
      }
    }

    document.addEventListener('click', onClick, true)
    return () => document.removeEventListener('click', onClick, true)
  }, [])

  return null
}
