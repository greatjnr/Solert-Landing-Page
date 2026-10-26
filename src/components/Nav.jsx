import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "motion/react";
import { content } from "../data/content";
import { EASE, cn } from "./primitives";
import { images } from "../data/images";

export function LogoMark({ className = "size-15" }) {
  const [failed, setFailed] = useState(false);
  if (!failed && images.logo?.src) {
    return (
      <img
        src={images.logo.src}
        alt=""
        width="250"
        height="250"
        onError={() => setFailed(true)}
        className={cn(className, "object-contain")}
      />
    );
  }
  return (
    <svg aria-hidden="true" viewBox="0 0 32 32" className={className}>
      <rect width="32" height="32" rx="9" fill="#14F195" />
      <circle cx="16" cy="16" r="3.2" fill="#0B0F0D" />
      <path
        d="M8.5 16a7.5 7.5 0 0 1 7.5-7.5"
        stroke="#0B0F0D"
        strokeWidth="2.4"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M23.5 16a7.5 7.5 0 0 1-7.5 7.5"
        stroke="#0B0F0D"
        strokeWidth="2.4"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export default function Nav() {
  const { nav, brand, ui } = content;
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(null);
  const last = useRef(0);
  const { scrollY } = useScroll();

  // hide on scroll down, show on scroll up
  useMotionValueEvent(scrollY, "change", (y) => {
    const d = y - last.current;
    if (y < 80 || open) setHidden(false);
    else if (d > 6) setHidden(true);
    else if (d < -6) setHidden(false);
    last.current = y;
  });

  // active section highlight
  useEffect(() => {
    const ids = ["hero", ...nav.map((n) => n.href.slice(1))];
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting)
            setActive(e.target.id === "hero" ? null : e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [nav]);

  // lock page scroll while the overlay is open; Esc closes it
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const goTo = (e, href) => {
    const el = document.querySelector(href);
    if (!el) return;
    e.preventDefault();
    const wasOpen = open;
    setOpen(false);
    setTimeout(() => el.scrollIntoView(), wasOpen ? 80 : 0); // CSS handles smooth / reduced-motion
  };

  return (
    <>
      <a
        href="#features"
        onClick={(e) => goTo(e, "#features")}
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-text"
      >
        {ui.skip}
      </a>

      <motion.header
        animate={{ y: hidden && !open ? "-140%" : 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="fixed inset-x-3 top-3 z-[70] md:inset-x-6 md:top-5"
      >
        <nav
          aria-label={ui.mainNav}
          className="mx-auto flex h-14 max-w-6xl items-center justify-between rounded-full bg-ink/80 pl-3 pr-2 text-surface ring-1 ring-white/10 backdrop-blur-md md:pl-4"
        >
          <a
            href="#hero"
            onClick={(e) => goTo(e, "#hero")}
            className="flex min-h-11 items-center gap-2.5 pr-3"
            aria-label={brand}
          >
            <LogoMark />
            <span className="font-display text-xl font-medium tracking-tight">
              {brand}
            </span>
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {nav.map((n) => {
              const on = active === n.href.slice(1);
              return (
                <li key={n.href}>
                  <a
                    href={n.href}
                    onClick={(e) => goTo(e, n.href)}
                    aria-current={on ? "true" : undefined}
                    className={cn(
                      "relative flex min-h-11 items-center rounded-full px-4 text-sm transition-colors duration-300",
                      on ? "text-accent" : "text-surface/70 hover:text-surface",
                    )}
                  >
                    {n.label}
                    <span
                      aria-hidden="true"
                      className={cn(
                        "absolute bottom-1.5 left-1/2 size-1 -translate-x-1/2 rounded-full bg-accent transition-all duration-300",
                        on ? "scale-100 opacity-100" : "scale-0 opacity-0",
                      )}
                    />
                  </a>
                </li>
              );
            })}
          </ul>

          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? ui.closeMenu : ui.openMenu}
            className="relative flex size-11 items-center justify-center rounded-full md:hidden"
          >
            <span className="relative block h-3 w-5">
              <motion.span
                className="absolute left-0 top-0 block h-px w-5 bg-surface"
                animate={open ? { y: 6, rotate: 45 } : { y: 0, rotate: 0 }}
                transition={{ duration: 0.4, ease: EASE }}
              />
              <motion.span
                className="absolute bottom-0 left-0 block h-px w-5 bg-surface"
                animate={open ? { y: -5, rotate: -45 } : { y: 0, rotate: 0 }}
                transition={{ duration: 0.4, ease: EASE }}
              />
            </span>
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: EASE }}
            className="fixed inset-0 z-[60] flex flex-col justify-center bg-ink px-8 text-surface md:hidden"
          >
            <ul className="space-y-1">
              {nav.map((n, i) => (
                <li key={n.href} className="overflow-hidden">
                  <motion.a
                    href={n.href}
                    onClick={(e) => goTo(e, n.href)}
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    transition={{
                      duration: 0.7,
                      ease: EASE,
                      delay: 0.15 + i * 0.07,
                    }}
                    className={cn(
                      "flex min-h-14 items-center font-display text-5xl font-light tracking-tight",
                      active === n.href.slice(1)
                        ? "text-accent italic"
                        : "text-surface",
                    )}
                  >
                    {n.label}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
