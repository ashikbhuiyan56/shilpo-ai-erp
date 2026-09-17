import React, { useState } from 'react';
import { 
  Send, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  Building2, 
  Mail, 
  User, 
  Phone, 
  Layers, 
  MessageSquare,
  ShieldCheck,
  Play
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Badge } from '../common/Badge';

interface PilotSectionProps {
  onOpenDemo: () => void;
}

export const PilotSection: React.FC<PilotSectionProps> = ({ onOpenDemo }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    role: 'Factory Owner / Managing Director',
    email: '',
    phone: '',
    factorySize: '10–30 Lines (500–1,500 workers)',
    interestedModules: ['Production Monitoring', 'AI Risk & Defect Intelligence', 'Capacity Matching'],
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const availableModules = [
    'Merchandising & Costing',
    'Procurement & BOM',
    'Inventory & Shade Lots',
    'Production Monitoring',
    'AI Risk & Defect Intelligence',
    'Capacity Matching Network',
    'Trust & Cryptographic Audit',
    'Compliance Payroll',
  ];

  const handleModuleToggle = (mod: string) => {
    setFormData((prev) => ({
      ...prev,
      interestedModules: prev.interestedModules.includes(mod)
        ? prev.interestedModules.filter((m) => m !== mod)
        : [...prev.interestedModules, mod],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#a855f7', '#7c3aed', '#6366f1', '#ffffff'],
        });
      } catch (err) {
        // Safe fallback
      }
    }, 600);
  };

  return (
    <section id="pilot" className="py-24 bg-gradient-to-b from-[#19042b] via-[#200538] to-[#19042b] border-t border-purple-900/30 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Final CTA Headline Banner */}
        <div className="rounded-3xl bg-gradient-to-br from-[#330854]/70 via-[#23053b] to-[#150325] border border-purple-600/40 p-8 sm:p-14 shadow-2xl mb-20 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />
          
          <div className="max-w-4xl mx-auto space-y-6">
            <Badge variant="purple" dot>
              Enterprise Deployment Track
            </Badge>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              We are building the operating system for a smarter, more transparent, and more scalable Bangladesh apparel industry.
            </h2>

            <p className="text-purple-200/80 text-base sm:text-lg max-w-2xl mx-auto">
              Join forward-looking garment manufacturers, global buyers, and industry advisors participating in our pilot deployment track.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <button
                onClick={() => onOpenDemo()}
                className="px-6 py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-purple-700 via-purple-600 to-indigo-700 hover:from-purple-600 hover:to-indigo-600 transition-all flex items-center gap-2 shadow-lg shadow-purple-900/50 cursor-pointer text-sm sm:text-base"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Explore the Product Demo</span>
              </button>

              <a
                href="#pilot-form"
                className="px-6 py-3.5 rounded-xl font-semibold text-purple-200 bg-purple-950/60 hover:bg-purple-900/60 border border-purple-700/50 transition-all flex items-center gap-2 text-sm sm:text-base"
              >
                <span>Request a Pilot</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            <div className="text-xs font-mono text-purple-300/70 pt-2">
              শিল্পAI ERP · Bangladesh RMG Intelligence Suite · Pre-Seed Stage
            </div>
          </div>
        </div>

        {/* Pilot Request Form Area */}
        <div id="pilot-form" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              <Badge variant="purple" dot>
                Partner Program
              </Badge>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                Request Early Pilot Access
              </h3>
              <p className="text-purple-200/80 text-sm leading-relaxed">
                We are currently selecting 2–3 export garment facilities in Dhaka, Gazipur, and Savar for high-touch deployment of our predictive line balancing and AI defect detection suite.
              </p>
            </div>

            <div className="space-y-4 pt-2">
              <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-900/50 flex items-start gap-3.5">
                <ShieldCheck className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-white">Zero Disruption Onboarding</div>
                  <p className="text-xs text-purple-200/70 mt-0.5">
                    Operates alongside your existing legacy setup or spreadsheets during the 4-week benchmark phase.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-900/50 flex items-start gap-3.5">
                <Sparkles className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-white">Direct Engineering & Operations Support</div>
                  <p className="text-xs text-purple-200/70 mt-0.5">
                    On-site workflow mapping by our industrial engineering and AI platform co-founders.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column Form (Crisp White Card with Royal Purple Accents) */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-9 rounded-3xl bg-white border border-slate-200/90 text-slate-900 shadow-2xl shadow-purple-950/70 relative">
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mx-auto border border-purple-200">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-2xl font-bold text-slate-900">
                    Pilot Request Received!
                  </h4>
                  <p className="text-sm text-slate-600 max-w-md mx-auto">
                    Thank you, <span className="text-purple-700 font-semibold">{formData.fullName}</span>. Our founding team will review your factory parameters and schedule an operational discovery session within 24 hours.
                  </p>
                  <div className="pt-4">
                    <button
                      onClick={() => setSubmitted(false)}
                      className="px-5 py-2.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-xs font-bold text-purple-700 border border-purple-200 transition-colors"
                    >
                      Submit Another Response
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="mb-2">
                    <h4 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                      Factory Pilot Application
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1">
                      Direct engineering onboarding for active Bangladesh garment facilities.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Full Name *
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-purple-500 absolute left-3 top-3" />
                        <input
                          type="text"
                          required
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          placeholder="e.g. Tariq Ahmed"
                          className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent bg-slate-50/70 text-slate-900 placeholder-slate-400"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Company / Factory Name *
                      </label>
                      <div className="relative">
                        <Building2 className="w-4 h-4 text-purple-500 absolute left-3 top-3" />
                        <input
                          type="text"
                          required
                          value={formData.companyName}
                          onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                          placeholder="e.g. Apex Apparels Ltd."
                          className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent bg-slate-50/70 text-slate-900 placeholder-slate-400"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Work Email *
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-purple-500 absolute left-3 top-3" />
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="tariq@factory.com"
                          className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent bg-slate-50/70 text-slate-900 placeholder-slate-400"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Phone Number *
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-purple-500 absolute left-3 top-3" />
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+880 1711 XXXXXX"
                          className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent bg-slate-50/70 text-slate-900 placeholder-slate-400"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Stakeholder Category
                      </label>
                      <select
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent bg-slate-50/70 text-slate-900"
                      >
                        <option>Factory Owner / Managing Director</option>
                        <option>Garment Brand / Buyer</option>
                        <option>Apparel Supplier / Buying House</option>
                        <option>Investor (VC / Angel)</option>
                        <option>Industry Advisor / BGMEA</option>
                        <option>Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Factory Size / Lines
                      </label>
                      <select
                        value={formData.factorySize}
                        onChange={(e) => setFormData({ ...formData, factorySize: e.target.value })}
                        className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent bg-slate-50/70 text-slate-900"
                      >
                        <option>1–10 Lines (&lt; 500 workers)</option>
                        <option>10–30 Lines (500–1,500 workers)</option>
                        <option>30–60 Lines (1,500–3,500 workers)</option>
                        <option>60+ Lines (3,500+ workers / Composite)</option>
                        <option>Non-Factory / Partner</option>
                      </select>
                    </div>
                  </div>

                  {/* Modules of interest */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Interested Modules
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {availableModules.map((mod) => {
                        const isChecked = formData.interestedModules.includes(mod);
                        return (
                          <button
                            key={mod}
                            type="button"
                            onClick={() => handleModuleToggle(mod)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                              isChecked
                                ? 'bg-purple-600 text-white shadow-sm border border-purple-600'
                                : 'bg-slate-100 text-slate-700 border border-slate-200 hover:border-purple-300'
                            }`}
                          >
                            {mod}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Operational Note or Question
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us about your factory lines, main buyers, or primary bottleneck challenges..."
                      className="w-full p-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent bg-slate-50/70 text-xs sm:text-sm text-slate-900 placeholder-slate-400 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-purple-900/40 transition-all cursor-pointer disabled:opacity-50 hover:-translate-y-0.5"
                  >
                    {loading ? (
                      <span>Submitting Request...</span>
                    ) : (
                      <>
                        <span>Request Pilot Access</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
