'use client';

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import type { Variants, Transition } from 'framer-motion';

const ease = 'easeOut' as const;

// Shared skeleton shimmer element
function Skeleton({ className }: { className?: string }) {
  return (
    <div className={`bg-indigo-900/50 rounded-sm overflow-hidden relative ${className}`}>
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-400/30 to-transparent"
        initial={{ x: '-100%' }}
        animate={{ x: '200%' }}
        transition={{ duration: 1.4, repeat: Infinity, ease: 'linear' } as Transition}
      />
    </div>
  );
}

// Stagger container variants
const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 6 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease } },
};
const shimmerToReveal: Variants = {
  hidden: { opacity: 0, scale: 0.97 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.5, ease } },
};

export interface PolishedImageVisualProps {
  imageUrl?: string;
  fallbackAlt?: string;
  gradientColors?: [string, string, string];
  hoverVisual?: React.ReactNode;
}

export function PolishedImageVisual({
  imageUrl,
  fallbackAlt = 'Project Preview',
  gradientColors = ['#1e1b4b', '#312e81', '#4c1d95'],
  hoverVisual,
}: PolishedImageVisualProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const [hovered, setHovered] = useState(false);
  const [c0, c1, c2] = gradientColors;
  const showHover = hovered && !!hoverVisual;

  return (
    <div
      ref={ref}
      className="w-full h-full overflow-hidden relative group/cover"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0"
        style={{ background: `linear-gradient(135deg, ${c0}, ${c1}, ${c2})` }}
        animate={{
          background: [
            `linear-gradient(135deg, ${c0}, ${c1}, ${c2})`,
            `linear-gradient(225deg, ${c1}, ${c2}, ${c0})`,
            `linear-gradient(315deg, ${c2}, ${c0}, ${c1})`,
            `linear-gradient(135deg, ${c0}, ${c1}, ${c2})`,
          ],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
      />

      {/* Skewed screenshot — fades out on hover */}
      {imageUrl && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: showHover ? 0 : 1 } : {}}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            className="w-[88%] rounded-lg overflow-hidden shadow-2xl shadow-black/60 border border-white/10"
            animate={{
              transform: showHover
                ? 'perspective(800px) rotateX(0deg) rotateY(0deg) rotate(0deg) scale(0.95)'
                : 'perspective(800px) rotateX(6deg) rotateY(-6deg) rotate(-1deg) scale(1)',
            }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <img
              src={imageUrl}
              alt={fallbackAlt}
              className="w-full h-full object-cover object-top"
              loading="lazy"
            />
          </motion.div>
        </motion.div>
      )}

      {/* Hover visual — fades in on hover */}
      <AnimatePresence>
        {showHover && (
          <motion.div
            key="hover-visual"
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {hoverVisual}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom fade */}
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
    </div>
  );
}


// ─── 1. PayPerRequest ──────────────────────────────────────────────────────────
export function PayPerRequestVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <div ref={ref} className="w-full h-full bg-zinc-950 p-3 flex flex-col gap-2 overflow-hidden relative">
      {/* top accent */}
      <motion.div
        className="absolute top-0 left-0 w-full h-0.5 bg-zinc-500"
        initial={{ scaleX: 0, originX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.6, ease: ease }}
      />

      {/* skeleton phase → header */}
      <motion.div className="flex items-center justify-between" variants={container} initial="hidden" animate={inView ? 'show' : 'hidden'}>
        <motion.div variants={shimmerToReveal} className="flex gap-1 items-center">
          {inView ? (
            <>
              <div className="text-[8px] font-bold text-zinc-400 font-mono tracking-widest">PAY</div>
              <div className="w-1.5 h-1.5 rounded-full bg-zinc-500" />
              <div className="text-[8px] font-bold text-zinc-300 font-mono tracking-widest">PER</div>
              <div className="w-1.5 h-1.5 rounded-full bg-zinc-500" />
              <div className="text-[8px] font-bold text-zinc-400 font-mono tracking-widest">REQUEST</div>
            </>
          ) : (
            <div className="flex gap-1 items-center">
              <Skeleton className="w-6 h-3" />
              <Skeleton className="w-6 h-3" />
              <Skeleton className="w-12 h-3" />
            </div>
          )}
        </motion.div>
        <motion.div variants={shimmerToReveal}>
          {inView ? (
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span className="text-[7px] text-green-400 font-mono">LIVE</span>
            </div>
          ) : (
            <div className="flex items-center gap-1">
              <Skeleton className="w-1.5 h-1.5 rounded-full" />
              <Skeleton className="w-8 h-2" />
            </div>
          )}
        </motion.div>
      </motion.div>

      {/* chain bars */}
      <motion.div className="grid grid-cols-3 gap-1.5" variants={container} initial="hidden" animate={inView ? 'show' : 'hidden'}>
        {[
          { chain: 'ETH', pct: 72, color: 'bg-indigo-500' },
          { chain: 'BASE', pct: 48, color: 'bg-blue-500' },
          { chain: 'SOL', pct: 61, color: 'bg-purple-500' },
        ].map(({ chain, pct, color }) =>
          inView ? (
            <motion.div key={chain} variants={item} className="bg-zinc-900 rounded-sm p-1.5 flex flex-col gap-1 border border-zinc-800">
              <div className="text-[7px] text-zinc-400 font-mono">{chain}</div>
              <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
                <motion.div
                  className={`h-full ${color} rounded-full`}
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 0.7, ease: ease, delay: 0.3 }}
                />
              </div>
              <div className="text-[6px] text-zinc-500 font-mono">{pct}% uptime</div>
            </motion.div>
          ) : (
            <div key={chain} className="bg-zinc-900 rounded-sm p-1.5 flex flex-col gap-1 border border-zinc-800">
              <Skeleton className="w-6 h-2" />
              <Skeleton className="w-full h-1 rounded-full" />
              <Skeleton className="w-12 h-1.5" />
            </div>
          )
        )}
      </motion.div>

      {/* SDK snippet */}
      {inView ? (
        <motion.div
          variants={shimmerToReveal}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.4 }}
          className="bg-zinc-900 rounded-sm p-2 font-mono text-[7px] leading-[1.6] border border-zinc-800 flex-1"
        >
          <div className="text-zinc-600">{'// 3-line integration'}</div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }}>
            <span className="text-zinc-400">import </span>
            <span className="text-zinc-200">ppr </span>
            <span className="text-zinc-400">from </span>
            <span className="text-zinc-400">&apos;payperrquest&apos;</span>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
            <span className="text-zinc-400">const </span>
            <span className="text-zinc-200">api = ppr(</span>
            <span className="text-zinc-300">&apos;key&apos;</span>
            <span className="text-zinc-200">)</span>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.85 }}>
            <span className="text-zinc-200">api.</span>
            <span className="text-zinc-400">protect</span>
            <span className="text-zinc-200">(handler)</span>
            <motion.span
              className="inline-block w-0.5 h-2.5 bg-zinc-400 ml-0.5 align-middle"
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}
            />
          </motion.div>
        </motion.div>
      ) : (
        <div className="bg-zinc-900 rounded-sm p-2 flex flex-col gap-1.5 border border-zinc-800 flex-1">
          <Skeleton className="w-24 h-2 mb-1" />
          <Skeleton className="w-32 h-2" />
          <Skeleton className="w-40 h-2" />
          <Skeleton className="w-36 h-2" />
        </div>
      )}

      {/* bottom stat */}
      {inView && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="flex justify-between items-center"
        >
          <span className="text-[6px] text-zinc-600 font-mono">8+ chains supported</span>
          <span className="text-[6px] text-zinc-400 font-mono">zero platform fees</span>
        </motion.div>
      )}
    </div>
  );
}

