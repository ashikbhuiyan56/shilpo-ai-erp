import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Menu, 
  X, 
  ArrowRight, 
  Play, 
  ShieldCheck, 
  Cpu, 
  Network, 
  Layers, 
  TrendingUp, 
  Info
} from 'lucide-react';
import { Badge } from '../common/Badge';
import { useOfficeTheme } from '../../context/ThemeContext';

interface NavbarProps {
  onOpenDemo: (initialTab?: string) => void;
  onOpenPilot: () => void;
  onStartPresentation?: () => void;
  onOpenPresentation?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenDemo,
  onOpenPilot,
  onStartPresentation,
  onOpenPresentation,
}) => {
  const { theme } = useOfficeTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handlePresentation = onStartPresentation || onOpenPresentation;

  const navLinks = [
    { label: 'Product', href: '#product' },
    { label: 'AI Intelligence', href: '#ai-intelligence' },
    { label: 'Capacity Network', href: '#capacity-network' },
    { label: 'Trust Layer', href: '#trust-layer' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Market', href: '#market' },
    { label: 'Why শিল্পAI', href: '#why-shilpo' },
    { label: 'About', href: '#team' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'glass-nav shadow-2xl py-2.5'
          : theme === 'purple'
          ? 'bg-[#1e0534]/85 backdrop-blur-md border-b border-purple-500/20 py-3'
          : theme === 'slate'
          ? 'bg-[#0b1120]/85 backdrop-blur-md border-b border-slate-700/30 py-3'
          : theme === 'navy'
          ? 'bg-[#071326]/85 backdrop-blur-md border-b border-sky-900/30 py-3'
          : 'bg-white/85 backdrop-blur-md border-b border-slate-200/80 py-3'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo Brand */}
          <a
            href="#"
            className="flex items-center gap-3 group focus:outline-none"
            aria-label="শিল্পAI ERP Homepage"
          >
            <div className={`relative flex items-center justify-center w-9 h-9 rounded-lg font-bold text-base transition-all ${
              theme === 'purple'
                ? 'bg-purple-600 text-white shadow-[0_0_20px_rgba(168,85,247,0.4)] group-hover:bg-purple-500'
                : 'bg-emerald-500 text-black shadow-[0_0_20px_rgba(16,185,129,0.35)] group-hover:bg-emerald-400'
            }`}>
              <span className="font-bengali">শি</span>
              <div className={`absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full animate-ping opacity-75 ${
                theme === 'purple' ? 'bg-purple-400' : 'bg-emerald-400'
              }`} />
              <div className={`absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full ${
                theme === 'purple' ? 'bg-purple-300' : 'bg-emerald-300'
              }`} />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-white flex items-center gap-1">
                <span className="font-bengali">শিল্প</span>
                <span>AI</span>
                <span className={`font-bold ml-0.5 ${theme === 'purple' ? 'text-purple-400' : 'text-emerald-500'}`}>ERP</span>
              </span>
              <span className="text-[10px] text-gray-400 font-mono tracking-wider">
                BANGLADESH RMG INTELLIGENCE
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 bg-white/5 p-1 rounded-full border border-white/10 backdrop-blur-xl">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs font-medium text-gray-300 hover:text-white px-3.5 py-1.5 rounded-full hover:bg-white/10 transition-all"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop Actions on the Right (Only visible on lg screens and up) */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => onOpenDemo()}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                theme === 'purple'
                  ? 'bg-purple-600 text-white hover:bg-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.4)]'
                  : 'bg-emerald-500 text-black hover:bg-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.4)]'
              }`}
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>View Demo</span>
            </button>

            <button
              onClick={onOpenPilot}
              className={`inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white border rounded-lg backdrop-blur-md transition-all ${
                theme === 'purple'
                  ? 'border-purple-400/30 hover:bg-purple-500/20'
                  : 'border-white/20 hover:bg-white/10'
              }`}
            >
              <span>Pilot Request</span>
              <ArrowRight className="w-3.5 h-3.5 text-gray-400" />
            </button>
          </div>

          {/* Mobile Actions Button Group (Visible ONLY below lg) */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => onOpenDemo()}
              className="px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-500 text-black shadow-[0_0_15px_rgba(16,185,129,0.3)] cursor-pointer"
            >
              Demo
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:text-white backdrop-blur-md cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className={`lg:hidden border-b px-4 pt-3 pb-6 mt-3 space-y-3 backdrop-blur-2xl ${
          theme === 'purple'
            ? 'bg-[#1b032d]/98 border-purple-500/30 text-white'
            : theme === 'light'
            ? 'bg-white/98 border-slate-200 text-slate-900'
            : 'bg-slate-900/98 border-white/10 text-white'
        }`}>
          <div className="grid grid-cols-2 gap-2 pt-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-gray-300 hover:text-white py-2 px-2.5 rounded-lg hover:bg-white/10 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="pt-3 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDemo();
              }}
              className="w-full py-2.5 rounded-lg text-sm font-bold bg-emerald-500 text-black hover:bg-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.4)] flex items-center justify-center gap-2"
            >
              <Play className="w-4 h-4 fill-black" /> View Interactive Demo
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenPilot();
              }}
              className="w-full py-2.5 rounded-lg text-sm font-semibold border border-white/20 text-white hover:bg-white/10 backdrop-blur-md flex items-center justify-center gap-2"
            >
              Request Pilot Access <ArrowRight className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
