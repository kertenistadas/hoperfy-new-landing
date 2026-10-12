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
    fullFeatures,
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
    fullFeatures,
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
      "logoUrl": logo.asset->url,
      caseStudyUrl
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

export const blogPostsQuery = groq`
  *[_type == "blogPost"] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    author,
    excerpt,
    "category": category->{ title, "slug": slug.current },
    "relatedProduct": relatedProduct->{ title, "slug": slug.current }
  }
`

export const blogPostBySlugQuery = groq`
  *[_type == "blogPost" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    author,
    excerpt,
    body,
    keyTakeaways,
    takeawaysCtaLabel,
    takeawaysCtaHref,
    "category": category->{ title, "slug": slug.current },
    "relatedProduct": relatedProduct->{ title, "slug": slug.current, tagline },
    "relatedPosts": relatedPosts[]->{
      _id,
      title,
      "slug": slug.current,
      publishedAt,
      excerpt,
      "category": category->{ title, "slug": slug.current }
    },
    metaTitle,
    metaDescription
  }
`

export const blogPostsByCategoryQuery = groq`
  *[_type == "blogPost" && category->slug.current == $category] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    author,
    excerpt,
    "category": category->{ title, "slug": slug.current },
    "relatedProduct": relatedProduct->{ title, "slug": slug.current }
  }
`

export const blogCategoriesQuery = groq`
  *[_type == "blogCategory"] | order(title asc) {
    _id,
    title,
    "slug": slug.current,
    description
  }
`

export const caseStudiesQuery = groq`
  *[_type == "caseStudy"] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    clientName,
    "clientLogoUrl": clientLogo.asset->url,
    clientWebsite,
    industry,
    eventSize,
    productsUsed,
    keyResults,
    intro,
    metaTitle,
    metaDescription,
    publishedAt
  }
`

export const caseStudyBySlugQuery = groq`
  *[_type == "caseStudy" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    metaTitle,
    metaDescription,
    publishedAt,
    clientName,
    clientWebsite,
    "clientLogoUrl": clientLogo.asset->url,
    industry,
    eventSize,
    productsUsed,
    keyResults,
    intro,
    challenge,
    solution,
    result,
    quote,
    whyItMatters,
    "relatedProduct": relatedProduct->{ title, "slug": slug.current, tagline }
  }
`

export const pricingQuery = groq`
  *[_type == "pricing"] | order(order asc) {
    _id,
    price,
    priceSuffix,
    tagline,
    highlighted,
    includes,
    cta,
    "product": product->{
      title,
      "slug": slug.current,
      tagline,
      fullFeatures
    }
  }
`

export const pricingByProductQuery = groq`
  *[_type == "pricing" && product->slug.current == $slug][0] {
    _id,
    price,
    priceSuffix,
    tagline,
    highlighted,
    includes,
    cta,
    "product": product->{ title, "slug": slug.current, fullFeatures }
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

// ---------------------------------------------------------------------------
// Events Directory
//
// Every event query takes a $cutoff date (see getCutoffDate in lib/eventUtils)
// so events that ended more than 12 months ago are never returned.
// ---------------------------------------------------------------------------

export const allEventsQuery = groq`
  *[_type == "event" && (!defined(startDate) || endDate >= $cutoff || startDate >= $cutoff)] | order(defined(startDate) desc, startDate asc) {
    _id, name, "slug": slug.current, startDate, endDate, venue, website,
    attendees, ticketPriceFrom, organizer, format, description,
    "logoUrl": logo.asset->url,
    "city": city->{ name, "slug": slug.current, "country": country->{ name, "slug": slug.current } },
    "category": category->{ title, "slug": slug.current }
  }
`

export const eventBySlugQuery = groq`
  *[_type == "event" && slug.current == $slug][0] {
    _id, name, "slug": slug.current, startDate, endDate, venue, website,
    attendees, ticketPriceFrom, organizer, format, description,
    "logoUrl": logo.asset->url,
    "city": city->{ name, "slug": slug.current, description, "country": country->{ name, "slug": slug.current, description } },
    "category": category->{ title, "slug": slug.current, description }
  }
`

export const eventCategoriesQuery = groq`*[_type == "eventCategory"] | order(order asc) { _id, title, "slug": slug.current, description, metaTitle, metaDescription, intro, faqs }`

export const categoryBySlugQuery = groq`*[_type == "eventCategory" && slug.current == $slug][0] { _id, title, "slug": slug.current, description, metaTitle, metaDescription, intro, faqs }`
export const eventCountriesQuery = groq`*[_type == "eventCountry"] | order(name asc) { _id, name, "slug": slug.current, description }`
export const eventCitiesQuery = groq`*[_type == "eventCity"] | order(name asc) { _id, name, "slug": slug.current, description, "country": country->{ name, "slug": slug.current } }`

export const eventsByCountryQuery = groq`
  *[_type == "event" && city->country->slug.current == $country && (!defined(startDate) || endDate >= $cutoff || startDate >= $cutoff)] | order(defined(startDate) desc, startDate asc) {
    _id, name, "slug": slug.current, startDate, endDate, venue, attendees, ticketPriceFrom, format,
    "logoUrl": logo.asset->url,
    "city": city->{ name, "slug": slug.current, "country": country->{ name, "slug": slug.current } },
    "category": category->{ title, "slug": slug.current }
  }
`

export const eventsByCityQuery = groq`
  *[_type == "event" && city->slug.current == $city && (!defined(startDate) || endDate >= $cutoff || startDate >= $cutoff)] | order(defined(startDate) desc, startDate asc) {
    _id, name, "slug": slug.current, startDate, endDate, venue, attendees, ticketPriceFrom, format,
    "logoUrl": logo.asset->url,
    "city": city->{ name, "slug": slug.current, description, "country": country->{ name, "slug": slug.current, description } },
    "category": category->{ title, "slug": slug.current }
  }
`

export const eventsByCategoryQuery = groq`
  *[_type == "event" && category->slug.current == $category && (!defined(startDate) || endDate >= $cutoff || startDate >= $cutoff)] | order(defined(startDate) desc, startDate asc) {
    _id, name, "slug": slug.current, startDate, endDate, venue, attendees, ticketPriceFrom, format,
    "logoUrl": logo.asset->url,
    "city": city->{ name, "slug": slug.current, "country": country->{ name, "slug": slug.current } },
    "category": category->{ title, "slug": slug.current }
  }
`

export const countryBySlugQuery = groq`*[_type == "eventCountry" && slug.current == $slug][0] { _id, name, "slug": slug.current, description, metaTitle, metaDescription, intro, faqs }`
export const cityBySlugQuery = groq`*[_type == "eventCity" && slug.current == $slug][0] { _id, name, "slug": slug.current, description, metaTitle, metaDescription, intro, faqs, "country": country->{ name, "slug": slug.current, description } }`

export const citiesByCountryQuery = groq`
  *[_type == "eventCity" && country->slug.current == $country] | order(name asc) {
    _id, name, "slug": slug.current, description,
    "country": country->{ name, "slug": slug.current }
  }
`
