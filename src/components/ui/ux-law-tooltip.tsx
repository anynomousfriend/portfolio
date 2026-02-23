'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type UxLaw = 'millers' | 'fitts' | 'peak-end' | 'zeigarnik';

const lawMeta: Record<UxLaw, { name: string; desc: string }> = {
  millers: {
    name: "Miller's Law",
    desc: 'Humans hold ~7 (±2) chunks in working memory at once.',
  },
  fitts: {
    name: "Fitts's Law",
    desc: 'Larger, closer targets are faster and easier to acquire.',
  },
  'peak-end': {
    name: 'Peak-End Rule',
    desc: 'Experiences are judged by their peak moment and how they end.',
  },
  zeigarnik: {
    name: 'Zeigarnik Effect',
    desc: 'Incomplete tasks are remembered better than completed ones.',
  },
};

// ── SVG visualizations ──────────────────────────────────────────────────────

function MillersSvg() {
  // 9 dots arranged in 3 groups of 3, grouped with subtle gap between groups
  const groups = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
  ];
  return (
    <svg viewBox="0 0 160 72" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {groups.map((group, gi) =>
        group.map((di, li) => (
          <motion.circle
            key={`${gi}-${li}`}
            cx={20 + gi * 54 + li * 14}
            cy={36}
            r={5}
            fill={gi === 1 ? '#818cf8' : '#3f3f46'}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: gi * 0.15 + li * 0.07, duration: 0.4, ease: 'backOut' }}
          />
        ))
      )}
      {/* Group brackets */}
      {groups.map((_, gi) => (
        <motion.rect
          key={gi}
          x={12 + gi * 54}
          y={24}
          width={42}
          height={24}
          rx={6}
          stroke={gi === 1 ? '#6366f1' : '#27272a'}
          strokeWidth={1}
          fill="none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 + gi * 0.1, duration: 0.35 }}
        />
      ))}
      {/* Label */}
      <motion.text
        x={80} y={66}
        textAnchor="middle"
        fontSize={8}
        fill="#52525b"
        fontFamily="monospace"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        3 chunks · 9 items
      </motion.text>
    </svg>
  );
}

function FittsSvg() {
  return (
    <svg viewBox="0 0 160 72" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Far small target */}
      <motion.rect x={120} y={28} width={12} height={16} rx={3}
        fill="#27272a" stroke="#3f3f46" strokeWidth={1}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} />
      {/* Near large target */}
      <motion.rect x={80} y={20} width={28} height={32} rx={5}
        fill="#1e1b4b" stroke="#6366f1" strokeWidth={1.5}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} />

      {/* Cursor path to large target */}
      <motion.path
        d="M 20 36 C 40 36, 60 36, 80 36"
        stroke="#6366f1" strokeWidth={1.5} strokeLinecap="round"
        strokeDasharray="80"
        initial={{ strokeDashoffset: 80, opacity: 0 }}
        animate={{ strokeDashoffset: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.7, ease: 'easeInOut' }}
      />
      {/* Cursor dot */}
      <motion.circle cx={20} cy={36} r={4} fill="#a5b4fc"
        initial={{ cx: 20 }}
        animate={{ cx: 80 }}
        transition={{ delay: 0.4, duration: 0.7, ease: 'easeInOut' }}
      />

      {/* Dashed path to small target */}
      <motion.path
        d="M 20 36 C 60 36, 100 28, 120 36"
        stroke="#3f3f46" strokeWidth={1} strokeLinecap="round" strokeDasharray="4 4"
        initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} transition={{ delay: 0.3 }}
      />

      {/* Labels */}
      <motion.text x={94} y={67} textAnchor="middle" fontSize={7} fill="#6366f1" fontFamily="monospace"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}>
        easy
      </motion.text>
      <motion.text x={126} y={67} textAnchor="middle" fontSize={7} fill="#52525b" fontFamily="monospace"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}>
        hard
      </motion.text>
    </svg>
  );
}

