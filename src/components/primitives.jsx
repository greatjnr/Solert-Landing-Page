import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion, useScroll, useTransform } from 'motion/react'

/* Shared motion language: 0.7–0.9s, expo-out, 60–80ms stagger, once only */
export const EASE = [0.22, 1, 0.36, 1]
export const cn = (...a) => a.filter(Boolean).join(' ')

export function useIsMobile() {
  const [m, setM] = useState(false)
  useEffect(() => {
    const q = window.matchMedia('(max-width: 767px)')
    const f = () => setM(q.matches)
    f()
    q.addEventListener('change', f)
    return () => q.removeEventListener('change', f)
  }, [])
  return m
}

/* ───────────── Reveal ───────────── */
export function Reveal({ as = 'div', children, delay = 0, y = 32, amount = 0.25, className, ...rest }) {
  const reduce = useReducedMotion()
  const Tag = motion[as]
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.8, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </Tag>
  )
}

/* ───────────── SplitText: masked word reveal ─────────────
   accent    – substring to style (accentClass) and optionally decorate
   underline – 'stroke' (animated line under the last accent word)
               'highlight' (accent fill behind accent words, dark text on top) */
export function SplitText({
  text,
  as: Tag = 'span',
  className,
  accent,
  accentClass = '',
  underline,
  delay = 0,
  stagger = 0.07,
  immediate = false,
  id,
}) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const inView = useInView(ref, { once: true, amount: 0.25 })
  const show = immediate || inView

  const parts = []
  const at = accent ? text.indexOf(accent) : -1
  if (at >= 0) {
    if (at > 0) parts.push({ t: text.slice(0, at), a: false })
    parts.push({ t: accent, a: true })
    const rest = text.slice(at + accent.length)
    if (rest.trim()) parts.push({ t: rest, a: false })
  } else {
    parts.push({ t: text, a: false })
  }

  let i = 0
  return (
    <Tag ref={ref} id={id} className={className} aria-label={text}>
      {parts.map((p, pi) => {
        const words = p.t.trim().split(/\s+/)
        return (
          <span key={pi} aria-hidden="true" className={p.a ? accentClass : undefined}>
            {words.map((w, wi) => {
              const k = i++
              const d = delay + k * stagger
              const last = p.a && wi === words.length - 1
              return (
                <span key={wi}>
                  <span className="relative inline-block isolate align-bottom">
                    <span className="-my-[0.1em] -mr-[0.05em] inline-block overflow-hidden py-[0.1em] pr-[0.05em] align-bottom">
                      <motion.span
                        className="inline-block"
                        initial={{ y: reduce ? 0 : '115%', opacity: reduce ? 0 : 1 }}
                        animate={show ? { y: 0, opacity: 1 } : undefined}
                        transition={{ duration: 0.9, ease: EASE, delay: d }}
                      >
                        {w}
                      </motion.span>
                    </span>
                    {p.a && underline === 'highlight' && (
                      <motion.span
                        aria-hidden="true"
                        className="absolute inset-x-[-0.04em] bottom-[0.08em] -z-10 h-[0.36em] origin-left bg-accent"
                        initial={{ scaleX: reduce ? 1 : 0 }}
                        animate={show ? { scaleX: 1 } : undefined}
                        transition={{ duration: 0.9, ease: EASE, delay: d + 0.5 }}
                      />
                    )}
                    {last && underline === 'stroke' && (
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 200 14"
                        preserveAspectRatio="none"
                        className="pointer-events-none absolute -bottom-[0.06em] left-0 h-[0.2em] w-full overflow-visible"
                      >
                        <motion.path
                          d="M3 9 C 45 2, 95 13, 140 6 S 188 4, 197 8"
                          fill="none"
                          stroke="#14F195"
                          strokeWidth="5"
                          strokeLinecap="round"
                          initial={{ pathLength: reduce ? 1 : 0 }}
                          animate={show ? { pathLength: 1 } : undefined}
                          transition={{ duration: 1.1, ease: EASE, delay: d + 0.45 }}
                        />
                      </svg>
                    )}
                  </span>{' '}
                </span>
              )
            })}
          </span>
        )
      })}
    </Tag>
  )
}

/* ───────────── Parallax: transform-only, scroll-linked ─────────────
   from / to are translateY percentages of the element's own height.
   Disabled for reduced motion, softened on mobile. */
export function Parallax({
  children,
  from = -10,
  to = 15,
  className,
  offset = ['start end', 'end start'],
}) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const mobile = useIsMobile()
  const { scrollYProgress } = useScroll({ target: ref, offset })
  const k = reduce ? 0 : mobile ? 0.4 : 1
  const y = useTransform(scrollYProgress, [0, 1], [`${from * k}%`, `${to * k}%`])
  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }} className="h-full will-change-transform">
        {children}
      </motion.div>
    </div>
  )
}

/* ───────────── ImageSlot: swappable image with labelled placeholder ─────────────
   slot = { src, alt, label } from src/data/images.js. If the file is missing or
   fails to load, the placeholder stays visible. */
