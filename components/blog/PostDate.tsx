/** Formats as "6 October 2026". UTC so server and client never disagree on the day. */
export function formatPostDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  })
}

export default function PostDate({ iso }: { iso: string }) {
  return <time dateTime={iso}>{formatPostDate(iso)}</time>
}
