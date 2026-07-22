import { client } from '@/sanity/lib/client'
import {
  heroQuery,
  productsQuery,
  testimonialsQuery,
  socialProofQuery,
} from '@/sanity/lib/queries'
import type { Hero, Product, Testimonial, SocialProof } from '@/types'
import Nav from '@/components/Nav'
import HeroSection from '@/components/HeroSection'
import SocialProofBar from '@/components/SocialProofBar'
import ProductsSection from '@/components/ProductsSection'
import TestimonialsSection from '@/components/TestimonialsSection'
import Footer from '@/components/Footer'

export const dynamic = 'force-dynamic'

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
  const [hero, products, testimonials, socialProof] = await Promise.all([
    client.fetch<Hero>(heroQuery).catch(() => null),
    client.fetch<Product[]>(productsQuery).then(r => Array.isArray(r) && r.length > 0 ? r : null).catch(() => null),
    client.fetch<Testimonial[]>(testimonialsQuery).catch(() => null),
    client.fetch<SocialProof>(socialProofQuery).catch(() => null),
  ])

  return (
    <>
      <Nav />
      <main>
        <HeroSection data={hero ?? fallbackHero} />
        {socialProof && <SocialProofBar data={socialProof} />}
        <ProductsSection products={products ?? fallbackProducts} />
        {testimonials && testimonials.length > 0 && (
          <TestimonialsSection testimonials={testimonials} />
        )}
      </main>
      <Footer />
    </>
  )
}