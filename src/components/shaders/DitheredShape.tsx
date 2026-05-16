'use client';

import { useEffect, useRef } from 'react';

export type ShapeType = 'circle' | 'ellipse' | 'blob' | 'rectangle';

interface DitheredShapeProps {
  shape?: ShapeType;
  position?: { x: number; y: number }; // 0-1 normalized
  size?: number; // 0-1 normalized
  intensity?: number; // 0-1, affects contrast
  className?: string;
}

export default function DitheredShape({ 
  shape = 'blob',
  position = { x: 0.7, y: 0.4 },
  size = 0.35,
  intensity = 0.6,
  className = '',
}: DitheredShapeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const updateSize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    updateSize();
    window.addEventListener('resize', updateSize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      };
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Bayer matrix 8x8 for ordered dithering
    const bayerMatrix = [
      [0, 32, 8, 40, 2, 34, 10, 42],
      [48, 16, 56, 24, 50, 18, 58, 26],
      [12, 44, 4, 36, 14, 46, 6, 38],
      [60, 28, 52, 20, 62, 30, 54, 22],
      [3, 35, 11, 43, 1, 33, 9, 41],
      [51, 19, 59, 27, 49, 17, 57, 25],
      [15, 47, 7, 39, 13, 45, 5, 37],
      [63, 31, 55, 23, 61, 29, 53, 21],
    ];

    // Shape mask functions
    const isInShape = (x: number, y: number, centerX: number, centerY: number, radius: number, time: number): boolean => {
      const dx = x - centerX;
      const dy = y - centerY;
      
      switch (shape) {
        case 'circle':
          return Math.sqrt(dx * dx + dy * dy) < radius;
        
        case 'ellipse':
          const ellipseA = radius * 1.3;
          const ellipseB = radius * 0.8;
          const angle = mouseRef.current.x * Math.PI * 0.5 + time * 0.05;
          const cos = Math.cos(angle);
          const sin = Math.sin(angle);
          const rotX = dx * cos - dy * sin;
          const rotY = dx * sin + dy * cos;
          return (rotX * rotX) / (ellipseA * ellipseA) + (rotY * rotY) / (ellipseB * ellipseB) < 1;
        
        case 'rectangle':
          const rectAngle = mouseRef.current.x * Math.PI * 0.3 + time * 0.03;
          const rectCos = Math.cos(rectAngle);
          const rectSin = Math.sin(rectAngle);
          const rectRotX = Math.abs(dx * rectCos - dy * rectSin);
          const rectRotY = Math.abs(dx * rectSin + dy * rectCos);
          return rectRotX < radius * 1.2 && rectRotY < radius * 0.9;
        
        case 'blob':
        default:
          // Organic blob using noise-like distortion
          const dist = Math.sqrt(dx * dx + dy * dy);
          const angleFromCenter = Math.atan2(dy, dx);
          const wobble = Math.sin(angleFromCenter * 3 + time * 0.1) * 0.15 + 
                         Math.sin(angleFromCenter * 5 - time * 0.08) * 0.1;
          return dist < radius * (1 + wobble);
      }
    };

    let frame = 0;
    const animate = () => {
      const { width, height } = canvas.getBoundingClientRect();
      
      ctx.clearRect(0, 0, width, height);

      const time = frame * 0.01;
      const angle = mouseRef.current.x * Math.PI + time * 0.05;
      
      const centerX = width * position.x + Math.sin(time * 0.1) * 20;
      const centerY = height * position.y + Math.cos(time * 0.15) * 15;
      const radius = Math.min(width, height) * size;

      const dotSize = 3;
      const spacing = 6;

      for (let y = 0; y < height; y += spacing) {
        for (let x = 0; x < width; x += spacing) {
          if (!isInShape(x, y, centerX, centerY, radius, time)) continue;

          const dx = x - centerX;
          const dy = y - centerY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          // Gradient based on angle and distance
          const gradientVal = (Math.cos(angle) * dx + Math.sin(angle) * dy) / radius;
          const normalized = (gradientVal + 1) / 2; // 0 to 1
          
          // Dither threshold
          const threshold = bayerMatrix[Math.floor(y / spacing) % 8][Math.floor(x / spacing) % 8] / 64;
          
          if (normalized > threshold) {
            // Darker tones: medium dark gray (80) to light gray (200)
            const gray = 80 + normalized * 120;
            const fadeEdge = 1 - Math.pow(dist / radius, 2); // Smooth edge fade
            const alpha = fadeEdge * intensity * 0.5;
            ctx.fillStyle = `rgba(${gray}, ${gray}, ${gray}, ${alpha})`;
            ctx.fillRect(x, y, dotSize, dotSize);
          }
        }
      }

      frame++;
      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', updateSize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [shape, position.x, position.y, size, intensity]);

  return <canvas ref={canvasRef} className={`pointer-events-none ${className}`} />;
}
