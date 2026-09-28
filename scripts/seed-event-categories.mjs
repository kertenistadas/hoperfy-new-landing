// Usage: SANITY_API_TOKEN=xxx NEXT_PUBLIC_SANITY_PROJECT_ID=xxx node scripts/seed-event-categories.mjs
//
// Creates the baseline event categories. Existing categories are left untouched,
// so this is safe to re-run.

import { createClient } from '@sanity/client'

const token = process.env.SANITY_API_TOKEN
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production'

if (!token) {
  console.error('Missing SANITY_API_TOKEN environment variable.')
  process.exit(1)
}
if (!projectId) {
  console.error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID environment variable.')
  process.exit(1)
}

const client = createClient({ projectId, dataset, apiVersion: '2024-01-01', token, useCdn: false })

const CATEGORIES = [
  {
    title: 'Tech',
    intro:
      'Technology conferences bring together engineers, product leaders and founders to explore what is being built next. From developer-focused deep dives to enterprise IT summits, these events span every corner of the industry.',
  },
  {
    title: 'Startup',
    intro:
      'Startup events connect founders, investors and operators. Expect pitch competitions, investor matchmaking and practical sessions on building and scaling early-stage companies.',
  },
  {
    title: 'Medical',
    intro:
      'Medical and healthcare conferences bring clinicians, researchers and health technology companies together to share findings, present research and explore advances in patient care.',
  },
  {
    title: 'Finance',
    intro:
      'Finance and fintech events cover banking, payments, investment and financial technology. They attract institutional players, fintech founders and regulators shaping the sector.',
  },
  {
    title: 'Marketing',
    intro:
      'Marketing conferences focus on growth, brand, content and performance. They bring together CMOs, agency leaders and practitioners working across digital and traditional channels.',
  },
  {
    title: 'Design',
    intro:
      'Design events gather product designers, UX researchers, brand strategists and creative directors. Sessions typically cover design systems, research methods and creative practice.',
  },
  {
    title: 'Gaming',
    intro:
      'Gaming events serve developers, publishers and the wider games industry. They range from technical developer conferences to large consumer-facing expos and esports competitions.',
  },
  {
    title: 'Sustainability',
    intro:
      'Sustainability conferences address climate, circular economy, ESG and clean technology. They bring together policymakers, corporate sustainability teams and climate tech founders.',
  },
  {
    title: 'HR',
    intro:
      'HR and people conferences focus on talent, culture, employee experience and the future of work. They attract HR leaders, recruiters and workplace strategists.',
  },
  {
    title: 'Manufacturing',
    intro:
      'Manufacturing and industrial events cover automation, supply chain, logistics and advanced production. They serve engineers, plant managers and industrial technology providers.',
  },
]

function slugify(value) {
  return String(value)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

async function main() {
  let created = 0
  let updated = 0
  let skipped = 0

  for (let i = 0; i < CATEGORIES.length; i++) {
    const { title, intro } = CATEGORIES[i]
    const order = i + 1

    const existing = await client.fetch(
      '*[_type == "eventCategory" && lower(title) == $title][0]{ _id, intro }',
      { title: title.toLowerCase() },
    )

    if (existing) {
      // Backfill intro copy onto categories seeded before the field existed,
      // without overwriting any wording edited in the Studio.
      if (!existing.intro) {
        await client.patch(existing._id).set({ intro }).commit()
        updated++
        console.log(`~ ${title} (intro added)`)
      } else {
        skipped++
        console.log(`- ${title} (already has intro)`)
      }
      continue
    }

    await client.create({
      _type: 'eventCategory',
      title,
      slug: { _type: 'slug', current: slugify(title) },
      order,
      intro,
    })
    created++
    console.log(`✓ ${title}`)
  }

  console.log(`\nDone. Created ${created}, updated ${updated}, skipped ${skipped}.`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
