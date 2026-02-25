'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';

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

    // Signal child components via rAF — fires AFTER the current call stack
    // (including ScrollSmoother.create()) fully unwinds. Dispatching
    // synchronously causes setupAnimations callbacks to run while create() is
    // still mid-execution; the scroller proxy isn't registered yet, so any
    // gsap.to(..., { scrollTrigger: { scroller: '#smooth-wrapper' } }) crashes
    // with "Cannot read properties of undefined (reading '_gsap')".
    requestAnimationFrame(() => {
      window.dispatchEvent(new CustomEvent('smoothscroller:ready'));
    });

    return () => {
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
