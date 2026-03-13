/**
 * Pub/sub for ScrollSmoother lifecycle.
 *
 * - Components call whenSmootherReady(cb) to defer animation setup.
 * - SmoothScrollProvider calls signalSmootherReady() after creating the instance.
 * - resetSmootherReady() flushes all stale callbacks on teardown.
 */

let ready = false;
let pending: Array<() => void> = [];

/** Called by SmoothScrollProvider after ScrollSmoother.create() */
export function signalSmootherReady(): void {
  ready = true;
  const callbacks = [...pending];
  pending = [];
  // rAF guarantees DOM is painted before animation code touches elements
  requestAnimationFrame(() => callbacks.forEach((cb) => cb()));
}

/** Called by SmoothScrollProvider cleanup — discards every queued callback */
export function resetSmootherReady(): void {
  ready = false;
  pending = []; // dead components' callbacks are silently dropped
}

/** Run `cb` once the smoother exists. Safe to call before or after creation. */
export function whenSmootherReady(cb: () => void): void {
  if (ready) {
    requestAnimationFrame(() => cb());
  } else {
    pending.push(cb);
  }
}
