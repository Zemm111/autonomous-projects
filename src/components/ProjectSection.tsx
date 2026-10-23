interface ProjectSectionProps {
  title: string;
  content: string | React.ReactNode;
  variant?: 'default' | 'highlighted';
}

export default function ProjectSection({ title, content, variant = 'default' }: ProjectSectionProps) {
  const bgClass = variant === 'highlighted' ? 'bg-grey-wash' : 'bg-white';
  
  return (
    <div className={`py-12 ${bgClass}`}>
      <div className="max-w-content mx-auto">
        <h3 className="font-display text-h3 uppercase tracking-tight mb-6 text-grey-mid">
          {title}
        </h3>
        {typeof content === 'string' ? (
          <div className="text-body text-grey-dark leading-relaxed whitespace-pre-line">
            {content}
          </div>
        ) : (
          content
        )}
      </div>
    </div>
  );
}
