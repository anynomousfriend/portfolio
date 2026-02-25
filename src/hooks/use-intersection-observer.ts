import { useState, useEffect, useRef } from 'react';
import type { RefObject } from 'react';

// Generic so callers get a correctly typed ref without unsafe casts.
// Accepts stable primitive deps instead of an options object — prevents
// a new object reference on every render from staling the effect.
export function useIntersectionObserver<T extends HTMLElement = HTMLElement>(
  threshold = 0.2,
  rootMargin = ''
): [RefObject<T | null>, boolean] {
  const ref = useRef<T | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold, rootMargin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return [ref, isInView];
}
