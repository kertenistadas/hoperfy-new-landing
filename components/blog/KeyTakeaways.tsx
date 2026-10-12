import Link from 'next/link'

type Props = {
  takeaways?: string[] | null
  ctaLabel?: string | null
  ctaHref?: string | null
}

/**
 * Extractable summary block for blog articles. Renders nothing without
 * takeaways, and drops the CTA row unless both CTA fields are filled.
 *
 * Must stay outside the .prose-blog wrapper: those rules restyle h2, ul, li
 * and a, which would override the styling here.
 */
export default function KeyTakeaways({ takeaways, ctaLabel, ctaHref }: Props) {
  if (!takeaways?.length) return null

  const showCta = Boolean(ctaLabel && ctaHref)

  return (
    <section className="bg-[#f9fafb] border border-[#e5e7eb] rounded-xl p-6 md:p-8 my-10">
      <h2 className="text-sm font-black uppercase tracking-wide text-[#6b7280] mb-4">
        Key takeaways
      </h2>

      <ul className="space-y-3 list-none p-0 m-0">
        {takeaways.map((item, i) => (
          <li key={i} className="flex gap-3 text-[#0a0a0a] font-light leading-relaxed">
            <span
              aria-hidden="true"
              className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-[#1a6cf5]"
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      {showCta && (
        <div className="border-t border-[#e5e7eb] pt-4 mt-5">
          <Link
            href={ctaHref as string}
            className="text-[#1a6cf5] font-medium text-sm no-underline hover:underline"
          >
            {ctaLabel} →
          </Link>
        </div>
      )}
    </section>
  )
}
