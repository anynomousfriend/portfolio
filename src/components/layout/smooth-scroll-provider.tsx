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

    // Dispatch synchronously — ScrollSmoother.create() has returned and its
    // scroller proxy is registered. Each component that listens wraps its own
    // setup in setTimeout(0) so it runs in a fresh macrotask, fully outside
    // this useEffect call stack. This is the only reliable way to guarantee
    // the proxy is usable before any gsap.to(..., { scrollTrigger }) call.
    window.dispatchEvent(new CustomEvent('smoothscroller:ready'));

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
