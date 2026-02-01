import React, { useRef } from 'react';
import ScrollReveal from './ScrollReveal';
import OrbAnimation from './OrbAnimation';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Layers, CircleDollarSign, TrendingUp, CheckCircle2 } from 'lucide-react';

const InvestmentFocus: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Parallax transforms - particles move up at different speeds as you scroll down
  const ySlow = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const yMedium = useTransform(scrollYProgress, [0, 1], [0, -250]);
  const yFast = useTransform(scrollYProgress, [0, 1], [0, -400]);

  const criteria = [
    {
      title: "Our Edge",
      icon: Layers,
      items: ["Entrepreneur-first mindset", "Operational expertise", "Rigorous underwriting", "Proprietary sourcing"],
      gradient: "from-blue-500/10 via-indigo-500/5 to-transparent",
      accent: "text-indigo-400"
    },
    {
      title: "Target Deals",
      icon: CircleDollarSign,
      items: ["Revenue $5M to $20M", "EBITDA $1M to $4M", "Majority or minority structures", "Aligned Incentives"],
      gradient: "from-emerald-500/10 via-teal-500/5 to-transparent",
      accent: "text-emerald-400"
    },
    {
      title: "Business Profile",
      icon: TrendingUp,
      items: ["Durable cash flows", "Loyal customer base", "Strong & stable core teams", "Growth opportunities"],
      gradient: "from-purple-500/10 via-fuchsia-500/5 to-transparent",
      accent: "text-purple-400"
    }
  ];

  return (
    <section ref={containerRef} id="fund" className="py-32 relative overflow-hidden -mt-32 z-20">
      
      {/* Background Gradient Fade (Opacity overlap) */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-off-black/80 to-off-black pointer-events-none -z-10"></div>

      {/* Parallax Particles Background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Slow Layer (Background) - Furthest away, moves least */}
        <motion.div style={{ y: ySlow }} className="absolute inset-0">
          <div className="absolute w-1 h-1 bg-white/10 rounded-full top-[5%] left-[10%]" />
          <div className="absolute w-2 h-2 bg-white/5 rounded-full top-[25%] left-[80%]" />
          <div className="absolute w-1.5 h-1.5 bg-white/10 rounded-full top-[50%] left-[5%]" />
          <div className="absolute w-1 h-1 bg-white/20 rounded-full top-[75%] left-[90%]" />
          <div className="absolute w-2 h-2 bg-white/5 rounded-full top-[90%] left-[20%]" />
          <div className="absolute w-1 h-1 bg-white/10 rounded-full top-[15%] left-[60%]" />
          <div className="absolute w-1 h-1 bg-white/5 rounded-full top-[10%] left-[40%]" />
          <div className="absolute w-2 h-2 bg-white/5 rounded-full top-[35%] left-[25%]" />
          <div className="absolute w-1 h-1 bg-white/10 rounded-full top-[60%] left-[85%]" />
          <div className="absolute w-1.5 h-1.5 bg-white/5 rounded-full top-[80%] left-[45%]" />
          <div className="absolute w-1 h-1 bg-white/10 rounded-full top-[45%] left-[15%]" />
          <div className="absolute w-2 h-2 bg-white/5 rounded-full top-[5%] left-[70%]" />
          <div className="absolute w-1 h-1 bg-white/10 rounded-full top-[95%] left-[10%]" />
          <div className="absolute w-1 h-1 bg-white/5 rounded-full top-[20%] left-[95%]" />
        </motion.div>

        {/* Medium Layer (Midground) */}
        <motion.div style={{ y: yMedium }} className="absolute inset-0">
          <div className="absolute w-1.5 h-1.5 bg-white/15 rounded-full top-[15%] left-[30%]" />
          <div className="absolute w-1 h-1 bg-white/10 rounded-full top-[40%] left-[70%]" />
          <div className="absolute w-2 h-2 bg-white/5 rounded-full top-[65%] left-[40%]" />
          <div className="absolute w-1 h-1 bg-white/15 rounded-full top-[85%] left-[10%]" />
          <div className="absolute w-1.5 h-1.5 bg-white/10 rounded-full top-[30%] left-[55%]" />
          <div className="absolute w-1 h-1 bg-white/10 rounded-full top-[55%] left-[15%]" />
          <div className="absolute w-2 h-2 bg-white/10 rounded-full top-[10%] left-[80%]" />
          <div className="absolute w-1 h-1 bg-white/15 rounded-full top-[45%] left-[35%]" />
          <div className="absolute w-1.5 h-1.5 bg-white/10 rounded-full top-[70%] left-[60%]" />
          <div className="absolute w-1 h-1 bg-white/10 rounded-full top-[90%] left-[30%]" />
          <div className="absolute w-2 h-2 bg-white/5 rounded-full top-[25%] left-[10%]" />
          <div className="absolute w-1 h-1 bg-white/15 rounded-full top-[5%] left-[50%]" />
          <div className="absolute w-1.5 h-1.5 bg-white/10 rounded-full top-[60%] left-[90%]" />
        </motion.div>

        {/* Fast Layer (Foreground) - Closest, moves most */}
        <motion.div style={{ y: yFast }} className="absolute inset-0">
          <div className="absolute w-1 h-1 bg-white/20 rounded-full top-[10%] left-[50%]" />
          <div className="absolute w-2 h-2 bg-white/10 rounded-full top-[30%] left-[20%]" />
          <div className="absolute w-1.5 h-1.5 bg-white/15 rounded-full top-[60%] left-[85%]" />
          <div className="absolute w-1 h-1 bg-white/20 rounded-full top-[90%] left-[60%]" />
          <div className="absolute w-1 h-1 bg-white/25 rounded-full top-[5%] left-[95%]" />
          <div className="absolute w-2 h-2 bg-white/15 rounded-full top-[40%] left-[5%]" />
          <div className="absolute w-1 h-1 bg-white/20 rounded-full top-[75%] left-[30%]" />
          <div className="absolute w-1.5 h-1.5 bg-white/10 rounded-full top-[20%] left-[65%]" />
          <div className="absolute w-1 h-1 bg-white/20 rounded-full top-[50%] left-[45%]" />
          <div className="absolute w-2 h-2 bg-white/10 rounded-full top-[85%] left-[75%]" />
          <div className="absolute w-1 h-1 bg-white/25 rounded-full top-[15%] left-[15%]" />
          <div className="absolute w-1.5 h-1.5 bg-white/15 rounded-full top-[65%] left-[5%]" />
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Intro Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24 items-center">
          <div>
            <ScrollReveal variant="slide-up">
              <h2 className="text-4xl md:text-5xl font-semibold text-white mb-8">
                How We Invest
              </h2>
            </ScrollReveal>
            <ScrollReveal variant="slide-up" delay={0.2}>
              <p className="text-2xl md:text-3xl font-light text-white/80 leading-normal mb-8">
                We deploy capital through a mix of acquisitions, minority investments, and studio-built ventures – each giving us a different way to back great businesses and generate extraordinary outcomes. Our approach is flexible, entrepreneur-friendly, and data-driven.
              </p>
            </ScrollReveal>
          </div>
          <ScrollReveal variant="blur-in" delay={0.4}>
            {/* Seamless Orb Container */}
            <div className="relative aspect-video lg:aspect-square overflow-hidden">
               <OrbAnimation />
            </div>
          </ScrollReveal>
        </div>

        {/* Investment Criteria Grid - Modernized */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {criteria.map((item, index) => (
            <ScrollReveal key={index} variant="slide-up" delay={0.1 * (index + 1)}>
              <div className="group relative h-full bg-white/[0.02] border border-white/5 rounded-2xl p-8 overflow-hidden hover:border-white/10 transition-colors duration-500">
                
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700`}></div>
                
                {/* Watermark Icon */}
                <item.icon 
                  className={`absolute -bottom-6 -right-6 w-48 h-48 stroke-[0.5] opacity-[0.03] group-hover:opacity-[0.07] group-hover:scale-110 transition-all duration-700 ${item.accent}`} 
                />

                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-8">
                    <div className={`p-3 rounded-xl bg-white/5 border border-white/5 ${item.accent} group-hover:bg-white/10 transition-colors duration-300`}>
                      <item.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-medium text-white tracking-wide">{item.title}</h3>
                  </div>

                  <ul className="space-y-4">
                    {item.items.map((subItem, i) => (
                      <li key={i} className="flex items-start gap-3 text-lg text-white/60 font-light group-hover:text-white/90 transition-colors duration-300">
                        <CheckCircle2 className={`w-5 h-5 mt-1 shrink-0 opacity-40 group-hover:opacity-100 ${item.accent} transition-opacity duration-300`} />
                        <span className="leading-snug">{subItem}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InvestmentFocus;