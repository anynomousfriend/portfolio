'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { setSmootherInstance } from '@/lib/smoother-ready';
import { usePathname } from 'next/navigation';

// Single global registration — all other components must NOT call registerPlugin
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const smootherRef = useRef<ScrollSmoother | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    // Kills old listeners first
    setSmootherInstance(null);

    // Kill any existing smoother/triggers 
    ScrollSmoother.get()?.kill();
    ScrollTrigger.killAll();

    const smoother = ScrollSmoother.create({
      wrapper: '#smooth-wrapper',
      content: '#smooth-content',
      smooth: 1.5,
      effects: true,
      smoothTouch: 0.1,
    });
    
    smootherRef.current = smoother;

    // Force ScrollTrigger to recalculate all positions after smoother
    // takes ownership of the scroll container.
    ScrollTrigger.refresh();

    // Signal all consumers via the smoother-ready module. 
    setSmootherInstance(smoother);

    return () => {
      setSmootherInstance(null);
      ScrollTrigger.killAll();
      smootherRef.current?.kill();
      smootherRef.current = null;
    };
  }, [pathname]); // Re-run effect when pathname changes

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">
        {children}
      </div>
    </div>
  );
}
