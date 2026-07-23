import { groq } from 'next-sanity'

export const heroQuery = groq`
  *[_type == "hero"][0] {
    headline,
    subtitle,
    ctaText,
    ctaPlaceholder
  }
`

export const productsQuery = groq`
  *[_type == "product"] | order(order asc) {
    _id,
    title,
    "slug": slug.current,
    tagline,
    description,
    features,
    stat
  }
`

export const productBySlugQuery = groq`
  *[_type == "product" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    tagline,
    description,
    features,
    stat,
    heroHeadline,
    heroSubtitle,
    heroCta,
    problemHeadline,
    problems[] {
      title,
      description
    },
    featuresHeadline,
    featuresList[] {
      title,
      description
    },
    howItWorksHeadline,
    steps[] {
      title,
      description
    },
    stats[] {
      value,
      label
    }
  }
`

export const allProductSlugsQuery = groq`
  *[_type == "product" && defined(slug.current)] {
    "slug": slug.current
  }
`

export const testimonialsQuery = groq`
  *[_type == "testimonial" && featured == true][0...3] {
    _id,
    quote,
    author,
    role,
    company
  }
`

export const socialProofQuery = groq`
  *[_type == "socialProof"][0] {
    label,
    companies[] {
      name,
      "logoUrl": logo.asset->url
    }
  }
`

export const allPagesQuery = groq`
  *[_type == "page"] {
    _id,
    title,
    "slug": slug.current,
    placement,
    metaDescription
  }
`

export const pageBySlugQuery = groq`
  *[_type == "page" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    placement,
    metaDescription,
    body
  }
`

export const navPagesQuery = groq`
  *[_type == "page" && "nav" in placement] | order(title asc) {
    title,
    "slug": slug.current
  }
`

export const footerPagesQuery = groq`
  *[_type == "page" && "footer" in placement] | order(title asc) {
    title,
    "slug": slug.current
  }
`

export const footerCategoriesQuery = groq`
  *[_type == "footerCategory"] | order(order asc) {
    _id,
    title,
    links[] {
      label,
      url
    }
  }
`

export const navCategoriesQuery = groq`
  *[_type == "navCategory"] | order(order asc) {
    _id,
    title,
    "pages": pages[]->{
      title,
      "slug": slug.current
    }
  }
`

export const landingPagesQuery = groq`
  *[_type == "page" && "landing" in placement] | order(title asc) {
    _id,
    title,
    "slug": slug.current,
    metaDescription,
    body
  }
`

export const legalPageSlugsQuery = groq`
  *[_type == "legalPage" && defined(slug.current)] {
    "slug": slug.current,
    lastUpdated
  }
`

export const legalPageQuery = groq`
  *[_type == "legalPage" && slug.current == $slug][0] {
    title,
    lastUpdated,
    body
  }
`
