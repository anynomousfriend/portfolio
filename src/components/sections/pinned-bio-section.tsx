'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { whenSmootherReady } from '@/lib/smoother-ready';

// ScrollTrigger registered globally in SmoothScrollProvider

// Words to render in Playfair Display italic (like the hero "Hi")
const PLAYFAIR_WORDS = new Set(['obsessed', 'boundary', 'design', 'craft', 'generative']);

const PARAGRAPH =
  "An expert who is as obsessed with your business as you are. I sit at the boundary between design and engineering — which means fewer handoffs, faster decisions, and interfaces your users will actually remember. One person, from concept to pixel to deployed feature, without losing the craft at any step. And when the product calls for it, I bring Web3 and AI to the table too — from on-chain protocols to generative UI.";

const words = PARAGRAPH.split(' ');

// Pre-compute total character count (including spaces between words) for ref array sizing
const totalChars = words.reduce((sum, word, i) => {
  return sum + word.length + (i < words.length - 1 ? 1 : 0);
}, 0);

export function PinnedBioSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const charsRef = useRef<(HTMLSpanElement | null)[]>(new Array(totalChars).fill(null));

  useEffect(() => {
    const section = sectionRef.current;
    const charEls = charsRef.current.filter(Boolean) as HTMLSpanElement[];
    if (!section || charEls.length === 0) return;

    const ctx = gsap.context(() => { });
    let scrollCtx: ReturnType<typeof gsap.context> | null = null;

    const setupAnimations = () => {
      if (!sectionRef.current) return;
      // Set initial hidden state here — inside setupAnimations — so chars
      // only become invisible when the ScrollTrigger is actually being created.
      gsap.set(charEls, { opacity: 0, filter: 'blur(8px)', color: '#71717a' });
      scrollCtx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            scroller: '#smooth-wrapper',
            start: 'top top',
            end: '+=300%',
            pin: true,
            pinSpacing: true,
            pinnedContainer: '#smooth-content',
            scrub: true,
          },
        });

        tl.to(charEls, {
          opacity: 1,
          filter: 'blur(0px)',
          color: '#f4f4f5',
          stagger: 0.008,
          ease: 'none',
          duration: 1,
        });
      }, sectionRef);
    };

    let cancelled = false;
    whenSmootherReady(() => { if (!cancelled) setupAnimations(); });

    return () => {
      cancelled = true;
      scrollCtx?.revert();
      ctx.revert();
    };
  }, []);

  // Track a running index across all characters for the ref array
  let charIndex = 0;

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center px-6"
    >
      <div className="max-w-4xl mx-auto w-full">
        <p className="text-xl sm:text-2xl md:text-3xl font-extrabold leading-[1.4] tracking-tight">
          {words.map((word, wordIdx) => {
            const isPlayfair = PLAYFAIR_WORDS.has(word);

            // Render each character of the word as its own span
            const charSpans = word.split('').map((char) => {
              const idx = charIndex++;
              return (
                <span
                  key={idx}
                  ref={(el) => { charsRef.current[idx] = el; }}
                  className="inline"
                  style={{
                    willChange: 'opacity, filter, color',
                    ...(isPlayfair && {
                      fontFamily: 'var(--font-playfair)',
                      fontStyle: 'italic',
                    }),
                  }}
                >
                  {char}
                </span>
              );
            });

            // Add an animated space character between words
            let spaceSpan = null;
            if (wordIdx < words.length - 1) {
              const spaceIdx = charIndex++;
              spaceSpan = (
                <span
                  key={`sp-${spaceIdx}`}
                  ref={(el) => { charsRef.current[spaceIdx] = el; }}
                  className="inline"
                  style={{ willChange: 'opacity, filter, color' }}
                >
                  {' '}
                </span>
              );
            }

            return (
              <span key={`w-${wordIdx}`} className="inline">
                <span className="inline whitespace-nowrap">{charSpans}</span>
                {spaceSpan}
              </span>
            );
          })}
        </p>
      </div>
    </section>
  );
}
