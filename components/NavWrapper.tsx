import { client } from '@/sanity/lib/client'
import { navPagesQuery, footerPagesQuery, navCategoriesQuery, footerCategoriesQuery } from '@/sanity/lib/queries'
import type { NavLink, NavCategory, FooterCategory } from '@/types'
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
  // Revalidate the CMS-managed nav/footer chrome on a short interval so newly
  // published pages (e.g. a page with "footer" placement) appear everywhere —
  // including statically rendered routes — without needing a redeploy.
  const chromeCache = { next: { revalidate: 60 } } as const

  const [navPages, footerPages, navCategories, footerCategories] = await Promise.all([
    client.fetch<NavLink[]>(navPagesQuery, {}, chromeCache).catch(() => []),
    client.fetch<NavLink[]>(footerPagesQuery, {}, chromeCache).catch(() => []),
    client.fetch<NavCategory[]>(navCategoriesQuery, {}, chromeCache).catch(() => []),
    client.fetch<FooterCategory[]>(footerCategoriesQuery, {}, chromeCache).catch(() => []),
  ])

  return (
    <>
      <Nav navPages={navPages} footerPages={footerPages} navCategories={navCategories} />
      {children}
      <Footer footerPages={footerPages} footerCategories={footerCategories} />
    </>
  )
}
