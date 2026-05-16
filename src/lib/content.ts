// All site copy as structured data - single source of truth for content

export const siteContent = {
  meta: {
    title: 'Autonomous Projects - From Idea to Agentic Application',
    description: 'We turn ideas into intelligent software - applications that reason, decide, and take action on behalf of users.',
  },

  home: {
    headline: 'From idea to agentic application.',
    tagline: 'Autonomous Projects helps you build intelligent software - applications that can reason, decide, and take action. We handle everything from product definition to launch.',
    intro: "Agentic software is the next phase of ingenuity. It's software that understands context, makes decisions, and does work on behalf of users. Whether you have a clear vision or a rough idea, we turn concepts into working applications.",
    ctaPrimary: { label: 'Start a conversation →', href: '/contact/' },
    ctaSecondary: { label: 'How we work →', href: '/services/' },
  },

  about: {
    origin: "Autonomous Projects is built on a simple belief: the software that will define the next phase of ingenuity will be agentic. Applications that don't just respond to commands, but understand goals, reason through problems, and take action. We build that software using OpenClaw, our AI agent platform, and coordinate agent swarms for both development and as core product features. The result is software that ships fast and thinks deeply. We're building toward a future where every business has access to intelligent software that works alongside their team.",
    philosophy: [
      'Intelligence is infrastructure - the next wave of applications will be built on reasoning, not just rules',
      'Software that coordinates multiple AI agents to solve complex problems - unlocking product possibilities that were not feasible before',
      'The best intelligent software feels simple - complexity hidden behind thoughtful interfaces',
      'Ship, learn, iterate - intelligence improves with feedback',
    ],
    team: [
      { name: 'Albion', role: 'CTO', bio: 'Technical architecture, infrastructure, and swarm coordination.' },
      { name: 'Urizen', role: 'Product & Strategy', bio: 'Scopes projects, defines requirements, ensures the build serves the business goal.' },
      { name: 'Enitharmon', role: 'Design', bio: 'Visual systems, component libraries, and interface design.' },
      { name: 'Orc', role: 'Builder', bio: 'Full-stack implementation. Ships working software.' },
      { name: 'Urthona', role: 'Infrastructure', bio: 'Deployment, DevOps, and production systems.' },
      { name: 'Vala', role: 'Copy & Content', bio: 'Voice, tone, and written clarity.' },
    ],
  },

  services: {
    positioning: "We take you from idea to intelligent application. Whether you're exploring what's possible or ready to build, we provide product strategy, technical execution, and a clear path forward.",
    phases: [
      { phase: 'Discovery & Ideation', description: 'Free consultation. We talk through your idea, explore what intelligent features make sense, and map out a product vision. No commitment - just clarity.' },
      { phase: 'Product Definition', description: 'What are we building, and what does success look like? We define scope, features, user flows, and technical approach.' },
      { phase: 'Rapid MVP', description: 'We build a working prototype with core intelligent features. Real software you can test with users and iterate on.' },
      { phase: 'Testing & Refinement', description: 'User feedback, edge case handling, performance tuning. We refine the intelligence and the interface based on real use.' },
      { phase: 'Expansion Path', description: 'Product roadmap for next features, scaling strategy, handoff, and ongoing development options. You decide what is next.' },
    ],
    capabilitiesTitle: 'What We Build',
    capabilities: [
      'Applications that make decisions',
      'Software that coordinates multiple agents with human feedback',
      'Agentic integrations into existing products',
      'Prototypes that explore technical feasibility',
      'Minimum viable user facing products with care and refinement',
    ],
  },

  contact: {
    intro: "Exploring agentic applications? Have an idea you want to build?",
    cta: "We'd love to hear about it. Start with a free consultation - no commitment, just a conversation about what's possible. We respond to every message personally, usually within a day.",
    email: 'hi@autonomousprojects.com',
  },
};
