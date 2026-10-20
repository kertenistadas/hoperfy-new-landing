/**
 * Cookie consent and Google Consent Mode v2.
 *
 * Single home for the consent cookie format. The pre-hydration script below
 * has to be plain inline JavaScript, so it cannot import the TypeScript
 * helpers; it reads the same constants from this file instead, and the two
 * cookie parsers are kept side by side here so they cannot drift apart.
 */

export const CONSENT_COOKIE = 'hoperfy_consent'

/** Bump when a category is added, so every visitor is asked again. */
export const CONSENT_VERSION = 1

const MAX_AGE_SECONDS = 60 * 60 * 24 * 180

/** Dispatched to reopen the banner in its settings state, e.g. from the footer. */
export const OPEN_CONSENT_EVENT = 'hoperfy:open-consent'

export type ConsentChoice = {
  v: number
  analytics: boolean
  marketing: boolean
  ts: string
}

type ConsentValue = 'granted' | 'denied'

/** Maps a choice onto Google Consent Mode types. */
export function consentModeState(analytics: boolean, marketing: boolean): Record<string, ConsentValue> {
  const a: ConsentValue = analytics ? 'granted' : 'denied'
  const m: ConsentValue = marketing ? 'granted' : 'denied'
  return {
    ad_storage: m,
    ad_user_data: m,
    ad_personalization: m,
    analytics_storage: a,
    functionality_storage: a,
    personalization_storage: a,
  }
}

function readRawCookie(): string | null {
  if (typeof document === 'undefined') return null
  try {
    const match = document.cookie.match(new RegExp(`(?:^|;\\s*)${CONSENT_COOKIE}=([^;]*)`))
    return match ? match[1] : null
  } catch {
    return null
  }
}

/**
 * Parses the stored choice. Returns null when the cookie is absent,
 * unparseable, or from an older schema version: in all three cases the
 * visitor has to be asked again.
 */
export function parseConsent(raw: string | null): ConsentChoice | null {
  if (!raw) return null
  try {
    const stored = JSON.parse(decodeURIComponent(raw))
    if (!stored || typeof stored.v !== 'number' || stored.v < CONSENT_VERSION) return null
    if (typeof stored.analytics !== 'boolean' || typeof stored.marketing !== 'boolean') return null
    return {
      v: stored.v,
      analytics: stored.analytics,
      marketing: stored.marketing,
      ts: typeof stored.ts === 'string' ? stored.ts : '',
    }
  } catch {
    return null
  }
}

// useSyncExternalStore needs a referentially stable snapshot, so the parsed
// value is cached against the raw cookie string it came from.
let cachedRaw: string | null | undefined
let cachedChoice: ConsentChoice | null = null

/** The visitor's current choice, or null if they still need to be asked. */
export function readConsent(): ConsentChoice | null {
  const raw = readRawCookie()
  if (raw !== cachedRaw) {
    cachedRaw = raw
    cachedChoice = parseConsent(raw)
  }
  return cachedChoice
}

const listeners = new Set<() => void>()

export function subscribeConsent(listener: () => void): () => void {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

function notify() {
  for (const listener of listeners) {
    try {
      listener()
    } catch {
      // One failing listener must not stop the others.
    }
  }
}

function writeCookie(choice: ConsentChoice) {
  const parts = [
    `${CONSENT_COOKIE}=${encodeURIComponent(JSON.stringify(choice))}`,
    `max-age=${MAX_AGE_SECONDS}`,
    'path=/',
    'SameSite=Lax',
  ]
  try {
    const { hostname, protocol } = window.location
    // Shared across subdomains on the real site; host-only on localhost and
    // preview domains, where a .hoperfy.com domain would be rejected.
    if (hostname === 'hoperfy.com' || hostname.endsWith('.hoperfy.com')) parts.push('domain=.hoperfy.com')
    if (protocol === 'https:') parts.push('Secure')
  } catch {
    // Fall back to a host-only cookie.
  }
  document.cookie = parts.join('; ')
}

function gtagConsentUpdate(state: Record<string, ConsentValue>) {
  const w = window as unknown as { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void }
  if (typeof w.gtag === 'function') {
    w.gtag('consent', 'update', state)
    return
  }
  // The pre-hydration script normally defines gtag. If it did not run, push
  // an Arguments object directly: GTM ignores consent commands sent as arrays.
  w.dataLayer = w.dataLayer || []
  const toArguments: (...args: unknown[]) => IArguments = function () {
    // eslint-disable-next-line prefer-rest-params
    return arguments
  }
  w.dataLayer.push(toArguments('consent', 'update', state))
}

/**
 * Records a choice: writes the cookie, updates Consent Mode, tells GTM via a
 * consent_update event, then notifies subscribers so the banner hides and
 * attribution can flush. No page reload.
 */
export function applyConsent(analytics: boolean, marketing: boolean): ConsentChoice {
  const choice: ConsentChoice = {
    v: CONSENT_VERSION,
    analytics,
    marketing,
    ts: new Date().toISOString(),
  }

  try {
    writeCookie(choice)
  } catch {
    // Storage of the choice failed; still apply it for this page view.
  }

  try {
    gtagConsentUpdate(consentModeState(analytics, marketing))
    const w = window as unknown as { dataLayer?: Record<string, unknown>[] }
    w.dataLayer = w.dataLayer || []
    w.dataLayer.push({
      event: 'consent_update',
      consent_analytics: analytics,
      consent_marketing: marketing,
    })
  } catch {
    // Consent signalling is best effort.
  }

  // Pin the choice to whatever the cookie now reads. If the write was blocked
  // the raw value is unchanged, and this still keeps the banner hidden for
  // the rest of the page view instead of asking again immediately.
  cachedRaw = readRawCookie()
  cachedChoice = choice
  notify()
  return choice
}

/** Reopens the banner in settings, used by the footer "Cookie settings" link. */
export function openConsentSettings() {
  try {
    window.dispatchEvent(new Event(OPEN_CONSENT_EVENT))
  } catch {
    // ignore
  }
}

/**
 * Runs before GTM and before hydration. Sets every non-essential category to
 * denied for all visitors, then restores a returning visitor's stored choice
 * immediately so they are not gated for the wait_for_update window.
 *
 * The default is issued before anything that can fail, so if parsing throws
 * the page still fails closed with everything denied.
 */
export const CONSENT_INIT_SCRIPT = `(function () {
  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  window.gtag = window.gtag || gtag;

  gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied',
    functionality_storage: 'denied',
    personalization_storage: 'denied',
    security_storage: 'granted',
    wait_for_update: 500
  });
  gtag('set', 'url_passthrough', true);
  gtag('set', 'ads_data_redaction', true);

  try {
    var match = document.cookie.match(/(?:^|;\\s*)${CONSENT_COOKIE}=([^;]*)/);
    if (!match) return;
    var stored = JSON.parse(decodeURIComponent(match[1]));
    if (!stored || typeof stored.v !== 'number' || stored.v < ${CONSENT_VERSION}) return;
    if (typeof stored.analytics !== 'boolean' || typeof stored.marketing !== 'boolean') return;

    var analytics = stored.analytics ? 'granted' : 'denied';
    var marketing = stored.marketing ? 'granted' : 'denied';
    gtag('consent', 'update', {
      ad_storage: marketing,
      ad_user_data: marketing,
      ad_personalization: marketing,
      analytics_storage: analytics,
      functionality_storage: analytics,
      personalization_storage: analytics
    });
  } catch (e) {
    // Unreadable cookie: keep the denied defaults and let the banner ask again.
  }
})();`
