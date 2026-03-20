export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-content">
        <h1 className="font-display text-display mb-8">
          We build software with agents.
        </h1>
        <p className="text-body-lg text-grey-dark mb-12">
          Autonomous Projects is an agentic software agency. We deploy coordinated AI agent swarms to design, build, and ship — fast.
        </p>
        <a href="/contact/" className="text-body font-medium border-b border-black pb-1 hover:bg-black hover:text-white transition-colors duration-200 px-1">
          Start a conversation →
        </a>
      </div>
    </main>
  );
}
