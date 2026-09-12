'use client'

import SpeakerHousingSection from './SpeakerHousingSection'

export default function SpeakerHousingPage() {
  return (
    <section className="bg-white">

      {/* Section label */}
      <div className="pt-20 pb-4 px-6">
        <p className="text-center text-[1.5rem] font-black tracking-tight text-[#0a0a0a]">
          Speaker Housing
        </p>
      </div>

      {/* Section 1 — You set the guidelines */}
      <SpeakerHousingSection
        headline="You set the guidelines. We do everything else."
        body="Tell us your budget, your preferred hotels, or the standard you want per speaker group. If you would rather not decide, we recommend options that fit. You approve, we book."
        gradient="linear-gradient(135deg, #1a6cf5 0%, #4d8ef7 100%)"
      >
        {/* Mockup: guideline card */}
        <div className="bg-white rounded-xl p-5 w-full shadow-xl">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-[#9ca3af] mb-3">Your guidelines</p>
          <div className="space-y-2.5">
            <div className="flex items-center justify-between py-2 px-3 bg-[#f9fafb] rounded-lg">
              <span className="text-[12px] font-medium text-[#0a0a0a]">Keynote speakers</span>
              <span className="text-[11px] text-[#1a6cf5] font-semibold">5★ · €280/night</span>
            </div>
            <div className="flex items-center justify-between py-2 px-3 bg-[#f9fafb] rounded-lg">
              <span className="text-[12px] font-medium text-[#0a0a0a]">Featured speakers</span>
              <span className="text-[11px] text-[#1a6cf5] font-semibold">4★ · €180/night</span>
            </div>
            <div className="flex items-center justify-between py-2 px-3 bg-[#f9fafb] rounded-lg">
              <span className="text-[12px] font-medium text-[#0a0a0a]">Panel speakers</span>
              <span className="text-[11px] text-[#1a6cf5] font-semibold">4★ · €140/night</span>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-[#f3f4f6] flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
            <span className="text-[11px] text-[#6b7280]">Hoperfy books everything from here</span>
          </div>
        </div>
      </SpeakerHousingSection>

      {/* Section 2 — Vouchers direct */}
      <SpeakerHousingSection
        flip
        headline="Vouchers go straight to your speakers."
        body="Every speaker receives their booking confirmation and voucher directly from us. No forwarding, no chasing, no did-you-get-my-email follow-ups landing in your inbox."
        gradient="linear-gradient(135deg, #0a0a0a 0%, #1a6cf5 100%)"
      >
        {/* Mockup: voucher sent card */}
        <div className="bg-white rounded-xl p-5 w-full shadow-xl">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-green-500" />
            <p className="text-[10px] font-semibold uppercase tracking-widest text-green-600">Voucher sent</p>
          </div>
          <p className="text-[13px] font-semibold text-[#0a0a0a] mb-1">Dr. Elena Vasquez</p>
          <p className="text-[11px] text-[#6b7280] mb-4">Keynote speaker</p>
          <div className="bg-[#f9fafb] rounded-lg p-3 space-y-1.5">
            <div className="flex justify-between">
              <span className="text-[11px] text-[#6b7280]">Hotel</span>
              <span className="text-[11px] font-medium text-[#0a0a0a]">Grand Hyatt Berlin</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[11px] text-[#6b7280]">Check in</span>
              <span className="text-[11px] font-medium text-[#0a0a0a]">14 Mar 2026</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[11px] text-[#6b7280]">Nights</span>
              <span className="text-[11px] font-medium text-[#0a0a0a]">3</span>
            </div>
          </div>
          <p className="text-[10px] text-[#9ca3af] mt-3">Sent directly to elena@example.com</p>
        </div>
      </SpeakerHousingSection>

      {/* Section 3 — Changes handled */}
      <SpeakerHousingSection
        headline="Changes never reach your team."
        body="A keynote extends by a night. A panellist arrives a day early. Someone cancels. Every modification is handled directly between Hoperfy, the speaker, and the hotel. You find out because the rooming list updated, not because your inbox filled up."
        gradient="linear-gradient(135deg, #1a6cf5 0%, #0a0a0a 100%)"
      >
        {/* Mockup: change request flow */}
        <div className="bg-white rounded-xl p-5 w-full shadow-xl">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-[#9ca3af] mb-4">Change handled</p>
          <div className="space-y-3">
            <div className="flex gap-2.5">
              <div className="w-6 h-6 rounded-full bg-[#f3f4f6] flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-[9px] font-bold text-[#6b7280]">1</span>
              </div>
              <div>
                <p className="text-[12px] font-medium text-[#0a0a0a]">Speaker requests extra night</p>
                <p className="text-[10px] text-[#9ca3af]">Sent to Hoperfy, not to you</p>
              </div>
            </div>
            <div className="flex gap-2.5">
              <div className="w-6 h-6 rounded-full bg-[#eef4ff] flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-[9px] font-bold text-[#1a6cf5]">2</span>
              </div>
              <div>
                <p className="text-[12px] font-medium text-[#0a0a0a]">Hoperfy contacts hotel</p>
                <p className="text-[10px] text-[#9ca3af]">Booking extended, new voucher issued</p>
              </div>
            </div>
            <div className="flex gap-2.5">
              <div className="w-6 h-6 rounded-full bg-green-50 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-[9px] font-bold text-green-600">✓</span>
              </div>
              <div>
                <p className="text-[12px] font-medium text-[#0a0a0a]">Rooming list updated</p>
                <p className="text-[10px] text-[#9ca3af]">You never had to do anything</p>
              </div>
            </div>
          </div>
        </div>
      </SpeakerHousingSection>

      {/* Section 4 — Rooming list */}
      <SpeakerHousingSection
        flip
        headline="One clean rooming list. Always current."
        body="Speakers do not all have to stay in the same property. Split them across hotels by tier, preference, or proximity. You still get a single list showing exactly who is staying where and for which nights."
        gradient="linear-gradient(135deg, #4d8ef7 0%, #1a6cf5 100%)"
      >
        {/* Mockup: rooming list */}
        <div className="bg-white rounded-xl p-5 w-full shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-[#9ca3af]">Rooming list</p>
            <span className="text-[9px] font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">Live</span>
          </div>
          <div className="space-y-2">
            {[
              { name: 'Dr. Elena Vasquez', hotel: 'Grand Hyatt', nights: '3 nights' },
              { name: 'Marcus Chen', hotel: 'Grand Hyatt', nights: '2 nights' },
              { name: 'Sofia Lindqvist', hotel: 'NH Collection', nights: '2 nights' },
              { name: 'James Okonkwo', hotel: 'Motel One', nights: '4 nights' },
            ].map((s, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-[#f3f4f6] last:border-0">
                <div>
                  <p className="text-[11px] font-medium text-[#0a0a0a]">{s.name}</p>
                  <p className="text-[10px] text-[#9ca3af]">{s.hotel}</p>
                </div>
                <span className="text-[10px] text-[#6b7280]">{s.nights}</span>
              </div>
            ))}
          </div>
          <p className="text-[10px] text-[#9ca3af] mt-3">4 speakers · 3 properties</p>
        </div>
      </SpeakerHousingSection>

    </section>
  )
}
