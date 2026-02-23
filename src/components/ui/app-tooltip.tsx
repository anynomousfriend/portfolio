'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type AppType = 'risk' | 'legal' | 'medical' | 'productivity';

const appMeta: Record<AppType, { name: string; desc: string }> = {
  risk: {
    name: 'Risk Management SaaS',
    desc: 'Dense financial data chunked into digestible widget dashboards.',
  },
  legal: {
    name: "Lawyer's SaaS",
    desc: 'High-frequency case actions positioned for rapid document workflows.',
  },
  medical: {
    name: 'Medical Apps',
    desc: 'Patient journeys mapped to ensure positive emotional resonance.',
  },
  productivity: {
    name: 'Productivity Apps',
    desc: 'Visual progress indicators that drive habit formation and task completion.',
  },
};

// ── SVG Visualizations ───────────────────────────────────────────────────────

function RiskSvg() {
  const bars = [
    { x: 18, height: 28, delay: 0.1 },
    { x: 38, height: 44, delay: 0.2 },
    { x: 58, height: 20, delay: 0.3 },
    { x: 78, height: 36, delay: 0.15 },
    { x: 98, height: 52, delay: 0.25 },
  ];
  return (
    <svg viewBox="0 0 160 72" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Grid lines */}
      {[20, 36, 52].map((y, i) => (
        <motion.line key={i} x1={10} y1={y} x2={150} y2={y}
          stroke="#27272a" strokeWidth={0.5}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.05 * i }} />
      ))}
      {/* Bars */}
      {bars.map((b, i) => (
        <motion.rect
          key={i}
          x={b.x} y={60 - b.height} width={14} height={b.height} rx={2}
          fill={i === 4 ? '#6366f1' : '#3f3f46'}
          initial={{ scaleY: 0, originY: 1 }}
          animate={{ scaleY: 1 }}
          style={{ transformOrigin: `${b.x + 7}px 60px` }}
          transition={{ delay: b.delay, duration: 0.5, ease: 'easeOut' }}
        />
      ))}
      {/* Risk threshold line */}
      <motion.line x1={10} y1={24} x2={150} y2={24}
        stroke="#6366f1" strokeWidth={1} strokeDasharray="4 3"
        initial={{ scaleX: 0, originX: 0 }} animate={{ scaleX: 1 }}
        style={{ transformOrigin: '10px 24px' }}
        transition={{ delay: 0.6, duration: 0.6, ease: 'easeOut' }}
      />
      {/* Threshold label */}
      <motion.text x={152} y={23} fontSize={6} fill="#818cf8" fontFamily="monospace" textAnchor="end"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
        risk threshold
      </motion.text>
      {/* Widget header bar */}
      <motion.rect x={10} y={62} width={140} height={1} rx={0.5} fill="#27272a"
        initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
        style={{ transformOrigin: '10px 62px' }}
        transition={{ delay: 0.05, duration: 0.4 }} />
    </svg>
  );
}

function LegalSvg() {
  const docs = [
    { y: 8, titleW: 70, badgeLabel: 'Open', badgeColor: '#6366f1', delay: 0.1 },
    { y: 28, titleW: 55, badgeLabel: 'Review', badgeColor: '#52525b', delay: 0.2 },
    { y: 48, titleW: 80, badgeLabel: 'Closed', badgeColor: '#3f3f46', delay: 0.3 },
  ];
  return (
    <svg viewBox="0 0 160 72" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {docs.map((doc, i) => (
        <g key={i}>
          {/* Document row bg */}
          <motion.rect x={8} y={doc.y} width={144} height={16} rx={3}
            fill="#18181b"
            initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
            transition={{ delay: doc.delay, duration: 0.4, ease: 'easeOut' }}
          />
          {/* Doc icon */}
          <motion.rect x={13} y={doc.y + 4} width={8} height={8} rx={1}
            fill="#3f3f46"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: doc.delay + 0.1 }}
          />
          <motion.line x1={14.5} y1={doc.y + 7} x2={19.5} y2={doc.y + 7}
            stroke="#52525b" strokeWidth={1}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: doc.delay + 0.15 }}
          />
          {/* Title line */}
          <motion.rect x={26} y={doc.y + 5} width={doc.titleW} height={3} rx={1.5}
            fill="#52525b"
            initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
            style={{ transformOrigin: '26px center' }}
            transition={{ delay: doc.delay + 0.1, duration: 0.4, ease: 'easeOut' }}
          />
          {/* Status badge */}
          <motion.rect x={120} y={doc.y + 3} width={28} height={10} rx={3}
            fill={doc.badgeColor + '33'}
            stroke={doc.badgeColor}
            strokeWidth={0.5}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: doc.delay + 0.2 }}
          />
          <motion.text x={134} y={doc.y + 10.5} fontSize={5.5} fill={doc.badgeColor}
            fontFamily="monospace" textAnchor="middle"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: doc.delay + 0.25 }}>
            {doc.badgeLabel}
          </motion.text>
        </g>
      ))}
    </svg>
  );
}

