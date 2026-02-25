import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import InvestmentFocus from './components/InvestmentFocus';
import Portfolio from './components/Portfolio';
import Philosophy from './components/Philosophy';
import CTA from './components/CTA';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Background from './components/Background';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import InvestorLogin from './components/InvestorLogin';

type Page = 'home' | 'portfolio' | 'contact' | 'privacy' | 'terms' | 'login';

const PATHS: Record<Page, string> = {
  home: '/',
  portfolio: '/portfolio',
  contact: '/contact',
  privacy: '/privacy',
  terms: '/terms',
  login: '/login',
};

function getPageFromPathname(): Page {
  const path = window.location.pathname.replace(/\/$/, '') || '/';
  if (path === '/portfolio') return 'portfolio';
  if (path === '/contact') return 'contact';
  if (path === '/privacy') return 'privacy';
  if (path === '/terms') return 'terms';
  if (path === '/login') return 'login';
  return 'home';
}

const App: React.FC = () => {
  const [page, setPage] = useState<Page>(getPageFromPathname);

  useEffect(() => {
    const onPopState = () => setPage(getPageFromPathname());
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const handleNavigate = (target: 'home' | 'portfolio' | 'fund' | 'contact' | 'privacy' | 'terms' | 'login') => {
    if (target === 'portfolio') {
      setPage('portfolio');
      window.history.pushState({}, '', PATHS.portfolio);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (target === 'home') {
      setPage('home');
      window.history.pushState({}, '', PATHS.home);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (target === 'contact') {
      setPage('contact');
      window.history.pushState({}, '', PATHS.contact);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (target === 'privacy') {
      setPage('privacy');
      window.history.pushState({}, '', PATHS.privacy);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (target === 'terms') {
      setPage('terms');
      window.history.pushState({}, '', PATHS.terms);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (target === 'login') {
      setPage('login');
      window.history.pushState({}, '', PATHS.login);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (target === 'fund') {
      setPage('home');
      window.history.pushState({}, '', PATHS.home);
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

        {page === 'privacy' && (
          <div className="animate-in fade-in duration-500 pt-20">
             <PrivacyPolicy />
          </div>
        )}

        {page === 'terms' && (
          <div className="animate-in fade-in duration-500 pt-20">
             <TermsOfService />
          </div>
        )}

        {page === 'login' && (
          <div className="animate-in fade-in duration-500">
             <InvestorLogin />
          </div>
        )}
      </main>
      
      <Footer onNavigate={handleNavigate} />
    </div>
  );
};

export default App;