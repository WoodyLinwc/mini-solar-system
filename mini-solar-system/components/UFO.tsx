import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group, DoubleSide } from 'three';
import { Html } from '@react-three/drei';

const MESSAGES = ["HELP!!", "SAVE ME!!", "🆘","救命啊！","快来人呐！","MY NAME IS WOODY LIN!"];

export const UFO: React.FC = () => {
  const groupRef = useRef<Group>(null);
  const [message, setMessage] = useState<string | null>(null);
  
  // Logic refs for message timing
  const nextToggleTime = useRef(6); // Start showing messages after entrance (approx 6s)
  const isVisible = useRef(false);
  
  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    
    // --- Movement Logic ---
    // Define the standard flight path (Lissajous curve)
    const orbitX = Math.sin(t * 0.3) * 120 + Math.cos(t * 0.1) * 30;
    const orbitZ = Math.cos(t * 0.25) * 120;
    const orbitY = Math.sin(t * 0.5) * 30 + 15; // Hovering between 0 and 45 typically

    // Entrance Animation Logic
    const entranceDuration = 6.0; // Seconds to fully enter orbit
    const progress = Math.min(t / entranceDuration, 1.0);
    const ease = 1 - Math.pow(1 - progress, 3);
    
    const startHeightOffset = 60; // Start 60 units higher than the target path

    const x = orbitX * ease;
    const z = orbitZ * ease;
    const y = orbitY + (startHeightOffset * (1 - ease));
    
    groupRef.current.position.set(x, y, z);
    
    // Spin the UFO
    groupRef.current.rotation.y += 0.1;
    
    // Banking effects
    groupRef.current.rotation.z = Math.sin(t) * 0.15 * ease;
    groupRef.current.rotation.x = Math.cos(t) * 0.15 * ease;

    // --- Message Logic ---
    if (t > nextToggleTime.current) {
      if (isVisible.current) {
        // Hide message
        setMessage(null);
        isVisible.current = false;
        // Stay hidden for 4-8 seconds
        nextToggleTime.current = t + 4 + Math.random() * 4;
      } else {
        // Show new message
        const text = MESSAGES[Math.floor(Math.random() * MESSAGES.length)];
        setMessage(text);
        isVisible.current = true;
        // Keep visible for 2-4 seconds
        nextToggleTime.current = t + 2 + Math.random() * 2;
      }
    }
  });

  return (
    <group ref={groupRef}>
        {/* Tractor Beam */}
        <mesh position={[0, -9, 0]}>
             <cylinderGeometry args={[0.5, 4, 16, 32, 1, true]} /> 
            <meshBasicMaterial 
                color="#39FF14" 
                transparent 
                opacity={0.15} 
                side={DoubleSide} 
                depthWrite={false}
            />
        </mesh>

        {/* Main Saucer Body */}
        <mesh scale={[1, 0.25, 1]}>
            <sphereGeometry args={[4, 32, 16]} />
            <meshStandardMaterial color="#888888" metalness={0.9} roughness={0.2} />
        </mesh>
        
        {/* Cockpit Dome */}
        <mesh position={[0, 0.5, 0]}>
            <sphereGeometry args={[1.5, 32, 16, 0, Math.PI * 2, 0, Math.PI/2]} />
            <meshStandardMaterial 
              color="#00FFFF" 
              transparent 
              opacity={0.6} 
              metalness={0.5} 
              roughness={0.1} 
              emissive="#00FFFF"
              emissiveIntensity={0.5}
            />
        </mesh>
        
        {/* Rotating Lights Ring */}
        <group>
            {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
                <mesh key={i} position={[Math.cos(i * Math.PI / 4) * 3.8, 0, Math.sin(i * Math.PI / 4) * 3.8]}>
                    <sphereGeometry args={[0.2]} />
                    <meshStandardMaterial color="#39FF14" emissive="#39FF14" emissiveIntensity={3} toneMapped={false} />
                </mesh>
            ))}
        </group>
        
        {/* Engine Glow underneath */}
        <pointLight position={[0, -1, 0]} color="#39FF14" intensity={5} distance={15} decay={2} />

        {/* Text Bubble - SUPER SIZED */}
        {message && (
          <Html position={[0, 12, 0]} center distanceFactor={40} style={{ pointerEvents: 'none' }}>
            <div className="relative">
              {/* Extremely large text and padding */}
              <div className="bg-white text-black px-16 py-10 rounded-[5rem] font-black text-9xl whitespace-nowrap border-[16px] border-black shadow-[0_0_80px_rgba(255,255,255,0.8)] animate-bounce tracking-tighter">
                {message}
              </div>
              {/* Massive Speech bubble triangle pointer */}
              <div className="absolute left-1/2 -translate-x-1/2 -bottom-16 w-0 h-0 border-l-[60px] border-l-transparent border-r-[60px] border-r-transparent border-t-[60px] border-t-black"></div>
              <div className="absolute left-1/2 -translate-x-1/2 -bottom-[40px] w-0 h-0 border-l-[40px] border-l-transparent border-r-[40px] border-r-transparent border-t-[40px] border-t-white"></div>
            </div>
          </Html>
        )}
    </group>
  );
};