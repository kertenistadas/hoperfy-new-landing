'use client'

import { createContext, useContext, useState, useMemo, type ReactNode } from 'react'

export type PlatformKey = 'eventbrite' | 'legacy' | 'diy'
export type CurrencyKey = '€' | '$' | '£'

interface TicketingInputs {
  ticketPrice: number
  ticketsSold: number
  paidPct: number
  platform: PlatformKey
  currency: CurrencyKey
}

interface TicketingDerived {
  gross: number
  hoperfyFee: number
  hoperfyStripe: number
  hoperfyTotal: number
  competitorFee: number
  competitorStripe: number
  competitorTotal: number
  savings: number
  isNegative: boolean
  payoutDelayDays: number
  platformLabel: string
}

interface TicketingFeeContextValue extends TicketingInputs, TicketingDerived {
  setTicketPrice: (v: number) => void
  setTicketsSold: (v: number) => void
  setPaidPct: (v: number) => void
  setPlatform: (v: PlatformKey) => void
  setCurrency: (v: CurrencyKey) => void
}

const PLATFORM_CONFIG = {
  eventbrite: { label: 'Eventbrite', pct: 3.7, fixed: 1.79, payoutDelayDays: 5 },
  legacy: { label: 'Legacy box office', pct: 6.0, fixed: 2.5, payoutDelayDays: 30 },
  diy: { label: 'Own site + Stripe', pct: 0, fixed: 0, payoutDelayDays: 7 },
}

const STRIPE_PCT = 2.9
const HOPERFY_PCT = 2.5

const TicketingFeeContext = createContext<TicketingFeeContextValue | null>(null)

export function TicketingFeeProvider({ children }: { children: ReactNode }) {
  const [ticketPrice, setTicketPrice] = useState(45)
  const [ticketsSold, setTicketsSold] = useState(1200)
  const [paidPct, setPaidPct] = useState(100)
  const [platform, setPlatform] = useState<PlatformKey>('eventbrite')
  const [currency, setCurrency] = useState<CurrencyKey>('€')

  const derived = useMemo((): TicketingDerived => {
    const config = PLATFORM_CONFIG[platform]
    const paidTickets = ticketsSold * (paidPct / 100)
    const gross = paidTickets * ticketPrice

    const hoperfyFee = gross * (HOPERFY_PCT / 100)
    const hoperfyStripe = gross * (STRIPE_PCT / 100)
    const hoperfyTotal = hoperfyFee + hoperfyStripe

    const competitorFee = gross * (config.pct / 100) + paidTickets * config.fixed
    const competitorStripe = gross * (STRIPE_PCT / 100)
    const competitorTotal = competitorFee + competitorStripe

    const savings = competitorTotal - hoperfyTotal
    const isNegative = savings < 0

    return {
      gross,
      hoperfyFee,
      hoperfyStripe,
      hoperfyTotal,
      competitorFee,
      competitorStripe,
      competitorTotal,
      savings,
      isNegative,
      payoutDelayDays: config.payoutDelayDays,
      platformLabel: config.label,
    }
  }, [ticketPrice, ticketsSold, paidPct, platform])

  return (
    <TicketingFeeContext.Provider
      value={{
        ticketPrice,
        setTicketPrice,
        ticketsSold,
        setTicketsSold,
        paidPct,
        setPaidPct,
        platform,
        setPlatform,
        currency,
        setCurrency,
        ...derived,
      }}
    >
      {children}
    </TicketingFeeContext.Provider>
  )
}

export function useTicketingFee() {
  const ctx = useContext(TicketingFeeContext)
  if (!ctx) throw new Error('useTicketingFee must be used within TicketingFeeProvider')
  return ctx
}

export { PLATFORM_CONFIG }
