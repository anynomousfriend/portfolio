/**
 * smoother-ready.ts
 *
 * A module-level promise that resolves once ScrollSmoother.create() has fully
 * completed and its scroller proxy is registered with ScrollTrigger.
 *
 * WHY THIS EXISTS
 * ───────────────
 * React runs child useEffects BEFORE parent useEffects. So every section's
 * useEffect runs before SmoothScrollProvider's useEffect calls
 * ScrollSmoother.create(). Any attempt to create a ScrollTrigger with
 * scroller:'#smooth-wrapper' before the proxy is registered crashes with
 * "Cannot read properties of undefined (reading '_gsap')".
 *
 * Previous attempts (custom event, rAF, double-rAF, setTimeout) all failed
 * because window.dispatchEvent is synchronous — listeners run inline in the
 * SmoothScrollProvider useEffect call stack regardless of how they're wrapped.
 *
 * HOW TO USE
 * ──────────
 * In SmoothScrollProvider, call signalSmootherReady() after ScrollSmoother.create().
 * In any component that needs the scroller, do:
 *
 *   import { whenSmootherReady } from '@/lib/smoother-ready';
 *
 *   useEffect(() => {
 *     let cancelled = false;
 *     whenSmootherReady(() => {
 *       if (cancelled) return;
 *       // safe to create ScrollTrigger with scroller:'#smooth-wrapper' here
 *     });
 *     return () => { cancelled = true; };
 *   }, []);
 */

type ReadyCallback = () => void;

let isReady = false;
let pendingCallbacks: ReadyCallback[] = [];

/** Called by SmoothScrollProvider after ScrollSmoother.create() returns. */
export function signalSmootherReady(): void {
  isReady = true;
  const cbs = pendingCallbacks;
  pendingCallbacks = [];
  // Schedule callbacks as individual macrotasks so each one runs fully
  // outside the SmoothScrollProvider useEffect call stack.
  cbs.forEach((cb) => setTimeout(cb, 0));
}

/** Called by SmoothScrollProvider on cleanup to reset for next mount. */
export function resetSmootherReady(): void {
  isReady = false;
  pendingCallbacks = [];
}

/**
 * Calls `cb` once the smoother is ready.
 * - If already ready: schedules cb in a fresh macrotask (setTimeout 0).
 * - If not yet ready: queues cb to be called (via setTimeout 0) when
 *   signalSmootherReady() is called.
 */
export function whenSmootherReady(cb: ReadyCallback): void {
  if (isReady) {
    setTimeout(cb, 0);
  } else {
    pendingCallbacks.push(cb);
  }
}
