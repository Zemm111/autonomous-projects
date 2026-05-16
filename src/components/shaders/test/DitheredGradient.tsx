'use client';

import { useEffect, useRef } from 'react';

export default function DitheredGradient() {
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

    // Bayer matrix for ordered dithering
    const bayerMatrix = [
      [0, 8, 2, 10],
      [12, 4, 14, 6],
      [3, 11, 1, 9],
      [15, 7, 13, 5],
    ];

    let frame = 0;
    const animate = () => {
      const { width, height } = canvas.getBoundingClientRect();
      
      ctx.clearRect(0, 0, width, height);

      const time = frame * 0.01;
      const angle = mouseRef.current.x * Math.PI + time * 0.1;
      const dotSize = 3;
      const spacing = 6;

      // Draw dithered gradient in top-left organic blob
      const centerX = width * 0.3;
      const centerY = height * 0.35;
      const radius = Math.min(width, height) * 0.35;

      for (let y = 0; y < height; y += spacing) {
        for (let x = 0; x < width; x += spacing) {
          // Only draw within organic radius from center
          const dx = x - centerX;
          const dy = y - centerY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < radius) {
            // Gradient based on angle and distance
            const gradientVal = (Math.cos(angle) * dx + Math.sin(angle) * dy) / radius;
            const normalized = (gradientVal + 1) / 2; // 0 to 1
            
            // Dither threshold
            const threshold = bayerMatrix[Math.floor(y / spacing) % 4][Math.floor(x / spacing) % 4] / 16;
            
            if (normalized > threshold) {
              const gray = 160 + normalized * 40;
              const alpha = 1 - (dist / radius) * 0.5; // Fade at edges
              ctx.fillStyle = `rgba(${gray}, ${gray}, ${gray}, ${alpha * 0.3})`;
              ctx.fillRect(x, y, dotSize, dotSize);
            }
          }
        }
      }

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
