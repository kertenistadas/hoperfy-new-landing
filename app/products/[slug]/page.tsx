import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { client } from '@/sanity/lib/client'
import {
  productBySlugQuery,
  allProductSlugsQuery,
  testimonialsQuery,
} from '@/sanity/lib/queries'
import { fallbackProductDetails } from '@/sanity/lib/fallbackProducts'
import type { ProductDetail, Testimonial } from '@/types'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import TestimonialsSection from '@/components/TestimonialsSection'
import ProductHero from '@/components/product/ProductHero'
import ProductProblems from '@/components/product/ProductProblems'
import ProductFeatures from '@/components/product/ProductFeatures'
import ProductHowItWorks from '@/components/product/ProductHowItWorks'
import ProductStats from '@/components/product/ProductStats'
import ProductCTA from '@/components/product/ProductCTA'

export const revalidate = 60

type Props = {
  params: Promise<{ slug: string }>
}

async function getProduct(slug: string): Promise<ProductDetail | null> {
  const product = await client
    .fetch<ProductDetail | null>(productBySlugQuery, { slug })
    .catch(() => null)

  return product ?? fallbackProductDetails[slug] ?? null
}

export async function generateStaticParams() {
  const slugs = await client
    .fetch<{ slug: string }[]>(allProductSlugsQuery)
    .catch(() => null)

  if (slugs && slugs.length > 0) {
    return slugs.map((s) => ({ slug: s.slug }))
  }

  return Object.keys(fallbackProductDetails).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const product = await getProduct(slug)

  if (!product) return {}

  return {
    title: product.title,
    description: product.heroSubtitle || product.description,
  }
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params
  const product = await getProduct(slug)

  if (!product) notFound()

  const testimonials = await client
    .fetch<Testimonial[]>(testimonialsQuery)
    .catch(() => null)

  return (
    <>
      <Nav />
      <main>
        <ProductHero product={product} />
        <ProductProblems product={product} />
        <ProductFeatures product={product} />
        <ProductHowItWorks product={product} />
        <ProductStats product={product} />
        {testimonials && testimonials.length > 0 && (
          <TestimonialsSection testimonials={testimonials} />
        )}
        <ProductCTA product={product} />
      </main>
      <Footer />
    </>
  )
}
