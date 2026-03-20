interface DividerProps {
  className?: string;
}

export default function Divider({ className = '' }: DividerProps) {
  return (
    <div 
      className={`my-16 md:my-24 w-full h-10 flex items-center justify-center ${className}`}
      role="separator"
      aria-hidden="true"
    >
      <svg 
        width="100%" 
        height="40" 
        viewBox="0 0 1280 40" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
      >
        <line x1="0" y1="20" x2="520" y2="20" stroke="currentColor" strokeWidth="1" className="text-grey-mid" />
        <circle cx="640" cy="20" r="3" fill="currentColor" className="text-black" />
        <line x1="760" y1="20" x2="1280" y2="20" stroke="currentColor" strokeWidth="1" className="text-grey-mid" />
      </svg>
    </div>
  );
}
