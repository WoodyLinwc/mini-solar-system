import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh, Group, Vector3 } from 'three';

const Star = () => {
  const groupRef = useRef<Group>(null);
  const [active, setActive] = useState(false);
  
  // Ref to hold state variables without triggering re-renders
  const state = useRef({
    velocity: new Vector3(),
    speed: 0,
    // Short initial delay (2-8 seconds) for quicker first appearance
    delay: Math.random() * 6 + 2 
  });

  useFrame((rootState, delta) => {
    if (!groupRef.current) return;
    const s = state.current;

    if (active) {
      // Move star
      groupRef.current.position.addScaledVector(s.velocity, s.speed * delta);
      
      // Check if out of bounds (approx 600 units away from center)
      if (groupRef.current.position.length() > 600) {
        setActive(false);
        // Reset delay to occur frequently (3-12 seconds)
        s.delay = Math.random() * 9 + 3;
      }
    } else {
      // Countdown delay
      s.delay -= delta;
      if (s.delay <= 0) {
        // SPAWN
        setActive(true);
        
        // Spawn far away
        const spawnDistance = 450;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos((Math.random() * 2) - 1);
        
        const startX = spawnDistance * Math.sin(phi) * Math.cos(theta);
        const startY = spawnDistance * Math.sin(phi) * Math.sin(theta);
        const startZ = spawnDistance * Math.cos(phi);
        
        groupRef.current.position.set(startX, startY, startZ);

        // Target a random point near the center to ensure it crosses the view
        const target = new Vector3(
          (Math.random() - 0.5) * 200, 
          (Math.random() - 0.5) * 200, 
          (Math.random() - 0.5) * 200
        );
        
        s.velocity.subVectors(target, groupRef.current.position).normalize();
        
        // Faster speed for a "shooting" effect
        s.speed = 400 + Math.random() * 300; 
        
        // Point the group along the velocity vector
        const lookTarget = groupRef.current.position.clone().add(s.velocity);
        groupRef.current.lookAt(lookTarget);
      } else {
        // Hide while waiting
        groupRef.current.position.set(0, 10000, 0);
      }
    }
  });

  return (
    <group ref={groupRef}>
      {/* 
         Rotate geometry to align with Z-axis (forward). 
         Cylinder default is Y-aligned. 
         Rotate X 90deg -> Y becomes Z. 
         Top (Head) is Front (Z+). Bottom (Tail) is Back (Z-).
      */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        {/* Tapered tail: RadiusTop 0.2 (Head), RadiusBottom 0 (Tail), Length 80 */}
        <cylinderGeometry args={[0.2, 0, 80, 8]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.6} />
      </mesh>
      {/* Glowing head */}
      <mesh position={[0, 0, 40]}>
        <sphereGeometry args={[1.5, 8, 8]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
    </group>
  );
};

export const ShootingStars = () => {
  // Reduced number of active star instances to manage clutter, 
  // though they spawn infrequently so we can keep a few to allow potential overlap rarely.
  return (
    <group>
      <Star />
      <Star />
      <Star />
    </group>
  );
};