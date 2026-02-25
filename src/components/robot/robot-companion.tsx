'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useRobotBehavior } from '@/hooks/use-robot-behavior';
import { RobotSVG } from './robot-svg';
import { ConfettiBurst } from './confetti-burst';

export function RobotCompanion() {
  const {
    pos,
    isMoving,
    isCatching,
    facingRight,
    expression,
    workMode,
    workAction,
    handleRobotClick,
    mounted,
  } = useRobotBehavior();

  const [confetti, setConfetti] = useState(false);

  useEffect(() => {
    const handleCelebrate = () => setConfetti(true);
    window.addEventListener('robot:celebrate', handleCelebrate);
    return () => {
      window.removeEventListener('robot:celebrate', handleCelebrate);
    };
  }, []);

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted) return null;

  // Portal to document.body so the robot escapes #smooth-content's CSS transform.
  // ScrollSmoother applies translateY to #smooth-content — any position:fixed child
  // of a transformed ancestor is no longer fixed to the viewport, only to that
  // container. Portalling to body puts it back in the normal stacking context.
  return createPortal(
    <>
      <div
        className="fixed z-[100] w-16 h-16 flex items-center justify-center transition-transform pointer-events-none"
        style={{
          left: pos.x,
          top: pos.y,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div
          onClick={handleRobotClick}
          className={`robot-clickable relative w-full h-full transition-transform duration-300 pointer-events-auto cursor-pointer ${
            !facingRight && workAction === 'none' ? 'scale-x-[-1]' : ''
          }`}
        >
          <RobotSVG
            expression={expression}
            workAction={workAction}
            workMode={workMode}
            isMoving={isMoving}
            isCatching={isCatching}
          />

          {/* Idle tooltip */}
          {expression === 'idle' &&
            !isMoving &&
            !isCatching &&
            workMode === 'none' && (
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-popover text-[10px] text-popover-foreground px-2 py-1 rounded-md border opacity-0 animate-[fade-in-out_4s_ease-in-out_infinite]">
                Click me!
              </div>
            )}

          {/* High five tooltip */}
          {workAction === 'highfive' && (
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap bg-popover text-[11px] text-popover-foreground px-2.5 py-1.5 rounded-md border border-primary/30 shadow-lg animate-[pop-in_0.3s_cubic-bezier(0.175,0.885,0.32,1.275)_forwards]">
              ✋ High five!
            </div>
          )}

          {/* Shy tooltip */}
          {expression === 'shy' && !isMoving && (
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-popover text-[10px] text-popover-foreground px-2 py-1 rounded-md border border-zinc-500/30 animate-[fade-in-out_4s_ease-in-out_forwards]">
              😳 eep!
            </div>
          )}
        </div>
      </div>
      <ConfettiBurst active={confetti} x={pos.x} y={pos.y} onDone={() => setConfetti(false)} />
    </>,
    document.body
  );
}
