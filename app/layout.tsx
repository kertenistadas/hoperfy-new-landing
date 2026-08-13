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
    default: 'Hoperfy — Hotel Booking & Ticketing for Event Teams',
    template: '%s | Hoperfy',
  },
  description: 'Hoperfy gives event teams white-label hotel booking and multi-platform ticket sales in one platform. No commission leakage. No integration headaches. Built for event organizers.',
  keywords: ['hotel booking for events', 'white label hotel booking', 'event ticketing platform', 'room block management software', 'multi-channel ticketing', 'event housing management', 'hotel room block software', 'Eventbrite alternative', 'event hotel software', 'group hotel booking events'],
  metadataBase: new URL('https://hoperfy.com'),
  alternates: { canonical: 'https://hoperfy.com' },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon-180x180.png',
  },
  openGraph: {
    locale: 'en_US',
    type: 'website',
    siteName: 'Hoperfy',
    url: 'https://hoperfy.com',
    title: 'Hoperfy — Hotel Booking & Ticketing for Event Teams',
    description: 'White-label hotel booking and multi-platform ticketing built for event teams. Sell more, manage less.',
    images: [{ url: 'https://hoperfy.com/og-image.png', width: 1200, height: 630, alt: 'Hoperfy — Event Commerce Platform' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hoperfy — Hotel Booking & Ticketing for Event Teams',
    description: 'White-label hotel booking and multi-platform ticketing built for event teams.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <script
        dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-5RKPDHB4');`,
        }}
      />
      <body className="antialiased">
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5RKPDHB4"
height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
          }}
        />
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": "https://hoperfy.com/#organization",
                  "name": "Hoperfy",
                  "url": "https://hoperfy.com",
                  "description": "Event commerce infrastructure — white-label hotel booking and multi-platform ticketing for event teams.",
                  "contactPoint": {
                    "@type": "ContactPoint",
                    "email": "hello@hoperfy.com",
                    "contactType": "customer support"
                  }
                },
                {
                  "@type": "WebSite",
                  "@id": "https://hoperfy.com/#website",
                  "url": "https://hoperfy.com",
                  "name": "Hoperfy",
                  "publisher": { "@id": "https://hoperfy.com/#organization" }
                },
                {
                  "@type": "SoftwareApplication",
                  "name": "Hoperfy",
                  "applicationCategory": "BusinessApplication",
                  "operatingSystem": "Web",
                  "description": "White-label hotel booking and multi-platform ticketing platform for event organizers and event teams.",
                  "offers": {
                    "@type": "Offer",
                    "price": "0",
                    "priceCurrency": "USD",
                    "description": "Contact for pricing"
                  },
                  "publisher": { "@id": "https://hoperfy.com/#organization" }
                }
              ]
            })
          }}
        />
      </body>
    </html>
  )
}