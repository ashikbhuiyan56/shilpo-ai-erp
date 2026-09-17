import React, { useState } from 'react';
import { 
  AlertTriangle, 
  Cpu, 
  Network, 
  Lock, 
  ShieldCheck, 
  ArrowRight, 
  Check, 
  ChevronRight,
  Clock,
  Sparkles
} from 'lucide-react';
import { Badge } from '../common/Badge';

export const HowItWorks: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      num: '01',
      action: 'DETECT',
      title: 'ERP spots a delay risk',
      tagline: 'Real-time telemetry ingestion',
      desc: 'The ERP monitors cutting speed, sewing output, and fabric arrival dates. A 3-day dye delay triggers an instant alert for Order #BD-2048.',
      icon: AlertTriangle,
      iconColor: 'text-amber-400',
      bgColor: 'bg-amber-500/10',
      borderColor: 'border-amber-500/30',
      sampleUI: {
        header: 'Order #BD-2048 Trigger',
        badge: '78% Delay Probability',
        detail: 'Target Ship: Sep 8 · Current Deficit: 18,000 units',
      },
    },
    {
      num: '02',
      action: 'FORECAST',
      title: 'AI explains what is missing and by when',
      tagline: 'Predictive bottleneck diagnosis',
      desc: 'ShilpoAI Copilot runs capacity simulations and calculates that Line 02 & 04 cannot bridge the gap without 2.4 days of shipment slippage.',
      icon: Cpu,
      iconColor: 'text-purple-300',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/30',
      sampleUI: {
        header: 'AI Impact Forecast',
        badge: '2.4 Days Estimated Slippage',
        detail: 'Recommendation: Offload 18,000 pcs to verified peer line',
      },
    },
    {
      num: '03',
      action: 'MATCH',
      title: 'Find verified idle capacity',
      tagline: 'Automated compatibility algorithm',
      desc: 'The matching engine queries verified peer factories in Gazipur/Savar with compatible machine setups (SMV 14.2 min, knit polo certified).',
      icon: Network,
      iconColor: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/30',
      sampleUI: {
        header: 'Partner Match Discovered',
        badge: '94% Match Compatibility',
        detail: 'Verified Partner #BD-017 has 18,000 units capacity in 3 days',
      },
    },
    {
      num: '04',
      action: 'PROTECT',
      title: 'Identity remains hidden until mutual consent',
      tagline: 'Privacy-preserving negotiation',
      desc: 'Buyer tech packs, pricing margins, and factory names remain shielded until both parties accept standard BGMEA escrow terms.',
      icon: Lock,
      iconColor: 'text-indigo-400',
      bgColor: 'bg-indigo-500/10',
      borderColor: 'border-indigo-500/30',
      sampleUI: {
        header: 'Shielded Agreement Room',
        badge: 'Zero Knowledge Protocol',
        detail: 'Mutual consent signed. Identities and direct contracts unlocked.',
      },
    },
    {
      num: '05',
      action: 'LOG',
      title: 'Create an audit trail for trust and compliance',
      tagline: 'Immutable execution validation',
      desc: 'Milestones (cutting, QC, transfer) are logged to the optional cryptographic trust ledger, giving brands 100% compliance transparency.',
      icon: ShieldCheck,
      iconColor: 'text-purple-300',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/30',
      sampleUI: {
        header: 'Anchor Confirmed',
        badge: 'Block #489201 Verified',
        detail: 'Tx Hash: 0x8f3c...abcd · Fully export compliance audit ready',
      },
    },
  ];

  return (
    <section id="how-it-works" className="py-24 bg-[#19042b] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <Badge variant="purple" dot>
            Predictive Execution Flow
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            How <span className="font-bengali text-purple-300">শিল্পAI</span> Works
          </h2>
          <p className="text-purple-200/80 text-base sm:text-lg">
            From the moment a delay risk forms to trusted delivery, every step is intelligent, automated, and verified.
          </p>
        </div>

        {/* Step Selector Tabs (Desktop / Mobile) */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-3 mb-10">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            const isCurrent = activeStep === idx;
            return (
              <button
                key={s.num}
                onClick={() => setActiveStep(idx)}
                className={`p-3.5 rounded-xl text-left transition-all border cursor-pointer ${
                  isCurrent
                    ? 'bg-gradient-to-b from-[#330854] to-[#1e0433] border-purple-500 shadow-lg shadow-purple-900/40'
                    : 'bg-[#1e0532]/60 border-purple-950/60 hover:border-purple-800/80 text-purple-300/70 hover:text-purple-200'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[11px] font-mono font-bold ${isCurrent ? 'text-purple-300' : 'text-purple-400/60'}`}>
                    STEP {s.num}
                  </span>
                  <div className={`p-1 rounded ${isCurrent ? 'bg-purple-600/30 text-purple-200' : 'bg-purple-950/70 text-purple-400'}`}>
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                </div>
                <div className="font-bold text-xs sm:text-sm text-white">{s.action}</div>
                <div className="text-[10px] text-purple-300/70 truncate mt-0.5">{s.title}</div>
              </button>
            );
          })}
        </div>

        {/* Active Step Showcase Card */}
        <div className="p-8 sm:p-10 rounded-2xl bg-gradient-to-br from-[#2a0746] via-[#1c042e] to-[#25063f] border border-purple-700/50 shadow-2xl relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Narrative */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-3xl sm:text-4xl font-black text-purple-300 font-mono">
                  {steps[activeStep].num}
                </span>
                <div className="h-6 w-[1px] bg-purple-700/50" />
                <span className="text-xs font-mono font-bold tracking-widest text-purple-300/70 uppercase">
                  {steps[activeStep].action} PROTOCOL
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-white">
                {steps[activeStep].title}
              </h3>

              <div className="text-xs font-mono text-purple-300 font-medium">
                {steps[activeStep].tagline}
              </div>

              <p className="text-purple-100/90 text-sm sm:text-base leading-relaxed">
                {steps[activeStep].desc}
              </p>

              <div className="pt-4 flex items-center gap-3">
                <button
                  onClick={() => setActiveStep((prev) => (prev + 1) % steps.length)}
                  className="px-4 py-2 rounded-lg bg-purple-600/20 hover:bg-purple-600/30 text-purple-200 border border-purple-500/40 text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <span>Next Step: {steps[(activeStep + 1) % steps.length].action}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Right Interactive Simulation Widget */}
            <div className="lg:col-span-5">
              <div className="p-5 rounded-xl bg-[#160226] border border-purple-900/50 shadow-inner space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-purple-900/40">
                  <span className="text-xs font-mono text-purple-300/70 font-semibold">
                    SIMULATION PREVIEW
                  </span>
                  <Badge variant="purple" dot>
                    Live Workflow Active
                  </Badge>
                </div>

                <div className="p-4 rounded-lg bg-purple-950/40 border border-purple-900/60 space-y-2">
                  <div className="text-xs font-semibold text-white">
                    {steps[activeStep].sampleUI.header}
                  </div>
                  <div className="inline-block text-[11px] font-mono px-2 py-0.5 rounded bg-purple-600/30 text-purple-200 border border-purple-500/40">
                    {steps[activeStep].sampleUI.badge}
                  </div>
                  <p className="text-xs text-purple-200/80 pt-1">
                    {steps[activeStep].sampleUI.detail}
                  </p>
                </div>

                <div className="text-[11px] font-mono text-purple-300/70 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                  <span>Interactive state synchronized with Command Center</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
