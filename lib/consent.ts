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
