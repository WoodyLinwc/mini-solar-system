import React from 'react';
import { PlanetData } from '../types';

interface InfoPanelProps {
  selectedPlanet: PlanetData | null;
  onClose: () => void;
}

export const InfoPanel: React.FC<InfoPanelProps> = ({ selectedPlanet, onClose }) => {
  if (!selectedPlanet) return null;

  return (
    <div className="absolute top-4 right-4 z-50 w-80 max-w-[90vw] bg-black/40 backdrop-blur-md border border-white/20 text-white rounded-xl overflow-hidden shadow-2xl transition-all duration-300 max-h-[90vh] flex flex-col">
      {/* Header */}
      <div 
        className="p-4 flex items-center justify-between shrink-0"
        style={{ backgroundColor: `${selectedPlanet.color}33` }} // 33 is approx 20% opacity hex
      >
        <h2 className="text-2xl font-bold font-mono tracking-tighter uppercase flex items-baseline gap-2">
          <span>{selectedPlanet.name}</span>
          <span className="text-lg opacity-80 font-sans font-normal">{selectedPlanet.chineseName}</span>
        </h2>
        <button 
          onClick={onClose}
          className="hover:bg-white/20 rounded-full p-1 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Content - Scrollable */}
      <div className="p-6 space-y-4 overflow-y-auto custom-scrollbar">
        {/* Basic Stats */}
        <div className="grid grid-cols-2 gap-4 text-sm mb-4 border-b border-white/10 pb-4">
           <div>
              <p className="text-white/50 text-xs uppercase">Relative Size</p>
              <p className="font-mono">{selectedPlanet.radius}x Earth</p>
           </div>
           <div>
              <p className="text-white/50 text-xs uppercase">Orbital Speed</p>
              <p className="font-mono">{selectedPlanet.speed}x</p>
           </div>
        </div>

        {/* Static Descriptions */}
        <div>
           <p className="text-white/50 text-xs uppercase mb-1">Overview</p>
           <p className="text-sm leading-relaxed text-gray-200 mb-4">
             {selectedPlanet.description}
           </p>

           <p className="text-white/50 text-xs uppercase mb-1">概览 (Overview)</p>
           <p className="text-sm leading-relaxed text-gray-200 font-sans mb-6">
             {selectedPlanet.descriptionZH}
           </p>

           {/* Real Image */}
           <div className="rounded-lg overflow-hidden border border-white/10 shadow-lg bg-black/50">
             <img 
               src={selectedPlanet.imageUrl} 
               alt={`Real photo of ${selectedPlanet.name}`}
               className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
               loading="lazy"
             />
             <div className="p-2 text-[10px] text-white/40 text-center uppercase tracking-widest bg-black/40 backdrop-blur-sm">
               Actual Imagery (NASA)
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};