import React from 'react';
import { ArrowRight, CheckCircle2, Factory, Network, ShieldCheck, Globe, Zap } from 'lucide-react';
import { Badge } from '../common/Badge';

export const GoToMarket: React.FC = () => {
  const gtmSteps = [
    {
      stage: '01',
      name: 'LAND',
      focus: 'Core ERP Pain',
      desc: 'Solve urgent line bottleneck & fabric delay visibility for forward-thinking export factories.',
      icon: Factory,
    },
    {
      stage: '02',
      name: 'PILOT',
      focus: 'Prove ROI',
      desc: 'Demonstrate quantifiable lead-time savings (2+ days per delayed order) in initial 2–3 pilot facilities.',
      icon: Zap,
    },
    {
      stage: '03',
      name: 'MATCH',
      focus: 'Open Capacity Layer',
      desc: 'Connect verified factories into a peer-to-peer capacity exchange network in Gazipur & Savar.',
      icon: Network,
    },
    {
      stage: '04',
      name: 'VERIFY',
      focus: 'Trust + Audit',
      desc: 'Onboard global fashion buyers to inspect verifiable ESG and production integrity logs.',
      icon: ShieldCheck,
    },
    {
      stage: '05',
      name: 'SCALE',
      focus: 'Cross-Border Hubs',
      desc: 'Replicate the validated RMG operating network across regional apparel export corridors.',
      icon: Globe,
    },
  ];

  return (
    <section id="gtm" className="py-24 bg-[#19042b] border-t border-purple-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <Badge variant="purple" dot>
            Go-To-Market Strategy
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            5-Stage Phased Expansion Engine
          </h2>
          <p className="text-purple-200/80 text-base sm:text-lg">
            A disciplined, low-friction expansion strategy built around tangible operational ROI for garment manufacturers.
          </p>
        </div>

        {/* 5-Step Grid with Connectors */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {gtmSteps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.stage}
                className="p-6 rounded-2xl bg-gradient-to-b from-[#24063d] to-[#160327] border border-purple-900/50 hover:border-purple-500/60 transition-all flex flex-col justify-between relative group shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold text-purple-400">
                      PHASE {step.stage}
                    </span>
                    <div className="p-2 rounded-lg bg-purple-950/60 text-purple-300 group-hover:text-purple-200 transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-1">
                    {step.name}
                  </h3>
                  <div className="text-xs font-mono text-purple-300/90 mb-3">
                    {step.focus}
                  </div>

                  <p className="text-xs text-purple-200/70 leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                {idx < gtmSteps.length - 1 && (
                  <div className="hidden md:block absolute -right-3.5 top-1/2 -translate-y-1/2 z-10">
                    <ArrowRight className="w-4 h-4 text-purple-600/60" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
