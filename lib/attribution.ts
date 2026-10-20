/**
 * Lead attribution, captured client side.
 *
 * Every storage and parsing path here is wrapped so it can never throw: in
 * private browsing, with cookies blocked, or inside an embedded webview, a
 * failure must degrade to empty values rather than break a form submit.
 */

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

/**
 * Records first and last touch. Safe to call on every page load: first touch
 * is written once and never overwritten, last touch only updates when the load
 * carries UTMs or arrived from an external site.
 */
export function recordPageView() {
  if (typeof window === 'undefined') return

  try {
    const { touch, hasUtm, externalReferrer } = currentTouch()

    if (!safeGet('local', FIRST_KEY)) {
      safeSet('local', FIRST_KEY, JSON.stringify(touch))
    }

    if (hasUtm || externalReferrer) {
      safeSet('session', LAST_KEY, JSON.stringify(touch))
    }
  } catch {
    // Never let tracking break a page render.
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

function deviceType(): string {
  try {
    const w = window.innerWidth
    if (w < 768) return 'mobile'
    if (w < 1024) return 'tablet'
    return 'desktop'
  } catch {
    return ''
  }
}

/** Flat, submit-ready attribution payload. Every field is optional. */
export function getAttribution(): Attribution {
  if (typeof window === 'undefined') return {}

  try {
    const first = readTouch('local', FIRST_KEY)
    const last = readTouch('session', LAST_KEY)
    const { touch: now } = currentTouch()

    let params: URLSearchParams
    try {
      params = new URLSearchParams(window.location.search)
    } catch {
      params = new URLSearchParams()
    }
    const get = (k: string) => params.get(k) ?? ''

    const ga = getGaIds()

    let submittedPath = ''
    try {
      submittedPath = window.location.pathname
    } catch {
      submittedPath = ''
    }

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
