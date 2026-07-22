'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

const products = [
  {
    href: '/products/hotels-for-events',
    title: 'Hotels for Events',
    description: 'White-label hotel booking for event teams',
  },
  {
    href: '/products/ticketing-for-events',
    title: 'Ticketing for Events',
    description: 'Multi-platform ticket sales in one dashboard',
  },
]

type NavLink = { title: string; slug: string }

type Props = {
  navPages?: NavLink[]
  footerPages?: NavLink[]
}

export default function Nav({ navPages = [] }: Props) {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close the products dropdown when clicking outside of it
  useEffect(() => {
    if (!dropdownOpen) return
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [dropdownOpen])

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      const original = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = original
      }
    }
  }, [mobileOpen])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-[#e5e7eb]">
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link
          href="/"
          className="text-[15px] font-semibold tracking-tight text-[#0a0a0a]"
          onClick={() => setMobileOpen(false)}
        >
          Hoperfy
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setDropdownOpen((v) => !v)}
              className="flex items-center gap-1 text-[13px] text-[#6b7280] hover:text-[#0a0a0a] transition-colors"
              aria-expanded={dropdownOpen}
            >
              Products
              <svg
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="none"
                aria-hidden="true"
                className={`transition-transform ${dropdownOpen ? 'rotate-180' : ''}`}
              >
                <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {dropdownOpen && (
              <div className="absolute left-0 top-full mt-3 w-80 rounded-xl border border-[#e5e7eb] bg-white shadow-lg shadow-black/5 p-2">
                {products.map((product) => (
                  <Link
                    key={product.href}
                    href={product.href}
                    onClick={() => setDropdownOpen(false)}
                    className="block rounded-lg px-3 py-3 hover:bg-[#f9fafb] transition-colors"
                  >
                    <p className="text-[14px] font-semibold text-[#0a0a0a]">{product.title}</p>
                    <p className="text-[13px] font-light text-[#6b7280] mt-0.5">{product.description}</p>
                  </Link>
                ))}
                <div className="border-t border-[#e5e7eb] mt-2 pt-2">
                  <Link
                    href="/products"
                    onClick={() => setDropdownOpen(false)}
                    className="block rounded-lg px-3 py-2 text-[13px] font-medium text-[#1a6cf5] hover:bg-[#f9fafb] transition-colors"
                  >
                    View all products →
                  </Link>
                </div>
              </div>
            )}
          </div>

          {navPages.map((navPage) => (
            <Link
              key={navPage.slug}
              href={`/${navPage.slug}`}
              className="text-[13px] text-[#6b7280] hover:text-[#0a0a0a] transition-colors"
            >
              {navPage.title}
            </Link>
          ))}

          <Link href="/#testimonials" className="text-[13px] text-[#6b7280] hover:text-[#0a0a0a] transition-colors">
            Customers
          </Link>
          <Link href="mailto:hello@hoperfy.com" className="text-[13px] text-[#6b7280] hover:text-[#0a0a0a] transition-colors">
            Contact
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <a
            href="/#signup"
            className="hidden md:inline-block text-[13px] font-medium bg-[#1a6cf5] text-white px-4 py-2 rounded-lg hover:bg-[#1558cc] transition-colors"
          >
            Get access
          </a>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden relative w-6 h-6 flex flex-col items-center justify-center"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            <span
              className={`block h-[1.5px] w-5 bg-[#0a0a0a] transition-all duration-300 ${
                mobileOpen ? 'translate-y-[1px] rotate-45' : '-translate-y-1'
              }`}
            />
            <span
              className={`block h-[1.5px] w-5 bg-[#0a0a0a] transition-all duration-300 ${
                mobileOpen ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <span
              className={`block h-[1.5px] w-5 bg-[#0a0a0a] transition-all duration-300 ${
                mobileOpen ? '-translate-y-[1px] -rotate-45' : 'translate-y-1'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile full-screen overlay */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 top-14 z-40 bg-white overflow-y-auto">
          <div className="px-6 py-8 flex flex-col">
            <p className="eyebrow mb-4">Products</p>
            <div className="flex flex-col gap-1 mb-8">
              {products.map((product) => (
                <Link
                  key={product.href}
                  href={product.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg py-3"
                >
                  <p className="text-[17px] font-semibold text-[#0a0a0a]">{product.title}</p>
                  <p className="text-[14px] font-light text-[#6b7280] mt-0.5">{product.description}</p>
                </Link>
              ))}
            </div>

            <div className="flex flex-col gap-1 border-t border-[#e5e7eb] pt-6 mb-8">
              {navPages.map((navPage) => (
                <Link
                  key={navPage.slug}
                  href={`/${navPage.slug}`}
                  onClick={() => setMobileOpen(false)}
                  className="py-3 text-[17px] font-semibold text-[#0a0a0a]"
                >
                  {navPage.title}
                </Link>
              ))}
              <Link
                href="/#testimonials"
                onClick={() => setMobileOpen(false)}
                className="py-3 text-[17px] font-semibold text-[#0a0a0a]"
              >
                Customers
              </Link>
              <Link
                href="mailto:hello@hoperfy.com"
                onClick={() => setMobileOpen(false)}
                className="py-3 text-[17px] font-semibold text-[#0a0a0a]"
              >
                Contact
              </Link>
            </div>

            <a
              href="/#signup"
              onClick={() => setMobileOpen(false)}
              className="text-center text-[15px] font-medium bg-[#1a6cf5] text-white px-4 py-3.5 rounded-lg hover:bg-[#1558cc] transition-colors"
            >
              Get access
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
