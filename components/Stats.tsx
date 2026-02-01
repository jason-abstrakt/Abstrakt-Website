import React, { useEffect, useRef, useState } from 'react';
import ScrollReveal from './ScrollReveal';
import { StatItem } from '../types';
import { useInView, useMotionValue, useSpring } from 'framer-motion';

const stats: StatItem[] = [
  { value: '7x', label: 'Target MOIC' },
  { value: '35%+', label: 'Average NET IRR' },
  { value: '15+', label: 'Portfolio Companies' },
];

const Counter = ({ value }: { value: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { damping: 30, stiffness: 60 });
  const [displayValue, setDisplayValue] = useState(0);

  // Parse numeric part (handle integers)
  const numMatch = value.match(/[\d]+/); 
  const num = numMatch ? parseInt(numMatch[0], 10) : 0;
  
  // Split around the number to preserve prefix/suffix
  const parts = value.split(num.toString());
  const prefix = parts[0] || "";
  const suffix = parts[1] || "";

  useEffect(() => {
    if (inView) {
      motionValue.set(num);
    }
  }, [inView, num, motionValue]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      setDisplayValue(Math.round(latest));
    });
    return unsubscribe;
  }, [springValue]);

  return (
    <span ref={ref} className="inline-block tabular-nums">
      {prefix}{displayValue}{suffix}
    </span>
  );
};

const Stats: React.FC = () => {
  return (
    <section className="relative py-24 bg-white/[0.02] border-y border-white/[0.05] overflow-hidden group/section">
      
      {/* Ambient Moving Lights Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-white/[0.03] rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '8s' }}></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-white/[0.02] rounded-full blur-[80px] animate-pulse" style={{ animationDuration: '6s', animationDelay: '1s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 divide-y md:divide-y-0 md:divide-x divide-white/[0.1]">
          {stats.map((stat, index) => (
            <ScrollReveal key={index} delay={index * 0.2} variant="slide-up">
              <div className="group relative text-center px-4 pt-8 md:pt-0 transition-all duration-500">
                
                {/* Hover Spotlight Effect */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl rounded-full transform -translate-y-4 scale-50 group-hover:scale-100"></div>

                {/* Stat Value with Shimmer */}
                <div className="relative text-6xl md:text-7xl font-semibold text-white mb-2 tracking-tighter">
                  <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/50 group-hover:to-white transition-all duration-700">
                    <Counter value={stat.value} />
                  </span>
                  {/* Subtle shine overlay animation */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] w-full h-full pointer-events-none mix-blend-overlay"></div>
                </div>

                {/* Label */}
                <div className="text-sm uppercase tracking-widest text-white/50 font-medium group-hover:text-white/80 transition-colors duration-500">
                  {stat.label}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
      
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </section>
  );
};

export default Stats;