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

// Generation counter — incremented on every reset (Strict Mode unmount /
// remount cycle). Each scheduled setTimeout captures the generation at the
// time it was created; if the generation has advanced by the time it fires,
// the callback is discarded. This prevents stale macrotasks from a previous
// mount cycle running against a freshly-created (or not-yet-created) smoother.
let generation = 0;
let isReady = false;
let pendingCallbacks: ReadyCallback[] = [];

/** Called by SmoothScrollProvider after ScrollSmoother.create() returns. */
export function signalSmootherReady(): void {
  isReady = true;
  const cbs = pendingCallbacks;
  pendingCallbacks = [];
  const gen = generation;
  // Schedule each callback as its own macrotask. The generation check inside
  // ensures any callback whose macrotask fires after a reset() is silently
  // dropped — it would be running against a killed/missing smoother.
  cbs.forEach((cb) => setTimeout(() => { if (generation === gen) cb(); }, 0));
}

/** Called by SmoothScrollProvider at the TOP of its effect and in cleanup.
 *  Invalidates all in-flight macrotasks from the previous generation. */
export function resetSmootherReady(): void {
  generation++;   // invalidate any pending setTimeout callbacks instantly
  isReady = false;
  pendingCallbacks = [];
}

/**
 * Calls `cb` once the smoother is ready.
 * - If already ready: schedules cb in a fresh macrotask (setTimeout 0),
 *   guarded by the current generation so Strict Mode remounts are safe.
 * - If not yet ready: queues cb to be called when signalSmootherReady fires.
 */
export function whenSmootherReady(cb: ReadyCallback): void {
  const gen = generation;
  if (isReady) {
    setTimeout(() => { if (generation === gen) cb(); }, 0);
  } else {
    pendingCallbacks.push(cb);
  }
}
