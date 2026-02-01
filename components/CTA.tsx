import React from 'react';
import ScrollReveal from './ScrollReveal';

interface CTAProps {
  onNavigate?: (page: 'contact') => void;
}

const CTA: React.FC<CTAProps> = ({ onNavigate }) => {
  return (
    <section className="py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal variant="blur-in">
          <div className="relative border border-dashed border-white/20 p-12 md:p-24 text-center rounded-sm overflow-hidden group">
            
            {/* Hover Effect Background */}
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-[0.03] transition-opacity duration-700"></div>

            <h2 className="relative text-3xl md:text-5xl font-semibold text-white mb-6">
              Ready to Partner?
            </h2>
            
            <p className="relative text-lg md:text-xl font-light text-white/60 mb-12 max-w-2xl mx-auto">
              Whether you're a founder, a broker, or an investor — we'd love to hear from you. Let's discuss how we can create value together.
            </p>

            <button 
              onClick={() => onNavigate && onNavigate('contact')}
              className="relative px-8 py-4 bg-white text-black text-lg font-medium hover:scale-105 transition-transform duration-300 rounded-sm"
            >
              Start a Conversation
            </button>

          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default CTA;