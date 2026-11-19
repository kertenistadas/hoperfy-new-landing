// Usage: npx sanity exec scripts/update-hotels-for-events-copy.ts --with-user-token
//
// Updates the copy on /products/hotels-for-events that lives in the
// "hotels-for-events" product document. Patches the published document and
// its draft, whichever exist. Only the fields below are touched; seoTitle,
// metaDescription, slug and everything else are left as they are. Safe to
// re-run: existing problem _keys are kept.

import { getCliClient } from 'sanity/cli'

// raw perspective, so the query returns drafts as well as published documents.
const client = getCliClient({ apiVersion: '2024-01-01' }).withConfig({ perspective: 'raw', useCdn: false })

const SLUG = 'hotels-for-events'

const HERO_HEADLINE = 'Event Housing & Hotel Booking for Event Organizers'

const HERO_SUBTITLE =
  'We contract the hotels, build your branded booking page, and handle every attendee request: cancellations, refunds and date changes. Your team sends one link and goes back to running the event.'

const PROBLEM_HEADLINE = 'What event organizers ask us before signing'

const PROBLEMS = [
  {
    title: '"This will create more support work for my team."',
    description:
      'It creates none. Every attendee question, from a wrong date to a refund or a lost confirmation, comes to us, not to your inbox. You are involved only if you ask to be.',
  },
  {
    title: '"We tried a hotel partnership before and it went badly."',
    description:
      'Usually because the organizer stayed in the middle: chasing the hotel, forwarding attendee emails, settling disputes. We take the contract and the support queue, so there is no middle to stand in.',
  },
  {
    title: '"My team is already at capacity."',
    description:
      'Setup is one call and a link. There is no project to staff, no system to learn, and nothing to maintain during the event.',
  },
  {
    title: '"Hotel proposals are low on our priority list."',
    description:
      'Fair. That is why this one costs nothing and takes five minutes. If it earns your event nothing, you have lost a few minutes.',
  },
]

const HOW_IT_WORKS_HEADLINE = 'One conversation. Then your team is done.'

type Problem = { _key?: string; _type?: string; title?: string; description?: string }
type ProductDoc = {
  _id: string
  heroHeadline?: string
  heroSubtitle?: string
  problemHeadline?: string
  problems?: Problem[]
  howItWorksHeadline?: string
}

function randomKey() {
  return Math.random().toString(16).slice(2, 14)
}

function show(value: unknown) {
  return typeof value === 'string' ? JSON.stringify(value) : JSON.stringify(value, null, 2)
}

async function main() {
  for (const text of [HERO_HEADLINE, HERO_SUBTITLE, PROBLEM_HEADLINE, HOW_IT_WORKS_HEADLINE, ...PROBLEMS.flatMap((p) => [p.title, p.description])]) {
    if (text.includes('—')) throw new Error(`Em dash found in: ${text}`)
  }

  const docs = await client.fetch<ProductDoc[]>(
    '*[_type == "product" && slug.current == $slug]{_id, heroHeadline, heroSubtitle, problemHeadline, problems, howItWorksHeadline}',
    { slug: SLUG },
  )
  if (!docs.length) {
    console.error(`No product document found with slug "${SLUG}". Nothing patched.`)
    process.exit(1)
  }

  for (const doc of docs) {
    const kind = doc._id.startsWith('drafts.') ? 'draft' : 'published'

    // Keep each existing item's _key/_type, so Studio history stays readable.
    const problems = PROBLEMS.map((p, i) => {
      const existing = doc.problems?.[i]
      return {
        _key: existing?._key ?? randomKey(),
        ...(existing?._type ? { _type: existing._type } : {}),
        title: p.title,
        description: p.description,
      }
    })

    const next = {
      heroHeadline: HERO_HEADLINE,
      heroSubtitle: HERO_SUBTITLE,
      problemHeadline: PROBLEM_HEADLINE,
      problems,
      howItWorksHeadline: HOW_IT_WORKS_HEADLINE,
    }

    console.log(`\n=== ${doc._id} (${kind}) ===`)
    for (const field of Object.keys(next) as (keyof typeof next)[]) {
      const oldValue =
        field === 'problems'
          ? (doc.problems ?? []).map((p) => ({ title: p.title, description: p.description }))
          : doc[field]
      const newValue =
        field === 'problems' ? problems.map((p) => ({ title: p.title, description: p.description })) : next[field]
      console.log(`\n${field}\n  OLD: ${show(oldValue)}\n  NEW: ${show(newValue)}`)
    }

    await client.patch(doc._id).set(next).commit()
    console.log(`\nPatched ${doc._id}`)
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
