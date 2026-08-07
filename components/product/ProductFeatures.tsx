import type { ProductDetail } from '@/types'

type Props = {
  product: ProductDetail
}

export default function ProductFeatures({ product }: Props) {
  if (!product.featuresList?.length && product.slug !== 'hotels-for-events') return null

  return (
    <section className="py-24 px-6 border-t border-[#e5e7eb]">
      <div className="max-w-5xl mx-auto">
        <div className="mb-16">
          <p className="eyebrow mb-3">What you get</p>
          <h2 className="text-[1.75rem] md:text-[2.25rem] font-black tracking-tight text-[#0a0a0a]">
            {product.featuresHeadline ?? 'Everything included'}
          </h2>
        </div>

        {product.slug === 'hotels-for-events' ? (
          <div className="flex flex-col gap-4">

            {/* Top row — 2 cards */}
            <div className="grid md:grid-cols-2 gap-4">

              <div className="border border-[#e5e7eb] rounded-2xl p-8 hover:border-[#1a6cf5] hover:shadow-lg hover:shadow-blue-500/5 transition-all">
                <div className="w-12 h-12 rounded-xl bg-[#eef4ff] flex items-center justify-center mb-5">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="9" stroke="#1a6cf5" strokeWidth="1.5"/>
                    <path d="M12 2C12 2 8 6 8 12C8 18 12 22 12 22" stroke="#1a6cf5" strokeWidth="1.5"/>
                    <path d="M12 2C12 2 16 6 16 12C16 18 12 22 12 22" stroke="#1a6cf5" strokeWidth="1.5"/>
                    <path d="M3 12H21" stroke="#1a6cf5" strokeWidth="1.5"/>
                    <circle cx="12" cy="12" r="2" fill="#1a6cf5"/>
                  </svg>
                </div>
                <h3 className="text-[16px] font-black tracking-tight text-[#0a0a0a] mb-2">Endless Global Inventory</h3>
                <p className="text-[14px] font-light text-[#6b7280] leading-relaxed">
                  Instant access to 2,000,000+ hotel properties worldwide. Scale any event — major hub, secondary city, or remote destination. Your attendees always have somewhere to stay.
                </p>
              </div>

              <div className="border border-[#e5e7eb] rounded-2xl p-8 hover:border-[#1a6cf5] hover:shadow-lg hover:shadow-blue-500/5 transition-all">
                <div className="w-12 h-12 rounded-xl bg-[#eef4ff] flex items-center justify-center mb-5">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L4 6V12C4 16.4 7.4 20.5 12 22C16.6 20.5 20 16.4 20 12V6L12 2Z" stroke="#1a6cf5" strokeWidth="1.5" strokeLinejoin="round"/>
                    <path d="M9 12L11 14L15 10" stroke="#1a6cf5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="text-[16px] font-black tracking-tight text-[#0a0a0a] mb-2">Total Brand Ownership</h3>
                <p className="text-[14px] font-light text-[#6b7280] leading-relaxed">
                  Keep complete control with a fully white-label hotel booking flow. Your brand, your domain, your checkout. Attendees never leave your event experience.
                </p>
              </div>
            </div>

            {/* Bottom row — 2 cards */}
            <div className="grid md:grid-cols-2 gap-4">

              <div className="border border-[#e5e7eb] rounded-2xl p-8 hover:border-[#1a6cf5] hover:shadow-lg hover:shadow-blue-500/5 transition-all">
                <div className="w-12 h-12 rounded-xl bg-[#eef4ff] flex items-center justify-center mb-5">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 12C8 12 9 14 12 14C15 14 16 12 16 12" stroke="#1a6cf5" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M7 8H17" stroke="#1a6cf5" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M7 16H17" stroke="#1a6cf5" strokeWidth="1.5" strokeLinecap="round"/>
                    <rect x="3" y="3" width="18" height="18" rx="3" stroke="#1a6cf5" strokeWidth="1.5"/>
                    <path d="M15 6L17 8L15 10" stroke="#1a6cf5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="text-[16px] font-black tracking-tight text-[#0a0a0a] mb-2">Effortless Hotel Contracting</h3>
                <p className="text-[14px] font-light text-[#6b7280] leading-relaxed">
                  We take over full-service hotel negotiations, rates, and contracting on your behalf. No paperwork, no emails to hotel sales managers. Just a booking page ready for your attendees.
                </p>
              </div>

              <div className="border border-[#e5e7eb] rounded-2xl p-8 hover:border-[#1a6cf5] hover:shadow-lg hover:shadow-blue-500/5 transition-all">
                <div className="w-12 h-12 rounded-xl bg-[#eef4ff] flex items-center justify-center mb-5">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="9" stroke="#1a6cf5" strokeWidth="1.5"/>
                    <path d="M12 7V12L15 15" stroke="#1a6cf5" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M17 3L19 5" stroke="#1a6cf5" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M7 3L5 5" stroke="#1a6cf5" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
                <h3 className="text-[16px] font-black tracking-tight text-[#0a0a0a] mb-2">Real-Time Room Block Sync</h3>
                <p className="text-[14px] font-light text-[#6b7280] leading-relaxed">
                  Live availability across all hotel partners, updated automatically. Eliminate the risk of overselling and manual block updates. Your inventory is always accurate.
                </p>
              </div>
            </div>

            {/* Full width bottom card */}
            <div className="border border-[#1a6cf5] bg-[#eef4ff] rounded-2xl p-8">
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shrink-0">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="2" y="8" width="20" height="13" rx="2" stroke="#1a6cf5" strokeWidth="1.5"/>
                    <path d="M7 8V6C7 3.8 9.2 2 12 2C14.8 2 17 3.8 17 6V8" stroke="#1a6cf5" strokeWidth="1.5" strokeLinecap="round"/>
                    <circle cx="12" cy="14" r="2" fill="#1a6cf5"/>
                    <path d="M8 8H16" stroke="#1a6cf5" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-[16px] font-black tracking-tight text-[#0a0a0a] mb-2">Combined Event Ticketing + Hotel Booking</h3>
                  <p className="text-[14px] font-light text-[#6b7280] leading-relaxed">
                    The only platform that combines white-label hotel booking and multi-channel event ticketing in one place. One setup, one team, one dashboard — a meaningful differentiator over every alternative.
                  </p>
                </div>
                <a href="https://calendly.com/tadas-hoperfy/30min" target="_blank" rel="noopener noreferrer" className="text-[13px] font-medium text-[#1a6cf5] hover:underline whitespace-nowrap shrink-0">
                  Let's talk →
                </a>
              </div>
            </div>

          </div>
        ) : (
          /* Original bullet list for other products */
          <div className="grid md:grid-cols-2 gap-x-16 gap-y-10">
            {product.featuresList.map((f, i) => (
              <div key={i} className="flex gap-4">
                <div className="mt-1 w-5 h-5 rounded-full bg-[#eef4ff] flex items-center justify-center shrink-0">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#1a6cf5]" />
                </div>
                <div>
                  <h3 className="text-[15px] font-semibold text-[#0a0a0a] mb-1">{f.title}</h3>
                  <p className="text-[14px] font-light text-[#6b7280] leading-relaxed">{f.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
