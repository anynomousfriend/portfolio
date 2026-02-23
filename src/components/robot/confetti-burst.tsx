'use client';
import { useEffect, useRef } from 'react';

interface ConfettiBurstProps {
  active: boolean;
  x: number;
  y: number;
  onDone?: () => void;
}

const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#3b82f6', '#f43f5e', '#a3e635'];

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  rotation: number;
  rotationSpeed: number;
  life: number;
  maxLife: number;
}

export function ConfettiBurst({ active, x, y, onDone }: ConfettiBurstProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Particle[] = [];
    const MAX_LIFE = 180;

    for (let i = 0; i < 60; i++) {
      particles.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 16,        // -8 to 8
        vy: -(Math.random() * 12 + 3),          // -15 to -3 (upward)
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        size: Math.random() * 4 + 4,            // 4–8px
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.2,
        life: 0,
        maxLife: MAX_LIFE,
      });
    }

    let rafId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      let allDead = true;

      for (const p of particles) {
        if (p.life >= p.maxLife) continue;

        allDead = false;
        p.life += 1;
        p.vy += 0.3;                            // gravity
        p.vx += (Math.random() - 0.5) * 0.1;   // slight horizontal drift
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;

        const opacity = 1 - p.life / p.maxLife;

        ctx.save();
        ctx.globalAlpha = opacity;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.fillStyle = p.color;

        // Rounded rectangle (small pill shape)
        const w = p.size;
        const h = p.size / 2;
        const r = h / 2;
        ctx.beginPath();
        ctx.moveTo(-w / 2 + r, -h / 2);
        ctx.lineTo(w / 2 - r, -h / 2);
        ctx.arcTo(w / 2, -h / 2, w / 2, h / 2, r);
        ctx.lineTo(w / 2 - r, h / 2);
        ctx.arcTo(w / 2, h / 2, -w / 2, h / 2, r);
        ctx.lineTo(-w / 2 + r, h / 2);
        ctx.arcTo(-w / 2, h / 2, -w / 2, -h / 2, r);
        ctx.lineTo(-w / 2, -h / 2 + r);
        ctx.arcTo(-w / 2, -h / 2, w / 2, -h / 2, r);
        ctx.closePath();
        ctx.fill();

        ctx.restore();
      }

      if (allDead) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        onDone?.();
        return;
      }

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]); // intentionally omit x/y/onDone — we snapshot position once when active fires

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 9999 }}
    />
  );
}
