'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { whenSmootherReady } from '@/lib/smoother-ready';
import { ContactModal } from '@/components/ui/contact-modal';

// ScrollTrigger + ScrollSmoother are registered globally in SmoothScrollProvider.
// Do NOT call registerPlugin here.

type NavItem = {
  label: string;
  href: string;
  sectionId?: string;
};

const NAV_ITEMS: NavItem[] = [
  { label: 'Home',     href: '#',            sectionId: 'hero' },
  { label: 'Projects', href: '#projects',    sectionId: 'projects' },
  { label: 'Skills',   href: '#skills',      sectionId: 'skills' },
  { label: 'Work',     href: '#experience',  sectionId: 'experience' },
  { label: 'Contact',  href: '#contact' },
];

// Inline spiral SVG logo — matches icon.svg
function SpiralLogo({ size = 28 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      fill="none"
      width={size}
      height={size}
    >
      <defs>
        <radialGradient id="nb-bg" cx="50%" cy="50%" r="50%">
          <stop offset="0%"  stopColor="#3730a3"/>
          <stop offset="40%" stopColor="#1e1b4b"/>
          <stop offset="100%" stopColor="#09090b"/>
        </radialGradient>
        <radialGradient id="nb-core" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#e0e7ff" stopOpacity="1"/>
          <stop offset="40%"  stopColor="#818cf8" stopOpacity="0.9"/>
          <stop offset="100%" stopColor="#4f46e5" stopOpacity="0"/>
        </radialGradient>
        <filter id="nb-glow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="1.2" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <filter id="nb-softglow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="2.5" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>
      <rect width="32" height="32" rx="8" fill="url(#nb-bg)"/>
      <path d="M 16 4 Q 28 4 28 16 Q 28 26 18 27"
        fill="none" stroke="#6366f1" strokeWidth="1.8" strokeLinecap="round" opacity="0.5"/>
      <path d="M 16 28 Q 4 28 4 16 Q 4 6 14 5"
        fill="none" stroke="#818cf8" strokeWidth="1.8" strokeLinecap="round" opacity="0.5"/>
      <path d="M 16 7 Q 25 7 25 16 Q 25 23 18 24"
        fill="none" stroke="#a5b4fc" strokeWidth="1.4" strokeLinecap="round" opacity="0.65" filter="url(#nb-glow)"/>
      <path d="M 16 25 Q 7 25 7 16 Q 7 9 14 8"
        fill="none" stroke="#c4b5fd" strokeWidth="1.4" strokeLinecap="round" opacity="0.65" filter="url(#nb-glow)"/>
      <path d="M 16 10 Q 22 10 22 16 Q 22 21 17 21.5"
        fill="none" stroke="#e0e7ff" strokeWidth="1.1" strokeLinecap="round" opacity="0.8" filter="url(#nb-glow)"/>
      <path d="M 16 22 Q 10 22 10 16 Q 10 11 15 10.5"
        fill="none" stroke="#f0f9ff" strokeWidth="1.1" strokeLinecap="round" opacity="0.8" filter="url(#nb-glow)"/>
      <circle cx="16" cy="16" r="4" fill="url(#nb-core)" filter="url(#nb-softglow)"/>
      <circle cx="16" cy="16" r="2" fill="#e0e7ff" opacity="0.95" filter="url(#nb-glow)"/>
    </svg>
  );
}

