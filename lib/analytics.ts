/**
 * GA4 events via the GTM dataLayer.
 *
 * Hand written on purpose: no analytics dependency, and no direct gtag call.
 * Never send personal data through here. Names, emails and phone numbers go
 * to Sanity only.
 */

import { hasAnalyticsConsent } from '@/lib/consent'

type EventParams = Record<string, string | number | undefined>

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[]
  }
}

export function trackEvent(name: string, params: EventParams = {}) {
  if (typeof window === 'undefined') return

  // No analytics event leaves the page without analytics consent, whether the
  // visitor has not chosen yet or has rejected. Consent signals themselves are
  // pushed separately in lib/consent.ts and are not gated.
  if (!hasAnalyticsConsent()) return

  try {
    window.dataLayer = window.dataLayer || []

    // Undefined values are dropped so a key is omitted rather than sent empty.
    const payload: Record<string, unknown> = { event: name }
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined && value !== '') payload[key] = value
    }

    window.dataLayer.push(payload)
  } catch {
    // Analytics is best effort and must never interrupt a user flow.
  }
}

/** Pathname where an interaction happened, used as form_location. */
export function currentPath(): string {
  if (typeof window === 'undefined') return ''
  try {
    return window.location.pathname
  } catch {
    return ''
  }
}
