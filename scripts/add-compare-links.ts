// Usage: npx sanity exec scripts/add-compare-links.ts --with-user-token
//
// Internal links to /compare/eventbrite-alternatives, plus related content:
// a) linkLabel on the two Eventbrite comparisons;
// b) one new paragraph linking to the alternatives page in two blog posts;
// c) the same kind of paragraph in the hoperfy-vs-eventbrite comparison;
// d) the alternatives page title moves to 2027 (and any "2026" in its
//    seoTitle or metaDescription). Dates inside the body are not touched.
//
// Patches the published document and its draft, whichever exist. Never sets
// publishedAt, updatedAt or lastVerified. Prints old -> new for every change.
// Safe to run twice: posts that already link to the alternatives page are
// skipped, and fields already at their target value are left alone.

import { randomBytes } from 'node:crypto'
import { getCliClient } from 'sanity/cli'

// raw perspective, so the query returns drafts as well as published documents.
const client = getCliClient({ apiVersion: '2024-01-01' }).withConfig({ perspective: 'raw', useCdn: false })

const TARGET = '/compare/eventbrite-alternatives'
const TARGET_RE = /\/compare\/eventbrite-alternatives(?=$|[?#/])/

const LINK_LABELS: Record<string, string> = {
  'hoperfy-vs-eventbrite': 'Hoperfy vs Eventbrite: fees compared',
  'eventbrite-alternatives': 'Eventbrite alternatives: Ticket Tailor, Tito, Luma and more',
}

const ALTERNATIVES_TITLE = 'Eventbrite Alternatives for Event Organisers (2027)'

const BLOG_SLUGS = [
  'cheapest-event-management-platforms-pricing-free-plans-and-what-to-look-for',
  'affordable-event-ticketing-software-for-small-events',
]

type Span = { _type: 'span'; _key: string; text: string; marks: string[] }
type MarkDef = { _type: string; _key: string; href?: string }
type Block = {
  _type: string
  _key: string
  style?: string
  listItem?: string
  children?: Span[]
  markDefs?: MarkDef[]
}
type Doc = { _id: string; slug: string; title?: string; seoTitle?: string; metaDescription?: string; linkLabel?: string; body?: Block[] }

const key = () => randomBytes(6).toString('hex')
const kind = (id: string) => (id.startsWith('drafts.') ? 'draft' : 'published')
const text = (b: Block) => (b.children ?? []).map((c) => c.text ?? '').join('')
const isHeading = (b: Block) => b._type === 'block' && /^h[1-6]$/.test(b.style ?? '')
const isNormalParagraph = (b: Block) => b._type === 'block' && (b.style ?? 'normal') === 'normal' && !b.listItem
const linksToTarget = (body: Block[]) =>
  body.some((b) => (b.markDefs ?? []).some((m) => m._type === 'link' && m.href && TARGET_RE.test(m.href)))

/** A normal paragraph where `linkText` (which must occur once in `sentence`) links to TARGET. */
function paragraph(sentence: string, linkText: string): Block {
  const at = sentence.indexOf(linkText)
  if (at < 0) throw new Error(`"${linkText}" not found in "${sentence}"`)
  const markKey = key()
  const spans: Span[] = [
    { _type: 'span', _key: key(), text: sentence.slice(0, at), marks: [] },
    { _type: 'span', _key: key(), text: linkText, marks: [markKey] },
    { _type: 'span', _key: key(), text: sentence.slice(at + linkText.length), marks: [] },
  ].filter((s) => s.text) as Span[]
  return {
    _type: 'block',
    _key: key(),
    style: 'normal',
    markDefs: [{ _type: 'link', _key: markKey, href: TARGET }],
    children: spans,
  }
}

const short = (s: string) => (s.length > 110 ? `${s.slice(0, 110)}...` : s)

async function insertAfter(doc: Doc, after: Block, block: Block, note: string) {
  console.log(`  ${note}`)
  console.log(`  AFTER [${after._key}]: ${JSON.stringify(short(text(after)))}`)
  console.log(`  OLD: (no paragraph)`)
  console.log(`  NEW: ${JSON.stringify(text(block))} (linked: ${JSON.stringify(block.children!.find((c) => c.marks.length)!.text)} -> ${TARGET})`)
  await client.patch(doc._id).insert('after', `body[_key=="${after._key}"]`, [block]).commit()
  console.log(`  Patched ${doc._id}`)
}

async function main() {
  // a) + d) Comparison fields.
  const comparisons = await client.fetch<Doc[]>(
    '*[_type == "comparison" && slug.current in $slugs]{_id, "slug": slug.current, title, seoTitle, metaDescription, linkLabel, body}',
    { slugs: Object.keys(LINK_LABELS) },
  )
  for (const slug of Object.keys(LINK_LABELS)) {
    if (!comparisons.some((d) => d.slug === slug)) console.error(`No comparison found with slug "${slug}".`)
  }

  for (const doc of comparisons) {
    console.log(`\n=== comparison ${doc.slug} ${doc._id} (${kind(doc._id)}) ===`)
    const set: Record<string, string> = {}

    if (doc.linkLabel !== LINK_LABELS[doc.slug]) set.linkLabel = LINK_LABELS[doc.slug]

    if (doc.slug === 'eventbrite-alternatives') {
      if (doc.title !== ALTERNATIVES_TITLE) set.title = ALTERNATIVES_TITLE
      for (const field of ['seoTitle', 'metaDescription'] as const) {
        const value = doc[field]
        if (value && /\b2026\b/.test(value)) set[field] = value.replace(/\b2026\b/g, '2027')
        else console.log(`  ${field}: no "2026", unchanged (${JSON.stringify(value ?? null)})`)
      }
      if (set.seoTitle && set.seoTitle.length > 60) throw new Error(`seoTitle would be ${set.seoTitle.length} characters`)
    }

    for (const [field, value] of Object.entries(set)) {
      console.log(`  ${field}: ${JSON.stringify((doc as Record<string, unknown>)[field] ?? null)} -> ${JSON.stringify(value)}`)
    }
    if (Object.keys(set).length) {
      await client.patch(doc._id).set(set).commit()
      console.log(`  Patched ${doc._id}`)
    } else {
      console.log('  Fields: nothing to change.')
    }

    // c) Paragraph in hoperfy-vs-eventbrite.
    if (doc.slug !== 'hoperfy-vs-eventbrite') continue
    const body = doc.body ?? []
    if (linksToTarget(body)) {
      console.log(`  Body already links to ${TARGET}, skipped.`)
      continue
    }
    const block = paragraph(
      'Not sure Hoperfy is the right fit? We also compare Eventbrite alternatives, including Ticket Tailor, Tito and Luma.',
      'Eventbrite alternatives',
    )
    const headings = body.filter((b) => isHeading(b) && /better choice/i.test(text(b)))
    const heading = headings.find((b) => /eventbrite/i.test(text(b))) ?? headings[0]
    if (!heading) {
      console.log('  NOTE: no heading containing "better choice" found, appending at the end of the body.')
      const last = body[body.length - 1]
      await insertAfter(doc, last, block, 'Appended at end of body')
      continue
    }
    const level = Number(heading.style!.slice(1))
    const start = body.indexOf(heading)
    let end = body.length - 1
    for (let i = start + 1; i < body.length; i++) {
      if (isHeading(body[i]) && Number(body[i].style!.slice(1)) <= level) {
        end = i - 1
        break
      }
    }
    await insertAfter(doc, body[end], block, `Section "${text(heading)}", after its last block`)
  }

  // b) Blog posts.
  const posts = await client.fetch<Doc[]>(
    '*[_type == "blogPost" && slug.current in $slugs]{_id, "slug": slug.current, body}',
    { slugs: BLOG_SLUGS },
  )
  for (const slug of BLOG_SLUGS) {
    if (!posts.some((d) => d.slug === slug)) console.error(`\nNo blog post found with slug "${slug}".`)
  }
  for (const doc of posts) {
    console.log(`\n=== blogPost ${doc.slug} ${doc._id} (${kind(doc._id)}) ===`)
    const body = doc.body ?? []
    if (linksToTarget(body)) {
      console.log(`  Body already links to ${TARGET}, skipped.`)
      continue
    }
    const block = paragraph(
      'For a side-by-side look at fees and limits, see our comparison of Eventbrite alternatives, including Ticket Tailor, Tito and Luma.',
      'comparison of Eventbrite alternatives',
    )
    const withEventbrite = body.find((b) => isNormalParagraph(b) && text(b).includes('Eventbrite'))
    if (withEventbrite) {
      await insertAfter(doc, withEventbrite, block, 'After the first normal paragraph that mentions Eventbrite')
      continue
    }
    const firstNormal = body.find(isNormalParagraph)
    if (!firstNormal) {
      console.log('  NOTE: no normal paragraph in the body at all, skipped.')
      continue
    }
    await insertAfter(doc, firstNormal, block, 'NOTE: no normal paragraph mentions Eventbrite, inserted after the first normal paragraph')
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
