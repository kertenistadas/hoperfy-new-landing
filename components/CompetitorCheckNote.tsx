/**
 * Month the competitor cells in the comparison tables were last checked
 * against each competitor's own published pages. Update it only after a
 * fresh check, never automatically.
 */
export const COMPETITOR_CHECK_MONTH = 'October 2026'

export default function CompetitorCheckNote({ className = 'mt-4' }: { className?: string }) {
  return (
    <p className={`${className} text-[12px] text-[#9ca3af]`}>
      Competitor details checked against their published pages, {COMPETITOR_CHECK_MONTH}.
    </p>
  )
}
