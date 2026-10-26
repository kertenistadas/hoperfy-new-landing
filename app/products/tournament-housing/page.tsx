import type { Metadata } from 'next'
import Link from 'next/link'
import NavWrapper from '@/components/NavWrapper'
import CTAButtons from '@/components/CTAButtons'
import CompetitorCheckNote from '@/components/CompetitorCheckNote'

export const dynamic = 'force-dynamic'

const BASE_URL = 'https://hoperfy.com'
const PAGE_URL = `${BASE_URL}/products/tournament-housing`
const CALENDLY_URL = 'https://calendly.com/tadas-hoperfy/30min'

const TITLE = 'Tournament Housing for Sports Event Organizers | Hoperfy'
const DESCRIPTION =
  "Free, fully managed tournament housing. We contract the hotels, build your branded booking page, and handle every team's questions. Live in 5 minutes."

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: { title: TITLE, description: DESCRIPTION, url: PAGE_URL, type: 'website' },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION },
}

const problems = [
  {
    title: 'A spreadsheet per tournament',
    body: 'Room counts, arrival nights and team contacts live in one file that goes stale the moment a squad changes its travel plans. Nobody is sure which version is current.',
  },
  {
    title: 'A different hotel contact for every team',
    body: 'Each club calls a different reservations desk, negotiates its own rate and books outside your block. By the time you reconcile it, the picture no longer matches what the hotels hold.',
  },
  {
    title: 'Blocks committed before the bracket exists',
    body: 'Rooms are held months before anyone knows which teams advance. Allocations set against an early estimate drift away from the field that actually travels, and the gap only becomes visible once the release deadline has passed.',
  },
  {
    title: 'Every question lands with your staff',
    body: 'Late arrivals, roommate swaps, an extra night for the final. Each one reaches the organizing committee instead of the hotel that can actually change the reservation.',
  },
]

const features = [
  {
    title: 'Blocks across multiple properties',
    body: 'Split a field of competing teams across as many hotels as the city needs, with each squad placed in its own block rather than a single forced property.',
  },
  {
    title: 'Real-time room block tracking',
    body: 'Live availability across every contracted hotel, updated automatically, so pickup is visible while the tournament is still filling rather than after it.',
  },
  {
    title: 'Automated rooming list exports',
    body: 'One current list of who sleeps where and on which nights, exported on demand instead of rebuilt by hand before every deadline.',
  },
  {
    title: 'Group bookings handled end to end',
    body: 'Squads book against their allocation through your page. Hoperfy contracts the hotels and answers the teams directly, so the committee is never in the middle.',
  },
  {
    title: 'Access to 2,000,000+ properties',
    body: 'Host cities are rarely convenient. Inventory reaches well past the handful of properties a venue normally partners with, including smaller destinations.',
  },
  {
    title: 'Your branding on the booking page',
    body: 'Teams book on a page that carries the tournament identity, on your domain, rather than being redirected to a third party mid-registration.',
  },
]

// Competitor cells are checked against each competitor's own published pages
// (see CompetitorCheckNote). Unverifiable cells say "Not publicly listed".
const comparison = {
  columns: ['Hoperfy', 'Playbook365 Staybook', 'EventPipe', 'Manual management'],
  rows: [
    { label: 'Cost to the organizer', values: ['Free to set up', 'Paid platform', 'Paid platform', 'Staff time'] },
    { label: 'Setup time', values: ['5 minutes', 'A few days, with onboarding', 'Self-service build', 'Weeks of outreach'] },
    { label: 'Who answers the teams', values: ['Hoperfy', 'Not publicly listed', 'Not publicly listed', 'Your staff'] },
    { label: 'White-label booking page', values: ['Yes', 'Yes', 'Yes', 'No'] },
    { label: 'Inventory size', values: ['2,000,000+ properties', '600,000+ properties', 'Contracted blocks and live inventory', 'Whatever you negotiate'] },
  ],
}

