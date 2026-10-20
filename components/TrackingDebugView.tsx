'use client'

import { useSyncExternalStore } from 'react'
import { getAttribution } from '@/lib/attribution'

const GROUPS: { title: string; keys: string[] }[] = [
  {
    title: 'First touch',
    keys: [
      'firstSource', 'firstMedium', 'firstCampaign', 'firstTerm', 'firstContent',
      'firstReferrer', 'firstLandingPage', 'firstTouchAt',
    ],
  },
  {
    title: 'Last touch',
    keys: [
      'lastSource', 'lastMedium', 'lastCampaign', 'lastTerm', 'lastContent',
      'lastReferrer', 'lastTouchAt',
    ],
  },
  { title: 'Click and client ids', keys: ['gclid', 'fbclid', 'liFatId', 'gaClientId'] },
  { title: 'Context', keys: ['submittedPath', 'deviceType', 'userAgent'] },
]

type Snapshot = { attr: Record<string, string>; events: string[] }

// useSyncExternalStore requires a stable snapshot, so this is read once per
// page load and cached. Reload the page to pick up new URL parameters.
let cached: Snapshot | null = null

function readSnapshot(): Snapshot {
  if (cached) return cached
  let events: string[] = []
  try {
    const dl = (window as unknown as { dataLayer?: Record<string, unknown>[] }).dataLayer ?? []
    events = dl.map((e) => String(e.event ?? '')).filter(Boolean)
  } catch {
    events = []
  }
  cached = { attr: getAttribution(), events }
  return cached
}

const subscribe = () => () => {}

export default function TrackingDebugView() {
  const data = useSyncExternalStore<Snapshot | null>(subscribe, readSnapshot, () => null)

  if (!data) {
    return <p className="text-[14px] text-[#9ca3af]">Reading attribution...</p>
  }

  const { attr, events } = data

  return (
    <div className="space-y-8">
      {GROUPS.map((group) => (
        <section key={group.title}>
          <h2 className="text-sm font-black uppercase tracking-wide text-[#6b7280] mb-3">
            {group.title}
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <tbody>
                {group.keys.map((key) => {
                  const value = attr[key] ?? ''
                  return (
                    <tr key={key} className="border-b border-[#f3f4f6] last:border-0">
                      <td className="py-2 pr-4 text-[13px] font-mono text-[#374151] align-top w-56">
                        {key}
                      </td>
                      <td
                        className={`py-2 text-[13px] font-mono break-all ${
                          value ? 'text-[#0a0a0a]' : 'text-[#c4c9d0]'
                        }`}
                      >
                        {value || 'empty'}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </section>
      ))}

      <section>
        <h2 className="text-sm font-black uppercase tracking-wide text-[#6b7280] mb-3">
          dataLayer events so far
        </h2>
        {events.length === 0 ? (
          <p className="text-[13px] text-[#9ca3af]">None pushed yet on this page load.</p>
        ) : (
          <ol className="text-[13px] font-mono text-[#374151] space-y-1">
            {events.map((name, i) => (
              <li key={i}>
                {i + 1}. {name}
              </li>
            ))}
          </ol>
        )}
      </section>
    </div>
  )
}
