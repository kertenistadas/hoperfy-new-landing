import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Hoperfy — Event Commerce Infrastructure',
    template: '%s | Hoperfy',
  },
  description:
    'White-label hotel booking and multi-platform ticketing built for event teams. Sell more, manage less.',
  alternates: { canonical: 'https://hoperfy.com' },
  openGraph: {
    locale: 'en_US',
    type: 'website',
    siteName: 'Hoperfy',