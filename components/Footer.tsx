import Link from 'next/link'

type NavLink = { title: string; slug: string }

type Props = {
  footerPages?: NavLink[]
}

export default function Footer({ footerPages = [] }: Props) {
  return (
    <footer className="py-12 px-6 border-t border-[#e5e7eb]">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="text-[13px] font-semibold tracking-tight text-[#0a0a0a]">Hoperfy</span>

        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {footerPages.map((footerPage) => (
            <Link
              key={footerPage.slug}
              href={`/${footerPage.slug}`}
              className="text-[12px] text-[#9ca3af] hover:text-[#6b7280] transition-colors"
            >
              {footerPage.title}
            </Link>
          ))}
          <Link href="/legal/privacy-policy" className="text-[12px] text-[#9ca3af] hover:text-[#6b7280] transition-colors">
            Privacy
          </Link>
          <Link href="/legal/terms-of-service" className="text-[12px] text-[#9ca3af] hover:text-[#6b7280] transition-colors">
            Terms
          </Link>
          <a href="mailto:hello@hoperfy.com" className="text-[12px] text-[#9ca3af] hover:text-[#6b7280] transition-colors">
            hello@hoperfy.com
          </a>
        </div>

        <p className="text-[12px] text-[#9ca3af]">
          &copy; {new Date().getFullYear()} Hoperfy
        </p>
      </div>
    </footer>
  )
}
