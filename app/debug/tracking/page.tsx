import { notFound } from 'next/navigation'
import TrackingDebugView from '@/components/TrackingDebugView'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Tracking debug',
  robots: { index: false, follow: false },
}

export default function TrackingDebugPage() {
  // Dev only. Never reachable in a production deployment.
  if (process.env.NODE_ENV === 'production') notFound()

  return (
    <main className="min-h-screen bg-white px-6 py-16">
      <div className="max-w-3xl mx-auto">
        <p className="eyebrow mb-3">Internal</p>
        <h1 className="text-[2rem] font-black tracking-tight text-[#0a0a0a] mb-3">
          Tracking debug
        </h1>
        <p className="text-[15px] font-light text-[#6b7280] leading-relaxed mb-10">
          Current output of getAttribution(), so UTM links can be checked without
          submitting a real lead. Append parameters to the URL, for example
          <span className="font-mono text-[13px] text-[#374151]">
            {' '}?utm_source=linkedin&amp;utm_medium=social&amp;utm_campaign=test
          </span>
          , then reload.
        </p>

        <TrackingDebugView />
      </div>
    </main>
  )
}
