import Link from 'next/link'
import type { FooterCategory } from '@/types'

type NavLink = { title: string; slug: string }

type Props = {
  // Kept so NavWrapper can keep passing it; no longer rendered in the footer.
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

export default function Footer({ footerCategories = [] }: Props) {
  return (
    <footer className="pt-16 pb-10 px-6 border-t border-[#e5e7eb]">
      <div className="max-w-5xl mx-auto">
        {/* Footer category columns (CMS-driven) */}
        {footerCategories.length > 0 && (
          <div className="flex flex-col sm:flex-row gap-10 sm:gap-16 mb-12">
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
          </div>
        )}

        {/* Bottom bar: brand + copyright on the left, email on the right */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-[#e5e7eb]">
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
            <span className="text-[15px] font-bold tracking-tight text-[#0a0a0a]">Hoperfy</span>
            <span className="text-[12px] text-[#9ca3af]">&copy; {new Date().getFullYear()} Hoperfy</span>
          </div>
          <a href="mailto:hello@hoperfy.com" className="text-[12px] text-[#9ca3af] hover:text-[#6b7280] transition-colors">
            hello@hoperfy.com
          </a>
        </div>
      </div>
    </footer>
  )
}