function PeakEndSvg() {
  // Journey line with a peak and highlighted endpoint
  const points = '10,56 30,48 50,30 70,42 90,18 110,38 140,28 155,50';
  return (
    <svg viewBox="0 0 160 72" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Base journey line */}
      <motion.polyline
        points={points}
        stroke="#52525b" strokeWidth={1.5} fill="none" strokeLinecap="round" strokeLinejoin="round"
        strokeDasharray="300"
        initial={{ strokeDashoffset: 300, opacity: 0 }}
        animate={{ strokeDashoffset: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 1, ease: 'easeInOut' }}
      />
      {/* Peak highlight dot */}
      <motion.circle cx={90} cy={18} r={5} fill="#ffffff"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.4, ease: 'backOut' }}
      />
      {/* Peak label */}
      <motion.text x={90} y={12} textAnchor="middle" fontSize={7} fill="#d4d4d8" fontFamily="monospace"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}>
        peak
      </motion.text>
      {/* End highlight dot */}
      <motion.circle cx={155} cy={50} r={5} fill="#a1a1aa"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.4, ease: 'backOut' }}
      />
      {/* End label */}
      <motion.text x={155} y={65} textAnchor="middle" fontSize={7} fill="#d4d4d8" fontFamily="monospace"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}>
        end
      </motion.text>
    </svg>
  );
}

function ZeigarnikSvg() {
  const tasks = [
    { label: 'Research', done: true },
    { label: 'Wireframe', done: true },
    { label: 'Prototype', done: false },
    { label: 'Test', done: false },
  ];
  return (
    <svg viewBox="0 0 160 72" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {tasks.map((task, i) => (
        <g key={i} transform={`translate(10, ${8 + i * 16})`}>
          {/* Track */}
          <rect x={0} y={3} width={100} height={6} rx={3} fill="#27272a" />
          {/* Fill */}
          <motion.rect
            x={0} y={3} width={task.done ? 100 : 45} height={6} rx={3}
            fill={task.done ? '#71717a' : '#d4d4d8'}
            initial={{ width: 0 }}
            animate={{ width: task.done ? 100 : 45 }}
            transition={{ delay: 0.2 + i * 0.15, duration: 0.6, ease: 'easeOut' }}
          />
          {/* Pulse on incomplete */}
          {!task.done && (
            <motion.rect
              x={0} y={3} width={45} height={6} rx={3}
              fill="#ffffff"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.4, 0] }}
              transition={{ delay: 1.2, duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
            />
          )}
          {/* Checkmark or dot */}
          <motion.circle
            cx={108} cy={6} r={4}
            fill={task.done ? '#52525b' : '#27272a'}
            stroke={task.done ? '#a1a1aa' : '#3f3f46'}
            strokeWidth={1}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5 + i * 0.15, duration: 0.3, ease: 'backOut' }}
          />
          {task.done && (
            <motion.text x={104.5} y={9.5} fontSize={5} fill="white" fontFamily="monospace"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 + i * 0.1 }}>
              ✓
            </motion.text>
          )}
          {/* Task label */}
          <motion.text x={118} y={9.5} fontSize={7} fill={task.done ? '#71717a' : '#e4e4e7'} fontFamily="monospace"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 + i * 0.15 }}>
            {task.label}
          </motion.text>
        </g>
      ))}
    </svg>
  );
}

const svgMap: Record<UxLaw, React.ReactNode> = {
  millers: <MillersSvg />,
  fitts: <FittsSvg />,
  'peak-end': <PeakEndSvg />,
  zeigarnik: <ZeigarnikSvg />,
};

// ── Main component ───────────────────────────────────────────────────────────

type Props = {
  law: UxLaw;
  children: React.ReactNode;
};

export function UxLawTooltip({ law, children }: Props) {
  const [visible, setVisible] = useState(false);
  const meta = lawMeta[law];

  return (
    <span
      className="relative inline-block"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {/* Keyword */}
      <span className="text-indigo-300 font-semibold cursor-default border-b border-dashed border-indigo-500/40 transition-colors duration-200 hover:border-indigo-400">
        {children}
      </span>

      {/* Floating tooltip */}
      <AnimatePresence>
        {visible && (
          <motion.div
            role="tooltip"
            className="pointer-events-none absolute bottom-[calc(100%+10px)] left-1/2 z-50 w-56"
            style={{ x: '-50%' }}
            initial={{ opacity: 0, y: 6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.97 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <div className="rounded-xl bg-zinc-900/95 border border-zinc-800 shadow-2xl shadow-black/70 backdrop-blur-sm p-4">
              {/* Law name */}
              <span className="block font-mono text-[9px] uppercase tracking-widest text-indigo-400 mb-1">
                {meta.name}
              </span>
              {/* Description */}
              <span className="block text-[11px] text-zinc-400 leading-snug mb-3">
                {meta.desc}
              </span>
              {/* SVG visualization */}
              <span className="block w-full h-20">
                {svgMap[law]}
              </span>
            </div>
            {/* Arrow */}
            <div className="absolute left-1/2 -translate-x-1/2 -bottom-[6px] w-3 h-3 rotate-45 bg-zinc-900 border-r border-b border-zinc-800" />
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
}
