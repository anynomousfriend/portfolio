'use client';

import { useRef, useEffect, useCallback, useState } from 'react';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { SkillData } from '@/types';

type SkillCardProps = {
  skill: SkillData;
};

export function SkillCard({ skill }: SkillCardProps) {
  const [ref, inView] = useIntersectionObserver<HTMLDivElement>(0.2);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const angleRef = useRef<number>(0);
  const rafRef = useRef<number | null>(null);
  const isHovering = useRef(false);
  const pendingRaf = useRef<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Idle drift: slowly increment angle — runs entirely outside React render
  const drift = useCallback(() => {
    if (!isHovering.current && glowRef.current) {
      angleRef.current = (angleRef.current + 0.3) % 360;
      glowRef.current.style.setProperty('--glow-angle', `${angleRef.current}deg`);
    }
    rafRef.current = requestAnimationFrame(drift);
  }, []);

  useEffect(() => {
    angleRef.current = Math.random() * 360;
    rafRef.current = requestAnimationFrame(drift);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      if (pendingRaf.current !== null) cancelAnimationFrame(pendingRaf.current);
    };
  }, [drift]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    isHovering.current = true;
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    // Glow border — direct DOM write, zero re-render
    const angle = Math.atan2(e.clientY - cy, e.clientX - cx) * (180 / Math.PI) + 90 - 180;
    angleRef.current = angle;
    if (glowRef.current) {
      glowRef.current.style.setProperty('--glow-angle', `${angle}deg`);
    }

    // Throttle setState to one update per animation frame — eliminates jitter
    // caused by React batching/flushing on every mousemove event (60-120/sec).
    const mx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const my = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    if (pendingRaf.current !== null) return; // already queued this frame
    pendingRaf.current = requestAnimationFrame(() => {
      pendingRaf.current = null;
      setMousePos({ x: mx, y: my });
    });
  };

  const handleMouseLeave = () => {
    isHovering.current = false;
    if (pendingRaf.current !== null) {
      cancelAnimationFrame(pendingRaf.current);
      pendingRaf.current = null;
    }
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <div
      ref={wrapperRef}
      className={`${skill.size} relative`}
      style={{ padding: '1px', borderRadius: '12px', ['--mx' as string]: '0', ['--my' as string]: '0' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Glow border — only the 1px border strip is visible via mask */}
      <div
        ref={glowRef}
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '12px',
          padding: '1px',
          background: 'conic-gradient(from var(--glow-angle, 0deg), transparent 0%, transparent 40%, #6366f1 50%, #818cf8 55%, transparent 65%, transparent 100%)',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
          opacity: '0.6',
          pointerEvents: 'none',
          ['--glow-angle' as string]: '0deg',
        }}
      />
      <Card
        ref={ref}
        className="group hover:border-border/80 transition-all duration-300 overflow-hidden flex flex-col justify-between min-h-[200px] w-full h-full"
      >
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">{skill.icon}</span>
            <CardTitle className="text-sm">{skill.title}</CardTitle>
          </div>
          <CardDescription className="text-xs">{skill.desc}</CardDescription>
        </CardHeader>

        <CardContent className="flex-1 flex items-center justify-center w-full relative min-h-[140px]">
          {skill.renderVisual(inView, mousePos)}
        </CardContent>
      </Card>
    </div>
  );
}
