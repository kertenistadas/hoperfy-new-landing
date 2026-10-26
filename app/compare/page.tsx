import type { Metadata } from 'next'
import Link from 'next/link'
import { client } from '@/sanity/lib/client'
import { comparisonsQuery } from '@/sanity/lib/queries'
import type { ComparisonCard } from '@/types'
import NavWrapper from '@/components/NavWrapper'
import PostDate from '@/components/blog/PostDate'

export const dynamic = 'force-dynamic'

const BASE_URL = 'https://hoperfy.com'
const DESCRIPTION = 'How Hoperfy compares with other event hotel booking and ticketing tools, feature by feature.'

export const metadata: Metadata = {
  title: { absolute: 'Compare | Hoperfy' },
  description: DESCRIPTION,
  alternates: { canonical: `${BASE_URL}/compare` },
  openGraph: {
    title: 'Compare | Hoperfy',
    description: DESCRIPTION,
    url: `${BASE_URL}/compare`,
    type: 'website',
  },
}

const groups: { type: string | null; title: string }[] = [
  { type: 'head-to-head', title: 'Head to head' },
  { type: 'alternatives', title: 'Alternatives' },
  { type: 'category', title: 'Category comparisons' },
  { type: null, title: 'More comparisons' },
]

const knownTypes = groups.map((group) => group.type).filter(Boolean)

export default async function CompareIndexPage() {
  const comparisons = await client.fetch<ComparisonCard[]>(comparisonsQuery).catch(() => [])

  const grouped = groups
    .map((group) => ({
      ...group,
      items: (comparisons ?? []).filter((c) =>
        group.type ? c.comparisonType === group.type : !knownTypes.includes(c.comparisonType),
      ),
    }))
    .filter((group) => group.items.length > 0)

  return (
    <NavWrapper>
      <main className="pt-32 pb-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12">
            <p className="eyebrow mb-3">Compare</p>
            <h1 className="text-[2rem] md:text-[3rem] font-black tracking-tight text-[#0a0a0a] mb-4">
              How Hoperfy compares
            </h1>
            <p className="text-[16px] font-light text-[#6b7280] max-w-2xl">{DESCRIPTION}</p>
          </div>

          {grouped.length === 0 ? (
            <div className="border border-[#e5e7eb] rounded-xl p-8 text-center">
              <p className="text-[16px] font-semibold text-[#0a0a0a] mb-2">No comparisons published yet</p>
              <p className="text-[14px] font-light text-[#6b7280] mb-4">
                In the meantime, see what each Hoperfy product does.
              </p>
              <Link href="/products" className="text-[14px] font-medium text-[#1a6cf5] hover:text-[#1558cc] transition-colors">
                Browse products →
              </Link>
            </div>
          ) : (
            grouped.map((group) => (
              <section key={group.title} className="mb-16">
                <h2 className="text-[1.375rem] font-black tracking-tight text-[#0a0a0a] mb-6">{group.title}</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {group.items.map((comparison) => (
                    <Link
                      key={comparison._id}
                      href={`/compare/${comparison.slug}`}
                      className="group flex flex-col border border-[#e5e7eb] rounded-xl p-6 hover:border-[#1a6cf5] hover:shadow-lg transition-all"
                    >
                      <h3 className="text-[18px] font-semibold text-[#0a0a0a] group-hover:text-[#1a6cf5] transition-colors">
                        {comparison.title}
                      </h3>
                      {comparison.intro && (
                        <p className="mt-2 text-[14px] font-light text-[#6b7280] leading-relaxed line-clamp-3">
                          {comparison.intro}
                        </p>
                      )}
                      {comparison.lastVerified && (
                        <p className="mt-4 text-[12px] text-[#9ca3af]">
                          Last verified <PostDate iso={comparison.lastVerified} />
                        </p>
                      )}
                      <span className="mt-4 text-[13px] font-medium text-[#1a6cf5]">Read comparison →</span>
                    </Link>
                  ))}
                </div>
              </section>
            ))
          )}
        </div>
      </main>
    </NavWrapper>
  )
}
