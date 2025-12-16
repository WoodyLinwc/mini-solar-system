import React from 'react';
import { RingGeometry } from 'three';
import '../types';

interface OrbitPathProps {
  radius: number;
}

export const OrbitPath: React.FC<OrbitPathProps> = ({ radius }) => {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]}>
      <ringGeometry args={[radius - 0.1, radius + 0.1, 128]} />
      <meshBasicMaterial color="#ffffff" opacity={0.15} transparent side={2} />
    </mesh>
  );
};