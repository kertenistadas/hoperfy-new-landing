import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()

    if (!email || !isValidEmail(email)) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
    }

    console.log('[signup]', email)

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[signup error]', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
