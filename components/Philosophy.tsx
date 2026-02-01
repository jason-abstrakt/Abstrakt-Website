import React from 'react';
import ScrollReveal from './ScrollReveal';
import { motion } from 'framer-motion';

const Philosophy: React.FC = () => {
  const text = "We buy well-understood, long-standing companies and modernize them. We don't rely on hype cycles—we rely on fundamentals and operational improvements.";
  const words = text.split(" ");

  return (
    <section className="py-32 bg-white/[0.02]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <ScrollReveal variant="slide-up">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white leading-[1.1] mb-8">
                Partnering to Build Stronger, More Valuable Companies
              </h2>
            </ScrollReveal>
          </div>
          <div className="lg:col-span-5">
            <div className="pl-0 lg:pl-12 border-l-0 lg:border-l border-white/10">
              <motion.p 
                className="text-2xl md:text-3xl font-light text-white/80 leading-relaxed flex flex-wrap gap-x-[0.3em]"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-20%" }}
                variants={{
                  visible: { transition: { staggerChildren: 0.02 } },
                  hidden: {}
                }}
              >
                {words.map((word, i) => (
                  <motion.span
                    key={i}
                    variants={{
                      hidden: { opacity: 0, y: 20, filter: 'blur(8px)' },
                      visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] } }
                    }}
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Philosophy;