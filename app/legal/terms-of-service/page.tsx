import type { Metadata } from 'next'
import NavWrapper from '@/components/NavWrapper'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of Service for Hoperfy — rules governing hotel bookings and event ticket purchases on our platform.',
  alternates: { canonical: 'https://hoperfy.com/legal/terms-of-service' },
  robots: { index: true, follow: false },
}

export default function TermsOfServicePage() {
  return (
    <NavWrapper>
      <main className="pt-28 pb-24 px-6">
        <article className="max-w-2xl mx-auto">
          <h1 className="text-[2rem] md:text-[2.5rem] font-black tracking-tight text-[#0a0a0a] mb-12">
            Terms of Service
          </h1>

          <div className="prose-legal">
            <h2>Overview</h2>
            <p>
              These Terms of Service govern the use of the Hoperfy platform for booking hotels
              and purchasing event tickets. By completing a booking or ticket purchase on our
              website or through one of our partner pages, you agree to these Terms.
            </p>
            <p>
              Hoperfy acts as an intermediary platform connecting users to accommodations, event
              organizers, and other service providers. When you book a hotel or buy a ticket,
              you enter into a direct contractual relationship with the accommodation or event
              organizer. Hoperfy facilitates the reservation, ticketing, and payment on their
              behalf.
            </p>

            <h2>Bookings and Ticket Purchases</h2>
            <p>
              When you submit a booking or ticket purchase request, you are making an offer to
              buy the selected service. The booking becomes valid only when Hoperfy issues a
              confirmation by email or on-screen.
            </p>
            <p>
              Please ensure all details provided during checkout are correct. Incorrect
              information may result in cancellation, invalid tickets, or additional charges.
            </p>

            <h2>Payment Terms</h2>
            <ul>
              <li>Hoperfy collects the full payment at the time of booking or ticket purchase.</li>
              <li>Your booking is confirmed only once payment has been successfully processed.</li>
              <li>
                Hoperfy collects payments on behalf of the accommodation provider or event
                organizer.
              </li>
              <li>
                All prices are displayed inclusive of applicable taxes and fees unless stated
                otherwise, except city taxes collected directly by the accommodation upon
                check-in.
              </li>
            </ul>

            <h2>Confirmation and Ticket Delivery</h2>
            <p>
              After successful payment, hotel bookings will be confirmed instantly and a
              confirmation email will be sent. Event tickets will be emailed automatically
              including a unique QR code required for entry.
            </p>
            <p>
              If you do not receive your confirmation or ticket within one hour, please contact
              support@hoperfy.com.
            </p>

            <h2>Cancellations, Changes, and Refunds</h2>
            <h3>Hotel Bookings:</h3>
            <ul>
              <li>Cancellation policies vary by property and are displayed during booking.</li>
              <li>Some rates may be refundable, partially refundable, or non-refundable.</li>
              <li>Refunds are processed through the same payment method used during booking.</li>
              <li>
                No-shows may result in full or partial charges as determined by the property's
                policy.
              </li>
            </ul>
            <h3>Event Tickets:</h3>
            <ul>
              <li>
                Ticket refund and cancellation policies are set by each event organizer and
                displayed before purchase.
              </li>
              <li>
                If an event is canceled or postponed, Hoperfy will assist in communicating
                updates and refund procedures, but final responsibility lies with the event
                organizer.
              </li>
            </ul>
            <h3>Refund Amount:</h3>
            <p>
              Where a full refund is applicable, the refunded amount will reflect the total
              amount paid, excluding any bank-imposed fees and currency exchange fees, which are
              non-refundable.
            </p>

            <h2>Transferability and Resale of Tickets</h2>
            <p>
              Tickets are intended for personal use. Reselling or transferring tickets for
              commercial purposes without the organizer's prior consent may render them invalid.
            </p>

            <h2>Changes by the Accommodation or Organizer</h2>
            <p>
              In rare cases, the accommodation or event organizer may change or cancel a booking.
              Hoperfy will assist in securing an alternative or processing refunds, but ultimate
              responsibility rests with the accommodation or organizer.
            </p>

            <h2>Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, Hoperfy is not liable for any loss, damage,
              injury, delay, or inconvenience arising from the actions of accommodations, event
              organizers, or third-party suppliers.
            </p>
            <p>
              Hoperfy's total liability shall not exceed the total amount paid for the booking or
              ticket purchase concerned.
            </p>

            <h2>Privacy and Data Protection</h2>
            <p>
              Your personal information is processed according to the Hoperfy Privacy Policy at{' '}
              <a href="/legal/privacy-policy">hoperfy.com/legal/privacy-policy</a>.
            </p>

            <h2>Governing Law and Jurisdiction</h2>
            <p>
              These Terms are governed by the laws of the European Union and the Republic of
              Lithuania. Disputes shall be submitted to the competent courts of Vilnius,
              Lithuania.
            </p>

            <h2>Contact Information</h2>
            <p>
              Phone: +370 656 22116
              <br />
              Email: support@hoperfy.com
              <br />
              Website: www.hoperfy.com
            </p>
          </div>
        </article>
      </main>
    </NavWrapper>
  )
}
