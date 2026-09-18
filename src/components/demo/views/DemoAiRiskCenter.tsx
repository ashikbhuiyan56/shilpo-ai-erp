import React, { useState } from 'react';
import { 
  AlertTriangle, 
  ShieldAlert, 
  CheckCircle2, 
  ArrowRight, 
  Cpu, 
  Sparkles, 
  Zap, 
  Activity, 
  Search, 
  Sliders,
  X,
  Clock,
  UserCheck,
  Building2,
  Calendar,
  Layers,
  ChevronRight,
  TrendingDown,
  Info
} from 'lucide-react';
import { SAMPLE_ORDERS } from '../../../data/mockData';
import { DemoTab } from '../../../types';
import { FactoryDataInput, AiAnalysisResult } from '../../../utils/factoryAiEngine';

interface DemoAiRiskCenterProps {
  onNavigate: (tab: DemoTab) => void;
  onSelectOrder?: (orderId: string) => void;
  activeAnalysisResult?: AiAnalysisResult;
  activeDataInput?: FactoryDataInput;
  onSelectCapacityMatch?: (payload: {
    orderNumber: string;
    buyer: string;
    category: string;
    deficitUnits: number;
    targetDays: number;
    delayRiskScore: number;
    reason: string;
  }) => void;
}

export const DemoAiRiskCenter: React.FC<DemoAiRiskCenterProps> = ({
  onNavigate,
  onSelectOrder,
  activeAnalysisResult,
  activeDataInput,
  onSelectCapacityMatch,
}) => {
  const [selectedRiskCategory, setSelectedRiskCategory] = useState<'all' | 'deadline' | 'production' | 'quality' | 'capacity'>('all');
  const [selectedOrderForDrawer, setSelectedOrderForDrawer] = useState<any | null>(null);
  const [searchTableQuery, setSearchTableQuery] = useState('');

  // Dynamic analysis or baseline values
  const isCustomAnalysis = Boolean(activeAnalysisResult && activeDataInput);
  
  const currentOrderNumber = activeDataInput?.orderNumber || 'BD-2048';
  const currentBuyer = activeDataInput?.buyerName || 'Nordic Apparel Co.';
  const currentCategory = activeDataInput?.category || 'Knitwear';
  const currentOrderQty = activeDataInput?.orderQuantity || 45000;
  const currentDelayRisk = activeAnalysisResult ? activeAnalysisResult.delayRiskPercent : 78;
  const currentProdRisk = activeAnalysisResult ? activeAnalysisResult.productionRiskLevel : 'Severe';
  const currentQualityRisk = activeAnalysisResult ? activeAnalysisResult.qualityRiskLevel : 'High';
  const currentCapacityGap = activeAnalysisResult ? activeAnalysisResult.capacityGap : 18000;
  const currentExplanation = activeAnalysisResult 
    ? activeAnalysisResult.aiExplanation 
    : 'Fabric arrival delay (3-day lag on dyed 180 GSM cotton jersey) + Line 02 SMV pacing bottleneck (76.4%) + remaining production volume of 26,500 units creates an unavoidable 18,000 unit deficit before the vessel cutoff date.';
  
  const currentRecommendations = activeAnalysisResult ? activeAnalysisResult.recommendedActions : [
    'Activate verified capacity matching for 18,000 units with Verified Partner #BD-017 (Gazipur Unit 3, 94% Compatibility). This recovers 2.4 days and prevents brand late shipment chargebacks.'
  ];

  const handleRouteCapacity = () => {
    const payload = {
      orderNumber: currentOrderNumber,
      buyer: currentBuyer,
      category: currentCategory,
      deficitUnits: currentCapacityGap > 0 ? currentCapacityGap : 18000,
      targetDays: activeDataInput?.daysRemaining || 14,
      delayRiskScore: currentDelayRisk,
      reason: `${currentCapacityGap > 0 ? currentCapacityGap.toLocaleString() : '18,000'} pcs deficit on Order #${currentOrderNumber}`,
    };

    if (onSelectCapacityMatch) {
      onSelectCapacityMatch(payload);
    }
    onNavigate('capacity');
  };

  const filteredOrders = SAMPLE_ORDERS.filter(o => 
    o.orderNumber.toLowerCase().includes(searchTableQuery.toLowerCase()) ||
    o.buyer.toLowerCase().includes(searchTableQuery.toLowerCase()) ||
    o.category.toLowerCase().includes(searchTableQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-12">
      {/* Dynamic Data Entry Sync Alert */}
      {isCustomAnalysis && (
        <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-300/80 shadow-2xs flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald-100 text-[#087F6A] shrink-0 border border-emerald-200">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-extrabold text-[#065F46] uppercase tracking-wider">
                  SYNCED WITH FACTORY DATA ENTRY
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-100 text-[#065F46] font-mono font-extrabold border border-emerald-300/70 shadow-2xs">
                  Order #{currentOrderNumber} · {currentBuyer}
                </span>
              </div>
              <div className="text-xs text-[#334155] font-medium mt-0.5">
                Real-time calculated from custom variables ({activeDataInput?.dailyCapacity.toLocaleString()} pcs/day, {activeDataInput?.daysRemaining} days left, {activeDataInput?.fabricStatus}).
              </div>
            </div>
          </div>

          <button
            onClick={() => onNavigate('data-entry')}
            className="px-3.5 py-1.5 rounded-lg bg-white hover:bg-[#F8FAFC] border border-[#CBD5E1] text-[#0B1120] text-xs font-bold shadow-2xs flex items-center gap-1.5 cursor-pointer"
          >
            <Sliders className="w-3.5 h-3.5 text-[#087F6A]" />
            <span>Modify Factory Data</span>
          </button>
        </div>
      )}

      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-[0_1px_3px_rgba(15,23,42,0.08)] flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-emerald-50 text-[#087F6A] flex items-center justify-center border border-emerald-200 shadow-2xs">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[#0B1120] tracking-tight flex items-center gap-2.5">
                <span>AI Risk Command Center</span>
                <span className={`text-xs font-mono font-bold px-2.5 py-0.5 rounded-full border shadow-2xs ${
                  currentDelayRisk >= 70
                    ? 'bg-rose-50 text-rose-800 border-rose-300/80'
                    : currentDelayRisk >= 40
                    ? 'bg-amber-50 text-amber-800 border-amber-300/80'
                    : 'bg-emerald-50 text-[#065F46] border-emerald-300/80'
                }`}>
                  {currentDelayRisk >= 70 ? 'CRITICAL DELAY ALERT' : currentDelayRisk >= 40 ? 'MODERATE RISK' : 'HEALTHY STATUS'}
                </span>
              </h1>
              <p className="text-sm text-[#334155] font-medium mt-1 leading-relaxed">
                Real-time predictive intelligence cross-analyzing line SMV, fabric transit, defect clustering, and port cutoff dates.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => onNavigate('data-entry')}
            className="px-4 py-2.5 rounded-xl bg-white hover:bg-[#F8FAFC] border border-[#CBD5E1] text-xs font-bold text-[#0B1120] flex items-center gap-2 transition-all duration-200 hover:-translate-y-0.5 cursor-pointer shadow-sm hover:shadow-md"
          >
            <Sliders className="w-3.5 h-3.5 text-[#087F6A]" />
            <span>Factory Data Entry</span>
          </button>
          
          <button
            onClick={() => onNavigate('forecast')}
            className="px-4 py-2.5 rounded-xl bg-[#087F6A] hover:bg-[#066653] text-white text-xs font-bold flex items-center gap-2 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
          >
            <span>14-Day Trajectory</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 4 Risk Category Cards (Light Mode) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Deadline Risk */}
        <div 
          onClick={() => setSelectedRiskCategory('deadline')}
          className={`p-5 rounded-2xl bg-white border cursor-pointer transition-all duration-200 ${
            selectedRiskCategory === 'deadline'
              ? 'border-rose-400 ring-2 ring-rose-200/70 shadow-md -translate-y-0.5'
              : 'border-[#E2E8F0] hover:border-slate-400 shadow-[0_1px_3px_rgba(15,23,42,0.08)] hover:shadow-md hover:-translate-y-0.5'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono font-extrabold text-rose-800 uppercase tracking-wider">
              DEADLINE RISK
            </span>
            <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border shadow-2xs ${
              currentDelayRisk >= 70
                ? 'bg-rose-50 text-rose-800 border-rose-300/80'
                : 'bg-amber-50 text-amber-800 border-amber-300/80'
            }`}>
              {currentDelayRisk >= 70 ? 'HIGH' : 'MEDIUM'}
            </span>
          </div>
          <div className="text-3xl font-black text-[#0B1120] font-mono">{currentDelayRisk}% Risk</div>
          <p className="text-xs text-[#334155] font-medium mt-1.5 leading-relaxed">
            {currentDelayRisk >= 70 
              ? `Order #${currentOrderNumber} is projected to miss ship date by 2.4+ days.` 
              : `Order #${currentOrderNumber} pacing is aligned with vessel booking.`}
          </p>
        </div>

        {/* Production Risk */}
        <div 
          onClick={() => setSelectedRiskCategory('production')}
          className={`p-5 rounded-2xl bg-white border cursor-pointer transition-all duration-200 ${
            selectedRiskCategory === 'production'
              ? 'border-amber-400 ring-2 ring-amber-200/70 shadow-md -translate-y-0.5'
              : 'border-[#E2E8F0] hover:border-slate-400 shadow-[0_1px_3px_rgba(15,23,42,0.08)] hover:shadow-md hover:-translate-y-0.5'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono font-extrabold text-amber-800 uppercase tracking-wider">PRODUCTION RISK</span>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-300/80 shadow-2xs">
              {currentProdRisk.toUpperCase()}
            </span>
          </div>
          <div className="text-3xl font-black text-[#0B1120] font-mono">
            {currentCapacityGap > 0 ? `${currentCapacityGap.toLocaleString()} pcs Deficit` : 'Zero Deficit'}
          </div>
          <p className="text-xs text-[#334155] font-medium mt-1.5 leading-relaxed">
            {activeDataInput ? `Running at ${activeDataInput.dailyCapacity.toLocaleString()} pcs/day for ${activeDataInput.daysRemaining} days.` : 'Line 02 operating at 76.4% SMV efficiency; trim dispatch lag.'}
          </p>
        </div>

        {/* Quality Risk */}
        <div 
          onClick={() => setSelectedRiskCategory('quality')}
          className={`p-5 rounded-2xl bg-white border cursor-pointer transition-all duration-200 ${
            selectedRiskCategory === 'quality'
              ? 'border-blue-400 ring-2 ring-blue-200/70 shadow-md -translate-y-0.5'
              : 'border-[#E2E8F0] hover:border-slate-400 shadow-[0_1px_3px_rgba(15,23,42,0.08)] hover:shadow-md hover:-translate-y-0.5'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono font-extrabold text-blue-800 uppercase tracking-wider">QUALITY RISK</span>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-800 border border-blue-300/80 shadow-2xs">
              {currentQualityRisk.toUpperCase()}
            </span>
          </div>
          <div className="text-3xl font-black text-[#0B1120] font-mono">{activeDataInput?.defectRate || 3.5}% Defect</div>
          <p className="text-xs text-[#334155] font-medium mt-1.5 leading-relaxed">
            {activeDataInput?.defectRate && activeDataInput.defectRate > 4 ? 'High rework burden impacting line pacing.' : 'Defect rate within standard export tolerance.'}
          </p>
        </div>

        {/* Capacity Buffer */}
        <div 
          onClick={() => setSelectedRiskCategory('capacity')}
          className={`p-5 rounded-2xl bg-white border cursor-pointer transition-all duration-200 ${
            selectedRiskCategory === 'capacity'
              ? 'border-emerald-500 ring-2 ring-emerald-200/70 shadow-md -translate-y-0.5'
              : 'border-[#E2E8F0] hover:border-slate-400 shadow-[0_1px_3px_rgba(15,23,42,0.08)] hover:shadow-md hover:-translate-y-0.5'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono font-extrabold text-[#087F6A] uppercase tracking-wider">CAPACITY BUFFER</span>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-[#065F46] border border-emerald-300/80 shadow-2xs">
              {currentCapacityGap > 0 ? 'MATCH READY' : 'OPTIMAL'}
            </span>
          </div>
          <div className="text-3xl font-black text-[#0B1120] font-mono">
            {currentCapacityGap > 0 ? `${currentCapacityGap.toLocaleString()} pcs` : '80k Units'}
          </div>
          <p className="text-xs text-[#334155] font-medium mt-1.5 leading-relaxed">
            {currentCapacityGap > 0 ? 'Verified peer capacity ready to absorb surplus volume in Gazipur.' : '4 verified peer factories in Gazipur & Savar ready for immediate load matching.'}
          </p>
        </div>
      </div>

      {/* Featured Primary Alert Card (Executive Command Center Presentation) */}
      <div className={`p-6 sm:p-7 rounded-2xl bg-white border shadow-md space-y-6 ${
        currentDelayRisk >= 70 ? 'border-rose-300/90' : 'border-amber-300/90'
      }`}>
        <div className="flex flex-wrap items-start justify-between gap-4 pb-4 border-b border-[#F1F5F9]">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className={`px-2.5 py-0.5 rounded-full font-mono font-extrabold text-xs border shadow-2xs ${
                currentDelayRisk >= 70
                  ? 'bg-rose-50 text-rose-900 border-rose-300/80'
                  : 'bg-amber-50 text-amber-900 border-amber-300/80'
              }`}>
                {currentDelayRisk >= 70 ? 'CRITICAL DELAY ALERT' : 'MODERATE RISK DETECTED'}
              </span>
              <span className="text-xs font-mono font-semibold text-[#475569]">PROTOTYPE SIMULATED AI RESULT</span>
            </div>
            <h3 className="text-xl font-black text-[#0B1120] tracking-tight">
              ORDER #{currentOrderNumber} · {currentBuyer}
            </h3>
            <p className="text-xs text-[#334155] font-medium">
              Category: <strong className="text-[#0B1120] font-bold">{currentCategory}</strong> · Total Order: <strong className="text-[#0B1120] font-bold">{currentOrderQty.toLocaleString()} pcs</strong> · Target Delivery Window: <strong className="text-[#0B1120] font-bold">{activeDataInput?.daysRemaining || 14} Days</strong>
            </p>
          </div>

          <div className="text-right">
            <div className="text-xs font-mono font-semibold text-[#475569] uppercase">Calculated Delay Risk</div>
            <div className={`text-3xl font-black font-mono ${
              currentDelayRisk >= 70 ? 'text-rose-700' : 'text-amber-700'
            }`}>
              {currentDelayRisk}%
            </div>
            <div className="text-[11px] text-[#475569] font-mono font-semibold mt-0.5">
              {currentCapacityGap > 0 ? `${currentCapacityGap.toLocaleString()} pcs Capacity Deficit` : 'Zero Deficit'}
            </div>
          </div>
        </div>

        {/* Diagnosis & Recommendation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#CBD5E1] space-y-2 shadow-2xs">
            <div className="font-extrabold text-[#0B1120] flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Calculated AI Vector & Root Cause</span>
            </div>
            <p className="text-[#1E293B] font-medium leading-relaxed">
              “{currentExplanation}”
            </p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-300/80 space-y-2 shadow-2xs">
            <div className="font-extrabold text-[#065F46] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#087F6A] shrink-0" />
              <span>AI Automated Pacing Recommendation</span>
            </div>
            <div className="space-y-1.5 text-[#1E293B] font-medium leading-relaxed">
              {currentRecommendations.map((rec, idx) => (
                <div key={idx} className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#087F6A] shrink-0 mt-0.5" />
                  <span>{rec}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Toolbar */}
        <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-[#F1F5F9]">
          <div className="flex items-center gap-2.5">
            {currentCapacityGap > 0 ? (
              <button
                onClick={handleRouteCapacity}
                className="px-4 py-2.5 rounded-xl bg-[#087F6A] hover:bg-[#066653] text-white font-bold text-xs flex items-center gap-2 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
              >
                <Zap className="w-4 h-4" />
                <span>Find Verified Capacity ({currentCapacityGap.toLocaleString()} pcs) →</span>
              </button>
            ) : (
              <button
                onClick={() => onNavigate('forecast')}
                className="px-4 py-2.5 rounded-xl bg-[#087F6A] hover:bg-[#066653] text-white font-bold text-xs flex items-center gap-2 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
              >
                <ArrowRight className="w-4 h-4" />
                <span>View Production Forecast</span>
              </button>
            )}

            <button
              onClick={() => onNavigate('data-entry')}
              className="px-4 py-2.5 rounded-xl bg-white hover:bg-[#F8FAFC] border border-[#CBD5E1] text-[#0B1120] font-bold text-xs flex items-center gap-2 transition-all duration-200 hover:-translate-y-0.5 cursor-pointer shadow-sm hover:shadow-md"
            >
              <Sliders className="w-4 h-4 text-[#087F6A]" />
              <span>Adjust Data Inputs</span>
            </button>

            <button
              onClick={() => onNavigate('copilot')}
              className="px-4 py-2.5 rounded-xl bg-white hover:bg-[#F8FAFC] border border-[#CBD5E1] text-[#0B1120] font-bold text-xs flex items-center gap-2 transition-all duration-200 hover:-translate-y-0.5 cursor-pointer shadow-sm hover:shadow-md"
            >
              <Sparkles className="w-4 h-4 text-[#2563EB]" />
              <span>Ask AI Copilot</span>
            </button>
          </div>

          <span className="text-xs font-mono font-medium text-[#475569]">
            Simulated AI Analysis Engine
          </span>
        </div>
      </div>

      {/* All Active Orders Risk Breakdown Table (Light Mode) */}
      <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-[0_1px_3px_rgba(15,23,42,0.08)] space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-bold text-[#0B1120] tracking-tight">Active Garment Orders Risk Matrix</h3>
            <p className="text-sm text-[#334155] font-medium">Full shop-floor production orders evaluated for delivery & quality compliance</p>
          </div>

          {/* Table Search */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-[#475569] absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTableQuery}
              onChange={(e) => setSearchTableQuery(e.target.value)}
              placeholder="Filter by Order, Buyer..."
              className="pl-8 pr-3 py-1.5 rounded-lg bg-[#F8FAFC] border border-[#CBD5E1] text-xs font-medium text-[#0B1120] placeholder-[#64748B] focus:outline-none focus:border-[#087F6A] focus:ring-1 focus:ring-[#087F6A] w-52 shadow-2xs"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#CBD5E1] text-[#334155] font-mono font-bold uppercase text-[11px] bg-[#F8FAFC]">
                <th className="py-2.5 px-3 rounded-l-lg">Order #</th>
                <th className="py-2.5 px-3">Buyer</th>
                <th className="py-2.5 px-3">Category</th>
                <th className="py-2.5 px-3">Order Qty</th>
                <th className="py-2.5 px-3">Target Ship</th>
                <th className="py-2.5 px-3">Risk Score</th>
                <th className="py-2.5 px-3">Primary Factor</th>
                <th className="py-2.5 px-3 text-right rounded-r-lg">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0]">
              {/* Insert current customized order on top if customized */}
              {isCustomAnalysis && (
                <tr className="bg-emerald-50/70 hover:bg-emerald-50 transition-colors">
                  <td className="py-3 px-3 font-mono font-extrabold text-[#065F46] flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#087F6A]" />
                    {currentOrderNumber} (Active Entry)
                  </td>
                  <td className="py-3 px-3 text-[#0B1120] font-bold">{currentBuyer}</td>
                  <td className="py-3 px-3 text-[#334155] font-medium">{currentCategory}</td>
                  <td className="py-3 px-3 font-mono text-[#0B1120] font-bold">{currentOrderQty.toLocaleString()}</td>
                  <td className="py-3 px-3 font-mono font-semibold text-[#334155]">In {activeDataInput?.daysRemaining} days</td>
                  <td className="py-3 px-3">
                    <span
                      className={`font-mono font-extrabold px-2 py-0.5 rounded-full text-xs border shadow-2xs ${
                        currentDelayRisk > 70
                          ? 'bg-rose-50 text-rose-800 border-rose-300/80'
                          : 'bg-amber-50 text-amber-800 border-amber-300/80'
                      }`}
                    >
                      {currentDelayRisk}%
                    </span>
                  </td>
                  <td className="py-3 px-3 text-[#065F46] font-bold">
                    {activeDataInput?.fabricStatus || 'Capacity Shortfall'}
                  </td>
                  <td className="py-3 px-3 text-right">
                    <button
                      onClick={() => setSelectedOrderForDrawer({
                        orderNumber: currentOrderNumber,
                        buyer: currentBuyer,
                        category: currentCategory,
                        quantity: currentOrderQty,
                        targetShipDate: `In ${activeDataInput?.daysRemaining || 14} days`,
                        riskScore: currentDelayRisk,
                        status: 'Custom Data Entry',
                        primaryFactor: activeDataInput?.fabricStatus || 'Dye-lot lag + Line 02 pacing',
                        team: 'Merchandising Unit 02',
                        lines: ['Line 02', 'Line 04']
                      })}
                      className="px-2.5 py-1 rounded bg-[#087F6A] text-white hover:bg-[#066653] font-bold text-xs inline-flex items-center gap-1 cursor-pointer shadow-2xs"
                    >
                      <span>View Details</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </td>
                </tr>
              )}

              {filteredOrders.map((ord) => (
                <tr key={ord.id} className="hover:bg-[#F8FAFC] transition-colors">
                  <td className="py-3 px-3 font-mono font-bold text-[#0B1120]">{ord.orderNumber}</td>
                  <td className="py-3 px-3 text-[#0B1120] font-bold">{ord.buyer}</td>
                  <td className="py-3 px-3 text-[#334155] font-medium">{ord.category}</td>
                  <td className="py-3 px-3 font-mono font-bold text-[#0B1120]">{ord.quantity.toLocaleString()}</td>
                  <td className="py-3 px-3 font-mono font-medium text-[#475569]">{ord.targetShipDate}</td>
                  <td className="py-3 px-3">
                    <span
                      className={`font-mono font-bold px-2 py-0.5 rounded-full text-xs border shadow-2xs ${
                        ord.riskScore > 70
                          ? 'bg-rose-50 text-rose-800 border-rose-300/80'
                          : ord.riskScore > 30
                          ? 'bg-amber-50 text-amber-800 border-amber-300/80'
                          : 'bg-emerald-50 text-[#065F46] border-emerald-300/80'
                      }`}
                    >
                      {ord.riskScore}%
                    </span>
                  </td>
                  <td className="py-3 px-3 text-[#334155] font-medium">
                    {ord.riskScore > 70 ? 'Fabric Dye-Lot lag' : ord.riskScore > 30 ? 'Trims Inspection Pending' : 'Pacing On Schedule'}
                  </td>
                  <td className="py-3 px-3 text-right">
                    <button
                      onClick={() => setSelectedOrderForDrawer({
                        ...ord,
                        primaryFactor: ord.riskScore > 70 ? 'Fabric Dye-Lot delay + Line 02 bottleneck' : 'On track for port cutoff',
                        team: 'Industrial Engineering (Dhaka)',
                        lines: ord.assignedLines || ['Line 01']
                      })}
                      className="px-2.5 py-1 rounded bg-white hover:bg-[#EEF3F8] border border-[#CBD5E1] text-[#0B1120] font-bold text-xs inline-flex items-center gap-1 cursor-pointer shadow-2xs"
                    >
                      <span>View Details</span>
                      <ChevronRight className="w-3 h-3 text-[#475569]" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* =========================================================================
          SLIDE-OVER RISK DETAIL DRAWER (Light Mode, Polished Diagnostics)
          ========================================================================= */}
      {selectedOrderForDrawer && (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/40 backdrop-blur-xs animate-fadeIn">
          {/* Backdrop Click */}
          <div 
            className="absolute inset-0"
            onClick={() => setSelectedOrderForDrawer(null)}
          />

          {/* Drawer Container */}
          <div className="relative w-full max-w-md sm:max-w-lg bg-white h-full shadow-2xl flex flex-col justify-between overflow-y-auto z-10 border-l border-[#CBD5E1] animate-slideLeft p-6">
            <div className="space-y-6">
              {/* Drawer Header */}
              <div className="flex items-start justify-between pb-4 border-b border-[#CBD5E1]">
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border shadow-2xs ${
                      selectedOrderForDrawer.riskScore >= 70
                        ? 'bg-rose-50 text-rose-800 border-rose-300/80'
                        : selectedOrderForDrawer.riskScore >= 40
                        ? 'bg-amber-50 text-amber-800 border-amber-300/80'
                        : 'bg-emerald-50 text-[#065F46] border-emerald-300/80'
                    }`}>
                      {selectedOrderForDrawer.riskScore >= 70 ? 'CRITICAL SEVERITY' : 'MODERATE SEVERITY'}
                    </span>
                    <span className="text-[10px] font-mono font-semibold text-[#475569]">Simulated AI Audit</span>
                  </div>
                  <h2 className="text-xl font-black text-[#0B1120] mt-1 tracking-tight">
                    Order #{selectedOrderForDrawer.orderNumber}
                  </h2>
                  <p className="text-xs text-[#334155] font-medium">
                    Buyer: <strong className="text-[#0B1120] font-bold">{selectedOrderForDrawer.buyer}</strong> · {selectedOrderForDrawer.category}
                  </p>
                </div>

                <button
                  onClick={() => setSelectedOrderForDrawer(null)}
                  className="p-1.5 rounded-lg text-[#475569] hover:text-[#0B1120] hover:bg-[#F1F5F9] cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Calculated Risk Meter */}
              <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#CBD5E1] space-y-2 shadow-2xs">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#0B1120]">Calculated Delay Risk Score</span>
                  <span className="font-mono font-black text-lg text-rose-700">{selectedOrderForDrawer.riskScore}%</span>
                </div>
                <div className="w-full bg-[#E2E8F0] h-2.5 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${
                      selectedOrderForDrawer.riskScore >= 70 ? 'bg-rose-600' : 'bg-amber-600'
                    }`}
                    style={{ width: `${selectedOrderForDrawer.riskScore}%` }}
                  />
                </div>
                <div className="text-[11px] text-[#475569] font-medium flex justify-between">
                  <span>Ship Cutoff: <strong className="text-[#0B1120]">{selectedOrderForDrawer.targetShipDate}</strong></span>
                  <span>Target: &lt; 25% Risk</span>
                </div>
              </div>

              {/* Relevant Production Information */}
              <div className="space-y-3">
                <h4 className="text-xs font-extrabold text-[#0B1120] uppercase font-mono tracking-wider">
                  Production & Shop Floor Data
                </h4>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#CBD5E1] shadow-2xs">
                    <div className="text-[#475569] text-[11px] font-medium">Total Quantity</div>
                    <div className="font-extrabold text-[#0B1120] mt-0.5">{selectedOrderForDrawer.quantity?.toLocaleString()} pcs</div>
                  </div>
                  <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#CBD5E1] shadow-2xs">
                    <div className="text-[#475569] text-[11px] font-medium">Assigned Lines</div>
                    <div className="font-extrabold text-[#0B1120] mt-0.5">
                      {Array.isArray(selectedOrderForDrawer.lines) ? selectedOrderForDrawer.lines.join(', ') : 'Line 02'}
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#CBD5E1] shadow-2xs">
                    <div className="text-[#475569] text-[11px] font-medium">Assigned Team</div>
                    <div className="font-extrabold text-[#0B1120] mt-0.5">{selectedOrderForDrawer.team || 'Industrial Eng. Unit 2'}</div>
                  </div>
                  <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#CBD5E1] shadow-2xs">
                    <div className="text-[#475569] text-[11px] font-medium">Resolution Status</div>
                    <div className="font-bold text-amber-800 mt-0.5">Action Recommended</div>
                  </div>
                </div>
              </div>

              {/* Contributing Factors */}
              <div className="space-y-2">
                <h4 className="text-xs font-extrabold text-[#0B1120] uppercase font-mono tracking-wider">
                  Contributing Factors
                </h4>
                <div className="p-3.5 rounded-xl bg-white border border-[#CBD5E1] space-y-2 text-xs shadow-2xs">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-[#0B1120]">Primary Bottleneck</div>
                      <div className="text-[#334155] font-medium mt-0.5">{selectedOrderForDrawer.primaryFactor}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 pt-2 border-t border-[#F1F5F9]">
                    <Clock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-[#0B1120]">Port Logistics Cutoff</div>
                      <div className="text-[#334155] font-medium mt-0.5">Chittagong terminal gate closes 48 hours prior to vessel departure.</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recommended Actions */}
              <div className="space-y-2">
                <h4 className="text-xs font-extrabold text-[#0B1120] uppercase font-mono tracking-wider">
                  Recommended Next Actions
                </h4>
                <div className="p-3.5 rounded-xl bg-emerald-50/80 border border-emerald-300/80 text-xs space-y-2 shadow-2xs">
                  <div className="flex items-start gap-2 text-[#065F46] font-medium">
                    <CheckCircle2 className="w-4 h-4 text-[#087F6A] shrink-0 mt-0.5" />
                    <span>Allocate 18,000 unit deficit to verified Gazipur subcontractor to eliminate late delivery fines.</span>
                  </div>
                  <div className="flex items-start gap-2 text-[#065F46] font-medium">
                    <CheckCircle2 className="w-4 h-4 text-[#087F6A] shrink-0 mt-0.5" />
                    <span>Expedite remaining trims delivery with fabric warehouse supplier.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Drawer Footer Actions */}
            <div className="pt-4 border-t border-[#CBD5E1] flex items-center justify-between gap-3">
              <button
                onClick={() => {
                  setSelectedOrderForDrawer(null);
                  onNavigate('capacity');
                }}
                className="flex-1 py-2.5 rounded-xl bg-[#087F6A] hover:bg-[#066653] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
              >
                <span>Activate Capacity Matching</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setSelectedOrderForDrawer(null)}
                className="px-4 py-2.5 rounded-xl bg-[#F8FAFC] hover:bg-[#EEF3F8] border border-[#CBD5E1] text-[#0B1120] font-bold text-xs cursor-pointer shadow-2xs hover:shadow-xs transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
