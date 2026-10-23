import ScrollReveal from '@/components/ScrollReveal';
import ProjectCard from '@/components/ProjectCard';
import Button from '@/components/Button';
import DitheredShape from '@/components/shaders/DitheredShape';
import GridOverlay from '@/components/GridOverlay';
import { projectsContent } from '@/lib/projects';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: projectsContent.meta.title,
  description: projectsContent.meta.description,
};

export default function Projects() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        {/* Dithered shape background */}
        <DitheredShape 
          shape="circle"
          position={{ x: 0.2, y: 0.4 }}
          size={0.35}
          intensity={0.6}
          className="absolute inset-0 z-0"
        />
        <GridOverlay opacity={0.05} />
        
        <div className="relative z-10 px-6 md:px-12 lg:px-16 py-32 max-w-page mx-auto w-full">
          <ScrollReveal>
            <h1 className="font-display text-display mb-8 max-w-4xl">
              {projectsContent.intro.headline}
            </h1>
          </ScrollReveal>
          
          <ScrollReveal delay={0.1}>
            <p className="text-body-lg text-grey-dark max-w-2xl">
              {projectsContent.intro.tagline}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Projects List */}
      {projectsContent.projects.map((project, i) => (
        <ProjectCard
          key={project.id}
          title={project.title}
          partner={project.partner}
          tagline={project.tagline}
          synopsis={project.synopsis}
          agentArchitecture={project.agentArchitecture}
          infrastructure={project.infrastructure}
          screenshots={project.screenshots}
          tags={project.tags}
        />
      ))}

      {/* CTA Section */}
      <section className="py-24 md:py-32 px-6 md:px-12 lg:px-16 bg-white">
        <div className="max-w-content mx-auto text-center">
          <ScrollReveal>
            <h2 className="font-display text-h2 mb-6">
              {projectsContent.cta.headline}
            </h2>
          </ScrollReveal>
          
          <ScrollReveal delay={0.1}>
            <p className="text-body-lg text-grey-dark mb-8 max-w-xl mx-auto">
              {projectsContent.cta.body}
            </p>
          </ScrollReveal>
          
          <ScrollReveal delay={0.2}>
            <Button href={projectsContent.cta.buttonHref} variant="primary" size="large">
              {projectsContent.cta.buttonText}
            </Button>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
