import type { Metadata } from 'next'
import { PortableText, type PortableTextComponents } from '@portabletext/react'
import { client } from '@/sanity/lib/client'
import {
  heroQuery,
  productsQuery,
  testimonialsQuery,
  socialProofQuery,
  landingPagesQuery,
} from '@/sanity/lib/queries'
import type { Hero, Product, Testimonial, SocialProof, Page } from '@/types'
import NavWrapper from '@/components/NavWrapper'
import HeroSection from '@/components/HeroSection'
import SocialProofBar from '@/components/SocialProofBar'
import ProductsSection from '@/components/ProductsSection'
import TestimonialsSection from '@/components/TestimonialsSection'
import FAQSection from '@/components/FAQSection'

const portableTextComponents: PortableTextComponents = {
  marks: {
    link: ({ value, children }) => {
      const href = value?.href ?? '#'
      const blank = value?.blank
      return (
        <a
          href={href}
          {...(blank ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
          {children}
        </a>
      )
    },
  },
}

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Hotel Booking & Ticketing Platform for Event Teams',
  description: 'Hoperfy gives event teams white-label hotel booking and multi-channel ticket sales in one platform. Replace Cvent Passkey, Eventbrite, and room block spreadsheets.',
  alternates: { canonical: 'https://hoperfy.com' },
}

const fallbackHero: Hero = {
  headline: 'Sell tickets and rooms from one platform.',
  subtitle:
    'Hoperfy gives event teams a white-label hotel booking engine and multi-platform ticket sales — without the integration headaches.',
  ctaText: 'Get early access',
  ctaPlaceholder: 'Your work email',
}

const fallbackProducts: Product[] = [
  {
    _id: 'hotels',
    title: 'Hotels for Events',
    tagline: 'White-label hotel booking',
    description:
      'Your brand, your rates, your guests. Give attendees a seamless hotel booking experience built directly into your event — no third-party redirects, no commission leakage.',
    features: [
      'Fully white-labelled booking flow',
      'Direct negotiated rate management',
      'Real-time inventory sync',
      'Group block allocation and tracking',
      'Automated rooming list exports',
    ],
    stat: { value: '40%', label: 'more hotel revenue per event' },
  },
  {
    _id: 'ticketing',
    title: 'Ticketing for Events',
    tagline: 'Multi-platform ticket sales',
    description:
      'Sell across every channel without losing track of who bought what. One dashboard, unified reporting, and payouts that actually make sense.',
    features: [
      'Sell across web, app, and partner channels',
      'Dynamic pricing and capacity controls',
      'Unified attendee data across platforms',
      'Instant payouts with no hidden fees',
      'QR check-in and access management',
    ],
    stat: { value: '3x', label: 'faster setup vs. legacy platforms' },
  },
]

export default async function HomePage() {
  const [hero, products, testimonials, socialProof, landingPages] = await Promise.all([
    client.fetch<Hero>(heroQuery).catch(() => null),
    client.fetch<Product[]>(productsQuery).then(r => Array.isArray(r) && r.length > 0 ? r : null).catch(() => null),
    client.fetch<Testimonial[]>(testimonialsQuery).catch(() => null),
    client.fetch<SocialProof>(socialProofQuery).catch(() => null),
    client.fetch<Page[]>(landingPagesQuery).catch(() => null),
  ])

  return (
    <NavWrapper>
      <main>
        <HeroSection data={hero ?? fallbackHero} />
        {socialProof && <SocialProofBar data={socialProof} />}
        <ProductsSection products={products ?? fallbackProducts} />
        {testimonials && testimonials.length > 0 && (
          <TestimonialsSection testimonials={testimonials} />
        )}
        <FAQSection />
        {landingPages?.map((landingPage) => (
          <section
            key={landingPage._id}
            className="py-24 px-6 border-t border-[#e5e7eb]"
          >
            <div className="max-w-2xl mx-auto">
              <p className="eyebrow mb-3">More from Hoperfy</p>
              <h2 className="text-[1.75rem] md:text-[2.25rem] font-black tracking-tight text-[#0a0a0a] mb-8">
                {landingPage.title}
              </h2>
              {landingPage.body && (
                <div className="prose-legal">
                  <PortableText
                    value={landingPage.body}
                    components={portableTextComponents}
                  />
                </div>
              )}
            </div>
          </section>
        ))}
      </main>
    </NavWrapper>
  )
}