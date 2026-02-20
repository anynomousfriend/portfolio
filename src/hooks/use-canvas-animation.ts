import { useEffect, useRef } from 'react';

export function useCanvasAnimation() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resize);
    resize();

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const spacing = 30;
      const rows = Math.ceil(canvas.height / spacing);
      const cols = Math.ceil(canvas.width / spacing);

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * spacing;
          const y = j * spacing;

          const wave1 = Math.sin(x * 0.015 + time * 1.0);
          const wave2 = Math.cos(y * 0.02 + time * 1.5);
          const wave3 = Math.sin((x + y) * 0.01 + time * 0.5);

          const variation = (wave1 + wave2 + wave3) / 3;

          const radius = 1.5 + Math.abs(variation) * 3.5;
          const opacity = 0.15 + Math.abs(variation) * 0.35;

          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(165, 180, 252, ${opacity})`;
          ctx.fill();
        }
      }

      time += 0.025;
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return canvasRef;
}
