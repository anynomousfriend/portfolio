'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { signalSmootherReady, resetSmootherReady } from '@/lib/smoother-ready';

// Single global registration — all other components must NOT call registerPlugin
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const smootherRef = useRef<ScrollSmoother | null>(null);

  useEffect(() => {
    // Reset FIRST — increments the generation counter, instantly invalidating
    // any in-flight setTimeout callbacks from the previous mount cycle.
    // This is the critical fix for React Strict Mode: without this, macrotasks
    // scheduled by the first mount's signalSmootherReady() fire AFTER the
    // second mount's ScrollTrigger.killAll() but BEFORE ScrollSmoother.create(),
    // hitting a dead scroller proxy and crashing with _gsap undefined.
    resetSmootherReady();

    // Kill any existing smoother/triggers — handles Strict Mode double-invoke.
    ScrollSmoother.get()?.kill();
    ScrollTrigger.killAll();

    smootherRef.current = ScrollSmoother.create({
      wrapper: '#smooth-wrapper',
      content: '#smooth-content',
      smooth: 1.5,
      effects: true,
      smoothTouch: 0.1,
    });

    // Force ScrollTrigger to recalculate all positions after smoother
    // takes ownership of the scroll container.
    ScrollTrigger.refresh();

    // Signal all consumers via the smoother-ready module. Each callback is
    // scheduled as a fresh macrotask (setTimeout 0) by signalSmootherReady,
    // guaranteeing it runs fully outside this useEffect call stack.
    signalSmootherReady();

    return () => {
      resetSmootherReady();
      ScrollTrigger.killAll();
      smootherRef.current?.kill();
      smootherRef.current = null;
    };
  }, []);

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">
        {children}
      </div>
    </div>
  );
}
