interface AgentCardProps {
  name: string;
  role: string;
  description: string;
  shape: 'circle' | 'square' | 'triangle' | 'diamond' | 'cross' | 'hexagon' | 'line';
  filled?: boolean;
}

const shapeComponents = {
  circle: (filled: boolean) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.5" fill={filled ? 'currentColor' : 'none'} />
    </svg>
  ),
  square: (filled: boolean) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="6" y="6" width="12" height="12" stroke="currentColor" strokeWidth="1.5" fill={filled ? 'currentColor' : 'none'} />
    </svg>
  ),
  triangle: (filled: boolean) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 5 L20 19 L4 19 Z" stroke="currentColor" strokeWidth="1.5" fill={filled ? 'currentColor' : 'none'} />
    </svg>
  ),
  diamond: (filled: boolean) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 4 L20 12 L12 20 L4 12 Z" stroke="currentColor" strokeWidth="1.5" fill={filled ? 'currentColor' : 'none'} />
    </svg>
  ),
  cross: (filled: boolean) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="12" y1="4" x2="12" y2="20" stroke="currentColor" strokeWidth="2" />
      <line x1="4" y1="12" x2="20" y2="12" stroke="currentColor" strokeWidth="2" />
    </svg>
  ),
  hexagon: (filled: boolean) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 4 L18 8 L18 16 L12 20 L6 16 L6 8 Z" stroke="currentColor" strokeWidth="1.5" fill={filled ? 'currentColor' : 'none'} />
    </svg>
  ),
  line: (filled: boolean) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="4" y1="12" x2="20" y2="12" stroke="currentColor" strokeWidth="2" />
    </svg>
  ),
};

export default function AgentCard({ name, role, description, shape, filled = false }: AgentCardProps) {
  const ShapeComponent = shapeComponents[shape];
  
  return (
    <article className="border-b border-grey-wash py-8 first:pt-0">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 mt-1" aria-hidden="true">
          {ShapeComponent(filled)}
        </div>
        <div>
          <h3 className="font-display text-h3 mb-1">
            {name} <span className="text-grey-mid">·</span> <span className="text-caption uppercase text-grey-mid">{role}</span>
          </h3>
          <p className="text-body text-grey-dark">{description}</p>
        </div>
      </div>
    </article>
  );
}
