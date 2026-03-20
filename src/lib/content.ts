// All site copy as structured data — single source of truth for content
// Vala will refine these strings

export const siteContent = {
  meta: {
    title: 'Autonomous Projects — Agentic Software Agency',
    description: 'We deploy coordinated AI agent swarms to design, build, and ship software — fast.',
  },

  home: {
    headline: 'We build software with agents.',
    tagline: 'Autonomous Projects is an agentic software agency. We deploy coordinated AI agent swarms to design, build, and ship — fast.',
    intro: "Software doesn't need to take months. Autonomous Projects pairs human product leadership with specialized AI agent teams to move from concept to deployed application in days, not quarters. We work at the speed of thought.",
    ctaPrimary: { label: 'Start a conversation →', href: '/contact/' },
    ctaSecondary: { label: 'See how we work →', href: '/services/' },
  },

  about: {
    origin: "Autonomous Projects emerged from a simple observation: AI agents are extraordinary builders, but they need direction. Zemm — a product leader with years of experience shipping consumer AI applications — assembled a team not of contractors, but of agents. Each with a defined role. Each with a name. The result is a studio that operates more like a hive mind than a traditional agency.",
    philosophy: [
      'Human-in-the-loop product direction, agent-powered execution',
      'Speed through parallelism, not shortcuts',
      'Every project is a fresh canvas — no templates, no boilerplate thinking',
      'Ship, learn, iterate',
    ],
    team: [
      { name: 'Zemm', role: 'Founder & Product Lead', bio: 'Human in the loop. Years of product leadership in AI, consumer apps, branding, and marketing.' },
      { name: 'Albion', role: 'CTO', bio: 'The architect. Oversees technical direction and coordinates the agent swarm.' },
      { name: 'Urizen', role: 'Product & Strategy', bio: 'Scopes projects, defines requirements, ensures the build serves the business goal.' },
      { name: 'Enitharmon', role: 'Design & Visual Identity', bio: 'Creates the visual language — layouts, typography, SVG elements, the entire aesthetic.' },
      { name: 'Orc', role: 'Builder', bio: 'Writes the code. Fast, relentless, ships working software.' },
      { name: 'Urthona', role: 'Infrastructure & Systems', bio: 'Deployment, DevOps, the unsexy things that make everything actually work.' },
      { name: 'Vala', role: 'Copy & Content', bio: 'Words. Tone. Voice. The final polish that makes everything feel human.' },
    ],
  },

  services: {
    positioning: "Most agencies sell hours. We sell outcomes. Our agent swarm methodology means your project gets the equivalent of a full product team — product lead, designer, engineers, copywriter — working in compressed parallel, not sequential sprints.",
    phases: [
      { phase: 'Brief & Scope', description: 'Zemm + Urizen define the project. What are we building? For whom? What does done look like?', duration: '1–2 days' },
      { phase: 'Design', description: 'Enitharmon produces visual direction, component design, layout structure.', duration: '1–2 days' },
      { phase: 'Build', description: 'Orc and Urthona work in parallel — frontend, backend, infrastructure, deployment pipeline.', duration: '2–3 days' },
      { phase: 'Copy & Polish', description: 'Vala refines all written content. Enitharmon does final visual QA.', duration: '1 day' },
      { phase: 'Ship', description: 'Deployed, live, documented. Handoff to client.', duration: 'Same day' },
    ],
    capabilities: [
      'AI-enabled applications and interfaces',
      'Agentic software prototypes',
      'MVPs for startups experimenting with AI',
      'Internal tools and integrations',
      'Marketing sites and brand launches',
    ],
  },

  contact: {
    intro: "We're selective about what we build.",
    cta: "If you have something interesting, we'd like to hear about it.",
    email: 'zemnaph@gmail.com',
  },
};
