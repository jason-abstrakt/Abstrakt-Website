import React from 'react';
import { Linkedin, Twitter, ArrowUpRight } from 'lucide-react';

interface FooterProps {
  onNavigate?: (page: 'home' | 'portfolio' | 'contact' | 'privacy' | 'terms') => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleNavClick = (e: React.MouseEvent, target: 'home' | 'portfolio' | 'contact' | 'privacy' | 'terms') => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(target);
    }
  };

  return (
    <footer className="relative z-10 border-t border-white/[0.05] bg-off-black pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
               <img 
                src="https://abstrakt.b-cdn.net/abstrakt%20text%20only%2C%20white%20text%20no%20background-cut.png" 
                alt="Abstrakt Capital" 
                className="h-6 w-auto opacity-90"
              />
            </div>
            <p className="text-white/50 max-w-sm leading-relaxed font-light">
              Partnering with exceptional entrepreneurs to build enduring businesses through minority investments and targeted acquisitions.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-white font-medium mb-6">Explore</h3>
            <ul className="flex flex-col gap-4">
              <li><a href="#" className="text-white/50 hover:text-white transition-colors">Home</a></li>
              <li><a href="#portfolio" className="text-white/50 hover:text-white transition-colors">Portfolio</a></li>
              <li><a href="#contact" className="text-white/50 hover:text-white transition-colors">Contact</a></li>
              <li><a href="#login" className="text-white/50 hover:text-white transition-colors flex items-center gap-2">Investor Login <ArrowUpRight size={14} /></a></li>
            </ul>
          </div>

          {/* Social / Contact */}
          <div>
            <h3 className="text-white font-medium mb-6">Connect</h3>
            <ul className="flex flex-col gap-4">
              <li>
                <a href="mailto:jason@abstrakt.group" className="text-white/50 hover:text-white transition-colors">
                  jason@abstrakt.group
                </a>
              </li>
              <li className="flex gap-4 mt-2">
                <a href="#" className="text-white/50 hover:text-white transition-colors">
                  <Linkedin size={20} />
                </a>
                <a href="#" className="text-white/50 hover:text-white transition-colors">
                  <Twitter size={20} />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/[0.05] pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/30 text-sm">
            © {new Date().getFullYear()} Abstrakt Capital. All rights reserved.
          </p>
          <div className="flex gap-8 text-sm text-white/30">
            <a href="#" onClick={(e) => handleNavClick(e, 'privacy')} className="hover:text-white/50 transition-colors">Privacy Policy</a>
            <a href="#" onClick={(e) => handleNavClick(e, 'terms')} className="hover:text-white/50 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;