import type { Metadata } from 'next';
import { Space_Grotesk, Space_Mono } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import '@/styles/globals.css';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-space-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Autonomous Projects — Agentic Software Agency',
  description: 'We deploy coordinated AI agent swarms to design, build, and ship software — fast.',
  openGraph: {
    title: 'Autonomous Projects — Agentic Software Agency',
    description: 'We deploy coordinated AI agent swarms to design, build, and ship software — fast.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${spaceMono.variable}`}>
      <body className="antialiased">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
