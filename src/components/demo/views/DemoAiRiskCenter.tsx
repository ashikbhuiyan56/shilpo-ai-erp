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
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald-100 text-[#087F6A] shrink-0">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-[#065F46] uppercase tracking-wider">
                  SYNCED WITH FACTORY DATA ENTRY
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-100 text-[#065F46] font-mono font-bold">
                  Order #{currentOrderNumber} · {currentBuyer}
                </span>
              </div>
              <div className="text-xs text-[#64748B] mt-0.5">
                Real-time calculated from custom variables ({activeDataInput?.dailyCapacity.toLocaleString()} pcs/day, {activeDataInput?.daysRemaining} days left, {activeDataInput?.fabricStatus}).
              </div>
            </div>
          </div>

          <button
            onClick={() => onNavigate('data-entry')}
            className="px-3.5 py-1.5 rounded-lg bg-white hover:bg-[#F8FAFC] border border-[#E2E8F0] text-[#172033] text-xs font-semibold shadow-xs flex items-center gap-1.5 cursor-pointer"
          >
            <Sliders className="w-3.5 h-3.5 text-[#087F6A]" />
            <span>Modify Factory Data</span>
          </button>
        </div>
      )}

      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#087F6A] flex items-center justify-center border border-emerald-200">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-[#172033] flex items-center gap-2">
                <span>AI Risk Command Center</span>
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${
                  currentDelayRisk >= 70
                    ? 'bg-rose-50 text-rose-700 border-rose-200'
                    : currentDelayRisk >= 40
                    ? 'bg-amber-50 text-amber-700 border-amber-200'
                    : 'bg-emerald-50 text-[#065F46] border-emerald-200'
                }`}>
                  {currentDelayRisk >= 70 ? 'CRITICAL DELAY ALERT' : currentDelayRisk >= 40 ? 'MODERATE RISK' : 'HEALTHY STATUS'}
                </span>
              </h1>
              <p className="text-xs text-[#64748B] mt-0.5">
                Real-time predictive intelligence cross-analyzing line SMV, fabric transit, defect clustering, and port cutoff dates.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('data-entry')}
            className="px-3.5 py-2 rounded-lg bg-[#F8FAFC] hover:bg-[#EEF3F8] border border-[#E2E8F0] text-xs font-semibold text-[#172033] flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Sliders className="w-3.5 h-3.5 text-[#087F6A]" />
            <span>Factory Data Entry</span>
          </button>
          
          <button
            onClick={() => onNavigate('forecast')}
            className="px-3.5 py-2 rounded-lg bg-[#087F6A] hover:bg-[#066653] text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
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
          className={`p-5 rounded-2xl bg-white border cursor-pointer transition-all ${
            selectedRiskCategory === 'deadline'
              ? 'border-rose-400 ring-2 ring-rose-100 shadow-sm'
              : 'border-[#E2E8F0] hover:border-[#CBD5E1] shadow-xs'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono font-bold text-rose-600 uppercase tracking-wider">
              DEADLINE RISK
            </span>
            <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${
              currentDelayRisk >= 70
                ? 'bg-rose-50 text-rose-700 border-rose-200'
                : 'bg-amber-50 text-amber-700 border-amber-200'
            }`}>
              {currentDelayRisk >= 70 ? 'HIGH' : 'MEDIUM'}
            </span>
          </div>
          <div className="text-2xl font-bold text-[#172033] font-mono">{currentDelayRisk}% Risk</div>
          <p className="text-xs text-[#64748B] mt-1.5">
            {currentDelayRisk >= 70 
              ? `Order #${currentOrderNumber} is projected to miss ship date by 2.4+ days.` 
              : `Order #${currentOrderNumber} pacing is aligned with vessel booking.`}
          </p>
        </div>

        {/* Production Risk */}
        <div 
          onClick={() => setSelectedRiskCategory('production')}
          className={`p-5 rounded-2xl bg-white border cursor-pointer transition-all ${
            selectedRiskCategory === 'production'
              ? 'border-amber-400 ring-2 ring-amber-100 shadow-sm'
              : 'border-[#E2E8F0] hover:border-[#CBD5E1] shadow-xs'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono font-bold text-amber-600 uppercase tracking-wider">PRODUCTION RISK</span>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
              {currentProdRisk.toUpperCase()}
            </span>
          </div>
          <div className="text-2xl font-bold text-[#172033] font-mono">
            {currentCapacityGap > 0 ? `${currentCapacityGap.toLocaleString()} pcs Deficit` : 'Zero Deficit'}
          </div>
          <p className="text-xs text-[#64748B] mt-1.5">
            {activeDataInput ? `Running at ${activeDataInput.dailyCapacity.toLocaleString()} pcs/day for ${activeDataInput.daysRemaining} days.` : 'Line 02 operating at 76.4% SMV efficiency; trim dispatch lag.'}
          </p>
        </div>

        {/* Quality Risk */}
        <div 
          onClick={() => setSelectedRiskCategory('quality')}
          className={`p-5 rounded-2xl bg-white border cursor-pointer transition-all ${
            selectedRiskCategory === 'quality'
              ? 'border-blue-400 ring-2 ring-blue-100 shadow-sm'
              : 'border-[#E2E8F0] hover:border-[#CBD5E1] shadow-xs'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono font-bold text-blue-600 uppercase tracking-wider">QUALITY RISK</span>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
              {currentQualityRisk.toUpperCase()}
            </span>
          </div>
          <div className="text-2xl font-bold text-[#172033] font-mono">{activeDataInput?.defectRate || 3.5}% Defect</div>
          <p className="text-xs text-[#64748B] mt-1.5">
            {activeDataInput?.defectRate && activeDataInput.defectRate > 4 ? 'High rework burden impacting line pacing.' : 'Defect rate within standard export tolerance.'}
          </p>
        </div>

        {/* Capacity Buffer */}
        <div 
          onClick={() => setSelectedRiskCategory('capacity')}
          className={`p-5 rounded-2xl bg-white border cursor-pointer transition-all ${
            selectedRiskCategory === 'capacity'
              ? 'border-emerald-400 ring-2 ring-emerald-100 shadow-sm'
              : 'border-[#E2E8F0] hover:border-[#CBD5E1] shadow-xs'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono font-bold text-[#087F6A] uppercase tracking-wider">CAPACITY BUFFER</span>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-[#065F46] border border-emerald-200">
              {currentCapacityGap > 0 ? 'MATCH READY' : 'OPTIMAL'}
            </span>
          </div>
          <div className="text-2xl font-bold text-[#172033] font-mono">
            {currentCapacityGap > 0 ? `${currentCapacityGap.toLocaleString()} pcs` : '80k Units'}
          </div>
          <p className="text-xs text-[#64748B] mt-1.5">
            {currentCapacityGap > 0 ? 'Verified peer capacity ready to absorb surplus volume in Gazipur.' : '4 verified peer factories in Gazipur & Savar ready for immediate load matching.'}
          </p>
        </div>
      </div>

      {/* Featured Primary Alert Card (Executive Command Center Presentation) */}
      <div className={`p-6 sm:p-7 rounded-2xl bg-white border shadow-xs space-y-6 ${
        currentDelayRisk >= 70 ? 'border-rose-200' : 'border-amber-200'
      }`}>
        <div className="flex flex-wrap items-start justify-between gap-4 pb-4 border-b border-[#F1F5F9]">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className={`px-2.5 py-0.5 rounded-full font-mono font-bold text-xs border ${
                currentDelayRisk >= 70
                  ? 'bg-rose-50 text-rose-700 border-rose-200'
                  : 'bg-amber-50 text-amber-700 border-amber-200'
              }`}>
                {currentDelayRisk >= 70 ? 'CRITICAL DELAY ALERT' : 'MODERATE RISK DETECTED'}
              </span>
              <span className="text-xs font-mono text-[#64748B]">PROTOTYPE SIMULATED AI RESULT</span>
            </div>
            <h3 className="text-xl font-bold text-[#172033]">
              ORDER #{currentOrderNumber} · {currentBuyer}
            </h3>
            <p className="text-xs text-[#64748B]">
              Category: <strong className="text-[#172033]">{currentCategory}</strong> · Total Order: <strong className="text-[#172033]">{currentOrderQty.toLocaleString()} pcs</strong> · Target Delivery Window: <strong className="text-[#172033]">{activeDataInput?.daysRemaining || 14} Days</strong>
            </p>
          </div>

          <div className="text-right">
            <div className="text-xs font-mono text-[#64748B] uppercase">Calculated Delay Risk</div>
            <div className={`text-3xl font-black font-mono ${
              currentDelayRisk >= 70 ? 'text-rose-600' : 'text-amber-600'
            }`}>
              {currentDelayRisk}%
            </div>
            <div className="text-[11px] text-[#64748B] font-mono mt-0.5">
              {currentCapacityGap > 0 ? `${currentCapacityGap.toLocaleString()} pcs Capacity Deficit` : 'Zero Deficit'}
            </div>
          </div>
        </div>

        {/* Diagnosis & Recommendation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-2">
            <div className="font-bold text-[#172033] flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>Calculated AI Vector & Root Cause</span>
            </div>
            <p className="text-[#334155] leading-relaxed">
              “{currentExplanation}”
            </p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-2">
            <div className="font-bold text-[#065F46] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#087F6A]" />
              <span>AI Automated Pacing Recommendation</span>
            </div>
            <div className="space-y-1.5 text-[#334155] leading-relaxed">
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
          <div className="flex items-center gap-2">
            {currentCapacityGap > 0 ? (
              <button
                onClick={handleRouteCapacity}
                className="px-4 py-2 rounded-lg bg-[#087F6A] hover:bg-[#066653] text-white font-bold text-xs flex items-center gap-2 shadow-xs transition-all cursor-pointer"
              >
                <Zap className="w-4 h-4" />
                <span>Find Verified Capacity ({currentCapacityGap.toLocaleString()} pcs) →</span>
              </button>
            ) : (
              <button
                onClick={() => onNavigate('forecast')}
                className="px-4 py-2 rounded-lg bg-[#087F6A] hover:bg-[#066653] text-white font-bold text-xs flex items-center gap-2 transition-all cursor-pointer"
              >
                <ArrowRight className="w-4 h-4" />
                <span>View Production Forecast</span>
              </button>
            )}

            <button
              onClick={() => onNavigate('data-entry')}
              className="px-4 py-2 rounded-lg bg-[#F8FAFC] hover:bg-[#EEF3F8] border border-[#E2E8F0] text-[#172033] font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Sliders className="w-4 h-4 text-[#087F6A]" />
              <span>Adjust Data Inputs</span>
            </button>

            <button
              onClick={() => onNavigate('copilot')}
              className="px-4 py-2 rounded-lg bg-[#F8FAFC] hover:bg-[#EEF3F8] border border-[#E2E8F0] text-[#172033] font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#2563EB]" />
              <span>Ask AI Copilot</span>
            </button>
          </div>

          <span className="text-[11px] font-mono text-[#64748B]">
            Simulated AI Analysis Engine
          </span>
        </div>
      </div>

      {/* All Active Orders Risk Breakdown Table (Light Mode) */}
      <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-[#172033]">Active Garment Orders Risk Matrix</h3>
            <p className="text-xs text-[#64748B]">Full shop-floor production orders evaluated for delivery & quality compliance</p>
          </div>

          {/* Table Search */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-[#94A3B8] absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTableQuery}
              onChange={(e) => setSearchTableQuery(e.target.value)}
              placeholder="Filter by Order, Buyer..."
              className="pl-8 pr-3 py-1.5 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-xs text-[#172033] placeholder-[#94A3B8] focus:outline-none focus:border-[#087F6A] w-52"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#E2E8F0] text-[#64748B] font-mono bg-[#F8FAFC]">
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
            <tbody className="divide-y divide-[#F1F5F9]">
              {/* Insert current customized order on top if customized */}
              {isCustomAnalysis && (
                <tr className="bg-emerald-50/50 hover:bg-emerald-50 transition-colors">
                  <td className="py-3 px-3 font-mono font-bold text-[#065F46] flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#087F6A]" />
                    {currentOrderNumber} (Active Entry)
                  </td>
                  <td className="py-3 px-3 text-[#172033] font-semibold">{currentBuyer}</td>
                  <td className="py-3 px-3 text-[#64748B]">{currentCategory}</td>
                  <td className="py-3 px-3 font-mono text-[#172033] font-semibold">{currentOrderQty.toLocaleString()}</td>
                  <td className="py-3 px-3 font-mono text-[#64748B]">In {activeDataInput?.daysRemaining} days</td>
                  <td className="py-3 px-3">
                    <span
                      className={`font-mono font-bold px-2 py-0.5 rounded-full text-xs ${
                        currentDelayRisk > 70
                          ? 'bg-rose-50 text-rose-700 border border-rose-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}
                    >
                      {currentDelayRisk}%
                    </span>
                  </td>
                  <td className="py-3 px-3 text-[#065F46] font-medium">
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
                      className="px-2.5 py-1 rounded bg-[#087F6A] text-white hover:bg-[#066653] font-semibold text-xs inline-flex items-center gap-1 cursor-pointer"
                    >
                      <span>View Details</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </td>
                </tr>
              )}

              {filteredOrders.map((ord) => (
                <tr key={ord.id} className="hover:bg-[#F8FAFC] transition-colors">
                  <td className="py-3 px-3 font-mono font-bold text-[#172033]">{ord.orderNumber}</td>
                  <td className="py-3 px-3 text-[#172033] font-medium">{ord.buyer}</td>
                  <td className="py-3 px-3 text-[#64748B]">{ord.category}</td>
                  <td className="py-3 px-3 font-mono text-[#172033]">{ord.quantity.toLocaleString()}</td>
                  <td className="py-3 px-3 font-mono text-[#64748B]">{ord.targetShipDate}</td>
                  <td className="py-3 px-3">
                    <span
                      className={`font-mono font-bold px-2 py-0.5 rounded-full text-xs ${
                        ord.riskScore > 70
                          ? 'bg-rose-50 text-rose-700 border border-rose-200'
                          : ord.riskScore > 30
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : 'bg-emerald-50 text-[#065F46] border border-emerald-200'
                      }`}
                    >
                      {ord.riskScore}%
                    </span>
                  </td>
                  <td className="py-3 px-3 text-[#64748B]">
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
                      className="px-2.5 py-1 rounded bg-[#F8FAFC] hover:bg-[#EEF3F8] border border-[#E2E8F0] text-[#172033] font-semibold text-xs inline-flex items-center gap-1 cursor-pointer"
                    >
                      <span>View Details</span>
                      <ChevronRight className="w-3 h-3 text-[#64748B]" />
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
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/30 backdrop-blur-xs animate-fadeIn">
          {/* Backdrop Click */}
          <div 
            className="absolute inset-0"
            onClick={() => setSelectedOrderForDrawer(null)}
          />

          {/* Drawer Container */}
          <div className="relative w-full max-w-md sm:max-w-lg bg-white h-full shadow-2xl flex flex-col justify-between overflow-y-auto z-10 border-l border-[#E2E8F0] animate-slideLeft p-6">
            <div className="space-y-6">
              {/* Drawer Header */}
              <div className="flex items-start justify-between pb-4 border-b border-[#E2E8F0]">
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${
                      selectedOrderForDrawer.riskScore >= 70
                        ? 'bg-rose-50 text-rose-700 border-rose-200'
                        : selectedOrderForDrawer.riskScore >= 40
                        ? 'bg-amber-50 text-amber-700 border-amber-200'
                        : 'bg-emerald-50 text-[#065F46] border-emerald-200'
                    }`}>
                      {selectedOrderForDrawer.riskScore >= 70 ? 'CRITICAL SEVERITY' : 'MODERATE SEVERITY'}
                    </span>
                    <span className="text-[10px] font-mono text-[#64748B]">Simulated AI Audit</span>
                  </div>
                  <h2 className="text-xl font-bold text-[#172033] mt-1">
                    Order #{selectedOrderForDrawer.orderNumber}
                  </h2>
                  <p className="text-xs text-[#64748B]">
                    Buyer: <strong className="text-[#172033]">{selectedOrderForDrawer.buyer}</strong> · {selectedOrderForDrawer.category}
                  </p>
                </div>

                <button
                  onClick={() => setSelectedOrderForDrawer(null)}
                  className="p-1.5 rounded-lg text-[#64748B] hover:text-[#172033] hover:bg-[#F1F5F9] cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Calculated Risk Meter */}
              <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#172033]">Calculated Delay Risk Score</span>
                  <span className="font-mono font-bold text-lg text-rose-600">{selectedOrderForDrawer.riskScore}%</span>
                </div>
                <div className="w-full bg-[#E2E8F0] h-2.5 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${
                      selectedOrderForDrawer.riskScore >= 70 ? 'bg-rose-500' : 'bg-amber-500'
                    }`}
                    style={{ width: `${selectedOrderForDrawer.riskScore}%` }}
                  />
                </div>
                <div className="text-[11px] text-[#64748B] flex justify-between">
                  <span>Ship Cutoff: {selectedOrderForDrawer.targetShipDate}</span>
                  <span>Target: &lt; 25% Risk</span>
                </div>
              </div>

              {/* Relevant Production Information */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-[#172033] uppercase font-mono tracking-wider">
                  Production & Shop Floor Data
                </h4>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                    <div className="text-[#64748B] text-[11px]">Total Quantity</div>
                    <div className="font-bold text-[#172033] mt-0.5">{selectedOrderForDrawer.quantity?.toLocaleString()} pcs</div>
                  </div>
                  <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                    <div className="text-[#64748B] text-[11px]">Assigned Lines</div>
                    <div className="font-bold text-[#172033] mt-0.5">
                      {Array.isArray(selectedOrderForDrawer.lines) ? selectedOrderForDrawer.lines.join(', ') : 'Line 02'}
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                    <div className="text-[#64748B] text-[11px]">Assigned Team</div>
                    <div className="font-bold text-[#172033] mt-0.5">{selectedOrderForDrawer.team || 'Industrial Eng. Unit 2'}</div>
                  </div>
                  <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                    <div className="text-[#64748B] text-[11px]">Resolution Status</div>
                    <div className="font-bold text-amber-700 mt-0.5">Action Recommended</div>
                  </div>
                </div>
              </div>

              {/* Contributing Factors */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-[#172033] uppercase font-mono tracking-wider">
                  Contributing Factors
                </h4>
                <div className="p-3.5 rounded-xl bg-white border border-[#E2E8F0] space-y-2 text-xs">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-[#172033]">Primary Bottleneck</div>
                      <div className="text-[#64748B] mt-0.5">{selectedOrderForDrawer.primaryFactor}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 pt-2 border-t border-[#F1F5F9]">
                    <Clock className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-[#172033]">Port Logistics Cutoff</div>
                      <div className="text-[#64748B] mt-0.5">Chittagong terminal gate closes 48 hours prior to vessel departure.</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recommended Actions */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-[#172033] uppercase font-mono tracking-wider">
                  Recommended Next Actions
                </h4>
                <div className="p-3.5 rounded-xl bg-emerald-50/80 border border-emerald-200 text-xs space-y-2">
                  <div className="flex items-start gap-2 text-[#065F46]">
                    <CheckCircle2 className="w-4 h-4 text-[#087F6A] shrink-0 mt-0.5" />
                    <span>Allocate 18,000 unit deficit to verified Gazipur subcontractor to eliminate late delivery fines.</span>
                  </div>
                  <div className="flex items-start gap-2 text-[#065F46]">
                    <CheckCircle2 className="w-4 h-4 text-[#087F6A] shrink-0 mt-0.5" />
                    <span>Expedite remaining trims delivery with fabric warehouse supplier.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Drawer Footer Actions */}
            <div className="pt-4 border-t border-[#E2E8F0] flex items-center justify-between gap-3">
              <button
                onClick={() => {
                  setSelectedOrderForDrawer(null);
                  onNavigate('capacity');
                }}
                className="flex-1 py-2.5 rounded-lg bg-[#087F6A] hover:bg-[#066653] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-colors cursor-pointer"
              >
                <span>Activate Capacity Matching</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setSelectedOrderForDrawer(null)}
                className="px-4 py-2.5 rounded-lg bg-[#F8FAFC] hover:bg-[#EEF3F8] border border-[#E2E8F0] text-[#172033] font-semibold text-xs cursor-pointer"
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
