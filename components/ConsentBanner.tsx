'use client'

import Link from 'next/link'
import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import {
  OPEN_CONSENT_EVENT,
  applyConsent,
  readConsent,
  subscribeConsent,
  type ConsentChoice,
} from '@/lib/consent'

const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1a6cf5] focus-visible:ring-offset-2'

// Accept and Reject share one class so they are identical in size, weight and
// prominence. That equality is a legal requirement, not a style choice.
const primaryButton = `min-w-[8.5rem] text-center rounded-lg px-5 py-2.5 text-sm font-medium bg-[#1a6cf5] text-white hover:bg-[#1558cc] transition-colors ${focusRing}`
const secondaryButton = `min-w-[8.5rem] text-center rounded-lg px-5 py-2.5 text-sm font-medium border border-[#e5e7eb] text-[#0a0a0a] hover:border-[#0a0a0a] transition-colors ${focusRing}`

type View = 'collapsed' | 'settings'

// The server cannot know the visitor's choice without making every route
// dynamic, so it renders nothing and the client decides after hydration.
const serverSnapshot = (): ConsentChoice | null | undefined => undefined

export default function ConsentBanner() {
  const choice = useSyncExternalStore<ConsentChoice | null | undefined>(
    subscribeConsent,
    readConsent,
    serverSnapshot,
  )

  const [manualOpen, setManualOpen] = useState(false)
  const [view, setView] = useState<View>('collapsed')
  const [analytics, setAnalytics] = useState(false)
  const [marketing, setMarketing] = useState(false)
  const settingsHeadingRef = useRef<HTMLHeadingElement>(null)

  // Reopened from the footer link: jump straight to settings, seeded with
  // the current choice so the visitor sees what they previously allowed.
  useEffect(() => {
    function onOpen() {
      const current = readConsent()
      setAnalytics(current?.analytics ?? false)
      setMarketing(current?.marketing ?? false)
      setView('settings')
      setManualOpen(true)
    }
    window.addEventListener(OPEN_CONSENT_EVENT, onOpen)
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, onOpen)
  }, [])

  // Settings is only ever entered by a visitor's action, so moving focus there
  // is expected. The collapsed banner never takes focus on page load.
  useEffect(() => {
    if (view === 'settings') settingsHeadingRef.current?.focus()
  }, [view, manualOpen])

  if (choice === undefined) return null
  const visible = choice === null || manualOpen
  if (!visible) return null

  function save(nextAnalytics: boolean, nextMarketing: boolean) {
    applyConsent(nextAnalytics, nextMarketing)
    setManualOpen(false)
    setView('collapsed')
  }

  function openSettings() {
    setAnalytics(choice?.analytics ?? false)
    setMarketing(choice?.marketing ?? false)
    setView('settings')
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key !== 'Escape') return
    if (choice) {
      // Already chose before: Escape dismisses without changing anything.
      setManualOpen(false)
      setView('collapsed')
    } else if (view === 'settings') {
      setView('collapsed')
    }
  }

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      onKeyDown={onKeyDown}
      className="fixed inset-x-0 bottom-0 z-[60] bg-white border-t border-[#e5e7eb] p-6 max-h-[85vh] overflow-y-auto"
      style={{ boxShadow: '0 -8px 30px rgba(10, 10, 10, 0.06)' }}
    >
      <div className="max-w-5xl mx-auto">
        {view === 'collapsed' ? (
          <div className="flex flex-col md:flex-row md:items-center gap-5 md:gap-8">
            <p className="text-sm font-light text-[#6b7280] leading-relaxed flex-1">
              We use cookies to understand how people find and use Hoperfy. Analytics cookies help
              us see which pages work. You can accept, reject, or choose what to allow.{' '}
              <Link
                href="/legal/privacy-policy"
                className={`text-[#1a6cf5] underline underline-offset-2 rounded ${focusRing}`}
              >
                Privacy policy
              </Link>
            </p>

            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <button type="button" onClick={() => save(true, true)} className={primaryButton}>
                Accept all
              </button>
              <button type="button" onClick={() => save(false, false)} className={primaryButton}>
                Reject all
              </button>
              <button type="button" onClick={openSettings} className={secondaryButton}>
                Choose
              </button>
            </div>
          </div>
        ) : (
          <div>
            <h2
              ref={settingsHeadingRef}
              tabIndex={-1}
              className={`text-base font-black tracking-tight text-[#0a0a0a] mb-3 rounded ${focusRing}`}
            >
              Cookie settings
            </h2>

            <ul className="divide-y divide-[#e5e7eb] border-y border-[#e5e7eb] mb-5">
              <Category
                id="necessary"
                name="Necessary"
                description="Required for the site to work. These cannot be turned off."
                checked
                disabled
              />
              <Category
                id="analytics"
                name="Analytics"
                description="Help us understand how visitors find and use the site, including which campaign or link brought them here."
                checked={analytics}
                onChange={setAnalytics}
              />
              <Category
                id="marketing"
                name="Marketing"
                description="Used to measure and personalise advertising. We do not currently run ads, but this covers it if we do."
                checked={marketing}
                onChange={setMarketing}
              />
            </ul>

            <div className="flex flex-col sm:flex-row sm:justify-end gap-3">
              <button type="button" onClick={() => save(analytics, marketing)} className={primaryButton}>
                Save choices
              </button>
              <button type="button" onClick={() => save(true, true)} className={primaryButton}>
                Accept all
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function Category({
  id,
  name,
  description,
  checked,
  disabled = false,
  onChange,
}: {
  id: string
  name: string
  description: string
  checked: boolean
  disabled?: boolean
  onChange?: (value: boolean) => void
}) {
  const labelId = `consent-${id}-label`
  const descId = `consent-${id}-desc`

  return (
    <li className="flex items-start justify-between gap-6 py-4">
      <div>
        <p id={labelId} className="text-sm font-semibold text-[#0a0a0a]">
          {name}
          {disabled && <span className="ml-2 text-xs font-normal text-[#9ca3af]">Always on</span>}
        </p>
        <p id={descId} className="text-sm font-light text-[#6b7280] leading-relaxed mt-1">
          {description}
        </p>
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-labelledby={labelId}
        aria-describedby={descId}
        disabled={disabled}
        onClick={() => onChange?.(!checked)}
        className={`relative mt-0.5 h-6 w-11 shrink-0 rounded-full transition-colors ${
          checked ? 'bg-[#1a6cf5]' : 'bg-[#e5e7eb]'
        } ${disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'} ${focusRing}`}
      >
        <span
          aria-hidden="true"
          className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
            checked ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </button>
    </li>
  )
}
