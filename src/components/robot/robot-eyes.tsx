'use client';

import type { RobotExpression } from '@/types';

type RobotEyesProps = {
  expression: RobotExpression;
};

export function RobotEyes({ expression }: RobotEyesProps) {
  if (expression === 'focused') {
    return (
      <g className="animate-bob-body">
        <path d="M36 50 L44 50" stroke="#818cf8" strokeWidth="3" strokeLinecap="round" />
        <path d="M56 50 L64 50" stroke="#818cf8" strokeWidth="3" strokeLinecap="round" />
        <rect x="34" y="46" width="12" height="8" rx="2" stroke="#818cf8" strokeWidth="1" fill="rgba(129, 140, 248, 0.2)" />
        <rect x="54" y="46" width="12" height="8" rx="2" stroke="#818cf8" strokeWidth="1" fill="rgba(129, 140, 248, 0.2)" />
        <line x1="46" y1="50" x2="54" y2="50" stroke="#818cf8" strokeWidth="1" />
      </g>
    );
  }

  switch (expression) {
    case 'love':
      return (
        <g className="animate-bob-body">
          <g className="animate-float" style={{ opacity: 0.9 }}>
            <path d="M50 20 L53 17 A 2 2 0 0 1 56 17 A 2 2 0 0 1 56 20 L50 26 L44 20 A 2 2 0 0 1 44 17 A 2 2 0 0 1 47 17 Z" fill="#f472b6" />
            <path d="M60 10 L63 7 A 2 2 0 0 1 66 7 A 2 2 0 0 1 66 10 L60 16 L54 10 A 2 2 0 0 1 54 7 A 2 2 0 0 1 57 7 Z" fill="#f472b6" />
          </g>
          <path d="M36 49 L39 46 A 2 2 0 0 1 42 46 A 2 2 0 0 1 42 49 L36 55 L30 49 A 2 2 0 0 1 30 46 A 2 2 0 0 1 33 46 Z" fill="#f472b6" />
          <path d="M56 49 L59 46 A 2 2 0 0 1 62 46 A 2 2 0 0 1 62 49 L56 55 L50 49 A 2 2 0 0 1 50 46 A 2 2 0 0 1 53 46 Z" fill="#f472b6" />
          <path d="M45 60 Q50 63 55 60" stroke="#f472b6" strokeWidth="2" fill="none" />
        </g>
      );
    case 'love-overload':
      return (
        <g className="animate-bob-fast">
          {/* Multiple floating hearts - love overload! */}
          <g className="animate-float">
            <path d="M50 15 L52 13 A 1.5 1.5 0 0 1 54 13 A 1.5 1.5 0 0 1 54 15 L50 19 L46 15 A 1.5 1.5 0 0 1 46 13 A 1.5 1.5 0 0 1 48 13 Z" fill="#f472b6" opacity="0.9" />
            <path d="M30 25 L32 23 A 1.5 1.5 0 0 1 34 23 A 1.5 1.5 0 0 1 34 25 L30 29 L26 25 A 1.5 1.5 0 0 1 26 23 A 1.5 1.5 0 0 1 28 23 Z" fill="#ec4899" opacity="0.8" />
            <path d="M70 20 L72 18 A 1.5 1.5 0 0 1 74 18 A 1.5 1.5 0 0 1 74 20 L70 24 L66 20 A 1.5 1.5 0 0 1 66 18 A 1.5 1.5 0 0 1 68 18 Z" fill="#f472b6" opacity="0.9" />
            <path d="M20 35 L22 33 A 1 1 0 0 1 24 33 A 1 1 0 0 1 24 35 L20 38 L16 35 A 1 1 0 0 1 16 33 A 1 1 0 0 1 18 33 Z" fill="#ec4899" opacity="0.7" className="animate-twinkle" />
            <path d="M80 30 L82 28 A 1 1 0 0 1 84 28 A 1 1 0 0 1 84 30 L80 33 L76 30 A 1 1 0 0 1 76 28 A 1 1 0 0 1 78 28 Z" fill="#f472b6" opacity="0.7" className="animate-twinkle" />
          </g>
          {/* Heart eyes */}
          <path d="M36 46 L38 44 A 2 2 0 0 1 40 44 A 2 2 0 0 1 40 46 L36 52 L32 46 A 2 2 0 0 1 32 44 A 2 2 0 0 1 34 44 Z" fill="#f472b6" className="animate-pulse" />
          <path d="M56 46 L58 44 A 2 2 0 0 1 60 44 A 2 2 0 0 1 60 46 L56 52 L52 46 A 2 2 0 0 1 52 44 A 2 2 0 0 1 54 44 Z" fill="#f472b6" className="animate-pulse" />
          {/* Big smile */}
          <path d="M40 60 Q50 66 60 60" stroke="#f472b6" strokeWidth="3" fill="none" />
          {/* Sparkles */}
          <circle cx="25" cy="45" r="1.5" fill="#fbbf24" className="animate-twinkle" />
          <circle cx="75" cy="45" r="1.5" fill="#fbbf24" className="animate-twinkle" />
        </g>
      );
    case 'dizzy':
      return (
        <g className="animate-bob-slow">
          {/* Spiral/dizzy eyes */}
          <g className="animate-[spin_3s_linear_infinite]" style={{ transformOrigin: '40px 49px' }}>
            <circle cx="40" cy="49" r="6" fill="none" stroke="#818cf8" strokeWidth="2" />
            <circle cx="40" cy="49" r="3" fill="none" stroke="#818cf8" strokeWidth="2" />
            <circle cx="40" cy="49" r="1" fill="#818cf8" />
          </g>
          <g className="animate-[spin_3s_linear_infinite_reverse]" style={{ transformOrigin: '60px 49px' }}>
            <circle cx="60" cy="49" r="6" fill="none" stroke="#818cf8" strokeWidth="2" />
            <circle cx="60" cy="49" r="3" fill="none" stroke="#818cf8" strokeWidth="2" />
            <circle cx="60" cy="49" r="1" fill="#818cf8" />
          </g>
          {/* Stars spinning around */}
          <g className="animate-orbit" style={{ transformOrigin: '50px 50px' }}>
            <circle cx="35" cy="35" r="2" fill="#fbbf24" />
            <circle cx="65" cy="35" r="2" fill="#fbbf24" />
            <circle cx="65" cy="65" r="2" fill="#fbbf24" />
          </g>
          {/* Wobbly mouth */}
          <path d="M42 60 Q50 58 58 60" stroke="#818cf8" strokeWidth="2" fill="none" className="animate-pulse" />
        </g>
      );
    case 'music':
      return (
        <g className="animate-bob-head">
          <g className="animate-float" style={{ opacity: 0.9 }}>
            <text x="60" y="20" fill="#a5b4fc" fontSize="14">&#9834;</text>
            <text x="70" y="10" fill="#818cf8" fontSize="10">&#9835;</text>
          </g>
          <path d="M36 50 Q40 46 44 50" stroke="#818cf8" strokeWidth="3" fill="none" />
          <path d="M56 50 Q60 46 64 50" stroke="#818cf8" strokeWidth="3" fill="none" />
        </g>
      );
    case 'confused':
      return (
        <g className="animate-bob-body">
          <g className="animate-float" style={{ opacity: 0.9 }}>
            <text x="65" y="20" fill="#fbbf24" fontSize="18" fontWeight="bold">?</text>
          </g>
          <circle cx="40" cy="49" r="6" fill="#818cf8" />
          <circle cx="60" cy="49" r="3" fill="#818cf8" />
          <path d="M45 60 L55 60" stroke="#818cf8" strokeWidth="2" />
        </g>
      );
    case 'excited':
      return (
        <g className="animate-bob-body">
          <circle cx="40" cy="49" r="6" fill="#818cf8" />
          <circle cx="60" cy="49" r="6" fill="#818cf8" />
          <circle cx="43" cy="46" r="2" fill="white" />
          <circle cx="63" cy="46" r="2" fill="white" />
          <circle cx="34" cy="56" r="3" fill="#f472b6" opacity="0.6" />
          <circle cx="66" cy="56" r="3" fill="#f472b6" opacity="0.6" />
        </g>
      );
    case 'sleep':
      return (
        <g className="animate-bob-body">
          <g className="animate-float" style={{ opacity: 0.8 }}>
            <text x="65" y="20" fill="#a5b4fc" fontSize="14" fontWeight="bold">z</text>
            <text x="75" y="10" fill="#a5b4fc" fontSize="10" fontWeight="bold">z</text>
          </g>
          <path d="M36 50 Q40 52 44 50" stroke="#818cf8" strokeWidth="3" fill="none" />
          <path d="M56 50 Q60 52 64 50" stroke="#818cf8" strokeWidth="3" fill="none" />
        </g>
      );
    case 'happy':
      return (
        <g className="animate-bob-body">
          <path d="M36 50 L40 46 L44 50" stroke="#818cf8" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M56 50 L60 46 L64 50" stroke="#818cf8" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="34" cy="56" r="3" fill="#f472b6" opacity="0.6" />
          <circle cx="66" cy="56" r="3" fill="#f472b6" opacity="0.6" />
        </g>
      );
    case 'run':
      return (
        <g className="animate-bob-body">
          <circle cx="40" cy="49" r="5" fill="#818cf8" />
          <circle cx="60" cy="49" r="5" fill="#818cf8" />
        </g>
      );
    case 'dance':
      return (
        <g className="animate-bob-body">
          <path d="M35 50 Q40 45 45 50" stroke="#818cf8" strokeWidth="3" fill="none" />
          <path d="M55 50 Q60 45 65 50" stroke="#818cf8" strokeWidth="3" fill="none" />
          <circle cx="40" cy="52" r="2" fill="#818cf8" />
          <circle cx="60" cy="52" r="2" fill="#818cf8" />
        </g>
      );
    case 'peek':
      return (
        <g className="animate-bob-body">
          <circle cx="40" cy="45" r="5" fill="#818cf8" />
          <circle cx="60" cy="45" r="5" fill="#818cf8" />
          <path d="M32 58 Q50 54 68 58" stroke="#818cf8" strokeWidth="2" fill="none" />
        </g>
      );
    case 'starry':
      return (
        <g className="animate-twinkle">
          <path d="M40 42 L42 48 L48 48 L43 52 L45 58 L40 54 L35 58 L37 52 L32 48 L38 48 Z" fill="#fbbf24" />
          <path d="M60 42 L62 48 L68 48 L63 52 L65 58 L60 54 L55 58 L57 52 L52 48 L58 48 Z" fill="#fbbf24" />
          <path d="M45 60 Q50 63 55 60" stroke="#f472b6" strokeWidth="2" fill="none" />
        </g>
      );
    case 'yawn':
      return (
        <g>
          <path d="M36 48 L44 48" stroke="#818cf8" strokeWidth="2" strokeLinecap="round" />
          <path d="M56 48 L64 48" stroke="#818cf8" strokeWidth="2" strokeLinecap="round" />
          <rect x="42" y="56" width="16" height="4" rx="2" fill="#f472b6" className="animate-yawn-mouth" />
          <circle cx="70" cy="30" r="2" fill="#a5b4fc" className="animate-float" />
        </g>
      );

    case 'shy':
      return (
        <g className="animate-bob-slow">
          {/* One normal eye, one half-hidden (peeking from behind face edge) */}
          <circle cx="40" cy="49" r="5" fill="#818cf8" />
          <circle cx="43" cy="46" r="1.5" fill="white" />
          {/* Right eye — half arc, peeking */}
          <path d="M56 49 A6 6 0 0 1 68 49" stroke="#818cf8" strokeWidth="3" fill="none" strokeLinecap="round" />
          {/* Blush on visible side */}
          <ellipse cx="34" cy="57" rx="5" ry="3" fill="#f472b6" opacity="0.5" className="animate-shy-blush" />
          {/* Small sweat drop */}
          <path d="M68 38 Q70 34 72 38 Q72 42 68 42 Z" fill="#818cf8" opacity="0.6" className="animate-float" />
        </g>
      );

    case 'night':
      return (
        <g className="animate-bob-slow">
          {/* Half-lidded sleepy eyes — slightly more open than sleep */}
          <path d="M34 50 Q40 45 46 50" stroke="#818cf8" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M34 50 Q40 52 46 50" stroke="#818cf8" strokeWidth="1.5" fill="rgba(129,140,248,0.15)" strokeLinecap="round" />
          <path d="M54 50 Q60 45 66 50" stroke="#818cf8" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M54 50 Q60 52 66 50" stroke="#818cf8" strokeWidth="1.5" fill="rgba(129,140,248,0.15)" strokeLinecap="round" />
          {/* Crescent moon */}
          <g className="animate-moon-float" style={{ transformOrigin: '68px 18px' }}>
            <path d="M72 14 A6 6 0 1 1 64 22 A4 4 0 1 0 72 14 Z" fill="#fbbf24" opacity="0.9" />
          </g>
          {/* Stars */}
          <circle cx="60" cy="12" r="1.5" fill="#e2e8f0" className="animate-twinkle" />
          <circle cx="76" cy="22" r="1" fill="#e2e8f0" className="animate-twinkle" style={{ animationDelay: '0.7s' }} />
        </g>
      );

    case 'sneeze':
      return (
        <g>
          {/* Scrunched X eyes */}
          <path d="M34 45 L42 53 M42 45 L34 53" stroke="#818cf8" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M54 45 L62 53 M62 45 L54 53" stroke="#818cf8" strokeWidth="2.5" strokeLinecap="round" />
          {/* Achoo bubble */}
          <g className="animate-float">
            <rect x="52" y="12" width="28" height="14" rx="4" fill="#27272a" stroke="#4f46e5" strokeWidth="1" />
            <text x="54" y="23" fill="#a5b4fc" fontSize="8" fontFamily="monospace">*achoo*</text>
            <path d="M58 26 L62 30 L66 26" fill="#27272a" stroke="#4f46e5" strokeWidth="1" />
          </g>
          {/* Spray dots */}
          <circle cx="62" cy="62" r="1.5" fill="#818cf8" opacity="0.7" />
          <circle cx="66" cy="65" r="1" fill="#818cf8" opacity="0.5" />
          <circle cx="70" cy="60" r="1" fill="#818cf8" opacity="0.6" />
        </g>
      );

    case 'bubble':
      return (
        <g className="animate-bob-slow">
          {/* Eyes looking upward following the bubble */}
          <circle cx="40" cy="42" r="5" fill="#818cf8" />
          <circle cx="60" cy="42" r="5" fill="#818cf8" />
          <circle cx="42" cy="39" r="2" fill="white" />
          <circle cx="62" cy="39" r="2" fill="white" />
          {/* Small surprised mouth */}
          <circle cx="50" cy="58" r="3" fill="none" stroke="#818cf8" strokeWidth="2" />
        </g>
      );

    case 'idle':
    default:
      return (
        <g className="animate-bob-body">
          <circle cx="40" cy="49" r="4" fill="#818cf8" className="animate-blink" />
          <circle cx="60" cy="49" r="4" fill="#818cf8" className="animate-blink" />
        </g>
      );
  }
}
