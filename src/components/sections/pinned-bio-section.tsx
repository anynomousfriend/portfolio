'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code2, Palette, Blocks, Globe, Cpu, Layers } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// ── Card data ──────────────────────────────────────────────────────────────
const CARDS = [
  {
    id: 'frontend',
    icon: Code2,
    label: 'Frontend',
    title: 'React & Next.js',
    body: 'Pixel-perfect UIs with TypeScript, Tailwind, and GSAP animations that feel alive.',
    gradient: 'from-indigo-950/80 via-zinc-950 to-zinc-950',
    glow: 'before:bg-indigo-500/10',
    border: 'border-indigo-500/15',
    iconBg: 'bg-indigo-500/10',
    iconColor: 'text-indigo-400',
    dot: 'bg-indigo-400',
    tags: ['React', 'Next.js', 'TypeScript', 'GSAP'],
  },
  {
    id: 'design',
    icon: Palette,
    label: 'Design',
    title: 'Product Design',
    body: 'End-to-end UX research, Figma prototypes, and design systems built for scale.',
    gradient: 'from-violet-950/80 via-zinc-950 to-zinc-950',
    glow: 'before:bg-violet-500/10',
    border: 'border-violet-500/15',
    iconBg: 'bg-violet-500/10',
    iconColor: 'text-violet-400',
    dot: 'bg-violet-400',
    tags: ['Figma', 'UX Research', 'Prototyping', 'Systems'],
  },
  {
    id: 'backend',
    icon: Layers,
    label: 'Backend',
    title: 'Node & PostgreSQL',
    body: 'Robust APIs, relational schemas, and Dockerised services ready for production.',
    gradient: 'from-sky-950/80 via-zinc-950 to-zinc-950',
    glow: 'before:bg-sky-500/10',
    border: 'border-sky-500/15',
    iconBg: 'bg-sky-500/10',
    iconColor: 'text-sky-400',
    dot: 'bg-sky-400',
    tags: ['Node.js', 'PostgreSQL', 'Docker', 'REST'],
  },
  {
    id: 'web3',
    icon: Blocks,
    label: 'Web3',
    title: 'Smart Contracts',
    body: 'Solidity & Clarity contracts, DeFi mechanisms, and on-chain data pipelines.',
    gradient: 'from-emerald-950/80 via-zinc-950 to-zinc-950',
    glow: 'before:bg-emerald-500/10',
    border: 'border-emerald-500/15',
    iconBg: 'bg-emerald-500/10',
    iconColor: 'text-emerald-400',
    dot: 'bg-emerald-400',
    tags: ['Solidity', 'Clarity', 'The Graph', 'DeFi'],
  },
  {
    id: 'data',
    icon: Cpu,
    label: 'Data',
    title: 'Python & Analytics',
    body: 'Data pipelines, visualisations, and ML integrations that turn noise into insight.',
    gradient: 'from-amber-950/80 via-zinc-950 to-zinc-950',
    glow: 'before:bg-amber-500/10',
    border: 'border-amber-500/15',
    iconBg: 'bg-amber-500/10',
    iconColor: 'text-amber-400',
    dot: 'bg-amber-400',
    tags: ['Python', 'Pandas', 'Data Viz', 'APIs'],
  },
  {
    id: 'shipping',
    icon: Globe,
    label: 'Shipping',
    title: 'From 0 → 1',
    body: 'Fast, beautiful products shipped with intention — built to last and grow.',
    gradient: 'from-rose-950/80 via-zinc-950 to-zinc-950',
    glow: 'before:bg-rose-500/10',
    border: 'border-rose-500/15',
    iconBg: 'bg-rose-500/10',
    iconColor: 'text-rose-400',
    dot: 'bg-rose-400',
    tags: ['Product', 'Strategy', 'Launch', 'Scale'],
  },
];

// Duplicate for seamless infinite loop
const TRACK = [...CARDS, ...CARDS];

