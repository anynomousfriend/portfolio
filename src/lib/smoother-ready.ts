/**
 * smoother-ready.ts
 *
 * A module-level promise that resolves once ScrollSmoother.create() has fully
 * completed and its scroller proxy is registered with ScrollTrigger.
 */

import { ScrollSmoother } from 'gsap/ScrollSmoother';

let smootherInstance: ScrollSmoother | null = null;
let listeners: Array<() => void> = [];

export function setSmootherInstance(instance: ScrollSmoother | null) {
  if (!instance) {
    smootherInstance = null;
    listeners = [];          // ← FLUSH pending listeners when smoother is destroyed
    return;
  }

  smootherInstance = instance;

  // Drain the queue
  const pending = listeners;
  listeners = [];            // ← clear BEFORE calling to avoid re-entrancy
  pending.forEach((cb) => cb());
}

export function onSmootherReady(): Promise<void> {
  if (smootherInstance) return Promise.resolve();
  return new Promise<void>((resolve) => {
    listeners.push(resolve);
  });
}
