import React from 'react';
import { Linkedin, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/[0.05] py-12 bg-black">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-white/40 text-sm">
          © {new Date().getFullYear()} Abstrakt Capital. All rights reserved.
        </div>
        
        <div className="flex items-center gap-6">
          <a href="#" className="text-white/40 hover:text-white transition-colors">
            <Linkedin size={20} />
          </a>
          <a href="#" className="text-white/40 hover:text-white transition-colors">
            <Twitter size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;