'use client';

import { useEffect, useRef } from 'react';

export default function MoireCircles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth * window.devicePixelRatio;
    canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      };
    };
    window.addEventListener('mousemove', handleMouseMove);

    let frame = 0;
    const animate = () => {
      const { width, height } = canvas.getBoundingClientRect();
      
      // Clear with transparency
      ctx.clearRect(0, 0, width, height);

      const time = frame * 0.01;
      const mouseRotation = (mouseRef.current.x - 0.5) * 0.5;
      
      // Only draw in upper-right organic area
      const centerX = width * 0.7 + Math.sin(time * 0.1) * 50;
      const centerY = height * 0.3 + Math.cos(time * 0.15) * 30;

      // First set of circles
      ctx.strokeStyle = 'rgba(150, 150, 150, 0.12)';
      ctx.lineWidth = 1;
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(time * 0.05 + mouseRotation);
      for (let r = 20; r < 500; r += 15) {
        ctx.beginPath();
        ctx.arc(0, 0, r, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.restore();

      // Second set offset
      ctx.strokeStyle = 'rgba(180, 180, 180, 0.08)';
      ctx.save();
      ctx.translate(centerX + 40, centerY - 20);
      ctx.rotate(-time * 0.03 - mouseRotation * 0.7);
      for (let r = 20; r < 500; r += 15) {
        ctx.beginPath();
        ctx.arc(0, 0, r, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.restore();

      frame++;
      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full" />;
}
