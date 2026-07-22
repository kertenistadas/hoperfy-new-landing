import { ImageResponse } from 'next/og'

export const alt = 'Hoperfy — Hotel Booking & Ticketing for Event Teams'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#ffffff',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        <div
          style={{
            fontSize: 140,
            fontWeight: 800,
            letterSpacing: '-0.04em',
            color: '#0a0a0a',
            lineHeight: 1,
          }}
        >
          Hoperfy
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 40,
            fontWeight: 400,
            color: '#6b7280',
          }}
        >
          Hotel Booking &amp; Ticketing for Event Teams
        </div>

        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: 16,
            background: '#1a6cf5',
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  )
}
