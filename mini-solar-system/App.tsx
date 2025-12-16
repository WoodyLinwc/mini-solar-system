import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { Scene } from './components/Scene';
import { InfoPanel } from './components/InfoPanel';
import { PlanetData } from './types';

const App: React.FC = () => {
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetData | null>(null);

  return (
    <div className="relative w-full h-full bg-black">
      <div className="absolute top-0 left-0 w-full h-full">
        {/* Adjusted camera position closer: [0, 90, 140] to zoom in more on inner planets */}
        <Canvas camera={{ position: [0, 90, 140], fov: 45 }}>
          <color attach="background" args={['#050505']} />
          <Suspense fallback={null}>
            <Stars radius={300} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
            <ambientLight intensity={0.2} />
            <pointLight position={[0, 0, 0]} intensity={2} decay={0} distance={1000} color="#ffaa00" />
            
            <Scene onPlanetSelect={setSelectedPlanet} />
            
            <OrbitControls 
              enablePan={true} 
              enableZoom={true} 
              enableRotate={true}
              minDistance={10}
              maxDistance={1000}
            />
          </Suspense>
        </Canvas>
      </div>

      <InfoPanel 
        selectedPlanet={selectedPlanet} 
        onClose={() => setSelectedPlanet(null)} 
      />
      
      <div 
        className={`absolute top-4 left-4 text-white pointer-events-none transition-opacity duration-300 ${selectedPlanet ? 'opacity-0' : 'opacity-70'}`}
      >
        <h1 className="text-2xl font-bold tracking-wider">MINI SOLAR SYSTEM</h1>
        <p className="text-sm">Powered by React Three Fiber</p>
      </div>
    </div>
  );
};

export default App;