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
    fullFeatures: [
      'White-label hotel booking page',
      'Your branding, your domain',
      'Negotiated rate management',
      'Real-time room block tracking',
      'Group block pickup reporting',
      'Automated rooming list exports',
      'Unlimited bookings',
      'Full customer service by Hoperfy',
      'Cancellations and changes handled for you',
      'Payments and refunds managed for you',
      'Managed setup by our team',
      'Live within 5 minutes',
    ],
    stat: { value: '40%', label: 'more hotel revenue per event' },
    heroHeadline: 'Your attendees are already booking hotels. Zero extra work for your team.',
    heroSubtitle:
      'For a 500-person event, attendees typically spend €80,000–€150,000 on accommodation — through Booking.com, not through you. Hoperfy is the white-label hotel booking platform for event teams. We contract the hotels, handle all delegate support, and manage everything. Free to set up. Live in 5 minutes.',
    heroCta: 'Get early access',
    problemHeadline: "We've heard every objection. Here's the honest answer to each one.",
    problems: [
      {
        title: '"This will create more support work for us"',
        description:
          "It won't. Hoperfy's team handles every delegate question, booking change, cancellation, and refund directly. Your inbox stays exactly as it is. We built Hoperfy specifically so that event teams never field a hotel-related call.",
      },
      {
        title: '"We tried hotel partnerships before and they caused support issues"',
        description:
          "Because those partnerships put the support burden on you. Hoperfy doesn't. Every delegate email, every complaint, every overbooking dispute goes to our team. You're not looped in unless you want to be.",
      },
      {
        title: '"Our operations team is already at capacity"',
        description:
          "That's exactly why Hoperfy exists. Hotel coordination eats hours your team doesn't have — chasing contracts, fielding booking questions, fixing problems that go wrong. Hoperfy removes that entire workload. It doesn't add to it.",
      },
      {
        title: '"We don\'t prioritise hotel proposals right now"',
        description:
          "We don't need your team's time to set this up. One call, we handle everything. You send your attendees one link. That's the full extent of the ask — and your attendees stop booking through Booking.com from that moment.",
      },
      {
        title: 'Your attendees are spending thousands on hotels you never see',
        description:
          'For a 500-person event, attendees typically spend €80,000–€150,000 on accommodation. Right now, that revenue goes to Booking.com or Expedia. Hoperfy lets you capture it — for free.',
      },
    ],
    featuresHeadline: 'White-label hotel booking software built for event teams',
    featuresList: [
      {
        title: 'Fully white-labelled booking page',
        description:
          'Your logo, your brand, your domain. Attendees book hotels without ever leaving your event experience. No Booking.com redirects, no third-party branding.',
      },
      {
        title: 'We contract the hotels — you do nothing',
        description:
          'Hoperfy negotiates and contracts hotels directly on your behalf. No paperwork, no rate negotiations, no emails to hotel sales managers. We handle the entire hotel relationship so your team never has to.',
      },
      {
        title: '2,000,000+ properties worldwide',
        description:
          'Hoperfy has access to over two million hotel properties across practically every country in the world. Whatever your event location — major city, remote destination, or anywhere in between — we have hotels covered.',
      },
      {
        title: 'Real-time room block tracking',
        description:
          'See live pickup against your contracted blocks. Know exactly where you stand before the cutoff date — no spreadsheets, no chasing hotel contacts.',
      },
      {
        title: 'Automated rooming list exports',
        description:
          'One-click exports in the exact format each hotel needs. No more reformatting spreadsheets the night before the event.',
      },
      {
        title: 'Full delegate customer service by Hoperfy',
        description:
          'Every delegate question, complaint, change, and cancellation is handled by Hoperfy directly. Your team is never in the middle.',
      },
      {
        title: 'Cancellations, changes, and disputes managed for you',
        description:
          'Overbooked hotel? Delegate wants to change dates? Payment issue? Hoperfy resolves it end-to-end with the hotel and the delegate. You hear about it only if you want to.',
      },
      {
        title: 'Payments and refunds handled by Hoperfy',
        description:
          'We collect payments, process refunds, and handle disputes on your behalf. You get clean revenue reporting with none of the back-and-forth.',
      },
      {
        title: 'Live in 5 minutes',
        description:
          'Managed setup by our team. You share your event details and hotel contracts in one call. We build and launch the booking page. No dev work, no technical setup.',
      },
    ],
    howItWorksHeadline: 'Set up your event hotel booking in 5 minutes',
    steps: [
      {
        title: 'One call with our team',
        description:
          "Tell us your event details and location. Hoperfy handles all hotel contracting and negotiations directly — you don't need existing hotel relationships or contracts.",
      },
      {
        title: 'We build your hotel booking page',
        description:
          'Hoperfy creates a branded hotel booking page for your event — your logo, your hotels, your rates. Live within 5 minutes.',
      },
      {
        title: 'You send one link. We handle the rest.',
        description:
          'Share the link with your attendees. Hoperfy manages every booking, every question, every problem. Your team never touches a hotel query again.',
      },
    ],
    stats: [
      { value: 'Free', label: 'hotel booking setup and management' },
      { value: '2M+', label: 'hotel properties worldwide' },
      { value: '0', label: 'hotel support calls for your team' },
    ],
  },
  'ticketing-for-events': {
    _id: 'ticketing-for-events',
    title: 'Ticketing for Events',
    slug: 'ticketing-for-events',
    tagline: 'Multi-platform ticket sales for event teams',
    description:
      'Sell across every channel without losing track of who bought what. One dashboard, unified reporting, and payouts that actually make sense.',
    features: [
      'Sell across web, app, and partner channels',
      'Dynamic pricing and capacity controls',
      'Unified attendee data across platforms',
      'Instant payouts with no hidden fees',
      'QR check-in and access management',
    ],
    fullFeatures: [
      'Free for free events — no fees whatsoever',
      '2% platform fee per paid ticket (Full Suite) or 2.5% separately',
      '1.5%–2.9% payment processing fee (Stripe)',
      'Use our payment gateway or connect your own',
      'Multi-channel ticket sales from one dashboard',
      'Sell from your own site and partner platforms',
      'Dynamic pricing and capacity controls',
      'Early bird and tiered pricing',
      'Multiple ticket types per event',
      'Unified attendee data across all channels',
      'Instant payouts as tickets sell',
      'QR check-in and access management',
      'Scanner app for door management',
      'Announcements to all attendees',
      'Invoicing and receipt generation',
      'Real-time sales dashboard',
      'Managed setup by our team',
      'Live in 5 minutes',
    ],
    stat: { value: '3x', label: 'faster setup vs. legacy platforms' },
    heroHeadline: 'See exactly what your ticketing platform is keeping',
    heroSubtitle:
      'Every paid ticket carries a percentage fee and a settlement delay. Move the sliders to see what that costs you — and what you would keep with Hoperfy.',
    heroCta: 'Get early access',
    problemHeadline: '',
    problems: [],
    featuresHeadline: 'Everything included',
    featuresList: [
      {
        title: 'Multi-channel ticket sales',
        description:
          'Sell from your own website, partner platforms and resellers at the same time. One inventory, all channels, zero overselling.',
      },
      {
        title: 'Dynamic pricing and capacity',
        description:
          'Early bird rates, price tiers and capacity limits that update automatically. No manual changes, no spreadsheet tracking.',
      },
      {
        title: 'Unified attendee data',
        description:
          'Every sale from every channel lands in one dashboard. Who bought, when, where and how much they paid — in real time, and it is yours.',
      },
      {
        title: 'Instant payouts',
        description:
          'Revenue hits your account as tickets sell. No settlement cycles, no chasing the platform for your own money.',
      },
      {
        title: 'QR check-in and access control',
        description:
          'Fast door management that works offline, handles high volume, and gives your team real-time entry counts.',
      },
      {
        title: 'Hotel booking layer',
        description:
          'Attendees book rooms from your event page across 2M+ properties. You earn commission instead of answering emails.',
      },
    ],
    howItWorksHeadline: 'From setup to sold out',
    steps: [
      {
        title: 'Tell us about your event',
        description:
          'Share your event details, ticket types, and pricing. Our team sets everything up — you do not configure anything.',
      },
      {
        title: 'Get your branded ticket sales page',
        description:
          'We build your ticketing setup in your brand. Your logo, your design, ready to go live in 5 minutes.',
      },
      {
        title: 'Start selling and get paid instantly',
        description:
          'Share the link, connect your channels, and watch tickets sell. Revenue hits your account in real time.',
      },
    ],
    stats: [
      { value: '2.5%', label: 'flat platform fee on paid tickets' },
      { value: '0 days', label: 'payout delay' },
      { value: '100%', label: 'attendee data ownership' },
    ],
  },
}
