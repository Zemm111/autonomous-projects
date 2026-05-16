import ScrollReveal from '@/components/ScrollReveal';
import Button from '@/components/Button';
import Divider from '@/components/Divider';
import ShaderBackground from '@/components/shaders/ShaderBackground';
import GridOverlay from '@/components/GridOverlay';
import { siteContent } from '@/lib/content';

export default function Home() {
  return (
    <main className="min-h-screen relative">
      {/* Shader Zones */}
      <ShaderBackground 
        zones={[
          { id: 'hero-moire', type: 'moire', position: 'hero', intensity: 0.8 },
        ]}
      />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <GridOverlay opacity={0.05} />
        
        <div className="relative z-10 px-6 md:px-12 lg:px-16 py-32 max-w-page mx-auto w-full">
          <ScrollReveal>
            <h1 className="font-display text-display mb-8 max-w-4xl">
              {siteContent.home.headline}
            </h1>
          </ScrollReveal>
          
          <ScrollReveal delay={0.1}>
            <p className="text-body-lg text-grey-dark mb-8 max-w-2xl">
              {siteContent.home.tagline}
            </p>
          </ScrollReveal>
          
          <ScrollReveal delay={0.2}>
            <div className="flex flex-col sm:flex-row gap-4 mt-12">
              <Button href={siteContent.home.ctaPrimary.href} variant="primary" size="large">
                {siteContent.home.ctaPrimary.label}
              </Button>
              <Button href={siteContent.home.ctaSecondary.href} variant="ghost" size="large">
                {siteContent.home.ctaSecondary.label}
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Intro Section */}
      <section className="bg-white py-24 md:py-32 px-6 md:px-12 lg:px-16">
        <div className="max-w-page mx-auto">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">
            <ScrollReveal>
              <div className="space-y-6">
                <p className="text-body-lg text-grey-dark leading-relaxed">
                  {siteContent.home.intro}
                </p>
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={0.1}>
              <div>
                <h2 className="font-display text-h3 uppercase mb-6 text-grey-mid tracking-wide">
                  What We Build
                </h2>
                <ul className="space-y-3 text-body text-grey-dark">
                  {siteContent.services.capabilities.map((capability, i) => (
                    <li key={i} className="flex items-start">
                      <span className="mr-3 mt-1.5 w-1.5 h-1.5 bg-black rounded-full flex-shrink-0" />
                      {capability}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <Divider />

      {/* CTA Section */}
      <section className="py-24 md:py-32 px-6 md:px-12 lg:px-16 bg-grey-wash">
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
    </main>
  );
}
