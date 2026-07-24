import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { client } from '@/sanity/lib/client'
import { productBySlugQuery, testimonialsQuery, pricingByProductQuery } from '@/sanity/lib/queries'
import { fallbackProductDetails } from '@/sanity/lib/fallbackProducts'
import type { ProductDetail, Testimonial, Pricing } from '@/types'
import NavWrapper from '@/components/NavWrapper'
import TestimonialsSection from '@/components/TestimonialsSection'
import ProductHero from '@/components/product/ProductHero'
import ProductProblems from '@/components/product/ProductProblems'
import ProductFeatures from '@/components/product/ProductFeatures'
import ProductHowItWorks from '@/components/product/ProductHowItWorks'
import ProductStats from '@/components/product/ProductStats'
import ProductCTA from '@/components/product/ProductCTA'
import ProductFAQ from '@/components/product/ProductFAQ'
import ProductCompare from '@/components/product/ProductCompare'
import ProductPricing from '@/components/product/ProductPricing'
import ProductFullFeatures from '@/components/product/ProductFullFeatures'
import { productGeo, buildProductJsonLd } from './geoData'

export const dynamic = 'force-dynamic'

const BASE_URL = 'https://hoperfy.com'

const productKeywords: Record<string, string[]> = {
  'hotels-for-events': [
    'white label hotel booking',
    'hotel booking for events',
    'room block management software',
    'event housing management',
    'group hotel booking events',
    'Cvent Passkey alternative',
    'event hotel software',
  ],
  'ticketing-for-events': [
    'event ticketing platform',
    'multi-channel ticketing',
    'Eventbrite alternative',
    'sell event tickets online',
    'instant payout ticketing',
    'white label event ticketing',
    'ticketing software for event teams',
  ],
}

type Props = {
  params: Promise<{ slug: string }>
}

async function getProduct(slug: string): Promise<ProductDetail | null> {
  const product = await client
    .fetch<ProductDetail | null>(productBySlugQuery, { slug })
    .catch(() => null)

  return product ?? fallbackProductDetails[slug] ?? null
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params

  // Hand-tuned GEO / AI-search metadata for the core product pages.
  const geo = productGeo[slug]
  if (geo) return geo.metadata

  const product = await getProduct(slug)

  if (!product) return {}

  const title = `${product.title} for Event Teams`
  const description = product.heroSubtitle || product.tagline
  const url = `${BASE_URL}/products/${slug}`

  return {
    title,
    description,
    keywords: productKeywords[slug],
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: 'website',
      siteName: 'Hoperfy',
    },
  }
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params
  const product = await getProduct(slug)

  if (!product) notFound()

  const testimonials = await client
    .fetch<Testimonial[]>(testimonialsQuery)
    .catch(() => null)

  const pricing = await client
    .fetch<Pricing | null>(pricingByProductQuery, { slug })
    .catch(() => null)

  const fullFeatures =
    product.fullFeatures && product.fullFeatures.length > 0
      ? product.fullFeatures
      : fallbackProductDetails[slug]?.fullFeatures ?? []

  const geo = productGeo[slug]

  const jsonLd = geo
    ? buildProductJsonLd(geo)
    : {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: product.title,
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        description: product.heroSubtitle || product.description,
        url: `${BASE_URL}/products/${slug}`,
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
          description: 'Contact for pricing',
        },
        publisher: { '@id': 'https://hoperfy.com/#organization' },
      }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <NavWrapper>
        <main>
          <ProductHero product={product} />
          <ProductProblems product={product} />
          <ProductFeatures product={product} />
          <ProductHowItWorks product={product} />
          <ProductFullFeatures features={fullFeatures} />
          <ProductStats product={product} />
          <ProductPricing pricing={pricing} productSlug={slug} />
          {geo && (
            <ProductCompare
              competitors={geo.compare.competitors}
              features={geo.compare.features}
            />
          )}
          {testimonials && testimonials.length > 0 && (
            <TestimonialsSection testimonials={testimonials} />
          )}
          <ProductCTA product={product} />
          {geo && <ProductFAQ faqs={geo.faqs} />}
        </main>
      </NavWrapper>
    </>
  )
}
