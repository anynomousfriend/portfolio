'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useRobotBehavior } from '@/hooks/use-robot-behavior';
import { RobotSVG } from './robot-svg';
import { ConfettiBurst } from './confetti-burst';

export function RobotCompanion() {
  const {
    pos,
    bubbles,
    certificateWow,
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

          {/* Certificate Wow tooltip */}
          <AnimatePresence>
            {certificateWow && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.8 }}
                className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap bg-popover text-[11px] font-bold text-primary px-3 py-1.5 rounded-full border border-primary/30 shadow-[0_0_15px_rgba(99,102,241,0.2)] z-50"
              >
                Woww! 🤩
                {/* Pointer tail */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[4px] border-r-[4px] border-t-[5px] border-transparent border-t-primary/30" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Soap Bubbles */}
      <AnimatePresence>
        {bubbles.map((bubble) => (
          <motion.div
            key={bubble.id}
            className="fixed pointer-events-none z-[90] rounded-full"
            style={{
              left: bubble.x,
              top: bubble.y,
              width: bubble.size,
              height: bubble.size,
              background: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.1) 40%, rgba(100, 200, 255, 0.3) 60%, rgba(255, 100, 200, 0.3) 80%)',
              border: '1px solid rgba(255, 255, 255, 0.4)',
              boxShadow: 'inset -2px -2px 4px rgba(0, 0, 0, 0.1), 0 0 10px rgba(255, 255, 255, 0.3)',
            }}
            initial={{ scale: 0, opacity: 0, x: '-50%', y: '-50%' }}
            animate={{ 
              scale: [0, 1, 1, 1.5], 
              opacity: [0, 0.8, 0.8, 0], 
              y: ['-50%', 'calc(-50% - 40px)', 'calc(-50% - 80px)', 'calc(-50% - 120px)'],
              x: ['-50%', 'calc(-50% + 20px)', 'calc(-50% - 20px)', 'calc(-50% + 15px)']
            }}
            transition={{ 
              duration: 4, 
              ease: "easeInOut",
              times: [0, 0.2, 0.8, 1]
            }}
            exit={{ scale: 1.5, opacity: 0, transition: { duration: 0.2 } }}
          />
        ))}
      </AnimatePresence>

      <ConfettiBurst active={confetti} x={pos.x} y={pos.y} onDone={() => setConfetti(false)} />
    </>,
    document.body
  );
}
