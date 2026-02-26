'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useRobotBehavior } from '@/hooks/use-robot-behavior';
import { RobotSVG } from './robot-svg';
import { ConfettiBurst } from './confetti-burst';
import { ResumeModal } from '@/components/ui/resume-modal';

const RESUME_BUBBLE_KEY = 'robot:resume-bubble-dismissed';

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
  const [showResumeBubble, setShowResumeBubble] = useState(false);
  const [resumeBubbleText, setResumeBubbleText] = useState<'offer' | 'loading'>('offer');
  const [resumeModalOpen, setResumeModalOpen] = useState(false);
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Triple-click tracking for robot
  const tripleClickCountRef = useRef(0);
  const tripleClickTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleCelebrate = () => setConfetti(true);
    window.addEventListener('robot:celebrate', handleCelebrate);
    return () => {
      window.removeEventListener('robot:celebrate', handleCelebrate);
    };
  }, []);

  // ── Resume bubble: show after 4s of inactivity, once per session ─────────
  useEffect(() => {
    if (!mounted) return;

    // Already dismissed this session — never show again
    if (sessionStorage.getItem(RESUME_BUBBLE_KEY)) return;

    const startTimer = () => {
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
      resumeTimerRef.current = setTimeout(() => {
        // Only show if no other modal is open and robot isn't mid-action
        if (!sessionStorage.getItem(RESUME_BUBBLE_KEY)) {
          setShowResumeBubble(true);
        }
      }, 4000);
    };

    const resetTimer = () => {
      if (showResumeBubble) return; // already showing, don't reset
      startTimer();
    };

    // Start the initial timer
    startTimer();

    // Reset on any user activity
    window.addEventListener('mousemove', resetTimer, { passive: true });
    window.addEventListener('keydown', resetTimer, { passive: true });
    window.addEventListener('scroll', resetTimer, { passive: true });
    window.addEventListener('click', resetTimer, { passive: true });
    window.addEventListener('touchstart', resetTimer, { passive: true });

    return () => {
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('keydown', resetTimer);
      window.removeEventListener('scroll', resetTimer);
      window.removeEventListener('click', resetTimer);
      window.removeEventListener('touchstart', resetTimer);
    };
  }, [mounted, showResumeBubble]);

  const handleResumeBubbleOpen = () => {
    sessionStorage.setItem(RESUME_BUBBLE_KEY, '1');
    setShowResumeBubble(false);
    setResumeBubbleText('offer');
    setResumeModalOpen(true);
  };

  const handleResumeBubbleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    sessionStorage.setItem(RESUME_BUBBLE_KEY, '1');
    setShowResumeBubble(false);
    setResumeBubbleText('offer');
  };

  const openResumeWithLoadingBubble = () => {
    sessionStorage.setItem(RESUME_BUBBLE_KEY, '1');
    // Show "Showing résumé..." bubble briefly, then open modal
    setResumeBubbleText('loading');
    setShowResumeBubble(true);
    setTimeout(() => {
      setShowResumeBubble(false);
      setResumeBubbleText('offer');
      setResumeModalOpen(true);
    }, 900);
  };

  const handleRobotClickWithTriple = (e: React.MouseEvent) => {
    tripleClickCountRef.current += 1;

    if (tripleClickTimerRef.current) clearTimeout(tripleClickTimerRef.current);
    tripleClickTimerRef.current = setTimeout(() => {
      tripleClickCountRef.current = 0;
    }, 600);

    if (tripleClickCountRef.current >= 3) {
      tripleClickCountRef.current = 0;
      if (tripleClickTimerRef.current) clearTimeout(tripleClickTimerRef.current);
      openResumeWithLoadingBubble();
      return; // don't propagate to normal robot click handler
    }

    handleRobotClick(e);
  };

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
          onClick={handleRobotClickWithTriple}
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

          {/* Resume offer bubble */}
          <AnimatePresence>
            {showResumeBubble && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.85 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 6, scale: 0.9 }}
                transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                className="absolute bottom-[calc(100%+10px)] left-1/2 -translate-x-1/2 z-50"
                style={{ minWidth: 160 }}
              >
                {resumeBubbleText === 'loading' ? (
                  /* Loading state — non-interactive, just feedback */
                  <div className="relative flex flex-col items-start gap-1 px-3 py-2.5 rounded-xl bg-zinc-900/95 border border-indigo-500/60 shadow-[0_0_24px_rgba(99,102,241,0.3)] backdrop-blur-xl w-full">
                    {/* Glow line */}
                    <div className="absolute -top-px left-1/2 -translate-x-1/2 w-20 h-px bg-gradient-to-r from-transparent via-indigo-400 to-transparent rounded-full" />

                    <span className="text-[11px] font-semibold text-zinc-100 leading-tight whitespace-nowrap flex items-center gap-1.5">
                      <span className="inline-block animate-spin">⏳</span> Showing résumé…
                    </span>
                    <span className="text-[9px] text-indigo-400 font-mono leading-tight whitespace-nowrap">
                      opening now
                    </span>

                    {/* Tail pointer */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[5px] border-r-[5px] border-t-[6px] border-l-transparent border-r-transparent border-t-indigo-500/60" />
                  </div>
                ) : (
                  /* Offer state — clickable */
                  <button
                    onClick={handleResumeBubbleOpen}
                    className="group relative flex flex-col items-start gap-1 px-3 py-2.5 rounded-xl bg-zinc-900/95 border border-indigo-500/40 shadow-[0_0_20px_rgba(99,102,241,0.18)] backdrop-blur-xl cursor-pointer hover:border-indigo-400/70 hover:shadow-[0_0_28px_rgba(99,102,241,0.28)] transition-all w-full text-left"
                  >
                    {/* Glow line */}
                    <div className="absolute -top-px left-1/2 -translate-x-1/2 w-20 h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent rounded-full" />

                    <span className="text-[11px] font-semibold text-zinc-100 leading-tight whitespace-nowrap">
                      📄 Want my résumé?
                    </span>
                    <span className="text-[9px] text-indigo-400 font-mono leading-tight whitespace-nowrap group-hover:text-indigo-300 transition-colors">
                      Click to view →
                    </span>

                    {/* Dismiss × */}
                    <button
                      onClick={handleResumeBubbleDismiss}
                      className="absolute -top-2 -right-2 size-4 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-500 hover:text-zinc-200 hover:bg-zinc-700 transition-all text-[9px] leading-none"
                      aria-label="Dismiss"
                    >
                      ×
                    </button>

                    {/* Tail pointer pointing down to robot */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[5px] border-r-[5px] border-t-[6px] border-l-transparent border-r-transparent border-t-indigo-500/40" />
                  </button>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Idle tooltip — hidden when resume bubble is showing */}
          {expression === 'idle' &&
            !isMoving &&
            !isCatching &&
            workMode === 'none' &&
            !showResumeBubble && (
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-popover text-[10px] text-popover-foreground px-2 py-1 rounded-md border opacity-0 animate-[fade-in-out_4s_ease-in-out_infinite]">
                Click me!
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

      <ResumeModal open={resumeModalOpen} onClose={() => setResumeModalOpen(false)} />
    </>,
    document.body
  );
}
