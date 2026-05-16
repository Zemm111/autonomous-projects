'use client';

import ShaderZone, { ShaderType } from './ShaderZone';

interface ShaderZoneConfig {
  id: string;
  type: ShaderType;
  position: 'hero' | 'about-left' | 'services-bottom' | 'contact-right';
  intensity?: number;
}

interface ShaderBackgroundProps {
  zones: ShaderZoneConfig[];
}

const zoneStyles: Record<string, string> = {
  'hero': 'absolute top-[-10%] right-[-10%] w-[75%] h-[110vh] -z-10',
  'about-left': 'absolute left-[-15%] top-[10%] w-[65%] h-[80vh] -z-10',
  'services-bottom': 'absolute bottom-[-20%] left-0 w-[70%] h-[70vh] -z-10',
  'contact-right': 'absolute right-[-20%] top-[20%] w-[60%] h-[60vh] -z-10',
};

export default function ShaderBackground({ zones }: ShaderBackgroundProps) {
  return (
    <>
      {zones.map((zone) => (
        <ShaderZone
          key={zone.id}
          type={zone.type}
          intensity={zone.intensity}
          className={zoneStyles[zone.position]}
        />
      ))}
    </>
  );
}
