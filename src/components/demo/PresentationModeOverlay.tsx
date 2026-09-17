import React, { useState, useEffect } from 'react';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause, 
  Trophy, 
  Sparkles, 
  ShieldCheck, 
  Network, 
  Cpu, 
  Activity,
  ArrowRight
} from 'lucide-react';
import { DemoTab } from '../../types';

interface PresentationModeOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTab: (tab: DemoTab) => void;
}

export const PresentationModeOverlay: React.FC<PresentationModeOverlayProps> = ({
  isOpen,
  onClose,
  onSelectTab,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const slides = [
    {
      tab: 'overview' as DemoTab,
      category: 'UNIFIED EXECUTION LAYER',
      title: 'Real-Time Factory Command Center',
      tagline: 'Moving Bangladesh RMG from disconnected silos to an intelligent data fabric.',
      pitchPoint: 'Live telemetry across 8 active sewing lines, tracking SMV line balances, order velocities, and real-time factory health.',
      stat: '96.4% Factory Health',
      color: 'emerald',
      icon: Activity,
    },
    {
      tab: 'risk-center' as DemoTab,
      category: 'PREDICTION LAYER',
      title: 'Multi-Dimensional Delay Prediction',
      tagline: 'Forecasting order slippage 14 days in advance instead of reacting at the shipping gate.',
      pitchPoint: 'Order #BD-2048 identified with 78% delay risk due to fabric arrival lags. Recommends proactive capacity allocation.',
      stat: '2.4 Days Saved',
      color: 'rose',
      icon: Cpu,
    },
    {
      tab: 'quality' as DemoTab,
      category: 'EDGE VISION INTELLIGENCE',
      title: 'AI-Powered Garment Defect Inspection',
      tagline: 'Stopping defects at the needle before bundles reach packing cartons.',
      pitchPoint: 'Edge computer vision model classifies stitch irregularities at 94% confidence, reducing rework costs and ensuring AQL 1.5 compliance.',
      stat: '1.48% Defect Rate',
      color: 'blue',
      icon: Sparkles,
    },
    {
      tab: 'capacity' as DemoTab,
      category: 'NETWORK TRANSACTIONS',
      title: 'Verified Capacity Matching Network',
      tagline: 'Turning hidden idle factory capacity into a trusted, privacy-preserving production network.',
      pitchPoint: 'Instantly matches 18,000 units of deficit with verified peer factories in Gazipur in <4 hours vs 7 days through opaque brokers.',
      stat: '80k Units Buffer',
      color: 'emerald',
      icon: Network,
    },
    {
      tab: 'copilot' as DemoTab,
      category: 'OPERATIONAL AI ASSISTANT',
      title: 'ShilpoAI Conversational Copilot',
      tagline: 'Empowering factory floor managers with natural-language industrial engineering insights.',
      pitchPoint: 'Queries line bottlenecks, analyzes root-cause defect clusters, and generates structured action cards in seconds.',
      stat: '< 2s Response Time',
      color: 'purple',
      icon: Sparkles,
    },
    {
      tab: 'trust' as DemoTab,
      category: 'TRUST & VERIFICATION',
      title: 'Cryptographic Audit & ESG Verification',
      tagline: 'Building verifiable brand trust with tamper-resistant production proofs.',
      pitchPoint: 'Optional blockchain-backed milestone hashing gives international fashion buyers immutable chain-of-custody proof.',
      stat: '100% Audit Readiness',
      color: 'amber',
      icon: ShieldCheck,
    },
  ];

  useEffect(() => {
    if (!isOpen || !isPlaying) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isOpen, isPlaying, slides.length]);

  if (!isOpen) return null;

  const current = slides[currentSlide];
  const Icon = current.icon;

  const handleGoToView = () => {
    onSelectTab(current.tab);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex flex-col justify-between p-6 sm:p-12 animate-fadeIn">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-50 text-[#087F6A] border border-emerald-200 shadow-2xs">
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-mono font-bold text-[#087F6A] tracking-wider">
              EXECUTIVE PRODUCT SHOWCASE & STRATEGY PITCH
            </div>
            <div className="text-sm font-bold text-white flex items-center gap-1.5">
              <span className="font-bengali text-emerald-300">শিল্পAI</span>
              <span className="text-slate-200">ERP Product Showcase</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-2.5 rounded-xl bg-white/90 hover:bg-white text-[#334155] border border-white/40 shadow-xs transition-colors cursor-pointer"
            title={isPlaying ? 'Pause auto-slide' : 'Play auto-slide'}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>
          <button
            onClick={onClose}
            className="p-2.5 rounded-xl bg-white/90 hover:bg-white text-[#334155] border border-white/40 shadow-xs transition-colors cursor-pointer"
            title="Exit Presentation Mode"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Slide Card */}
      <div className="max-w-3xl w-full mx-auto text-center space-y-6 my-auto p-8 sm:p-10 rounded-3xl bg-white border border-[#E2E8F0] shadow-2xl">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-mono font-bold text-[#065F46]">
          <Icon className="w-4 h-4 text-[#087F6A]" />
          <span>{current.category}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-black text-[#172033] tracking-tight leading-tight">
          {current.title}
        </h1>

        <p className="text-base sm:text-lg text-[#64748B] font-medium max-w-xl mx-auto">
          {current.tagline}
        </p>

        <div className="p-5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] max-w-xl mx-auto text-left space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-[#64748B] uppercase">Core Capability</span>
            <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-[#065F46] border border-emerald-200">
              {current.stat}
            </span>
          </div>
          <p className="text-sm text-[#334155] leading-relaxed">
            {current.pitchPoint}
          </p>
        </div>

        <div className="pt-2">
          <button
            onClick={handleGoToView}
            className="px-6 py-3 rounded-xl bg-[#087F6A] hover:bg-[#066653] text-white font-bold text-sm flex items-center gap-2 mx-auto shadow-xs transition-all cursor-pointer"
          >
            <span>Interact with this Feature Live</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Bottom Carousel Controls & Step Indicator */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-6 max-w-4xl mx-auto w-full">
        <div className="flex items-center gap-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setCurrentSlide(idx);
                setIsPlaying(false);
              }}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                currentSlide === idx ? 'w-8 bg-emerald-400' : 'w-2 bg-white/40 hover:bg-white/70'
              }`}
            />
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
              setIsPlaying(false);
            }}
            className="p-2 rounded-lg bg-white/80 hover:bg-white text-[#334155] border border-white/40 transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-xs font-mono text-white/90 px-2 font-semibold">
            {currentSlide + 1} / {slides.length}
          </span>
          <button
            onClick={() => {
              setCurrentSlide((prev) => (prev + 1) % slides.length);
              setIsPlaying(false);
            }}
            className="p-2 rounded-lg bg-white/80 hover:bg-white text-[#334155] border border-white/40 transition-colors cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
