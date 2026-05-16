'use client';

import { useEffect, useRef } from 'react';

export default function MoireLines() {
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
      
      ctx.clearRect(0, 0, width, height);

      const time = frame * 0.01;
      const mouseTilt = (mouseRef.current.x - 0.5) * 0.3;
      
      // Draw lines only in left-center organic blob
      const centerX = width * 0.35;
      const centerY = height * 0.5;
      const radius = Math.min(width, height) * 0.4;

      ctx.save();
      ctx.translate(centerX, centerY);
      
      // First set - vertical lines with tilt
      ctx.strokeStyle = 'rgba(160, 160, 160, 0.1)';
      ctx.lineWidth = 0.5;
      ctx.rotate(mouseTilt + Math.sin(time * 0.1) * 0.1);
      for (let x = -radius; x < radius; x += 8) {
        ctx.beginPath();
        ctx.moveTo(x, -radius);
        ctx.lineTo(x, radius);
        ctx.stroke();
      }
      ctx.restore();

      // Second set - horizontal lines
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.strokeStyle = 'rgba(140, 140, 140, 0.12)';
      ctx.rotate(-mouseTilt * 0.5 + Math.cos(time * 0.08) * 0.15);
      for (let y = -radius; y < radius; y += 8) {
        ctx.beginPath();
        ctx.moveTo(-radius, y);
        ctx.lineTo(radius, y);
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
