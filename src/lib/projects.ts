// Projects portfolio content - case studies of agentic applications

export const projectsContent = {
  meta: {
    title: 'Projects - Agentic Applications in Production | Aegean Applications',
    description: 'Case studies of intelligent software: multi-agent systems, knowledge graphs, and AI-powered automation in production.',
  },
  
  intro: {
    headline: 'Selected Work',
    tagline: 'Agentic applications in production - real projects using multi-agent orchestration, AI reasoning, and intelligent automation.',
  },
  
  projects: [
    {
      id: 'participation-intelligence',
      title: 'Participation Intelligence',
      partner: 'The Many',
      tagline: 'AI-powered community engagement analysis at scale',
      synopsis: `A collaboration with The Many, a brand strategy and research firm. The challenge: understanding digital community engagement patterns across thousands of participants. Traditional analytics couldn't capture behavioral depth or identify emergent cohorts. Participation Intelligence uses a 7-stage AI pipeline to score participants across behavioral signals, automatically discover cohorts, and synthesize weekly identity profiles. The result is a B2B SaaS platform that turns raw YouTube comment data into actionable community intelligence.`,
      
      agentArchitecture: `The system orchestrates multiple specialist agents working in a daily pipeline. Each agent focuses on a specific behavioral signal:

**Signal Agents:**
- **S3 (Ritual Language):** Pattern-matching agent detects lexicon use and cultural markers
- **S4 (Meaning Making):** LLM-powered depth analysis evaluates comment substance and contribution quality
- **S5 (Authenticity):** Spam and bot detection agent filters synthetic engagement
- **S6 (Social Gravity):** Connection analysis measures influence and network position
- **S7 (Participation Velocity):** Momentum tracking identifies rising contributors

**Weekly Synthesis:**
A separate identity agent generates natural language profiles for high-value participants, summarizing their engagement patterns and community role.

**Coordination:**
All agents write to a central PostgreSQL database. A VPS-based cron orchestrator manages timing, retries, and token budgeting. The frontend never touches the YouTube API - it only reads scored data.`,
      
      infrastructure: [
        { category: 'Frontend', technologies: ['Next.js 16', 'React 19', 'Vercel deployment', 'Responsive UI'] },
        { category: 'Database', technologies: ['Neon PostgreSQL', 'Serverless auto-scaling', 'Direct Vercel connections'] },
        { category: 'Orchestration', technologies: ['Ubuntu VPS', 'Systemd cron jobs', '7-stage daily pipeline', 'Health monitoring'] },
        { category: 'AI & APIs', technologies: ['OpenAI GPT-4 (identity)', 'OpenAI GPT-3.5 (scoring)', 'YouTube Data API v3'] },
        { category: 'Features', technologies: ['35 pre-built Playgrounds', 'Multi-brand support', 'Token usage tracking', 'Weekly automation'] },
      ],
      
      screenshots: [
        { 
          src: '/screenshots/participation-intelligence/hero.png',
          alt: 'Participation Intelligence dashboard showing participant grid with engagement scores',
          caption: 'Main dashboard with multi-signal scoring',
          featured: true 
        },
        { 
          src: '/screenshots/participation-intelligence/playground.png',
          alt: 'Playground detail view showing cohort analysis',
          caption: 'Pre-built cohort ("Playground") with score breakdown' 
        },
        { 
          src: '/screenshots/participation-intelligence/identity.png',
          alt: 'AI-generated participant identity profile',
          caption: 'Weekly identity synthesis for high-value participants' 
        },
        { 
          src: '/screenshots/participation-intelligence/data-viz.png',
          alt: 'Score distribution charts and analytics',
          caption: 'Behavioral signal visualization' 
        },
      ],
      
      tags: ['Data Pipeline', 'Multi-Agent Scoring', 'B2B SaaS', 'Community Analytics'],
    },
    
    {
      id: 'truenumbers-ai',
      title: 'TrueNumbersAI',
      partner: 'TrueNumbers',
      tagline: 'Natural language to knowledge graphs with human-in-the-loop',
      synopsis: `A collaboration with TrueNumbers, a knowledge graph company. The problem: engineers describe products in natural language, but systems need structured data. Existing tools require manual schema design or produce inconsistent results. TrueNumbersAI uses a 3-pass LLM pipeline to extract hierarchical product data from conversational input, with human-in-the-loop review at every step. The result is a Product Mode interface where "the bicycle handlebar is 42cm wide" becomes a validated knowledge graph entry, ready for CAD integration, BOM generation, or engineering queries.`,
      
      agentArchitecture: `Three specialized extraction agents work hierarchically, building context as they go:

**Pass 1 - Context Agents:**
Analyze full text to detect assemblies and build hierarchical structure. Create a NumberSpace snapshot for subsequent passes.

**Pass 2 - Component Agents:**
Extract components assembly-by-assembly, using Pass 1 context to avoid duplication and maintain naming consistency. Each component gets typed, tagged, and positioned in the hierarchy.

**Pass 3 - Connection Agents:**
Detect physical connectors (bolts, cables) and manufacturing processes (welds, threads). Use exact hierarchical names from Pass 2 to prevent duplicate subject creation.

**Human-in-the-Loop:**
After each extraction, agents present facts for human review. Users approve, edit, or reject before saving. Agents learn from corrections through citation tracking.

**Progressive Refinement:**
The same bicycle can be described multiple times, adding detail incrementally. Agents check for existing subjects and extend them rather than duplicating.`,
      
      infrastructure: [
        { category: 'Frontend', technologies: ['Next.js 16', 'React 19', 'Vercel deployment', 'Real-time chat UI'] },
        { category: 'Backend', technologies: ['TrueNumbers REST API', 'Custom knowledge graph DB', 'RDF-style triple store'] },
        { category: 'AI Models', technologies: ['Anthropic Claude (Opus, Sonnet, Haiku)', 'OpenAI GPT-4', 'Ollama local models', 'Multi-model routing'] },
        { category: 'State & Storage', technologies: ['TrueStatement format', 'localStorage prompt overrides', 'Citation tracking', 'Conversation context'] },
        { category: 'Visualization', technologies: ['D3.js tree rendering', 'Interactive graph navigation', 'Property badges', 'Connection edges'] },
        { category: 'Features', technologies: ['Bulk text extraction', 'Multi-pass validation', 'Domain knowledge injection', 'SysML export'] },
      ],
      
      screenshots: [
        { 
          src: '/screenshots/truenumbers-ai/hero.png',
          alt: 'TrueNumbersAI chat interface with extraction in progress',
          caption: 'Natural language extraction with live agent feedback',
          featured: true 
        },
        { 
          src: '/screenshots/truenumbers-ai/review.png',
          alt: 'Human-in-the-loop review workflow showing fact approval',
          caption: 'Review and approve extracted facts before saving' 
        },
        { 
          src: '/screenshots/truenumbers-ai/tree-viz.png',
          alt: 'Interactive knowledge graph visualization of bicycle assembly',
          caption: 'Hierarchical tree view with property and connection badges' 
        },
        { 
          src: '/screenshots/truenumbers-ai/connections.png',
          alt: 'Connection detail modal showing bolt relationships',
          caption: 'First-class connection subjects with participant tracking' 
        },
        { 
          src: '/screenshots/truenumbers-ai/bulk.png',
          alt: 'Bulk text extraction with multi-pass progress indicators',
          caption: '3-pass pipeline with granular progress tracking' 
        },
        { 
          src: '/screenshots/truenumbers-ai/intelligence.png',
          alt: 'Intelligence tab showing domain knowledge and prompt customization',
          caption: 'Customizable extraction prompts and domain knowledge injection' 
        },
      ],
      
      tags: ['Knowledge Graphs', 'LLM Pipeline', 'Engineering Tools', 'Human-in-the-Loop'],
    },
  ],
  
  cta: {
    headline: 'Want to build something like this?',
    body: 'We help turn ideas into intelligent applications. Start with a free consultation.',
    buttonText: 'Start a conversation →',
    buttonHref: '/contact/',
  },
};
