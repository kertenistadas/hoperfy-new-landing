import type { PortableTextComponents } from '@portabletext/react'
import BlogImage from '@/components/blog/BlogImage'
import BodyLink, { internalPath } from '@/components/blog/BodyLink'

export { internalPath }

/**
 * Comparison pages never link out: an external link would send readers, and
 * link equity, to a competitor. Anything that does not resolve to a path on
 * hoperfy.com renders as its plain text.
 */
export const comparisonBodyComponents: PortableTextComponents = {
  types: {
    image: ({ value }) => <BlogImage value={value} />,
  },
  marks: {
    link: ({ value, children }) => (
      <BodyLink href={value?.href} allowExternal={false}>
        {children}
      </BodyLink>
    ),
  },
}
