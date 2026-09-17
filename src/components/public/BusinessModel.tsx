import React from 'react';
import { DollarSign, Wrench, Network, BarChart4, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { Badge } from '../common/Badge';

export const BusinessModel: React.FC = () => {
  const revenueStreams = [
    {
      id: '01',
      title: 'SaaS Subscription',
      tagline: 'Annual operations software licenses',
      desc: 'Tiered per-factory subscription based on active sewing lines, modular ERP feature access, and real-time telemetry throughput.',
      icon: DollarSign,
      color: 'purple',
      badge: 'Predictable ARR',
    },
    {
      id: '02',
      title: 'Implementation & Integration',
      tagline: 'Onboarding, mapping & IoT setup',
      desc: 'One-time onboarding fee for factory workflow digital mapping, legacy ledger migration, and barcode/vision edge device integrations.',
      icon: Wrench,
      color: 'purple',
      badge: 'High-Margin Services',
    },
    {
      id: '03',
      title: 'Match Commission',
      tagline: 'Take-rate on capacity exchange',
      desc: 'Success-based transaction fee on matched and escrow-secured capacity transactions between peer garment manufacturers.',
      icon: Network,
      color: 'purple',
      badge: 'Network Flywheel',
    },
    {
      id: '04',
      title: 'Premium Analytics & Trust Portal',
      tagline: 'Compliance & brand verification tier',
      desc: 'Enterprise tier for international fashion buyers seeking real-time ESG proof, cryptographic audits, and multi-tier supply chain visibility.',
      icon: BarChart4,
      color: 'purple',
      badge: 'Brand Expansion',
    },
  ];

  return (
    <section id="business-model" className="py-24 bg-[#19042b] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <Badge variant="purple" dot>
            Monetization Architecture
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Software-first. Low-capex. Network-driven.
          </h2>
          <p className="text-purple-200/80 text-base sm:text-lg">
            A balanced business model combining sticky recurring software revenue with powerful network transaction monetization.
          </p>
        </div>

        {/* 4 Revenue Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {revenueStreams.map((r) => {
            const Icon = r.icon;
            return (
              <div
                key={r.id}
                className="p-6 rounded-2xl bg-gradient-to-b from-[#24063d] to-[#160327] border border-purple-900/50 hover:border-purple-500/50 transition-all duration-300 flex flex-col justify-between shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2.5 rounded-xl bg-purple-950/60 border border-purple-800/60 text-purple-300">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-purple-950/60 text-purple-200 border border-purple-800/60">
                      {r.badge}
                    </span>
                  </div>

                  <span className="text-xs font-mono text-purple-400 font-bold">STREAM {r.id}</span>
                  <h3 className="text-lg font-bold text-white mt-1 mb-0.5">{r.title}</h3>
                  <div className="text-xs font-mono text-purple-300/70 mb-3">{r.tagline}</div>
                  <p className="text-xs text-purple-200/80 leading-relaxed">{r.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Revenue Flow Diagram */}
        <div className="p-8 rounded-2xl bg-[#220639] border border-purple-900/50 shadow-xl">
          <div className="text-center mb-6">
            <span className="text-xs font-mono text-purple-300/80 uppercase tracking-wider">
              ENTERPRISE VALUE CREATION FLOW
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-white mt-1">
              How Capital Flows Through the <span className="font-bengali text-purple-300">শিল্পAI</span> Ecosystem
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-900/60">
              <div className="text-xs font-bold text-purple-300 mb-1">1. FACTORY CLIENT</div>
              <p className="text-xs text-purple-200/80">
                Pays annual SaaS license for AI line balancing & predictive defect detection.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-purple-950/50 border border-purple-500/40">
              <div className="text-xs font-bold text-purple-200 mb-1">2. MATCHING NETWORK</div>
              <p className="text-xs text-purple-100/90">
                Monetizes idle capacity matching via performance take-rate per fulfilled order.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-900/60">
              <div className="text-xs font-bold text-indigo-300 mb-1">3. GLOBAL BUYERS & BRANDS</div>
              <p className="text-xs text-purple-200/80">
                Access verified audit streams & ESG compliance verification portals.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
