'use client';

import { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import gsap from 'gsap';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// ScrollTrigger used for scroll-fade animation

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const ctasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const fadeElements = [badgeRef.current, labelRef.current, headlineRef.current, ctasRef.current];

    // ── Entrance animation ──────────────────────────────────────────────────
    gsap.set(fadeElements, { opacity: 0, y: 20, filter: 'blur(40px)' });

    const entranceTl = gsap.timeline({ delay: 0.3 });
    entranceTl.to(fadeElements, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 1.2,
      ease: 'expo.out',
      stagger: 0.12,
    });

    // ── Scroll blur-out for supporting elements ─────────────────────────────
    const scrollFadeAnim = gsap.fromTo(
      fadeElements,
      { opacity: 1, y: 0, filter: 'blur(0px)' },
      {
        opacity: 0.15,
        y: -10,
        filter: 'blur(10px)',
        duration: 0.5,
        ease: 'power1.inOut',
        stagger: 0.08,
        scrollTrigger: {
          trigger: section,
          start: 'bottom 90%',
          end: 'bottom 5%',
          scrub: 3.5,
          toggleActions: 'play none none reverse',
        },
      }
    );

    return () => {
      entranceTl.kill();
      scrollFadeAnim.scrollTrigger?.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
    >
      {/* Subtle top-down ambient light */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-white/[0.02] rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 w-full px-6 max-w-3xl mx-auto flex flex-col items-start">

        {/* Hire badge */}
        <style>{`
          @keyframes badge-glow-spin {
            0%   { --badge-glow-angle: 0deg; }
            100% { --badge-glow-angle: 360deg; }
          }
          @property --badge-glow-angle {
            syntax: '<angle>';
            initial-value: 0deg;
            inherits: false;
          }
          .hire-badge-wrapper {
            position: relative;
            display: inline-flex;
            border-radius: 6px;
            padding: 1px;
            background: transparent;
          }
          .hire-badge-wrapper::before {
            content: '';
            position: absolute;
            inset: 0;
            border-radius: 6px;
            padding: 1px;
            background: conic-gradient(
              from var(--badge-glow-angle),
              transparent 0%,
              transparent 40%,
              #6366f1 50%,
              #818cf8 55%,
              transparent 65%,
              transparent 100%
            );
            -webkit-mask:
              linear-gradient(#fff 0 0) content-box,
              linear-gradient(#fff 0 0);
            -webkit-mask-composite: xor;
            mask-composite: exclude;
            opacity: 0;
            transition: opacity 0.4s ease;
          }
          .hire-badge-wrapper:hover::before {
            opacity: 1;
            animation: badge-glow-spin 2s linear infinite;
          }
          .hire-badge-wrapper:hover .hire-badge-inner {
            border-color: transparent;
          }
        `}</style>
        <div
          ref={badgeRef}
          id="hire-badge"
          className="hire-badge-wrapper mb-6"
          style={{ willChange: 'filter, opacity, transform' }}
        >
          <div className="hire-badge-inner group inline-flex items-center gap-2.5 px-3 py-1.5 rounded-md border border-zinc-800 bg-zinc-900/60 cursor-pointer transition-colors duration-300">

            {/* Folder icon with pop-out project images */}
            <div className="relative w-8 h-[22px]" style={{ perspective: '1000px' }}>

              {/* Folder back & tab */}
              <div className="absolute bottom-0 left-0 w-full h-full">
                <div className="absolute top-0 left-0 w-3 h-1.5 bg-zinc-700 rounded-tl-sm rounded-tr-sm" />
                <div className="absolute bottom-0 left-0 w-full h-[18px] bg-zinc-700 rounded-sm" />
              </div>

              {/* Image 1 — pops left */}
              <img
                src="https://cdn.dribbble.com/userupload/12268346/file/original-ddafd5a48aac1bb495012d9e72582e23.png?format=webp&resize=640x480&vertical=center"
                alt="Project 1"
                className="absolute bottom-0.5 left-1.5 w-5 h-5 object-cover rounded-[2px] shadow-sm z-10
                           transition-all duration-300 ease-out
                           group-hover:duration-500 group-hover:[transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)]
                           group-hover:-translate-y-8 group-hover:-translate-x-5 group-hover:-rotate-12 group-hover:scale-150"
              />

              {/* Image 2 — pops straight up */}
              <img
                src="https://cdn.dribbble.com/userupload/12247225/file/original-b25192d62fb137f05a31171a65d5ed61.png?format=webp&resize=640x480&vertical=center"
                alt="Project 2"
                className="absolute bottom-0.5 left-1.5 w-5 h-5 object-cover rounded-[2px] shadow-md z-20
                           transition-all duration-300 ease-out
                           group-hover:duration-500 group-hover:[transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)]
                           group-hover:delay-75 group-hover:-translate-y-10 group-hover:rotate-6 group-hover:scale-150"
              />

              {/* Image 3 — pops right */}
              <img
                src="https://cdn.dribbble.com/userupload/42692647/file/original-27c1f8e463b61ba1b86bb784aa812a26.png?format=webp&resize=640x480&vertical=center"
                alt="Project 3"
                className="absolute bottom-0.5 left-1.5 w-5 h-5 object-cover rounded-[2px] shadow-sm z-30
                           transition-all duration-300 ease-out
                           group-hover:duration-500 group-hover:[transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)]
                           group-hover:delay-150 group-hover:-translate-y-7 group-hover:translate-x-5 group-hover:rotate-12 group-hover:scale-150"
              />

              {/* Folder front flap — covers images when closed */}
              <div
                className="absolute bottom-0 left-0 w-full h-[16px] bg-zinc-600 border-t border-white/10 rounded-sm shadow-md z-40 origin-bottom
                           transition-all duration-300 ease-out
                           group-hover:duration-500 group-hover:[transform:rotateX(25deg)] group-hover:translate-y-[2px]"
              >
                <div className="w-full h-full bg-gradient-to-b from-white/5 to-transparent rounded-sm" />
              </div>

            </div>

            {/* Divider */}
            <div className="w-px h-3 bg-zinc-700" />

            {/* Green dot + text */}
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-[11px] font-mono text-zinc-400 tracking-wide">Available for hire</span>
          </div>
        </div>

        {/* Mono label */}
        <span
          ref={labelRef}
          className="text-[11px] md:text-xs font-mono tracking-[0.25em] uppercase text-indigo-400/70 mb-6"
          style={{ willChange: 'filter, opacity, transform' }}
        >
          Fullstack Web3 Dev With Taste
        </span>

        {/* Headline */}
        <h1
          ref={headlineRef}
          style={{ willChange: 'filter, opacity, transform' }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-foreground tracking-tight leading-[0.95]"
        >
          <span style={{ fontFamily: 'var(--font-playfair)', fontStyle: 'italic' }}>Hi</span>, I am
          <br />
          <span className="inline-block text-zinc-300">
            Subhankar<span className="text-indigo-500">.</span>
          </span>
        </h1>

        {/* CTAs */}
        <div
          ref={ctasRef}
          className="flex items-center gap-4 mt-8"
          style={{ willChange: 'filter, opacity, transform' }}
        >
          <Button
            size="lg"
            className="group"
            onClick={() => {
              const smoother = ScrollSmoother.get();
              if (smoother) smoother.scrollTo('#projects', true, 'top 80px');
              else document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            View Projects
            <ArrowRight
              size={16}
              className="ml-2 group-hover:translate-x-1 transition-transform"
            />
          </Button>
          <Button
            size="lg"
            variant="ghost"
            className="text-zinc-400 hover:text-foreground transition-colors"
            onClick={() => {
              const smoother = ScrollSmoother.get();
              if (smoother) smoother.scrollTo('#experience', true, 'top 80px');
              else document.querySelector('#experience')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Experience
          </Button>
        </div>
      </div>
    </section>
  );
}
