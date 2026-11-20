// Usage: npx sanity exec scripts/hotels-copy-cleanup.ts --with-user-token
//
// Copy cleanup for /products/hotels-for-events, Sanity side, on the hotels
// product's fullFeatures (rendered as "Everything your event team gets"):
// - removes the technical "Embed, iFrame, API, Link" item (the same
//   information now lives in an FAQ item in code);
// - renames items listed in RENAME to plain English.
// Patches the published document and its draft, whichever exist. No other
// field is touched, and re-running is a no-op once applied.

import { getCliClient } from 'sanity/cli'

// raw perspective, so the query returns drafts as well as published documents.
const client = getCliClient({ apiVersion: '2024-01-01' }).withConfig({ perspective: 'raw', useCdn: false })

const SLUG = 'hotels-for-events'
const TECHNICAL = /\b(embed|iframe|api)\b/i
const RENAME: Record<string, string> = {
  'Add your current room block (if needed)': "Add hotel rooms you've already reserved (optional)",
}

type ProductDoc = { _id: string; fullFeatures?: string[] }

async function main() {
  const docs = await client.fetch<ProductDoc[]>(
    '*[_type == "product" && slug.current == $slug]{_id, fullFeatures}',
    { slug: SLUG },
  )
  if (!docs.length) {
    console.error(`No product document found with slug "${SLUG}". Nothing patched.`)
    process.exit(1)
  }

  for (const doc of docs) {
    const kind = doc._id.startsWith('drafts.') ? 'draft' : 'published'
    const oldList = doc.fullFeatures ?? []
    const newList = oldList
      .filter((item) => !TECHNICAL.test(item))
      .map((item) => RENAME[item.trim()] ?? item)

    console.log(`\n=== ${doc._id} (${kind}) ===`)
    console.log('\nfullFeatures')
    console.log(`  OLD: ${JSON.stringify(oldList, null, 2)}`)
    console.log(`  NEW: ${JSON.stringify(newList, null, 2)}`)
    console.log(`  REMOVED: ${JSON.stringify(oldList.filter((item) => TECHNICAL.test(item)))}`)
    for (const item of oldList) {
      if (RENAME[item.trim()]) console.log(`  RENAMED: ${JSON.stringify(item)} -> ${JSON.stringify(RENAME[item.trim()])}`)
    }

    if (JSON.stringify(newList) === JSON.stringify(oldList)) {
      console.log('\nNothing to change.')
      continue
    }
    await client.patch(doc._id).set({ fullFeatures: newList }).commit()
    console.log(`\nPatched ${doc._id}`)
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
