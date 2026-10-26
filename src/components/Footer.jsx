import { content, links } from '../data/content'
import { ArrowIcon, Reveal, SplitText } from './primitives'

export default function Footer() {
  const { footer: f, ui } = content

  return (
    <footer
      id="contact"
      className="relative z-40 -mt-16 flex min-h-[75svh] flex-col justify-between rounded-t-[2.5rem] bg-ink px-5 pb-8 pt-24 text-surface md:-mt-24 md:rounded-t-[4rem] md:px-10 md:pt-32"
    >
      <div className="mx-auto w-full max-w-7xl">
        <SplitText
          as="p"
          text={f.tagline}
          accent={f.accent}
          accentClass="italic text-accent"
          className="h-xl block max-w-5xl"
        />
      </div>

      <div className="mx-auto mt-24 w-full max-w-7xl">
        <div className="grid items-end gap-10 border-t border-white/15 pt-8 md:grid-cols-12">
          <Reveal className="md:col-span-5">
            <a
              href={links.mailto}
              className="inline-flex min-h-11 items-center break-all font-display text-2xl font-light tracking-tight text-accent underline decoration-accent/40 underline-offset-8 transition-colors duration-300 hover:decoration-accent md:text-3xl"
            >
              {links.email}
            </a>
          </Reveal>

          <Reveal delay={0.07} className="md:col-span-4">
            <ul className="flex flex-wrap gap-x-6 gap-y-1">
              {f.links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center text-surface/75 transition-colors duration-300 hover:text-accent"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          <div className="flex items-end justify-between gap-6 md:col-span-3 md:justify-end">
            <a
              href="#hero"
              aria-label={ui.backToTop}
              className="group flex size-14 shrink-0 items-center justify-center rounded-full bg-accent text-text transition-all duration-300 ease-out-expo hover:-translate-y-1 hover:bg-surface md:order-2 md:ml-6"
            >
              <ArrowIcon dir="up" className="transition-transform duration-300 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>

        <p className="mt-10 text-sm text-surface/55">{f.copyright}</p>
      </div>
    </footer>
  )
}