const faqs = [
  {
    question: 'What is the best software for managing hotel room blocks for large sporting events?',
    answer:
      'That depends on whether you want a tool or a service. Self-service platforms give your staff software and leave the hotel outreach, the block maintenance and the team questions with you. Hoperfy is the managed option: we contract the hotels, build the booking page, track the blocks in real time and answer the teams ourselves. For a committee without a dedicated housing coordinator, the managed route removes the work rather than organising it.',
  },
  {
    question: 'What platforms let tournament organizers build a custom hotel booking site for their event?',
    answer:
      'Several do, including Playbook365 Staybook and EventPipe, and so does Hoperfy. The difference is who builds it. On most platforms your team configures the page and loads the inventory. With Hoperfy the page is built for you, in your branding and on your domain, and it is live in about five minutes from the first call.',
  },
  {
    question: 'Is there software that automates sending hotel RFPs for large sporting events?',
    answer:
      'Hoperfy does not hand you an RFP tool, because the RFP stops being your job. We approach the hotels in the host city and contract them on your behalf across a network of more than 2,000,000 properties. You tell us the dates, the city and roughly how many rooms each team needs.',
  },
  {
    question: 'Which vendors provide hotel room management software for group events?',
    answer:
      'The established names include Cvent Passkey, EventPipe, HotelMap and, in the sports niche, Playbook365 Staybook. With Hoperfy, room block tracking and rooming list exports are included, and the hotel contracting and the team support are done by us.',
  },
  {
    question: 'What does stay to play mean for a tournament?',
    answer:
      'Stay to play is the arrangement where competing teams must book accommodation through the tournament in order to enter. Organizers use it to keep room pickup predictable against blocks that were committed early. It only works if booking is genuinely easy for the teams, which is why the booking page and the support behind it matter more than the policy itself.',
  },
  {
    question: 'How do room blocks work when every team travels separately?',
    answer:
      'Each squad gets its own allocation, and those allocations can sit in different hotels. Teams book against their own block through the tournament page, pickup updates in real time as they do, and you see one rooming list covering every property rather than a file per hotel.',
  },
  {
    question: 'What happens to rooms held for teams that do not qualify?',
    answer:
      'Attrition is the penalty a hotel charges when a contracted room block goes unfilled. Hoperfy negotiates the blocks with each hotel directly and adjusts them as bookings come in, so your block is sized to real demand rather than to an estimate made months before the event. If you already have a signed contract with attrition terms, send it over and we will tell you where you stand before you commit to anything further.',
  },
  {
    question: 'What does tournament housing cost?',
    answer:
      'Nothing to set up. There is no platform fee charged to the organizer and no credit card required to start. Hoperfy earns through its hotel network rather than by billing the tournament.',
  },
]

function buildJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'Tournament Housing by Hoperfy',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        description:
          'Fully managed tournament housing for sports event organizers. Hoperfy contracts the hotels, builds a branded booking page for competing teams, tracks room blocks in real time and handles every team enquiry.',
        url: PAGE_URL,
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR', description: 'Contact for pricing' },
        audience: { '@type': 'Audience', audienceType: 'Sports event and tournament organizers' },
        publisher: { '@type': 'Organization', name: 'Hoperfy', url: BASE_URL },
        featureList: features.map((f) => f.title),
      },
      {
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: { '@type': 'Answer', text: faq.answer },
        })),
      },
      {
        '@type': 'Organization',
        '@id': `${BASE_URL}/#organization`,
        name: 'Hoperfy',
        url: BASE_URL,
        logo: `${BASE_URL}/logo.png`,
        contactPoint: { '@type': 'ContactPoint', email: 'hello@hoperfy.com', contactType: 'customer support' },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
          { '@type': 'ListItem', position: 2, name: 'Products', item: `${BASE_URL}/products` },
          { '@type': 'ListItem', position: 3, name: 'Tournament Housing', item: PAGE_URL },
        ],
      },
    ],
  }
}

