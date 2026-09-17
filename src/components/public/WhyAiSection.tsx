import React, { useState } from 'react';
import { 
  XCircle, 
  CheckCircle2, 
  ArrowRight, 
  Database, 
  Cpu, 
  TrendingUp, 
  Zap, 
  ShieldCheck, 
  Sparkles 
} from 'lucide-react';
import { Badge } from '../common/Badge';

export const WhyAiSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState(2);

  const transformationFlow = [
    { step: '01', title: 'DATA', icon: Database, desc: 'Real-time telemetry from cutting, sewing, inventory & QC' },
    { step: '02', title: 'AI', icon: Cpu, desc: 'Deep learning models trained on garment production patterns' },
    { step: '03', title: 'PREDICTION', icon: TrendingUp, desc: 'Anticipate bottlenecks & deadline risks 3–7 days ahead' },
    { step: '04', title: 'ACTION', icon: Zap, desc: 'Rebalance lines or match verified peer capacity instantly' },
    { step: '05', title: 'TRUST', icon: ShieldCheck, desc: 'Verifiable cryptographic audit logs for brand compliance' },
  ];

  return (
    <section id="ai-intelligence" className="py-24 bg-[#19042b] relative overflow-hidden">
      {/* Secondary anchor for why-shilpo */}
      <div id="why-shilpo" className="absolute -top-12 left-0" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <Badge variant="purple" dot>
            The Paradigm Shift
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            ERP should not only remember. <br />
            <span className="text-purple-300">It should predict.</span>
          </h2>
          <p className="text-purple-200/80 text-base sm:text-lg">
            Traditional manufacturing ERPs act like passive digital ledgers. <span className="font-bengali font-bold text-white">শিল্পAI ERP</span> transforms factory operations into a proactive, intelligent network.
          </p>
        </div>

        {/* Before / After Comparison Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          {/* Traditional ERP Card */}
          <div className="p-8 rounded-2xl bg-[#220638]/70 border border-purple-900/40 relative">
            <div className="flex items-center justify-between pb-4 border-b border-purple-900/40 mb-6">
              <div>
                <span className="text-xs font-mono text-purple-300/70 uppercase tracking-wider">LEGACY PARADIGM</span>
                <h3 className="text-xl font-bold text-slate-300">Traditional ERP</h3>
              </div>
              <span className="text-xs font-mono px-2.5 py-1 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20">
                Reactive & Static
              </span>
            </div>

            <ul className="space-y-4">
              {[
                { title: 'Records historical data', desc: 'Stores what was completed hours or days after the shift ends.' },
                { title: 'Reactive alerts', desc: 'Alerts appear after deadlines are already broken and air-freight penalties apply.' },
                { title: 'Manual QC & Paper Clipboards', desc: 'Defect sheets are manually tallied at shift-end with no visual pattern insights.' },
                { title: 'Spreadsheet analysis', desc: 'Planners spend hours wrestling fragmented Excel sheets across departments.' },
                { title: 'Manual subcontractor discovery', desc: 'Emergency work routed via informal telephone calls and unverified agents.' },
                { title: 'Limited predictive intelligence', desc: 'Zero automated foresight on future fabric delays or line balance issues.' },
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm">
                  <XCircle className="w-5 h-5 text-rose-500/70 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-purple-100 font-semibold">{item.title}</strong>
                    <p className="text-purple-300/70 text-xs mt-0.5">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* ShilpoAI ERP Card (Crisp White & Royal Purple Highlight Card) */}
          <div className="p-8 rounded-3xl bg-white border border-purple-200 text-slate-900 relative shadow-2xl shadow-purple-950/60 transform hover:-translate-y-1 transition-all duration-300">
            <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
              <span className="px-3.5 py-1 bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-700 text-white font-bold text-xs rounded-full shadow-lg shadow-purple-900/30">
                NEXT-GEN INTELLIGENCE
              </span>
            </div>

            <div className="flex items-center justify-between pb-4 border-b border-purple-100 mb-6">
              <div>
                <span className="text-xs font-mono font-bold text-purple-700 uppercase tracking-wider">AI-NATIVE OPERATING SYSTEM</span>
                <h3 className="text-2xl font-black text-slate-900 flex items-center gap-2 mt-0.5">
                  <span className="font-bengali text-purple-700">শিল্পAI</span> ERP
                </h3>
              </div>
              <span className="text-xs font-mono font-semibold px-3 py-1 rounded-full bg-purple-50 text-purple-800 border border-purple-200">
                Predictive & Connected
              </span>
            </div>

            <ul className="space-y-4">
              {[
                { title: 'Predicts deadline risk', desc: 'Calculates order delay probabilities days ahead using live line velocity.' },
                { title: 'Detects defect patterns', desc: 'Computer vision assisted QC identifies recurring stitch & shade anomalies.' },
                { title: 'Forecasts production risk', desc: 'Simulates 14-day line trajectories against target shipment dates.' },
                { title: 'Answers operational questions', desc: 'Conversational ShilpoAI Copilot gives instant operational diagnostics.' },
                { title: 'Finds verified capacity', desc: 'Privacy-preserving matchmaking taps idle peer factories securely.' },
                { title: 'Creates trusted production records', desc: 'Optional cryptographic event stream creates immutable proof of execution.' },
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm">
                  <div className="flex items-center justify-center w-5 h-5 rounded-full bg-purple-100 text-purple-600 shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-slate-900 font-bold">{item.title}</strong>
                    <p className="text-slate-600 text-xs mt-0.5 leading-relaxed">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Animated Transformation Flow Banner: DATA → AI → PREDICTION → ACTION → TRUST */}
        <div className="p-8 rounded-2xl bg-[#220638] border border-purple-900/40 shadow-2xl">
          <div className="text-center mb-8">
            <span className="text-xs font-mono text-purple-400 uppercase tracking-wider">
              CONTINUOUS INTELLIGENCE CYCLE
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
              From Raw Factory Signals to Trusted Execution
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 relative">
            {transformationFlow.map((item, idx) => {
              const Icon = item.icon;
              const isSelected = activeStep === idx;
              return (
                <div
                  key={item.step}
                  onClick={() => setActiveStep(idx)}
                  className={`p-4 rounded-xl cursor-pointer transition-all duration-200 border text-center relative ${
                    isSelected
                      ? 'bg-gradient-to-b from-[#330854] to-[#1c042e] border-purple-500 text-white shadow-lg shadow-purple-900/40'
                      : 'bg-[#1b032d]/60 border-purple-950/60 hover:border-purple-800/80 text-purple-300/70 hover:text-purple-200'
                  }`}
                >
                  <div className="flex items-center justify-center mb-3">
                    <div className={`p-2.5 rounded-lg ${isSelected ? 'bg-purple-600/30 text-purple-300 border border-purple-500/50' : 'bg-purple-950/70 text-purple-400'}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="text-[10px] font-mono text-purple-400">{item.step}</div>
                  <div className="font-bold text-sm tracking-wide mt-0.5 text-white">{item.title}</div>
                  <p className="text-[11px] text-purple-200/70 mt-2 leading-relaxed">{item.desc}</p>

                  {idx < transformationFlow.length - 1 && (
                    <div className="hidden sm:block absolute -right-3.5 top-1/2 -translate-y-1/2 z-10">
                      <ArrowRight className="w-4 h-4 text-purple-700" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