function BentoCard({ card }: { card: typeof CARDS[number] }) {
  const Icon = card.icon;
  return (
    <div
      className={`
        relative flex-shrink-0 w-[300px] rounded-2xl border ${card.border}
        bg-gradient-to-br ${card.gradient}
        p-5 flex flex-col gap-4
        overflow-hidden
        transition-transform duration-300 ease-out
        hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/40
        group cursor-default select-none
      `}
    >
      {/* Subtle inner glow spot */}
      <div
        className={`absolute -top-10 -left-10 w-40 h-40 rounded-full blur-3xl opacity-60 pointer-events-none ${card.iconBg}`}
      />

      {/* Top row — icon + label */}
      <div className="relative flex items-center justify-between">
        <div className={`flex items-center gap-2.5 ${card.iconBg} rounded-xl px-3 py-1.5`}>
          <Icon size={14} className={card.iconColor} />
          <span className="text-[10px] font-mono font-semibold tracking-[0.18em] uppercase text-zinc-400">
            {card.label}
          </span>
        </div>
        {/* Live dot */}
        <span className="flex items-center gap-1.5">
          <span className={`w-1.5 h-1.5 rounded-full ${card.dot} animate-pulse`} />
        </span>
      </div>

      {/* Title */}
      <div className="relative">
        <h3 className="text-lg font-bold text-zinc-100 leading-tight tracking-tight">
          {card.title}
        </h3>
      </div>

      {/* Body */}
      <p className="relative text-sm text-zinc-400 leading-relaxed flex-1">
        {card.body}
      </p>

      {/* Tags */}
      <div className="relative flex flex-wrap gap-1.5 pt-3 border-t border-zinc-800/50">
        {card.tags.map(tag => (
          <span
            key={tag}
            className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-zinc-900 text-zinc-500 border border-zinc-800/80 tracking-wide"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

export function PinnedBioSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const gsapTween = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const marquee = marqueeRef.current;
    const track = trackRef.current;
    if (!section || !heading || !marquee || !track) return;

    // ── Entrance: heading + marquee fade-in on scroll ──────────────────────
    gsap.set([heading, marquee], { opacity: 0, y: 40 });

    ScrollTrigger.create({
      trigger: section,
      start: 'top 75%',
      once: true,
      onEnter: () => {
        gsap.to(heading, {
          opacity: 1, y: 0,
          duration: 0.7, ease: 'power3.out',
        });
        gsap.to(marquee, {
          opacity: 1, y: 0,
          duration: 0.9, ease: 'power3.out',
          delay: 0.15,
        });
      },
    });

    // ── Infinite horizontal marquee via GSAP ──────────────────────────────
    const cardWidth = 300 + 20; // card width + gap
    const halfWidth = cardWidth * CARDS.length;

    gsapTween.current = gsap.to(track, {
      x: `-=${halfWidth}`,
      duration: 28,
      ease: 'none',
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize(x => parseFloat(x) % halfWidth),
      },
    });

    // Pause on hover
    const pauseMarquee = () => gsapTween.current?.pause();
    const resumeMarquee = () => gsapTween.current?.play();
    marquee.addEventListener('mouseenter', pauseMarquee);
    marquee.addEventListener('mouseleave', resumeMarquee);

    return () => {
      gsapTween.current?.kill();
      marquee.removeEventListener('mouseenter', pauseMarquee);
      marquee.removeEventListener('mouseleave', resumeMarquee);
      ScrollTrigger.getAll().forEach(st => {
        if (st.vars.trigger === section) st.kill();
      });
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-32 bg-[var(--background)] overflow-hidden"
    >
      {/* Background ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-indigo-900/8 rounded-full blur-[140px]" />
      </div>

      {/* Heading */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 mb-12">
        <h2
          ref={headingRef}
          className="text-3xl md:text-4xl font-extrabold text-zinc-100 tracking-tight"
        >
          What I bring to the table
          <span className="text-indigo-500">.</span>
        </h2>
        <p className="mt-3 text-zinc-500 text-base max-w-xl">
          A full-stack, design-minded builder with a bias for shipping.
        </p>
      </div>

      {/* Marquee */}
      <div
        ref={marqueeRef}
        className="relative z-10 w-full overflow-hidden"
      >
        {/* Left fade mask */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[var(--background)] to-transparent z-10 pointer-events-none" />
        {/* Right fade mask */}
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[var(--background)] to-transparent z-10 pointer-events-none" />

        <div ref={trackRef} className="flex gap-5 w-max py-4 px-2">
          {TRACK.map((card, i) => (
            <BentoCard key={`${card.id}-${i}`} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}
