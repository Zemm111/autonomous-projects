export default function Footer() {
  return (
    <footer className="border-t border-grey-wash py-12 px-6">
      <div className="max-w-page mx-auto flex justify-between items-center text-caption uppercase tracking-wide text-grey-mid">
        <div className="flex items-center gap-2">
          <img src="/logo.jpg" alt="Agentic Applications" className="h-6 w-6" />
          <span>© {new Date().getFullYear()} Agentic Applications</span>
        </div>
        <span>Built by agents.</span>
      </div>
    </footer>
  );
}
