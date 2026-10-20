import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

const ATTRIBUTION_STRING_FIELDS = [
  'firstSource', 'firstMedium', 'firstCampaign', 'firstTerm', 'firstContent',
  'firstReferrer', 'firstLandingPage',
  'lastSource', 'lastMedium', 'lastCampaign', 'lastTerm', 'lastContent', 'lastReferrer',
  'gclid', 'fbclid', 'liFatId', 'gaClientId',
  'submittedPath', 'deviceType', 'userAgent',
] as const

const ATTRIBUTION_DATE_FIELDS = ['firstTouchAt', 'lastTouchAt'] as const

/**
 * Picks known attribution keys off the request body and drops anything
 * unusable. A malformed datetime would make Sanity reject the whole mutation,
 * so attribution is normalised rather than trusted.
 */
function pickAttribution(body: Record<string, unknown>): Record<string, string | null> {
  const out: Record<string, string | null> = {}

  for (const key of ATTRIBUTION_STRING_FIELDS) {
    const value = body[key]
    out[key] = typeof value === 'string' && value.trim() ? value.slice(0, 1000) : null
  }

  for (const key of ATTRIBUTION_DATE_FIELDS) {
    const value = body[key]
    const valid =
      typeof value === 'string' && value.trim() && !Number.isNaN(Date.parse(value))
    out[key] = valid ? new Date(value as string).toISOString() : null
  }

  return out
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { email, productInterest, eventName, attendees, eventStartDate, eventEndDate, eventLocation, source } = body

    // Email is optional. Save it only when a valid one is provided; otherwise
    // still save the lead with whatever other fields came through.
    const validEmail = typeof email === 'string' && isValidEmail(email) ? email : null

    const mutation = {
      mutations: [
        {
          create: {
            _type: 'lead',
            email: validEmail,
            productInterest: productInterest ?? null,
            eventName: eventName ?? null,
            attendees: attendees ?? null,
            eventStartDate: eventStartDate ?? null,
            eventEndDate: eventEndDate ?? null,
            eventLocation: eventLocation ?? null,
            source: source ?? 'unknown',
            status: 'new',
            createdAt: new Date().toISOString(),
            ...pickAttribution(body),
          },
        },
      ],
    }

    const response = await fetch(
      `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2024-01-01/data/mutate/${process.env.NEXT_PUBLIC_SANITY_DATASET}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.SANITY_API_TOKEN}`,
        },
        body: JSON.stringify(mutation),
      }
    )

    if (!response.ok) {
      const error = await response.text()
      console.error('[sanity mutation error]', error)
      return NextResponse.json({ error: 'Failed to save lead' }, { status: 500 })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[signup error]', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
