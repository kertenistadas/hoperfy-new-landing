// Usage: SANITY_API_TOKEN=xxx NEXT_PUBLIC_SANITY_PROJECT_ID=xxx node scripts/import-events.mjs events.csv
//
// Required CSV columns: event_name, slug, start_date, end_date, city, country, category, website
// Optional CSV columns: venue, attendees, ticket_price_from, organizer, format, description
//
// Countries, cities and categories are created on demand and reused across rows.
// Rows whose slug already exists as an event are skipped, so re-running is safe.

import { readFileSync } from 'node:fs'
import { createClient } from '@sanity/client'

const token = process.env.SANITY_API_TOKEN
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production'
const csvPath = process.argv[2]

if (!token) {
  console.error('Missing SANITY_API_TOKEN environment variable.')
  process.exit(1)
}
if (!projectId) {
  console.error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID environment variable.')
  process.exit(1)
}
if (!csvPath) {
  console.error('Usage: node scripts/import-events.mjs <path-to-csv>')
  process.exit(1)
}

const client = createClient({ projectId, dataset, apiVersion: '2024-01-01', token, useCdn: false })

/** Splits one CSV line, honouring quoted fields and "" escapes. */
function parseLine(line) {
  const values = []
  let current = ''
  let inQuotes = false

  for (let i = 0; i < line.length; i++) {
    const char = line[i]
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"'
        i++
      } else {
        inQuotes = !inQuotes
      }
    } else if (char === ',' && !inQuotes) {
      values.push(current.trim())
      current = ''
    } else {
      current += char
    }
  }
  values.push(current.trim())
  return values
}

/** Splits the file into lines, keeping newlines that sit inside quoted fields. */
function splitRows(text) {
  const rows = []
  let current = ''
  let inQuotes = false

  for (let i = 0; i < text.length; i++) {
    const char = text[i]
    if (char === '"') {
      if (inQuotes && text[i + 1] === '"') {
        current += '""'
        i++
        continue
      }
      inQuotes = !inQuotes
      current += char
    } else if ((char === '\n' || char === '\r') && !inQuotes) {
      if (char === '\r' && text[i + 1] === '\n') i++
      if (current.trim()) rows.push(current)
      current = ''
    } else {
      current += char
    }
  }
  if (current.trim()) rows.push(current)
  return rows
}

function slugify(value) {
  return String(value)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

// Cache lookups so a 500-row CSV does not re-query the same country 500 times.
const countryCache = new Map()
const cityCache = new Map()
const categoryCache = new Map()

async function findOrCreateCountry(name) {
  const key = name.toLowerCase()
  if (countryCache.has(key)) return countryCache.get(key)

  const existing = await client.fetch('*[_type == "eventCountry" && lower(name) == $name][0]._id', { name: key })
  if (existing) {
    countryCache.set(key, existing)
    return existing
  }

  const created = await client.create({
    _type: 'eventCountry',
    name,
    slug: { _type: 'slug', current: slugify(name) },
  })
  console.log(`  + country: ${name}`)
  countryCache.set(key, created._id)
  return created._id
}

async function findOrCreateCity(name, countryId) {
  const key = `${name.toLowerCase()}::${countryId}`
  if (cityCache.has(key)) return cityCache.get(key)

  const existing = await client.fetch(
    '*[_type == "eventCity" && lower(name) == $name && country._ref == $countryId][0]._id',
    { name: name.toLowerCase(), countryId },
  )
  if (existing) {
    cityCache.set(key, existing)
    return existing
  }

  const created = await client.create({
    _type: 'eventCity',
    name,
    slug: { _type: 'slug', current: slugify(name) },
    country: { _type: 'reference', _ref: countryId },
  })
  console.log(`  + city: ${name}`)
  cityCache.set(key, created._id)
  return created._id
}

async function findOrCreateCategory(title) {
  const key = title.toLowerCase()
  if (categoryCache.has(key)) return categoryCache.get(key)

  const existing = await client.fetch('*[_type == "eventCategory" && lower(title) == $title][0]._id', { title: key })
  if (existing) {
    categoryCache.set(key, existing)
    return existing
  }

  const created = await client.create({
    _type: 'eventCategory',
    title,
    slug: { _type: 'slug', current: slugify(title) },
  })
  console.log(`  + category: ${title}`)
  categoryCache.set(key, created._id)
  return created._id
}

async function main() {
  const rows = splitRows(readFileSync(csvPath, 'utf8'))
  if (rows.length < 2) {
    console.error('CSV has no data rows.')
    process.exit(1)
  }

  const headers = parseLine(rows[0]).map((h) => h.toLowerCase())
  const required = ['event_name', 'slug', 'start_date', 'city', 'country', 'category']
  const missing = required.filter((col) => !headers.includes(col))
  if (missing.length > 0) {
    console.error(`CSV is missing required column(s): ${missing.join(', ')}`)
    process.exit(1)
  }

  let created = 0
  let skipped = 0
  let failed = 0

  for (let i = 1; i < rows.length; i++) {
    const values = parseLine(rows[i])
    const row = {}
    headers.forEach((header, index) => {
      row[header] = values[index] ?? ''
    })

    const name = row.event_name
    const slug = row.slug ? slugify(row.slug) : slugify(name)

    if (!name || !slug || !row.start_date || !row.city || !row.country || !row.category) {
      console.warn(`Row ${i + 1}: missing required value, skipping.`)
      skipped++
      continue
    }

    try {
      const exists = await client.fetch('*[_type == "event" && slug.current == $slug][0]._id', { slug })
      if (exists) {
        skipped++
        continue
      }

      const countryId = await findOrCreateCountry(row.country)
      const cityId = await findOrCreateCity(row.city, countryId)
      const categoryId = await findOrCreateCategory(row.category)

      const doc = {
        _type: 'event',
        name,
        slug: { _type: 'slug', current: slug },
        startDate: row.start_date,
        city: { _type: 'reference', _ref: cityId },
        category: { _type: 'reference', _ref: categoryId },
        format: row.format || 'in-person',
      }

      if (row.end_date) doc.endDate = row.end_date
      if (row.website) doc.website = row.website
      if (row.venue) doc.venue = row.venue
      if (row.organizer) doc.organizer = row.organizer
      if (row.ticket_price_from) doc.ticketPriceFrom = row.ticket_price_from
      if (row.description) doc.description = row.description
      if (row.attendees) {
        const attendees = Number(String(row.attendees).replace(/[^0-9]/g, ''))
        if (Number.isFinite(attendees) && attendees > 0) doc.attendees = attendees
      }

      await client.create(doc)
      created++
      console.log(`✓ ${name}`)
    } catch (error) {
      failed++
      console.error(`✗ Row ${i + 1} (${name}): ${error.message}`)
    }
  }

  console.log(`\nDone. Created ${created}, skipped ${skipped}, failed ${failed}.`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
