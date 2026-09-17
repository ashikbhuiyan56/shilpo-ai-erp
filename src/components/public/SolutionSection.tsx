import React, { useState } from 'react';
import { 
  Layers, 
  Cpu, 
  Network, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Zap, 
  Lock 
} from 'lucide-react';
import { Badge } from '../common/Badge';

interface SolutionSectionProps {
  onOpenDemo: (tab: string) => void;
}

export const SolutionSection: React.FC<SolutionSectionProps> = ({ onOpenDemo }) => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const layers = [
    {
      num: '01',
      badge: 'FOUNDATIONAL ARCHITECTURE',
      title: 'AI ERP Layer',
      tagline: 'End-to-end Garment Operations Flow',
      desc: 'Seamlessly connects Merchandising → Procurement → Inventory → Production → QC → Logistics → Finance → HR & Payroll into a single real-time data spine.',
      icon: Layers,
      color: 'emerald',
      demoTab: 'overview',
      points: [
        'Real-time SMV line tracking & automated BOM calculation',
        'Fabric roll-by-roll shade inventory & shrinkage control',
        'Automated commercial invoice & LC customs generation',
        'Compliance-grade biometric attendance & OT calculation',
      ],
    },
    {
      num: '02',
      badge: 'PREDICTIVE COGNITION',
      title: 'Prediction Layer',
      tagline: 'Defect & Delay Intelligence',
      desc: 'Deep learning models that inspect production patterns in real-time to alert managers to bottleneck formation 3 to 7 days before shipment failure.',
      icon: Cpu,
      color: 'blue',
      demoTab: 'risk-center',
      points: [
        'AI vision-assisted defect pattern classification',
        'Production trajectory & deadline risk forecasting',
        'Conversational ShilpoAI Copilot for instant root-cause diagnostics',
        'Raw material late-arrival impact simulator',
      ],
    },
    {
      num: '03',
      badge: 'COLLABORATIVE NETWORK',
      title: 'Verified Capacity Matching',
      tagline: 'Privacy-Preserving Load Balancing',
      desc: 'When delay risk occurs, discover verified peer capacity across certified Bangladesh factories without exposing sensitive order details prematurely.',
      icon: Network,
      color: 'purple',
      demoTab: 'capacity',
      anchorId: 'capacity-network',
      points: [
        'Mutual zero-knowledge discovery of idle sewing lines',
        'Capability & compliance matching (WRAP, Sedex, BGMEA)',
        'Shielded identity until mutual consent & escrow agreement',
        'Eliminates emergency unauthorized subcontracting',
      ],
    },
    {
      num: '04',
      badge: 'VERIFIABLE INTEGRITY',
      title: 'Trust & Verification Layer',
      tagline: 'Optional Cryptographic Auditability',
      desc: 'Optional blockchain-backed audit trail providing tamper-evident proof of production milestones, fabric origin, and genuine tier-1 compliance.',
      icon: ShieldCheck,
      color: 'amber',
      demoTab: 'trust',
      anchorId: 'trust-layer',
      points: [
        'Cryptographic hashes anchored to milestone completions',
        'Immutable proof of ethical labor & inspection compliance',
        'Zero-trust verification exportable to global fashion brands',
        'Completely optional, enterprise-ready modularity',
      ],
    },
  ];

  return (
    <section id="product" className="py-24 bg-[#19042b] border-t border-purple-900/30 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <Badge variant="purple" dot>
            Complete System Architecture
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            One intelligent operating system. <br />
            <span className="text-purple-300">Four intelligence layers.</span>
          </h2>
          <p className="text-purple-200/80 text-base sm:text-lg">
            Designed from the factory floor up to turn fragmented garment manufacturing operations into a coordinated, predictive powerhouse.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {layers.map((layer, idx) => {
            const Icon = layer.icon;
            const isHovered = hoveredCard === idx;
            const isFeatured = layer.num === '02'; // Prediction Layer highlight
            return (
              <div
                key={layer.num}
                onMouseEnter={() => setHoveredCard(idx)}
                onMouseLeave={() => setHoveredCard(null)}
                className={`relative p-8 rounded-3xl transition-all duration-300 border flex flex-col justify-between ${
                  isFeatured
                    ? 'bg-white border-purple-300 text-slate-900 shadow-2xl shadow-purple-950/70 hover:-translate-y-1'
                    : isHovered
                    ? 'border-purple-500/60 shadow-2xl shadow-purple-900/30 -translate-y-1 bg-gradient-to-b from-[#25063f] to-[#170327]'
                    : 'border-purple-900/50 hover:border-purple-700/50 shadow-lg bg-gradient-to-b from-[#25063f] to-[#170327]'
                }`}
              >
                {layer.anchorId && (
                  <div id={layer.anchorId} className="absolute -top-28 left-0 pointer-events-none" />
                )}
                {isFeatured && (
                  <div className="absolute top-0 right-8 transform -translate-y-1/2">
                    <span className="px-3.5 py-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-[11px] rounded-full shadow-lg shadow-purple-900/30">
                      CORE AI DIFFERENTIATOR
                    </span>
                  </div>
                )}

                <div>
                  {/* Top line with Number & Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center font-bold ${
                        isFeatured
                          ? 'bg-purple-100 border-purple-200 text-purple-700'
                          : 'bg-purple-950/70 border border-purple-800/70 text-purple-300'
                      }`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <span className={`text-xs font-mono font-bold tracking-wider ${
                          isFeatured ? 'text-purple-700' : 'text-purple-400'
                        }`}>
                          LAYER {layer.num}
                        </span>
                        <div className={`text-[10px] font-mono ${
                          isFeatured ? 'text-purple-600 font-semibold' : 'text-purple-300/70'
                        }`}>
                          {layer.badge}
                        </div>
                      </div>
                    </div>
                    <span className={`text-4xl font-black font-mono ${
                      isFeatured ? 'text-purple-200' : 'text-purple-950'
                    }`}>
                      {layer.num}
                    </span>
                  </div>

                  <h3 className={`text-2xl font-black mb-1 ${
                    isFeatured ? 'text-slate-900' : 'text-white'
                  }`}>
                    {layer.title}
                  </h3>
                  <div className={`text-xs font-semibold mb-4 font-mono ${
                    isFeatured ? 'text-purple-700' : 'text-purple-300/90'
                  }`}>
                    {layer.tagline}
                  </div>

                  <p className={`text-sm leading-relaxed mb-6 ${
                    isFeatured ? 'text-slate-600' : 'text-purple-200/80'
                  }`}>
                    {layer.desc}
                  </p>

                  <div className="space-y-2.5 mb-8">
                    {layer.points.map((pt, pidx) => (
                      <div key={pidx} className={`flex items-start gap-2.5 text-xs ${
                        isFeatured ? 'text-slate-800 font-medium' : 'text-purple-100/90'
                      }`}>
                        <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${
                          isFeatured ? 'text-purple-600' : 'text-purple-400'
                        }`} />
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className={`pt-4 border-t flex items-center justify-between ${
                  isFeatured ? 'border-slate-100' : 'border-purple-900/50'
                }`}>
                  <button
                    onClick={() => onOpenDemo(layer.demoTab)}
                    className={`inline-flex items-center gap-2 text-xs font-bold transition-colors cursor-pointer ${
                      isFeatured ? 'text-purple-700 hover:text-purple-900' : 'text-purple-300 hover:text-purple-200'
                    }`}
                  >
                    <span>Inspect Layer in Interactive Demo</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                    isFeatured
                      ? 'bg-purple-100 text-purple-800 font-semibold border border-purple-200'
                      : 'text-purple-400/60'
                  }`}>
                    Live Demo Ready
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
