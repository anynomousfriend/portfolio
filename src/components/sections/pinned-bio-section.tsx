'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

// Words to render in Playfair Display italic (like the hero "Hi")
const PLAYFAIR_WORDS = new Set(['obsessed', 'boundary', 'design', 'craft', 'generative']);

const PARAGRAPH =
  "An expert who is as obsessed with your business as you are. I sit at the boundary between design and engineering — which means fewer handoffs, faster decisions, and interfaces your users will actually remember. One person, from concept to pixel to deployed feature, without losing the craft at any step. And when the product calls for it, I bring Web3 and AI to the table too — from on-chain protocols to generative UI.";

const words = PARAGRAPH.split(' ');

export function PinnedBioSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const wordsRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const wordEls = wordsRef.current.filter(Boolean) as HTMLSpanElement[];
    if (!section || wordEls.length === 0) return;

    // Wait for ScrollSmoother to be ready
    const ctx = gsap.context(() => {
      const smoother = ScrollSmoother.get();

      gsap.set(wordEls, { opacity: 0, filter: 'blur(8px)', color: '#71717a' });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          // Use ScrollSmoother's wrapper as the scroller — prevents conflict
          scroller: smoother ? '#smooth-wrapper' : window,
          start: 'top top',
          end: '+=300%',
          pin: true,
          pinSpacing: true,
          scrub: 1,
        },
      });

      tl.to(wordEls, {
        opacity: 1,
        filter: 'blur(0px)',
        color: '#f4f4f5',
        stagger: 0.05,
        ease: 'none',
        duration: 1,
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center px-6"
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
    </section>
  );
}

