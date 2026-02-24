'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

// Words to render in Playfair Display italic (like the hero "Hi")
const PLAYFAIR_WORDS = new Set(['obsessed', 'products,', 'ship', 'intention,', 'Always', 'building.']);

const PARAGRAPH =
  "An expert who is as obsessed with your business as you are. I don't just write code — I think in products, ship with intention, and sweat the details that make users stay. Full-stack. Design-minded. Always building.";

export function PinnedBioSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<(HTMLSpanElement | null)[]>([]);

  const words = PARAGRAPH.split(' ');

  useEffect(() => {
    const section = sectionRef.current;
    const inner = innerRef.current;
    const wordEls = wordsRef.current.filter(Boolean) as HTMLSpanElement[];
    if (!section || !inner || wordEls.length === 0) return;

    // Set initial state: blurred + dim
    gsap.set(wordEls, {
      opacity: 0,
      filter: 'blur(8px)',
      color: '#71717a',
    });

    // Pin the inner div and scrub word reveals with scroll
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: '+=200%',
        pin: inner,
        pinSpacing: true,
        scrub: 1.5,
      },
    });

    tl.to(wordEls, {
      opacity: 1,
      filter: 'blur(0px)',
      color: '#f4f4f5',
      stagger: 0.05,
      ease: 'power2.out',
      duration: 0.3,
    });

    return () => tl.scrollTrigger?.kill();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative"
    >
      <div
        ref={innerRef}
        className="min-h-screen flex items-center px-6"
      >
        <div className="max-w-4xl mx-auto w-full">
          <p className="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-[1.3] tracking-tight">
            {words.map((word, i) => (
              <span
                key={i}
                ref={(el) => { wordsRef.current[i] = el; }}
                className="inline-block mr-[0.28em]"
                style={{
                  opacity: 0,
                  filter: 'blur(8px)',
                  color: '#71717a',
                  willChange: 'opacity, filter, color',
                  ...(PLAYFAIR_WORDS.has(word) && {
                    fontFamily: 'var(--font-playfair)',
                    fontStyle: 'italic',
                  }),
                }}
              >
                {word}
              </span>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}

