import React, { useState } from 'react';
import { 
  Layers, 
  ShoppingCart, 
  Boxes, 
  Activity, 
  ShieldCheck, 
  Truck, 
  DollarSign, 
  Users, 
  ArrowRight,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { CORE_MODULES } from '../../data/mockData';
import { Badge } from '../common/Badge';

interface ErpModulesShowcaseProps {
  onOpenDemo: (tab: string) => void;
}

export const ErpModulesShowcase: React.FC<ErpModulesShowcaseProps> = ({ onOpenDemo }) => {
  const [selectedModuleId, setSelectedModuleId] = useState('production');

  const iconMap: Record<string, any> = {
    Layers,
    ShoppingCart,
    Boxes,
    Activity,
    ShieldCheck,
    Truck,
    DollarSign,
    Users,
  };

  const selectedModule = CORE_MODULES.find((m) => m.id === selectedModuleId) || CORE_MODULES[3];
  const MainIcon = iconMap[selectedModule.icon] || Activity;

  return (
    <section id="modules" className="py-24 bg-gradient-to-b from-[#180329] via-[#200538] to-[#180329] border-t border-purple-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <Badge variant="purple" dot>
            Full-Spectrum Garment ERP
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            8 Native Modules Built for Bangladesh Apparel
          </h2>
          <p className="text-purple-200/80 text-base sm:text-lg">
            Purpose-built to replace disconnected point solutions with a unified data and AI fabric.
          </p>
        </div>

        {/* 8 Module Pills / Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5 mb-10">
          {CORE_MODULES.map((mod) => {
            const Icon = iconMap[mod.icon] || Activity;
            const isSelected = selectedModuleId === mod.id;
            return (
              <button
                key={mod.id}
                onClick={() => setSelectedModuleId(mod.id)}
                className={`p-3 rounded-xl flex flex-col items-center text-center transition-all border cursor-pointer ${
                  isSelected
                    ? 'bg-purple-600/40 border-purple-400 text-white shadow-lg shadow-purple-600/30'
                    : 'bg-purple-950/30 border-purple-900/40 hover:border-purple-600/50 text-slate-300 hover:text-white'
                }`}
              >
                <div className={`p-2 rounded-lg mb-2 ${isSelected ? 'bg-purple-500/30 text-purple-200' : 'bg-slate-900/80 text-purple-300'}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold leading-tight line-clamp-1">{mod.name.split(' ')[0]}</span>
                <span className="text-[10px] text-purple-300/70 font-bengali mt-0.5">{mod.bengali}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Module Detail Panel (Crisp White Card with Royal Purple Accents) */}
        <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200/90 text-slate-900 shadow-2xl shadow-purple-950/70 transition-all">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center gap-3.5">
                <div className="p-3.5 rounded-2xl bg-purple-100 text-purple-700 border border-purple-200 shrink-0">
                  <MainIcon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900 flex flex-wrap items-center gap-2.5">
                    <span>{selectedModule.name}</span>
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 border border-purple-200 font-bengali font-semibold">
                      {selectedModule.bengali}
                    </span>
                  </h3>
                  <div className="text-xs font-mono font-bold text-purple-700 mt-0.5 uppercase tracking-wider">CORE RMG EXECUTION MODULE</div>
                </div>
              </div>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                {selectedModule.desc}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                {selectedModule.features.map((feat, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-purple-50/70 border border-purple-100 text-xs font-medium text-slate-800 flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col justify-center items-center lg:items-end gap-4 p-6 bg-gradient-to-br from-purple-950 via-[#210538] to-[#140224] rounded-2xl border border-purple-700/50 shadow-lg">
              <div className="text-center lg:text-right space-y-1">
                <div className="text-xs font-mono font-semibold text-purple-300">Interactive Environment</div>
                <div className="text-sm font-bold text-white">Explore in Command Center</div>
              </div>
              <button
                onClick={() => onOpenDemo(selectedModule.id)}
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-purple-900/50 transition-all cursor-pointer hover:-translate-y-0.5"
              >
                <span>Launch {selectedModule.name.split(' ')[0]} View</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
