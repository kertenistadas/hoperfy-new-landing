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
      'Live within 24-48 hours',
    ],
    stat: { value: '40%', label: 'more hotel revenue per event' },
    heroHeadline: 'Your attendees are already booking hotels. Zero extra work for your team.',
    heroSubtitle:
      'For a 500-person event, attendees typically spend €80,000–€150,000 on accommodation — through Booking.com, not through you. Hoperfy gives your event its own hotel booking page, free, and handles everything so your team never has to.',
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
    featuresHeadline: 'What your attendees get. What your team never has to deal with.',
    featuresList: [
      {
        title: 'Fully white-labelled booking page',
        description:
          'Your logo, your brand, your domain. Attendees book hotels without ever leaving your event experience. No Booking.com redirects, no third-party branding.',
      },
      {
        title: 'Negotiated rate management',
        description:
          "Upload your contracted hotel rates or let Hoperfy source them. Your attendees see exclusive event rates — not the public prices they'd find on their own.",
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
        title: 'Live in 24–48 hours',
        description:
          'Managed setup by our team. You share your event details and hotel contracts in one call. We build and launch the booking page. No dev work, no technical setup.',
      },
    ],
    howItWorksHeadline: 'One conversation. Then we handle everything.',
    steps: [
      {
        title: 'One call with our team',
        description:
          "Tell us about your event, your hotels, and your attendees. That's it. No forms, no long onboarding, no technical setup on your side.",
      },
      {
        title: 'We build your hotel booking page',
        description:
          'Hoperfy creates a branded hotel booking page for your event — your logo, your hotels, your rates. Live within 24–48 hours.',
      },
      {
        title: 'You send one link. We handle the rest.',
        description:
          'Share the link with your attendees. Hoperfy manages every booking, every question, every problem. Your team never touches a hotel query again.',
      },
    ],
    stats: [
      { value: 'Free', label: 'hotel booking setup and management' },
      { value: '24hrs', label: 'average time to go live' },
      { value: '0', label: 'hotel support calls for your team' },
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
    fullFeatures: [
      'Multi-channel ticket sales',
      'Sell from your own site and partner platforms',
      'Dynamic pricing and capacity controls',
      'Early bird and tiered pricing',
      'Unified attendee data across all channels',
      'Instant payouts as tickets sell',
      'QR check-in and access management',
      'Real-time sales dashboard',
      'Managed setup by our team',
      'Live within 24-48 hours',
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
