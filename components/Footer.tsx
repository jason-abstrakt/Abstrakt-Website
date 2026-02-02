import React from 'react';
import { Linkedin, Twitter } from 'lucide-react';

interface FooterProps {
  onNavigate?: (target: 'home' | 'portfolio' | 'contact') => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleClick = (e: React.MouseEvent, target: 'home' | 'portfolio' | 'contact') => {
    e.preventDefault();
    onNavigate?.(target);
  };

  return (
    <footer className="border-t border-white/[0.06] bg-off-black">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <a
              href="#"
              onClick={(e) => handleClick(e, 'home')}
              className="inline-block mb-4"
            >
              <img
                src="https://abstrakt.b-cdn.net/abstrakt%20text%20only%2C%20white%20text%20no%20background-cut.png"
                alt="Abstrakt Capital"
                className="h-6 w-auto opacity-80 hover:opacity-100 transition-opacity"
              />
            </a>
            <p className="text-white/50 text-sm max-w-xs leading-relaxed">
              Delivering superior value through minority investments and targeted acquisitions of enduring companies.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-white/60 mb-4">Navigate</h3>
            <ul className="space-y-3">
              <li>
                <a href="#portfolio" onClick={(e) => handleClick(e, 'portfolio')} className="text-white/60 hover:text-white text-sm transition-colors">
                  Portfolio
                </a>
              </li>
              <li>
                <a href="#contact" onClick={(e) => handleClick(e, 'contact')} className="text-white/60 hover:text-white text-sm transition-colors">
                  Get in Touch
                </a>
              </li>
              <li>
                <a href="#login" className="text-white/60 hover:text-white text-sm transition-colors">
                  Investor Login
                </a>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-white/60 mb-4">Connect</h3>
            <div className="flex gap-4">
              <a href="#" className="text-white/50 hover:text-white transition-colors" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-white/50 hover:text-white transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-sm">
            © {new Date().getFullYear()} Abstrakt Capital. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;