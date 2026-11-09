'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Project {
  id: string;
  title: string;
  description: string;
  year: string;
  image: string;
  link: string;
}

const projects: Project[] = [
  {
    id: 'participation-intelligence',
    title: 'Participation Intelligence',
    description: 'AI-powered community engagement analysis for YouTube brands',
    year: '2026',
    image: '/screenshots/participation-intelligence/hero.jpg',
    link: '/projects#participation-intelligence',
  },
  {
    id: 'truenumbers-ai',
    title: 'TrueNumbersAI',
    description: 'Natural language to knowledge graphs with human review',
    year: '2026',
    image: '/screenshots/truenumbers-ai/overview.jpg',
    link: '/projects#truenumbers-ai',
  },
];

export default function ProjectShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      
      // Wait for fade out, then change project
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % projects.length);
        setIsTransitioning(false);
      }, 1500); // 1.5 seconds for fade out
      
    }, 7500); // 7.5 seconds total display time

    return () => clearInterval(interval);
  }, []);

  const currentProject = projects[currentIndex];

  return (
    <Link 
      href={currentProject.link}
      className="block group"
    >
      <div 
        className={`transition-opacity duration-[1500ms] ease-in-out ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}
      >
        {/* Screenshot */}
        <div className="relative aspect-video w-full mb-4 rounded-sm overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow">
          <Image
            src={currentProject.image}
            alt={currentProject.title}
            fill
            className="object-cover object-top"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        
        {/* Project Info */}
        <div className="space-y-2">
          <div className="flex items-baseline justify-between">
            <h3 className="font-display text-h4 group-hover:text-blue-brand transition-colors">
              {currentProject.title}
            </h3>
            <span className="text-sm text-grey-mid font-mono">
              {currentProject.year}
            </span>
          </div>
          
          <p className="text-body text-grey-dark leading-relaxed">
            {currentProject.description}
          </p>
        </div>
      </div>
    </Link>
  );
}
