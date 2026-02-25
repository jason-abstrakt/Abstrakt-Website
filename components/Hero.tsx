import React from 'react';
import ScrollReveal from './ScrollReveal';
import HeroBackground from './HeroBackground';
import { ArrowDown } from 'lucide-react';

interface HeroProps {
  onNavigate?: (target: 'fund') => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const handleScrollClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate('fund');
    } else {
      document.getElementById('fund')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-32 md:pt-40 pb-20 px-6">
      
      {/* Abstract Animated Background specific to Hero */}
      <HeroBackground />

      <div className="relative max-w-6xl mx-auto text-center z-10">
        <ScrollReveal variant="blur-in" delay={0.2}>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-normal tracking-tight text-white mb-8 leading-[1.05]">
            We Partner With <br />
            <span className="text-white/50 font-light italic bg-clip-text text-transparent bg-gradient-to-r from-white via-white/80 to-white/40">Exceptional</span> Entrepreneurs <br />
            and Businesses
          </h1>
        </ScrollReveal>

        <ScrollReveal variant="slide-up" delay={0.4}>
          <p className="text-lg md:text-2xl font-extralight text-white/70 max-w-3xl mx-auto leading-relaxed mb-16 tracking-wide">
            Delivering superior value through minority investments 
            and targeted acquisitions of enduring companies.
          </p>
        </ScrollReveal>
        
        <ScrollReveal variant="fade" delay={0.8}>
          <div 
            onClick={handleScrollClick}
            className="flex flex-col items-center gap-4 opacity-40 hover:opacity-100 transition-all duration-500 cursor-pointer group"
          >
            <span className="text-[10px] uppercase tracking-[0.3em] text-white group-hover:tracking-[0.4em] transition-all">Scroll to explore</span>
            <div className="p-2 border border-white/10 rounded-full group-hover:border-white/30 transition-colors">
              <ArrowDown className="text-white w-4 h-4 animate-bounce" />
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default Hero;