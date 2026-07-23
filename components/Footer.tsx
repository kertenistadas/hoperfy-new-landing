import Link from 'next/link'
import type { FooterCategory } from '@/types'

type NavLink = { title: string; slug: string }

type Props = {
  footerPages?: NavLink[]
  footerCategories?: FooterCategory[]
}

const linkClass = 'text-[13px] text-[#6b7280] hover:text-[#0a0a0a] transition-colors block mb-2'
const labelClass = 'text-[11px] font-semibold tracking-widest uppercase text-[#9ca3af] mb-4'

/** Renders a CMS footer-category link: external (http) opens in a new tab. */
function FooterLink({ url, children }: { url: string; children: React.ReactNode }) {
  if (url?.startsWith('http')) {
    return (
      <a href={url} target="_blank" rel="noopener noreferrer" className={linkClass}>
        {children}
      </a>
    )
  }
  return (
    <Link href={url || '/'} className={linkClass}>
      {children}
    </Link>
  )
}

export default function Footer({ footerPages = [], footerCategories = [] }: Props) {
  const hasCategories = footerCategories.length > 0

  return (
    <footer className="pt-16 pb-10 px-6 border-t border-[#e5e7eb]">
      <div className="max-w-5xl mx-auto">
        {/* Top: brand on the left, category columns on the right */}
        <div className="flex flex-col md:flex-row md:justify-between gap-10 mb-12">
          <span className="text-[15px] font-bold tracking-tight text-[#0a0a0a]">Hoperfy</span>

          {hasCategories && (
            <div className="flex flex-col sm:flex-row gap-10 sm:gap-16">
              {footerCategories.map((category) => (
                <div key={category._id}>
                  <p className={labelClass}>{category.title}</p>
                  {category.links?.map((link, i) => (
                    <FooterLink key={i} url={link.url}>
                      {link.label}
                    </FooterLink>
                  ))}
                </div>
              ))}

              {/* Legal / custom pages grouped under their own label */}
              <div>
                <p className={labelClass}>Legal</p>
                {footerPages.map((footerPage) => (
                  <Link key={footerPage.slug} href={`/${footerPage.slug}`} className={linkClass}>
                    {footerPage.title}
                  </Link>
                ))}
                <Link href="/legal/privacy-policy" className={linkClass}>
                  Privacy
                </Link>
                <Link href="/legal/terms-of-service" className={linkClass}>
                  Terms
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* No categories: fall back to the original single row of links */}
        {!hasCategories && (
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-12">
            {footerPages.map((footerPage) => (
              <Link key={footerPage.slug} href={`/${footerPage.slug}`} className="text-[12px] text-[#9ca3af] hover:text-[#6b7280] transition-colors">
                {footerPage.title}
              </Link>
            ))}
            <Link href="/legal/privacy-policy" className="text-[12px] text-[#9ca3af] hover:text-[#6b7280] transition-colors">
              Privacy
            </Link>
            <Link href="/legal/terms-of-service" className="text-[12px] text-[#9ca3af] hover:text-[#6b7280] transition-colors">
              Terms
            </Link>
          </div>
        )}

        {/* Bottom: copyright left, email right */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-[#e5e7eb]">
          <p className="text-[12px] text-[#9ca3af]">&copy; {new Date().getFullYear()} Hoperfy</p>
          <a href="mailto:hello@hoperfy.com" className="text-[12px] text-[#9ca3af] hover:text-[#6b7280] transition-colors">
            hello@hoperfy.com
          </a>
        </div>
      </div>
    </footer>
  )
}
