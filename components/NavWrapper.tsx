import { client } from '@/sanity/lib/client'
import { navPagesQuery, footerPagesQuery } from '@/sanity/lib/queries'
import type { NavLink } from '@/types'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

/**
 * Server component that fetches the CMS-managed nav and footer links and wraps
 * page content with the marketing chrome (Nav + Footer).
 *
 * This is used per-page rather than in the root layout on purpose: the root
 * layout also wraps the /studio (Sanity Studio) route, which must NOT render
 * the marketing Nav/Footer.
 */
export default async function NavWrapper({ children }: { children: React.ReactNode }) {
  const [navPages, footerPages] = await Promise.all([
    client.fetch<NavLink[]>(navPagesQuery).catch(() => []),
    client.fetch<NavLink[]>(footerPagesQuery).catch(() => []),
  ])

  return (
    <>
      <Nav navPages={navPages} footerPages={footerPages} />
      {children}
      <Footer footerPages={footerPages} />
    </>
  )
}
