'use client';

import Link from 'next/link';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-grey-wash">
      <nav className="max-w-page mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="font-display text-caption uppercase tracking-wide">
          Autonomous Projects
        </Link>
        <div className="flex gap-6 text-caption uppercase tracking-wide">
          <Link href="/about/" className="hover:opacity-50 transition-opacity duration-150">About</Link>
          <Link href="/services/" className="hover:opacity-50 transition-opacity duration-150">Services</Link>
          <Link href="/contact/" className="hover:opacity-50 transition-opacity duration-150">Contact</Link>
        </div>
      </nav>
    </header>
  );
}
