'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { GoArrowUpRight } from 'react-icons/go';
import { Button } from '@/components/ui/button';
import { ContactModal } from '@/components/ui/contact-modal';

// ── Spiral SVG Logo (matches icon.svg) ──────────────────────────────
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
        <radialGradient id="cn-bg" cx="50%" cy="50%" r="50%">
          <stop offset="0%"  stopColor="#3730a3"/>
          <stop offset="40%" stopColor="#1e1b4b"/>
          <stop offset="100%" stopColor="#09090b"/>
        </radialGradient>
        <radialGradient id="cn-core" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#e0e7ff" stopOpacity="1"/>
          <stop offset="40%"  stopColor="#818cf8" stopOpacity="0.9"/>
          <stop offset="100%" stopColor="#4f46e5" stopOpacity="0"/>
        </radialGradient>
        <filter id="cn-glow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="1.2" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <filter id="cn-softglow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="2.5" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>
      <rect width="32" height="32" rx="8" fill="url(#cn-bg)"/>
      <path d="M 16 4 Q 28 4 28 16 Q 28 26 18 27"
        fill="none" stroke="#6366f1" strokeWidth="1.8" strokeLinecap="round" opacity="0.5"/>
      <path d="M 16 28 Q 4 28 4 16 Q 4 6 14 5"
        fill="none" stroke="#818cf8" strokeWidth="1.8" strokeLinecap="round" opacity="0.5"/>
      <path d="M 16 7 Q 25 7 25 16 Q 25 23 18 24"
        fill="none" stroke="#a5b4fc" strokeWidth="1.4" strokeLinecap="round" opacity="0.65" filter="url(#cn-glow)"/>
      <path d="M 16 25 Q 7 25 7 16 Q 7 9 14 8"
        fill="none" stroke="#c4b5fd" strokeWidth="1.4" strokeLinecap="round" opacity="0.65" filter="url(#cn-glow)"/>
      <path d="M 16 10 Q 22 10 22 16 Q 22 21 17 21.5"
        fill="none" stroke="#e0e7ff" strokeWidth="1.1" strokeLinecap="round" opacity="0.8" filter="url(#cn-glow)"/>
      <path d="M 16 22 Q 10 22 10 16 Q 10 11 15 10.5"
        fill="none" stroke="#f0f9ff" strokeWidth="1.1" strokeLinecap="round" opacity="0.8" filter="url(#cn-glow)"/>
      <circle cx="16" cy="16" r="4" fill="url(#cn-core)" filter="url(#cn-softglow)"/>
      <circle cx="16" cy="16" r="2" fill="#e0e7ff" opacity="0.95" filter="url(#cn-glow)"/>
    </svg>
  );
}

// ── Nav data ─────────────────────────────────────────────────────────
type CardLink = {
  label: string;
  ariaLabel: string;
  sectionId?: string;
  action?: 'contact' | 'resume';
  href?: string;
};

type CardItem = {
  label: string;
  bgColor: string;
  textColor: string;
  links: CardLink[];
  sectionId?: string;
  action?: 'contact';
};

const CARD_ITEMS: CardItem[] = [
  {
    label: 'Projects',
    bgColor: '#0f0a1e',
    textColor: '#e0e7ff',
    sectionId: 'projects',
    links: [
      { label: 'Dev Projects',  ariaLabel: 'Dev projects',  sectionId: 'projects' },
      { label: 'Featured Work', ariaLabel: 'Featured work', sectionId: 'projects' },
    ],
  },
  {
    label: 'Skills & Work',
    bgColor: '#120d24',
    textColor: '#e0e7ff',
    sectionId: 'skills',
    links: [
      { label: 'Skills',        ariaLabel: 'Skills section',        sectionId: 'skills' },
      { label: 'Experience',    ariaLabel: 'Experience section',    sectionId: 'experience' },
      { label: 'Certificates',  ariaLabel: 'Certificates section',  sectionId: 'certificates' },
    ],
  },
  {
    label: 'Contact',
    bgColor: '#1a1133',
    textColor: '#e0e7ff',
    action: 'contact',
    links: [
      { label: 'Email',         ariaLabel: 'Send an email',            href: 'mailto:officialsubhankar01@gmail.com' },
      { label: 'Telegram',      ariaLabel: 'Telegram @Sshubhankar',    href: 'https://t.me/Sshubhankar' },
      { label: 'Resume',        ariaLabel: 'View resume',              action: 'resume', href: '/Subhankar_Choudhury_Resume.pdf' },
      { label: 'GitHub',        ariaLabel: 'GitHub profile',           href: 'https://github.com/anynomousfriend' },
    ],
  },
];

