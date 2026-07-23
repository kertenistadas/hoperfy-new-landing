import type { ProductDetail } from '@/types'

export const fallbackProductDetails: Record<string, ProductDetail> = {
  'hotels-for-events': {
    _id: 'hotels-for-events',
    title: 'Hotels for Events',
    slug: 'hotels-for-events',
    tagline: 'White-label hotel booking',
    description:
      'Your brand, your rates, your guests. Give attendees a seamless hotel booking experience built directly into your event — no third-party redirects, no commission leakage.',
    features: [
      'Fully white-labelled booking flow',
      'Direct negotiated rate management',
      'Real-time inventory sync',
      'Group block allocation and tracking',
      'Automated rooming list exports',
    ],
    stat: { value: '40%', label: 'more hotel revenue per event' },
    heroHeadline: 'Your event. Your rates. Your brand.',
    heroSubtitle:
      'Give attendees a seamless hotel booking experience built directly into your event — without third-party redirects or commission leakage.',
    heroCta: 'Get early access',
    problemHeadline: 'Hotel booking is where events leak the most revenue.',
    problems: [
      {
        title: 'Lost revenue',
        description: 'Third-party booking platforms take commissions that should be yours.',
      },
      {
        title: 'Broken experience',
        description: 'Attendees leave your site to book hotels, and half of them never come back.',
      },
      {
        title: 'No visibility',
        description: 'You have no idea who booked where, making room block management a nightmare.',
      },
      {
        title: 'Someone has to handle the complaints',
        description: 'When an attendee has a booking issue, cancellation, or payment problem — that lands on your team. Hoperfy handles all of it so you never have to.',
      },
    ],
    featuresHeadline: 'Everything you need to own the booking experience.',
    featuresList: [
      {
        title: 'White-labelled booking flow',
        description: 'A booking experience that looks and feels like your event, start to finish.',
      },
      {
        title: 'Negotiated rate management',
        description: 'Load and manage your directly negotiated hotel rates in one place.',
      },
      {
        title: 'Real-time inventory sync',
        description: 'Live availability so attendees never book a room that is not there.',
      },
      {
        title: 'Group block tracking',
        description: 'Allocate and monitor room blocks without spreadsheets.',
      },
      {
        title: 'Automated rooming lists',
        description: 'Export accurate rooming lists to your hotels in a click.',
      },
      {
        title: 'Full booking visibility',
        description: 'See exactly who booked where, in real time.',
      },
      {
        title: 'Full customer service included',
        description: 'Hoperfy handles all attendee inquiries, booking changes, cancellations, and payment issues. Your team never needs to touch a hotel support request.',
      },
      {
        title: 'Payments and refunds managed for you',
        description: 'We collect payments, process refunds, and handle disputes on your behalf. You get clean revenue reporting with none of the back-and-forth.',
      },
    ],
    howItWorksHeadline: 'Live in an afternoon.',
    steps: [
      {
        title: 'Connect your hotels',
        description: 'Add your negotiated rates and room blocks in a few minutes.',
      },
      {
        title: 'Embed on your event site',
        description: 'Drop the white-labelled booking flow directly into your event.',
      },
      {
        title: 'Watch bookings come in',
        description: 'Track every reservation and manage blocks from one dashboard.',
      },
    ],
    stats: [
      { value: '40%', label: 'more hotel revenue per event' },
      { value: '3hrs', label: 'average setup time' },
      { value: '0%', label: 'commission taken' },
    ],
  },
  'ticketing-for-events': {
    _id: 'ticketing-for-events',
    title: 'Ticketing for Events',
    slug: 'ticketing-for-events',
    tagline: 'Multi-platform ticket sales',
    description:
      'Sell across every channel without losing track of who bought what. One dashboard, unified reporting, and payouts that actually make sense.',
    features: [
      'Sell across web, app, and partner channels',
      'Dynamic pricing and capacity controls',
      'Unified attendee data across platforms',
      'Instant payouts with no hidden fees',
      'QR check-in and access management',
    ],
    stat: { value: '3x', label: 'faster setup vs. legacy platforms' },
    heroHeadline: 'Sell everywhere. Manage from one place.',
    heroSubtitle:
      'Multi-platform ticket sales with unified reporting, instant payouts, and none of the integration headaches.',
    heroCta: 'Get early access',
    problemHeadline: 'Selling across channels should not mean losing control.',
    problems: [
      {
        title: 'Platform lock-in',
        description: 'Legacy ticketing platforms trap your event and your data on their terms.',
      },
      {
        title: 'Delayed payouts',
        description: 'You wait weeks for money that attendees already paid.',
      },
      {
        title: 'Data silos',
        description: 'Every channel keeps its own data, so you never see the full picture.',
      },
    ],
    featuresHeadline: 'One dashboard for every channel you sell on.',
    featuresList: [
      {
        title: 'Multi-channel selling',
        description: 'Sell across web, app, and partner channels from a single setup.',
      },
      {
        title: 'Dynamic pricing',
        description: 'Adjust pricing and capacity in real time as demand shifts.',
      },
      {
        title: 'Unified attendee data',
        description: 'Every sale flows into one place, no matter where it happened.',
      },
      {
        title: 'Instant payouts',
        description: 'Get paid as tickets sell, with no hidden fees.',
      },
      {
        title: 'QR check-in',
        description: 'Fast, reliable access management at the door.',
      },
      {
        title: 'Unified reporting',
        description: 'See performance across every channel in one report.',
      },
    ],
    howItWorksHeadline: 'From setup to first sale in minutes.',
    steps: [
      {
        title: 'Create your event',
        description: 'Set up tickets, pricing, and capacity in one place.',
      },
      {
        title: 'Connect your channels',
        description: 'Plug in web, app, and partner channels without integration work.',
      },
      {
        title: 'Sell and get paid',
        description: 'Start selling everywhere and receive instant payouts.',
      },
    ],
    stats: [
      { value: '3x', label: 'faster setup' },
      { value: '0', label: 'days payout delay' },
      { value: '100%', label: 'attendee data ownership' },
    ],
  },
}
