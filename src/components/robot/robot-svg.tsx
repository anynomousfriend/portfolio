'use client';

import type { RobotExpression, WorkAction, WorkMode } from '@/types';
import { RobotEyes } from './robot-eyes';

type RobotSVGProps = {
  expression: RobotExpression;
  workAction: WorkAction;
  workMode: WorkMode;
  isMoving: boolean;
  isCatching: boolean;
};

export function RobotSVG({
  expression,
  workAction,
  workMode,
  isMoving,
  isCatching,
}: RobotSVGProps) {
  const isAtWork = workMode === 'arrived' || workMode === 'working';
  
  // Animation state classes
  const bodyAnimationClass =
    expression === 'music'
      ? 'animate-bob-fast'
      : expression === 'dance'
      ? 'animate-dance'
      : expression === 'peek'
      ? 'animate-peek'
      : expression === 'sneeze'
      ? 'animate-sneeze-jolt'
      : expression === 'shy'
      ? 'animate-bob-slow'
      : expression === 'night'
      ? 'animate-bob-slow'
      : 'animate-bob-body';

  const armRotationClass = isCatching
    ? 'rotate-[150deg]'
    : workAction === 'waving'
    ? 'animate-wave'
    : workAction === 'typing'
    ? 'rotate-[30deg] animate-type-fast'
    : workAction === 'pointing'
    ? 'rotate-[-120deg]'
    : expression === 'confused'
    ? 'rotate-[20deg]'
    : expression === 'dance'
    ? 'rotate-[140deg] animate-wave'
    : expression === 'peek'
    ? 'rotate-[140deg]'
    : expression === 'shy'
    ? 'rotate-[60deg]'
    : expression === 'sneeze'
    ? 'rotate-[20deg]'
    : 'rotate-[10deg]';

  const rightArmRotationClass = isCatching
    ? 'rotate-[-150deg]'
    : workAction === 'typing'
    ? 'rotate-[-30deg] animate-type-fast-offset'
    : workAction === 'pointing'
    ? 'rotate-[-10deg]'
    : expression === 'confused'
    ? 'rotate-[-20deg]'
    : expression === 'dance'
    ? 'rotate-[-140deg] animate-wave'
    : expression === 'peek'
    ? 'rotate-[-140deg]'
    : expression === 'shy'
    ? 'rotate-[-60deg]'
    : expression === 'sneeze'
    ? 'rotate-[-20deg]'
    : 'rotate-[-10deg]';

  return (
    <svg
      viewBox="0 0 100 100"
      className="w-full h-full drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]"
    >
      {/* Headphones (Behind) */}
      {expression === 'music' && (
        <g className="animate-headphone origin-center">
          <path d="M22 45 Q22 15 50 15 Q78 15 78 45" stroke="#3730a3" strokeWidth="4" fill="none" />
          <rect x="18" y="40" width="8" height="20" rx="2" fill="#312e81" />
          <rect x="74" y="40" width="8" height="20" rx="2" fill="#312e81" />
        </g>
      )}

      {/* Antenna */}
      <g className={expression === 'sleep' ? '' : 'animate-bob-slow'}>
        <path d="M50 25 L50 10" stroke="#6366f1" strokeWidth="3" strokeLinecap="round" />
        <circle
          cx="50"
          cy="8"
          r="4"
          fill={expression === 'run' || expression === 'excited' ? '#ef4444' : '#6366f1'}
          className={expression === 'run' || expression === 'excited' ? 'animate-ping' : ''}
        />
      </g>

      {/* Back Arm (Left) */}
      <g transform="translate(25, 55)">
        <g className={`transition-transform duration-300 origin-[2.5px_2.5px] ${armRotationClass}`}>
          <rect x="-2.5" y="0" width="5" height="18" rx="2.5" fill="#4338ca" />
          <circle cx="0" cy="18" r="3.5" fill="#4338ca" />
        </g>
      </g>

      {/* Legs */}
      {isAtWork ? (
        <g transform="translate(0, 5)">
          <path d="M35 75 L35 95" stroke="#4f46e5" strokeWidth="6" strokeLinecap="round" />
          <path d="M65 75 L65 95" stroke="#4f46e5" strokeWidth="6" strokeLinecap="round" />
        </g>
      ) : (
        <g transform="translate(0, 5)">
          <path
            d="M38 75 L38 92"
            stroke="#4f46e5"
            strokeWidth="6"
            strokeLinecap="round"
            className={
              isMoving || expression === 'music' || expression === 'dance'
                ? 'animate-run-left origin-top'
                : ''
            }
          />
          <path
            d="M62 75 L62 92"
            stroke="#4f46e5"
            strokeWidth="6"
            strokeLinecap="round"
            className={
              isMoving || expression === 'music' || expression === 'dance'
                ? 'animate-run-right origin-top'
                : ''
            }
          />
        </g>
      )}

      {/* Body */}
      <rect
        x="25"
        y="25"
        width="50"
        height="50"
        rx="12"
        fill="#18181b"
        stroke="#4f46e5"
        strokeWidth="3"
        className={bodyAnimationClass}
        transform={expression === 'confused' ? 'rotate(-5 50 50)' : ''}
      />

      {/* Front Arm (Right) */}
      <g transform="translate(75, 55)">
        <g className={`transition-transform duration-300 origin-[2.5px_2.5px] ${rightArmRotationClass}`}>
          <rect x="-2.5" y="0" width="5" height="18" rx="2.5" fill="#6366f1" />
          <circle cx="0" cy="18" r="3.5" fill="#6366f1" />
        </g>
      </g>

      {/* Face Screen */}
      <rect
        x="32"
        y="35"
        width="36"
        height="28"
        rx="6"
        fill="#09090b"
        className={bodyAnimationClass}
        transform={expression === 'confused' ? 'rotate(-5 50 50)' : ''}
      />

      {/* Eyes */}
      <g transform={expression === 'confused' ? 'rotate(-5 50 50)' : ''}>
        <RobotEyes expression={expression} />
      </g>

      {/* Laptop (when typing) */}
      {workAction === 'typing' && (
        <g className="animate-pop-in origin-bottom">
          <path d="M20 72 L80 72 L75 78 L25 78 Z" fill="#27272a" stroke="#52525b" strokeWidth="0.5" />
          <path d="M25 72 L75 72 L72 42 L28 42 Z" fill="#3f3f46" stroke="#52525b" strokeWidth="0.5" />
          <circle cx="50" cy="57" r="4" fill="white" className="animate-pulse" />
        </g>
      )}
    </svg>
  );
}
