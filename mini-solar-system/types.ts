import React from 'react';

export interface PlanetData {
  name: string;
  chineseName: string;
  color: string;
  radius: number; // Size relative to earth (stylized)
  distance: number; // Distance from sun
  speed: number; // Orbital speed multiplier
  description: string; // Brief static description
  descriptionZH: string; // Chinese static description
  imageUrl: string; // URL to real image
  hasRing?: boolean;
  textureMap?: string;
}

export interface PlanetInfoResponse {
  fact: string;
  details: string;
}

// Declaration to fix TypeScript errors where React Three Fiber elements are not recognized
// We augment both the global JSX and React.JSX to ensure compatibility across different TS/React configurations
declare global {
  namespace JSX {
    interface IntrinsicElements {
      ambientLight: any;
      pointLight: any;
      group: any;
      mesh: any;
      sphereGeometry: any;
      meshStandardMaterial: any;
      ringGeometry: any;
      meshBasicMaterial: any;
      color: any;
      primitive: any;
    }
  }
}

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      ambientLight: any;
      pointLight: any;
      group: any;
      mesh: any;
      sphereGeometry: any;
      meshStandardMaterial: any;
      ringGeometry: any;
      meshBasicMaterial: any;
      color: any;
      primitive: any;
    }
  }
}