import Link from 'next/link'

export default function Nav() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-[#e5e7eb]">
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link href="/" className="text-[15px] font-semibold tracking-tight text-[#0a0a0a]">
          Hoperfy
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link href="#products" className="text-[13px] text-[#6b7280] hover:text-[#0a0a0a] transition-colors">
            Products
          </Link>
          <Link href="#testimonials" className="text-[13px] text-[#6b7280] hover:text-[#0a0a0a] transition-colors">
            Customers
          </Link>
          <Link href="mailto:hello@hoperfy.com" className="text-[13px] text-[#6b7280] hover:text-[#0a0a0a] transition-colors">
            Contact
          </Link>
        </nav>

        <a href="#signup" className="text-[13px] font-medium bg-[#1a6cf5] text-white px-4 py-2 rounded-lg hover:bg-[#1558cc] transition-colors">
          Get access
        </a>
      </div>
    </header>
  )
}
