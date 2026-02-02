import React, { useEffect, useRef } from 'react';

const OrbAnimation: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const inViewRef = useRef(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let animationFrameId: number;
    let time = 0;

    const resize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        width = parent.clientWidth;
        height = parent.clientHeight;
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        ctx.scale(dpr, dpr);
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => { inViewRef.current = entry.isIntersecting; },
      { threshold: 0.05, rootMargin: '100px' }
    );
    observer.observe(container);

    window.addEventListener('resize', resize);
    resize();

    // --- Particle Logic (reduced counts for performance) ---
    
    interface Point3D {
      x: number;
      y: number;
      z: number;
      baseX: number;
      baseY: number;
      baseZ: number;
      size: number;
    }

    const spherePoints: Point3D[] = [];
    const numSpherePoints = 280;
    const sphereRadius = 160;

    // Fibonacci Sphere Distribution for even point spread
    for (let i = 0; i < numSpherePoints; i++) {
      const y = 1 - (i / (numSpherePoints - 1)) * 2; // y goes from 1 to -1
      const radiusAtY = Math.sqrt(1 - y * y); // radius at y
      const theta = i * Math.PI * (3 - Math.sqrt(5)); // golden angle increment

      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;

      spherePoints.push({
        x: x * sphereRadius,
        y: y * sphereRadius,
        z: z * sphereRadius,
        baseX: x * sphereRadius,
        baseY: y * sphereRadius,
        baseZ: z * sphereRadius,
        size: Math.random() * 1.5 + 0.5
      });
    }

    const ambientParticles: Point3D[] = [];
    const numAmbient = 80;
    for(let i=0; i<numAmbient; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const r = sphereRadius * (1.5 + Math.random()); // Outside the sphere
      
      ambientParticles.push({
        x: r * Math.sin(phi) * Math.cos(theta),
        y: r * Math.sin(phi) * Math.sin(theta),
        z: r * Math.cos(phi),
        baseX: 0, baseY: 0, baseZ: 0, // Not used for random orbiters in same way
        size: Math.random() * 2 + 0.5
      });
    }

    const render = () => {
      if (!inViewRef.current) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }
      time += 0.001; 
      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      // Rotate Sphere
      // We'll apply a constant rotation to the sphere points
      const tilt = 0.2; // Slight tilt on X axis

      // Floating bobbing effect for the whole sphere
      const bobY = Math.sin(time * 1.5) * 8;

      const drawPoint = (p: Point3D, isAmbient: boolean) => {
        let x = p.x;
        let y = p.y;
        let z = p.z;

        if (!isAmbient) {
          // Rotate sphere from base coordinates
          // Rotate around Y - Slower rotation
          let angleY = time * 0.8; 
          let x1 = p.baseX * Math.cos(angleY) - p.baseZ * Math.sin(angleY);
          let z1 = p.baseX * Math.sin(angleY) + p.baseZ * Math.cos(angleY);
          
          // Rotate around X (tilt)
          let y1 = p.baseY * Math.cos(tilt) - z1 * Math.sin(tilt);
          let z2 = p.baseY * Math.sin(tilt) + z1 * Math.cos(tilt);
          
          x = x1;
          y = y1;
          z = z2;
        } else {
          // Ambient particles orbit slowly and randomly
          const angle = time * (0.2 + (p.size * 0.05)); 
          
          // Re-calculate orbit
          const r = Math.sqrt(p.x*p.x + p.y*p.y + p.z*p.z); // approximate radius
          // simple orbit
          x = r * Math.cos(angle + p.x); // use p.x as random seed offset
          z = r * Math.sin(angle + p.x);
          y = p.y + Math.sin(time * 2 + p.z) * 15; // gentle float up/down
        }

        // Perspective Projection
        const fov = 300;
        const scale = fov / (fov + z);
        const x2d = x * scale + cx;
        const y2d = y * scale + cy + bobY;

        // Draw
        if (scale > 0) { // Don't draw if behind camera clipping plane (simple check)
            const alpha = Math.max(0.1, (scale - 0.5)); // Fade out back particles
            
            ctx.beginPath();
            ctx.arc(x2d, y2d, p.size * scale, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${alpha * (isAmbient ? 0.6 : 0.8)})`;
            ctx.fill();

            // Glow for ambient
            if (isAmbient) {
                ctx.shadowBlur = 10;
                ctx.shadowColor = 'rgba(255,255,255,0.5)';
                ctx.fill();
                ctx.shadowBlur = 0;
            }
        }
      };

      // Draw sphere points
      spherePoints.forEach(p => drawPoint(p, false));
      // Draw ambient particles
      ambientParticles.forEach(p => drawPoint(p, true));

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 bg-transparent">
        <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
};

export default OrbAnimation;