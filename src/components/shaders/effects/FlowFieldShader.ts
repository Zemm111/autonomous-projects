// Perlin Noise Flow Field with particle trails
// VHS/CRT ghosting aesthetic

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
}

export class FlowFieldShader {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private particles: Particle[] = [];
  private intensity: number;
  private noiseScale: number = 0.005;
  private particleCount: number = 150;

  constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, intensity: number) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.intensity = intensity;
    this.initParticles();
  }

  private initParticles() {
    for (let i = 0; i < this.particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: 0,
        vy: 0,
        life: Math.random() * 100,
        maxLife: 100 + Math.random() * 100,
      });
    }
  }

  // Simple Perlin-like noise (deterministic pseudo-random)
  private noise(x: number, y: number): number {
    const n = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
    return n - Math.floor(n);
  }

  private smoothNoise(x: number, y: number): number {
    const corners = (this.noise(x - 1, y - 1) + this.noise(x + 1, y - 1) + 
                     this.noise(x - 1, y + 1) + this.noise(x + 1, y + 1)) / 16;
    const sides = (this.noise(x - 1, y) + this.noise(x + 1, y) + 
                   this.noise(x, y - 1) + this.noise(x, y + 1)) / 8;
    const center = this.noise(x, y) / 4;
    return corners + sides + center;
  }

  private getFlowAngle(x: number, y: number, mouseX: number, mouseY: number, time: number): number {
    // Base flow from noise
    const noiseVal = this.smoothNoise(x * this.noiseScale + time * 0.0001, y * this.noiseScale);
    let angle = noiseVal * Math.PI * 2;

    // Mouse influence (gravity well)
    const dx = mouseX - x;
    const dy = mouseY - y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 200) {
      const mouseAngle = Math.atan2(dy, dx);
      const influence = (1 - dist / 200) * 0.3 * this.intensity;
      angle = angle * (1 - influence) + mouseAngle * influence;
    }

    return angle;
  }

  render(time: number, mouse: { x: number; y: number }) {
    const { width, height } = this.canvas;
    const mouseX = mouse.x * width;
    const mouseY = mouse.y * height;

    // Fade previous frame (trail effect)
    this.ctx.fillStyle = 'rgba(245, 245, 245, 0.08)';
    this.ctx.fillRect(0, 0, width, height);

    // Update and draw particles
    this.particles.forEach((p) => {
      // Get flow direction
      const angle = this.getFlowAngle(p.x, p.y, mouseX, mouseY, time);
      const speed = 0.5 * this.intensity;

      // Update velocity
      p.vx += Math.cos(angle) * speed * 0.1;
      p.vy += Math.sin(angle) * speed * 0.1;

      // Apply friction
      p.vx *= 0.95;
      p.vy *= 0.95;

      // Update position
      p.x += p.vx;
      p.y += p.vy;

      // Update life
      p.life++;

      // Wrap around edges
      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      // Reset particle if dead
      if (p.life > p.maxLife) {
        p.x = Math.random() * width;
        p.y = Math.random() * height;
        p.vx = 0;
        p.vy = 0;
        p.life = 0;
      }

      // Draw particle (grayscale, fade based on life)
      const lifeRatio = p.life / p.maxLife;
      const alpha = Math.sin(lifeRatio * Math.PI) * 0.4;
      const gray = Math.floor(50 + lifeRatio * 150);
      this.ctx.fillStyle = `rgba(${gray}, ${gray}, ${gray}, ${alpha})`;
      this.ctx.fillRect(p.x, p.y, 2, 2);
    });
  }

  destroy() {
    this.particles = [];
  }
}
