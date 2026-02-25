import React, { useState, FormEvent } from 'react';
import { Lock, Mail, ArrowRight, LayoutDashboard } from 'lucide-react';

const DASHBOARD_IMAGE_URL = 'https://abstrakt.b-cdn.net/InvestorPortal.png';

const InvestorLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Sign-in logic to be hooked up later
  };

  return (
    <section className="min-h-screen bg-off-black text-white pt-24 pb-32 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Sign-in section */}
        <div className="flex flex-col items-center text-center mb-24">
          <div className="w-full max-w-md">
            <div className="flex justify-center mb-8">
              <img
                src="https://abstrakt.b-cdn.net/abstrakt%20text%20only%2C%20white%20text%20no%20background-cut.png"
                alt="Abstrakt Capital"
                className="h-6 w-auto opacity-90"
              />
            </div>
            <h1 className="text-3xl md:text-4xl font-light text-white tracking-tight mb-2">
              Investor Portal
            </h1>
            <p className="text-white/50 text-sm font-light mb-10">
              Sign in to access your fund overview, documents, and performance.
            </p>

            <form
              onSubmit={handleSubmit}
              className="bg-white/[0.04] border border-white/10 rounded-2xl p-8 shadow-2xl shadow-black/30"
            >
              <div className="space-y-6">
                <div>
                  <label htmlFor="investor-email" className="block text-left text-xs font-medium text-white/60 uppercase tracking-wider mb-2">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                    <input
                      id="investor-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder:text-white/30 font-light focus:outline-none focus:border-white/20 focus:ring-1 focus:ring-white/10 transition-colors"
                      autoComplete="email"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="investor-password" className="block text-left text-xs font-medium text-white/60 uppercase tracking-wider mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                    <input
                      id="investor-password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder:text-white/30 font-light focus:outline-none focus:border-white/20 focus:ring-1 focus:ring-white/10 transition-colors"
                      autoComplete="current-password"
                    />
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="mt-8 w-full py-4 bg-white text-off-black font-semibold text-sm uppercase tracking-widest rounded-xl hover:bg-white/95 transition-colors flex items-center justify-center gap-2"
              >
                Sign in
                <ArrowRight className="w-4 h-4" />
              </button>
              <p className="mt-6 text-center text-xs text-white/40 font-light">
                Access is limited to accredited investors in the Abstrakt Capital Fund.
              </p>
            </form>
          </div>
        </div>

        {/* Dashboard preview section */}
        <div className="border-t border-white/10 pt-20">
          <div className="flex flex-col items-center text-center mb-12">
            <div className="inline-flex items-center gap-2 text-white/40 mb-4">
              <LayoutDashboard className="w-4 h-4" />
              <span className="text-xs font-medium uppercase tracking-widest">Preview</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-light text-white tracking-tight mb-4">
              Your dashboard awaits
            </h2>
            <p className="text-white/50 max-w-xl font-light leading-relaxed">
              Once signed in, you’ll have access to fund overview, capital metrics, performance data, documents, and co-investment opportunities—all in one place.
            </p>
          </div>
          <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/[0.02] shadow-2xl shadow-black/40">
            <img
              src={DASHBOARD_IMAGE_URL}
              alt="Abstrakt Capital Fund investor portal dashboard preview"
              className="w-full h-auto object-contain"
            />
            <div className="px-6 py-4 bg-white/[0.03] border-t border-white/5">
              <p className="text-center text-xs text-white/40 font-light">
                Abstrakt Capital Fund — Fund Overview
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InvestorLogin;