// ─── 2. Temporal Vault ─────────────────────────────────────────────────────────
export function TemporalVaultVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <div ref={ref} className="w-full h-full bg-zinc-950 p-3 flex flex-col gap-2 overflow-hidden relative">
      {/* bridge flow */}
      <motion.div className="flex items-center gap-1" variants={container} initial="hidden" animate={inView ? 'show' : 'hidden'}>
        {inView ? (
          <>
            <motion.div variants={item} className="flex-1 bg-blue-500/10 border border-blue-500/30 rounded-sm p-1.5 text-center">
              <div className="text-[7px] text-blue-400 font-mono font-bold">ETH</div>
              <div className="text-[8px] text-zinc-200 font-bold">USDC</div>
              <div className="text-[6px] text-zinc-500">deposit</div>
            </motion.div>

            <motion.div variants={item} className="flex flex-col items-center gap-0.5 px-1">
              {/* animated arrow */}
              <div className="relative w-10 h-3 flex items-center">
                <div className="absolute inset-y-1/2 left-0 w-full h-px bg-zinc-700" />
                <motion.div
                  className="absolute inset-y-0 left-0 flex items-center"
                  animate={{ x: [0, 28, 0] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: 'linear' }}
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                </motion.div>
              </div>
              <div className="text-[5px] text-indigo-400 font-mono">SIP-009 NFT</div>
            </motion.div>

            <motion.div variants={item} className="flex-1 bg-orange-500/10 border border-orange-500/30 rounded-sm p-1.5 text-center">
              <div className="text-[7px] text-orange-400 font-mono font-bold">STX</div>
              <div className="text-[8px] text-zinc-200 font-bold">Claim</div>
              <div className="text-[6px] text-zinc-500">instant</div>
            </motion.div>
          </>
        ) : (
          <>
            <div className="flex-1 bg-zinc-900 rounded-sm p-1.5 border border-zinc-800 flex flex-col gap-1 items-center justify-center h-12">
              <Skeleton className="w-8 h-2" />
              <Skeleton className="w-10 h-2" />
            </div>
            <Skeleton className="w-10 h-4" />
            <div className="flex-1 bg-zinc-900 rounded-sm p-1.5 border border-zinc-800 flex flex-col gap-1 items-center justify-center h-12">
              <Skeleton className="w-8 h-2" />
              <Skeleton className="w-10 h-2" />
            </div>
          </>
        )}
      </motion.div>

      {/* discount curve */}
      {inView ? (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.4 }}
          className="flex-1 bg-zinc-900 rounded-sm border border-zinc-800 p-2 flex flex-col gap-1"
        >
          <div className="text-[6px] text-zinc-500 font-mono">discount curve — √(time remaining)</div>
          <svg className="w-full flex-1" viewBox="0 0 100 28" preserveAspectRatio="none">
            <defs>
              <linearGradient id="tvgrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6366f1" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d="M0 28 Q 20 26, 40 18 T 75 6 T 100 1 L100 28 Z" fill="url(#tvgrad)" />
            <motion.path
              d="M0 28 Q 20 26, 40 18 T 75 6 T 100 1"
              fill="none"
              stroke="#6366f1"
              strokeWidth="1.5"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.9, delay: 0.5, ease: ease }}
            />
            {/* hover dot */}
            <motion.circle
              cx="55" cy="11" r="2"
              fill="#6366f1"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.1 }}
            />
          </svg>
        </motion.div>
      ) : (
        <Skeleton className="flex-1" />
      )}

      {/* bottom */}
      {inView && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="flex justify-between"
        >
          <span className="text-[6px] text-zinc-600 font-mono">15-20 min wait → tradeable</span>
          <span className="text-[6px] text-zinc-400 font-mono bg-zinc-500/10 px-1 py-0.5 rounded">1-3% discount</span>
        </motion.div>
      )}
    </div>
  );
}

