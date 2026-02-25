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
    renderVisual: (inView, mousePos) => (
      <div className="relative w-full max-w-[240px] h-28 bg-zinc-950/80 backdrop-blur-md border border-zinc-800/80 rounded-xl p-3 flex flex-col gap-2.5 overflow-hidden shadow-2xl group cursor-crosshair">
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#3f3f46_1px,transparent_1px),linear-gradient(to_bottom,#3f3f46_1px,transparent_1px)] bg-[size:16px_16px] opacity-[0.07]" />

        {/* Header timeline */}
        <div className="flex justify-between items-center px-1 mb-1 z-10 w-full opacity-60">
          <div className="flex gap-4">
            <div className="text-[9px] font-mono text-zinc-500">Q1</div>
            <div className="text-[9px] font-mono text-zinc-500">Q2</div>
            <div className="text-[9px] font-mono text-zinc-500">Q3</div>
          </div>
        </div>

        {/* Custom Timeline Bars */}
        <div className="relative z-10 flex flex-col gap-2">
          {/* Bar 1: Indigo */}
          <div className="w-full h-3 bg-zinc-900 rounded-full overflow-hidden relative border border-zinc-800/50">
            <div
              className={`absolute top-0 left-0 h-full rounded-full bg-gradient-to-r from-indigo-600 to-indigo-400 ${inView ? 'animate-[expand-bar_1.5s_cubic-bezier(0.16,1,0.3,1)_forwards]' : 'w-0'
                }`}
              style={{ '--target-width': '45%' } as React.CSSProperties}
            >
              <div className="absolute inset-0 bg-white/20 w-1/2 -skew-x-12 translate-x-[-150%] animate-[shine_2s_infinite]" />
            </div>
          </div>

          {/* Bar 2: Emerald */}
          <div className="w-full h-3 bg-zinc-900 rounded-full overflow-hidden relative border border-zinc-800/50 ml-4 max-w-[calc(100%-1rem)]">
            <div
              className={`absolute top-0 left-0 h-full rounded-full bg-gradient-to-r from-emerald-600 to-emerald-400 ${inView ? 'animate-[expand-bar_1.5s_cubic-bezier(0.16,1,0.3,1)_forwards_0.2s]' : 'w-0'
                }`}
              style={{ '--target-width': '60%' } as React.CSSProperties}
            >
              <div className="absolute inset-0 bg-white/20 w-1/2 -skew-x-12 translate-x-[-150%] animate-[shine_2s_infinite_0.5s]" />
            </div>
          </div>

          {/* Bar 3: Pink */}
          <div className="w-full h-3 bg-zinc-900 rounded-full overflow-hidden relative border border-zinc-800/50 ml-12 max-w-[calc(100%-3rem)]">
            <div
              className={`absolute top-0 left-0 h-full rounded-full bg-gradient-to-r from-pink-600 to-pink-400 ${inView ? 'animate-[expand-bar_1.5s_cubic-bezier(0.16,1,0.3,1)_forwards_0.4s]' : 'w-0'
                }`}
              style={{ '--target-width': '50%' } as React.CSSProperties}
            >
              <div className="absolute inset-0 bg-white/20 w-1/2 -skew-x-12 translate-x-[-150%] animate-[shine_2s_infinite_1s]" />
            </div>
          </div>
        </div>

        {/* Scrubber/Playhead - Interacts with Mouse X position */}
        <div
          className={`absolute top-0 bottom-0 w-[1px] bg-sky-400/80 shadow-[0_0_8px_rgba(56,189,248,0.8)] z-20 transition-all duration-75 ease-out`}
          style={{
            left: mousePos && (mousePos.x !== 0 || mousePos.y !== 0)
              ? `calc(50% + ${mousePos.x * 50}%)`
              : inView ? '50%' : '0%'
          }}
        >
          <div className="absolute -top-1 -left-1 w-2.5 h-2.5 rounded-full border border-sky-400 bg-zinc-950" />
        </div>
      </div>
    ),
  },
  {
    title: 'Ideating',
    desc: 'Creative synthesis',
    icon: <Zap size={20} />,
    size: 'col-span-1 md:col-span-1',
    renderVisual: (inView, mousePos) => (
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-xl">
        {/* Deep ambient glow */}
        <div className={`absolute inset-0 bg-gradient-radial from-violet-500/10 via-transparent to-transparent transition-opacity duration-1000 ${inView ? 'opacity-100' : 'opacity-0'}`} />

        {/* 3D Core Container - Parallax interaction */}
        <div
          className="relative w-24 h-24 flex items-center justify-center [transform-style:preserve-3d] [perspective:800px] transition-transform duration-150 ease-out"
          style={{
            transform: mousePos && (mousePos.x !== 0 || mousePos.y !== 0)
              ? `rotateX(${-mousePos.y * 25}deg) rotateY(${mousePos.x * 25}deg)`
              : 'rotateX(0deg) rotateY(0deg)'
          }}
        >

          {/* Inner Glowing Core */}
          <div className={`absolute w-8 h-8 rounded-full bg-gradient-to-br from-violet-400 to-fuchsia-600 blur-[2px] z-20 transition-all duration-[1.5s] ease-out flex items-center justify-center
            ${inView ? 'opacity-100 scale-100 shadow-[0_0_30px_rgba(167,139,250,0.6)] animate-pulse' : 'opacity-20 scale-50'}`}
          >
            <div className="w-full h-full rounded-full bg-white/20 blur-[1px]" />
          </div>

          {/* Ring 1 - Fast, tilted */}
          <div className={`absolute w-16 h-16 rounded-full border border-violet-400/40 z-10 transition-all duration-1000
            ${inView ? 'opacity-100 animate-[spin_4s_linear_infinite]' : 'opacity-10'}`}
            style={{ transform: 'rotateX(60deg) rotateY(20deg)' }}
          >
            <div className="absolute -top-1 left-1/2 w-2 h-2 rounded-full bg-violet-400 shadow-[0_0_10px_rgba(167,139,250,1)]" />
          </div>

          {/* Ring 2 - Medium, opposite tilt, dashed */}
          <div className={`absolute w-20 h-20 rounded-full border border-fuchsia-400/30 border-dashed z-10 transition-all duration-1000 delay-100
            ${inView ? 'opacity-100 animate-[spin_6s_linear_infinite_reverse]' : 'opacity-10'}`}
            style={{ transform: 'rotateX(-50deg) rotateY(-30deg)' }}
          >
            <div className="absolute top-1/2 -right-1 w-1.5 h-1.5 rounded-full bg-fuchsia-400 shadow-[0_0_8px_rgba(232,121,249,1)]" />
          </div>

          {/* outer Ring 3 - Slow, vast */}
          <div className={`absolute w-28 h-28 rounded-full border border-zinc-700/50 z-0 transition-all duration-1000 delay-200
            ${inView ? 'opacity-100 animate-[spin_10s_linear_infinite]' : 'opacity-5'}`}
            style={{ transform: 'rotateX(70deg) rotateY(-10deg)' }}
          >
            <div className="absolute bottom-0 left-1/2 w-1 h-1 rounded-full bg-zinc-400" />
          </div>
        </div>
      </div>
    ),
  },
  {
    title: 'Researching',
    desc: 'User insights',
    icon: <Search size={20} />,
    size: 'col-span-1 md:col-span-1',
    renderVisual: (inView, mousePos) => (
      <div
        className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-xl bg-zinc-950/50 cursor-crosshair"
      >
        {/* Background Abstract Data Grid - Paralax */}
        <div
          className={`absolute inset-0 bg-[linear-gradient(rgba(113,113,122,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(113,113,122,0.1)_1px,transparent_1px)] bg-[size:12px_12px] opacity-70 transition-transform duration-300 ease-out`}
          style={{
            transform: mousePos && (mousePos.x !== 0 || mousePos.y !== 0)
              ? `scale(1.15) translate(${-mousePos.x * 10}px, ${-mousePos.y * 10}px)`
              : `scale(${inView ? 1.1 : 1}) translate(0, 0)`
          }}
        />

        {/* The Spotlight Light Source that follows mouse */}
        <div
          className="absolute w-40 h-40 bg-sky-500/20 rounded-full blur-[40px] transition-all duration-75 ease-out z-0 pointer-events-none"
          style={{
            opacity: mousePos && (mousePos.x !== 0 || mousePos.y !== 0) ? 1 : 0,
            left: mousePos ? `calc(50% + ${mousePos.x * 50}% - 5rem)` : '50%',
            top: mousePos ? `calc(50% + ${mousePos.y * 50}% - 5rem)` : '50%',
          }}
        />

        {/* Glowing "Insights" hidden in grid */}
        <div className={`absolute top-[30%] left-[20%] w-3 h-3 bg-indigo-500 rounded-full blur-[2px] transition-opacity duration-1000 delay-300 ${inView ? 'opacity-40 animate-pulse' : 'opacity-0'}`} />
        <div className={`absolute bottom-[40%] right-[30%] w-2 h-2 bg-emerald-400 rounded-full blur-[1px] transition-opacity duration-1000 delay-700 ${inView ? 'opacity-60 animate-pulse' : 'opacity-0'}`} />

        {/* The Radar/Scanner Lens - Follows the mouse directly */}
        <div
          className={`absolute transition-all duration-150 ease-out z-10 w-24 h-24 rounded-full border border-sky-400/30 bg-sky-900/10 backdrop-blur-[2px] shadow-[inset_0_0_20px_rgba(56,189,248,0.1)] flex items-center justify-center pointer-events-none`}
          style={{
            left: mousePos && (mousePos.x !== 0 || mousePos.y !== 0) ? `calc(50% + ${mousePos.x * 50}% - 3rem)` : 'calc(50% - 3rem)',
            top: mousePos && (mousePos.x !== 0 || mousePos.y !== 0) ? `calc(50% + ${mousePos.y * 50}% - 3rem)` : 'calc(50% - 3rem)',
            transform: !inView ? 'scale(0.5) opacity-0' : 'scale(1)',
          }}
        >
          {/* Inner focus ring */}
          <div className={`w-12 h-12 rounded-full border border-sky-400/50 flex items-center justify-center transition-transform duration-[2s] delay-500 ${inView ? 'scale-100' : 'scale-50'}`}>
            {/* The dot illuminates when you find an insight (when mouse is near center) */}
            <div
              className={`w-1.5 h-1.5 bg-sky-300 rounded-full shadow-[0_0_10px_rgba(56,189,248,1)] transition-all duration-300 delay-1000`}
              style={{
                opacity: inView ? ((mousePos && Math.abs(mousePos.x) < 0.2 && Math.abs(mousePos.y) < 0.2) ? 1 : 0.3) : 0,
                transform: (mousePos && Math.abs(mousePos.x) < 0.2 && Math.abs(mousePos.y) < 0.2) ? 'scale(1.5)' : 'scale(1)'
              }}
            />
          </div>

          {/* Scanner sweep line */}
          <div className="absolute inset-0 rounded-full overflow-hidden mask-image-radial-fade">
            <div className={`w-1/2 h-full bg-gradient-to-r from-transparent to-sky-400/20 origin-right transition-opacity duration-1000 ${inView ? 'animate-[spin_2s_linear_infinite] opacity-100' : 'opacity-0'}`} />
          </div>

          {/* Lens glare */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
        </div>
      </div>
    ),
  },
  {
    title: 'Prototyping',
    desc: 'Interactive mockups',
    icon: <Smartphone size={20} />,
    size: 'col-span-1 md:col-span-2',
    renderVisual: (inView, mousePos) => (
      <div
        className="relative w-full max-w-[240px] h-32 bg-zinc-900/80 backdrop-blur shadow-2xl border border-zinc-800 rounded-xl p-3 flex flex-col gap-2 overflow-hidden group cursor-pointer transition-transform duration-300"
        style={{
          transform: mousePos && (mousePos.x !== 0 || mousePos.y !== 0)
            ? `rotateX(${-mousePos.y * 5}deg) rotateY(${mousePos.x * 5}deg) scale(1.02)`
            : 'rotateX(0deg) rotateY(0deg) scale(1)'
        }}
      >

        {/* Window Chrome */}
        <div className="flex justify-between items-center px-1 opacity-40">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 bg-zinc-600 rounded-full" />
            <div className="w-2.5 h-2.5 bg-zinc-600 rounded-full" />
            <div className="w-2.5 h-2.5 bg-zinc-600 rounded-full" />
          </div>
          <div className="w-16 h-1.5 bg-zinc-700/50 rounded-full" />
        </div>

        {/* Content Area */}
        <div className="relative flex-1 w-full bg-zinc-950/50 rounded-lg border border-zinc-800/50 overflow-hidden p-2 flex flex-col gap-2">

          {/* Skeleton Header */}
          <div className="flex gap-2 items-center">
            <div className={`w-6 h-6 rounded-md bg-zinc-800 overflow-hidden relative ${inView ? 'opacity-100' : 'opacity-50'}`}>
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20" />
            </div>
            <div className="space-y-1">
              <div className="w-16 h-1.5 bg-zinc-700 rounded-full" />
              <div className="w-10 h-1 bg-zinc-800 rounded-full" />
            </div>
          </div>

          {/* Skeleton Body blocks - hover effect */}
          <div className="grid grid-cols-2 gap-2 mt-1">
            <div className={`h-8 rounded-[4px] bg-zinc-800/80 overflow-hidden relative transition-all duration-300
              ${inView ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'}
              ${mousePos && mousePos.x < 0 && mousePos.y > 0 ? 'bg-zinc-700/80 scale-[1.03] ring-1 ring-sky-500/50' : 'scale-100'}
            `} style={{ transitionDelay: '0.1s' }}>
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
            </div>
            <div className={`h-8 rounded-[4px] bg-zinc-800/80 overflow-hidden relative transition-all duration-300
              ${inView ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'}
              ${mousePos && mousePos.x > 0 && mousePos.y > 0 ? 'bg-zinc-700/80 scale-[1.03] ring-1 ring-emerald-500/50' : 'scale-100'}
            `} style={{ transitionDelay: '0.2s' }}>
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
            </div>
          </div>

          {/* Glowing Cursor interaction - follows the user's mouse within boundaries */}
          <div
            className={`absolute z-20 transition-all duration-150 ease-out`}
            style={{
              left: mousePos && (mousePos.x !== 0 || mousePos.y !== 0) ? `calc(50% + ${mousePos.x * 25}% + 1rem)` : 'auto',
              top: mousePos && (mousePos.x !== 0 || mousePos.y !== 0) ? `calc(50% + ${mousePos.y * 30}% + 1rem)` : 'auto',
              bottom: !(mousePos && (mousePos.x !== 0 || mousePos.y !== 0)) ? '0.75rem' : 'auto',
              right: !(mousePos && (mousePos.x !== 0 || mousePos.y !== 0)) ? '2rem' : 'auto',
              transform: inView ? 'scale(100%)' : 'scale(150%)',
              opacity: inView ? 1 : 0
            }}
          >
            {/* SVG Cursor Apple style */}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="drop-shadow-lg filter">
              <path d="M4 2L20 10.6L11.4 13.4L8 22L4 2Z" fill="white" stroke="#3f3f46" strokeWidth="1.5" strokeLinejoin="round" />
            </svg>

            {/* Click Ripple effect only happens when mouse is inside */}
            <div className={`absolute -top-1.5 -left-1.5 w-6 h-6 rounded-full border border-white/50 bg-white/10 
              ${Boolean(mousePos && (mousePos.x !== 0 || mousePos.y !== 0)) ? 'animate-[ping_1s_cubic-bezier(0,0,0.2,1)_infinite]' : 'hidden'}
            `} />
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
    renderVisual: (inView, mousePos) => (
      <div
        className="relative w-full h-full flex items-center justify-center p-4 overflow-hidden rounded-xl perspective-[800px] cursor-move group/design"
      >
        {/* Soft background light */}
        <div className={`absolute inset-0 bg-gradient-radial from-emerald-500/5 via-transparent to-transparent transition-opacity duration-1000 ${inView ? 'opacity-100' : 'opacity-0'}`} />

        {/* 3D Composition Container */}
        <div
          className="relative w-24 h-24 transform-style-3d transition-transform duration-300 ease-out"
          style={{
            transform: mousePos && (mousePos.x !== 0 || mousePos.y !== 0)
              ? `rotateX(${-mousePos.y * 30}deg) rotateY(${mousePos.x * 30}deg) scale(1.15)`
              : (inView ? 'rotateX(20deg) rotateZ(-15deg) scale(1.1)' : 'rotateX(0deg) rotateZ(0deg) scale(0.8)')
          }}
        >
          {/* Glass Card (Back layer) */}
          <div className={`absolute inset-2 border border-white/10 bg-zinc-900/60 backdrop-blur-md rounded-xl z-10 transition-all duration-500 shadow-2xl
            ${inView ? 'opacity-100' : 'opacity-0'}`}
            style={{
              transform: mousePos && (mousePos.x !== 0 || mousePos.y !== 0) ? `translateZ(-40px) translateX(${-mousePos.x * 10}px) translateY(${-mousePos.y * 10}px)` : 'translateZ(-20px)'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 to-transparent rounded-xl" />
          </div>

          {/* Solid Geometry (Middle) */}
          <div className={`absolute top-0 right-0 w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-full z-20 shadow-[0_10px_20px_rgba(79,70,229,0.4)] transition-all duration-500
            ${inView ? 'scale-100' : 'scale-50 opacity-0'}`}
            style={{
              transform: mousePos && (mousePos.x !== 0 || mousePos.y !== 0) ? `translateX(${16 + mousePos.x * 20}px) translateY(${-8 + mousePos.y * 20}px) translateZ(30px)` : 'translateX(16px) translateY(-8px) translateZ(10px)'
            }}
          >
            <div className="absolute inset-0 bg-white/20 rounded-full blur-[2px] w-1/2 h-1/2 top-1 left-1" />
          </div>

          {/* Accent Element (Front) */}
          <div className={`absolute bottom-0 left-0 w-10 h-10 bg-gradient-to-tr from-amber-400 to-amber-600 rounded-tr-xl rounded-bl-xl rounded-tl-sm rounded-br-sm z-30 shadow-[0_8px_16px_rgba(217,119,6,0.4)] transition-all duration-500
            ${inView ? 'scale-100' : 'scale-50 opacity-0'}`}
            style={{
              transform: mousePos && (mousePos.x !== 0 || mousePos.y !== 0) ? `translateX(${-8 + mousePos.x * 30}px) translateY(${8 + mousePos.y * 30}px) translateZ(60px)` : 'translateX(-8px) translateY(8px) translateZ(30px)'
            }}
          >
            <div className="absolute inset-0 border border-white/30 rounded-inherit" />
          </div>

          {/* Floating Outline Shape */}
          <div className={`absolute top-1/2 left-1/2 -ml-6 -mt-6 w-12 h-12 border-2 border-dashed border-emerald-400/60 rounded-lg z-40 transition-all duration-500
            ${inView ? 'scale-100' : 'scale-50 opacity-0'}`}
            style={{
              transform: mousePos && (mousePos.x !== 0 || mousePos.y !== 0) ? `translateZ(90px) rotate(${45 + mousePos.x * 45}deg) translateX(${mousePos.x * 10}px)` : 'translateZ(50px) rotate(45deg)'
            }}
          />
        </div>
      </div>
    ),
  },
  {
    title: 'Developing',
    desc: 'Robust code',
    icon: <Code size={20} />,
    size: 'col-span-1 md:col-span-1',
    renderVisual: (inView, mousePos) => (
      <div
        className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-xl group/dev cursor-text"
      >
        <div
          className="relative w-full max-w-[220px] bg-zinc-950/80 backdrop-blur-sm border border-zinc-800/80 rounded block shadow-[0_10px_30px_rgba(0,0,0,0.5)] overflow-hidden transition-transform duration-300 ease-out"
          style={{
            transform: mousePos && (mousePos.x !== 0 || mousePos.y !== 0) ? `rotateX(${-mousePos.y * 10}deg) rotateY(${mousePos.x * 10}deg) scale(1.05)` : 'rotateX(0deg) rotateY(0deg) scale(1)',
          }}
        >

          {/* Editor Header */}
          <div className="flex gap-1.5 px-3 py-2 border-b border-zinc-900 bg-zinc-900/40">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/50" />
            <div className="w-2.5 h-2.5 rounded-full bg-amber-500/20 border border-amber-500/50" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/20 border border-green-500/50" />
          </div>

          {/* Editor Body - Scrolls based on mouse Y */}
          <div
            className="p-3 font-mono text-[10px] sm:text-[11px] leading-relaxed text-zinc-400 transition-transform duration-100 ease-linear"
            style={{
              transform: mousePos && mousePos.y !== 0 ? `translateY(${-mousePos.y * 15}px)` : 'translateY(0)'
            }}
          >
            {/* Context padding lines */}
            <div className="flex opacity-50 space-x-2">
              <span className="text-zinc-700 select-none">1</span>
              <div><span className="text-purple-400">import</span> {'{'} <span className="text-sky-300">build</span> {'}'} <span className="text-purple-400">from</span> <span className="text-emerald-400">'@core'</span>;</div>
            </div>

            {/* Focus lines */}
            <div className="flex space-x-2 mt-2 bg-zinc-900/30 -mx-3 px-3 py-0.5 border-l-2 border-sky-500">
              <span className="text-zinc-600 select-none">2</span>
              <div className="flex items-center flex-wrap">
                <span className="text-purple-400 mr-1.5">const</span>
                <span className="text-sky-300 mr-1.5">future</span>
                <span className="text-zinc-300 mr-1.5">=</span>
                <span className="text-purple-400 mr-1.5">await</span>
                <span className="text-blue-300">build</span>
                <span className="text-zinc-300">(</span>
                {/* Simulated typing expanding block */}
                <div
                  className={`inline-block overflow-hidden transition-all duration-[1.5s] ease-out ${inView ? 'max-w-[120px]' : 'max-w-0'}`}
                >
                  <span className="text-emerald-400 whitespace-nowrap">'vision'</span>
                </div>
                <span className="text-zinc-300">);</span>
              </div>
            </div>

            {/* Interactive Extra Lines that appear when hover moving down */}
            <div className={`flex space-x-2 mt-2 transition-opacity duration-300 ${mousePos && mousePos.y > 0.2 ? 'opacity-100' : 'opacity-0'}`}>
              <span className="text-zinc-600 select-none">3</span>
              <div className="flex items-center flex-wrap">
                <span className="text-sky-300 mr-1.5">console</span>
                <span className="text-zinc-300">.</span>
                <span className="text-blue-300">log</span>
                <span className="text-zinc-300">(</span>
                <span className="text-emerald-400 whitespace-nowrap">'Success!'</span>
                <span className="text-zinc-300">);</span>
              </div>
            </div>

            {/* Terminal executing phase */}
            <div className="flex space-x-2 mt-3 text-[9px] text-zinc-500 font-mono items-center">
              <span className="text-zinc-700 select-none">~</span>
              <div className="flex items-center gap-2">
                <span className="text-zinc-600">$</span>
                <span className={`transition-opacity duration-300 ${inView ? 'opacity-100 text-emerald-500/70' : 'opacity-0'}`}>
                  Compiled successfully
                </span>

                {/* Blinking cursor */}
                <span className={`block w-1.5 h-3 bg-sky-400 ml-1 shadow-[0_0_8px_rgba(56,189,248,0.8)] ${inView ? 'animate-[blink_1s_step-end_infinite]' : 'opacity-0'}`} />
              </div>
            </div>

            {/* Reflection sweep */}
            <div className={`absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full transition-transform duration-700 ease-out`}
              style={{
                transform: mousePos && (mousePos.x !== 0 || mousePos.y !== 0) ? `translateX(${mousePos.x * 100}%)` : 'translateX(-100%)'
              }}
            />
          </div>
        </div>
      </div>
    ),
  },
];
