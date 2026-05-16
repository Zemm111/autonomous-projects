'use client';

import { useEffect, useRef } from 'react';
import { FlowFieldShader } from './effects/FlowFieldShader';
import { MoireShader } from './effects/MoireShader';
import { DitherShader } from './effects/DitherShader';

export type ShaderType = 'flowfield' | 'moire' | 'dither';

interface ShaderZoneProps {
  type: ShaderType;
  className?: string;
  intensity?: number; // 0-1, controls effect strength
}

const shaderEffects = {
  flowfield: FlowFieldShader,
  moire: MoireShader,
  dither: DitherShader,
};

export default function ShaderZone({ type, className = '', intensity = 0.5 }: ShaderZoneProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size to match element
    const updateSize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    updateSize();
    window.addEventListener('resize', updateSize);

    // Initialize selected shader
    const ShaderEffect = shaderEffects[type];
    const shader = new ShaderEffect(canvas, ctx, intensity);

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      };
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    const animate = (time: number) => {
      shader.render(time, mouseRef.current);
      animationRef.current = requestAnimationFrame(animate);
    };
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', updateSize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      shader.destroy();
    };
  }, [type, intensity]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none ${className}`}
      style={{ imageRendering: 'pixelated' }}
    />
  );
}
