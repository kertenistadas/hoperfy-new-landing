import type { Hero } from '@/types'
import CTAButtons from '@/components/CTAButtons'

type Props = {
  data: Hero
}

export default function HeroSection({ data }: Props) {
  return (
    <section className="pt-32 pb-24 px-6">
      <div className="max-w-2xl mx-auto text-center">
        <p className="eyebrow mb-6">Event commerce infrastructure</p>

        <h1 className="text-[2.75rem] md:text-[3.5rem] font-black leading-[1.05] tracking-tight text-[#0a0a0a] mb-6">
          {data.headline}
        </h1>

        <p className="text-lg font-light text-[#6b7280] leading-relaxed mb-12 max-w-xl mx-auto">
          {data.subtitle}
        </p>

        <div className="flex justify-center">
          <div className="inline-flex items-center gap-2 bg-[#eef4ff] border border-[#b8d0fe] rounded-full px-4 py-1.5 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1a6cf5] animate-pulse shrink-0" />
            <span className="text-[12px] font-medium text-[#1a6cf5]">First 100 events — first 100 tickets on us</span>
          </div>
        </div>

        <div id="signup">
          <CTAButtons source="homepage" />

          <p className="mt-4 text-[12px] text-[#9ca3af]">
            No commitment required.
          </p>
        </div>
      </div>
    </section>
  )
}
