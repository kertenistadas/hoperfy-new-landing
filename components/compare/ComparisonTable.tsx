import type { ComparisonTable as ComparisonTableData } from '@/types'

const HIGHLIGHT = 'bg-[#eef4ff]'
// Each column keeps at least this width, so wide tables scroll sideways on phones instead of squashing.
const MIN_COLUMN_PX = 160

/**
 * The comparison as a real HTML table. The first column holds the row labels;
 * the column headed "Hoperfy" gets the accent tint and no other difference.
 */
export default function ComparisonTable({ table, label }: { table?: ComparisonTableData | null; label: string }) {
  const columns = table?.columns ?? []
  const rows = table?.rows ?? []
  if (!columns.length || !rows.length) return null

  const hoperfyIndex = columns.findIndex((column) => /hoperfy/i.test(column))
  const tint = (i: number) => (i === hoperfyIndex ? HIGHLIGHT : '')

  return (
    <div
      className="overflow-x-auto my-10 border-t border-[#e5e7eb]"
      role="region"
      aria-label={label}
      tabIndex={0}
    >
      <table className="w-full text-left border-collapse" style={{ minWidth: columns.length * MIN_COLUMN_PX }}>
        <thead>
          <tr className="border-b border-[#e5e7eb]">
            {columns.map((column, i) => (
              <th
                key={i}
                scope="col"
                className={`py-4 px-4 text-[13px] font-semibold text-[#0a0a0a] align-bottom ${tint(i)}`}
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row._key} className="border-b border-[#f3f4f6] align-top">
              {columns.map((_, i) =>
                i === 0 ? (
                  <th key={i} scope="row" className={`py-4 px-4 text-[14px] font-medium text-[#374151] ${tint(i)}`}>
                    {row.cells?.[i] ?? ''}
                  </th>
                ) : (
                  <td key={i} className={`py-4 px-4 text-[14px] text-[#374151] ${tint(i)}`}>
                    {row.cells?.[i] ?? ''}
                  </td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
