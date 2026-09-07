'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import MobileMenu from './MobileMenu';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-grey-wash">
        <nav className="max-w-page mx-auto px-6 md:px-12 lg:px-16 py-6 flex items-center justify-between">
          <Link 
            href="/" 
            className="flex items-center gap-3 hover:opacity-70 transition-opacity duration-150"
            onClick={() => setMobileMenuOpen(false)}
          >
            <img src="/logo.jpg" alt="Aegean Applications" className="h-12 w-12" />
            <span className="font-display text-caption uppercase tracking-wide">Aegean Applications</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex gap-8 text-caption uppercase tracking-wide">
            <Link 
              href="/about/" 
              className={`hover:text-black transition-colors duration-150 ${
                isActive('/about/') ? 'text-black font-semibold' : 'text-grey-mid'
              }`}
            >
              About
            </Link>
            <Link 
              href="/services/" 
              className={`hover:text-black transition-colors duration-150 ${
                isActive('/services/') ? 'text-black font-semibold' : 'text-grey-mid'
              }`}
            >
              Services
            </Link>
            <Link 
              href="/contact/" 
              className={`hover:text-black transition-colors duration-150 ${
                isActive('/contact/') ? 'text-black font-semibold' : 'text-grey-mid'
              }`}
            >
              Contact
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 -mr-2"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </nav>
      </header>

      {/* Mobile Menu */}
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </>
  );
}