// ─── 3. ZK Parental Consent Gateway ───────────────────────────────────────────
export function ZKConsentVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <div ref={ref} className="w-full h-full bg-zinc-950 p-3 flex flex-col gap-2 overflow-hidden relative">
      {/* title row */}
      {inView ? (
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="flex items-center justify-between"
        >
          <span className="text-[7px] text-zinc-400 font-mono tracking-wider">ZK CONSENT</span>
          <span className="text-[6px] text-zinc-500 font-mono">Midnight Network</span>
        </motion.div>
      ) : (
        <Skeleton className="h-2 w-3/4" />
      )}

      {/* proof flow */}
      {inView ? (
        <motion.div
          initial="hidden"
          animate="show"
          variants={container}
          className="flex items-center gap-1.5"
        >
          {/* parent node */}
          <motion.div variants={item} className="flex flex-col items-center gap-0.5">
            <div className="w-7 h-7 rounded-full bg-zinc-500/20 border border-zinc-500/40 flex items-center justify-center text-[10px]">👤</div>
            <div className="text-[5px] text-zinc-400 font-mono">parent</div>
          </motion.div>

          {/* animated line */}
          <motion.div variants={item} className="flex-1 flex flex-col gap-0.5">
            <div className="relative h-px bg-zinc-800">
              <motion.div
                className="absolute inset-y-0 left-0 bg-zinc-500"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ delay: 0.5, duration: 0.5, ease: ease }}
              />
            </div>
            <div className="text-[5px] text-zinc-600 font-mono text-center">hash(childID)</div>
          </motion.div>

          {/* ZK box */}
          <motion.div variants={item} className="bg-zinc-900 border border-zinc-500/30 rounded-sm px-1.5 py-1 flex flex-col items-center gap-0.5">
            <div className="text-[6px] text-zinc-300 font-mono font-bold">ZK</div>
            <div className="text-[5px] text-zinc-500 font-mono">proof</div>
          </motion.div>

          {/* animated line 2 */}
          <motion.div variants={item} className="flex-1 flex flex-col gap-0.5">
            <div className="relative h-px bg-zinc-800">
              <motion.div
                className="absolute inset-y-0 left-0 bg-zinc-500"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ delay: 0.85, duration: 0.5, ease: ease }}
              />
            </div>
            <div className="text-[5px] text-zinc-600 font-mono text-center">verify</div>
          </motion.div>

          {/* platform node */}
          <motion.div variants={item} className="flex flex-col items-center gap-0.5">
            <motion.div
              className="w-7 h-7 rounded-sm bg-zinc-500/20 border border-zinc-500/40 flex items-center justify-center text-[10px]"
              animate={{ borderColor: ['rgba(34,197,94,0.4)', 'rgba(34,197,94,0.8)', 'rgba(34,197,94,0.4)'] }}
              transition={{ duration: 1.8, repeat: Infinity, delay: 1.2 }}
            >✓</motion.div>
            <div className="text-[5px] text-zinc-400 font-mono">platform</div>
          </motion.div>
        </motion.div>
      ) : (
        <Skeleton className="h-10" />
      )}

      {/* on-chain state */}
      {inView ? (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex-1 bg-zinc-900 rounded-sm border border-zinc-800 p-2 font-mono text-[7px] flex flex-col gap-0.5"
        >
          <div className="text-zinc-600">{'// on-chain storage'}</div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
            <span className="text-zinc-400">mapping</span>
            <span className="text-zinc-300">(bytes32 </span>
            <span className="text-zinc-400">childHash</span>
            <span className="text-zinc-300">) {'{'}</span>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.85 }} className="pl-2">
            <span className="text-zinc-400">bool </span>
            <span className="text-zinc-300">consent = </span>
            <span className="text-zinc-300">true</span>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.0 }} className="text-zinc-600">
            {'// PII: never stored'}
          </motion.div>
        </motion.div>
      ) : (
        <Skeleton className="flex-1" />
      )}

      {inView && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="flex justify-between"
        >
          <span className="text-[6px] text-zinc-600 font-mono">COPPA / GDPR-K</span>
          <span className="text-[6px] text-zinc-400 font-mono">Zero PII storage</span>
        </motion.div>
      )}
    </div>
  );
}

