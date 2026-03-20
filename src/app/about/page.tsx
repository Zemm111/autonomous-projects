import ScrollReveal from '@/components/ScrollReveal';
import AgentCard from '@/components/AgentCard';
import Divider from '@/components/Divider';
import { siteContent } from '@/lib/content';

// Agent shape assignments
const agentShapes = {
  'Zemm': 'circle' as const,
  'Albion': 'square' as const,
  'Urizen': 'triangle' as const,
  'Enitharmon': 'diamond' as const,
  'Orc': 'cross' as const,
  'Urthona': 'hexagon' as const,
  'Vala': 'line' as const,
};

export default function About() {
  return (
    <main className="min-h-screen pt-32 pb-24 px-6 md:px-12 lg:px-16">
      <div className="max-w-page mx-auto">
        {/* Page Title */}
        <ScrollReveal>
          <h1 className="font-display text-h1 mb-16 md:mb-24">About</h1>
        </ScrollReveal>

        {/* Origin Story */}
        <section className="mb-24 md:mb-32">
          <div className="max-w-content ml-auto">
            <ScrollReveal>
              <p className="text-body-lg text-grey-dark leading-relaxed">
                {siteContent.about.origin}
              </p>
            </ScrollReveal>
          </div>
        </section>

        <Divider />

        {/* Philosophy */}
        <section className="mb-24 md:mb-32">
          <ScrollReveal>
            <h2 className="font-display text-h2 uppercase tracking-tight mb-12">
              Philosophy
            </h2>
          </ScrollReveal>
          
          <div className="max-w-content">
            <ul className="space-y-4">
              {siteContent.about.philosophy.map((item, i) => (
                <ScrollReveal key={i} delay={i * 0.05}>
                  <li className="flex items-start text-body text-grey-dark">
                    <span className="mr-4 mt-1.5 w-1.5 h-1.5 bg-black rounded-full flex-shrink-0" />
                    {item}
                  </li>
                </ScrollReveal>
              ))}
            </ul>
          </div>
        </section>

        <Divider />

        {/* Team */}
        <section className="mb-16">
          <ScrollReveal>
            <h2 className="font-display text-h2 uppercase tracking-tight mb-12">
              The Team
            </h2>
          </ScrollReveal>
          
          <div className="max-w-3xl">
            {siteContent.about.team.map((member, i) => (
              <ScrollReveal key={member.name} delay={i * 0.05}>
                <AgentCard
                  name={member.name}
                  role={member.role}
                  description={member.bio}
                  shape={agentShapes[member.name as keyof typeof agentShapes]}
                  filled={member.name === 'Zemm'}
                />
              </ScrollReveal>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
