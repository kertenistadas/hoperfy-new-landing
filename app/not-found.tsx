import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '404 — Page Not Found | Hoperfy',
  description: 'This page does not exist, but your event still needs hotel booking and ticketing.',
}

export default function NotFound() {
  return (
    <>
      <Nav />
      <main>

        {/* Hero */}
        <section className="pt-32 pb-16 px-6 border-b border-[#e5e7eb]">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-[6rem] font-black text-[#e5e7eb] leading-none mb-4">404</p>
            <h1 className="text-[2rem] md:text-[2.5rem] font-black tracking-tight text-[#0a0a0a] mb-4">
              This page does not exist.
            </h1>
            <p className="text-[16px] font-light text-[#6b7280] leading-relaxed mb-8">
              But your event still needs hotel booking and ticketing. While you are here — Hoperfy handles both, for free or 2% per ticket.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/"
                className="h-12 px-8 text-[14px] font-medium bg-[#1a6cf5] text-white rounded-lg hover:bg-[#1558cc] transition-colors flex items-center justify-center"
              >
                Back to homepage
              </Link>
              <a
                href="https://calendly.com/tadas-hoperfy/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="h-12 px-8 text-[14px] font-medium border border-[#e5e7eb] text-[#0a0a0a] rounded-lg hover:border-[#0a0a0a] transition-colors flex items-center justify-center"
              >
                Talk to us first
              </a>
            </div>
          </div>
        </section>

        {/* Two product cards */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <p className="text-center text-[11px] font-semibold uppercase tracking-widest text-[#9ca3af] mb-10">
              What Hoperfy does while you were looking for that page
            </p>
            <div className="grid md:grid-cols-2 gap-6">

              {/* Hotels card */}
              <Link
                href="/products/hotels-for-events"
                className="group border border-[#e5e7eb] rounded-2xl p-8 hover:border-[#1a6cf5] hover:shadow-lg hover:shadow-blue-500/5 transition-all block"
              >
                <p className="eyebrow mb-3">Hotels for Events</p>
                <h2 className="text-[1.25rem] font-black tracking-tight text-[#0a0a0a] mb-3 group-hover:text-[#1a6cf5] transition-colors">
                  White-label hotel booking. Free.
                </h2>
                <p className="text-[14px] font-light text-[#6b7280] leading-relaxed mb-6">
                  2,000,000+ hotels worldwide. We contract them, build your booking page, and handle all delegate support. Your team does nothing.
                </p>
                <div className="flex items-baseline gap-1">
                  <span className="text-[2.5rem] font-black text-[#1a6cf5] leading-none">Free</span>
                  <span className="text-[13px] text-[#6b7280] ml-2">to set up</span>
                </div>
                <p className="text-[12px] text-[#9ca3af] mt-1">30–50% hotel profit payout</p>
                <p className="text-[13px] font-medium text-[#1a6cf5] mt-6 group-hover:underline">
                  Learn more →
                </p>
              </Link>

              {/* Ticketing card */}
              <Link
                href="/products/ticketing-for-events"
                className="group border border-[#e5e7eb] rounded-2xl p-8 hover:border-[#1a6cf5] hover:shadow-lg hover:shadow-blue-500/5 transition-all block"
              >
                <p className="eyebrow mb-3">Ticketing for Events</p>
                <h2 className="text-[1.25rem] font-black tracking-tight text-[#0a0a0a] mb-3 group-hover:text-[#1a6cf5] transition-colors">
                  Multi-channel ticketing. Instant payouts.
                </h2>
                <p className="text-[14px] font-light text-[#6b7280] leading-relaxed mb-6">
                  Sell across every channel, get paid instantly, own your attendee data. No monthly fees, no lock-in contracts.
                </p>
                <div className="flex items-baseline gap-1">
                  <span className="text-[2.5rem] font-black text-[#1a6cf5] leading-none">2%</span>
                  <span className="text-[13px] text-[#6b7280] ml-2">per ticket</span>
                </div>
                <p className="text-[12px] text-[#9ca3af] mt-1">Free for free events</p>
                <p className="text-[13px] font-medium text-[#1a6cf5] mt-6 group-hover:underline">
                  Learn more →
                </p>
              </Link>

            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-16 px-6 bg-[#0a0a0a] border-t border-[#e5e7eb]">
          <div className="max-w-xl mx-auto text-center">
            <p className="eyebrow mb-4" style={{ color: '#4d8ef7' }}>Get started</p>
            <h2 className="text-[1.75rem] font-black tracking-tight text-white mb-4">
              Ready to set up your event?
            </h2>
            <p className="text-[15px] font-light mb-8" style={{ color: 'rgba(255,255,255,0.6)' }}>
              No commitment required. Hotel booking is free. Ticketing is 2% per ticket.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="https://events.hoperfy.com/admin/signin"
                target="_blank"
                rel="noopener noreferrer"
                className="h-12 px-8 text-[14px] font-medium bg-white text-[#0a0a0a] rounded-lg hover:bg-white/90 transition-colors flex items-center justify-center"
              >
                Your events →
              </a>
              <a
                href="https://calendly.com/tadas-hoperfy/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="h-12 px-8 text-[14px] font-medium border border-white/30 text-white rounded-lg hover:bg-white/10 transition-colors flex items-center justify-center"
              >
                Book a demo
              </a>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
