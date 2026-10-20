/**
 * Lead attribution, captured client side.
 *
 * Every storage and parsing path here is wrapped so it can never throw: in
 * private browsing, with cookies blocked, or inside an embedded webview, a
 * failure must degrade to empty values rather than break a form submit.
 */

import { hasAnalyticsConsent } from '@/lib/consent'

// Short, editable host lists used to classify a referrer when no UTMs exist.
const SEARCH_HOSTS = ['google.', 'bing.', 'duckduckgo.', 'yahoo.', 'ecosia.', 'baidu.', 'yandex.']
const SOCIAL_HOSTS = [
  'linkedin.',
  'facebook.',
  'instagram.',
  'twitter.',
  'x.com',
  't.co',
  'reddit.',
  'youtube.',
  'tiktok.',
]

const FIRST_KEY = 'hoperfy_attr_first'
const LAST_KEY = 'hoperfy_attr_last'

export type Touch = {
  source: string
  medium: string
  campaign: string
  term: string
  content: string
  referrer: string
  landingPath: string
  timestamp: string
}

export type Attribution = Record<string, string>

function safeGet(store: 'local' | 'session', key: string): string | null {
  try {
    const s = store === 'local' ? window.localStorage : window.sessionStorage
    return s.getItem(key)
  } catch {
    return null
  }
}

function safeSet(store: 'local' | 'session', key: string, value: string) {
  try {
    const s = store === 'local' ? window.localStorage : window.sessionStorage
    s.setItem(key, value)
  } catch {
    // Storage unavailable. Attribution is best effort, so carry on.
  }
}

function readTouch(store: 'local' | 'session', key: string): Partial<Touch> {
  const raw = safeGet(store, key)
  if (!raw) return {}
  try {
    const parsed = JSON.parse(raw)
    return parsed && typeof parsed === 'object' ? parsed : {}
  } catch {
    return {}
  }
}

function hostOf(url: string): string {
  try {
    return new URL(url).hostname.toLowerCase()
  } catch {
    return ''
  }
}

/** Classifies a referrer host when the URL carries no UTM parameters. */
function classifyReferrer(referrerUrl: string): { source: string; medium: string } {
  if (!referrerUrl) return { source: 'direct', medium: 'none' }

  const host = hostOf(referrerUrl)
  if (!host) return { source: 'direct', medium: 'none' }

  // Same-site navigation is not a new touch.
  try {
    if (host === window.location.hostname.toLowerCase()) return { source: '', medium: '' }
  } catch {
    // ignore
  }

  if (SEARCH_HOSTS.some((h) => host.includes(h))) return { source: host, medium: 'organic' }
  if (SOCIAL_HOSTS.some((h) => host.includes(h))) return { source: host, medium: 'social' }
  return { source: host, medium: 'referral' }
}

function isInternalReferrer(referrerUrl: string): boolean {
  if (!referrerUrl) return false
  const host = hostOf(referrerUrl)
  try {
    return host === window.location.hostname.toLowerCase()
  } catch {
    return false
  }
}

function currentTouch(): { touch: Touch; hasUtm: boolean; externalReferrer: boolean } {
  let params: URLSearchParams
  try {
    params = new URLSearchParams(window.location.search)
  } catch {
    params = new URLSearchParams()
  }

  const get = (k: string) => params.get(k) ?? ''
  const utmSource = get('utm_source')
  const utmMedium = get('utm_medium')
  const hasUtm = Boolean(
    utmSource || utmMedium || get('utm_campaign') || get('utm_term') || get('utm_content'),
  )

  let rawReferrer = ''
  try {
    rawReferrer = document.referrer || ''
  } catch {
    rawReferrer = ''
  }

  const classified = classifyReferrer(rawReferrer)
  const externalReferrer = Boolean(rawReferrer) && !isInternalReferrer(rawReferrer)

  let landingPath = ''
  try {
    landingPath = window.location.pathname + window.location.search
  } catch {
    landingPath = ''
  }

  return {
    hasUtm,
    externalReferrer,
    touch: {
      source: utmSource || classified.source,
      medium: utmMedium || classified.medium,
      campaign: get('utm_campaign'),
      term: get('utm_term'),
      content: get('utm_content'),
      referrer: rawReferrer || 'direct',
      landingPath,
      timestamp: new Date().toISOString(),
    },
  }
}

// Touches for this page view, held in memory. Nothing reaches storage until
// analytics consent is granted, and keeping them here means a visitor who
// accepts after landing does not lose the touch that brought them.
let pendingFirst: Touch | null = null
let pendingLast: Touch | null = null
let landingRecorded = false

/**
 * Parses the current touch into memory, and writes it to storage only when
 * analytics consent is granted. Safe to call on every route change.
 */
export function recordPageView() {
  if (typeof window === 'undefined') return

  try {
    const { touch, hasUtm, externalReferrer } = currentTouch()
    const isLanding = !landingRecorded
    landingRecorded = true

    if (isLanding) {
      pendingFirst = touch
      if (hasUtm || externalReferrer) pendingLast = touch
    } else if (hasUtm) {
      // document.referrer does not change on client side navigation, so after
      // the landing page only fresh UTM parameters mark a new touch. Without
      // this, every route change re-read the original referrer and overwrote
      // the last touch, dropping its campaign.
      pendingLast = touch
    }

    flushAttribution()
  } catch {
    // Never let tracking break a page render.
  }
}

/**
 * Writes the in-memory touches to storage, if analytics consent is granted.
 * Called on every page view and again the moment consent is given. First
 * touch is still written only once and never overwritten.
 */
