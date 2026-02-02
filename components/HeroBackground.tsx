import React, { useEffect, useRef } from 'react';

const HeroBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const targetMouseRef = useRef({ x: 0, y: 0 });
  const scrollRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let animationFrameId: number;

    const resize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        width = parent.clientWidth;
        height = parent.clientHeight;
        
        const dpr = window.devicePixelRatio || 1;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        
        ctx.scale(dpr, dpr);
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetMouseRef.current = {
        x: e.clientX - rect.left - width / 2,
        y: e.clientY - rect.top - height / 2
      };
    };

    const handleScroll = () => {
      scrollRef.current = window.scrollY;
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    resize();

    // Animation state
    let time = 0;
    
    const rings = [
      { baseR: 280, speed: 0.0002, width: 1.5, opacity: 0.25, dash: [] as number[], color: '255, 255, 255', parallax: 0.05, distortion: 40 },
      { baseR: 380, speed: -0.0003, width: 1, opacity: 0.2, dash: [4, 8], color: '255, 255, 255', parallax: 0.08, distortion: 60 },
      { baseR: 500, speed: 0.0001, width: 0.8, opacity: 0.15, dash: [] as number[], color: '255, 255, 255', parallax: 0.03, distortion: 30 },
      { baseR: 180, speed: 0.0004, width: 2, opacity: 0.3, dash: [2, 10], color: '255, 255, 255', parallax: 0.1, distortion: 20 },
      { baseR: 600, speed: -0.0001, width: 1, opacity: 0.1, dash: [10, 10], color: '255, 255, 255', parallax: 0.02, distortion: 80 },
      { baseR: 330, speed: 0.00025, width: 4, opacity: 0.06, dash: [], color: '200, 220, 255', blur: 25, parallax: 0.06, distortion: 50 }
    ];

    const render = () => {
      time++;
      
      // Calculate Scroll Effects
      // Normalized scroll (0 at top, 1 at viewport height)
      const scrollFactor = Math.min(Math.max(scrollRef.current / (window.innerHeight * 0.8), 0), 1);
      const easedScroll = scrollFactor * scrollFactor; // Quad ease in for dramatic effect

      // Crazy Scroll Multipliers
      const expansion = easedScroll * 800; // Explode outwards
      const rotationSpeedMult = 1 + (easedScroll * 20); // Spin much faster
      const chaos = easedScroll * 150; // Jitter factor
      
      // SLOWED DOWN FADE OUT: Multiplier changed from 1.2 to 0.6 so it stays visible longer
      const globalAlpha = Math.max(0, 1 - easedScroll * 0.6); 

      // Smooth mouse interpolation
      mouseRef.current.x += (targetMouseRef.current.x - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (targetMouseRef.current.y - mouseRef.current.y) * 0.05;

      ctx.clearRect(0, 0, width, height);
      
      if (globalAlpha <= 0) {
        // Stop rendering if completely invisible to save resources, but keep loop running for when they scroll back up
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      const cx = width / 2;
      const cy = height / 2;

      rings.forEach(ring => {
        ctx.save();
        
        // 1. Apply Parallax
        const parallaxX = mouseRef.current.x * ring.parallax;
        const parallaxY = mouseRef.current.y * ring.parallax;
        ctx.translate(cx + parallaxX, cy + parallaxY);
        
        // 2. Rotate with acceleration
        const rotation = time * ring.speed * rotationSpeedMult;
        ctx.rotate(rotation);

        // Inverse rotation for mouse distortion calculation
        const localMouseX = (mouseRef.current.x - parallaxX) * Math.cos(-rotation) - (mouseRef.current.y - parallaxY) * Math.sin(-rotation);
        const localMouseY = (mouseRef.current.x - parallaxX) * Math.sin(-rotation) + (mouseRef.current.y - parallaxY) * Math.cos(-rotation);

        ctx.beginPath();
        
        const segments = 120;
        for (let i = 0; i <= segments; i++) {
          const theta = (i / segments) * Math.PI * 2;
          
          // Base position + Scroll Expansion
          const effectiveR = ring.baseR + expansion;

          const px = Math.cos(theta) * effectiveR;
          const py = Math.sin(theta) * effectiveR;

          // Mouse Distortion
          const dist = Math.hypot(px - localMouseX, py - localMouseY);
          const interactionRadius = 300;
          let morph = 0;
          if (dist < interactionRadius) {
             const t = 1 - (dist / interactionRadius);
             morph = t * t * (ring.distortion + chaos); // Add chaos to distortion
          }

          // Idle wave + Scroll chaos
          const wave = Math.sin(theta * 8 + time * 0.02) * 5;
          const jitter = (Math.random() - 0.5) * chaos; // Random jaggedness when scrolling

          const r = effectiveR + morph + wave + jitter;
          
          const x = Math.cos(theta) * r;
          const y = Math.sin(theta) * r;

          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }

        ctx.closePath();
        
        if (ring.dash.length > 0) ctx.setLineDash(ring.dash);
        if (ring.blur) {
          ctx.shadowBlur = ring.blur + (chaos / 2); // Glow increases with chaos
          ctx.shadowColor = `rgba(${ring.color}, ${(ring.opacity * 2) * globalAlpha})`;
        }

        ctx.strokeStyle = `rgba(${ring.color}, ${ring.opacity * globalAlpha})`;
        ctx.lineWidth = ring.width + (easedScroll * 2); // Lines get thicker
        ctx.stroke();
        ctx.restore();
      });

      // Particles
      const particles = 30;
      for(let i = 0; i < particles; i++) {
        // Particles scatter outwards
        const scatter = easedScroll * 1000;
        
        const t = time * 0.0005 * rotationSpeedMult + i * (Math.PI * 2 / particles);
        const baseR = 350 + Math.sin(time * 0.003 + i * 2) * 80 + scatter;
        
        let x = cx + Math.cos(t) * baseR;
        let y = cy + Math.sin(t) * baseR;

        // Add some random scatter offset based on scroll
        x += (Math.random() - 0.5) * chaos;
        y += (Math.random() - 0.5) * chaos;

        const pParallax = 0.15 + (i % 5) * 0.02;
        x += mouseRef.current.x * pParallax;
        y += mouseRef.current.y * pParallax;
        
        ctx.beginPath();
        const size = (1.8 + Math.sin(time * 0.05 + i) * 0.5) * (1 + easedScroll * 2); // Grow
        ctx.arc(x, y, size, 0, Math.PI * 2);
        
        const isColored = i % 4 === 0;
        const color = isColored ? '200, 230, 255' : '255, 255, 255';
        const alpha = (0.3 + Math.cos(time * 0.02 + i) * 0.2) * globalAlpha;
        
        if (alpha > 0) {
            ctx.fillStyle = `rgba(${color}, ${alpha})`;
            ctx.shadowBlur = 6 + chaos * 0.1;
            ctx.shadowColor = `rgba(${color}, 0.5)`;
            ctx.fill();
            ctx.shadowBlur = 0;
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
      <div 
        className="absolute inset-0 z-10"
        style={{
          background: 'radial-gradient(circle at center, transparent 0%, transparent 60%, #0a0a0a 100%)'
        }}
      ></div>
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
};

export default HeroBackground;