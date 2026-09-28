'use client'

import { useState } from 'react'
import OnboardingModal from '@/components/OnboardingModal'

type Interest = 'hotels' | 'ticketing'

export default function EventCTAs({
  eventName,
  eventLocation,
  eventStartDate,
  eventEndDate,
}: {
  eventName: string
  eventLocation: string
  eventStartDate: string
  eventEndDate?: string
}) {
  const [openFor, setOpenFor] = useState<Interest | null>(null)

  return (
    <>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-[#eef4ff] border border-[#b8d0fe] rounded-xl p-8">
          <h2 className="text-[1.25rem] font-black tracking-tight text-[#0a0a0a] mb-3">
            Need hotels for {eventName}?
          </h2>
          <p className="text-[14px] font-light text-[#6b7280] leading-relaxed mb-6">
            Hoperfy contracts the hotels, builds a branded booking page for your attendees, and
            handles every delegate question. Free to set up.
          </p>
          <button
            type="button"
            onClick={() => setOpenFor('hotels')}
            className="h-11 px-6 text-[14px] font-medium bg-[#1a6cf5] text-white rounded-lg hover:bg-[#1558cc] transition-colors"
          >
            Get hotels for this event
          </button>
        </div>

        <div className="bg-[#eef4ff] border border-[#b8d0fe] rounded-xl p-8">
          <h2 className="text-[1.25rem] font-black tracking-tight text-[#0a0a0a] mb-3">
            Ticketing for {eventName}
          </h2>
          <p className="text-[14px] font-light text-[#6b7280] leading-relaxed mb-6">
            Sell across every channel from one inventory, get paid as tickets sell, and own your
            attendee data. No monthly fees.
          </p>
          <button
            type="button"
            onClick={() => setOpenFor('ticketing')}
            className="h-11 px-6 text-[14px] font-medium bg-[#1a6cf5] text-white rounded-lg hover:bg-[#1558cc] transition-colors"
          >
            Set up ticketing
          </button>
        </div>
      </div>

      <OnboardingModal
        isOpen={openFor !== null}
        onClose={() => setOpenFor(null)}
        source={`events-directory-${openFor ?? 'unknown'}`}
        initialProductInterest={openFor ?? undefined}
        initialEventName={eventName}
        initialEventLocation={eventLocation}
        initialEventStartDate={eventStartDate}
        initialEventEndDate={eventEndDate}
      />
    </>
  )
}