export function ImageSlot({
  slot,
  fallbackLabel = 'Image',
  ratio = '4 / 3',
  className = '',
  rounded = 'rounded-2xl',
  tone = 'dark',
  priority = false,
  reveal = true,
}) {
  const reduce = useReducedMotion()
  const boxRef = useRef(null)
  const inView = useInView(boxRef, { once: true, amount: 0.2 })
  const [status, setStatus] = useState(slot?.src ? 'loading' : 'empty')
  const label = slot?.label || fallbackLabel

  const wrapV = reduce
    ? { hidden: { opacity: 0 }, show: { opacity: 1 } }
    : { hidden: { clipPath: 'inset(0 0 100% 0)' }, show: { clipPath: 'inset(0 0 0% 0)' } }
  const imgV = reduce ? { hidden: {}, show: {} } : { hidden: { scale: 1.08 }, show: { scale: 1 } }
  const t = { duration: 1, ease: EASE }

  const inner = (
    <>
      {status !== 'ok' && (
        <div
          className={cn(
            'absolute inset-0 flex flex-col items-center justify-center gap-2 p-4 text-center',
            tone === 'dark' ? 'ph-dark text-white/60' : 'ph-light text-text/55',
          )}
        >
          <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="16" rx="3" />
            <circle cx="9" cy="10" r="1.6" />
            <path d="m4 18 5-5 4 4 3-3 4 4" />
          </svg>
          <span className="text-xs font-medium leading-snug">{label}</span>
          {slot?.src && <code className="break-all text-[0.62rem] opacity-70">{slot.src}</code>}
        </div>
      )}
      {slot?.src && (
        <motion.img
          variants={reveal ? imgV : undefined}
          transition={t}
          src={slot.src}
          alt={slot.alt || ''}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={() => setStatus('ok')}
          onError={() => setStatus('error')}
          className={cn(
            'absolute inset-0 h-full w-full object-cover',
            status === 'ok' ? 'opacity-100' : 'opacity-0',
          )}
        />
      )}
    </>
  )

  const cls = cn('relative overflow-hidden', rounded, className)
  const style = { aspectRatio: ratio }

  if (!reveal) {
    return (
      <div className={cls} style={style}>
        {inner}
      </div>
    )
  }
  // The observed element must NOT be clipped (a fully clipped element never
  // counts as "in view"), so observe the outer box and clip the inner one.
  return (
    <div ref={boxRef} className={cn('relative', rounded, className)} style={style}>
      <motion.div
        className={cn('absolute inset-0 overflow-hidden', rounded)}
        variants={wrapV}
        initial="hidden"
        animate={inView ? 'show' : 'hidden'}
        transition={t}
      >
        {inner}
      </motion.div>
    </div>
  )
}

/* ───────────── PhoneFrame: device chrome around a screenshot slot ───────────── */
export function PhoneFrame({ slot, fallbackLabel = 'Screenshot', className = '', priority = false }) {
  return (
    <div
      className={cn(
        'relative rounded-[2.2rem] bg-[#050706] p-[7px] ring-1 ring-white/15 shadow-[0_30px_70px_-25px_rgba(0,0,0,0.65)]',
        className,
      )}
    >
      <ImageSlot
        slot={slot}
        fallbackLabel={fallbackLabel}
        ratio="9 / 19.5"
        rounded="rounded-[1.75rem]"
        priority={priority}
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[15px] h-[17px] w-[58px] -translate-x-1/2 rounded-full bg-black"
      />
    </div>
  )
}

/* ───────────── Eyebrow ───────────── */
export function Eyebrow({ children, className = '' }) {
  return (
    <Reveal
      as="p"
      y={16}
      className={cn(
        'flex items-center gap-3 text-[0.72rem] font-medium uppercase tracking-[0.24em]',
        className,
      )}
    >
      <span aria-hidden="true" className="size-2 bg-accent" />
      {children}
    </Reveal>
  )
}

/* ───────────── Button ───────────── */
export function Button({ href, children, variant = 'primary', external = false, className = '' }) {
  const base =
    'group inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full px-6 text-[0.95rem] font-medium tracking-tight transition-all duration-300 ease-out-expo hover:-translate-y-0.5 active:translate-y-0'
  const variants = {
    primary: 'bg-accent text-text hover:bg-surface',
    ghost: 'text-surface ring-1 ring-inset ring-white/30 hover:bg-white/10 hover:ring-white/60',
  }
  const ext = external ? { target: '_blank', rel: 'noopener noreferrer' } : {}
  return (
    <a href={href} className={cn(base, variants[variant], className)} {...ext}>
      {children}
    </a>
  )
}

export function ArrowIcon({ className = '', dir = 'down' }) {
  const rot = { down: 0, up: 180, right: -90, upright: -135 }[dir] ?? 0
  return (
    <svg
      aria-hidden="true"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={{ transform: `rotate(${rot}deg)` }}
    >
      <path d="M8 2.5v11M3.5 9 8 13.5 12.5 9" />
    </svg>
  )
}
