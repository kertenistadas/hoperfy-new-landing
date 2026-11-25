import { client } from '@/sanity/lib/client'
import { relatedComparisonsQuery } from '@/sanity/lib/queries'
import ComparisonLink from '@/components/compare/ComparisonLink'

type RelatedComparison = {
  _id: string
  title: string | null
  linkLabel?: string | null
  slug: string | null
}

type Props = {
  /** Product slug, e.g. "ticketing-for-events". */
  product: string
  /** Where the links sit, sent as the analytics location param. */
  location: string
  className?: string
}

/**
 * Links to every published comparison whose relatedProduct is `product`,
 * then always "All comparisons". If the fetch fails or finds nothing, only
 * the "All comparisons" link renders.
 */
export default async function RelatedComparisons({ product, location, className = '' }: Props) {
  const comparisons = await client
    .fetch<RelatedComparison[]>(relatedComparisonsQuery, { product })
    .catch(() => [] as RelatedComparison[])

  const links = (comparisons ?? []).flatMap((c) => {
    const label = c.linkLabel?.trim() || c.title?.trim()
    return c.slug && label ? [{ key: c._id, href: `/compare/${c.slug}`, label }] : []
  })

  return (
    <div className={`flex flex-col items-start gap-2 ${className}`.trim()}>
      {links.map((link) => (
        <ComparisonLink key={link.key} href={link.href} location={location}>
          {link.label} →
        </ComparisonLink>
      ))}
      <ComparisonLink href="/compare" location={location}>
        All comparisons →
      </ComparisonLink>
    </div>
  )
}
