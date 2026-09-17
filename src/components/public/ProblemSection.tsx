import React from 'react';
import { 
  AlertOctagon, 
  EyeOff, 
  HelpCircle, 
  Network, 
  TrendingUp, 
  ShieldAlert, 
  Layers,
  ArrowRight,
  Factory
} from 'lucide-react';
import { Badge } from '../common/Badge';

export const ProblemSection: React.FC = () => {
  const problems = [
    {
      number: '01',
      title: 'Reactive ERPs',
      subtitle: 'Retrospective without foresight',
      quote: 'Most systems show what already happened. They don\'t predict delays or recommend the next action.',
      impact: 'Managers discover late shipments only when the delivery window has already collapsed.',
      icon: EyeOff,
      color: 'amber',
    },
    {
      number: '02',
      title: 'Spare-Capacity Blackout',
      subtitle: 'Siloed idle production lines',
      quote: 'When orders spike or fabric is late, factories lack a fast and trusted way to discover matching verified capacity.',
      impact: 'One factory runs 14 hours overtime with penalties while a nearby peer line sits idle.',
      icon: Network,
      color: 'rose',
    },
    {
      number: '03',
      title: 'Opaque Subcontracting',
      subtitle: 'Informal brokerage vulnerability',
      quote: 'Emergency work can move through informal networks, increasing deadline, compliance, quality and margin risk.',
      impact: 'Subcontracted lines jeopardize buyer compliance audits, export certifications, and profit margins.',
      icon: ShieldAlert,
      color: 'red',
    },
    {
      number: '04',
      title: 'Hidden Labour & Traceability Risk',
      subtitle: 'Tier-2 and Tier-3 blindspots',
      quote: 'Risk can exist beyond first-tier factories, reducing visibility for brands and suppliers.',
      impact: 'Global fashion brands demand transparent auditability that legacy paper-based systems cannot provide.',
      icon: AlertOctagon,
      color: 'purple',
    },
  ];

  return (
    <section id="problem" className="py-24 bg-[#19042b] border-y border-purple-900/30 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <Badge variant="purple" dot>
            The Structural Challenge
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Bangladesh RMG has a visibility and trust gap.
          </h2>
          <p className="text-purple-200/80 text-base sm:text-lg">
            While the ready-made garments sector powers the national economy, operations remain fragmented across backward-looking software, manual spreadsheets, and opaque emergency brokers.
          </p>
        </div>

        {/* 4 Problem Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
          {problems.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.number}
                className="group relative p-7 rounded-2xl bg-gradient-to-b from-[#24063d] to-[#160327] border border-purple-900/50 hover:border-purple-600/60 transition-all duration-300 hover:shadow-xl hover:shadow-purple-950/60"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl bg-purple-950/60 text-purple-300 border border-purple-800/60 group-hover:scale-105 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-xs font-mono text-purple-400/80 font-bold uppercase tracking-wider">
                        Challenge {p.number}
                      </span>
                      <h3 className="text-xl font-bold text-white group-hover:text-purple-200 transition-colors">
                        {p.title}
                      </h3>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-900/50 mb-4">
                  <p className="text-sm font-medium text-purple-100 italic leading-relaxed">
                    “{p.quote}”
                  </p>
                </div>

                <div className="text-xs text-purple-200/80 font-sans flex items-start gap-2">
                  <span className="text-purple-400 font-bold font-mono">CONSEQUENCE:</span>
                  <span>{p.impact}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Why this matters now - Authentic Pitch Deck Macro RMG Stats */}
        <div className="rounded-2xl bg-gradient-to-r from-[#330854]/60 via-[#23053b] to-[#160327] border border-purple-600/40 p-8 sm:p-10 shadow-xl">
          <div className="max-w-3xl mb-8">
            <div className="flex items-center gap-2 text-purple-400 text-xs font-mono font-semibold uppercase tracking-wider mb-2">
              <Factory className="w-4 h-4" />
              <span>Macro Economic Context · Pitch Truth</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Why this matters now
            </h3>
            <p className="text-purple-200/80 text-sm mt-1">
              Bangladesh’s apparel manufacturing backbone commands global scale, requiring modern predictive software infrastructure to protect export competitiveness.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
            <div className="p-6 rounded-xl bg-purple-950/40 border border-purple-900/50">
              <div className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-purple-300">
                $38.70B
              </div>
              <div className="text-sm font-bold text-slate-200 mt-2">
                FY2025-26 Bangladesh RMG Exports
              </div>
              <div className="text-xs text-purple-200/70 mt-1">
                Annual volume exported to European Union, North American & Asian markets.
              </div>
            </div>

            <div className="p-6 rounded-xl bg-purple-950/40 border border-purple-900/50">
              <div className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-indigo-300">
                80.62%
              </div>
              <div className="text-sm font-bold text-slate-200 mt-2">
                Share of National Exports
              </div>
              <div className="text-xs text-purple-200/70 mt-1">
                Approximate percentage of total merchandise exports generated by the RMG industry.
              </div>
            </div>

            <div className="p-6 rounded-xl bg-purple-950/40 border border-purple-900/50">
              <div className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-purple-400">
                3,500+
              </div>
              <div className="text-sm font-bold text-slate-200 mt-2">
                Export-Oriented Factories
              </div>
              <div className="text-xs text-purple-200/70 mt-1">
                Active industrial manufacturing facilities across Dhaka, Gazipur, Savar, Narayanganj & CEPZ.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
