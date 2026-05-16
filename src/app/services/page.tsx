import ScrollReveal from '@/components/ScrollReveal';
import MethodPhase from '@/components/MethodPhase';
import Button from '@/components/Button';
import Divider from '@/components/Divider';
import ShaderBackground from '@/components/shaders/ShaderBackground';
import { siteContent } from '@/lib/content';

export default function Services() {
  return (
    <main className="min-h-screen pt-32 pb-24 px-6 md:px-12 lg:px-16 relative">
      {/* Shader Zones */}
      <ShaderBackground 
        zones={[
          { id: 'services-moire', type: 'moire', position: 'services-bottom', intensity: 0.7 },
        ]}
      />

      <div className="max-w-page mx-auto">
        {/* Page Title */}
        <ScrollReveal>
          <h1 className="font-display text-h1 mb-16 md:mb-24">Services</h1>
        </ScrollReveal>

        {/* Positioning */}
        <section className="mb-24 md:mb-32">
          <div className="max-w-content ml-auto">
            <ScrollReveal>
              <p className="text-body-lg text-grey-dark leading-relaxed">
                {siteContent.services.positioning}
              </p>
            </ScrollReveal>
          </div>
        </section>

        <Divider />

        {/* Build Methodology */}
        <section className="mb-24 md:mb-32">
          <ScrollReveal>
            <h2 className="font-display text-h2 uppercase tracking-tight mb-16">
              How We Work
            </h2>
          </ScrollReveal>
          
          <div className="max-w-4xl">
            {siteContent.services.phases.map((phase, i) => (
              <ScrollReveal key={i} delay={i * 0.05}>
                <MethodPhase
                  number={`0${i + 1}`}
                  title={phase.phase}
                  description={phase.description}
                />
              </ScrollReveal>
            ))}
          </div>
        </section>

        <Divider />

        {/* What We Build */}
        <section className="mb-24 md:mb-32">
          <ScrollReveal>
            <h2 className="font-display text-h2 uppercase tracking-tight mb-12">
              {siteContent.services.capabilitiesTitle}
            </h2>
          </ScrollReveal>
          
          <div className="max-w-content">
            <ul className="space-y-4">
              {siteContent.services.capabilities.map((item, i) => (
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

        {/* CTA */}
        <section className="py-16">
          <div className="max-w-content mx-auto text-center">
            <ScrollReveal>
              <h2 className="font-display text-h2 mb-8">
                Ready to build?
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <Button href="/contact/" variant="primary" size="large">
                Start a conversation →
              </Button>
            </ScrollReveal>
          </div>
        </section>
      </div>
    </main>
  );
}
