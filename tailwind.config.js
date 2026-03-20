/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        black: '#000000',
        white: '#FFFFFF',
        grey: {
          darkest: '#0A0A0A',
          dark: '#1A1A1A',
          mid: '#808080',
          light: '#C0C0C0',
          wash: '#F5F5F5',
        },
      },
      fontFamily: {
        display: ['Space Grotesk', 'Helvetica Neue', 'Helvetica', 'Arial', 'system-ui', 'sans-serif'],
        body: ['Helvetica Neue', 'Helvetica', 'Arial', 'system-ui', 'sans-serif'],
        mono: ['Space Mono', 'SF Mono', 'Fira Code', 'monospace'],
      },
      fontSize: {
        'display': ['clamp(48px, 8vw, 96px)', { lineHeight: '0.95', letterSpacing: '-0.04em', fontWeight: '700' }],
        'h1': ['clamp(36px, 5vw, 64px)', { lineHeight: '1.0', letterSpacing: '-0.03em', fontWeight: '700' }],
        'h2': ['clamp(28px, 3.5vw, 48px)', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '600' }],
        'h3': ['clamp(20px, 2.5vw, 32px)', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '600' }],
        'body': ['clamp(16px, 1.2vw, 18px)', { lineHeight: '1.6', fontWeight: '400' }],
        'body-lg': ['clamp(18px, 1.5vw, 22px)', { lineHeight: '1.5', fontWeight: '400' }],
        'caption': ['clamp(11px, 0.9vw, 13px)', { lineHeight: '1.4', letterSpacing: '0.1em', fontWeight: '500' }],
      },
      letterSpacing: {
        tighter: '-0.04em',
        tight: '-0.02em',
        wide: '0.1em',
      },
      maxWidth: {
        content: '720px',
        page: '1280px',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
        '36': '9rem',
        '48': '12rem',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
};
