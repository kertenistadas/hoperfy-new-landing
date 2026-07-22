'use client'

import { useState } from 'react'
import type { ProductDetail } from '@/types'

type Props = {
  product: ProductDetail
}

export default function ProductCTA({ product }: Props) {
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
        body: JSON.stringify({ email, product: product.slug }),
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
    <section className="py-24 px-6 bg-[#eef4ff]">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-[1.75rem] md:text-[2.25rem] font-black tracking-tight text-[#0a0a0a] mb-8">
          Ready to try {product.title}?
        </h2>

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
              placeholder="Your work email"
              className="flex-1 h-11 px-4 text-[14px] bg-white border border-[#e5e7eb] rounded-lg outline-none focus:border-[#1a6cf5] focus:ring-2 focus:ring-[#1a6cf5]/10 transition-all placeholder:text-[#9ca3af]"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="h-11 px-6 text-[14px] font-medium bg-[#1a6cf5] text-white rounded-lg hover:bg-[#1558cc] transition-colors disabled:opacity-60 whitespace-nowrap"
            >
              {status === 'loading' ? 'Sending...' : product.heroCta}
            </button>
          </form>
        )}

        {status === 'error' && (
          <p className="mt-3 text-[13px] text-red-500">
            Something went wrong. Try again or email us directly.
          </p>
        )}
      </div>
    </section>
  )
}
