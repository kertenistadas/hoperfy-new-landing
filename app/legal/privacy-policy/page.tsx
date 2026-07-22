import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for Hoperfy — how we collect, use, and protect your personal data.',
  alternates: { canonical: 'https://hoperfy.com/legal/privacy-policy' },
  robots: { index: true, follow: false },
}

export default function PrivacyPolicyPage() {
  return (
    <>
      <Nav />
      <main className="pt-28 pb-24 px-6">
        <article className="max-w-2xl mx-auto">
          <h1 className="text-[2rem] md:text-[2.5rem] font-black tracking-tight text-[#0a0a0a] mb-3">
            Privacy Policy
          </h1>
          <p className="text-[13px] text-[#6b7280] mb-12">Last updated: October 15, 2025</p>

          <div className="prose-legal">
            <h2>1. Data Controller</h2>
            <p>
              MB Hoperfy, registered in Lithuania.
              <br />
              Email: support@hoperfy.com
              <br />
              Applicable law: Republic of Lithuania and the European Union General Data
              Protection Regulation (GDPR).
            </p>

            <h2>2. Information We Collect</h2>
            <p>
              We collect only the personal data necessary to provide our hotel booking and
              event ticketing services. This may include:
            </p>
            <ul>
              <li>Full name, email address, and phone number</li>
              <li>Billing or payment details (processed securely through third-party providers)</li>
              <li>Information related to hotel reservations and ticket purchases</li>
              <li>Technical data such as IP address, device information, and browser type</li>
              <li>Cookies and analytics data for performance and marketing purposes</li>
            </ul>
            <p>
              We do not collect or store any payment card information directly; this is
              processed by secure third-party payment providers.
            </p>

            <h2>3. How We Use Your Data</h2>
            <p>We use the collected data to:</p>
            <ul>
              <li>Process and confirm hotel bookings and ticket purchases</li>
              <li>Communicate booking or event updates to you</li>
              <li>Provide customer support and handle change or refund requests</li>
              <li>Share booking details with hotels or event organizers when required</li>
              <li>Analyze website usage and improve user experience</li>
              <li>Comply with legal and accounting obligations</li>
            </ul>

            <h2>4. Legal Basis for Processing</h2>
            <p>We process personal data on the following legal grounds:</p>
            <ul>
              <li>
                <strong>Contractual necessity:</strong> to fulfill your booking or ticket
                purchase
              </li>
              <li>
                <strong>Legitimate interests:</strong> for analytics, service improvement, and
                fraud prevention
              </li>
              <li>
                <strong>Legal obligation:</strong> to maintain accounting and transaction
                records
              </li>
              <li>
                <strong>Consent:</strong> for marketing and tracking cookies, where applicable
              </li>
            </ul>

            <h2>5. Sharing of Information</h2>
            <p>
              We share your personal data only with trusted partners and service providers as
              necessary to provide our services:
            </p>
            <ul>
              <li>
                <strong>Hotels and accommodation partners</strong> – for reservation
                confirmation and check-in
              </li>
              <li>
                <strong>Event organizers</strong> – to assign and deliver event tickets
              </li>
              <li>
                <strong>Payment processors</strong> – for secure transaction handling
              </li>
              <li>
                <strong>CRM provider (HubSpot)</strong> – to manage customer bookings and
                communication
              </li>
              <li>
                <strong>Analytics and tracking providers</strong> – such as Google Analytics,
                Meta Pixel, Hotjar, and Google Tag Manager
              </li>
            </ul>
            <p>We do not sell your data to third parties.</p>

            <h2>6. International Data Transfers</h2>
            <p>
              Your data may be processed or stored outside the European Economic Area (EEA). In
              such cases, we ensure that appropriate safeguards such as Standard Contractual
              Clauses are in place to maintain GDPR compliance.
            </p>

            <h2>7. Data Retention</h2>
            <p>
              We retain your data for up to 10 years, as required for accounting and service
              record purposes. After this period, or upon your request, we will delete or
              anonymize your data unless required by law to retain it longer.
            </p>

            <h2>8. Your Rights</h2>
            <p>Under GDPR, you have the right to:</p>
            <ul>
              <li>Access your personal data</li>
              <li>Request correction or deletion of your data</li>
              <li>Withdraw consent for marketing or tracking</li>
              <li>Request restriction or portability of your data</li>
              <li>Lodge a complaint with a data protection authority</li>
            </ul>
            <p>To exercise these rights, contact us at support@hoperfy.com.</p>

            <h2>9. Cookies and Tracking</h2>
            <p>
              We use cookies and similar technologies to improve the functionality and
              performance of our Platform. These may include:
            </p>
            <ul>
              <li>
                <strong>Essential cookies</strong> – necessary for site operation
              </li>
              <li>
                <strong>Analytics cookies</strong> – to understand how users interact with the
                site (Google Analytics, Hotjar)
              </li>
              <li>
                <strong>Marketing cookies</strong> – to measure advertising performance (Meta
                Pixel, Google Tag Manager)
              </li>
            </ul>
            <p>By using the Platform, you consent to our use of cookies.</p>

            <h2>10. Data Security</h2>
            <p>
              We apply appropriate technical and organizational measures to protect your data
              from unauthorized access, alteration, or loss.
            </p>

            <h2>11. Updates to This Policy</h2>
            <p>
              We may update this Privacy Policy periodically. The latest version will always be
              available on our website.
            </p>

            <h2>12. Contact</h2>
            <p>
              MB Hoperfy
              <br />
              Email: support@hoperfy.com
            </p>
          </div>
        </article>
      </main>
      <Footer />
    </>
  )
}
