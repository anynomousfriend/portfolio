import {
  Layout,
  Zap,
  Search,
  Smartphone,
  PenTool,
  Code,
} from 'lucide-react';
import type { SkillData } from '@/types';

export const skills: SkillData[] = [
  {
    title: 'Planning',
    desc: 'Strategic roadmaps',
    icon: <Layout size={20} />,
    size: 'col-span-1 md:col-span-2',
    renderVisual: (inView) => (
      <div className="w-full max-w-[180px] flex flex-col gap-3">
        <div className="flex gap-2 items-center">
          <div className="w-2 h-2 rounded-full bg-zinc-700" />
          <div className="h-2 bg-zinc-800 rounded-full w-full overflow-hidden relative">
            <div
              className={`absolute top-0 left-0 h-full bg-zinc-500 rounded-full ${inView ? 'animate-[expand-bar_2s_ease-out_forwards]' : 'opacity-0'
                }`}
              style={{ '--target-width': '40%' } as React.CSSProperties}
            />
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <div className="w-2 h-2 rounded-full bg-zinc-700" />
          <div className="h-2 bg-zinc-800 rounded-full w-full overflow-hidden relative">
            <div
              className={`absolute top-0 left-12 h-full bg-zinc-500 rounded-full ${inView ? 'animate-[expand-bar_2.5s_ease-out_forwards_0.5s]' : 'opacity-0'
                }`}
              style={{ '--target-width': '50%' } as React.CSSProperties}
            />
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <div className="w-2 h-2 rounded-full bg-zinc-700" />
          <div className="h-2 bg-zinc-800 rounded-full w-full overflow-hidden relative">
            <div
              className={`absolute top-0 right-0 h-full bg-zinc-600 rounded-full ${inView ? 'animate-[expand-bar_3s_ease-out_forwards_1s]' : 'opacity-0'
                }`}
              style={{ '--target-width': '30%' } as React.CSSProperties}
            />
          </div>
        </div>
      </div>
    ),
  },
  {
    title: 'Ideating',
    desc: 'Creative synthesis',
    icon: <Zap size={20} />,
    size: 'col-span-1 md:col-span-1',
    renderVisual: (inView) => (
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
        {/* Static Background Rings (Visible Track) - scaled down */}
        <div className={`absolute w-20 h-20 rounded-full border border-zinc-800 z-10 transition-all duration-1000 ${inView ? 'opacity-100' : 'opacity-20'}`} />

        {/* Central Core - scaled down */}
        <div
          className={`absolute w-10 h-10 bg-zinc-900 rounded-full border border-zinc-800 z-20 transition-all duration-1000 ease-out flex items-center justify-center ${inView ? 'opacity-100 scale-100' : 'opacity-40 scale-75'
            }`}
        >
          <div className={`w-3 h-3 bg-zinc-500 rounded-full transition-all duration-1000 ${inView ? 'shadow-[0_0_20px_rgba(113,113,122,0.8)] animate-pulse' : 'shadow-none opacity-50'}`} />
        </div>

        {/* Orbiting Elements */}
        {[0, 120, 240].map((deg, i) => (
          <div
            key={i}
            className={`absolute flex items-center justify-center transition-opacity duration-1000 z-30 ${inView ? 'opacity-100' : 'opacity-20'
              }`}
            style={{
              width: '100%',
              height: '100%',
              transform: `rotate(${deg}deg)`,
            }}
          >
            {/* Rotating Arm (Invisible container) - scaled down to match ring */}
            <div
              className={`w-20 h-20 rounded-full ${inView ? 'animate-orbit' : ''}`}
              style={{
                animationDuration: '10s',
                animationDelay: `${i * -3.33}s`,
                animationPlayState: inView ? 'running' : 'paused'
              }}
            >
              {/* The Idea Particle */}
              <div
                className={`absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full transition-all duration-1000 ${i === 0 ? 'bg-zinc-500' : i === 1 ? 'bg-zinc-500' : 'bg-zinc-600'
                  }`}
                style={{
                  boxShadow: inView
                    ? i === 0
                      ? '0 0 12px rgba(99, 102, 241, 0.6)'
                      : i === 1
                        ? '0 0 8px rgba(113, 113, 122, 0.4)'
                        : '0 0 8px rgba(82, 82, 91, 0.4)'
                    : 'none'
                }}
              />
            </div>
          </div>
        ))}

        {/* Subtle Background Glow */}
        <div className={`absolute inset-0 bg-gradient-to-tr from-zinc-500/5 via-transparent to-zinc-500/5 rounded-full blur-2xl transition-opacity duration-1000 ${inView ? 'opacity-100' : 'opacity-0'}`} />
      </div>
    ),
  },
  {
    title: 'Researching',
    desc: 'User insights',
    icon: <Search size={20} />,
    size: 'col-span-1 md:col-span-1',
    renderVisual: (inView) => (
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
        {/* Ambient Hidden Data Dots */}
        <div className="absolute inset-0 opacity-30">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-zinc-700 rounded-full"
              style={{
                top: `${20 + (i * 17) % 60}%`,
                left: `${15 + (i * 23) % 70}%`,
              }}
            />
          ))}
        </div>

        {/* Magnifying Glass Container */}
        <div
          className={`absolute transition-transform duration-[2.5s] ease-in-out z-10 ${inView ? 'translate-x-1 translate-y-[-4px] rotate-0' : 'translate-x-[-15px] translate-y-[8px] -rotate-12'
            }`}
        >
          <div className="relative w-[90px] h-[90px]">
            {/* Lens Content (Reveals Grid/Data inside) */}
            <div
              className="absolute rounded-full overflow-hidden flex items-center justify-center bg-zinc-950"
              style={{ width: '56px', height: '56px', top: '14px', left: '14px' }}
            >
              {/* Grid appearing inside lens */}
              <div
                className={`absolute inset-0 bg-[linear-gradient(rgba(113,113,122,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(113,113,122,0.2)_1px,transparent_1px)] bg-[size:10px_10px] transition-opacity duration-700 ${inView ? 'opacity-100' : 'opacity-0'}`}
              />

              {/* The "Found" Insight Core */}
              <div className={`relative z-10 w-6 h-6 bg-zinc-500/20 rounded-full flex items-center justify-center backdrop-blur-sm transition-all duration-500 ${inView ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}>
                <div className="w-2 h-2 bg-zinc-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(113,113,122,1)]" />
              </div>

              {/* Glass Gloss/Reflection */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />
            </div>

            {/* SVG Frame (Sits on top) */}
            <svg width="90" height="90" viewBox="0 0 100 100" fill="none" className="absolute inset-0 drop-shadow-xl pointer-events-none">
              {/* Handle */}
              <path d="M66 66 L82 82" stroke="#3f3f46" strokeWidth="10" strokeLinecap="round" />
              <path d="M66 66 L82 82" stroke="#27272a" strokeWidth="3" strokeLinecap="round" className="opacity-50" />

              {/* Rim */}
              <circle cx="42" cy="42" r="28" stroke="#27272a" strokeWidth="6" />
              <circle cx="42" cy="42" r="28" stroke={inView ? '#6366f1' : '#52525b'} strokeWidth="2" className="transition-colors duration-1000" />

              {/* Surface Reflection */}
              <path d="M50 24 Q 58 30 56 38" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.15" />
            </svg>
          </div>
        </div>

        {/* Floating Sparks representing extracted insights */}
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={`absolute w-1.5 h-1.5 bg-zinc-500 rounded-full transition-all duration-1000 ${inView ? 'opacity-100' : 'opacity-0'}`}
            style={{
              top: `${30 + i * 20}%`,
              right: `${15 + i * 5}%`,
              transform: inView ? `translate(0, 0)` : `translate(-10px, 10px)`,
              transitionDelay: `${0.5 + i * 0.2}s`,
              boxShadow: '0 0 6px rgba(99, 102, 241, 0.6)'
            }}
          />
        ))}
      </div>
    ),
  },
  {
    title: 'Prototyping',
    desc: 'Interactive mockups',
    icon: <Smartphone size={20} />,
    size: 'col-span-1 md:col-span-2',
    renderVisual: () => (
      <div className="relative w-full max-w-[220px] h-28 bg-zinc-900 border border-zinc-800 rounded-xl p-3 flex flex-col gap-2 overflow-hidden shadow-2xl">
        <div className="flex justify-between items-center px-1 opacity-30">
          <div className="w-8 h-1.5 bg-zinc-400 rounded-full" />
          <div className="flex gap-1">
            <div className="w-1.5 h-1.5 bg-zinc-400 rounded-full" />
            <div className="w-1.5 h-1.5 bg-zinc-400 rounded-full" />
          </div>
        </div>
        <div className="relative flex-1 w-full bg-zinc-950 rounded-lg border border-zinc-800 overflow-hidden">
          <div className="absolute inset-0 bg-zinc-600 flex items-center justify-between px-4">
            <span className="text-white text-xs font-bold">Archived</span>
            <div className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
          </div>
          <div className="absolute inset-0 bg-zinc-800 flex items-center px-3 gap-3 transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:translate-x-[60%] z-10 shadow-[-5px_0_15px_rgba(0,0,0,0.5)]">
            <div className="w-8 h-8 rounded-full bg-zinc-600 shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="w-20 h-2 bg-zinc-500 rounded-full mb-1.5" />
              <div className="w-12 h-1.5 bg-zinc-600 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: 'Designing',
    desc: 'Visual fidelity',
    icon: <PenTool size={20} />,
    size: 'col-span-1 md:col-span-1',
    renderVisual: (inView) => (
      <div className="relative w-full h-full flex items-center justify-center p-4">
        <div className="grid grid-cols-2 gap-2 transform rotate-12 group-hover:rotate-0 transition-transform duration-700 ease-out">
          <div className={`w-12 h-12 border border-white/20 bg-zinc-900 rounded-lg backdrop-blur-sm z-10 ${inView ? 'animate-float' : ''}`} />
          <div className={`w-12 h-12 bg-white rounded-full z-20 shadow-lg ${inView ? 'animate-float' : ''}`} style={{ animationDelay: '1s' }} />
          <div className={`w-12 h-12 bg-zinc-500 rounded-tr-xl z-0 ${inView ? 'animate-float' : ''}`} style={{ animationDelay: '2s' }} />
          <div className={`w-12 h-12 border-2 border-zinc-700 rounded-lg border-dashed z-10 ${inView ? 'animate-float' : ''}`} style={{ animationDelay: '0.5s' }} />
        </div>
      </div>
    ),
  },
  {
    title: 'Developing',
    desc: 'Robust code',
    icon: <Code size={20} />,
    size: 'col-span-1 md:col-span-1',
    renderVisual: (inView) => (
      <div className="w-full max-w-[200px] bg-zinc-950 border border-zinc-800 rounded p-3 font-mono text-[10px] leading-relaxed text-zinc-500 shadow-inner">
        <div className="flex gap-1.5 mb-2">
          <div className="w-2 h-2 rounded-full bg-zinc-900" />
          <div className="w-2 h-2 rounded-full bg-zinc-900" />
          <div className="w-2 h-2 rounded-full bg-zinc-900" />
        </div>
        <div className="space-y-1">
          <div className="flex">
            <span className="text-zinc-400 mr-1">const</span>
            <span className="text-zinc-400">future</span>
            <span className="text-white mx-1">=</span>
            <span className="text-zinc-300">await</span>
          </div>
          <div className="pl-2 flex items-center">
            <span className="text-white">build(</span>
            <span className={`inline-block w-16 h-2 bg-zinc-600 rounded ml-1 ${inView ? 'animate-pulse' : ''}`} />
            <span className="text-white">);</span>
          </div>
          <div className={`h-2 w-4 bg-white ${inView ? 'animate-[blink_1s_step-end_infinite]' : ''}`} />
        </div>
      </div>
    ),
  },
];
