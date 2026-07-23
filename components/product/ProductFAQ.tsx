'use client'

import { useState } from 'react'

type FAQ = { question: string; answer: string }

type Props = {
  faqs: FAQ[]
  title?: string
}

export default function ProductFAQ({ faqs, title = 'Common questions' }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  if (!faqs || faqs.length === 0) return null

  return (
    <section className="py-24 px-6 border-t border-[#e5e7eb]">
      <div className="max-w-3xl mx-auto">
        <div className="mb-16">
          <p className="eyebrow mb-3">FAQ</p>
          <h2 className="text-[1.75rem] md:text-[2.25rem] font-black tracking-tight text-[#0a0a0a]">
            {title}
          </h2>
        </div>

        <div className="divide-y divide-[#e5e7eb] border-t border-[#e5e7eb]">
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
    </section>
  )
}
