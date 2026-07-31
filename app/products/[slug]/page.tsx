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
import ProductRevenueCalculator from '@/components/product/ProductRevenueCalculator'
import LiveBookingMap from '@/components/product/LiveBookingMap'
import HotelEventForm from '@/components/product/HotelEventForm'
import { TicketingFeeProvider } from '@/components/product/ticketing/TicketingFeeContext'
import TicketingHero from '@/components/product/ticketing/TicketingHero'
import TicketingFeeSummary from '@/components/product/ticketing/TicketingFeeSummary'
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
  return client
    .fetch<ProductDetail | null>(productBySlugQuery, { slug })
    .catch(() => null)
}

// Field-level merge: any missing/empty field on the Sanity document falls back
// to the hardcoded fallback, so partially-filled documents never leave a
// section blank.
function mergeWithFallback(
  sanityData: ProductDetail | null,
  fallback: ProductDetail,
): ProductDetail {
  if (!sanityData) return fallback
  return {
    ...sanityData,
    heroHeadline: sanityData.heroHeadline?.trim() || fallback.heroHeadline || '',
    heroSubtitle: sanityData.heroSubtitle?.trim() || fallback.heroSubtitle || '',
    heroCta: sanityData.heroCta?.trim() || fallback.heroCta || 'Get early access',
    tagline: sanityData.tagline?.trim() || fallback.tagline || '',
    description: sanityData.description?.trim() || fallback.description || '',
    problemHeadline: sanityData.problemHeadline?.trim() || fallback.problemHeadline || '',
    problems: sanityData.problems?.length ? sanityData.problems : fallback.problems ?? [],
    featuresHeadline: sanityData.featuresHeadline?.trim() || fallback.featuresHeadline || '',
    featuresList: sanityData.featuresList?.length ? sanityData.featuresList : fallback.featuresList ?? [],
    features: sanityData.features?.length ? sanityData.features : fallback.features ?? [],
    fullFeatures: sanityData.fullFeatures?.length ? sanityData.fullFeatures : fallback.fullFeatures ?? [],
    howItWorksHeadline: sanityData.howItWorksHeadline?.trim() || fallback.howItWorksHeadline || '',
    steps: sanityData.steps?.length ? sanityData.steps : fallback.steps ?? [],
    stats: sanityData.stats?.length ? sanityData.stats : fallback.stats ?? [],
    stat: sanityData.stat?.value ? sanityData.stat : fallback.stat,
  } as ProductDetail
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
  const sanityProduct = await getProduct(slug)

  const fallback = fallbackProductDetails[slug]
  const data = fallback ? mergeWithFallback(sanityProduct, fallback) : sanityProduct ?? null

  if (!data) notFound()

  const testimonials = await client
    .fetch<Testimonial[]>(testimonialsQuery)
    .catch(() => null)

  const pricing = await client
    .fetch<Pricing | null>(pricingByProductQuery, { slug })
    .catch(() => null)

  const fullFeatures = data.fullFeatures ?? []

  const geo = productGeo[slug]

  const jsonLd = geo
    ? buildProductJsonLd(geo)
    : {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: data.title,
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        description: data.heroSubtitle || data.description,
        url: `${BASE_URL}/products/${slug}`,
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
          description: 'Contact for pricing',
        },
        publisher: { '@id': 'https://hoperfy.com/#organization' },
      }

  // Shared section slots (rendered in a different order/wrapper per product).
  const problemsSection = data.problems?.length ? <ProductProblems product={data} /> : null
  const featuresSection = data.featuresList?.length ? <ProductFeatures product={data} /> : null
  const stepsSection = data.steps?.length ? <ProductHowItWorks product={data} /> : null
  const fullFeaturesSection =
    fullFeatures.length > 0 ? <ProductFullFeatures features={fullFeatures} /> : null
  const statsSection = data.stats?.length ? <ProductStats product={data} /> : null
  const pricingSection = <ProductPricing pricing={pricing} productSlug={data.slug} />
  const compareSection = geo ? (
    <ProductCompare competitors={geo.compare.competitors} features={geo.compare.features} />
  ) : null
  const testimonialsSection =
    testimonials && testimonials.length > 0 ? (
      <TestimonialsSection testimonials={testimonials} />
    ) : null
  const ctaSection = <ProductCTA product={data} />
  const faqSection = geo?.faqs?.length ? (
    <ProductFAQ faqs={geo.faqs} title="Common questions" />
  ) : null

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <NavWrapper>
        <main>
          {data.slug === 'hotels-for-events' ? (
            <>
              <section className="pt-32 pb-0 px-6 bg-white">
                <div className="max-w-5xl mx-auto">
                  {/* Top row — headline left, map right */}
                  <div className="grid md:grid-cols-2 gap-8 mb-8 items-start">
                    <div>
                      <p className="eyebrow mb-4">{data.tagline}</p>
                      <h1 className="text-[2.5rem] md:text-[3rem] font-black leading-[1.05] tracking-tight text-[#0a0a0a]">
                        {data.heroHeadline ?? data.title}
                      </h1>
                    </div>
                    <div>
                      <LiveBookingMap />
                      <p className="text-[11px] text-[#9ca3af] text-center mt-2">Real bookings processed by Hoperfy</p>
                    </div>
                  </div>

                  {/* Bottom block — full width, two columns */}
                  <div className="border-t border-[#e5e7eb] pt-8 pb-16">
                    <div className="grid md:grid-cols-2 gap-10 items-center">
                      {/* Left — subtitle + trust signals */}
                      <div>
                        <p className="text-[16px] font-light text-[#6b7280] leading-relaxed mb-6">
                          {data.heroSubtitle ?? data.description}
                        </p>
                        <div className="flex flex-col gap-2">
                          {[
                            'Free to set up — no credit card required',
                            '2,000,000+ hotels worldwide',
                            'Live in 5 minutes',
                            'We handle all delegate support',
                          ].map((item, i) => (
                            <span key={i} className="flex items-center gap-2 text-[13px] text-[#6b7280]">
                              <span className="text-[#1a6cf5] font-bold">✓</span> {item}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Right — event form */}
                      <div>
                        <HotelEventForm />
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <ProductRevenueCalculator />
              {problemsSection}
              {featuresSection}
              {stepsSection}
              {fullFeaturesSection}
              {statsSection}
              {pricingSection}
              {testimonialsSection}
              {ctaSection}
              {faqSection}
            </>
          ) : data.slug === 'ticketing-for-events' ? (
            <TicketingFeeProvider>
              <TicketingHero product={data} />
              <TicketingFeeSummary />
              {featuresSection}
              {stepsSection}
              {fullFeaturesSection}
              {statsSection}
              {pricingSection}
              {compareSection}
              {testimonialsSection}
              {ctaSection}
              {faqSection}
            </TicketingFeeProvider>
          ) : (
            <>
              <ProductHero product={data} />
              {problemsSection}
              {featuresSection}
              {stepsSection}
              {fullFeaturesSection}
              {statsSection}
              {pricingSection}
              {compareSection}
              {testimonialsSection}
              {ctaSection}
              {faqSection}
            </>
          )}
        </main>
      </NavWrapper>
    </>
  )
}
