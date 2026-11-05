// All site copy as structured data - single source of truth for content

export const siteContent = {
  meta: {
    title: 'Aegean Applications - Agentic Software & AI Applications',
    description: 'Boutique product shop building agentic software—applications that analyze, reason, and act. From idea to intelligent application.',
  },

  home: {
    headline: 'From idea to agentic application.',
    tagline: "Building intelligent software—applications that analyze data, surface insights, and take meaningful action. From concept to launch.",
    intro: "The most interesting software today doesn't just respond to clicks—it understands context, reasons through problems, and does real work. These are agentic applications: tools that think, analyze, and act on behalf of users.",
    ctaPrimary: { label: 'Start a conversation →', href: '/contact/' },
    ctaSecondary: { label: 'How we work →', href: '/services/' },
  },

  about: {
    origin: "A boutique product shop focused on agentic software. We use AI orchestration frameworks (like OpenClaw) to build applications that coordinate multiple reasoning agents behind clean, thoughtful interfaces. Our work spans analytics platforms, knowledge extraction tools, and custom integrations for clients who want software that does more than automate—it understands.",
    philosophy: [
      'Intelligence should feel simple—hide complexity behind thoughtful design',
      'Ship working software early, refine based on real use',
      'Build for the problem, not the technology',
    ],
    humanInTheLoop: {
      name: 'Max Razdow',
      role: 'Product Leadership',
      bio: 'Max oversees all projects and works directly with clients. With experience in fast-moving startups and product design, he ensures human creativity and judgment guide every build. The best agentic software is built through human-agent collaboration.',
    },
    architecture: {
      title: 'How We Build',
      description: "We use OpenClaw as the orchestration layer, with Albion serving as the technical lead (CTO). Each project gets a dedicated sub-agent with its own long-term memory, context, and decision history. This architecture allows us to manage multiple builds simultaneously while maintaining deep project-specific intelligence. It's a hybrid approach: human creativity and oversight, coordinated by AI agents that handle implementation, testing, and deployment.",
    },
  },

  services: {
    positioning: "Whether you have a clear vision or an early-stage idea, we help turn concepts into working software. Product strategy, technical execution, and a clear path forward—handled end-to-end.",
    phases: [
      { phase: 'Initial Conversation', description: 'We talk through your idea, explore what makes sense, map out a product vision. No commitment—just clarity.' },
      { phase: 'Scope & Vision', description: 'What are we building, and what does success look like? Define scope, features, user flows, and technical approach.' },
      { phase: 'First Build', description: 'Build a working prototype with core agentic features. Real software you can test with users and iterate on.' },
      { phase: 'Refinement', description: 'User feedback, edge case handling, performance tuning. Refine the intelligence and the interface based on real use.' },
      { phase: "What's Next", description: 'You decide: roadmap for next features, scaling strategy, handoff, or ongoing partnership.' },
    ],
    capabilitiesTitle: 'What We Build',
    capabilities: [
      'Applications that analyze data and surface insights',
      'Software that coordinates multiple AI agents with human feedback loops',
      'Agentic integrations into existing products',
      'Prototypes that explore technical feasibility',
      'Minimum viable products with care and refinement',
    ],
  },

  contact: {
    intro: "Have an idea for agentic software?",
    cta: "We respond to every message personally, usually within a day. Let's start with a conversation about your idea.",
    email: 'zemnaph@gmail.com',
  },
};
