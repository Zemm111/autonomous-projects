export default function Footer() {
  return (
    <footer className="border-t border-grey-wash py-12 px-6">
      <div className="max-w-page mx-auto flex justify-between items-center text-caption uppercase tracking-wide text-grey-mid">
        <span>© {new Date().getFullYear()} Autonomous Projects</span>
        <span>Built by agents.</span>
      </div>
    </footer>
  );
}