function MedicalSvg() {
  // Heartbeat path
  const heartbeatPath = 'M 10,40 L 40,40 L 48,20 L 56,56 L 64,32 L 72,44 L 80,44 L 150,44';
  return (
    <svg viewBox="0 0 160 72" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Patient card bg */}
      <motion.rect x={8} y={4} width={64} height={32} rx={4}
        fill="#18181b" stroke="#27272a" strokeWidth={1}
        initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1, duration: 0.4 }}
      />
      {/* Avatar */}
      <motion.circle cx={24} cy={20} r={9}
        fill="#27272a" stroke="#3f3f46" strokeWidth={1}
        initial={{ scale: 0 }} animate={{ scale: 1 }}
        transition={{ delay: 0.2, duration: 0.35, ease: 'backOut' }}
      />
      <motion.circle cx={24} cy={17} r={3.5} fill="#52525b"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }} />
      <motion.ellipse cx={24} cy={26} rx={6} ry={4} fill="#52525b"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} />
      {/* Name line */}
      <motion.rect x={37} y={14} width={28} height={3} rx={1.5} fill="#52525b"
        initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
        style={{ transformOrigin: '37px center' }}
        transition={{ delay: 0.3, duration: 0.35 }}
      />
      {/* Sub line */}
      <motion.rect x={37} y={20} width={20} height={2.5} rx={1.25} fill="#3f3f46"
        initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
        style={{ transformOrigin: '37px center' }}
        transition={{ delay: 0.35, duration: 0.3 }}
      />
      {/* Status dot */}
      <motion.circle cx={60} cy={10} r={3} fill="#6366f1"
        initial={{ scale: 0 }} animate={{ scale: 1 }}
        transition={{ delay: 0.5, duration: 0.3, ease: 'backOut' }}
      />
      {/* Heartbeat line */}
      <motion.path
        d={heartbeatPath}
        stroke="#3f3f46" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"
        strokeDasharray="200"
        initial={{ strokeDashoffset: 200, opacity: 0 }}
        animate={{ strokeDashoffset: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 1, ease: 'easeInOut' }}
      />
      {/* Highlight the peak segment */}
      <motion.path
        d="M 48,20 L 56,56 L 64,32"
        stroke="#6366f1" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"
        strokeDasharray="60"
        initial={{ strokeDashoffset: 60, opacity: 0 }}
        animate={{ strokeDashoffset: 0, opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.5, ease: 'easeOut' }}
      />
      {/* Label */}
      <motion.text x={80} y={68} fontSize={6.5} fill="#52525b" fontFamily="monospace"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}>
        vitals
      </motion.text>
    </svg>
  );
}

function ProductivitySvg() {
  const columns = [
    { label: 'Todo', x: 8, cards: [20, 14, 18], active: false },
    { label: 'In Progress', x: 58, cards: [16, 22], active: true },
    { label: 'Done', x: 108, cards: [14, 18, 12, 16], active: false },
  ];
  return (
    <svg viewBox="0 0 160 72" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {columns.map((col, ci) => (
        <g key={ci}>
          {/* Column bg */}
          <motion.rect x={col.x} y={4} width={46} height={64} rx={4}
            fill={col.active ? '#1e1b4b' : '#18181b'}
            stroke={col.active ? '#4f46e5' : '#27272a'}
            strokeWidth={col.active ? 1 : 0.5}
            initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: ci * 0.12, duration: 0.4, ease: 'easeOut' }}
          />
          {/* Column label */}
          <motion.text x={col.x + 23} y={13} fontSize={5.5}
            fill={col.active ? '#818cf8' : '#52525b'}
            fontFamily="monospace" textAnchor="middle"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: ci * 0.12 + 0.2 }}>
            {col.label}
          </motion.text>
          {/* Cards */}
          {col.cards.map((w, ki) => (
            <motion.rect
              key={ki}
              x={col.x + 5} y={17 + ki * 13} width={w + 8} height={9} rx={2}
              fill={col.active ? '#312e81' : '#27272a'}
              stroke={col.active ? '#6366f1' : '#3f3f46'}
              strokeWidth={0.5}
              initial={{ opacity: 0, x: -4 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: ci * 0.12 + ki * 0.08 + 0.3, duration: 0.35, ease: 'easeOut' }}
            />
          ))}
          {/* Pulse on active column */}
          {col.active && (
            <motion.rect x={col.x} y={4} width={46} height={64} rx={4}
              fill="transparent"
              stroke="#818cf8"
              strokeWidth={1}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.6, 0] }}
              transition={{ delay: 1, duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            />
          )}
        </g>
      ))}
    </svg>
  );
}

const svgMap: Record<AppType, React.ReactNode> = {
  risk: <RiskSvg />,
  legal: <LegalSvg />,
  medical: <MedicalSvg />,
  productivity: <ProductivitySvg />,
};

// ── Main component ───────────────────────────────────────────────────────────

type Props = {
  app: AppType;
  children: React.ReactNode;
};

export function AppTooltip({ app, children }: Props) {
  const [visible, setVisible] = useState(false);
  const meta = appMeta[app];

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
              <span className="block font-mono text-[9px] uppercase tracking-widest text-indigo-400 mb-1">
                {meta.name}
              </span>
              <span className="block text-[11px] text-zinc-400 leading-snug mb-3">
                {meta.desc}
              </span>
              <span className="block w-full h-20">
                {svgMap[app]}
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
