'use client';

import { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TechIcon } from '@/components/ui/tech-icon';
import ColorBends from '@/components/ui/color-bends';
import GradualBlur from '@/components/ui/gradual-blur';
import gsap from 'gsap';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { whenSmootherReady } from '@/lib/smoother-ready';

// ScrollTrigger + ScrollSmoother are registered globally in SmoothScrollProvider.
// Do NOT call registerPlugin here — re-registering ScrollTrigger alone after
// ScrollSmoother has already paired with it corrupts GSAP's internal plugin
// state and causes "_gsap" to be undefined at animation time.

// Inline tech pill — icon + label, used inside the value-prop sentence
function InlineTech({ name }: { name: string }) {
  return (
    <span className="inline-flex items-center gap-1 align-middle mx-0.5 px-1.5 py-0.5 rounded-md border border-zinc-700/60 bg-zinc-800/50 text-zinc-200 text-[0.82em] font-mono whitespace-nowrap leading-tight">
      <TechIcon name={name} size={12} />
      {name}
    </span>
  );
}

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const valuePropRef = useRef<HTMLParagraphElement>(null);
  const ctasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Filter nulls — if any ref failed to attach, abort cleanly
    const fadeElements = [
      badgeRef.current,
      headlineRef.current,
      valuePropRef.current,
      ctasRef.current,
    ].filter((el): el is NonNullable<typeof el> => el !== null);

    if (fadeElements.length < 4) return;

    // gsap.context() captures every tween/trigger created inside.
    // ctx.revert() on unmount kills them all and restores inline styles.
    const ctx = gsap.context(() => {
      // ── Entrance animation ────────────────────────────────────────────────
      // Set will-change only for the duration of the entrance animation,
      // then remove it so it doesn't break preserve-3d on the folder SVG
      fadeElements.forEach(el => { el.style.willChange = 'filter, opacity, transform'; });

      gsap.set(fadeElements, { opacity: 0, y: 20, filter: 'blur(40px)' });

      gsap.timeline({ delay: 0.3 })
        .to(fadeElements, {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 1.2,
          ease: 'expo.out',
          stagger: 0.14,
        })
        .call(() => {
          // Remove will-change after entrance — restores preserve-3d for folder
          fadeElements.forEach(el => { el.style.willChange = 'auto'; });
        });
    }, sectionRef);

    // ── Scroll blur-out ───────────────────────────────────────────────────
    // This animation uses scroller: '#smooth-wrapper', which requires
    // ScrollSmoother to have called ScrollSmoother.create() first so that its
    // scroll proxy is registered with ScrollTrigger. However, React runs child
    // useEffects BEFORE parent useEffects, so SmoothScrollProvider's
    // ScrollSmoother.create() hasn't run yet when HeroSection mounts.
    // We defer this tween until the 'smoothscroller:ready' event fires.
    // The { once: true } option ensures the listener is auto-removed after
    // firing, and the ScrollSmoother.get() check handles HMR / fast-refresh
    // cases where the smoother was already created before this effect ran.
    // scrollCtx is created fresh inside setupScrollBlurOut — AFTER the smoother
    // is ready — so it never captures a stale scroller proxy reference.
    let scrollCtx: ReturnType<typeof gsap.context> | null = null;

    const setupScrollBlurOut = () => {
      // Guard: component may have unmounted before the timeout fired.
      if (!sectionRef.current) return;

      // Create a brand-new context here, not ctx.add() — ctx.add() executes
      // synchronously inside a context that was created before the smoother
      // existed, giving it a stale scroller proxy and causing _gsap undefined.
      scrollCtx = gsap.context(() => {
        gsap.to(fadeElements, {
          opacity: 0.15,
          y: -10,
          filter: 'blur(10px)',
          ease: 'none',
          stagger: 0.08,
          scrollTrigger: {
            trigger: section,
            scroller: '#smooth-wrapper',
            start: 'bottom 90%',
            end: 'bottom 5%',
            scrub: true,
          },
        });
      }, sectionRef);
    };

    let cancelled = false;
    whenSmootherReady(() => { if (!cancelled) setupScrollBlurOut(); });

    return () => {
      cancelled = true;
      ctx.revert();
      scrollCtx?.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 pb-24"
    >
      {/* ColorBends WebGL background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <ColorBends
          colors={["#6366f1", "#818cf8", "#312e81"]}
          rotation={0}
          speed={0.2}
          scale={1}
          frequency={1}
          warpStrength={1}
          mouseInfluence={1}
          parallax={0.5}
          noise={0.1}
          transparent
          autoRotate={0}
        />
      </div>

      {/* Subtle ambient light */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-white/[0.02] rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 w-full px-6 max-w-4xl mx-auto flex flex-col items-start">

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
          className="hire-badge-wrapper mb-8"
          style={{ willChange: 'filter, opacity, transform' }}
        >
          <div className="hire-badge-inner group inline-flex items-center gap-2.5 px-3 py-1.5 rounded-md border border-zinc-800 bg-zinc-900/60 cursor-pointer transition-colors duration-300">

            {/* Flat folder — goes isometric only on hover */}
            <style>{`
              .flat-folder {
                position: relative;
                width: 28px;
                height: 24px;
                transform-style: preserve-3d;
                transform: none;
                transition: transform 0.5s cubic-bezier(0.34,1.56,0.64,1);
              }
              .group:hover .flat-folder {
                transform: rotateX(22deg) rotateY(-22deg) rotateZ(2deg);
              }
              .flat-folder-body {
                position: absolute;
                bottom: 0; left: 0;
                width: 100%; height: 17px;
                background: #3f3f46;
                border-radius: 4px;
                transition: box-shadow 0.5s ease;
              }
              .group:hover .flat-folder-body {
                box-shadow: -3px 3px 0 #27272a;
              }
              .flat-folder-tab {
                position: absolute;
                top: 0; left: 0;
                width: 11px; height: 6px;
                background: #52525b;
                border-radius: 4px 4px 0 0;
                transition: box-shadow 0.5s ease;
              }
              .group:hover .flat-folder-tab {
                box-shadow: -2px 2px 0 #3f3f46;
              }
              .flat-folder-lid {
                position: absolute;
                bottom: 13px; left: 0;
                width: 100%; height: 9px;
                background: #52525b;
                border-radius: 4px 4px 2px 2px;
                transform-origin: bottom center;
                transition: transform 0.45s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.5s ease;
              }
              .group:hover .flat-folder-lid {
                transform: rotateX(-40deg) translateY(-1px);
                box-shadow: -3px 2px 0 #3f3f46;
              }
            `}</style>
            <div className="flat-folder">
              <div className="flat-folder-tab" />
              <div className="flat-folder-body" />

              {/* Image 1 — pops left */}
              <img
                src="https://cdn.dribbble.com/userupload/12268346/file/original-ddafd5a48aac1bb495012d9e72582e23.png?format=webp&resize=640x480&vertical=center"
                alt="Project 1"
                className="absolute bottom-1.5 left-1 w-4 h-4 object-cover rounded-[3px] z-10
                           transition-all duration-300 ease-out opacity-0
                           group-hover:opacity-100 group-hover:duration-500 group-hover:[transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)]
                           group-hover:-translate-y-7 group-hover:-translate-x-4 group-hover:-rotate-12 group-hover:scale-150"
              />
              {/* Image 2 — pops straight up */}
              <img
                src="https://cdn.dribbble.com/userupload/12247225/file/original-b25192d62fb137f05a31171a65d5ed61.png?format=webp&resize=640x480&vertical=center"
                alt="Project 2"
                className="absolute bottom-1.5 left-1 w-4 h-4 object-cover rounded-[3px] z-20
                           transition-all duration-300 ease-out opacity-0
                           group-hover:opacity-100 group-hover:duration-500 group-hover:[transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)]
                           group-hover:delay-75 group-hover:-translate-y-9 group-hover:rotate-6 group-hover:scale-150"
              />
              {/* Image 3 — pops right */}
              <img
                src="https://cdn.dribbble.com/userupload/42692647/file/original-27c1f8e463b61ba1b86bb784aa812a26.png?format=webp&resize=640x480&vertical=center"
                alt="Project 3"
                className="absolute bottom-1.5 left-1 w-4 h-4 object-cover rounded-[3px] z-30
                           transition-all duration-300 ease-out opacity-0
                           group-hover:opacity-100 group-hover:duration-500 group-hover:[transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)]
                           group-hover:delay-150 group-hover:-translate-y-6 group-hover:translate-x-4 group-hover:rotate-12 group-hover:scale-150"
              />
              <div className="flat-folder-lid" />
            </div>

            <div className="w-px h-3 bg-zinc-700" />
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-[11px] font-mono text-zinc-400 tracking-wide">Available for hire</span>
          </div>
        </div>

        {/* ── Headline — role first, name secondary ────────────────────────── */}
        <h1
          ref={headlineRef}
          style={{ willChange: 'filter, opacity, transform' }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6"
        >
          {/* Role — dominant */}
          <span className="block text-foreground">
            <span style={{ fontFamily: 'var(--font-playfair)', fontStyle: 'italic' }}>Design</span><span className="text-indigo-400">.</span>
          </span>
          <span className="block text-foreground">
            Engineer<span className="text-indigo-400">.</span>
          </span>
          {/* Name — secondary, smaller, softer */}
          <span className="block text-3xl sm:text-4xl md:text-5xl font-semibold text-zinc-500 mt-3 tracking-normal">
            <span style={{ fontFamily: 'var(--font-playfair)', fontStyle: 'italic' }}>I&apos;m</span>{' '}
            Subhankar<span className="text-indigo-500/60">.</span>
          </span>
        </h1>

        {/* ── Value-prop sentence with inline tech icons ───────────────────── */}
        <p
          ref={valuePropRef}
          style={{ willChange: 'filter, opacity, transform' }}
          className="text-base sm:text-lg text-zinc-400 leading-relaxed max-w-2xl mb-10"
        >
          I turn complex ideas into interfaces that feel{' '}
          <span className="text-zinc-200 font-medium">inevitable</span> — using{' '}
          <InlineTech name="React" />,{' '}
          <InlineTech name="Next.js" />,{' '}
          <InlineTech name="TypeScript" />, and{' '}
          <InlineTech name="Figma" />{' '}
          to ship products that look great <em>and</em> run on-chain. With a blockchain-native mindset built on{' '}
          <InlineTech name="Solidity" />,{' '}
          <InlineTech name="Ethereum" />, and{' '}
          <InlineTech name="Wagmi" />{' '}
          — I bridge the gap between{' '}
          <span className="text-indigo-400 font-medium">beautiful UX</span> and{' '}
          <span className="text-indigo-400 font-medium">trustless systems</span>.
        </p>

        {/* ── CTAs ─────────────────────────────────────────────────────────── */}
        <div
          ref={ctasRef}
          className="flex items-center gap-4"
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
            Work History
          </Button>
        </div>

      </div>

      {/* Gradual blur transition — blends hero into the next section */}
      <GradualBlur
        target="parent"
        position="bottom"
        height="8rem"
        strength={2}
        divCount={6}
        curve="bezier"
        exponential
        opacity={1}
        zIndex={5}
      />

    </section>
  );
}
