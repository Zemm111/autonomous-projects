import Link from 'next/link';
import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  href?: string;
  variant?: 'primary' | 'ghost';
  size?: 'default' | 'large';
  onClick?: () => void;
  className?: string;
}

export default function Button({
  children,
  href,
  variant = 'primary',
  size = 'default',
  onClick,
  className = '',
}: ButtonProps) {
  const baseClasses = 'inline-block text-caption uppercase tracking-wide font-medium transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2';
  
  const sizeClasses = {
    default: 'px-6 py-3',
    large: 'px-8 py-4',
  };
  
  const variantClasses = {
    primary: 'bg-black text-white hover:bg-grey-darkest hover:-translate-y-0.5',
    ghost: 'bg-transparent text-black border border-black hover:bg-black hover:text-white',
  };
  
  const classes = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;
  
  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }
  
  return (
    <button onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
