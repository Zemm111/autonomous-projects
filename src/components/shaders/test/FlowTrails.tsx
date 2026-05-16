'use client';

import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
}

export default function FlowTrails() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth * window.devicePixelRatio;
    canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    const { width, height } = canvas.getBoundingClientRect();

    // Initialize very sparse particles - only in center-right area
    for (let i = 0; i < 30; i++) {
      particlesRef.current.push({
        x: width * 0.5 + Math.random() * width * 0.4,
        y: height * 0.2 + Math.random() * height * 0.6,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        life: Math.random() * 200,
      });
    }

    const noise = (x: number, y: number): number => {
      const n = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
      return n - Math.floor(n);
    };

    let frame = 0;
    const animate = () => {
      const { width, height } = canvas.getBoundingClientRect();
      
      // Very subtle fade (long trails)
      ctx.fillStyle = 'rgba(255, 255, 255, 0.02)';
      ctx.fillRect(0, 0, width, height);

      const time = frame * 0.01;

      particlesRef.current.forEach((p) => {
        // Very slow flow field
        const angle = noise(p.x * 0.01 + time * 0.1, p.y * 0.01) * Math.PI * 2;
        p.vx += Math.cos(angle) * 0.02;
        p.vy += Math.sin(angle) * 0.02;
        
        // Damping
        p.vx *= 0.98;
        p.vy *= 0.98;
        
        p.x += p.vx;
        p.y += p.vy;
        p.life++;

        // Constrain to organic area
        const centerX = width * 0.65;
        const centerY = height * 0.5;
        const dx = p.x - centerX;
        const dy = p.y - centerY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = Math.min(width, height) * 0.3;

        if (dist > maxDist || p.life > 400) {
          p.x = centerX + (Math.random() - 0.5) * maxDist;
          p.y = centerY + (Math.random() - 0.5) * maxDist;
          p.vx = 0;
          p.vy = 0;
          p.life = 0;
        }

        // Draw very subtle trail
        const lifeRatio = Math.min(p.life / 200, 1);
        const alpha = Math.sin(lifeRatio * Math.PI) * 0.15;
        const gray = 170 + lifeRatio * 20;
        ctx.fillStyle = `rgba(${gray}, ${gray}, ${gray}, ${alpha})`;
        ctx.fillRect(p.x, p.y, 1.5, 1.5);
      });

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