export function Navbar() {
  const [contactOpen, setContactOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const contactBtnRef = useRef<HTMLButtonElement>(null);

  // PillNav refs
  const circleRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const tlRefs = useRef<Array<gsap.core.Timeline | null>>([]);
  const activeTweenRefs = useRef<Array<gsap.core.Tween | null>>([]);
  const logoRef = useRef<HTMLAnchorElement | null>(null);
  const logoSvgRef = useRef<SVGSVGElement | null>(null);
  const logoTweenRef = useRef<gsap.core.Tween | null>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const navItemsRef = useRef<HTMLDivElement>(null);

  const ease = 'power3.out';

  // Items excluding "Contact" (handled separately as a pill action)
  const pillItems = NAV_ITEMS.filter(i => i.sectionId !== undefined || i.label === 'Contact');

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, item: NavItem) => {
    e.preventDefault();
    if (item.label === 'Contact') {
      setContactOpen(true);
      return;
    }
    const id = item.sectionId || item.href.replace('#', '');
    const target = document.getElementById(id);
    if (!target) return;
    const smoother = ScrollSmoother.get();
    if (smoother) smoother.scrollTo(target, true, 'top 80px');
    else target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Layout + GSAP pill animation setup
  useEffect(() => {
    const layout = () => {
      circleRefs.current.forEach((circle, i) => {
        if (!circle?.parentElement) return;
        const pill = circle.parentElement as HTMLElement;
        const { width: w, height: h } = pill.getBoundingClientRect();
        const R = ((w * w) / 4 + h * h) / (2 * h);
        const D = Math.ceil(2 * R) + 2;
        const delta = Math.ceil(R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))) + 1;
        const originY = D - delta;

        circle.style.width = `${D}px`;
        circle.style.height = `${D}px`;
        circle.style.bottom = `-${delta}px`;

        gsap.set(circle, { xPercent: -50, scale: 0, transformOrigin: `50% ${originY}px` });

        const label = pill.querySelector<HTMLElement>('.pill-label');
        const hover = pill.querySelector<HTMLElement>('.pill-label-hover');
        if (label) gsap.set(label, { y: 0 });
        if (hover) gsap.set(hover, { y: h + 12, opacity: 0 });

        tlRefs.current[i]?.kill();
        const tl = gsap.timeline({ paused: true });
        tl.to(circle, { scale: 1.2, xPercent: -50, duration: 2, ease, overwrite: 'auto' }, 0);
        if (label) tl.to(label, { y: -(h + 8), duration: 2, ease, overwrite: 'auto' }, 0);
        if (hover) {
          gsap.set(hover, { y: Math.ceil(h + 100), opacity: 0 });
          tl.to(hover, { y: 0, opacity: 1, duration: 2, ease, overwrite: 'auto' }, 0);
        }
        tlRefs.current[i] = tl;
      });
    };

    layout();
    window.addEventListener('resize', layout);
    document.fonts?.ready.then(layout).catch(() => {});

    // Entrance animation
    const navItems = navItemsRef.current;
    if (navItems) {
      gsap.from(navItems, { opacity: 0, y: -12, duration: 0.6, ease, delay: 0.2 });
    }
    if (logoRef.current) {
      gsap.from(logoRef.current, { opacity: 0, scale: 0.7, duration: 0.5, ease, delay: 0.1 });
    }

    // Mobile menu hidden by default
    const menu = mobileMenuRef.current;
    if (menu) gsap.set(menu, { visibility: 'hidden', opacity: 0 });

    return () => window.removeEventListener('resize', layout);
  }, []);

  // Defer scroll trigger until smoother is ready
  useEffect(() => {
    let cancelled = false;
    whenSmootherReady(() => { if (!cancelled) { /* scroll triggers can go here if needed */ } });
    return () => { cancelled = true; };
  }, []);

  const handleEnter = (i: number) => {
    const tl = tlRefs.current[i];
    if (!tl) return;
    activeTweenRefs.current[i]?.kill();
    activeTweenRefs.current[i] = tl.tweenTo(tl.duration(), { duration: 0.3, ease, overwrite: 'auto' });
  };

  const handleLeave = (i: number) => {
    const tl = tlRefs.current[i];
    if (!tl) return;
    activeTweenRefs.current[i]?.kill();
    activeTweenRefs.current[i] = tl.tweenTo(0, { duration: 0.2, ease, overwrite: 'auto' });
  };

  const handleLogoEnter = () => {
    const svg = logoSvgRef.current;
    if (!svg) return;
    logoTweenRef.current?.kill();
    gsap.set(svg, { rotate: 0 });
    logoTweenRef.current = gsap.to(svg, { rotate: 360, duration: 0.5, ease, overwrite: 'auto' });
  };

  const toggleMobileMenu = () => {
    const next = !isMobileMenuOpen;
    setIsMobileMenuOpen(next);
    const hamburger = hamburgerRef.current;
    const menu = mobileMenuRef.current;

    if (hamburger) {
      const lines = hamburger.querySelectorAll('.hamburger-line');
      if (next) {
        gsap.to(lines[0], { rotation: 45, y: 3, duration: 0.3, ease });
        gsap.to(lines[1], { rotation: -45, y: -3, duration: 0.3, ease });
      } else {
        gsap.to(lines[0], { rotation: 0, y: 0, duration: 0.3, ease });
        gsap.to(lines[1], { rotation: 0, y: 0, duration: 0.3, ease });
      }
    }

    if (menu) {
      if (next) {
        gsap.set(menu, { visibility: 'visible' });
        gsap.fromTo(menu, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.3, ease });
      } else {
        gsap.to(menu, {
          opacity: 0, y: 10, duration: 0.2, ease,
          onComplete: () => { gsap.set(menu, { visibility: 'hidden' }); },
        });
      }
    }
  };

  // CSS custom properties for pill colours — indigo/zinc palette
  const cssVars = {
    '--base':       '#18181b',   // zinc-900
    '--pill-bg':    '#6366f1',   // indigo-500
    '--hover-text': '#18181b',   // zinc-900 (text on hover fill)
    '--pill-text':  '#e0e7ff',   // indigo-100
    '--nav-h':      '40px',
    '--pill-pad-x': '16px',
    '--pill-gap':   '4px',
  } as React.CSSProperties;

  const basePillClasses =
    'relative overflow-hidden inline-flex items-center justify-center h-full no-underline rounded-full font-medium text-[13px] leading-[0] tracking-wide whitespace-nowrap cursor-pointer';

  return (
    <>
      {/* ── PillNav ─────────────────────────────────────────────────── */}
      <div
        className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-auto"
        style={cssVars}
      >
        <nav className="flex items-center gap-2" aria-label="Primary">

          {/* Logo pill */}
          <a
            ref={logoRef}
            href="#"
            aria-label="Home"
            onMouseEnter={handleLogoEnter}
            onClick={e => handleNavClick(e as React.MouseEvent<HTMLAnchorElement>, NAV_ITEMS[0])}
            className="rounded-full inline-flex items-center justify-center overflow-hidden flex-shrink-0 border border-zinc-800 hover:border-indigo-500/60 transition-colors duration-300"
            style={{
              width: 'var(--nav-h)',
              height: 'var(--nav-h)',
              background: 'var(--base)',
            }}
          >
            <SpiralLogo size={26} />
          </a>

          {/* Desktop pill strip */}
          <div
            ref={navItemsRef}
            className="relative items-center rounded-full hidden md:flex border border-zinc-800"
            style={{
              height: 'var(--nav-h)',
              background: 'var(--base)',
            }}
          >
            <ul role="menubar" className="list-none flex items-stretch m-0 p-[3px] h-full" style={{ gap: 'var(--pill-gap)' }}>
              {pillItems.map((item, i) => (
                <li key={item.href} role="none" className="flex h-full">
                  <a
                    role="menuitem"
                    href={item.href}
                    onClick={e => {
                      handleNavClick(e, item);
                      setIsMobileMenuOpen(false);
                    }}
                    className={basePillClasses}
                    style={{
                      background: 'var(--pill-bg)',
                      color: 'var(--pill-text)',
                      paddingLeft: 'var(--pill-pad-x)',
                      paddingRight: 'var(--pill-pad-x)',
                    }}
                    aria-label={item.label}
                    onMouseEnter={() => handleEnter(i)}
                    onMouseLeave={() => handleLeave(i)}
                  >
                    {/* Ripple circle */}
                    <span
                      className="hover-circle absolute left-1/2 bottom-0 rounded-full z-[1] block pointer-events-none"
                      style={{ background: 'var(--base)', willChange: 'transform' }}
                      aria-hidden="true"
                      ref={el => { circleRefs.current[i] = el; }}
                    />
                    {/* Label stack */}
                    <span className="label-stack relative inline-block leading-[1] z-[2]">
                      <span className="pill-label relative z-[2] inline-block leading-[1]" style={{ willChange: 'transform' }}>
                        {item.label}
                      </span>
                      <span
                        className="pill-label-hover absolute left-0 top-0 z-[3] inline-block"
                        style={{ color: 'var(--hover-text)', willChange: 'transform, opacity' }}
                        aria-hidden="true"
                      >
                        {item.label}
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Mobile hamburger */}
          <button
            ref={hamburgerRef}
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
            className="md:hidden rounded-full border border-zinc-800 flex flex-col items-center justify-center gap-1 cursor-pointer p-0 flex-shrink-0"
            style={{
              width: 'var(--nav-h)',
              height: 'var(--nav-h)',
              background: 'var(--base)',
            }}
          >
            <span className="hamburger-line w-4 h-0.5 rounded bg-indigo-400 origin-center" />
            <span className="hamburger-line w-4 h-0.5 rounded bg-indigo-400 origin-center" />
          </button>
        </nav>

        {/* Mobile dropdown */}
        <div
          ref={mobileMenuRef}
          className="md:hidden absolute top-[calc(var(--nav-h)+8px)] left-0 right-0 rounded-2xl border border-zinc-800 shadow-[0_8px_32px_rgba(0,0,0,0.4)] z-[998] origin-top overflow-hidden"
          style={{ background: 'var(--base)' }}
        >
          <ul className="list-none m-0 p-2 flex flex-col gap-1">
            {pillItems.map(item => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={e => {
                    handleNavClick(e, item);
                    toggleMobileMenu();
                  }}
                  className="block py-2.5 px-4 text-[14px] font-medium rounded-xl text-indigo-200 hover:bg-indigo-500/20 hover:text-indigo-100 transition-all duration-200"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} anchorRef={contactBtnRef} />
    </>
  );
}
