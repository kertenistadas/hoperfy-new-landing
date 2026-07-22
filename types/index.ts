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
  }[]
}

export type LegalPage = {
  title: string
  lastUpdated: string
  body: any[]
}
