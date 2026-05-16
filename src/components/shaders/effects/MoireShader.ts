// Moiré interference pattern shader
// Retro, geometric, abstract

export class MoireShader {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private intensity: number;
  private lineSpacing: number = 3;

  constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, intensity: number) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.intensity = intensity;
  }

  render(time: number, mouse: { x: number; y: number }) {
    const { width, height } = this.canvas;
    
    // Transparent background
    this.ctx.clearRect(0, 0, width, height);

    // Mouse-driven rotation and offset
    const mouseRotation = (mouse.x - 0.5) * Math.PI * 0.3 * this.intensity;
    const mouseOffsetX = (mouse.x - 0.5) * 100;
    const mouseOffsetY = (mouse.y - 0.5) * 100;
    const timeRotation = time * 0.00005;

    const centerX = width * 0.5 + mouseOffsetX;
    const centerY = height * 0.5 + mouseOffsetY;

    // Draw two sets of concentric circles with rotation
    this.ctx.strokeStyle = 'rgba(0, 0, 0, 0.08)';
    this.ctx.lineWidth = 1;

    // First set - rotating clockwise
    this.ctx.save();
    this.ctx.translate(centerX, centerY);
    this.ctx.rotate(timeRotation + mouseRotation);
    for (let r = 10; r < Math.max(width, height) * 1.2; r += this.lineSpacing * 4) {
      this.ctx.beginPath();
      this.ctx.arc(0, 0, r, 0, Math.PI * 2);
      this.ctx.stroke();
    }
    this.ctx.restore();

    // Second set - rotating counter-clockwise, offset
    const offset = 50 + Math.sin(time * 0.0001) * 30;
    this.ctx.strokeStyle = 'rgba(0, 0, 0, 0.06)';
    this.ctx.save();
    this.ctx.translate(centerX + offset, centerY - offset * 0.5);
    this.ctx.rotate(-timeRotation * 0.7 - mouseRotation * 0.8);
    for (let r = 10; r < Math.max(width, height) * 1.2; r += this.lineSpacing * 4) {
      this.ctx.beginPath();
      this.ctx.arc(0, 0, r, 0, Math.PI * 2);
      this.ctx.stroke();
    }
    this.ctx.restore();

    // Third set - parallel lines with rotation
    this.ctx.strokeStyle = 'rgba(0, 0, 0, 0.05)';
    this.ctx.lineWidth = 0.5;
    this.ctx.save();
    this.ctx.translate(centerX, centerY);
    this.ctx.rotate(mouseRotation * 1.5 + timeRotation * 0.3);
    for (let i = -Math.max(width, height); i < Math.max(width, height); i += this.lineSpacing * 6) {
      this.ctx.beginPath();
      this.ctx.moveTo(i, -Math.max(width, height));
      this.ctx.lineTo(i, Math.max(width, height));
      this.ctx.stroke();
    }
    this.ctx.restore();
  }

  destroy() {}
}
