/**
 * IMAGE SLOTS — every picture on the page is configured here.
 *
 * To swap a placeholder for a real image:
 *   1. Drop your file into /public/images/ using the filename below
 *      (or change `file` to match your own filename / a full https:// URL).
 *   2. That's it. Until the file exists, a labelled placeholder is shown.
 *
 * Tips
 *   • Phone screenshots: use the plain screen capture (no device frame).
 *     The site adds the phone frame. Aspect ≈ 9 : 19.5 (e.g. 1080 × 2340).
 *   • Card shots (hero floating cards): crop to ≈ 5 : 3.
 *   • Feature previews: see the `ratio` noted in each label.
 */

const slot = (file, alt, label) => ({
  src: file.startsWith("http") ? file : `/images/${file}`,
  alt,
  label,
});

export const images = {
  // Hero — main phone, 9 : 19.5
  logo: slot("logo.png", "Solert logo", "Logo mark"),
  heroPhone: slot(
    "hero-phone.png",
    "The Solert app showing a feed of Solana opportunities",
    "Hero phone — feed screenshot",
  ),

  // Hero — three floating cards, 5 : 3
  heroCards: [
    slot(
      "hero-card-1.png",
      "An airdrop opportunity card in Solert",
      "Floating card 1",
    ),
    slot(
      "hero-card-2.png",
      "A rewards opportunity card in Solert",
      "Floating card 2",
    ),
    slot(
      "hero-card-3.png",
      "An event opportunity card in Solert",
      "Floating card 3",
    ),
  ],

  // Card that hangs across the hero → features boundary, 5 : 6
  bridge: slot(
    "bridge-card.png",
    "A Solert alert for an expiring opportunity",
    "Bridge card — alert preview",
  ),

  // Features — keyed by the `id` of each item in content.js
  features: {
    "real-opportunities": slot(
      "feature-real-opportunities.png",
      "Solert feed listing verified Solana opportunities",
      "Real opportunities — in-app preview (4:3)",
    ),
    "matched-to-you": slot(
      "feature-matched-to-you.png",
      "Solert interest picker with followed projects and categories",
      "Matched to you — in-app preview (1:1)",
    ),
    "non-custodial": slot(
      "feature-non-custodial.png",
      "Solert read-only wallet connection screen",
      "Non-custodial — in-app preview (4:5)",
    ),
  },

  // How it works — row of app screens, 9 : 19.5. Add or remove freely (3–4 look best).
  screens: [
    slot(
      "screen-1.png",
      "Solert wallet connection screen",
      "Screen 1 — Connect",
    ),
    slot(
      "screen-2.png",
      "Solert screen for choosing categories and projects",
      "Screen 2 — Pick",
    ),
    slot(
      "screen-3.png",
      "Solert personalized opportunity feed",
      "Screen 3 — Feed",
    ),
    slot(
      "screen-4.png",
      "Solert alert before an opportunity expires",
      "Screen 4 — Alerts",
    ),
  ],

  // About — wide editorial image, 16 : 10
  about: slot("about.jpg", "Solert Lab", "About — studio or product image"),
};
