'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuVariants = {
  closed: { opacity: 0 },
  open: { opacity: 1 },
};

const linkVariants = {
  closed: { opacity: 0, y: 20 },
  open: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.3,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
    }
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-black isolate"
          variants={menuVariants}
          initial="closed"
          animate="open"
          exit="closed"
          transition={{ duration: 0.3 }}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          <div className="h-full flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-grey-darkest">
              <Link 
                href="/" 
                onClick={onClose}
                className="font-display text-caption uppercase tracking-wide text-white"
              >
                Autonomous Projects
              </Link>
              <button
                onClick={onClose}
                className="text-white text-2xl leading-none p-2"
                aria-label="Close menu"
              >
                ✕
              </button>
            </div>

            {/* Links */}
            <nav className="flex-1 flex flex-col items-center justify-center gap-8 px-6">
              {[
                { href: '/about/', label: 'About' },
                { href: '/services/', label: 'Services' },
                { href: '/contact/', label: 'Contact' },
              ].map((link, i) => (
                <motion.div
                  key={link.href}
                  custom={i}
                  variants={linkVariants}
                  initial="closed"
                  animate="open"
                >
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className="font-display text-h2 text-white hover:text-grey-mid transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
