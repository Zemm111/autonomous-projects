interface MethodPhaseProps {
  number: string;
  title: string;
  duration?: string;
  description: string;
}

export default function MethodPhase({ number, title, duration, description }: MethodPhaseProps) {
  return (
    <article 
      className="border-t border-black pt-8 pb-12"
      aria-label={`Phase ${number}: ${title}`}
    >
      <div className="mb-4">
        <span className="font-display text-h2 text-grey-mid block mb-2">{number}</span>
        <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2">
          <h3 className="font-display text-h3 uppercase">{title}</h3>
          {duration && <span className="text-caption uppercase text-grey-mid">{duration}</span>}
        </div>
      </div>
      <p className="text-body text-grey-dark max-w-2xl">{description}</p>
    </article>
  );
}
