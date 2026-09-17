import React from 'react';
import { Check, X, Sparkles, Shield, Trophy } from 'lucide-react';
import { Badge } from '../common/Badge';

export const CompetitionSection: React.FC = () => {
  const comparisonData = [
    {
      capability: 'AI-Native ERP Execution (BOM, SMV, Line Balancing)',
      shilpo: true,
      genericErp: 'Partial / Legacy',
      brokers: false,
      traceability: false,
      marketplaces: false,
    },
    {
      capability: 'Predictive Delay & Defect Risk Forecasting',
      shilpo: true,
      genericErp: false,
      brokers: false,
      traceability: false,
      marketplaces: false,
    },
    {
      capability: 'Privacy-Preserving Capacity Matching',
      shilpo: true,
      genericErp: false,
      brokers: 'Opaque / Manual',
      traceability: false,
      marketplaces: 'Public / Unshielded',
    },
    {
      capability: 'Factory Verification & Compliance First (BGMEA/Sedex)',
      shilpo: true,
      genericErp: false,
      brokers: false,
      traceability: true,
      marketplaces: 'Weak / Self-Reported',
    },
    {
      capability: 'Conversational Operational Copilot (RMG-tuned)',
      shilpo: true,
      genericErp: false,
      brokers: false,
      traceability: false,
      marketplaces: false,
    },
    {
      capability: 'Optional Cryptographic Audit & Tamper Detection',
      shilpo: true,
      genericErp: false,
      brokers: false,
      traceability: 'Audit only',
      marketplaces: false,
    },
  ];

  return (
    <section id="competition" className="py-24 bg-[#19042b] relative overflow-hidden border-t border-purple-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <Badge variant="purple" dot>
            Competitive Differentiation
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            More than ERP. More than brokerage.
          </h2>
          <p className="text-purple-200/80 text-base sm:text-lg">
            Where other systems create data silos or risky informal workarounds, <span className="font-bengali font-bold text-white">শিল্পAI ERP</span> provides an integrated, verified execution ecosystem.
          </p>
        </div>

        {/* Matrix Table */}
        <div className="overflow-x-auto rounded-2xl border border-purple-800/60 bg-gradient-to-b from-[#1e0533] to-[#150325] shadow-2xl">
          <table className="w-full text-left border-collapse min-w-[720px]">
            <thead>
              <tr className="border-b border-purple-900/50 bg-[#160327]">
                <th className="p-5 text-xs font-mono font-bold uppercase tracking-wider text-purple-300">
                  Operational Capability
                </th>
                <th className="p-5 text-xs font-mono font-bold uppercase tracking-wider text-purple-300/70">
                  Generic ERPs
                </th>
                <th className="p-5 text-xs font-mono font-bold uppercase tracking-wider text-purple-300/70">
                  Informal Brokers
                </th>
                <th className="p-5 text-xs font-mono font-bold uppercase tracking-wider text-purple-300/70">
                  Traceability Tools
                </th>
                <th className="p-5 text-xs font-mono font-bold uppercase tracking-wider text-purple-300/70">
                  Generic B2B Portals
                </th>
                <th className="p-5 text-sm font-bold uppercase tracking-wider bg-purple-900/60 border-l border-purple-500/40 text-purple-200">
                  <div className="flex items-center gap-1.5">
                    <Trophy className="w-4 h-4 text-purple-400" />
                    <span className="font-bengali">শিল্পAI</span> ERP
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-900/40 text-xs">
              {comparisonData.map((row, idx) => (
                <tr key={idx} className="hover:bg-purple-900/20 transition-colors">
                  <td className="p-4 font-semibold text-slate-200">
                    {row.capability}
                  </td>
                  <td className="p-4 text-slate-400">
                    {typeof row.genericErp === 'boolean' ? (
                      row.genericErp ? <Check className="w-4 h-4 text-slate-300" /> : <X className="w-4 h-4 text-rose-500/60" />
                    ) : (
                      <span className="text-slate-500">{row.genericErp}</span>
                    )}
                  </td>
                  <td className="p-4 text-slate-400">
                    {typeof row.brokers === 'boolean' ? (
                      row.brokers ? <Check className="w-4 h-4 text-slate-300" /> : <X className="w-4 h-4 text-rose-500/60" />
                    ) : (
                      <span className="text-slate-500">{row.brokers}</span>
                    )}
                  </td>
                  <td className="p-4 text-slate-400">
                    {typeof row.traceability === 'boolean' ? (
                      row.traceability ? <Check className="w-4 h-4 text-slate-300" /> : <X className="w-4 h-4 text-rose-500/60" />
                    ) : (
                      <span className="text-slate-500">{row.traceability}</span>
                    )}
                  </td>
                  <td className="p-4 text-slate-400">
                    {typeof row.marketplaces === 'boolean' ? (
                      row.marketplaces ? <Check className="w-4 h-4 text-slate-300" /> : <X className="w-4 h-4 text-rose-500/60" />
                    ) : (
                      <span className="text-slate-500">{row.marketplaces}</span>
                    )}
                  </td>
                  <td className="p-4 bg-purple-900/30 border-l border-purple-500/30 font-bold text-purple-200">
                    <div className="flex items-center gap-1.5">
                      <div className="w-4 h-4 rounded-full bg-purple-500/30 text-purple-300 flex items-center justify-center">
                        <Check className="w-3 h-3 text-purple-300" />
                      </div>
                      <span>Full Native Support</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
