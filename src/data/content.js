/**
 * ALL COPY LIVES HERE. Source of truth: "Solert Website Content" guide.
 * Edit text in this file only; components just render it.
 */

export const links = {
  privacy: 'https://solertlab.github.io/solert-legal/privacy.html',
  terms: 'https://solertlab.github.io/solert-legal/terms.html',
  email: 'solertapp@gmail.com',
  mailto: 'mailto:solertapp@gmail.com',
}

export const content = {
  brand: 'Solert',

  nav: [
    { label: 'Features', href: '#features' },
    { label: 'How it works', href: '#how-it-works' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ],

  hero: {
    headline: 'Never miss an opportunity on Solana.',
    accent: 'on Solana.',
    subtext:
      'Airdrops, token launches, rewards and events appear and vanish in hours, scattered across dozens of feeds. Solert watches for you — and surfaces the ones that matter.',
    buttons: [
      { label: 'See how it works', href: '#how-it-works', variant: 'primary' },
      { label: 'Get in touch', href: links.mailto, variant: 'ghost' },
    ],
  },

  features: {
    eyebrow: 'WHAT SOLERT DOES',
    heading: 'Opportunities, not noise',
    accent: 'not noise',
    lead: 'Solert pulls real opportunities from across the Solana ecosystem, filters out the noise, and matches what’s left to what you follow and what you hold.',
    // Append a new object to add a feature. `id` is also the key used in
    // src/data/images.js → features. Layouts repeat every three items.
    items: [
      {
        id: 'real-opportunities',
        title: 'Real opportunities',
        body: 'Airdrops, rewards, events and launches from across Solana — gathered, verified, and surfaced before the window closes.',
      },
      {
        id: 'matched-to-you',
        title: 'Matched to you',
        body: 'Follow the projects and categories you care about. Solert tailors your feed to your interests and your on-chain holdings.',
      },
      {
        id: 'non-custodial',
        title: 'Non-custodial',
        body: 'Connect your wallet in one tap — read-only. No seed phrase, no private keys, and Solert never moves your funds.',
      },
    ],
  },

  how: {
    eyebrow: 'HOW IT WORKS',
    heading: 'Three steps to never missing out',
    accent: 'never missing out',
    steps: [
      {
        n: '1',
        label: 'Step 1',
        title: 'Connect read-only',
        body: 'Approve a read-only connection in your own wallet using the Solana Mobile Wallet Adapter. No seed phrase ever leaves your wallet.',
      },
      {
        n: '2',
        label: 'Step 2',
        title: 'Pick what matters',
        body: 'Choose the categories and projects you follow. Solert combines that with the tokens you already hold.',
      },
      {
        n: '3',
        label: 'Step 3',
        title: 'Catch every opportunity',
        body: 'Get a clean, personalized feed of opportunities — and alerts before they expire.',
      },
    ],
  },

  about: {
    eyebrow: 'ABOUT',
    heading: 'Built by Solert Lab',
    accent: 'Solert Lab',
    p1: 'Solert Lab builds tools that help people stay ahead in the Solana ecosystem. Solert is our first app — a focused, non-custodial way to discover the opportunities most people miss simply because they never see them in time.',
    // Paragraph 2 is split into parts so the two links can sit inline.
    p2: [
      {
        text: 'We built Solert for mobile, for the Solana Seeker, and on top of the Solana Mobile Stack. It is read-only and privacy-respecting by design: we never ask for your keys, and we collect as little as possible. Read our ',
      },
      { text: 'Privacy Policy', href: links.privacy },
      { text: ' and ' },
      { text: 'Terms of Use', href: links.terms },
      { text: '.' },
    ],
  },

  footer: {
    tagline: 'Never miss an opportunity on Solana.',
    accent: 'on Solana.',
    copyright: '© 2026 Solert Lab. Built on the Solana Mobile Stack.',
    links: [
      { label: 'Privacy Policy', href: links.privacy },
      { label: 'Terms of Use', href: links.terms },
    ],
  },

  // Minimal UI strings that the guide doesn't cover (aria labels etc.)
  ui: {
    skip: 'Skip to content',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    mainNav: 'Main',
    backToTop: 'Back to top',
    screensLabel: 'App screenshots',
  },
}
