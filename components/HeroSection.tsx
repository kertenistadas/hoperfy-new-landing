'use client'

import { useState } from 'react'
import type { Hero } from '@/types'

type Props = {
  data: Hero
}

export default function HeroSection({ data }: Props) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return

    setStatus('loading')
    try {
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (res.ok) {
        setStatus('done')
        setEmail('')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="pt-32 pb-24 px-6">
      <div className="max-w-2xl mx-auto text-center">
        <p className="eyebrow mb-6">Event commerce infrastructure</p>

        <h1 className="text-[2.75rem] md:text-[3.5rem] font-black leading-[1.05] tracking-tight text-[#0a0a0a] mb-6">
          {data.headline}
        </h1>

        <p className="text-lg font-light text-[#6b7280] leading-relaxed mb-12 max-w-xl mx-auto">
          {data.subtitle}
        </p>

        <div id="signup">
          {status === 'done' ? (
            <p className="text-[15px] text-[#0a0a0a] font-medium">
              You are on the list. We will be in touch.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={data.ctaPlaceholder}
                className="flex-1 h-11 px-4 text-[14px] border border-[#e5e7eb] rounded-lg outline-none focus:border-[#1a6cf5] focus:ring-2 focus:ring-[#1a6cf5]/10 transition-all placeholder:text-[#9ca3af]"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="h-11 px-6 text-[14px] font-medium bg-[#1a6cf5] text-white rounded-lg hover:bg-[#1558cc] transition-colors disabled:opacity-60 whitespace-nowrap"
              >
                {status === 'loading' ? 'Sending...' : data.ctaText}
              </button>
            </form>
          )}

          {status === 'error' && (
            <p className="mt-3 text-[13px] text-red-500">
              Something went wrong. Try again or email us directly.
            </p>
          )}

          <p className="mt-4 text-[12px] text-[#9ca3af]">
            No spam. Unsubscribe any time.
          </p>
        </div>
      </div>
    </section>
  )
}
