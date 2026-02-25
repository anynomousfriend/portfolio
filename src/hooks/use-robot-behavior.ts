import { useState, useEffect, useCallback, useRef } from 'react';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { Position, RobotExpression, WorkMode, WorkAction } from '@/types';

// ScrollTrigger + ScrollSmoother are registered globally in SmoothScrollProvider.
// Do NOT call registerPlugin here.

export function useRobotBehavior() {
  const [mounted, setMounted] = useState(false);
  const [pos, setPos] = useState<Position>({ x: 0, y: 0 });
  const [target, setTarget] = useState<Position>({ x: 0, y: 0 });

  // Initialize position on mount (client-only) to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
    const initialX = window.innerWidth - 100;
    const initialY = window.innerHeight - 100;
    setPos({ x: initialX, y: initialY });
    setTarget({ x: initialX, y: initialY });
  }, []);

  const [mousePos, setMousePos] = useState<Position>({ x: 0, y: 0 });
  const [isCatching, setIsCatching] = useState(false);
  const [workMode, setWorkMode] = useState<WorkMode>('none');
  const [workAction, setWorkAction] = useState<WorkAction>('none');
  const [isMoving, setIsMoving] = useState(false);
  const [facingRight, setFacingRight] = useState(false);
  const [expression, setExpression] = useState<RobotExpression>('idle');
  const [clickCount, setClickCount] = useState(0);
  const [clickTimer, setClickTimer] = useState<ReturnType<typeof setTimeout> | null>(null);
  const [isNightOwl, setIsNightOwl] = useState(false);

  // Refs for behaviors that need no re-renders
  const shyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const highFiveTimestampsRef = useRef<number[]>([]);
  const highFiveWorkActionRef = useRef<WorkAction>('none');
  const prevPathnameRef = useRef<string>('');
  const techBadgeCooldownRef = useRef<boolean>(false);
  const techBadgeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const pathname = usePathname();

  // ─── Night Owl: check local time on mount ───────────────────────────────────
  useEffect(() => {
    const hour = new Date().getHours();
    const isNight = hour >= 22 || hour < 6;
    setIsNightOwl(isNight);
    if (isNight) {
      setExpression('night');
      const t = setTimeout(() => {
        setExpression((prev) => (prev === 'night' ? 'idle' : prev));
      }, 8000);
      return () => clearTimeout(t);
    }
  }, []);

  // ─── Starstruck: detect navigation to /projects/* ───────────────────────────
  useEffect(() => {
    if (!mounted) return;
    const isProjectPage = pathname?.startsWith('/projects/');
    const wasProjectPage = prevPathnameRef.current?.startsWith('/projects/');

    // Only fire when transitioning INTO a project page
    if (isProjectPage && !wasProjectPage && workMode === 'none') {
      const t = setTimeout(() => {
        setExpression('starry');
        setWorkAction('pointing');
        const t2 = setTimeout(() => {
          setExpression('focused');
          setWorkAction('none');
          const t3 = setTimeout(() => {
            setExpression((prev) => (prev === 'focused' ? 'idle' : prev));
          }, 3000);
          return () => clearTimeout(t3);
        }, 5000);
        return () => clearTimeout(t2);
      }, 1000);
      return () => clearTimeout(t);
    }

    prevPathnameRef.current = pathname ?? '';
  }, [pathname, mounted, workMode]);

  // Track mouse position
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // ─── Tech Badge Collector ────────────────────────────────────────────────────
  useEffect(() => {
    const handleBadgeEnter = (e: Event) => {
      const { x, y } = (e as CustomEvent).detail as { x: number; y: number; tech: string };

      // Cooldown: ignore if already reacting or in work mode or on cooldown
      if (
        techBadgeCooldownRef.current ||
        workMode !== 'none' ||
        expression === 'love' ||
        expression === 'love-overload' ||
        expression === 'shy'
      ) return;

      // Set cooldown
      techBadgeCooldownRef.current = true;

      // Move robot to badge — offset above so it doesn't cover it
      const targetX = Math.min(Math.max(x, 50), window.innerWidth - 50);
      const targetY = Math.min(Math.max(y - 48, 50), window.innerHeight - 50);
      setTarget({ x: targetX, y: targetY });
      setIsMoving(true);
      setIsCatching(false);
      setExpression('run');

      // On arrival the animation loop sets isMoving false → happy
      // We override that sequence with our badge reaction
      techBadgeTimerRef.current = setTimeout(() => {
        setExpression('starry');
        setWorkAction('pointing');

        setTimeout(() => {
          setExpression('love');
          setWorkAction('none');

          setTimeout(() => {
            setExpression((prev) => (prev === 'love' ? 'idle' : prev));
            // Release cooldown after full sequence (~4.5s total)
            setTimeout(() => {
              techBadgeCooldownRef.current = false;
            }, 500);
          }, 1500);
        }, 2000);
      }, 800); // small delay to let robot start moving before we set the reaction
    };

    const handleBadgeLeave = () => {
      // Clear pending timer if mouse leaves before robot arrives
      if (techBadgeTimerRef.current) {
        clearTimeout(techBadgeTimerRef.current);
        techBadgeTimerRef.current = null;
      }
    };

    window.addEventListener('robot:techbadge', handleBadgeEnter);
    window.addEventListener('robot:techbadge:leave', handleBadgeLeave);
    return () => {
      window.removeEventListener('robot:techbadge', handleBadgeEnter);
      window.removeEventListener('robot:techbadge:leave', handleBadgeLeave);
    };
  }, [workMode, expression]);

  // ─── Shy: mouse near viewport edge for 1.5s ─────────────────────────────────
  useEffect(() => {
    if (!mounted) return;

    const edgeDist = Math.min(
      mousePos.x,
      window.innerWidth - mousePos.x,
      mousePos.y,
      window.innerHeight - mousePos.y
    );

    const nearEdge = edgeDist < 30;

    if (
      nearEdge &&
      !isMoving &&
      !isCatching &&
      workMode === 'none' &&
      expression !== 'shy' &&
      expression !== 'love' &&
      expression !== 'love-overload'
    ) {
      // Debounce — only trigger after 1.5s continuous edge proximity
      if (!shyTimerRef.current) {
        shyTimerRef.current = setTimeout(() => {
          // Snap to nearest corner, 70px inset
          const cx = mousePos.x < window.innerWidth / 2 ? 70 : window.innerWidth - 70;
          const cy = mousePos.y < window.innerHeight / 2 ? 70 : window.innerHeight - 70;
          setTarget({ x: cx, y: cy });
          setIsMoving(true);
          setExpression('shy');
          // Return to idle after 4s
          setTimeout(() => {
            setExpression((prev) => (prev === 'shy' ? 'idle' : prev));
          }, 4000);
          shyTimerRef.current = null;
        }, 1500);
      }
    } else {
      // Clear debounce timer if mouse leaves edge
      if (shyTimerRef.current) {
        clearTimeout(shyTimerRef.current);
        shyTimerRef.current = null;
      }
    }
  }, [mousePos, isMoving, isCatching, workMode, expression, mounted]);

  // Handle click to move & hire badge interaction + high five detection
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      // Don't move robot while modal is open
      if (modalOpenRef.current) return;

      const targetEl = e.target as HTMLElement;
      if (targetEl.closest('.robot-clickable')) return;

      const hireBadge = targetEl.closest('#hire-badge');
      if (hireBadge) {
        const rect = hireBadge.getBoundingClientRect();
        setTarget({ x: rect.left + rect.width / 2, y: rect.top - 20 });
        setIsMoving(true);
        setIsCatching(false);
        setWorkMode('commuting');
        setExpression('run');
        return;
      }

      const tagName = targetEl.tagName.toLowerCase();
      if (
        tagName === 'button' ||
        tagName === 'a' ||
        targetEl.closest('button') ||
        targetEl.closest('a')
      ) {
        return;
      }

      // Always reset workMode on any click so the robot can always be moved.
      // This handles the case where ScrollSmoother prevents scroll events from
      // firing and workMode gets stuck in 'commuting' / 'working'.
      setWorkMode('none');
      setWorkAction('none');

      // ─── High Five detection ───────────────────────────────────────────────
      const now = Date.now();
      // Keep only timestamps within the last 600ms
      highFiveTimestampsRef.current = highFiveTimestampsRef.current.filter(
        (t) => now - t < 600
      );
      highFiveTimestampsRef.current.push(now);

      if (highFiveTimestampsRef.current.length >= 3) {
        // Trigger high five!
        highFiveTimestampsRef.current = [];
        const offsetX = 50;
        const offsetY = 50;
        const targetX = Math.min(Math.max(e.clientX + offsetX, 50), window.innerWidth - 50);
        const targetY = Math.min(Math.max(e.clientY + offsetY, 50), window.innerHeight - 50);
        setTarget({ x: targetX, y: targetY });
        setIsMoving(true);
        setIsCatching(false);
        highFiveWorkActionRef.current = 'highfive';
        setExpression('run');
        return;
      }

      // Normal click-to-move
      const offsetX = 50;
      const offsetY = 50;
      const targetX = Math.min(Math.max(e.clientX + offsetX, 50), window.innerWidth - 50);
      const targetY = Math.min(Math.max(e.clientY + offsetY, 50), window.innerHeight - 50);
      setTarget({ x: targetX, y: targetY });
      setIsMoving(true);
      setIsCatching(false);
      setExpression('run');
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  // Handle scroll to hop off hire badge
  // Uses ScrollTrigger.addEventListener which works with GSAP ScrollSmoother
  // (ScrollSmoother intercepts native scroll via CSS transform, so window 'scroll'
  //  events are unreliable — ScrollTrigger's own scroll events always fire)
  useEffect(() => {
    const handleScroll = () => {
      if (workMode !== 'none') {
        setWorkMode('none');
        setWorkAction('none');
        setExpression('excited');
        setIsCatching(false);
        setTarget({
          x: window.innerWidth - 100,
          y: window.innerHeight - 100,
        });
        setIsMoving(true);
      }
    };

    // ScrollTrigger fires on both native scroll and ScrollSmoother-driven scroll
    ScrollTrigger.addEventListener('scrollStart', handleScroll);
    // Also keep the native listener as a fallback (e.g. on pages without ScrollSmoother)
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      ScrollTrigger.removeEventListener('scrollStart', handleScroll);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [workMode]);

  // Robot click handler (love reaction with multi-click detection)
  const handleRobotClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (workMode === 'none') {
        setClickCount((prev) => {
          const newCount = prev + 1;

          if (clickTimer) clearTimeout(clickTimer);

          const timer = setTimeout(() => {
            setClickCount(0);
          }, 1500);
          setClickTimer(timer);

          if (newCount === 1) {
            setExpression('love');
            setTimeout(() => {
              if (newCount < 3) setExpression('idle');
            }, 3000);
          } else if (newCount === 2) {
            setExpression('love');
          } else if (newCount === 3) {
            setExpression('love-overload');
            setTimeout(() => setExpression('dizzy'), 2000);
            setTimeout(() => {
              setExpression('happy');
              setTimeout(() => setExpression('idle'), 2000);
            }, 5000);
          } else if (newCount >= 4) {
            setExpression('dizzy');
          }

          return newCount;
        });
      }
    },
    [workMode, clickTimer]
  );

  // Work mode: commuting -> arrived
  useEffect(() => {
    if (!isMoving && workMode === 'commuting') {
      setWorkMode('arrived');
    }
  }, [isMoving, workMode]);

  // Work mode: arrived -> working
  useEffect(() => {
    if (workMode === 'arrived') {
      setExpression('happy');
      setFacingRight(true);
      setWorkAction('waving');
      const timer = setTimeout(() => setWorkMode('working'), 1500);
      return () => clearTimeout(timer);
    }
    if (workMode === 'working') {
      setWorkAction('typing');
      setExpression('focused');
    }
  }, [workMode]);

  // ─── High Five arrival: trigger expression when robot stops moving ───────────
  useEffect(() => {
    if (!isMoving && highFiveWorkActionRef.current === 'highfive') {
      highFiveWorkActionRef.current = 'none';
      setExpression('highfive');
      setWorkAction('highfive');
      setTimeout(() => {
        setExpression('happy');
        setWorkAction('none');
        setTimeout(() => {
          setExpression((prev) => (prev === 'happy' ? 'idle' : prev));
        }, 2000);
      }, 2500);
    }
  }, [isMoving]);

  // ─── Celebrate: fired when contact form is successfully sent ─────────────────
  useEffect(() => {
    const handleCelebrate = () => {
      setWorkMode('none');
      setWorkAction('none');
      setExpression('love-overload');
      setTimeout(() => setExpression('dance'), 1000);
      setTimeout(() => setExpression('happy'), 4000);
      setTimeout(() => setExpression((prev) => prev === 'happy' ? 'idle' : prev), 6000);
    };
    window.addEventListener('robot:celebrate', handleCelebrate);
    return () => window.removeEventListener('robot:celebrate', handleCelebrate);
  }, []);

  // ─── Modal observer: move robot to left edge to peek at the form ─────────────
  const modalOpenRef = useRef(false);
  const observeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleModalOpen = (e: Event) => {
      modalOpenRef.current = true;

      // Position robot just outside the left edge of the modal, at its bottom
      // The modal detail gives us {left, bottom} of the popover's bounding rect
      const detail = (e as CustomEvent).detail as { left: number; bottom: number } | null;
      // Sit 90px to the left of the modal's left edge so it's clearly outside
      const targetX = detail ? Math.max(detail.left - 90, 50) : 50;
      const targetY = detail ? Math.min(detail.bottom + 10, window.innerHeight - 50) : window.innerHeight - 100;

      setTarget({ x: targetX, y: targetY });
      setIsMoving(true);
      setIsCatching(false);
      setWorkMode('none');
      setWorkAction('none');
      setFacingRight(true); // face right toward the modal

      // After arriving, switch to excited expression
      observeTimerRef.current = setTimeout(() => {
        if (modalOpenRef.current) setExpression('excited');
      }, 900);
    };

    const handleModalClose = () => {
      modalOpenRef.current = false;
      if (observeTimerRef.current) {
        clearTimeout(observeTimerRef.current);
        observeTimerRef.current = null;
      }
      setExpression('idle');
    };

    // Each field focus → love-overload for 1.5s then back to excited
    const handleInputFocus = () => {
      if (!modalOpenRef.current) return;
      setExpression('love-overload');
      setFacingRight(true);
      if (observeTimerRef.current) clearTimeout(observeTimerRef.current);
      observeTimerRef.current = setTimeout(() => {
        if (modalOpenRef.current) setExpression('excited');
      }, 1500);
    };

    let typingDebounce: ReturnType<typeof setTimeout> | null = null;
    const handleInputTyping = () => {
      if (!modalOpenRef.current) return;
      if (typingDebounce) clearTimeout(typingDebounce);
      typingDebounce = setTimeout(() => {
        if (modalOpenRef.current) {
          setExpression('love-overload');
          setFacingRight(true);
        }
      }, 400);
    };

    window.addEventListener('robot:modal-open', handleModalOpen);
    window.addEventListener('robot:modal-close', handleModalClose);
    window.addEventListener('robot:input-focus', handleInputFocus);
    window.addEventListener('robot:input-typing', handleInputTyping);
    return () => {
      window.removeEventListener('robot:modal-open', handleModalOpen);
      window.removeEventListener('robot:modal-close', handleModalClose);
      window.removeEventListener('robot:input-focus', handleInputFocus);
      window.removeEventListener('robot:input-typing', handleInputTyping);
      if (observeTimerRef.current) clearTimeout(observeTimerRef.current);
      if (typingDebounce) clearTimeout(typingDebounce);
    };
  }, []);

  // Proximity check (butterfly catching)
  useEffect(() => {
    if (isMoving || workMode !== 'none' || expression === 'love' || expression === 'shy' || modalOpenRef.current) return;

    const dx = mousePos.x - pos.x;
    const dy = mousePos.y - pos.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < 150 && !isCatching) {
      setIsCatching(true);
      setExpression('excited');
    } else if (dist > 200 && isCatching) {
      setIsCatching(false);
      setExpression('idle');
    }

    if (isCatching) {
      if (dx > 5) setFacingRight(true);
      if (dx < -5) setFacingRight(false);
    }
  }, [mousePos, pos, isMoving, isCatching, workMode, expression]);

  // Idle behaviors
  useEffect(() => {
    let idleTimer: ReturnType<typeof setTimeout>;
    if (!isMoving && !isCatching && workMode === 'none' && expression === 'idle' && !modalOpenRef.current) {
      idleTimer = setTimeout(() => {
        const rand = Math.random();
        // Night owl: double yawn probability
        const yawnThreshold = isNightOwl ? 0.3 : 0.1;

        if (rand < yawnThreshold) {
          setExpression('yawn');
          setTimeout(() => setExpression((prev) => (prev === 'yawn' ? 'idle' : prev)), 3000);
        } else if (rand < 0.28) {
          setExpression('sleep');
          setTimeout(() => setExpression((prev) => (prev === 'sleep' ? 'idle' : prev)), 5000);
        } else if (rand < 0.46) {
          setExpression('music');
          setTimeout(() => setExpression((prev) => (prev === 'music' ? 'idle' : prev)), 6000);
        } else if (rand < 0.56) {
          setExpression('confused');
          setTimeout(() => setExpression((prev) => (prev === 'confused' ? 'idle' : prev)), 3000);
        } else if (rand < 0.70) {
          setExpression('dance');
          setTimeout(() => setExpression((prev) => (prev === 'dance' ? 'idle' : prev)), 4000);
        } else if (rand < 0.82) {
          setExpression('peek');
          setTimeout(() => setExpression((prev) => (prev === 'peek' ? 'idle' : prev)), 3000);
        } else if (rand < 0.92) {
          setExpression('starry');
          setTimeout(() => setExpression((prev) => (prev === 'starry' ? 'idle' : prev)), 4000);
        } else {
          setExpression('yawn');
          setTimeout(() => setExpression((prev) => (prev === 'yawn' ? 'idle' : prev)), 3000);
        }
      }, 3500 + Math.random() * 3000);
    }
    return () => clearTimeout(idleTimer);
  }, [isMoving, expression, isCatching, workMode, isNightOwl]);

  // Animation loop for movement
  useEffect(() => {
    let frameId: number;

    const animate = () => {
      setPos((prev) => {
        const dx = target.x - prev.x;
        const dy = target.y - prev.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 5) {
          if (isMoving) {
            setIsMoving(false);
            if (workMode === 'none' && highFiveWorkActionRef.current !== 'highfive') {
              setExpression('happy');
              setTimeout(() => {
                setExpression((prevExp) =>
                  prevExp === 'happy' ? 'idle' : prevExp
                );
              }, 2000);
            }
          }
          return prev;
        }

        if (dx > 5) setFacingRight(true);
        if (dx < -5) setFacingRight(false);

        const speed = 0.04;
        return {
          x: prev.x + dx * speed,
          y: prev.y + dy * speed,
        };
      });

      if (isMoving) {
        frameId = requestAnimationFrame(animate);
      }
    };

    if (isMoving) {
      frameId = requestAnimationFrame(animate);
    }

    return () => cancelAnimationFrame(frameId);
  }, [target, isMoving, workMode]);

  return {
    pos,
    isMoving,
    isCatching,
    facingRight,
    expression,
    workMode,
    workAction,
    handleRobotClick,
    mounted,
  };
}
