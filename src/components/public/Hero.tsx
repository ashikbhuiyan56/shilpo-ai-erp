import React, { useState } from 'react';
import { 
  ArrowRight, 
  Play, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  TrendingUp, 
  Cpu, 
  Network, 
  ShieldCheck, 
  Clock, 
  Layers, 
  Building2, 
  ChevronRight,
  Activity,
  Zap,
  PhoneCall,
  Calendar,
  Check,
  Send,
  Loader2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Badge } from '../common/Badge';
import { useOfficeTheme } from '../../context/ThemeContext';

interface HeroProps {
  onOpenDemo: (tab?: string) => void;
  onOpenPilot: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenDemo, onOpenPilot }) => {
  const { theme } = useOfficeTheme();
  const [activeSimulationTab, setActiveSimulationTab] = useState<'lines' | 'risk' | 'capacity'>('risk');

  // Lead Form State (SAP-Style White Card from user photo)
  const [formName, setFormName] = useState('');
  const [formMobile, setFormMobile] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formCompany, setFormCompany] = useState('');
  const [formZone, setFormZone] = useState('Gazipur Industrial Zone');
  const [formTurnover, setFormTurnover] = useState('15 - 40 Sewing Lines');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formMobile.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      try {
        confetti({
          particleCount: 75,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // ignore if not loaded
      }
    }, 800);
  };

  return (
    <section 
      className={`relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden transition-colors ${
        theme === 'purple'
          ? 'bg-gradient-to-b from-[#24053E] via-[#33075A] to-[#170329]'
          : theme === 'light'
          ? 'bg-gradient-to-b from-[#F8FAFC] via-[#F1F5F9] to-[#F8FAFC]'
          : theme === 'navy'
          ? 'bg-gradient-to-b from-[#071326] via-[#0A192F] to-[#071326]'
          : 'bg-gradient-to-b from-[#0C1322] via-[#0F172A] to-[#0C1322]'
      }`}
    >
      {/* Background Glows and Architectural Grid */}
      <div className="absolute inset-0 bg-official-grid opacity-30 pointer-events-none" />
      
      {/* Ambient Spotlights */}
      {theme === 'purple' ? (
        <>
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[450px] bg-gradient-to-tr from-purple-600/30 via-fuchsia-600/20 to-transparent rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-20 right-10 w-96 h-96 bg-purple-500/25 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-10 left-10 w-80 h-80 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
        </>
      ) : (
        <>
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[380px] bg-gradient-to-tr from-emerald-500/15 via-blue-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-20 right-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
        </>
      )}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* =========================================================================
            TOP 2-COLUMN HERO SECTION (SAP STYLE REFERENCE FROM USER IMAGE)
            ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-16">
          
          {/* Left Column: Core Value Proposition & Headings */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Top Pill / Partner Badge */}
            <div className="inline-flex items-center gap-2 p-1 pl-2.5 pr-4 rounded-full bg-white/10 border border-white/20 backdrop-blur-md shadow-inner text-white">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-400"></span>
              </span>
              <span className="text-xs font-semibold font-mono tracking-wider text-purple-200 uppercase">
                AI-NATIVE FACTORY OS · BUILT FOR BANGLADESH RMG
              </span>
            </div>

            {/* Main Title (High Impact Bold Typography) */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
              Deploy ShilpoAI ERP in 2 Weeks -{' '}
              <span className={theme === 'purple' ? 'text-purple-200' : 'bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent'}>
                Bangladesh's Most Trusted RMG OS
              </span>
            </h1>

            {/* Subtext & Bangladesh RMG Context */}
            <p className="text-base sm:text-lg text-purple-100/90 leading-relaxed font-normal">
              Built for Bangladesh's export garment hubs — Gazipur, Narayanganj &amp; Chattogram. See a live demo customized to your factory lines — zero commitment, pure factory clarity.
            </p>

            {/* 3 Pill Badges with Purple Checkmarks (Exactly like the reference image) */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/10 border border-white/20 text-xs sm:text-sm font-medium text-white backdrop-blur-md">
                <span className="flex items-center justify-center w-4 h-4 rounded-full bg-purple-600/60 text-purple-200">
                  <Check className="w-3 h-3" />
                </span>
                <span>Target go-live: 10-14 days</span>
              </div>

              <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/10 border border-white/20 text-xs sm:text-sm font-medium text-white backdrop-blur-md">
                <span className="flex items-center justify-center w-4 h-4 rounded-full bg-purple-600/60 text-purple-200">
                  <Check className="w-3 h-3" />
                </span>
                <span>Pilot-ready MVP</span>
              </div>

              <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/10 border border-white/20 text-xs sm:text-sm font-medium text-white backdrop-blur-md">
                <span className="flex items-center justify-center w-4 h-4 rounded-full bg-purple-600/60 text-purple-200">
                  <Check className="w-3 h-3" />
                </span>
                <span>Built on 8-module RMG architecture</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              <button
                onClick={() => onOpenDemo('overview')}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-white bg-purple-600 hover:bg-purple-500 transition-all transform hover:-translate-y-0.5 shadow-lg shadow-purple-900/40 hover:shadow-purple-700/50 text-sm sm:text-base cursor-pointer"
              >
                <Play className="w-4 h-4 fill-white text-white" />
                <span>Explore Live Interactive Demo</span>
              </button>

              <button
                onClick={onOpenPilot}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl font-semibold text-purple-200 bg-white/10 hover:bg-white/15 border border-white/20 transition-all text-sm sm:text-base cursor-pointer"
              >
                <span>Request Enterprise Pilot</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: Crisp White Lead Capture Form (Exact Reference Card from image) */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-2xl shadow-purple-950/80 border border-slate-200/80 text-slate-900 transition-all">
              {!isSubmitted ? (
                <>
                  <div className="mb-5">
                    <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                      Get a Free Demo in 24 Hours
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-normal">
                      Our RMG technical expert calls within 2 hours. No pressure, just actionable factory answers.
                    </p>
                  </div>

                  <form onSubmit={handleLeadSubmit} className="space-y-3.5">
                    {/* Name & Mobile in 2 cols */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formName}
                          onChange={(e) => setFormName(e.target.value)}
                          placeholder="Your full name"
                          className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent bg-slate-50/70"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Mobile *
                        </label>
                        <input
                          type="tel"
                          required
                          value={formMobile}
                          onChange={(e) => setFormMobile(e.target.value)}
                          placeholder="+880 1700-000000"
                          className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent bg-slate-50/70"
                        />
                      </div>
                    </div>

                    {/* Company Email & Company Name */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Company Email *
                        </label>
                        <input
                          type="email"
                          required
                          value={formEmail}
                          onChange={(e) => setFormEmail(e.target.value)}
                          placeholder="work@company.com"
                          className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent bg-slate-50/70"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Company / Organisation *
                        </label>
                        <input
                          type="text"
                          required
                          value={formCompany}
                          onChange={(e) => setFormCompany(e.target.value)}
                          placeholder="Apparel / Factory name"
                          className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent bg-slate-50/70"
                        />
                      </div>
                    </div>

                    {/* Industrial Zone & Capacity */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          State / Industrial Zone *
                        </label>
                        <select
                          value={formZone}
                          onChange={(e) => setFormZone(e.target.value)}
                          className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent bg-slate-50/70"
                        >
                          <option>Gazipur Industrial Zone</option>
                          <option>Narayanganj & Adamjee EPZ</option>
                          <option>Savar & Ashulia Belt</option>
                          <option>Chattogram & DEPZ</option>
                          <option>Dhaka & Tejgaon Urban</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Total Sewing Lines / Capacity *
                        </label>
                        <select
                          value={formTurnover}
                          onChange={(e) => setFormTurnover(e.target.value)}
                          className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent bg-slate-50/70"
                        >
                          <option>1 - 10 Sewing Lines</option>
                          <option>15 - 40 Sewing Lines</option>
                          <option>40 - 80 Sewing Lines</option>
                          <option>80+ Mega Factory Lines</option>
                        </select>
                      </div>
                    </div>

                    {/* Submit Button in Royal Purple */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3.5 px-4 rounded-xl font-bold text-white bg-gradient-to-r from-purple-700 via-purple-600 to-indigo-700 hover:from-purple-600 hover:to-indigo-600 transition-all shadow-lg shadow-purple-600/30 flex items-center justify-center gap-2 cursor-pointer text-sm sm:text-base"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Processing Request...</span>
                          </>
                        ) : (
                          <>
                            <span>Submit — Get a Response in 2 Hours</span>
                            <ArrowRight className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </div>

                    {/* Trust Footnote */}
                    <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 font-mono pt-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-purple-600" />
                      <span>Zero spam guarantee · Enterprise NDA secured</span>
                    </div>
                  </form>
                </>
              ) : (
                <div className="py-8 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h4 className="text-xl font-bold text-slate-900">Request Confirmed!</h4>
                  <p className="text-xs text-slate-600 max-w-xs mx-auto">
                    Thank you <span className="font-semibold">{formName}</span>. Our lead Bangladesh RMG specialist is preparing your tailored factory line analysis and will call you at <span className="font-mono font-semibold">{formMobile}</span>.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="text-xs text-purple-700 font-semibold underline underline-offset-2 pt-2 cursor-pointer"
                  >
                    Submit another request
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* =========================================================================
            INTERACTIVE VISUALIZATION & SIMULATED COCKPIT
            ========================================================================= */}
        <div className="mt-8 relative">
          {/* Glass Card Container */}
          <div className="relative rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/95 border border-slate-700/70 shadow-2xl shadow-black/80 overflow-hidden backdrop-blur-xl">
            {/* Top Bar of the Visual Cockpit */}
            <div className="flex flex-wrap items-center justify-between px-5 py-3.5 border-b border-slate-800/90 bg-slate-950/60">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-purple-500/80" />
                </div>
                <div className="h-4 w-[1px] bg-slate-800 mx-1" />
                <span className="text-xs font-mono font-medium text-slate-300 flex items-center gap-2">
                  <span className="font-bengali text-purple-400 font-bold">শিল্পAI</span>
                  <span>Predictive Intelligence Engine</span>
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20 font-mono">
                  LIVE TELEMETRY (SIMULATED)
                </span>
              </div>

              {/* Simulation Selector */}
              <div className="flex items-center gap-1 mt-2 sm:mt-0 bg-slate-900 p-1 rounded-lg border border-slate-800">
                <button
                  onClick={() => setActiveSimulationTab('risk')}
                  className={`px-2.5 py-1 rounded text-xs font-medium transition-all ${
                    activeSimulationTab === 'risk'
                      ? 'bg-purple-600/30 text-purple-200 border border-purple-500/40'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Risk Center
                </button>
                <button
                  onClick={() => setActiveSimulationTab('lines')}
                  className={`px-2.5 py-1 rounded text-xs font-medium transition-all ${
                    activeSimulationTab === 'lines'
                      ? 'bg-purple-600/30 text-purple-200 border border-purple-500/40'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Sewing Lines
                </button>
                <button
                  onClick={() => setActiveSimulationTab('capacity')}
                  className={`px-2.5 py-1 rounded text-xs font-medium transition-all ${
                    activeSimulationTab === 'capacity'
                      ? 'bg-purple-600/30 text-purple-200 border border-purple-500/40'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Capacity Match
                </button>
              </div>
            </div>

            {/* Inner Interactive Board */}
            <div className="p-5 sm:p-7 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Column: Main Telemetry / Line Grid */}
              <div className="lg:col-span-8 space-y-5">
                {/* Metric Summary Ribbon */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                    <div className="text-[11px] font-mono text-slate-400">DAILY OUTPUT</div>
                    <div className="text-xl font-bold text-white mt-1">12,480 <span className="text-xs font-normal text-slate-400">pcs</span></div>
                    <div className="text-[10px] text-purple-400 flex items-center gap-1 mt-0.5">
                      <TrendingUp className="w-3 h-3" /> 94.2% SMV Target
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                    <div className="text-[11px] font-mono text-slate-400">AT-RISK ORDERS</div>
                    <div className="text-xl font-bold text-amber-400 mt-1">1 <span className="text-xs font-normal text-slate-400">of 5 active</span></div>
                    <div className="text-[10px] text-amber-300/80 mt-0.5">Order #BD-2048 (78% Risk)</div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                    <div className="text-[11px] font-mono text-slate-400">QC DEFECT RATE</div>
                    <div className="text-xl font-bold text-purple-400 mt-1">1.48%</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">Below 2.0% AQL Standard</div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                    <div className="text-[11px] font-mono text-slate-400">MATCHABLE CAPACITY</div>
                    <div className="text-xl font-bold text-purple-300 mt-1">80k <span className="text-xs font-normal text-slate-400">units</span></div>
                    <div className="text-[10px] text-purple-300 mt-0.5">4 Peer Factories Ready</div>
                  </div>
                </div>

                {/* Main Dynamic View Area */}
                {activeSimulationTab === 'risk' && (
                  <div className="p-4 sm:p-5 rounded-xl bg-slate-950/80 border border-rose-500/30 relative overflow-hidden">
                    <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-800">
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 rounded-lg bg-rose-500/20 text-rose-400 border border-rose-500/40">
                          <AlertTriangle className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-mono text-rose-300 font-semibold flex items-center gap-2">
                            <span>PREDICTIVE DELAY ALERT</span>
                            <span className="text-[10px] px-1.5 py-0.2 rounded bg-rose-900/40 text-rose-200">HIGH PRIORITY</span>
                          </div>
                          <div className="text-sm font-bold text-white">Order #BD-2048 · Organic Cotton Polo (45,000 pcs)</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-slate-400 font-mono">Calculated Delay Risk</div>
                        <div className="text-2xl font-black text-rose-400 font-mono">78%</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 py-3 text-xs">
                      <div className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/80">
                        <div className="text-slate-400">Root Cause Detected:</div>
                        <div className="font-medium text-slate-200 mt-1">Fabric Dye-Lot delay (3 days) + Line 02 capacity deficit.</div>
                      </div>
                      <div className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/80">
                        <div className="text-slate-400">Shipment Timeline Impact:</div>
                        <div className="font-medium text-amber-300 mt-1">2.4 Days Behind Nordic Delivery Cutoff (Sep 8).</div>
                      </div>
                      <div className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/80">
                        <div className="text-slate-400">AI Recommendation:</div>
                        <div className="font-medium text-purple-300 mt-1">Allocate 18,000 units to Verified Partner #BD-017.</div>
                      </div>
                    </div>

                    {/* Action Bar */}
                    <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
                      <div className="text-xs text-slate-400 font-mono flex items-center gap-1.5">
                        <Zap className="w-3.5 h-3.5 text-purple-400" />
                        <span>Action saves <strong className="text-purple-300">2.4 days</strong> & eliminates brand chargebacks</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onOpenDemo('capacity')}
                          className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-purple-700 to-indigo-700 text-white font-semibold text-xs hover:from-purple-600 hover:to-indigo-600 transition-colors flex items-center gap-1 shadow-md shadow-purple-900/40 cursor-pointer"
                        >
                          <span>Activate Verified Capacity</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {activeSimulationTab === 'lines' && (
                  <div className="space-y-2">
                    <div className="text-xs font-mono text-slate-400 flex justify-between items-center px-1">
                      <span>ACTIVE SEWING LINES (GAZIPUR UNIT 2)</span>
                      <span>EFFICIENCY (SMV)</span>
                    </div>
                    {[
                      { name: 'Line 01 (Woven)', order: 'BD-2051', eff: 95, target: '160/hr', status: 'Running', color: 'purple' },
                      { name: 'Line 02 (Knit Polo)', order: 'BD-2048', eff: 76, target: '220/hr', status: 'Bottleneck', color: 'rose' },
                      { name: 'Line 03 (Woven)', order: 'BD-2051', eff: 97, target: '175/hr', status: 'Running', color: 'purple' },
                      { name: 'Line 04 (Knit Polo)', order: 'BD-2048', eff: 82, target: '220/hr', status: 'Running', color: 'amber' },
                    ].map((line, idx) => (
                      <div key={idx} className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/70 border border-slate-800 text-xs">
                        <div className="flex items-center gap-3">
                          <div className={`w-2 h-2 rounded-full ${line.color === 'purple' ? 'bg-purple-400' : line.color === 'rose' ? 'bg-rose-400 animate-pulse' : 'bg-amber-400'}`} />
                          <div>
                            <span className="font-semibold text-white">{line.name}</span>
                            <span className="text-slate-400 ml-2">Order #{line.order}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="font-mono text-slate-300">{line.target}</span>
                          <div className="w-24 bg-slate-800 h-2 rounded-full overflow-hidden">
                            <div className={`h-full ${line.color === 'rose' ? 'bg-rose-500' : line.color === 'amber' ? 'bg-amber-500' : 'bg-purple-500'}`} style={{ width: `${line.eff}%` }} />
                          </div>
                          <span className="font-mono font-bold text-white w-10 text-right">{line.eff}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeSimulationTab === 'capacity' && (
                  <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-slate-300">ANONYMIZED MATCH FOUND</span>
                      <Badge variant="purple" dot>94% Match Compatibility</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-slate-900 border border-slate-800">
                      <div>
                        <div className="text-xs font-bold text-white">Verified Partner #BD-017</div>
                        <div className="text-[11px] text-slate-400">Gazipur Industrial Zone · Knitwear Specialized · BGMEA Verified</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold text-purple-400 font-mono">18,000 Units</div>
                        <div className="text-[10px] text-slate-400">Available in 3 Days</div>
                      </div>
                    </div>
                    <div className="text-[11px] text-slate-400 font-mono bg-slate-900/40 p-2 rounded border border-slate-800/60">
                      🔒 Privacy Layer: Factory identity remains cryptographically shielded until mutual agreement.
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column: AI Assistant Micro-Card & Audit Feed */}
              <div className="lg:col-span-4 space-y-4">
                {/* AI Assistant Chat Preview */}
                <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center">
                        <Sparkles className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-xs font-bold text-white font-bengali">ShilpoAI Copilot</span>
                    </div>
                    <span className="text-[10px] font-mono text-purple-400">ONLINE</span>
                  </div>

                  <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-xs space-y-2">
                    <div className="text-slate-400 font-mono text-[10px]">OPERATIONAL QUERY:</div>
                    <p className="text-slate-200 italic">"Why is Order #BD-2048 delayed?"</p>
                    <div className="pt-1.5 border-t border-slate-800/80 text-[11px] text-purple-300">
                      ⚡ <strong>AI Diagnosis:</strong> 3-day fabric delay on dyed single jersey + Line 02 operating at 76.4% SMV. Recommended capacity offload saves 2.4 days.
                    </div>
                  </div>

                  <button
                    onClick={() => onOpenDemo('copilot')}
                    className="w-full py-2 rounded-lg bg-slate-800 hover:bg-purple-900/40 text-slate-200 hover:text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>Open Full Copilot</span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                  </button>
                </div>

                {/* Audit Trail Stamp */}
                <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
                    <ShieldCheck className="w-4 h-4 text-purple-400" />
                    <span>Trust & Verification Node</span>
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono break-all bg-slate-950 p-2 rounded border border-slate-800/80">
                    <span className="text-slate-500">Latest Tx: </span>
                    <span className="text-purple-400">0x8f3c...abcd</span>
                    <div className="text-[10px] text-slate-400 mt-1">Fabric Lot #9821 QC Verified · Block #489201</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Demo Notice Banner */}
            <div className="px-5 py-2.5 bg-slate-950 border-t border-slate-800/80 flex flex-wrap items-center justify-between text-[11px] text-slate-400 font-mono">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-purple-400" />
                <span>Simulation Environment: Sample Bangladesh Export Garment Factory Data</span>
              </span>
              <button
                onClick={() => onOpenDemo('overview')}
                className="text-purple-400 hover:text-purple-300 font-semibold underline underline-offset-2 flex items-center gap-1 cursor-pointer"
              >
                Launch Complete Interactive Workspace →
              </button>
            </div>
          </div>

          {/* Floating Highlight Cards around the Dashboard */}
          <div className="hidden xl:flex absolute -top-5 -left-6 bg-slate-900/95 border border-purple-500/40 p-3.5 rounded-xl shadow-2xl backdrop-blur-md items-center gap-3 animate-bounce duration-1000">
            <div className="p-2 rounded-lg bg-purple-500/20 text-purple-400">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">2.4 Days Saved</div>
              <div className="text-[10px] text-slate-400">Via Verified Peer Matching</div>
            </div>
          </div>

          <div className="hidden xl:flex absolute -bottom-5 -right-6 bg-slate-900/95 border border-blue-500/40 p-3.5 rounded-xl shadow-2xl backdrop-blur-md items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">Zero Subcontracting Leakage</div>
              <div className="text-[10px] text-slate-400">Tamper-evident verification</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
