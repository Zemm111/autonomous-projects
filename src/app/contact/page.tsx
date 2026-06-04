import ScrollReveal from '@/components/ScrollReveal';
import ContactForm from '@/components/ContactForm';

export default function Contact() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6 md:px-12 lg:px-16">
      <div className="w-full max-w-content mx-auto py-32">
        <ScrollReveal>
          <h1 className="font-display text-h1 mb-12 text-center">
            Exploring <span className="text-blue-brand">agentic applications</span>? Have an idea you want to build?
          </h1>
        </ScrollReveal>
        
        <ScrollReveal delay={0.1}>
          <p className="text-body-lg text-grey-dark mb-16 max-w-lg mx-auto text-center">
            We'd love to hear about it. Start with a free consultation on your <span className="text-blue-brand">idea, application or agentic integration</span>. We respond to every message personally (from a human), usually within a day.
          </p>
        </ScrollReveal>
        
        <ContactForm />
      </div>
    </main>
  );
}
