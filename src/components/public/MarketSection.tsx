import React from 'react';
import { TrendingUp, Globe, Building2, Layers, AlertCircle, BarChart3 } from 'lucide-react';
import { MARKET_DATA } from '../../data/mockData';
import { Badge } from '../common/Badge';

export const MarketSection: React.FC = () => {
  return (
    <section id="market" className="py-24 bg-[#19042b] border-t border-purple-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <Badge variant="purple" dot>
            Market Opportunity
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            A large domestic wedge with global upside.
          </h2>
          <p className="text-purple-200/80 text-base sm:text-lg">
            Starting with the world’s 2nd largest apparel export powerhouse before expanding across South & Southeast Asian manufacturing hubs.
          </p>
        </div>

        {/* TAM / SAM / SOM Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* TAM */}
          <div className="p-8 rounded-2xl bg-gradient-to-b from-[#24063d] to-[#160327] border border-purple-900/50 relative shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono font-bold text-purple-400 uppercase tracking-wider">
                TOTAL ADDRESSABLE MARKET
              </span>
              <Globe className="w-5 h-5 text-purple-400" />
            </div>
            <div className="text-4xl sm:text-5xl font-black font-mono tracking-tight text-indigo-300">
              {MARKET_DATA.tam.value}
            </div>
            <h3 className="text-base font-bold text-slate-200 mt-2">
              {MARKET_DATA.tam.label}
            </h3>
            <p className="text-xs text-purple-200/70 mt-2 leading-relaxed">
              {MARKET_DATA.tam.sub}
            </p>
          </div>

          {/* SAM */}
          <div className="p-8 rounded-2xl bg-gradient-to-b from-[#24063d] to-[#160327] border border-purple-900/50 relative shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono font-bold text-purple-400 uppercase tracking-wider">
                SERVICEABLE ADDRESSABLE MARKET
              </span>
              <Building2 className="w-5 h-5 text-purple-400" />
            </div>
            <div className="text-4xl sm:text-5xl font-black font-mono tracking-tight text-purple-300">
              {MARKET_DATA.sam.value}
            </div>
            <h3 className="text-base font-bold text-slate-200 mt-2">
              {MARKET_DATA.sam.label}
            </h3>
            <p className="text-xs text-purple-200/70 mt-2 leading-relaxed">
              {MARKET_DATA.sam.sub}
            </p>
          </div>

          {/* SOM */}
          <div className="p-8 rounded-2xl bg-gradient-to-b from-[#330854]/80 to-[#19042b] border border-purple-500/60 relative shadow-xl shadow-purple-950/50">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono font-bold text-purple-300 uppercase tracking-wider">
                SERVICEABLE OBTAINABLE MARKET
              </span>
              <Layers className="w-5 h-5 text-purple-300" />
            </div>
            <div className="text-4xl sm:text-5xl font-black text-white font-mono tracking-tight">
              {MARKET_DATA.factories.value}
            </div>
            <h3 className="text-base font-bold text-purple-200 mt-2">
              Export-Oriented RMG Factories
            </h3>
            <p className="text-xs text-purple-100/80 mt-2 leading-relaxed">
              {MARKET_DATA.som.sub}
            </p>
          </div>
        </div>

        {/* Methodology & Assumption Note */}
        <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-900/50 flex items-start gap-3 text-xs text-purple-200/80">
          <AlertCircle className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
          <div>
            <strong className="text-purple-200">Market Methodology Disclosure:</strong> {MARKET_DATA.som.note} Sourced macro metrics derived from Export Promotion Bureau (EPB) and BGMEA FY25-26 official reports.
          </div>
        </div>
      </div>
    </section>
  );
};