export function flushAttribution() {
  if (typeof window === 'undefined' || !hasAnalyticsConsent()) return

  try {
    if (pendingFirst && !safeGet('local', FIRST_KEY)) {
      safeSet('local', FIRST_KEY, JSON.stringify(pendingFirst))
    }
    if (pendingLast) {
      safeSet('session', LAST_KEY, JSON.stringify(pendingLast))
    }
  } catch {
    // Storage unavailable. Attribution is best effort.
  }
}

/**
 * Reads the GA client id straight off the _ga cookie (GA1.1.<a>.<b>), rather
 * than calling gtag, which is async and must not delay a submit.
 */
export function getGaIds(): { gaClientId: string } | null {
  if (typeof document === 'undefined') return null
  try {
    const match = document.cookie.match(/(?:^|;\s*)_ga=([^;]+)/)
    if (!match) return null
    const parts = decodeURIComponent(match[1]).split('.')
    if (parts.length < 4) return null
    const clientId = `${parts[2]}.${parts[3]}`
    return clientId.trim() ? { gaClientId: clientId } : null
  } catch {
    return null
  }
}

// Tablet is tested first: Android tablets match the mobile pattern too.
const TABLET_UA = /iPad|Android(?!.*Mobile)|Tablet|PlayBook|Silk/i
const MOBILE_UA = /Mobi|iPhone|iPod|Android.*Mobile|Windows Phone|BlackBerry/i

/**
 * Derived from the user agent, not viewport width. Width mislabels a desktop
 * browser in a narrow or split window, and a resize must not change what a
 * lead is recorded as.
 */
function deviceType(): string {
  try {
    const ua = navigator.userAgent || ''

    if (TABLET_UA.test(ua)) return 'tablet'

    // iPadOS 13+ Safari reports a Macintosh UA with no iPad token. A real Mac
    // reports maxTouchPoints 0, so touch points separate the two.
    if (/Macintosh/.test(ua) && (navigator.maxTouchPoints ?? 0) > 1) return 'tablet'

    const uaData = (navigator as Navigator & { userAgentData?: { mobile?: boolean } }).userAgentData
    if (typeof uaData?.mobile === 'boolean') return uaData.mobile ? 'mobile' : 'desktop'

    return MOBILE_UA.test(ua) ? 'mobile' : 'desktop'
  } catch {
    return ''
  }
}

const EMPTY_ATTRIBUTION: Attribution = {
  firstSource: '', firstMedium: '', firstCampaign: '', firstTerm: '', firstContent: '',
  firstReferrer: '', firstLandingPage: '', firstTouchAt: '',
  lastSource: '', lastMedium: '', lastCampaign: '', lastTerm: '', lastContent: '',
  lastReferrer: '', lastTouchAt: '',
  gclid: '', fbclid: '', liFatId: '', gaClientId: '',
  submittedPath: '', deviceType: '', userAgent: '',
}

function currentPathname(): string {
  try {
    return window.location.pathname
  } catch {
    return ''
  }
}

/**
 * Flat, submit-ready attribution payload. Every field is optional.
 *
 * Without analytics consent, every tracking field is empty and only the
 * non-tracking context is filled in: the path and the coarse device type.
 * The GA client id and the raw user agent are withheld too. A lead is still
 * created either way; attribution has never been allowed to block a submit.
 */
export function getAttribution(): Attribution {
  if (typeof window === 'undefined') return {}

  try {
    if (!hasAnalyticsConsent()) {
      return { ...EMPTY_ATTRIBUTION, submittedPath: currentPathname(), deviceType: deviceType() }
    }

    // Prefer stored touches; fall back to this page view's in-memory ones,
    // which covers a browser that has consented but blocks storage.
    const storedFirst = readTouch('local', FIRST_KEY)
    const storedLast = readTouch('session', LAST_KEY)
    const first: Partial<Touch> = storedFirst.source !== undefined ? storedFirst : pendingFirst ?? {}
    const last: Partial<Touch> = storedLast.source !== undefined ? storedLast : pendingLast ?? {}
    const { touch: now } = currentTouch()

    let params: URLSearchParams
    try {
      params = new URLSearchParams(window.location.search)
    } catch {
      params = new URLSearchParams()
    }
    const get = (k: string) => params.get(k) ?? ''

    const ga = getGaIds()
    const submittedPath = currentPathname()

    let userAgent = ''
    try {
      userAgent = navigator.userAgent || ''
    } catch {
      userAgent = ''
    }

    return {
      firstSource: first.source ?? '',
      firstMedium: first.medium ?? '',
      firstCampaign: first.campaign ?? '',
      firstTerm: first.term ?? '',
      firstContent: first.content ?? '',
      firstReferrer: first.referrer ?? '',
      firstLandingPage: first.landingPath ?? '',
      firstTouchAt: first.timestamp ?? '',

      lastSource: last.source ?? now.source ?? '',
      lastMedium: last.medium ?? now.medium ?? '',
      lastCampaign: last.campaign ?? '',
      lastTerm: last.term ?? '',
      lastContent: last.content ?? '',
      lastReferrer: last.referrer ?? '',
      lastTouchAt: last.timestamp ?? '',

      gclid: get('gclid'),
      fbclid: get('fbclid'),
      liFatId: get('li_fat_id'),
      gaClientId: ga?.gaClientId ?? '',

      submittedPath,
      deviceType: deviceType(),
      userAgent,
    }
  } catch {
    return {}
  }
}
