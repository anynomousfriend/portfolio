'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import type { Variants, Transition } from 'framer-motion';

const ease = 'easeOut' as const;

// Shared skeleton shimmer element
function Skeleton({ className }: { className?: string }) {
  return (
    <div className={`bg-zinc-800 rounded-sm overflow-hidden relative ${className}`}>
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-zinc-600/30 to-transparent"
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
}

export function PolishedImageVisual({ imageUrl, fallbackAlt = 'Project Preview' }: PolishedImageVisualProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <div ref={ref} className="w-full h-full p-2 overflow-hidden relative group rounded-lg bg-zinc-950/40">
      {/* Ambient glowing gradient background */}
      <motion.div
        className="absolute inset-0 opacity-40 group-hover:opacity-60 transition-opacity duration-700 blur-2xl pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.25), rgba(59, 130, 246, 0.15), transparent 70%)',
        }}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 0.4 } : {}}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      />

      <div className="w-full h-full relative" style={{ perspective: '1000px' }}>
        {inView ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotateX: 15, rotateY: -10 }}
            animate={{ opacity: 1, scale: 0.9, rotateX: 5, rotateY: -5 }} // Zoomed out (scale: 0.9) with subtle 3D skew
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-full relative z-10 rounded-xl overflow-hidden shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] border border-white/10 bg-zinc-900 group-hover:shadow-[0_30px_50px_-15px_rgba(139,92,246,0.3)] transition-all duration-500 ease-out group-hover:rotate-x-0 group-hover:rotate-y-0 group-hover:scale-95"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Soft inner glow highlight */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none z-20" />

            {imageUrl ? (
              <img
                src={imageUrl}
                alt={fallbackAlt}
                className="w-full h-full object-cover sm:object-contain object-top"
                loading="lazy"
              />
            ) : (
              // Beautiful 3D skeleton fallback if no image is provided yet
              <div className="w-full h-full flex items-center justify-center p-6 bg-zinc-900/80 backdrop-blur">
                <div className="w-full h-full flex flex-col gap-3">
                  <Skeleton className="w-full h-3/4 rounded-md" />
                  <div className="flex gap-2">
                    <Skeleton className="w-12 h-4 rounded" />
                    <Skeleton className="w-24 h-4 rounded" />
                  </div>
                  <Skeleton className="w-full h-10 rounded mt-auto" />
                </div>
              </div>
            )}
          </motion.div>
        ) : (
          <Skeleton className="w-full h-full" />
        )}
      </div>
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
