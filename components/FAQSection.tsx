'use client'

import { useState } from 'react'

const faqs = [
  {
    question: 'What is Hoperfy?',
    answer:
      'Hoperfy is an event commerce platform that gives event teams two products: a white-label hotel booking engine and a multi-platform ticketing system. Both are built specifically for event organizers who want to own the full attendee experience.',
  },
  {
    question: 'How is Hoperfy different from Cvent Passkey or EventPipe?',
    answer:
      'Hoperfy combines hotel booking and ticketing in one platform. Cvent and EventPipe only handle hotel room blocks. Hoperfy gives you both, with white-label branding, instant payouts.',
  },
  {
    question: 'Is there a commission on hotel bookings?',
    answer:
      'Hoperfy splits the profits with your event team / organization. From each booking the event will receive 30%-50% of nett profit.',
  },
  {
    question: 'How long does it take to set up?',
    answer:
      'We provide the links in minutes, adding them to your site takes another minute or two. No development skill required.',
  },
  {
    question: 'Does Hoperfy replace Eventbrite?',
    answer:
      'For event teams running their own events, yes. Hoperfy gives you more control, better branding, instant payouts, and smaller % fees than third party event marketplaces.',
  },
  {
    question: 'What size events is Hoperfy built for?',
    answer:
      'Smallest event that Hoperfy ever managed was 20 people, our largest partner event is 70,000 attendees. Hoperfy is suited for all types of event sizes and geographies.',
  },
]

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="faq" className="py-24 px-6 border-t border-[#e5e7eb]">
      <div className="max-w-5xl mx-auto">
        <div className="mb-16">
          <p className="eyebrow mb-3">Questions</p>
          <h2 className="text-[1.75rem] md:text-[2.25rem] font-black tracking-tight text-[#0a0a0a]">
            Frequently asked questions
          </h2>
        </div>

        <div className="max-w-3xl divide-y divide-[#e5e7eb] border-t border-[#e5e7eb]">
          {faqs.map((faq, i) => {
            const open = openIndex === i
            return (
              <div key={i}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(open ? null : i)}
                  className="w-full flex items-center justify-between gap-6 py-6 text-left"
                  aria-expanded={open}
                >
                  <span className="text-[16px] md:text-[17px] font-semibold text-[#0a0a0a]">
                    {faq.question}
                  </span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    aria-hidden="true"
                    className={`shrink-0 text-[#1a6cf5] transition-transform duration-300 ${open ? 'rotate-45' : ''}`}
                  >
                    <path d="M8 3.5V12.5M3.5 8H12.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
                  </svg>
                </button>
                <div
                  className="grid transition-all duration-300 ease-out"
                  style={{ gridTemplateRows: open ? '1fr' : '0fr' }}
                >
                  <div className="overflow-hidden">
                    <p className="text-[15px] font-light text-[#6b7280] leading-relaxed pb-6 pr-10">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((faq) => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
              },
            })),
          }),
        }}
      />
    </section>
  )
}
