import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { email, productInterest, eventName, attendees, eventStartDate, eventEndDate, eventLocation, source } = body

    if (!email || !isValidEmail(email)) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
    }

    const mutation = {
      mutations: [
        {
          create: {
            _type: 'lead',
            email,
            productInterest: productInterest ?? null,
            eventName: eventName ?? null,
            attendees: attendees ?? null,
            eventStartDate: eventStartDate ?? null,
            eventEndDate: eventEndDate ?? null,
            eventLocation: eventLocation ?? null,
            source: source ?? 'unknown',
            status: 'new',
            createdAt: new Date().toISOString(),
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
