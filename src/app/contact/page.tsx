import ScrollReveal from '@/components/ScrollReveal';
import { siteContent } from '@/lib/content';

export default function Contact() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6 md:px-12 lg:px-16">
      <div className="max-w-content mx-auto text-center py-32">
        <ScrollReveal>
          <h1 className="font-display text-h1 mb-12">
            Exploring <span className="text-blue-brand">agentic applications</span>? Have an idea you want to build?
          </h1>
        </ScrollReveal>
        
        <ScrollReveal delay={0.1}>
          <p className="text-body-lg text-grey-dark mb-12 max-w-lg mx-auto">
            We'd love to hear about it. Start with a free consultation on your idea, application or <span className="text-blue-brand">agentic integration</span>. We respond to every message personally (from a human), usually within a day.
          </p>
        </ScrollReveal>
        
        <ScrollReveal delay={0.2}>
          <a
            href={`mailto:${siteContent.contact.email}`}
            className="inline-block font-display text-h3 text-black hover:opacity-70 transition-opacity duration-200 border-b-2 border-black pb-2"
          >
            {siteContent.contact.email}
          </a>
        </ScrollReveal>
      </div>
    </main>
  );
}
