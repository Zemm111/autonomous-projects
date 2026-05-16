'use client';

import { useState } from 'react';
import MoireCircles from '@/components/shaders/test/MoireCircles';
import MoireLines from '@/components/shaders/test/MoireLines';
import OrganicNoise from '@/components/shaders/test/OrganicNoise';
import DitheredGradient from '@/components/shaders/test/DitheredGradient';
import FlowTrails from '@/components/shaders/test/FlowTrails';

const shaders = [
  { 
    id: 'moire-circles',
    name: 'Moiré Circles',
    description: 'Overlapping concentric circles, rotates with mouse',
    component: MoireCircles,
  },
  { 
    id: 'moire-lines',
    name: 'Moiré Lines',
    description: 'Interference pattern, subtle mouse tilt',
    component: MoireLines,
  },
  { 
    id: 'organic-noise',
    name: 'Organic Noise',
    description: 'Perlin noise waves, animates slowly',
    component: OrganicNoise,
  },
  { 
    id: 'dithered-gradient',
    name: 'Dithered Gradient',
    description: 'Halftone dots, mouse shifts angle',
    component: DitheredGradient,
  },
  { 
    id: 'flow-trails',
    name: 'Flow Trails',
    description: 'Sparse particle trails, slow organic movement',
    component: FlowTrails,
  },
];

export default function ShaderTest() {
  const [selectedShader, setSelectedShader] = useState<string | null>(null);

  const SelectedComponent = selectedShader 
    ? shaders.find(s => s.id === selectedShader)?.component 
    : null;

  return (
    <main className="min-h-screen bg-white p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="font-display text-4xl mb-4">Shader Test Gallery</h1>
        <p className="text-gray-600 mb-8">
          Click any shader to view fullscreen. All use transparent backgrounds, gray tones, organic boundaries, and react to mouse/animate.
        </p>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {shaders.map((shader) => (
            <div 
              key={shader.id}
              className="border border-gray-200 rounded-lg overflow-hidden cursor-pointer hover:border-gray-400 transition-colors"
              onClick={() => setSelectedShader(shader.id)}
            >
              <div className="relative h-64 bg-white">
                <shader.component />
              </div>
              <div className="p-4 bg-gray-50">
                <h3 className="font-display text-lg mb-1">{shader.name}</h3>
                <p className="text-sm text-gray-600">{shader.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Fullscreen Viewer */}
        {selectedShader && SelectedComponent && (
          <div 
            className="fixed inset-0 bg-white z-50 flex items-center justify-center cursor-pointer"
            onClick={() => setSelectedShader(null)}
          >
            <div className="absolute top-4 right-4 bg-black text-white px-4 py-2 rounded text-sm">
              Click anywhere to close
            </div>
            <div className="w-full h-full">
              <SelectedComponent />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
