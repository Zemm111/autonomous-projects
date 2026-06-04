import ScrollReveal from '@/components/ScrollReveal';
import MethodPhase from '@/components/MethodPhase';
import Button from '@/components/Button';
import Divider from '@/components/Divider';
import MoireSquare from '@/components/shaders/MoireSquare';
import { siteContent } from '@/lib/content';

export default function Services() {
  return (
    <main className="min-h-screen pt-32 pb-24 px-6 md:px-12 lg:px-16">
      <div className="max-w-page mx-auto">
        {/* Page Title */}
        <ScrollReveal>
          <h1 className="font-display text-h1 mb-16 md:mb-24">Services</h1>
        </ScrollReveal>

        {/* Positioning */}
        <section className="mb-24 md:mb-32 relative">
          {/* Moiré square graphic */}
          <div className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/4 opacity-60 hidden lg:block">
            <MoireSquare size={180} intensity={0.7} />
          </div>
          
          <div className="max-w-content ml-auto">
            <ScrollReveal>
              <p className="text-body-lg text-grey-dark leading-relaxed">
                We take you from <span className="text-blue-brand">idea to intelligent application</span>. Whether you're exploring what's possible or ready to build, we provide product strategy, technical execution, and a clear path forward.
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
            {siteContent.services.phases.map((phase, i) => {
              // Add blue highlighting to specific phrases
              let description: React.ReactNode = phase.description;
              
              if (i === 0) {
                description = phase.description.replace(
                  'Free consultation',
                  '<span class="text-blue-brand">Free consultation</span>'
                );
                description = <span dangerouslySetInnerHTML={{ __html: description as string }} />;
              } else if (i === 1) {
                description = phase.description.replace(
                  'define scope',
                  '<span class="text-blue-brand">define scope</span>'
                );
                description = <span dangerouslySetInnerHTML={{ __html: description as string }} />;
              } else if (i === 2) {
                description = phase.description.replace(
                  'working prototype',
                  '<span class="text-blue-brand">working prototype</span>'
                );
                description = <span dangerouslySetInnerHTML={{ __html: description as string }} />;
              } else if (i === 3) {
                description = phase.description.replace(
                  'real use',
                  '<span class="text-blue-brand">real use</span>'
                );
                description = <span dangerouslySetInnerHTML={{ __html: description as string }} />;
              } else if (i === 4) {
                description = phase.description.replace(
                  'You decide what is next',
                  '<span class="text-blue-brand">You decide what is next</span>'
                );
                description = <span dangerouslySetInnerHTML={{ __html: description as string }} />;
              }
              
              return (
                <ScrollReveal key={i} delay={i * 0.05}>
                  <MethodPhase
                    number={`0${i + 1}`}
                    title={phase.phase}
                    description={description}
                  />
                </ScrollReveal>
              );
            })}
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
