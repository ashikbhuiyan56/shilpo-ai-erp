import React from 'react';
import { CheckCircle2, Search, ArrowRight, ShieldCheck, Cpu, Factory, Users } from 'lucide-react';
import { Badge } from '../common/Badge';

interface TractionStatusProps {
  onOpenPilot: () => void;
}

export const TractionStatus: React.FC<TractionStatusProps> = ({ onOpenPilot }) => {
  return (
    <section id="traction" className="py-24 bg-[#19042b] border-t border-purple-900/30 relative">
      <div id="status" className="absolute -top-12 left-0" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <Badge variant="purple" dot>
            Current Venture Status
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Pre-Seed · Pilot-Ready
          </h2>
          <p className="text-purple-200/80 text-base sm:text-lg">
            We believe in authentic execution and deep customer discovery. Here is our exact development status and deployment roadmap.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* What We Have */}
          <div className="p-8 rounded-2xl bg-gradient-to-b from-[#24063d] to-[#160327] border border-purple-900/50 shadow-xl">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-purple-900/40">
              <div className="p-2.5 rounded-xl bg-purple-600/20 text-purple-300 border border-purple-500/30">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">What We Have Built & Validated</h3>
                <span className="text-xs font-mono text-purple-400">CURRENT FOUNDATIONAL ASSETS</span>
              </div>
            </div>

            <ul className="space-y-4 text-xs sm:text-sm text-purple-200/90">
              {[
                { title: 'Product Concept & Complete System Architecture', desc: 'Detailed 8-module native data schema mapped to RMG shop-floor workflows.' },
                { title: 'Documented Industry Pain Points', desc: 'Direct discovery interviews across factory owners, industrial engineers, and merchandisers in Gazipur & Savar.' },
                { title: 'Pilot-Ready Product Direction', desc: 'Interactive command center, edge QC defect scanner model, and line balancing algorithms.' },
                { title: 'AI ERP & Prediction Engine Architecture', desc: 'Time-series production velocity forecasting & early-warning delay risk calculations.' },
                { title: 'Verified Capacity Matching Protocol', desc: 'Privacy-preserving escrow & compatibility algorithm for peer factory exchange.' },
                { title: 'Trust & Verification Audit Layer', desc: 'Optional cryptographic milestone logging prototype for verifiable supply-chain compliance.' },
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-4 h-4 rounded-full bg-purple-600/30 text-purple-300 flex items-center justify-center shrink-0 mt-0.5 font-bold text-[10px]">
                    ✓
                  </div>
                  <div>
                    <strong className="text-white font-semibold">{item.title}:</strong>{' '}
                    <span className="text-purple-200/70">{item.desc}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* What We Seek (Crisp White Card with Royal Purple Accents) */}
          <div className="p-8 rounded-3xl bg-white border border-slate-200/90 text-slate-900 shadow-2xl shadow-purple-950/60 flex flex-col justify-between transform hover:-translate-y-1 transition-all duration-300">
            <div>
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                <div className="p-2.5 rounded-xl bg-purple-100 text-purple-700 border border-purple-200">
                  <Search className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">What We Are Seeking in 2026</h3>
                  <span className="text-xs font-mono font-semibold text-purple-700">COLLABORATION & CATALYSTS</span>
                </div>
              </div>

              <ul className="space-y-4 text-xs sm:text-sm text-slate-700">
                <li className="p-4 rounded-2xl bg-purple-50/70 border border-purple-100">
                  <div className="font-bold text-slate-900 flex items-center gap-2 mb-1">
                    <Factory className="w-4 h-4 text-purple-600" />
                    <span>1. Pilot Manufacturing Partners</span>
                  </div>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    2–3 forward-thinking Bangladesh garment/textile factories ready to deploy our predictive delay and defect detection system on active production lines.
                  </p>
                </li>

                <li className="p-4 rounded-2xl bg-purple-50/70 border border-purple-100">
                  <div className="font-bold text-slate-900 flex items-center gap-2 mb-1">
                    <Users className="w-4 h-4 text-purple-600" />
                    <span>2. Strategic Industry & Export Advisors</span>
                  </div>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    RMG veterans, BGMEA leadership, and global apparel supply chain leaders to help guide enterprise scaling and brand integration.
                  </p>
                </li>

                <li className="p-4 rounded-2xl bg-purple-50/70 border border-purple-100">
                  <div className="font-bold text-slate-900 flex items-center gap-2 mb-1">
                    <Cpu className="w-4 h-4 text-purple-600" />
                    <span>3. Pre-Seed Investment Support</span>
                  </div>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    Pre-seed capital to accelerate edge AI model deployment, factory integrations, and initial pilot data pipelines.
                  </p>
                </li>
              </ul>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-100">
              <button
                onClick={onOpenPilot}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-purple-900/30 transition-all cursor-pointer hover:-translate-y-0.5"
              >
                <span>Partner With Us on a Factory Pilot</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
