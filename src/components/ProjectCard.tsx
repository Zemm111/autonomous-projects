import ScrollReveal from './ScrollReveal';
import ProjectSection from './ProjectSection';
import ScreenshotGallery from './ScreenshotGallery';
import TechStack from './TechStack';
import Divider from './Divider';

interface ProjectCardProps {
  title: string;
  partner: string;
  tagline: string;
  synopsis: string;
  agentArchitecture: string;
  infrastructure: Array<{
    category: string;
    technologies: string[];
  }>;
  screenshots: Array<{
    src: string;
    alt: string;
    caption?: string;
    featured?: boolean;
  }>;
  tags: string[];
}

export default function ProjectCard(props: ProjectCardProps) {
  return (
    <article className="space-y-0">
      {/* Header */}
      <section className="py-16 md:py-24 px-6 md:px-12 lg:px-16 bg-white">
        <div className="max-w-page mx-auto">
          <ScrollReveal>
            <div className="mb-6">
              <span className="inline-block px-4 py-2 bg-blue-brand/10 text-blue-brand text-sm font-display uppercase tracking-wide rounded-sm">
                {props.partner}
              </span>
            </div>
          </ScrollReveal>
          
          <ScrollReveal delay={0.1}>
            <h2 className="font-display text-h1 mb-4">
              {props.title}
            </h2>
          </ScrollReveal>
          
          <ScrollReveal delay={0.2}>
            <p className="text-h3 text-grey-mid mb-8">
              {props.tagline}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Synopsis & Hero Screenshot */}
      <section className="py-12 px-6 md:px-12 lg:px-16 bg-grey-wash">
        <div className="max-w-page mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <ScrollReveal>
              <div>
                <h3 className="font-display text-h3 uppercase tracking-tight mb-6 text-grey-mid">
                  Synopsis
                </h3>
                <p className="text-body text-grey-dark leading-relaxed">
                  {props.synopsis}
                </p>
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={0.1}>
              <ScreenshotGallery 
                screenshots={[props.screenshots.find(s => s.featured) || props.screenshots[0]]} 
                layout="grid"
              />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Agent Architecture */}
      <section className="py-16 md:py-20 px-6 md:px-12 lg:px-16 bg-white">
        <div className="max-w-page mx-auto">
          <ScrollReveal>
            <h3 className="font-display text-h3 uppercase tracking-tight mb-8 text-grey-mid">
              Agent Architecture
            </h3>
          </ScrollReveal>
          
          <ScrollReveal delay={0.1}>
            <div className="max-w-content">
              <div className="text-body text-grey-dark leading-relaxed space-y-6">
                {props.agentArchitecture.split('\n\n').map((paragraph, i) => {
                  // Handle markdown-style bold with ** or __
                  const parts = paragraph.split(/(\*\*.*?\*\*)/g);
                  return (
                    <p key={i}>
                      {parts.map((part, j) => {
                        if (part.startsWith('**') && part.endsWith('**')) {
                          return <strong key={j} className="text-black">{part.slice(2, -2)}</strong>;
                        }
                        return <span key={j}>{part}</span>;
                      })}
                    </p>
                  );
                })}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Screenshot Gallery */}
      <section className="py-12 px-6 md:px-12 lg:px-16 bg-grey-wash">
        <div className="max-w-page mx-auto">
          <ScrollReveal>
            <ScreenshotGallery 
              screenshots={props.screenshots.filter(s => !s.featured)} 
              layout="grid"
            />
          </ScrollReveal>
        </div>
      </section>

      {/* Infrastructure */}
      <section className="py-16 md:py-20 px-6 md:px-12 lg:px-16 bg-white">
        <div className="max-w-page mx-auto">
          <ScrollReveal>
            <h3 className="font-display text-h3 uppercase tracking-tight mb-8 text-grey-mid">
              Infrastructure
            </h3>
          </ScrollReveal>
          
          <ScrollReveal delay={0.1}>
            <TechStack items={props.infrastructure} />
          </ScrollReveal>
        </div>
      </section>

      {/* Tags */}
      <section className="py-8 px-6 md:px-12 lg:px-16 bg-grey-wash">
        <div className="max-w-page mx-auto">
          <ScrollReveal>
            <div className="flex flex-wrap gap-3">
              {props.tags.map((tag, i) => (
                <span 
                  key={i}
                  className="px-4 py-2 bg-white text-grey-dark text-sm rounded-sm border border-grey-light"
                >
                  {tag}
                </span>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Divider />
    </article>
  );
}
