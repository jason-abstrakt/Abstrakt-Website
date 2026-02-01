import React, { useState, useMemo } from 'react';
import ScrollReveal from './ScrollReveal';
import { PortfolioItem } from '../types';
import { Image as ImageIcon, ArrowRight, Filter, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const portfolioItems: PortfolioItem[] = [
  {
    name: 'H&A Transmissions, Inc.',
    description: 'Remanufactured Transmissions.',
    type: 'Anchor Investor',
    year: '2024',
    image: 'https://abstrakt.b-cdn.net/HandA.jpg'
  },
  {
    name: 'Sigma Air',
    description: 'HVAC (Commercial and Residential).',
    type: 'Anchor Investor',
    year: '2024',
    image: 'https://abstrakt.b-cdn.net/SigmaAir.jpg'
  },
  {
    name: 'Infinity Communications',
    description: 'Procurement Consulting.',
    type: 'Investor',
    year: '2024',
    image: 'https://abstrakt.b-cdn.net/Infinity.jpg'
  },
  {
    name: 'AM Eyes',
    description: 'Ophthalmology Clinics.',
    type: 'Investor',
    year: '2024',
    image: 'https://abstrakt.b-cdn.net/AMEyes.jpg'
  },
  {
    name: 'Apex Truck Parking',
    description: 'Outdoor Storage Management.',
    type: 'Acquisition',
    year: '2024',
    image: 'https://abstrakt.b-cdn.net/APEX.jpg'
  },
  {
    name: 'Botsi, Inc.',
    description: 'Dynamic Pricing SAAS Platform.',
    type: 'Venture Studio',
    year: '2025',
    image: 'https://abstrakt.b-cdn.net/Botsi.jpg'
  },
  {
    name: 'Metal Solutions',
    description: 'Sheet Metal Fabrication.',
    type: 'Investor',
    year: '2024',
    image: 'https://abstrakt.b-cdn.net/MetalSolutions.jpg'
  },
  {
    name: 'Thermometer Holdings',
    description: 'HVAC (Commercial and Residential).',
    type: 'Investor',
    year: '2024',
    image: 'https://abstrakt.b-cdn.net/Thermometer.jpg'
  },
  {
    name: 'Greenway Painting',
    description: 'Painting (Commercial and Residential).',
    type: 'Investor',
    year: '2025',
    image: 'https://abstrakt.b-cdn.net/Painting.jpg'
  },
  {
    name: 'Pavoginilli Group',
    description: 'Sober Living Facilities.',
    type: 'Anchor Investor',
    year: '2025',
    image: 'https://abstrakt.b-cdn.net/Pavoginilli.jpg'
  },
  {
    name: 'Hansel Union',
    description: 'Therapy Services.',
    type: 'Investor',
    year: '2025',
    image: 'https://abstrakt.b-cdn.net/HanselUnion.jpg'
  },
  {
    name: 'Deva, Inc.',
    description: 'Precision Component Manufacturing.',
    type: 'Investor',
    year: '2025',
    image: 'https://abstrakt.b-cdn.net/Deva.jpg'
  }
];

interface PortfolioProps {
  showViewAllLink?: boolean;
  onNavigate?: (page: 'portfolio') => void;
}

const Portfolio: React.FC<PortfolioProps> = ({ showViewAllLink = false, onNavigate }) => {
  const [filterType, setFilterType] = useState('All');
  const [filterYear, setFilterYear] = useState('All');

  // Extract unique types and years for filter buttons
  const uniqueTypes = useMemo(() => {
    const types = new Set(portfolioItems.map(item => item.type));
    return ['All', ...Array.from(types)];
  }, []);

  const uniqueYears = useMemo(() => {
    const years = new Set(portfolioItems.map(item => item.year));
    return ['All', ...Array.from(years).sort().reverse()];
  }, []);

  // Filter Logic
  const filteredItems = useMemo(() => {
    // If we are on the home page (showViewAllLink is true), just show the first 8 items without filtering
    if (showViewAllLink) {
      return portfolioItems.slice(0, 8);
    }

    // Otherwise, apply filters
    return portfolioItems.filter(item => {
      const typeMatch = filterType === 'All' || item.type === filterType;
      const yearMatch = filterYear === 'All' || item.year === filterYear;
      return typeMatch && yearMatch;
    });
  }, [showViewAllLink, filterType, filterYear]);

  const clearFilters = () => {
    setFilterType('All');
    setFilterYear('All');
  };

  const hasActiveFilters = filterType !== 'All' || filterYear !== 'All';

  return (
    <section id="portfolio" className="py-32 bg-off-black relative min-h-screen">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="mb-12">
          <ScrollReveal variant="slide-up">
            <h2 className="text-4xl md:text-5xl font-semibold text-white mb-6">Portfolio</h2>
          </ScrollReveal>
          <ScrollReveal variant="slide-up" delay={0.1}>
            <p className="text-xl md:text-2xl font-light text-white/60 max-w-3xl leading-relaxed">
              We’re industry-agnostic, giving us the freedom to pursue opportunities without constraints.
            </p>
          </ScrollReveal>
        </div>

        {/* Filters - Only visible on the full portfolio page */}
        {!showViewAllLink && (
          <ScrollReveal variant="fade" delay={0.2}>
            <div className="mb-12 space-y-6 border-b border-white/10 pb-8">
              <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
                {/* Type Filters */}
                <div className="flex flex-wrap gap-2 items-center">
                   <span className="text-xs uppercase tracking-widest text-white/40 mr-2 font-medium">Strategy</span>
                   {uniqueTypes.map(type => (
                     <button
                       key={type}
                       onClick={() => setFilterType(type)}
                       className={`px-3 py-1.5 text-sm rounded-full transition-all duration-300 border ${
                         filterType === type 
                           ? 'bg-white text-black border-white font-medium' 
                           : 'bg-transparent text-white/60 border-transparent hover:border-white/20 hover:text-white'
                       }`}
                     >
                       {type}
                     </button>
                   ))}
                </div>

                {/* Divider for desktop */}
                <div className="hidden md:block w-px h-6 bg-white/10"></div>

                {/* Year Filters */}
                <div className="flex flex-wrap gap-2 items-center">
                  <span className="text-xs uppercase tracking-widest text-white/40 mr-2 font-medium">Year</span>
                  {uniqueYears.map(year => (
                    <button
                      key={year}
                      onClick={() => setFilterYear(year)}
                      className={`px-3 py-1.5 text-sm rounded-full transition-all duration-300 border ${
                        filterYear === year 
                          ? 'bg-white text-black border-white font-medium' 
                          : 'bg-transparent text-white/60 border-transparent hover:border-white/20 hover:text-white'
                      }`}
                    >
                      {year}
                    </button>
                  ))}
                </div>

                {/* Clear Button */}
                {hasActiveFilters && (
                   <button 
                     onClick={clearFilters}
                     className="ml-auto flex items-center gap-1 text-xs text-red-400 hover:text-red-300 transition-colors uppercase tracking-wider font-medium"
                   >
                     <X size={14} /> Clear
                   </button>
                )}
              </div>
            </div>
          </ScrollReveal>
        )}

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 min-h-[300px]">
          <AnimatePresence mode='popLayout'>
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <ScrollReveal key={item.name} variant="slide-up" width="100%">
                  <motion.div 
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="group bg-white/[0.02] border border-white/[0.05] hover:border-white/20 transition-all duration-500 rounded-sm overflow-hidden flex flex-col h-full hover:-translate-y-1"
                  >
                    
                    {/* Hero Image */}
                    <div className="aspect-[4/3] bg-white/[0.05] relative overflow-hidden">
                      {item.image ? (
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100" 
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                            <ImageIcon className="text-white/10 w-12 h-12 group-hover:scale-110 transition-transform duration-700" />
                        </div>
                      )}
                    </div>

                    {/* Glowing Divider */}
                    <div className="relative h-px w-full">
                      {/* Subtle base line */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                      {/* Intense center glow */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-white/80 to-transparent shadow-[0_0_8px_rgba(255,255,255,0.8)]"></div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="text-xl font-semibold text-white mb-2 leading-tight">{item.name}</h3>
                      <p className="text-sm text-white/60 mb-6 font-light leading-relaxed flex-grow">
                        {item.description}
                      </p>
                      
                      <div className="flex items-end justify-between mt-auto">
                        {/* Badge */}
                        <span className={`
                          text-[10px] uppercase tracking-wider font-medium px-2 py-1 rounded-sm border whitespace-nowrap
                          ${item.type === 'Acquisition' ? 'bg-indigo-500/10 border-indigo-500/20 text-indigo-300' : ''}
                          ${item.type === 'Investor' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300' : ''}
                          ${item.type === 'Anchor Investor' ? 'bg-purple-500/10 border-purple-500/20 text-purple-300' : ''}
                          ${item.type === 'Venture Studio' ? 'bg-amber-500/10 border-amber-500/20 text-amber-300' : ''}
                        `}>
                          {item.type}
                        </span>
                        
                        <span className="text-sm text-white/40 font-mono ml-2">
                          {item.year}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </ScrollReveal>
              ))
            ) : (
              <div className="col-span-full py-20 text-center text-white/40 font-light">
                <Filter className="w-8 h-8 mx-auto mb-4 opacity-50" />
                No companies match your filters.
              </div>
            )}
          </AnimatePresence>
        </motion.div>

        {showViewAllLink && (
          <ScrollReveal variant="fade" delay={0.2}>
            <div className="flex justify-center">
              <button 
                onClick={() => onNavigate && onNavigate('portfolio')}
                className="group flex items-center gap-2 px-4 py-2 text-white/40 hover:text-white transition-colors duration-300 cursor-pointer"
              >
                <span className="text-xs uppercase tracking-[0.2em] font-medium border-b border-transparent group-hover:border-white transition-all">See Full Portfolio</span>
                <ArrowRight size={14} className="transform group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          </ScrollReveal>
        )}
      </div>
    </section>
  );
};

export default Portfolio;