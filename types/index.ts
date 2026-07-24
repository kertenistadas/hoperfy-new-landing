export type Hero = {
  headline: string
  subtitle: string
  ctaText: string
  ctaPlaceholder: string
}

export type Product = {
  _id: string
  title: string
  slug?: string
  tagline: string
  description: string
  features: string[]
  stat: {
    value: string
    label: string
  }
}

export type ProductDetail = {
  _id: string
  title: string
  slug: string
  tagline: string
  description: string
  features: string[]
  stat: {
    value: string
    label: string
  }
  heroHeadline: string
  heroSubtitle: string
  heroCta: string
  problemHeadline: string
  problems: {
    title: string
    description: string
  }[]
  featuresHeadline: string
  featuresList: {
    title: string
    description: string
  }[]
  howItWorksHeadline: string
  steps: {
    title: string
    description: string
  }[]
  stats: {
    value: string
    label: string
  }[]
}

export type Testimonial = {
  _id: string
  quote: string
  author: string
  role: string
  company: string
}

export type SocialProof = {
  label: string
  companies: {
    name: string
    logoUrl: string
    caseStudyUrl?: string | null
  }[]
}

export type Page = {
  _id: string
  title: string
  slug: string
  placement: string[]
  metaDescription: string
  body?: any[]
}

export type NavLink = {
  title: string
  slug: string
}

export type NavCategory = {
  _id: string
  title: string
  pages: { title: string; slug: string }[]
}

export type FooterCategory = {
  _id: string
  title: string
  links: { label: string; url: string }[]
}

export type LegalPage = {
  title: string
  lastUpdated: string
  body: any[]
}

export type BlogCategory = {
  _id: string
  title: string
  slug: string
  description: string
}

export type BlogPostCard = {
  _id: string
  title: string
  slug: string
  publishedAt: string
  author: string
  excerpt: string
  category: { title: string; slug: string } | null
  relatedProduct: { title: string; slug: string } | null
}

export type BlogPost = BlogPostCard & {
  body: any[]
  relatedPosts: BlogPostCard[]
  metaTitle: string | null
  metaDescription: string | null
  relatedProduct: { title: string; slug: string; tagline: string } | null
}

export type CaseStudyCard = {
  _id: string
  title: string
  slug: string
  clientName: string
  clientLogoUrl: string | null
  clientWebsite: string | null
  industry: string | null
  eventSize: string | null
  productsUsed: string[]
  keyResults: { value: string; label: string }[]
  intro: string | null
  metaTitle: string | null
  metaDescription: string | null
  publishedAt: string
}

export type CaseStudy = CaseStudyCard & {
  challenge: any[]
  solution: any[]
  result: any[]
  quote: { text: string; author: string; role: string } | null
  whyItMatters: string | null
  relatedProduct: { title: string; slug: string; tagline: string } | null
}

export type Pricing = {
  _id: string
  price: string
  priceSuffix: string | null
  tagline: string | null
  highlighted: boolean
  includes: string[]
  cta: string
  product: {
    title: string
    slug: string
    tagline: string
  }
}
