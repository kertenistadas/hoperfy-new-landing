import type { Testimonial } from '@/types'

type Props = {
  testimonials: Testimonial[]
}

export default function TestimonialsSection({ testimonials }: Props) {
  if (!testimonials?.length) return null

  return (
    <section id="testimonials" className="py-24 px-6 bg-[#f9fafb]">
      <div className="max-w-5xl mx-auto">
        <div className="mb-16">
          <p className="eyebrow mb-3">What people say</p>
          <h2 className="text-[1.75rem] md:text-[2.25rem] font-black tracking-tight text-[#0a0a0a]">
            Built with event teams, for event teams.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <figure key={t._id} className="bg-white border border-[#e5e7eb] rounded-xl p-7 flex flex-col">
              <blockquote className="flex-1 mb-6">
                <p className="text-[15px] text-[#374151] leading-relaxed font-light">
                  "{t.quote}"
                </p>
              </blockquote>
              <figcaption>
                <p className="text-[14px] font-semibold text-[#0a0a0a]">{t.author}</p>
                <p className="text-[13px] text-[#6b7280] mt-0.5">{t.role}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
