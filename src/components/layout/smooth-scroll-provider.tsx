'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import {
  signalSmootherReady,
  resetSmootherReady,
} from '@/lib/smoother-ready';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
  // Prevent the browser / Next.js from fighting ScrollSmoother
  window.history.scrollRestoration = 'manual';
}

// ── scroll-position bookkeeping (module-level, survives re-renders) ──
const scrollPositions = new Map<string, number>();

export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const smootherRef = useRef<ScrollSmoother | null>(null);
  const pathname = usePathname();
  const isPopStateRef = useRef(false);

  // ── 1. Detect back / forward navigation ─────────────────────────
  useEffect(() => {
    const onPop = () => {
      isPopStateRef.current = true;
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  // ── 2. Create ScrollSmoother ONCE (persists across routes) ──────
  useEffect(() => {
    smootherRef.current = ScrollSmoother.create({
      wrapper: '#smooth-wrapper',
      content: '#smooth-content',
      smooth: 1.5,
      effects: true,
      smoothTouch: 0.1,
    });

    signalSmootherReady();

    return () => {
      resetSmootherReady();
      smootherRef.current?.kill();
      smootherRef.current = null;
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  // ── 3. Route-change: refresh triggers + scroll management ───────
  useEffect(() => {
    const smoother = smootherRef.current;
    if (!smoother) return;

    let raf1: number;
    let raf2: number;

    // Double-rAF: React commits DOM → browser paints → we measure
    raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        // Re-measure every trigger against the new page content
        ScrollTrigger.refresh(true);

        if (isPopStateRef.current) {
          // ← BACK / FORWARD: restore saved position
          const saved = scrollPositions.get(pathname);
          if (saved != null) {
            smoother.scrollTo(saved, false); // instant, no smooth
          }
          isPopStateRef.current = false;
        } else {
          // ← FORWARD NAVIGATION: start at top
          smoother.scrollTo(0, false);
        }
      });
    });

    return () => {
      // Save position for the page we are LEAVING
      // (closure captures the current pathname at effect-creation time)
      scrollPositions.set(pathname, smoother.scrollTop());
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
    };
  }, [pathname]);

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">{children}</div>
    </div>
  );
}
