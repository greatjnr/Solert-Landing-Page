import { content } from '../data/content'
import { images } from '../data/images'
import { Eyebrow, ImageSlot, Parallax, Reveal, SplitText } from './primitives'

export default function About() {
  const { about: a } = content

  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="relative z-30 -mt-16 rounded-t-[2.5rem] bg-sand pb-28 pt-28 text-text md:-mt-24 md:rounded-t-[4rem] md:pb-44 md:pt-40"
    >
      <div className="mx-auto grid max-w-7xl gap-14 px-5 md:px-10 lg:grid-cols-12 lg:gap-10">
        {/* Left: sticky heading on desktop, stacked on mobile */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <Eyebrow>{a.eyebrow}</Eyebrow>
            <SplitText
              as="h2"
              id="about-title"
              text={a.heading}
              accent={a.accent}
              accentClass="italic"
              underline="highlight"
              className="h-xl mt-6 block"
            />
          </div>
        </div>

        {/* Right: paragraphs and image */}
        <div className="lg:col-span-6 lg:col-start-7">
          <Reveal as="p" className="font-display text-2xl font-light leading-snug tracking-tight md:text-3xl">
            {a.p1}
          </Reveal>

          <Parallax from={-6} to={8} className="my-14 md:my-20">
            <ImageSlot
              slot={images.about}
              fallbackLabel="About image"
              ratio="16 / 10"
              rounded="rounded-3xl"
              tone="light"
            />
          </Parallax>

          <Reveal as="p" className="max-w-xl text-lg leading-relaxed text-text/80">
            {a.p2.map((part, i) =>
              part.href ? (
                <a
                  key={i}
                  href={part.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium underline decoration-2 underline-offset-4 transition-colors duration-300 hover:bg-accent"
                >
                  {part.text}
                </a>
              ) : (
                <span key={i}>{part.text}</span>
              ),
            )}
          </Reveal>
        </div>
      </div>
    </section>
  )
}
