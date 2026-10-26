import { content } from '../data/content'
import { images } from '../data/images'
import { Eyebrow, ImageSlot, Parallax, Reveal, SplitText } from './primitives'

// Asymmetric layouts; they repeat every three items so the array can keep growing.
const layouts = [
  {
    text: 'lg:order-1 lg:col-span-5',
    media: 'lg:order-2 lg:col-span-7',
    ratio: '4 / 3',
    wrap: '',
  },
  {
    text: 'lg:order-2 lg:col-span-4 lg:col-start-9',
    media: 'lg:order-1 lg:col-span-6 lg:col-start-2',
    ratio: '1 / 1',
    wrap: 'lg:mt-24',
  },
  {
    text: 'lg:order-1 lg:col-span-5 lg:col-start-2',
    media: 'lg:order-2 lg:col-span-5 lg:col-start-8',
    ratio: '4 / 5',
    wrap: 'lg:-mt-4',
  },
]

export default function Features() {
  const { features: f } = content

  return (
    <section
      id="features"
      aria-labelledby="features-title"
      className="relative z-10 -mt-16 rounded-t-[2.5rem] bg-surface pb-28 pt-28 text-text md:-mt-24 md:rounded-t-[4rem] md:pb-44 md:pt-44"
    >
      {/* card that hangs across the hero boundary */}
      <Parallax
        from={-20}
        to={30}
        className="absolute -top-36 right-6 z-20 w-40 sm:w-48 md:-top-44 md:right-[22%] md:w-60"
      >
        <ImageSlot
          slot={images.bridge}
          fallbackLabel="Bridge card"
          ratio="5 / 6"
          className="shadow-[0_30px_60px_-24px_rgba(0,0,0,0.55)] ring-1 ring-black/10"
        />
      </Parallax>

      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <div className="grid items-end gap-x-10 gap-y-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Eyebrow>{f.eyebrow}</Eyebrow>
            <SplitText
              as="h2"
              id="features-title"
              text={f.heading}
              accent={f.accent}
              accentClass="italic"
              underline="highlight"
              className="h-xl mt-6 block"
            />
          </div>
          <Reveal as="p" delay={0.15} className="max-w-md text-lg leading-relaxed text-text/75 lg:col-span-4 lg:pb-3">
            {f.lead}
          </Reveal>
        </div>

        <ul className="mt-24 space-y-24 md:mt-32 lg:space-y-36">
          {f.items.map((item, i) => {
            const l = layouts[i % layouts.length]
            return (
              <li key={item.id} className="grid items-center gap-10 lg:grid-cols-12 lg:gap-x-10">
                <div className={l.text}>
                  <Reveal as="p" className="text-sm tabular-nums tracking-[0.2em] text-text/50">
                    {String(i + 1).padStart(2, '0')}
                  </Reveal>
                  <Reveal as="h3" delay={0.07} className="h-lg mt-4">
                    {item.title}
                  </Reveal>
                  <Reveal
                    as="p"
                    delay={0.14}
                    className="mt-5 max-w-md border-t border-text/15 pt-5 text-lg leading-relaxed text-text/75"
                  >
                    {item.body}
                  </Reveal>
                </div>

                <Parallax from={-6} to={10} className={`${l.media} ${l.wrap}`}>
                  <ImageSlot
                    slot={images.features[item.id]}
                    fallbackLabel={`${item.title} — in-app preview`}
                    ratio={l.ratio}
                    rounded="rounded-3xl"
                    tone="light"
                    className="shadow-[0_30px_60px_-30px_rgba(17,17,17,0.35)] transition-transform duration-500 ease-out-expo hover:-translate-y-1"
                  />
                </Parallax>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
