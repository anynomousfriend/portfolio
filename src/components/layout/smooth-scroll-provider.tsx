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
    // Kill any existing smoother/triggers first — handles React Strict Mode's
    // double-invocation of effects (mount → unmount → mount) which would
    // otherwise leave a stale ScrollSmoother instance whose DOM nodes are no
    // longer children of the current tree, triggering the "removeChild" error.
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
