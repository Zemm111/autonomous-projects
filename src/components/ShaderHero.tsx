'use client';

import { useEffect, useRef, useState } from 'react';

interface ShaderHeroProps {
  className?: string;
}

export default function ShaderHero({ className = '' }: ShaderHeroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    // Check if mobile
    setIsMobile(window.matchMedia('(max-width: 768px)').matches);
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl', { 
      alpha: true, 
      antialias: false,
      preserveDrawingBuffer: false 
    });
    
    if (!gl) {
      // Fallback to static grain if WebGL not supported
      return;
    }

    // Vertex shader
    const vertexShaderSource = `
      attribute vec2 a_position;
      void main() {
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    // Fragment shader - grain/noise effect
    const fragmentShaderSource = `
      precision mediump float;
      uniform vec2 u_resolution;
      uniform float u_time;
      uniform vec2 u_mouse;
      
      float random(vec2 st) {
        return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
      }
      
      float noise(vec2 st) {
        vec2 i = floor(st);
        vec2 f = fract(st);
        float a = random(i);
        float b = random(i + vec2(1.0, 0.0));
        float c = random(i + vec2(0.0, 1.0));
        float d = random(i + vec2(1.0, 1.0));
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
      }
      
      void main() {
        vec2 st = gl_FragCoord.xy / u_resolution.xy;
        
        // Mouse influence
        vec2 mouseInfluence = u_mouse - st;
        float mouseDist = length(mouseInfluence);
        float influence = smoothstep(0.5, 0.0, mouseDist) * 0.3;
        
        // Animated noise field
        vec2 pos = st * 8.0;
        pos += u_mouse * 2.0;
        pos.x += u_time * 0.05;
        
        float n = noise(pos);
        n += noise(pos * 2.0) * 0.5;
        n += noise(pos * 4.0) * 0.25;
        n /= 1.75;
        
        // Add grain
        float grain = random(st + u_time * 0.001) * 0.08;
        n = mix(n, grain, 0.3);
        
        // Apply mouse influence
        n += influence;
        
        // Subtle black particles on white
        float alpha = smoothstep(0.4, 0.6, n) * 0.15;
        
        gl_FragColor = vec4(0.0, 0.0, 0.0, alpha);
      }
    `;

    // Create shader program
    function createShader(gl: WebGLRenderingContext, type: number, source: string) {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compile error:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    }

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
    
    if (!vertexShader || !fragmentShader) return;

    const program = gl.createProgram();
    if (!program) return;
    
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program link error:', gl.getProgramInfoLog(program));
      return;
    }

    // Setup geometry (full-screen quad)
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW
    );

    const positionAttributeLocation = gl.getAttribLocation(program, 'a_position');
    const resolutionUniformLocation = gl.getUniformLocation(program, 'u_resolution');
    const timeUniformLocation = gl.getUniformLocation(program, 'u_time');
    const mouseUniformLocation = gl.getUniformLocation(program, 'u_mouse');

    // Resize canvas
    const resize = () => {
      const displayWidth = canvas.clientWidth;
      const displayHeight = canvas.clientHeight;
      
      if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
        canvas.width = displayWidth;
        canvas.height = displayHeight;
        gl.viewport(0, 0, displayWidth, displayHeight);
      }
    };

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: 1.0 - (e.clientY - rect.top) / rect.height,
      };
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', resize);
    resize();

    // Render loop
    let startTime = Date.now();
    const render = () => {
      const currentTime = (Date.now() - startTime) / 1000;
      
      gl.clearColor(1, 1, 1, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      
      gl.useProgram(program);
      
      gl.enableVertexAttribArray(positionAttributeLocation);
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);
      
      gl.uniform2f(resolutionUniformLocation, canvas.width, canvas.height);
      gl.uniform1f(timeUniformLocation, currentTime);
      gl.uniform2f(mouseUniformLocation, mouseRef.current.x, mouseRef.current.y);
      
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
      
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      
      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', resize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
    };
  }, []);

  return (
    <div className={`relative ${className}`} aria-hidden="true">
      <canvas
        ref={canvasRef}
        className="w-full h-full absolute inset-0"
        style={{ 
          mixBlendMode: isMobile ? 'normal' : 'multiply',
          background: isMobile ? 'linear-gradient(180deg, #f5f5f5 0%, #ffffff 100%)' : 'transparent'
        }}
      />
      {/* Fallback static grain for browsers without WebGL */}
      <div className="w-full h-full absolute inset-0 opacity-5 pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]" />
    </div>
  );
}