// ─── 4. ZenResume ──────────────────────────────────────────────────────────────
export function ZenResumeVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  const zenColors = ['#1C1C1E', '#8B1A1A', '#4A4A7A', '#E8E0D0'];
  const platforms = ['Coursera', 'Credly', 'edX', 'LinkedIn', '+6'];

  return (
    <div ref={ref} className="w-full h-full bg-zinc-950 p-3 flex flex-col gap-2 overflow-hidden relative">
      {/* zen header */}
      {inView ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="flex items-center justify-between"
        >
          <span className="text-[8px] tracking-[0.3em] text-zinc-300 font-light">ZEN</span>
          <div className="flex gap-1">
            {zenColors.map((c, i) => (
              <motion.div
                key={i}
                className="w-2.5 h-2.5 rounded-sm"
                style={{ backgroundColor: c }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1 + i * 0.07, duration: 0.3 }}
              />
            ))}
          </div>
        </motion.div>
      ) : (
        <div className="flex items-center justify-between">
          <Skeleton className="w-8 h-2" />
          <div className="flex gap-1">
            <Skeleton className="w-2.5 h-2.5 rounded-sm" />
            <Skeleton className="w-2.5 h-2.5 rounded-sm" />
            <Skeleton className="w-2.5 h-2.5 rounded-sm" />
            <Skeleton className="w-2.5 h-2.5 rounded-sm" />
          </div>
        </div>
      )}

      {/* resume skeleton → reveal */}
      {inView ? (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.4 }}
          className="flex-1 bg-zinc-900 rounded-sm border border-zinc-800 p-2 flex flex-col gap-1.5"
        >
          {/* name block */}
          <motion.div initial={{ width: 0 }} animate={{ width: '55%' }} transition={{ delay: 0.4, duration: 0.5 }} className="h-1.5 bg-zinc-300 rounded-full" />
          <motion.div initial={{ width: 0 }} animate={{ width: '35%' }} transition={{ delay: 0.5, duration: 0.4 }} className="h-0.5 bg-zinc-600 rounded-full" />

          <div className="h-px bg-zinc-800 my-0.5" />

          {/* section lines */}
          {[85, 70, 90, 60].map((w, i) => (
            <motion.div
              key={i}
              className="h-0.5 bg-zinc-700 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${w}%` }}
              transition={{ delay: 0.55 + i * 0.08, duration: 0.4 }}
            />
          ))}

          {/* certificate badge appearing */}
          <motion.div
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.95, duration: 0.35 }}
            className="mt-auto flex items-center gap-1 bg-zinc-500/10 border border-zinc-500/30 rounded px-1.5 py-0.5 self-start"
          >
            <motion.div
              className="w-1 h-1 rounded-full bg-zinc-400"
              animate={{ scale: [1, 1.4, 1] }}
              transition={{ duration: 1, repeat: Infinity, delay: 1 }}
            />
            <span className="text-[6px] text-zinc-300 font-mono">cert auto-filled</span>
          </motion.div>
        </motion.div>
      ) : (
        <div className="flex-1 bg-zinc-900 rounded-sm border border-zinc-800 p-2 flex flex-col gap-1.5">
          <Skeleton className="w-1/2 h-1.5 rounded-full" />
          <Skeleton className="w-1/3 h-0.5 rounded-full mb-1" />
          <Skeleton className="w-full h-0.5 rounded-full" />
          <Skeleton className="w-3/4 h-0.5 rounded-full" />
          <Skeleton className="w-4/5 h-0.5 rounded-full" />
          <Skeleton className="w-2/3 h-0.5 rounded-full mb-auto" />
          <Skeleton className="w-24 h-2 rounded" />
        </div>
      )}

      {/* platform pills */}
      {inView ? (
        <motion.div
          initial="hidden"
          animate="show"
          variants={container}
          className="flex gap-1 flex-wrap"
        >
          {platforms.map((p, i) => (
            <motion.div
              key={p}
              variants={item}
              className={`text-[6px] font-mono px-1.5 py-0.5 rounded ${i < 4 ? 'bg-zinc-800 text-zinc-400' : 'text-zinc-600'}`}
            >
              {p}
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="flex gap-1">
          <Skeleton className="w-10 h-3" />
          <Skeleton className="w-12 h-3" />
          <Skeleton className="w-14 h-3" />
          <Skeleton className="w-8 h-3" />
        </div>
      )}
    </div>
  );
}

// ─── 5. LLM Chess Arena ────────────────────────────────────────────────────────
export function LLMChessVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  const pieces: Record<number, { glyph: string; dark: boolean }> = {
    0: { glyph: '♜', dark: true }, 7: { glyph: '♜', dark: true },
    3: { glyph: '♛', dark: true }, 4: { glyph: '♝', dark: true },
    56: { glyph: '♖', dark: false }, 63: { glyph: '♖', dark: false },
    59: { glyph: '♕', dark: false }, 60: { glyph: '♗', dark: false },
  };

  return (
    <div ref={ref} className="w-full h-full bg-[#0a0a0a] p-3 flex flex-col gap-2 overflow-hidden">
      {/* model labels */}
      {inView ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35 }}
          className="flex items-center justify-between"
        >
          <div className="text-[7px] text-blue-400 font-mono bg-blue-500/10 px-1.5 py-0.5 rounded border border-blue-500/20">GPT-4o ♟</div>
          <motion.div
            className="text-[6px] text-zinc-500 font-mono"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.2, repeat: Infinity }}
          >vs</motion.div>
          <div className="text-[7px] text-orange-400 font-mono bg-orange-500/10 px-1.5 py-0.5 rounded border border-orange-500/20">♟ Claude</div>
        </motion.div>
      ) : (
        <div className="flex items-center justify-between">
          <Skeleton className="w-12 h-3" />
          <Skeleton className="w-4 h-2" />
          <Skeleton className="w-12 h-3" />
        </div>
      )}

      {/* chess board */}
      {inView ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="grid grid-cols-8 gap-px flex-1"
        >
          {Array.from({ length: 64 }).map((_, i) => {
            const row = Math.floor(i / 8);
            const col = i % 8;
            const light = (row + col) % 2 === 0;
            const piece = pieces[i];
            return (
              <motion.div
                key={i}
                className={`flex items-center justify-center text-[7px] ${light ? 'bg-zinc-700' : 'bg-zinc-900'}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 + i * 0.004 }}
              >
                {piece && (
                  <span className={piece.dark ? 'text-zinc-300' : 'text-white'}>
                    {piece.glyph}
                  </span>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      ) : (
        <Skeleton className="flex-1 w-full aspect-square max-h-[140px]" />
      )}

      {/* move log */}
      {inView ? (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex items-center justify-between"
        >
          <div className="flex gap-1">
            {['e4', 'c5', 'Nf3'].map((move, i) => (
              <motion.span
                key={move}
                initial={{ opacity: 0, y: 3 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + i * 0.12 }}
                className="text-[6px] font-mono text-zinc-400 bg-zinc-800 px-1 py-0.5 rounded"
              >
                {move}
              </motion.span>
            ))}
            <motion.span
              className="text-[6px] font-mono text-zinc-600 self-center"
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.7, repeat: Infinity, repeatType: 'reverse', delay: 1 }}
            >▋</motion.span>
          </div>
          <span className="text-[6px] text-zinc-600 font-mono">100+ models</span>
        </motion.div>
      ) : (
        <div className="flex items-center justify-between">
          <div className="flex gap-1">
            <Skeleton className="w-6 h-3" />
            <Skeleton className="w-6 h-3" />
            <Skeleton className="w-6 h-3" />
          </div>
          <Skeleton className="w-12 h-2" />
        </div>
      )}
    </div>
  );
}

// ─── 6. iExec Confidential iApp ────────────────────────────────────────────────
export function IExecVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <div ref={ref} className="w-full h-full bg-zinc-950 p-3 flex flex-col gap-2 overflow-hidden relative">
      {/* header */}
      {inView ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35 }}
          className="flex items-center justify-between"
        >
          <span className="text-[7px] text-yellow-500 font-mono tracking-wider">iEXEC</span>
          <div className="flex items-center gap-1">
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-blue-400"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.4, repeat: Infinity }}
            />
            <span className="text-[6px] text-blue-400 font-mono">Arbitrum Sepolia</span>
          </div>
        </motion.div>
      ) : (
        <div className="flex items-center justify-between">
          <Skeleton className="w-10 h-2" />
          <div className="flex gap-1 items-center">
            <Skeleton className="w-1.5 h-1.5 rounded-full" />
            <Skeleton className="w-16 h-2" />
          </div>
        </div>
      )}

      {/* TEE enclave box */}
      {inView ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="flex-1 border border-dashed border-zinc-700 rounded-sm p-2 flex flex-col gap-1.5 relative"
          style={{ borderColor: undefined }}
        >
          {/* animated dashed border glow */}
          <motion.div
            className="absolute inset-0 rounded-sm border border-yellow-500/0"
            animate={{ borderColor: ['rgba(234,179,8,0)', 'rgba(234,179,8,0.4)', 'rgba(234,179,8,0)'] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: 0.8 }}
          />

          <div className="text-[6px] text-yellow-500 font-mono uppercase tracking-wider">TEE Enclave</div>

          {/* input → process → output pipeline */}
          <div className="flex items-center gap-1">
            {[
              { label: 'encrypted\ninput', color: 'text-yellow-400', border: 'border-yellow-500/30', bg: 'bg-yellow-500/10' },
              { label: 'confidential\ncompute', color: 'text-zinc-400', border: 'border-zinc-500/40', bg: 'bg-zinc-500/10' },
              { label: 'verified\noutput', color: 'text-green-400', border: 'border-green-500/30', bg: 'bg-green-500/10' },
            ].map(({ label, color, border, bg }, i) => (
              <div key={i} className="flex items-center gap-1 flex-1">
                <motion.div
                  initial={{ opacity: 0, y: 3 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 + i * 0.15 }}
                  className={`flex-1 ${bg} border ${border} rounded-sm p-1 text-center`}
                >
                  <div className={`text-[5px] ${color} font-mono whitespace-pre-line leading-[1.3]`}>{label}</div>
                </motion.div>
                {i < 2 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 + i * 0.15 }}
                    className="text-zinc-600 text-[8px]"
                  >→</motion.div>
                )}
              </div>
            ))}
          </div>

          {/* blockchain verify row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.75 }}
            className="bg-zinc-900 rounded-sm p-1.5 font-mono text-[7px] flex items-center gap-1.5"
          >
            <span className="text-blue-400">docker</span>
            <span className="text-zinc-500">run --sgx</span>
            <span className="text-green-400">iapp.js</span>
            <motion.div
              className="ml-auto text-green-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
            >verified ✓</motion.div>
          </motion.div>
        </motion.div>
      ) : (
        <div className="flex-1 border border-dashed border-zinc-800 rounded-sm p-2 flex flex-col gap-1.5">
          <Skeleton className="w-16 h-2 mb-1" />
          <div className="flex gap-1 h-8">
            <Skeleton className="flex-1 h-full" />
            <Skeleton className="flex-1 h-full" />
            <Skeleton className="flex-1 h-full" />
          </div>
          <Skeleton className="w-full h-4 mt-auto rounded" />
        </div>
      )}

      {/* bottom */}
      {inView && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
          className="flex justify-between"
        >
          <span className="text-[6px] text-zinc-600 font-mono">50MB result limit</span>
          <span className="text-[6px] text-zinc-400 font-mono">privacy guaranteed</span>
        </motion.div>
      )}
    </div>
  );
}

// ─── 7. AFO — Atomic Fair Ordering ─────────────────────────────────────────────
export function AFOVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <div ref={ref} className="w-full h-full bg-zinc-950 p-3 flex flex-col gap-2 overflow-hidden relative">
      {/* header */}
      {inView ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35 }}
          className="flex items-center justify-between"
        >
          <span className="text-[7px] text-indigo-400 font-mono tracking-wider">AFO PROTOCOL</span>
          <div className="flex items-center gap-1">
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-green-400"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.4, repeat: Infinity }}
            />
            <span className="text-[6px] text-green-400 font-mono">MEV Protected</span>
          </div>
        </motion.div>
      ) : (
        <Skeleton className="h-2 w-3/4" />
      )}

      {/* Three phases */}
      {inView ? (
        <motion.div
          initial="hidden"
          animate="show"
          variants={container}
          className="flex gap-1"
        >
          {[
            { phase: 'COMMIT', color: 'text-blue-400', border: 'border-blue-500/30', bg: 'bg-blue-500/10' },
            { phase: 'REVEAL', color: 'text-indigo-400', border: 'border-indigo-500/30', bg: 'bg-indigo-500/10' },
            { phase: 'ORDER', color: 'text-green-400', border: 'border-green-500/30', bg: 'bg-green-500/10' },
          ].map(({ phase, color, border, bg }) => (
            <motion.div key={phase} variants={item} className={`flex-1 ${bg} border ${border} rounded-sm p-1.5 text-center`}>
              <div className={`text-[6px] ${color} font-mono font-bold`}>{phase}</div>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <Skeleton className="h-6" />
      )}

      {/* Transaction ordering visual */}
      {inView ? (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.4 }}
          className="flex-1 bg-zinc-900 rounded-sm border border-zinc-800 p-2 font-mono text-[7px] flex flex-col gap-1"
        >
          <div className="text-zinc-600">{'// deterministic ordering'}</div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
            <span className="text-zinc-400">sort</span>
            <span className="text-zinc-300">(timestamp + </span>
            <span className="text-indigo-400">hash</span>
            <span className="text-zinc-300">)</span>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.65 }}>
            <span className="text-zinc-400">{'→'} </span>
            <span className="text-green-400">fair order</span>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="text-zinc-600">
            {'// MEV: impossible'}
          </motion.div>
        </motion.div>
      ) : (
        <Skeleton className="flex-1" />
      )}

      {inView && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="flex justify-between"
        >
          <span className="text-[6px] text-zinc-600 font-mono">15.52M TPS</span>
          <span className="text-[6px] text-zinc-400 font-mono">Qubic</span>
        </motion.div>
      )}
    </div>
  );
}

// ─── 8. Fathom-0x Protocol ─────────────────────────────────────────────────────
export function FathomVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <div ref={ref} className="w-full h-full bg-zinc-950 p-3 flex flex-col gap-2 overflow-hidden relative">
      {/* header */}
      {inView ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35 }}
          className="flex items-center justify-between"
        >
          <span className="text-[7px] text-cyan-400 font-mono tracking-wider">FATHOM-0x</span>
          <span className="text-[6px] text-zinc-500 font-mono">SUI + Walrus</span>
        </motion.div>
      ) : (
        <Skeleton className="h-2 w-3/4" />
      )}

      {/* Pipeline flow */}
      {inView ? (
        <motion.div
          initial="hidden"
          animate="show"
          variants={container}
          className="flex items-center gap-1"
        >
          {[
            { label: 'encrypt', icon: '🔒', border: 'border-cyan-500/30', bg: 'bg-cyan-500/10' },
            { label: 'store', icon: '💾', border: 'border-blue-500/30', bg: 'bg-blue-500/10' },
            { label: 'query', icon: '🤖', border: 'border-purple-500/30', bg: 'bg-purple-500/10' },
            { label: 'verify', icon: '✓', border: 'border-green-500/30', bg: 'bg-green-500/10' },
          ].map(({ label, icon, border, bg }, i) => (
            <div key={label} className="flex items-center gap-1 flex-1">
              <motion.div variants={item} className={`flex-1 ${bg} border ${border} rounded-sm p-1 text-center`}>
                <div className="text-[8px]">{icon}</div>
                <div className="text-[5px] text-zinc-400 font-mono">{label}</div>
              </motion.div>
              {i < 3 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 + i * 0.15 }}
                  className="text-zinc-600 text-[8px]"
                >→</motion.div>
              )}
            </div>
          ))}
        </motion.div>
      ) : (
        <Skeleton className="h-10" />
      )}

      {/* Proof verification */}
      {inView ? (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex-1 bg-zinc-900 rounded-sm border border-zinc-800 p-2 font-mono text-[7px] flex flex-col gap-0.5"
        >
          <div className="text-zinc-600">{'// on-chain proof'}</div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
            <span className="text-zinc-400">doc: </span>
            <span className="text-cyan-400">AES-256-GCM</span>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.85 }}>
            <span className="text-zinc-400">oracle: </span>
            <span className="text-purple-400">TEE attested</span>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.0 }}>
            <span className="text-zinc-400">proof: </span>
            <span className="text-green-400">verified ✓</span>
            <motion.span
              className="inline-block w-0.5 h-2.5 bg-zinc-400 ml-0.5 align-middle"
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}
            />
          </motion.div>
        </motion.div>
      ) : (
        <Skeleton className="flex-1" />
      )}

      {inView && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="flex justify-between"
        >
          <span className="text-[6px] text-zinc-600 font-mono">Privacy-preserving RAG</span>
          <span className="text-[6px] text-zinc-400 font-mono">Don&apos;t trust, verify</span>
        </motion.div>
      )}
    </div>
  );
}

// ─── 9. PoolFunders ────────────────────────────────────────────────────────────
export function PoolFundersVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  const pools = [
    { label: 'DeFi Seed', raised: 68, goal: 100, color: 'bg-teal-500', accent: 'text-teal-400' },
    { label: 'NFT Drop', raised: 91, goal: 100, color: 'bg-cyan-500', accent: 'text-cyan-400' },
    { label: 'DAO Grant', raised: 42, goal: 100, color: 'bg-blue-500', accent: 'text-blue-400' },
  ];

  return (
    <div ref={ref} className="w-full h-full bg-zinc-950 p-3 flex flex-col gap-2 overflow-hidden relative">
      {/* top accent */}
      <motion.div
        className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-teal-500 to-cyan-500"
        initial={{ scaleX: 0, originX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.6, ease }}
      />

      {/* header */}
      <motion.div
        className="flex items-center justify-between"
        variants={container} initial="hidden" animate={inView ? 'show' : 'hidden'}
      >
        <motion.div variants={shimmerToReveal} className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
          <span className="text-[8px] font-bold text-zinc-300 font-mono tracking-widest">POOL FUNDERS</span>
        </motion.div>
        <motion.div variants={shimmerToReveal}>
          <span className="text-[6px] text-teal-400 font-mono bg-teal-500/10 px-1.5 py-0.5 rounded border border-teal-500/20">DeFi crowdfunding</span>
        </motion.div>
      </motion.div>

      {/* pool bars */}
      <motion.div className="flex flex-col gap-1.5" variants={container} initial="hidden" animate={inView ? 'show' : 'hidden'}>
        {pools.map(({ label, raised, color, accent }) => (
          <motion.div key={label} variants={item} className="bg-zinc-900 rounded-sm p-1.5 border border-zinc-800">
            <div className="flex justify-between mb-1">
              <span className={`text-[6px] font-mono ${accent}`}>{label}</span>
              <span className="text-[6px] text-zinc-500 font-mono">{raised}%</span>
            </div>
            <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
              <motion.div
                className={`h-full ${color} rounded-full`}
                initial={{ width: 0 }}
                animate={inView ? { width: `${raised}%` } : {}}
                transition={{ duration: 0.8, ease, delay: 0.3 }}
              />
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* staking reward box */}
      {inView ? (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex-1 bg-zinc-900 rounded-sm border border-zinc-800 p-2 flex flex-col gap-1"
        >
          <div className="text-[6px] text-zinc-500 font-mono">staking rewards — $TPFT</div>
          <div className="flex gap-1 flex-wrap mt-0.5">
            {['Stake', 'DAO Vote', 'NFT Reward', 'Claim'].map((action, i) => (
              <motion.span
                key={action}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + i * 0.1 }}
                className="text-[6px] font-mono bg-teal-500/10 text-teal-400 border border-teal-500/20 px-1 py-0.5 rounded"
              >
                {action}
              </motion.span>
            ))}
          </div>
          <div className="mt-auto flex justify-between">
            <span className="text-[6px] text-zinc-600 font-mono">TVL locked</span>
            <motion.span
              className="text-[6px] text-teal-400 font-mono"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              $2.4M
            </motion.span>
          </div>
        </motion.div>
      ) : (
        <Skeleton className="flex-1" />
      )}

      {inView && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
          className="flex justify-between"
        >
          <span className="text-[6px] text-zinc-600 font-mono">World&apos;s first DeFi crowdfunding</span>
          <span className="text-[6px] text-zinc-400 font-mono">End-to-end design</span>
        </motion.div>
      )}
    </div>
  );
}

// ─── 10. Foliobull ─────────────────────────────────────────────────────────────
export function FoliobullVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  const assets = [
    { symbol: 'BTC', value: 42.1, change: +2.4, color: 'text-orange-400' },
    { symbol: 'ETH', value: 18.7, change: -0.8, color: 'text-indigo-400' },
    { symbol: 'SOL', value: 12.3, change: +5.1, color: 'text-purple-400' },
  ];

  return (
    <div ref={ref} className="w-full h-full bg-zinc-950 p-3 flex flex-col gap-2 overflow-hidden relative">
      {/* top accent */}
      <motion.div
        className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500"
        initial={{ scaleX: 0, originX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.6, ease }}
      />

      {/* header */}
      <motion.div
        className="flex items-center justify-between"
        variants={container} initial="hidden" animate={inView ? 'show' : 'hidden'}
      >
        <motion.div variants={shimmerToReveal} className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-indigo-400" />
          <span className="text-[8px] font-bold text-zinc-300 font-mono tracking-widest">FOLIOBULL</span>
        </motion.div>
        <motion.div variants={shimmerToReveal}>
          <span className="text-[6px] text-indigo-400 font-mono bg-indigo-500/10 px-1.5 py-0.5 rounded border border-indigo-500/20">AI Portfolio</span>
        </motion.div>
      </motion.div>

      {/* mini portfolio chart */}
      {inView ? (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-zinc-900 rounded-sm border border-zinc-800 p-1.5"
        >
          <div className="text-[6px] text-zinc-500 font-mono mb-1">portfolio value — 7d</div>
          <svg className="w-full h-8" viewBox="0 0 100 24" preserveAspectRatio="none">
            <defs>
              <linearGradient id="fbgrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6366f1" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d="M0 18 L10 16 L20 14 L30 17 L40 12 L50 10 L60 13 L70 8 L80 5 L90 7 L100 3 L100 24 L0 24 Z" fill="url(#fbgrad)" />
            <motion.path
              d="M0 18 L10 16 L20 14 L30 17 L40 12 L50 10 L60 13 L70 8 L80 5 L90 7 L100 3"
              fill="none" stroke="#6366f1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.0, delay: 0.3, ease }}
            />
          </svg>
        </motion.div>
      ) : (
        <Skeleton className="h-12" />
      )}

      {/* asset rows */}
      <motion.div className="flex flex-col gap-1" variants={container} initial="hidden" animate={inView ? 'show' : 'hidden'}>
        {assets.map(({ symbol, value, change, color }) => (
          <motion.div key={symbol} variants={item} className="flex items-center justify-between bg-zinc-900 rounded-sm px-2 py-1 border border-zinc-800">
            <span className={`text-[7px] font-bold font-mono ${color}`}>{symbol}</span>
            <div className="flex-1 mx-2 h-px bg-zinc-800" />
            <span className="text-[6px] text-zinc-400 font-mono">{value}%</span>
            <span className={`text-[6px] font-mono ml-1.5 ${change > 0 ? 'text-green-400' : 'text-red-400'}`}>
              {change > 0 ? '+' : ''}{change}%
            </span>
          </motion.div>
        ))}
      </motion.div>

      {/* AI insight pill */}
      {inView && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex-1 bg-zinc-900 rounded-sm border border-zinc-800 p-1.5 flex items-center gap-1.5"
        >
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-purple-400"
            animate={{ scale: [1, 1.4, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <span className="text-[6px] text-zinc-400 font-mono">AI rebalance suggestion: overweight ETH +3%</span>
        </motion.div>
      )}

      {inView && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
          className="flex justify-between"
        >
          <span className="text-[6px] text-zinc-600 font-mono">Multi-exchange aggregation</span>
          <span className="text-[6px] text-zinc-400 font-mono">Data visualization</span>
        </motion.div>
      )}
    </div>
  );
}
