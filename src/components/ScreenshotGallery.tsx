import Image from 'next/image';

interface Screenshot {
  src: string;
  alt: string;
  caption?: string;
  featured?: boolean;
}

interface ScreenshotGalleryProps {
  screenshots: Screenshot[];
  layout?: 'hero-grid' | 'grid';
}

export default function ScreenshotGallery({ screenshots, layout = 'hero-grid' }: ScreenshotGalleryProps) {
  const heroShot = screenshots.find(s => s.featured) || screenshots[0];
  const otherShots = screenshots.filter(s => s !== heroShot);
  
  if (layout === 'grid') {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {screenshots.map((shot, i) => (
          <ScreenshotCard key={i} screenshot={shot} />
        ))}
      </div>
    );
  }
  
  // hero-grid layout: featured shot on top, others below
  return (
    <div className="space-y-6">
      {/* Hero screenshot */}
      <ScreenshotCard screenshot={heroShot} size="large" />
      
      {/* Secondary screenshots */}
      {otherShots.length > 0 && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {otherShots.map((shot, i) => (
            <ScreenshotCard key={i} screenshot={shot} />
          ))}
        </div>
      )}
    </div>
  );
}

function ScreenshotCard({ screenshot, size = 'default' }: { screenshot: Screenshot; size?: 'default' | 'large' }) {
  const aspectRatio = size === 'large' ? 'aspect-video' : 'aspect-[4/3]';
  
  return (
    <figure className="group">
      <div className={`${aspectRatio} relative bg-grey-wash rounded-sm overflow-hidden shadow-lg transition-shadow hover:shadow-xl`}>
        {/* Placeholder - will be replaced with actual Image component when screenshots provided */}
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-grey-wash to-grey-light">
          <div className="text-center text-grey-mid space-y-2">
            <div className="text-4xl">📸</div>
            <div className="text-sm font-mono">{screenshot.alt}</div>
            <div className="text-xs opacity-60">Screenshot placeholder</div>
          </div>
        </div>
        {/* Uncomment when real screenshots are added:
        <Image
          src={screenshot.src}
          alt={screenshot.alt}
          fill
          className="object-cover object-top"
          sizes={size === 'large' ? '100vw' : '(max-width: 768px) 100vw, 33vw'}
        />
        */}
      </div>
      {screenshot.caption && (
        <figcaption className="mt-3 text-sm text-grey-mid text-center">
          {screenshot.caption}
        </figcaption>
      )}
    </figure>
  );
}
