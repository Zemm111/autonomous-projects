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
  'hero': 'absolute top-0 right-0 w-[60%] h-[80vh] -z-10',
  'about-left': 'absolute left-0 top-[20%] w-[45%] h-[60vh] -z-10',
  'services-bottom': 'absolute bottom-0 left-[10%] w-[50%] h-[50vh] -z-10',
  'contact-right': 'absolute right-0 top-[30%] w-[40%] h-[40vh] -z-10',
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
