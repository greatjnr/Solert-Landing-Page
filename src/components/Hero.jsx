import { motion } from 'motion/react'
import { content } from '../data/content'
import { images } from '../data/images'
import {
  ArrowIcon,
  Button,
  ImageSlot,
  Parallax,
  PhoneFrame,
  Reveal,
  SplitText,
} from './primitives'

const HERO_OFFSET = ['start start', 'end start']

export default function Hero() {
  const { hero } = content

  // floating cards: each drifts at its own speed / direction
  const floats = [
    { pos: 'left-0 top-[14%] w-36 sm:w-44 lg:-left-10 lg:w-52', from: -30, to: 55 },
    { pos: 'right-0 top-[46%] w-36 sm:w-44 lg:-right-8 lg:w-52', from: 40, to: -35 },
    { pos: 'bottom-[3%] left-3 w-32 sm:w-40 lg:left-2 lg:w-44', from: 0, to: 90 },
  ]

  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className="relative z-0 flex min-h-[100svh] items-center bg-ink pb-60 pt-32 text-surface md:pb-72"
    >
      <div className="mx-auto grid w-full max-w-7xl items-center gap-16 px-5 md:px-10 lg:grid-cols-12 lg:gap-8">
        {/* Copy */}
        <Parallax className="lg:col-span-7" from={0} to={8} offset={HERO_OFFSET}>
          <SplitText
            as="h1"
            id="hero-title"
            text={hero.headline}
            accent={hero.accent}
            accentClass="italic text-accent"
            underline="stroke"
            className="h-mega"
            immediate
            delay={0.15}
          />
          <Reveal as="p" delay={0.9} className="mt-8 max-w-xl text-lg leading-relaxed text-surface/70 md:text-xl">
            {hero.subtext}
          </Reveal>
          <Reveal delay={1.05} className="mt-10 flex flex-wrap gap-3">
            {hero.buttons.map((b) => (
              <Button key={b.label} href={b.href} variant={b.variant}>
                {b.label}
                {b.variant === 'primary' ? (
                  <ArrowIcon className="transition-transform duration-300 group-hover:translate-y-0.5" />
                ) : (
                  <ArrowIcon dir="upright" className="transition-transform duration-300 group-hover:translate-x-0.5" />
                )}
              </Button>
            ))}
          </Reveal>
        </Parallax>

        {/* Visual */}
        <div className="relative mx-auto w-full max-w-[22rem] lg:col-span-5 lg:max-w-none">
          {/* flat disc behind the phone */}
          <Parallax
            from={-6}
            to={10}
            offset={HERO_OFFSET}
            className="pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[92%] -translate-x-1/2 -translate-y-1/2 lg:w-[104%]"
          >
            <div aria-hidden="true" className="size-full rounded-full bg-accent" />
          </Parallax>

          <Parallax from={-4} to={8} offset={HERO_OFFSET} className="relative mx-auto w-[min(62vw,16.5rem)] lg:w-[19rem]">
            <PhoneFrame slot={images.heroPhone} fallbackLabel="Hero phone" priority />
          </Parallax>

          {floats.map((f, i) => (
            <Parallax
              key={i}
              from={f.from}
              to={f.to}
              offset={HERO_OFFSET}
              className={`absolute z-20 ${f.pos}`}
            >
              <ImageSlot
                slot={images.heroCards[i]}
                fallbackLabel={`Floating card ${i + 1}`}
                ratio="5 / 3"
                className="shadow-[0_24px_50px_-20px_rgba(0,0,0,0.7)] ring-1 ring-white/20"
                priority
              />
            </Parallax>
          ))}
        </div>
      </div>

      {/* scroll cue */}
      <div
        aria-hidden="true"
        className="absolute bottom-24 left-5 hidden h-14 w-px overflow-hidden bg-white/15 sm:block md:left-10"
      >
        <motion.span className="cue-dot block h-5 w-px bg-accent" />
      </div>
    </section>
  )
}
