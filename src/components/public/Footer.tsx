import React from 'react';
import { ArrowUpRight, ShieldCheck, Sparkles, Building2, MapPin, Mail, Globe } from 'lucide-react';
import { Badge } from '../common/Badge';

interface FooterProps {
  onOpenDemo: () => void;
  onOpenPilot: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenDemo, onOpenPilot }) => {
  return (
    <footer className="bg-[#140222] border-t border-purple-900/40 text-purple-200/70 text-xs py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-purple-900/30">
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-purple-600/30 via-purple-950 to-indigo-600/30 border border-purple-500/40">
                <span className="font-bengali font-bold text-base text-purple-300">শি</span>
              </div>
              <span className="text-xl font-bold text-white flex items-center gap-1">
                <span className="font-bengali text-purple-400">শিল্প</span>
                <span className="text-white">AI</span>
                <span className="text-xs px-1.5 py-0.5 rounded font-mono bg-purple-950/80 border border-purple-800/60 text-purple-200">ERP</span>
              </span>
            </div>

            <p className="text-purple-200/70 text-xs sm:text-sm max-w-sm leading-relaxed">
              AI-native factory operations, predictive production intelligence, and verified capacity matching for the Bangladesh Ready-Made Garments (RMG) industry.
            </p>

            <div className="flex items-center gap-2 pt-1">
              <Badge variant="purple" dot>
                Pilot Deployment Track
              </Badge>
              <span className="text-[11px] font-mono text-purple-400/60">Dhaka · Global Supply Chain</span>
            </div>
          </div>

          {/* Quick links */}
          <div className="md:col-span-2 space-y-2.5">
            <div className="text-xs font-mono font-bold text-white uppercase tracking-wider">Product</div>
            <ul className="space-y-2">
              <li><a href="#product" className="hover:text-purple-300 transition-colors">AI ERP Layer</a></li>
              <li><a href="#ai-intelligence" className="hover:text-purple-300 transition-colors">Prediction Layer</a></li>
              <li><a href="#capacity-network" className="hover:text-purple-300 transition-colors">Capacity Network</a></li>
              <li><a href="#trust-layer" className="hover:text-purple-300 transition-colors">Trust & Verification</a></li>
              <li><button onClick={onOpenDemo} className="text-purple-300 hover:text-purple-200 hover:underline cursor-pointer">Interactive Demo</button></li>
            </ul>
          </div>

          <div className="md:col-span-2 space-y-2.5">
            <div className="text-xs font-mono font-bold text-white uppercase tracking-wider">Company & Strategy</div>
            <ul className="space-y-2">
              <li><a href="#problem" className="hover:text-purple-300 transition-colors">The RMG Problem</a></li>
              <li><a href="#why-shilpo" className="hover:text-purple-300 transition-colors">Why AI in ERP</a></li>
              <li><a href="#market" className="hover:text-purple-300 transition-colors">Market & SOM</a></li>
              <li><a href="#business-model" className="hover:text-purple-300 transition-colors">Business Model</a></li>
              <li><a href="#team" className="hover:text-purple-300 transition-colors">Founding Team</a></li>
            </ul>
          </div>

          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-mono font-bold text-white uppercase tracking-wider">Contact & Inquiries</div>
            <div className="space-y-1.5 text-xs text-purple-200/70">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-purple-400" />
                <span>Dhaka, Bangladesh · Garment Industrial Hub</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-purple-400" />
                <span>contact@shilpoai.com</span>
              </div>
              <div className="pt-2">
                <button
                  onClick={onOpenPilot}
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-700 via-purple-600 to-indigo-700 hover:from-purple-600 hover:to-indigo-600 text-white font-bold text-xs shadow-md shadow-purple-900/40 transition-colors cursor-pointer"
                >
                  Request Factory Pilot Access
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-wrap items-center justify-between gap-4 text-[11px] text-purple-400/60 font-mono">
          <div>
            © 2026 শিল্পAI ERP. All rights reserved. Built for Bangladesh RMG.
          </div>
          <div className="flex items-center gap-4">
            <span>Pre-Seed · Pilot Ready</span>
            <span>•</span>
            <span>Enterprise RMG Platform</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
