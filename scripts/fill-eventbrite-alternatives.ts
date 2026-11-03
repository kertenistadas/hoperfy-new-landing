// Usage: npx sanity exec scripts/fill-eventbrite-alternatives.ts --with-user-token
//
// Fills the comparison table and the key takeaways CTA on the
// "eventbrite-alternatives" comparison. Patches the published document and
// its draft, whichever exist. No other field is touched, so this is safe to
// re-run (rows get fresh _keys each time).

import crypto from 'node:crypto'
import { getCliClient } from 'sanity/cli'

// raw perspective, so the query returns drafts as well as published documents.
const client = getCliClient({ apiVersion: '2024-01-01' }).withConfig({ perspective: 'raw', useCdn: false })

const SLUG = 'eventbrite-alternatives'

// Matches sanity/schemas/comparison.ts: comparisonTable { columns: string[], rows: comparisonRow { cells: string[] }[] }.
// Rows are row-major: each row's cells follow the column order.
const COLUMNS = ['Platform', 'Best for', 'Pricing as published', 'Stands out for']

const ROWS = [
  ['Hoperfy', 'Conferences with travelling attendees', '2.5% per paid ticket, or 2% with hotel booking. Payment processing extra', 'Hotel booking that pays the organiser'],
  ['Tito', 'Events with expensive tickets', '3% per ticket, capped at €25. Payment processing extra', 'A per-ticket fee cap'],
  ['Ticket Tailor', 'Small and mid-size events', 'Fixed fee per ticket, from $0.30 with prepaid credits (US)', 'Low fixed fees'],
  ['EventCreate', 'One small event', 'Free for 1 event and up to 50 attendees. Paid plans from $6 a month', 'Advertises zero-fee ticketing'],
  ['Luma', 'Community and meetup events', 'Free plan: 5% per paid ticket plus Stripe processing', 'Event pages with waitlists and QR check-in'],
  ['RSVPify', 'Registration and RSVP management', '1.95% plus $0.90 per ticket', 'Free set-up, including premium features'],
]

const CTA_LABEL = 'See how Hoperfy compares with Eventbrite'
const CTA_HREF = '/compare/hoperfy-vs-eventbrite'

type TableDoc = {
  _id: string
  comparisonTable?: { columns?: string[]; rows?: { cells?: string[] }[] }
  takeawaysCtaLabel?: string
  takeawaysCtaHref?: string
}

async function main() {
  const docs = await client.fetch<{ _id: string }[]>(
    '*[_type == "comparison" && slug.current == $slug]{_id}',
    { slug: SLUG },
  )
  if (!docs.length) {
    console.error(`No comparison document found with slug "${SLUG}". Nothing patched.`)
    process.exit(1)
  }

  for (const row of ROWS) {
    if (row.length !== COLUMNS.length) throw new Error(`Row "${row[0]}" has ${row.length} cells, expected ${COLUMNS.length}`)
  }

  const comparisonTable = {
    columns: COLUMNS,
    rows: ROWS.map((cells) => ({
      _key: crypto.randomBytes(6).toString('hex'),
      _type: 'comparisonRow',
      cells,
    })),
  }

  const tx = client.transaction()
  for (const { _id } of docs) {
    tx.patch(_id, (p) =>
      p.set({ comparisonTable, takeawaysCtaLabel: CTA_LABEL, takeawaysCtaHref: CTA_HREF }),
    )
  }
  await tx.commit()
  console.log(`Patched ${docs.length} document(s):`)
  docs.forEach(({ _id }) => console.log(`  ${_id}`))

  // Read back what was written, from the first patched document.
  const written = await client.getDocument<TableDoc>(docs[0]._id)
  const table = written?.comparisonTable
  console.log(`\nFinal table (${docs[0]._id}):\n`)
  console.log((table?.columns ?? []).join(' | '))
  for (const row of table?.rows ?? []) console.log((row.cells ?? []).join(' | '))
  console.log(`\nCTA: "${written?.takeawaysCtaLabel}" -> ${written?.takeawaysCtaHref}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
