import CompetitorCheckNote from '@/components/CompetitorCheckNote'
import RelatedComparisons from '@/components/compare/RelatedComparisons'

type CompareRow = {
  label: string
  hoperfy: string
  competitor: string
}

// Competitor cells are checked against Eventbrite's own published pages
// (see CompetitorCheckNote).
const rows: CompareRow[] = [
  { label: 'Platform fee on paid tickets, excluding payment processing', hoperfy: '2.5% flat', competitor: 'US: 3.7% + $1.79 per ticket' },
  { label: 'Fee on free events', hoperfy: 'None', competitor: 'US: None' },
  { label: 'Payout timing', hoperfy: 'As tickets sell', competitor: 'Instant Payouts or after the event' },
  { label: 'White-label branding', hoperfy: 'Included', competitor: 'Branded checkout widget' },
  { label: 'Multi-channel from one inventory', hoperfy: 'Included', competitor: 'Website widget and Facebook' },
  { label: 'QR check-in', hoperfy: 'Included', competitor: 'Organizer app' },
]

export default function TicketingCompare() {
  return (
    <section className="py-24 px-6 border-t border-[#e5e7eb]">
      <div className="max-w-3xl mx-auto">
        <div className="mb-16">
          <p className="eyebrow mb-3">Why Hoperfy</p>
          <h2 className="text-[1.75rem] md:text-[2.25rem] font-black tracking-tight text-[#0a0a0a]">
            See how we compare
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#e5e7eb]">
                <th className="py-4 pr-4 text-[13px] font-medium text-[#6b7280] font-normal" />
                <th className="py-4 px-4 text-[14px] font-semibold text-[#0a0a0a]">Hoperfy</th>
                <th className="py-4 pl-4 text-[13px] font-medium text-[#6b7280]">Eventbrite</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i} className="border-b border-[#f3f4f6] last:border-0 align-top">
                  <td className="py-4 pr-4 text-[15px] text-[#374151]">{row.label}</td>
                  <td className="py-4 px-4 text-[14px] font-semibold text-[#0a0a0a]">{row.hoperfy}</td>
                  <td className="py-4 pl-4 text-[14px] text-[#6b7280]">{row.competitor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <CompetitorCheckNote />

        <RelatedComparisons product="ticketing-for-events" location="ticketing-product" className="mt-8" />
      </div>
    </section>
  )
}
