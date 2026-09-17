import React, { useState } from 'react';
import { X, Send, CheckCircle2, Building2, Mail, User, Phone, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface PilotModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PilotModal: React.FC<PilotModalProps> = ({ isOpen, onClose }) => {
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

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      try {
        confetti({
          particleCount: 60,
          spread: 60,
          origin: { y: 0.5 },
          colors: ['#a855f7', '#7c3aed', '#6366f1'],
        });
      } catch (err) {
        // Safe fallback
      }
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-xl bg-white border border-slate-200/90 text-slate-900 rounded-3xl shadow-2xl shadow-purple-950/80 p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-slate-100 text-slate-500 hover:text-slate-800 hover:bg-slate-200 border border-slate-200 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mx-auto border border-purple-200">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Pilot Application Received</h3>
            <p className="text-xs text-slate-600">
              Thank you, <strong className="text-purple-700">{formData.fullName}</strong>. Our founding team will get in touch directly to initiate the pilot onboarding process.
            </p>
            <button
              onClick={onClose}
              className="mt-4 px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md shadow-purple-900/30 cursor-pointer"
            >
              Close Window
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[11px] font-mono font-bold text-purple-700 uppercase bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                  Enterprise Factory Pilot Track
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                Request Pilot Access for Your Factory
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                Join the initial cohort of Bangladesh garment factories testing predictive AI operations.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="e.g. Tariq Ahmed"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-slate-50/70 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  Company / Factory *
                </label>
                <input
                  type="text"
                  required
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  placeholder="e.g. Elegance Apparel Ltd."
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-slate-50/70 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  Work Email *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="tariq@factory.com"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-slate-50/70 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  Phone / WhatsApp *
                </label>
                <input
                  type="text"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+880 1711 XXXXXX"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-slate-50/70 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  Role
                </label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-slate-50/70 text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
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
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  Factory Lines
                </label>
                <select
                  value={formData.factorySize}
                  onChange={(e) => setFormData({ ...formData, factorySize: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-slate-50/70 text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                >
                  <option>1–10 Lines</option>
                  <option>10–30 Lines</option>
                  <option>30–60 Lines</option>
                  <option>60+ Lines</option>
                  <option>Non-Factory</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                Message / Production Goals
              </label>
              <textarea
                rows={2}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Specific operational priorities..."
                className="w-full p-2.5 text-xs rounded-xl border border-slate-300 bg-slate-50/70 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-purple-900/40 transition-all cursor-pointer disabled:opacity-50"
            >
              {loading ? <span>Submitting...</span> : <><span>Submit Pilot Request</span><Send className="w-4 h-4" /></>}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
