'use client'

import { openConsentSettings } from '@/lib/consent'

/** Reopens the consent banner in settings, so consent is as easy to withdraw as to give. */
export default function CookieSettingsButton({ className }: { className: string }) {
  return (
    <button
      type="button"
      onClick={openConsentSettings}
      className={`${className} text-left rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1a6cf5] focus-visible:ring-offset-2`}
    >
      Cookie settings
    </button>
  )
}
