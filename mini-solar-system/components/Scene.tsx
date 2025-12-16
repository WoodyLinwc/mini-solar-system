import React from 'react';
import { Sun } from './Sun';
import { Planet } from './Planet';
import { UFO } from './UFO';
import { ShootingStars } from './ShootingStars';
import { PLANETS } from '../constants';
import { PlanetData } from '../types';

interface SceneProps {
  onPlanetSelect: (planet: PlanetData) => void;
}

export const Scene: React.FC<SceneProps> = ({ onPlanetSelect }) => {
  return (
    <group>
      {/* Environment Effects */}
      <ShootingStars />
      <UFO />
      
      {/* Solar System */}
      <Sun onSelect={onPlanetSelect} />
      {PLANETS.map((planet) => (
        <Planet 
          key={planet.name} 
          data={planet} 
          onSelect={onPlanetSelect} 
        />
      ))}
    </group>
  );
};