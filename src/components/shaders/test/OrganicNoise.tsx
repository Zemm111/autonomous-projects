'use client';

import { useEffect, useRef } from 'react';

export default function OrganicNoise() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth * window.devicePixelRatio;
    canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    // Simple noise function
    const noise = (x: number, y: number): number => {
      const n = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
      return n - Math.floor(n);
    };

    const smoothNoise = (x: number, y: number): number => {
      const corners = (noise(x - 1, y - 1) + noise(x + 1, y - 1) + 
                       noise(x - 1, y + 1) + noise(x + 1, y + 1)) / 16;
      const sides = (noise(x - 1, y) + noise(x + 1, y) + 
                     noise(x, y - 1) + noise(x, y + 1)) / 8;
      const center = noise(x, y) / 4;
      return corners + sides + center;
    };

    let frame = 0;
    const animate = () => {
      const { width, height } = canvas.getBoundingClientRect();
      
      ctx.clearRect(0, 0, width, height);

      const time = frame * 0.005;
      const scale = 0.02;
      const cellSize = 8;

      // Draw noise only in bottom-right organic area
      const startX = width * 0.4;
      const startY = height * 0.2;
      
      for (let y = startY; y < height; y += cellSize) {
        for (let x = startX; x < width; x += cellSize) {
          const noiseVal = smoothNoise(x * scale + time, y * scale + time * 0.7);
          const threshold = 0.5 + Math.sin(time * 0.5) * 0.1;
          
          if (noiseVal > threshold) {
            const gray = 140 + noiseVal * 60;
            const alpha = (noiseVal - threshold) * 0.3;
            ctx.fillStyle = `rgba(${gray}, ${gray}, ${gray}, ${alpha})`;
            ctx.fillRect(x, y, cellSize, cellSize);
          }
        }
      }

      frame++;
      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full" />;
}
