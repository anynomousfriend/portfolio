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
        <div
          ref={badgeRef}
          id="hire-badge"
          className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 rounded-md border border-zinc-800 bg-zinc-900/60 cursor-pointer hover:border-indigo-500/40 transition-colors duration-300"
          style={{ willChange: 'filter, opacity, transform' }}
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-[11px] font-mono text-zinc-400 tracking-wide">Available for hire</span>
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
