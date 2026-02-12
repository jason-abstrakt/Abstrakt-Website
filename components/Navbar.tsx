import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { NavItem } from '../types';

interface NavbarProps {
  onNavigate: (page: 'home' | 'portfolio' | 'fund' | 'contact' | 'login') => void;
  currentPage: 'home' | 'portfolio' | 'contact' | 'login';
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentPage }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent, target: 'home' | 'portfolio' | 'fund' | 'contact' | 'login') => {
    e.preventDefault();
    onNavigate(target);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <nav 
        className={`pointer-events-auto transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] flex items-center justify-between rounded-full border ${
          isScrolled || isMobileMenuOpen 
            ? 'w-full max-w-4xl bg-off-black/80 backdrop-blur-xl border-white/10 py-3 px-6 shadow-2xl shadow-black/50' 
            : 'w-full max-w-5xl bg-white/[0.03] border-white/[0.05] py-4 px-8 backdrop-blur-sm'
        }`}
      >
        {/* Logo */}
        <a 
          href="#" 
          onClick={(e) => handleNavClick(e, 'home')}
          className="flex items-center gap-2 group"
        >
          <img 
            src="https://abstrakt.b-cdn.net/abstrakt%20text%20only%2C%20white%20text%20no%20background-cut.png" 
            alt="Abstrakt Capital" 
            className="h-5 w-auto object-contain opacity-90 group-hover:opacity-100 transition-opacity"
          />
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <a 
            href="#portfolio"
            onClick={(e) => handleNavClick(e, 'portfolio')}
            className={`text-sm font-medium tracking-wide transition-colors ${currentPage === 'portfolio' ? 'text-white' : 'text-white/70 hover:text-white'}`}
          >
            Portfolio
          </a>
          <a 
            href="/login"
            onClick={(e) => handleNavClick(e, 'login')}
            className={`text-sm font-medium tracking-wide transition-colors ${currentPage === 'login' ? 'text-white' : 'text-white/70 hover:text-white'}`}
          >
            Investor Login
          </a>
          
          <div className="w-px h-4 bg-white/10 mx-2"></div>
          <a 
            href="#contact"
            onClick={(e) => handleNavClick(e, 'contact')}
            className={`px-5 py-2 text-xs uppercase tracking-widest font-bold transition-all duration-300 rounded-full ${
              currentPage === 'contact' 
              ? 'bg-white text-black' 
              : 'bg-white text-black hover:bg-white/90'
            }`}
          >
            Get in Touch
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu Dropdown (Relative to pill) */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 mt-4 bg-off-black/95 backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex flex-col gap-6 animate-in fade-in zoom-in-95 duration-200 shadow-2xl">
            <a 
              href="#portfolio"
              onClick={(e) => handleNavClick(e, 'portfolio')}
              className={`text-lg font-medium text-center ${currentPage === 'portfolio' ? 'text-white' : 'text-white/80'}`}
            >
              Portfolio
            </a>
            <a 
              href="/login"
              onClick={(e) => handleNavClick(e, 'login')}
              className={`text-lg font-medium text-center ${currentPage === 'login' ? 'text-white' : 'text-white/80 hover:text-white'}`}
            >
              Investor Login
            </a>
            <a 
              href="#contact"
              onClick={(e) => handleNavClick(e, 'contact')}
              className="px-6 py-3 bg-white text-black text-center font-bold rounded-full"
            >
              Get in Touch
            </a>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;