interface GridOverlayProps {
  opacity?: number;
  className?: string;
}

export default function GridOverlay({ opacity = 0.08, className = '' }: GridOverlayProps) {
  return (
    <div 
      className={`absolute inset-0 pointer-events-none z-0 hidden md:block ${className}`}
      style={{ opacity }}
      aria-hidden="true"
    >
      <svg
        className="w-full h-full object-cover"
        viewBox="0 0 1440 900"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Vertical lines - asymmetric spacing */}
        <line x1="240" y1="0" x2="240" y2="900" stroke="currentColor" strokeWidth="1" className="text-black" />
        <line x1="580" y1="0" x2="580" y2="900" stroke="currentColor" strokeWidth="1" className="text-black" />
        <line x1="720" y1="0" x2="720" y2="900" stroke="currentColor" strokeWidth="1" className="text-black" />
        <line x1="1060" y1="0" x2="1060" y2="900" stroke="currentColor" strokeWidth="1" className="text-black" />
        <line x1="1200" y1="0" x2="1200" y2="900" stroke="currentColor" strokeWidth="1" className="text-black" />
        
        {/* Horizontal lines - irregular spacing */}
        <line x1="0" y1="180" x2="1440" y2="180" stroke="currentColor" strokeWidth="1" className="text-black" />
        <line x1="0" y1="420" x2="1440" y2="420" stroke="currentColor" strokeWidth="1" className="text-black" />
        <line x1="0" y1="720" x2="1440" y2="720" stroke="currentColor" strokeWidth="1" className="text-black" />
      </svg>
    </div>
  );
}
