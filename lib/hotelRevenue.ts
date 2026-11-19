// Shared hotel revenue numbers for /products/hotels-for-events. The hero
// booking feed and the revenue calculator both read from here, so they always
// show the same result for the example event.

export const PROFIT_PER_NIGHT_BY_REGION: Record<string, number> = {
  Europe: 30, 'North America': 60, Asia: 45, 'Middle East': 60,
  'South America': 45, Australia: 60, Africa: 32,
}
export const DEFAULT_PROFIT_PER_NIGHT = 30
export const ORGANISER_SHARE = { hotelsOnly: 0.3, fullSuite: 0.5 } as const
export const EXAMPLE_EVENT = { attendees: 500, outOfTownPct: 30, nights: 2 } as const

export function organiserEarnings(roomNights: number, profitPerNight: number, share: number) {
  return Math.round(roomNights * profitPerNight * share)
}
