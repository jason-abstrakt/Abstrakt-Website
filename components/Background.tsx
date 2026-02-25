import React from 'react';

const Background: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-off-black">
      {/* Noise Texture Overlay for grain effect - Very faint */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
      
      {/* Extremely subtle static gradient spots to break up the solid black */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_800px_at_10%_20%,rgba(255,255,255,0.015),transparent)]"></div>
      <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_600px_at_90%_60%,rgba(255,255,255,0.01),transparent)]"></div>
    </div>
  );
};

export default Background;