import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import InvestmentFocus from './components/InvestmentFocus';
import Portfolio from './components/Portfolio';
import Philosophy from './components/Philosophy';
import CTA from './components/CTA';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Background from './components/Background';

type Page = 'home' | 'portfolio' | 'contact';

const App: React.FC = () => {
  const [page, setPage] = useState<Page>('home');

  const handleNavigate = (target: 'home' | 'portfolio' | 'fund' | 'contact') => {
    if (target === 'portfolio') {
      setPage('portfolio');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (target === 'home') {
      setPage('home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (target === 'contact') {
      setPage('contact');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (target === 'fund') {
      setPage('home');
      setTimeout(() => {
        const el = document.getElementById('fund');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    }
  };

  return (
    <div className="relative min-h-screen bg-off-black text-white font-sans selection:bg-white/20 selection:text-white">
      <Background />
      <Navbar onNavigate={handleNavigate} currentPage={page} />
      
      <main className="relative z-10 flex flex-col gap-0">
        {page === 'home' && (
          <div className="animate-in fade-in duration-500">
            <Hero onNavigate={handleNavigate} />
            <InvestmentFocus />
            <Portfolio showViewAllLink={true} onNavigate={handleNavigate} />
            <Philosophy />
            <CTA onNavigate={handleNavigate} />
          </div>
        )}

        {page === 'portfolio' && (
          <div className="animate-in fade-in duration-500 pt-20">
            <Portfolio showViewAllLink={false} />
            <CTA onNavigate={handleNavigate} />
          </div>
        )}

        {page === 'contact' && (
          <div className="animate-in fade-in duration-500">
             <Contact />
          </div>
        )}
      </main>
      
      <Footer onNavigate={handleNavigate} />
    </div>
  );
};

export default App;