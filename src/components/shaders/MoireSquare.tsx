'use client';

import { useEffect, useRef } from 'react';

interface MoireSquareProps {
  className?: string;
  size?: number; // in pixels
  intensity?: number;
}

export default function MoireSquare({ 
  className = '',
  size = 200,
  intensity = 0.6,
}: MoireSquareProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    canvas.width = size;
    canvas.height = size;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      };
    };
    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, size, size);

      const time = frameRef.current * 0.01;
      const mouseRotation = (mouseRef.current.x - 0.5) * 0.3 * intensity;
      
      const centerX = size / 2;
      const centerY = size / 2;

      // First set of lines - horizontal
      ctx.strokeStyle = 'rgba(140, 140, 140, 0.15)';
      ctx.lineWidth = 0.5;
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(time * 0.05 + mouseRotation);
      for (let i = -size; i < size; i += 6) {
        ctx.beginPath();
        ctx.moveTo(-size, i);
        ctx.lineTo(size, i);
        ctx.stroke();
      }
      ctx.restore();

      // Second set - vertical
      ctx.strokeStyle = 'rgba(160, 160, 160, 0.12)';
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(-time * 0.03 - mouseRotation * 0.7);
      for (let i = -size; i < size; i += 6) {
        ctx.beginPath();
        ctx.moveTo(i, -size);
        ctx.lineTo(i, size);
        ctx.stroke();
      }
      ctx.restore();

      // Third set - diagonal
      ctx.strokeStyle = 'rgba(120, 120, 120, 0.1)';
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(Math.PI / 4 + time * 0.02 + mouseRotation * 0.5);
      for (let i = -size * 1.5; i < size * 1.5; i += 8) {
        ctx.beginPath();
        ctx.moveTo(-size * 1.5, i);
        ctx.lineTo(size * 1.5, i);
        ctx.stroke();
      }
      ctx.restore();

      frameRef.current++;
      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [size, intensity]);

  return (
    <canvas 
      ref={canvasRef} 
      className={`pointer-events-none ${className}`}
      style={{ width: size, height: size }}
    />
  );
}
