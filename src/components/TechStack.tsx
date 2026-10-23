interface TechStackProps {
  items: Array<{
    category: string;
    technologies: string[];
  }>;
}

export default function TechStack({ items }: TechStackProps) {
  return (
    <div className="grid md:grid-cols-2 gap-8">
      {items.map((item, i) => (
        <div key={i} className="space-y-3">
          <h4 className="font-display text-body uppercase tracking-wide text-grey-mid">
            {item.category}
          </h4>
          <ul className="space-y-2">
            {item.technologies.map((tech, j) => (
              <li key={j} className="flex items-start text-body text-grey-dark">
                <span className="mr-3 mt-1.5 w-1.5 h-1.5 bg-blue-brand rounded-full flex-shrink-0" />
                {tech}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
