/**
 * SOLERT — single-page marketing site.
 *
 * Ideas borrowed (and where):
 *  • Awwwards — oversized, tight-tracked editorial type with masked word reveals
 *    (Hero h1, every section heading → <SplitText>).
 *  • Awwwards — "stacked sheets" scroll story: each section slides over the last
 *    with a rounded top edge, and a card hangs across the Hero → Features seam
 *    (Features <Parallax> bridge card; negative margins on every section).
 *  • Awwwards — layered multi-speed parallax: flat accent disc, phone and three
 *    floating cards each drift at their own rate (Hero); staggered screens (How it works).
 *  • Awwwards — scroll-linked line-draw: SVG connectors between numerals
 *    (HowItWorks → <Connector>), outlined numerals that fill as they arrive.
 *  • Awwwards — sticky editorial heading beside long-form copy (About).
 *  • Mobbin — screens presented as a clean row of device-framed screenshots,
 *    with a swipeable snap row on mobile (HowItWorks), and in-context UI
 *    previews beside each feature (Features).
 *
 * Every image is a swappable slot — see src/data/images.js.
 * Every word of copy lives in src/data/content.js.
 */
import Nav from './components/Nav'
import Hero from './components/Hero'
import Features from './components/Features'
import HowItWorks from './components/HowItWorks'
import About from './components/About'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="relative overflow-x-clip bg-ink">
      <Nav />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <About />
      </main>
      <Footer />
    </div>
  )
}