// ── Component ─────────────────────────────────────────────────────────
export function Navbar() {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [isExpanded, setIsExpanded]           = useState(false);
  const [contactOpen, setContactOpen]         = useState(false);
  const contactBtnRef                         = useRef<HTMLButtonElement>(null);

  const navRef    = useRef<HTMLDivElement>(null);
  const cardsRef  = useRef<HTMLDivElement[]>([]);
  const tlRef     = useRef<gsap.core.Timeline | null>(null);
  const logoRef   = useRef<SVGSVGElement>(null);
  const logoTween = useRef<gsap.core.Tween | null>(null);

  const ease = 'power3.out';
  const containerRef = useRef<HTMLDivElement>(null);

  // ── Scroll helper ───────────────────────────────────────────────
  const scrollTo = (sectionId: string) => {
    const target = document.getElementById(sectionId);
    if (!target) return;
    const smoother = ScrollSmoother.get();
    if (smoother) smoother.scrollTo(target, true, 'top 80px');
    else target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleLinkClick = (e: React.MouseEvent, link: CardLink) => {
    e.preventDefault();
    closeMenu();
    if (link.action === 'contact') { setContactOpen(true); return; }
    if (link.href?.startsWith('mailto:')) {
      window.location.href = link.href;
      return;
    }
    if (link.action === 'resume' || link.href?.startsWith('http')) {
      window.open(link.href, '_blank', 'noopener noreferrer');
      return;
    }
    if (link.sectionId) scrollTo(link.sectionId);
  };

  // ── Click outside to close ──────────────────────────────────────
  useLayoutEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        closeMenu();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isExpanded]);

  // ── GSAP timeline ───────────────────────────────────────────────
  const calculateHeight = () => {
    const navEl = navRef.current;
    if (!navEl) return 260;
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (isMobile) {
      const contentEl = navEl.querySelector('.card-nav-content') as HTMLElement;
      if (contentEl) {
        const prev = { vis: contentEl.style.visibility, pe: contentEl.style.pointerEvents, pos: contentEl.style.position, h: contentEl.style.height };
        Object.assign(contentEl.style, { visibility: 'visible', pointerEvents: 'auto', position: 'static', height: 'auto' });
        void contentEl.offsetHeight;
        const height = 60 + contentEl.scrollHeight + 16;
        Object.assign(contentEl.style, { visibility: prev.vis, pointerEvents: prev.pe, position: prev.pos, height: prev.h });
        return height;
      }
    }
    return 260;
  };

  const createTimeline = () => {
    const navEl = navRef.current;
    if (!navEl) return null;
    gsap.set(navEl, { height: 60, overflow: 'hidden' });
    gsap.set(cardsRef.current, { y: 50, opacity: 0 });
    const tl = gsap.timeline({ paused: true });
    tl.to(navEl, { height: calculateHeight, duration: 0.4, ease });
    tl.to(cardsRef.current, { y: 0, opacity: 1, duration: 0.4, ease, stagger: 0.08 }, '-=0.1');
    return tl;
  };

  useLayoutEffect(() => {
    const tl = createTimeline();
    tlRef.current = tl;
    return () => { tl?.kill(); tlRef.current = null; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ease]);

  useLayoutEffect(() => {
    const handleResize = () => {
      if (!tlRef.current) return;
      if (isExpanded) {
        gsap.set(navRef.current, { height: calculateHeight() });
        tlRef.current.kill();
        const tl = createTimeline();
        if (tl) { tl.progress(1); tlRef.current = tl; }
      } else {
        tlRef.current.kill();
        const tl = createTimeline();
        if (tl) tlRef.current = tl;
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isExpanded]);

  // ── Menu toggle ─────────────────────────────────────────────────
  const closeMenu = () => {
    if (!isExpanded) return;
    setIsHamburgerOpen(false);
    const tl = tlRef.current;
    if (tl) {
      tl.eventCallback('onReverseComplete', () => setIsExpanded(false));
      tl.reverse();
    }
  };

  const toggleMenu = () => {
    const tl = tlRef.current;
    if (!tl) return;
    if (!isExpanded) {
      setIsHamburgerOpen(true);
      setIsExpanded(true);
      tl.play(0);
    } else {
      setIsHamburgerOpen(false);
      tl.eventCallback('onReverseComplete', () => setIsExpanded(false));
      tl.reverse();
    }
  };

  const handleLogoEnter = () => {
    if (!logoRef.current) return;
    logoTween.current?.kill();
    gsap.set(logoRef.current, { rotate: 0 });
    logoTween.current = gsap.to(logoRef.current, { rotate: 360, duration: 0.5, ease, overwrite: 'auto' });
  };

  const setCardRef = (i: number) => (el: HTMLDivElement | null) => {
    if (el) cardsRef.current[i] = el;
  };

  return (
    <>
      <div ref={containerRef} className="fixed left-1/2 -translate-x-1/2 w-[92%] max-w-[760px] z-50 top-4">
        <nav
          ref={navRef}
          className="block h-[60px] p-0 rounded-2xl shadow-lg relative overflow-hidden will-change-[height] border border-zinc-800/60"
          style={{ backgroundColor: '#0c0c14' }}
        >
          {/* ── Top bar ── */}
          <div className="absolute inset-x-0 top-0 h-[60px] flex items-center justify-between px-3 z-[2]">

            {/* Left: Logo + name */}
            <a
              href="#"
              aria-label="Home"
              onMouseEnter={handleLogoEnter}
              onClick={e => { e.preventDefault(); scrollTo('hero'); closeMenu(); }}
              className="flex items-center gap-2 select-none no-underline hover:opacity-80 transition-opacity"
            >
              <SpiralLogo size={28} />
              <span className="hidden md:flex items-baseline gap-0">
                <span className="text-[15px] font-semibold text-zinc-100 tracking-tight leading-none">
                  Subhankar
                </span>
                <span className="text-indigo-400 text-[15px] font-bold leading-none">.</span>
              </span>
            </a>

            {/* Right: Contact CTA + hamburger */}
            <div className="flex items-center gap-2">
              <Button
                ref={contactBtnRef}
                size="sm"
                onClick={() => { setContactOpen(true); closeMenu(); }}
                className="hidden md:inline-flex"
              >
                Contact me
              </Button>

              {/* Hamburger */}
              <button
                type="button"
                onClick={toggleMenu}
                aria-label={isExpanded ? 'Close menu' : 'Open menu'}
                aria-expanded={isExpanded}
                className="h-9 w-9 flex flex-col items-center justify-center gap-[5px] rounded-xl bg-zinc-800/80 hover:bg-zinc-700/80 transition-colors cursor-pointer border-0"
              >
                <span
                  className={`hamburger-line w-[18px] h-[2px] bg-zinc-300 rounded origin-center transition-transform duration-300 ${isHamburgerOpen ? 'translate-y-[3.5px] rotate-45' : ''}`}
                />
                <span
                  className={`hamburger-line w-[18px] h-[2px] bg-zinc-300 rounded origin-center transition-transform duration-300 ${isHamburgerOpen ? '-translate-y-[3.5px] -rotate-45' : ''}`}
                />
              </button>
            </div>
          </div>

          {/* ── Card grid ── */}
          <div
            className={`card-nav-content absolute left-0 right-0 top-[60px] bottom-0 p-2 flex flex-col md:flex-row items-stretch gap-2 z-[1] ${
              isExpanded ? 'visible pointer-events-auto' : 'invisible pointer-events-none'
            }`}
            aria-hidden={!isExpanded}
          >
            {CARD_ITEMS.map((item, idx) => (
              <div
                key={item.label}
                ref={setCardRef(idx)}
                className="relative flex flex-col gap-2 p-3 rounded-xl flex-1 min-h-[60px] md:min-h-0 border border-zinc-800/40 hover:border-indigo-500/50 transition-colors duration-300"
                style={{ backgroundColor: item.bgColor, color: item.textColor }}
              >
                {/* Card label */}
                <div
                  className="font-medium tracking-tight text-[16px] md:text-[18px] text-indigo-200/80 cursor-pointer hover:text-indigo-300 transition-colors duration-200"
                  onClick={() => {
                    if (item.action === 'contact') { setContactOpen(true); closeMenu(); }
                    else if (item.sectionId) { scrollTo(item.sectionId); closeMenu(); }
                  }}
                >
                  {item.label} ↗
                </div>

                {/* Links */}
                <div className="mt-auto flex flex-col gap-1">
                  {item.links.map((link) => (
                    <a
                      key={link.label}
                      href={link.href || '#'}
                      aria-label={link.ariaLabel}
                      onClick={e => handleLinkClick(e, link)}
                      className="inline-flex items-center gap-1.5 text-[14px] text-zinc-300 hover:text-indigo-300 transition-colors duration-200 cursor-pointer no-underline group"
                    >
                      <GoArrowUpRight
                        className="shrink-0 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200"
                        aria-hidden="true"
                      />
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </nav>
      </div>

      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} anchorRef={contactBtnRef} />
    </>
  );
}
