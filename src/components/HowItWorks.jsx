import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useScroll, useTransform } from 'motion/react'
import { content } from '../data/content'
import { images } from '../data/images'
import { Eyebrow, Parallax, PhoneFrame, Reveal, SplitText } from './primitives'

const STEP_DROP = 80 // px each step sits lower than the previous one (md+)

/* Curved connector from one numeral to the next; draws with scroll progress */
function Connector({ progress }) {
  const ref = useRef(null)
  const [w, setW] = useState(0)
  const dot = useTransform(progress, [0.92, 1], [0, 1])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ro = new ResizeObserver(([e]) => setW(e.contentRect.width))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const d = `M0 0 C ${w * 0.55} 0, ${w * 0.45} ${STEP_DROP}, ${w} ${STEP_DROP}`
  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute hidden md:block"
      style={{
        top: 'calc(var(--num) * 0.4)',
        left: 'calc(var(--num) * 0.66 + 0.75rem)',
        width: 'calc(100% + 2.5rem - var(--num) * 0.66 - 1.25rem)',
        height: STEP_DROP,
      }}
    >
      <svg width={w} height={STEP_DROP + 8} className="overflow-visible">
        <path d={d} fill="none" stroke="rgba(244,241,234,0.14)" strokeWidth="1.5" />
        <motion.path
          d={d}
          fill="none"
          stroke="#14F195"
          strokeWidth="2"
          strokeLinecap="round"
          style={{ pathLength: progress }}
        />
        <motion.circle cx={w} cy={STEP_DROP} r="4.5" fill="#14F195" style={{ opacity: dot }} />
      </svg>
    </div>
  )
}

function Step({ step, drop, progress }) {
  const ref = useRef(null)
  const lit = useInView(ref, { once: true, amount: 0.6 })
  return (
    <li ref={ref} className="relative md:mt-[var(--drop)]" style={{ '--drop': `${drop}px` }}>
      <div
        aria-hidden="true"
        className="select-none font-display font-light leading-[0.8]"
        style={{
          fontSize: 'var(--num)',
          height: 'calc(var(--num) * 0.8)',
          color: lit ? '#14F195' : 'transparent',
          WebkitTextStroke: '1.5px #14F195',
          transition: 'color 0.9s cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      >
        {step.n}
      </div>
      {progress && <Connector progress={progress} />}
      <div className="mt-8">
        <Reveal as="p" className="text-xs font-medium uppercase tracking-[0.24em] text-accent">
          {step.label}
        </Reveal>
        <Reveal as="h3" delay={0.07} className="h-lg mt-3">
          {step.title}
        </Reveal>
        <Reveal as="p" delay={0.14} className="mt-4 max-w-sm text-lg leading-relaxed text-surface/70">
          {step.body}
        </Reveal>
      </div>
    </li>
  )
}

export default function HowItWorks() {
  const { how: h } = content
  const listRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 75%', 'end 55%'] })
  const seg0 = useTransform(scrollYProgress, [0, 0.5], [0, 1])
  const seg1 = useTransform(scrollYProgress, [0.5, 1], [0, 1])
  const segs = [seg0, seg1]

  return (
    <section
      id="how-it-works"
      aria-labelledby="how-title"
      className="relative z-20 -mt-16 rounded-t-[2.5rem] bg-ink pb-28 pt-28 text-surface md:-mt-24 md:rounded-t-[4rem] md:pb-44 md:pt-40"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <Eyebrow>{h.eyebrow}</Eyebrow>
        <SplitText
          as="h2"
          id="how-title"
          text={h.heading}
          accent={h.accent}
          accentClass="italic text-accent"
          className="h-xl mt-6 block max-w-4xl"
        />

        <ol
          ref={listRef}
          className="relative mt-20 grid gap-16 pl-7 md:mt-28 md:grid-cols-3 md:gap-x-10 md:pl-0"
          style={{ '--num': 'clamp(5.5rem, 13vw, 11rem)' }}
        >
          {/* mobile vertical line */}
          <span aria-hidden="true" className="absolute bottom-2 left-0 top-2 w-px bg-white/15 md:hidden">
            <motion.span
              className="block size-full origin-top bg-accent"
              style={{ scaleY: scrollYProgress }}
            />
          </span>

          {h.steps.map((s, i) => (
            <Step
              key={s.n}
              step={s}
              drop={i * STEP_DROP}
              progress={i < h.steps.length - 1 ? segs[i] : null}
            />
          ))}
        </ol>

        {/* Screens row */}
        <div
          role="region"
          aria-label={content.ui.screensLabel}
          tabIndex={0}
          className="no-scrollbar -mx-5 mt-28 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-10 pt-4 md:mx-0 md:mt-44 md:grid md:grid-cols-4 md:gap-6 md:overflow-visible md:px-0 md:pb-0 md:pt-0"
        >
          {images.screens.map((slot, i) => {
            const speeds = [
              [-6, 10],
              [-14, 4],
              [-4, 14],
              [-12, 8],
            ][i % 4]
            const tops = ['md:mt-0', 'md:mt-14', 'md:mt-5', 'md:mt-20'][i % 4]
            return (
              <Parallax
                key={i}
                from={speeds[0]}
                to={speeds[1]}
                className={`w-[58vw] max-w-[16rem] shrink-0 snap-center md:w-auto md:max-w-none ${tops}`}
              >
                <div className="transition-transform duration-500 ease-out-expo hover:-translate-y-1.5">
                  <PhoneFrame slot={slot} fallbackLabel={`Screen ${i + 1}`} />
                </div>
              </Parallax>
            )
          })}
        </div>
      </div>
    </section>
  )
}
