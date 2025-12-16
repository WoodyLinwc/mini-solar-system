import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh, Group, Color } from 'three';
import { PlanetData } from '../types';
import { OrbitPath } from './OrbitPath';
import { Html } from '@react-three/drei';

interface PlanetProps {
  data: PlanetData;
  onSelect: (planet: PlanetData) => void;
}

export const Planet: React.FC<PlanetProps> = ({ data, onSelect }) => {
  const meshRef = useRef<Mesh>(null);
  const groupRef = useRef<Group>(null);
  const moonGroupRef = useRef<Group>(null);
  const [hovered, setHovered] = useState(false);

  // Random starting angle so planets aren't aligned
  const initialAngle = useRef(Math.random() * Math.PI * 2).current;

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime() * 0.5 * data.speed + initialAngle;
    const x = Math.cos(t) * data.distance;
    const z = Math.sin(t) * data.distance;
    
    if (groupRef.current) {
      groupRef.current.position.set(x, 0, z);
    }

    if (meshRef.current) {
      // Self rotation
      meshRef.current.rotation.y += 0.01 / data.speed; // Faster planets rotate faster (arbitrary visualization rule)
    }

    // Moon Orbit Logic (Earth only)
    if (data.name === 'Earth' && moonGroupRef.current) {
      moonGroupRef.current.rotation.y += delta * 1.5; // Moon orbits faster
    }
  });

  // Calculate label offset based on radius to ensure it clears the planet mesh
  // Increased offset for larger text
  const labelOffset = data.radius + 3.5;

  return (
    <>
      <OrbitPath radius={data.distance} />
      <group ref={groupRef}>
        <mesh
          ref={meshRef}
          onClick={(e) => {
            e.stopPropagation();
            onSelect(data);
          }}
          onPointerOver={() => {
            document.body.style.cursor = 'pointer';
            setHovered(true);
          }}
          onPointerOut={() => {
            document.body.style.cursor = 'auto';
            setHovered(false);
          }}
        >
          <sphereGeometry args={[data.radius, 32, 32]} />
          <meshStandardMaterial 
            color={hovered ? new Color(data.color).offsetHSL(0, 0, 0.2) : data.color} 
            roughness={0.7}
          />
          <Html position={[0, labelOffset, 0]} center distanceFactor={12} style={{ pointerEvents: 'none' }}>
            <div className={`
              px-6 py-3 rounded-2xl border-4 border-white/40 whitespace-nowrap select-none transition-all duration-300 shadow-[0_0_30px_rgba(0,0,0,0.8)]
              ${hovered ? 'bg-white text-black scale-110 z-50' : 'bg-black/80 text-white backdrop-blur-md'}
            `}>
              <span className="text-6xl font-black tracking-widest block font-sans drop-shadow-lg">{data.name}</span>
            </div>
          </Html>
        </mesh>

        {/* Moon for Earth */}
        {data.name === 'Earth' && (
          <group ref={moonGroupRef}>
            <mesh position={[data.radius + 2.5, 0, 0]}>
              <sphereGeometry args={[data.radius * 0.27, 16, 16]} />
              <meshStandardMaterial color="#888888" roughness={0.8} />
              <Html position={[0, data.radius * 0.27 + 1.2, 0]} center distanceFactor={12} style={{ pointerEvents: 'none' }}>
                <div className="px-3 py-1 rounded-lg bg-black/60 border border-white/30 backdrop-blur-sm">
                  <span className="text-lg font-bold text-gray-200 whitespace-nowrap">Moon</span>
                </div>
              </Html>
            </mesh>
          </group>
        )}
        
        {/* Saturn's Ring visualization */}
        {data.hasRing && (
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[data.radius * 1.4, data.radius * 2.2, 32]} />
            <meshStandardMaterial 
              color={data.color} 
              opacity={0.6} 
              transparent 
              side={2} // DoubleSide 
            />
          </mesh>
        )}
      </group>
    </>
  );
};