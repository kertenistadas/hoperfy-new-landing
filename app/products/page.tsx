import Link from 'next/link'
import type { Metadata } from 'next'
import { client } from '@/sanity/lib/client'
import { productsQuery } from '@/sanity/lib/queries'
import { fallbackProductDetails } from '@/sanity/lib/fallbackProducts'
import type { Product } from '@/types'
import NavWrapper from '@/components/NavWrapper'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Products — White-Label Hotel Booking & Event Ticketing',
  description:
    'Two products built for event teams: white-label hotel booking with room block management, and multi-platform ticket sales with instant payouts.',
  alternates: { canonical: 'https://hoperfy.com/products' },
}

const fallbackProducts: Product[] = Object.values(fallbackProductDetails).map((p) => ({
  _id: p._id,
  title: p.title,
  slug: p.slug,
  tagline: p.tagline,
  description: p.description,
  features: p.features,
  stat: p.stat,
}))

export default async function ProductsPage() {
  const products = await client
    .fetch<Product[]>(productsQuery)
    .then((r) => (Array.isArray(r) && r.length > 0 ? r : null))
    .catch(() => null)

  const list = products ?? fallbackProducts

  return (
    <NavWrapper>
      <main>
        <section className="pt-32 pb-16 px-6">
          <div className="max-w-5xl mx-auto">
            <p className="eyebrow mb-3">What we build</p>
            <h1 className="text-[2.5rem] md:text-[3.25rem] font-black leading-[1.05] tracking-tight text-[#0a0a0a]">
              Two products. One platform.
            </h1>
          </div>
        </section>

        <section className="pb-24 px-6">
          <div className="max-w-5xl mx-auto grid gap-6">
            {list.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </section>
      </main>
    </NavWrapper>
  )
}

function ProductCard({ product }: { product: Product }) {
  const href = product.slug ? `/products/${product.slug}` : '/products'

  return (
    <Link
      href={href}
      className="group grid md:grid-cols-[1fr_2fr] gap-8 md:gap-12 items-start rounded-2xl border border-[#e5e7eb] p-8 md:p-10 transition-colors hover:border-[#1a6cf5]"
    >
      <div>
        <p className="text-[3.5rem] md:text-[4rem] font-black leading-none text-[#1a6cf5] tracking-tight">
          {product.stat?.value}
        </p>
        <p className="text-[13px] font-light text-[#6b7280] mt-1">{product.stat?.label}</p>
      </div>

      <div>
        <p className="eyebrow mb-3">{product.tagline}</p>
        <h2 className="text-[1.375rem] font-black tracking-tight text-[#0a0a0a] mb-4 transition-colors group-hover:text-[#1a6cf5]">
          {product.title}
        </h2>
        <p className="text-[15px] font-light text-[#6b7280] leading-relaxed mb-6">
          {product.description}
        </p>

        {product.features && product.features.length > 0 && (
          <ul className="flex flex-wrap gap-2 mb-6">
            {product.features.map((feature, i) => (
              <li
                key={i}
                className="text-[12px] text-[#374151] bg-[#f9fafb] border border-[#e5e7eb] rounded-full px-3 py-1"
              >
                {feature}
              </li>
            ))}
          </ul>
        )}

        <span className="text-[14px] font-medium text-[#1a6cf5]">Learn more →</span>
      </div>
    </Link>
  )
}