export default function TournamentHousingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        async
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd()) }}
      />
      <NavWrapper>
        <main>
          {/* Hero */}
          <section className="pt-32 pb-16 px-6">
            <div className="max-w-5xl mx-auto">
              <p className="eyebrow mb-4">Tournament housing for sports event organizers</p>
              <h1 className="text-[2.5rem] md:text-[3rem] font-black leading-[1.05] tracking-tight text-[#0a0a0a] mb-6 max-w-3xl">
                Tournament housing for sports event organizers
              </h1>
              <p className="text-[16px] font-light text-[#6b7280] leading-relaxed max-w-2xl mb-6">
                Tournament housing is the work of putting every competing team into a bed near the
                venue: contracting the hotels, splitting rooms into blocks per squad, tracking what
                each one actually picks up, and answering the teams while they travel. Most tools in
                this category hand that work back to you as a dashboard. Hoperfy does the work
                instead. We approach the hotels and contract them on your behalf, publish a booking
                page in your branding and deal with the teams directly, so the organizing committee
                never becomes the reservations desk.
              </p>
              <CTAButtons source="tournament-housing-hero" />
              <p className="mt-4 text-[12px] text-[#9ca3af]">Free to set up. Live in 5 minutes.</p>
            </div>
          </section>

          {/* Problem */}
          <section className="py-24 px-6 border-t border-[#e5e7eb] bg-[#f9fafb]">
            <div className="max-w-5xl mx-auto">
              <div className="mb-16">
                <p className="eyebrow mb-3">The current process</p>
                <h2 className="text-[1.75rem] md:text-[2.25rem] font-black tracking-tight text-[#0a0a0a]">
                  How most tournaments handle rooms today
                </h2>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {problems.map((p) => (
                  <div key={p.title} className="bg-white border border-[#e5e7eb] rounded-2xl p-8">
                    <h3 className="text-[16px] font-black tracking-tight text-[#0a0a0a] mb-2">{p.title}</h3>
                    <p className="text-[14px] font-light text-[#6b7280] leading-relaxed">{p.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Features */}
          <section className="py-24 px-6 border-t border-[#e5e7eb]">
            <div className="max-w-5xl mx-auto">
              <div className="mb-16">
                <p className="eyebrow mb-3">What is included</p>
                <h2 className="text-[1.75rem] md:text-[2.25rem] font-black tracking-tight text-[#0a0a0a]">
                  Built for a field of travelling teams
                </h2>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {features.map((f) => (
                  <div
                    key={f.title}
                    className="border border-[#e5e7eb] rounded-2xl p-8 hover:border-[#1a6cf5] hover:shadow-lg hover:shadow-blue-500/5 transition-all"
                  >
                    <h3 className="text-[16px] font-black tracking-tight text-[#0a0a0a] mb-2">{f.title}</h3>
                    <p className="text-[14px] font-light text-[#6b7280] leading-relaxed">{f.body}</p>
                  </div>
                ))}
              </div>
              <p className="text-[14px] font-light text-[#6b7280] leading-relaxed mt-8 max-w-2xl">
                Running a conference, festival or trade show rather than a tournament? The same
                service is described on{' '}
                <Link href="/products/hotels-for-events" className="text-[#1a6cf5] hover:underline">
                  event housing and hotel booking for event organizers
                </Link>
                .
              </p>
            </div>
          </section>

          {/* Comparison */}
          <section className="py-24 px-6 border-t border-[#e5e7eb]">
            <div className="max-w-5xl mx-auto">
              <div className="mb-16">
                <p className="eyebrow mb-3">Why Hoperfy</p>
                <h2 className="text-[1.75rem] md:text-[2.25rem] font-black tracking-tight text-[#0a0a0a]">
                  See how we compare
                </h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[640px]">
                  <thead>
                    <tr className="border-b border-[#e5e7eb]">
                      <th className="py-4 pr-4 text-[13px] font-normal text-[#6b7280]" />
                      {comparison.columns.map((col, i) => (
                        <th
                          key={col}
                          className={`py-4 px-4 text-center ${
                            i === 0
                              ? 'text-[14px] font-semibold text-[#0a0a0a]'
                              : 'text-[13px] font-medium text-[#6b7280]'
                          }`}
                        >
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {comparison.rows.map((row) => (
                      <tr key={row.label} className="border-b border-[#f3f4f6] last:border-0">
                        <td className="py-4 pr-4 text-[15px] text-[#374151]">{row.label}</td>
                        {row.values.map((value, i) => (
                          <td
                            key={`${row.label}-${i}`}
                            className={`py-4 px-4 text-center text-[14px] ${
                              i === 0 ? 'font-semibold text-[#0a0a0a]' : 'font-light text-[#6b7280]'
                            }`}
                          >
                            {value}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <CompetitorCheckNote />
            </div>
          </section>

          {/* FAQ */}
          <section className="py-24 px-6 border-t border-[#e5e7eb] bg-[#f9fafb]">
            <div className="max-w-3xl mx-auto">
              <div className="mb-16">
                <p className="eyebrow mb-3">FAQ</p>
                <h2 className="text-[1.75rem] md:text-[2.25rem] font-black tracking-tight text-[#0a0a0a]">
                  Tournament housing questions
                </h2>
              </div>
              <div className="divide-y divide-[#e5e7eb] border-t border-[#e5e7eb]">
                {faqs.map((faq) => (
                  <div key={faq.question} className="py-6">
                    <h3 className="text-[16px] md:text-[17px] font-semibold text-[#0a0a0a] mb-3">
                      {faq.question}
                    </h3>
                    <p className="text-[15px] font-light text-[#6b7280] leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="py-24 px-6 bg-[#eef4ff]">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-[1.75rem] md:text-[2.25rem] font-black tracking-tight text-[#0a0a0a] mb-8">
                Ready to hand over tournament housing?
              </h2>
              <CTAButtons source="tournament-housing-cta" />
              <p className="mt-6 text-[13px] text-[#6b7280]">
                Prefer to talk it through first?{' '}
                <a
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#1a6cf5] hover:underline"
                >
                  Book a 30 minute call
                </a>
                .
              </p>
            </div>
          </section>
        </main>
      </NavWrapper>
    </>
  )
}
