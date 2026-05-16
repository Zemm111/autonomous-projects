// All site copy as structured data — single source of truth for content

export const siteContent = {
  meta: {
    title: 'Autonomous Projects — Agentic Software',
    description: 'We build software with intelligence baked in. Product, design, and technical execution for AI-native applications.',
  },

  home: {
    headline: 'We build agentic software.',
    tagline: 'Autonomous Projects builds AI-native applications. Product strategy, design, and full-stack execution for software with intelligence at its core.',
    intro: "We build applications with intelligence as a core feature — software that reasons, adapts, and does work on behalf of users. Product definition, design systems, and full-stack implementation, handled end to end.",
    ctaPrimary: { label: 'Start a conversation →', href: '/contact/' },
    ctaSecondary: { label: 'How we work →', href: '/services/' },
  },

  about: {
    origin: "Autonomous Projects is a software studio building AI-native applications. The practice runs lean, moves fast, and ships software that feels considered.",
    philosophy: [
      'Product strategy comes first — technology serves the goal',
      'Intelligence deserves good interfaces',
      'Speed through clarity, not corner-cutting',
      'Ship, learn, iterate',
    ],
  },

  services: {
    positioning: "We don't sell seats or sprints. You get product strategy, design systems, and technical implementation as a unified offering. Human product leadership, AI-assisted development. Faster cycles, no sacrifice on craft.",
    phases: [
      { phase: 'Product Definition', description: 'What are we building? For whom? What does success look like? Scope, requirements, acceptance criteria.', duration: '1–2 days' },
      { phase: 'Design System', description: 'Visual direction, component library, interaction patterns. UI for software that does things autonomously.', duration: '1–2 days' },
      { phase: 'Implementation', description: 'Full-stack build: frontend, backend, AI integrations, infrastructure. Tight iteration loops.', duration: '3–5 days' },
      { phase: 'Polish & Ship', description: 'Copy refinement, edge case handling, deployment, documentation.', duration: '1–2 days' },
      { phase: 'Handoff', description: 'Live, deployed, documented. You own it.', duration: 'Same day' },
    ],
    capabilities: [
      'AI-native applications (reasoning, decision-making, agent-to-agent communication)',
      'Prototypes that demonstrate what is technically possible',
      'Production MVPs for early-stage companies',
      'Internal tools with agentic features',
      'Marketing sites and brand systems',
    ],
  },

  contact: {
    intro: "We're selective about projects.",
    cta: "If you're building something interesting in the agentic software space, let's talk.",
    email: 'hi@autonomousprojects.com',
  },
};
