import React, { useState, useMemo, useEffect } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Zap, 
  AlertTriangle, 
  CheckCircle2, 
  Layers, 
  RotateCcw, 
  Sliders,
  Play,
  Info
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { DemoTab } from '../../../types';
import { 
  FactoryDataInput, 
  AiAnalysisResult, 
  calculateFactoryRisk, 
  SubcontractRequestPayload 
} from '../../../utils/factoryAiEngine';

export type { FactoryDataInput, AiAnalysisResult, SubcontractRequestPayload };

interface DemoFactoryDataEntryProps {
  onNavigate: (tab: DemoTab) => void;
  currentDataInput?: FactoryDataInput;
  onUpdateDataInput?: (input: FactoryDataInput) => void;
  onUpdateAnalysisResult?: (result: AiAnalysisResult) => void;
  onSelectCapacityMatch?: (payload: SubcontractRequestPayload) => void;
}

export const DemoFactoryDataEntry: React.FC<DemoFactoryDataEntryProps> = ({
  onNavigate,
  currentDataInput,
  onUpdateDataInput,
  onUpdateAnalysisResult,
  onSelectCapacityMatch,
}) => {
  // Preset scenarios
  const scenarios: Record<string, { label: string; desc: string; data: FactoryDataInput }> = {
    bottleneck: {
      label: 'Scenario A: Capacity Deficit & Fabric Delay',
      desc: 'High risk (50k order, 14 days left, fabric in transit delay, 9.8k deficit)',
      data: {
        orderNumber: 'BD-3048',
        buyerName: 'Nordic Apparel Co.',
        category: 'Knitwear',
        orderQuantity: 50000,
        daysRemaining: 14,
        currentProduction: 15000,
        dailyCapacity: 1800,
        inventoryTrimsPercent: 70,
        fabricStatus: 'In Transit / Delayed',
        defectRate: 4.8,
        majorDefects: ['Skipped Stitch', 'Shade Variation'],
        shipmentStatus: 'Port Feeder at Risk',
      },
    },
    criticalDeficit: {
      label: 'Scenario B: Severe Shortfall (Tight Cutoff)',
      desc: 'Severe delay (60k order, only 8 days left, dyeing lot pending, 24k deficit)',
      data: {
        orderNumber: 'BD-4091',
        buyerName: 'Zara Inditex',
        category: 'Woven',
        orderQuantity: 60000,
        daysRemaining: 8,
        currentProduction: 20000,
        dailyCapacity: 2000,
        inventoryTrimsPercent: 55,
        fabricStatus: 'Dyeing Lot Pending',
        defectRate: 6.5,
        majorDefects: ['Broken Needle', 'Puckering'],
        shipmentStatus: 'Port Feeder at Risk',
      },
    },
    healthy: {
      label: 'Scenario C: Balanced / On Track',
      desc: 'Low risk (30k order, 18 days left, 1.2k/day capacity, fabric in warehouse)',
      data: {
        orderNumber: 'BD-2015',
        buyerName: 'H&M Global',
        category: 'Knitwear',
        orderQuantity: 30000,
        daysRemaining: 18,
        currentProduction: 12000,
        dailyCapacity: 1200,
        inventoryTrimsPercent: 95,
        fabricStatus: 'In Warehouse',
        defectRate: 1.4,
        majorDefects: [],
        shipmentStatus: 'On Schedule',
      },
    },
    qualitySpike: {
      label: 'Scenario D: Quality & Rework Spike',
      desc: 'Moderate risk driven by 7.8% defect rate & customs buffer constraint',
      data: {
        orderNumber: 'BD-2980',
        buyerName: 'Target USA',
        category: 'Denim',
        orderQuantity: 35000,
        daysRemaining: 12,
        currentProduction: 18000,
        dailyCapacity: 1600,
        inventoryTrimsPercent: 85,
        fabricStatus: 'In Warehouse',
        defectRate: 7.8,
        majorDefects: ['Shade Variation', 'Washing Streaks'],
        shipmentStatus: 'Customs Clearance Pending',
      },
    },
  };

  const [form, setForm] = useState<FactoryDataInput>(
    currentDataInput || scenarios.bottleneck.data
  );
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [hasRunAnalysis, setHasRunAnalysis] = useState(true);

  // Synchronize when parent prop updates if needed
  useEffect(() => {
    if (currentDataInput) {
      setForm(currentDataInput);
    }
  }, [currentDataInput]);

  // Compute Rule-Based Simulated AI Analysis via shared engine
  const analysisResult = useMemo<AiAnalysisResult>(() => {
    return calculateFactoryRisk(form);
  }, [form]);

  // Automatically update parent state whenever analysis calculates
  useEffect(() => {
    if (onUpdateDataInput) {
      onUpdateDataInput(form);
    }
    if (onUpdateAnalysisResult) {
      onUpdateAnalysisResult(analysisResult);
    }
  }, [form, analysisResult, onUpdateDataInput, onUpdateAnalysisResult]);

  // Trigger analysis simulation
  const handleRunAiAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setHasRunAnalysis(true);
      if (onUpdateDataInput) onUpdateDataInput(form);
      if (onUpdateAnalysisResult) onUpdateAnalysisResult(analysisResult);

      if (analysisResult.delayRiskPercent > 60) {
        try {
          confetti({
            particleCount: 35,
            spread: 50,
            origin: { y: 0.6 },
            colors: ['#f97316', '#ef4444', '#087F6A'],
          });
        } catch (e) {
          // safe fallback
        }
      }
    }, 450);
  };

  // Connect to Capacity Network Demo
  const handleFindCapacity = () => {
    const payload = {
      orderNumber: form.orderNumber,
      buyer: form.buyerName,
      category: form.category,
      deficitUnits: analysisResult.capacityGap > 0 ? analysisResult.capacityGap : 15000,
      targetDays: form.daysRemaining,
      delayRiskScore: analysisResult.delayRiskPercent,
      reason: `${analysisResult.capacityGap.toLocaleString()} pcs capacity deficit on Order #${form.orderNumber}`,
    };

    if (onSelectCapacityMatch) {
      onSelectCapacityMatch(payload);
    }
    onNavigate('capacity');
  };

  const handleApplyScenario = (key: string) => {
    const sc = scenarios[key];
    if (sc) {
      setForm(sc.data);
      handleRunAiAnalysis();
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Disclaimer & Header Banner */}
      <div className="p-4 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-xs flex items-start gap-3 shadow-sm">
        <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <div className="font-bold text-amber-950 font-mono text-[11px] uppercase tracking-wider">
            PROTOTYPE / SIMULATED AI TESTBENCH
          </div>
          <p className="text-amber-900 text-xs leading-relaxed font-medium">
            This interactive sandbox demonstrates ShilpoAI’s real-time risk engine using simulated factory parameters. Changing order numbers, production rates, or material bottlenecks will immediately recompute the predictive delay score and trigger subcontract capacity matching.
          </p>
        </div>
      </div>

      {/* Main Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-6 rounded-xl bg-white border border-[#CBD5E1] shadow-sm">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl font-extrabold text-[#0B1120] flex items-center gap-2 tracking-tight">
              <Sparkles className="w-5 h-5 text-[#087F6A]" />
              <span>Interactive Factory Data Entry Sandbox</span>
            </h1>
            <div className="px-2.5 py-0.5 rounded-full border border-emerald-300 bg-emerald-50 text-[10px] font-bold text-[#065F46] uppercase tracking-wider shadow-sm">
              Working Sandbox
            </div>
          </div>
          <p className="text-sm text-[#334155] font-medium mt-1">
            Input live shop-floor data to run predictive risk analysis, detect capacity gaps, and seamlessly route overflow orders to verified peer mills.
          </p>
        </div>

        {/* Quick Scenario Preset Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-mono font-bold text-[#475569] mr-1">Load Scenarios:</span>
          {Object.entries(scenarios).map(([key, sc]) => (
            <button
              key={key}
              type="button"
              onClick={() => handleApplyScenario(key)}
              className="px-3 py-1.5 rounded-md bg-[#F8FAFC] hover:bg-[#EEF3F8] border border-[#CBD5E1] text-xs font-semibold text-[#0B1120] transition-all cursor-pointer shadow-sm hover:shadow hover:-translate-y-0.5"
              title={sc.desc}
            >
              {key === 'bottleneck' ? 'Deficit & Fabric Delay' : key === 'criticalDeficit' ? 'Severe Shortfall' : key === 'healthy' ? 'Healthy Flow' : 'Quality Spike'}
            </button>
          ))}
        </div>
      </div>

      {/* Input Form & AI Output Dual Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Form Inputs (7 Cols) */}
        <div className="lg:col-span-7 space-y-5">
          <div className="p-6 rounded-xl bg-white border border-[#CBD5E1] shadow-sm space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#CBD5E1]">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-[#087F6A]" />
                <h2 className="text-sm font-extrabold text-[#0B1120] uppercase tracking-wider font-mono">
                  1. Factory Parameter Inputs
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setForm(scenarios.bottleneck.data)}
                className="text-xs text-[#334155] hover:text-[#0B1120] flex items-center gap-1 font-mono font-bold transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Reset
              </button>
            </div>

            {/* Form Fields Grid */}
            <div className="space-y-4 text-xs">
              {/* Order & Buyer info */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-[#334155] font-mono font-bold text-xs">ORDER NUMBER</label>
                  <input
                    type="text"
                    value={form.orderNumber}
                    onChange={(e) => setForm({ ...form, orderNumber: e.target.value })}
                    className="w-full px-3 py-2 rounded-md bg-[#F8FAFC] border border-[#CBD5E1] text-[#0B1120] font-mono font-semibold focus:outline-none focus:border-[#087F6A] focus:ring-1 focus:ring-[#087F6A] shadow-sm"
                    placeholder="e.g. BD-3048"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[#334155] font-mono font-bold text-xs">BUYER / BRAND</label>
                  <input
                    type="text"
                    value={form.buyerName}
                    onChange={(e) => setForm({ ...form, buyerName: e.target.value })}
                    className="w-full px-3 py-2 rounded-md bg-[#F8FAFC] border border-[#CBD5E1] text-[#0B1120] font-semibold focus:outline-none focus:border-[#087F6A] focus:ring-1 focus:ring-[#087F6A] shadow-sm"
                    placeholder="e.g. Nordic Apparel"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[#334155] font-mono font-bold text-xs">GARMENT CATEGORY</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-md bg-[#F8FAFC] border border-[#CBD5E1] text-[#0B1120] font-semibold focus:outline-none focus:border-[#087F6A] focus:ring-1 focus:ring-[#087F6A] cursor-pointer shadow-sm"
                  >
                    <option value="Knitwear">Knitwear (T-Shirts, Polos)</option>
                    <option value="Woven">Woven (Shirts, Trousers)</option>
                    <option value="Denim">Denim Jeans</option>
                    <option value="Activewear">Activewear</option>
                  </select>
                </div>
              </div>

              {/* Order Quantity & Deadline */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-xl bg-[#F8FAFC] border border-[#CBD5E1] shadow-sm">
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <label className="text-[#0B1120] font-mono text-xs font-bold">ORDER QUANTITY</label>
                    <span className="text-[#087F6A] font-mono font-bold text-sm">{form.orderQuantity.toLocaleString()} pcs</span>
                  </div>
                  <input
                    type="number"
                    min="1000"
                    max="200000"
                    step="1000"
                    value={form.orderQuantity}
                    onChange={(e) => setForm({ ...form, orderQuantity: Number(e.target.value) || 0 })}
                    className="w-full px-3 py-2 rounded-md bg-white border border-[#CBD5E1] text-[#0B1120] font-mono font-bold focus:outline-none focus:border-[#087F6A] shadow-sm"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <label className="text-[#0B1120] font-mono text-xs font-bold">DAYS UNTIL DEADLINE</label>
                    <span className="text-[#087F6A] font-mono font-bold text-sm">{form.daysRemaining} Days</span>
                  </div>
                  <input
                    type="number"
                    min="1"
                    max="60"
                    value={form.daysRemaining}
                    onChange={(e) => setForm({ ...form, daysRemaining: Number(e.target.value) || 1 })}
                    className="w-full px-3 py-2 rounded-md bg-white border border-[#CBD5E1] text-[#0B1120] font-mono font-bold focus:outline-none focus:border-[#087F6A] shadow-sm"
                  />
                </div>
              </div>

              {/* Current Production & Daily Capacity */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-xl bg-[#F8FAFC] border border-[#CBD5E1] shadow-sm">
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <label className="text-[#0B1120] font-mono text-xs font-bold">CURRENT PRODUCTION COMPLETED</label>
                    <span className="text-[#334155] font-mono font-bold">{Math.round((form.currentProduction / Math.max(1, form.orderQuantity)) * 100)}%</span>
                  </div>
                  <input
                    type="number"
                    min="0"
                    max={form.orderQuantity}
                    step="500"
                    value={form.currentProduction}
                    onChange={(e) => setForm({ ...form, currentProduction: Number(e.target.value) || 0 })}
                    className="w-full px-3 py-2 rounded-md bg-white border border-[#CBD5E1] text-[#0B1120] font-mono font-semibold focus:outline-none focus:border-[#087F6A] shadow-sm"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <label className="text-[#0B1120] font-mono text-xs font-bold">DAILY PRODUCTION CAPACITY</label>
                    <span className="text-[#334155] font-mono font-bold">{form.dailyCapacity.toLocaleString()} pcs / day</span>
                  </div>
                  <input
                    type="number"
                    min="100"
                    max="20000"
                    step="100"
                    value={form.dailyCapacity}
                    onChange={(e) => setForm({ ...form, dailyCapacity: Number(e.target.value) || 100 })}
                    className="w-full px-3 py-2 rounded-md bg-white border border-[#CBD5E1] text-[#0B1120] font-mono font-semibold focus:outline-none focus:border-[#087F6A] shadow-sm"
                  />
                </div>
              </div>

              {/* Inventory & Fabric / Raw Material Status */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <label className="text-[#334155] font-mono font-bold text-xs">INVENTORY & TRIMS AVAILABLE</label>
                    <span className="text-[#087F6A] font-mono font-extrabold text-sm">{form.inventoryTrimsPercent}%</span>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="100"
                    step="5"
                    value={form.inventoryTrimsPercent}
                    onChange={(e) => setForm({ ...form, inventoryTrimsPercent: Number(e.target.value) })}
                    className="w-full accent-[#087F6A] cursor-pointer"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[#334155] font-mono font-bold text-xs">FABRIC / RAW MATERIAL STATUS</label>
                  <select
                    value={form.fabricStatus}
                    onChange={(e) => setForm({ ...form, fabricStatus: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-md bg-[#F8FAFC] border border-[#CBD5E1] text-[#0B1120] font-semibold focus:outline-none focus:border-[#087F6A] cursor-pointer shadow-sm"
                  >
                    <option value="In Warehouse">In Warehouse (Ready for Cutting)</option>
                    <option value="In Transit / Delayed">In Transit / Delayed (+3 Days)</option>
                    <option value="Dyeing Lot Pending">Dyeing Lot Lab-Dip Pending (+5 Days)</option>
                    <option value="Shortage">Critical Shortage (Re-knitting Needed)</option>
                  </select>
                </div>
              </div>

              {/* QC Defect Data & Shipment Status */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <label className="text-[#334155] font-mono font-bold text-xs">QC DEFECT RATE (%)</label>
                    <span className={`font-mono font-bold text-sm ${form.defectRate > 4.5 ? 'text-rose-700' : form.defectRate > 2.5 ? 'text-amber-700' : 'text-[#087F6A]'}`}>
                      {form.defectRate}%
                    </span>
                  </div>
                  <input
                    type="number"
                    min="0.1"
                    max="15.0"
                    step="0.1"
                    value={form.defectRate}
                    onChange={(e) => setForm({ ...form, defectRate: Number(e.target.value) || 0.1 })}
                    className="w-full px-3 py-2 rounded-md bg-[#F8FAFC] border border-[#CBD5E1] text-[#0B1120] font-mono font-semibold focus:outline-none focus:border-[#087F6A] shadow-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[#334155] font-mono font-bold text-xs">SHIPMENT & PORT STATUS</label>
                  <select
                    value={form.shipmentStatus}
                    onChange={(e) => setForm({ ...form, shipmentStatus: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-md bg-[#F8FAFC] border border-[#CBD5E1] text-[#0B1120] font-semibold focus:outline-none focus:border-[#087F6A] cursor-pointer shadow-sm"
                  >
                    <option value="On Schedule">On Schedule (Normal Port Feeder)</option>
                    <option value="Port Feeder at Risk">Port Feeder at Risk (Tight Cutoff)</option>
                    <option value="Vessel Booking Pending">Vessel Booking Pending</option>
                    <option value="Customs Clearance Pending">Customs Clearance Pending</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Run AI Analysis Action Button */}
            <div className="pt-2 border-t border-[#CBD5E1]">
              <button
                type="button"
                onClick={handleRunAiAnalysis}
                disabled={isAnalyzing}
                className="w-full py-3 rounded-md bg-[#087F6A] hover:bg-[#066653] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer disabled:opacity-50 hover:shadow-md"
              >
                {isAnalyzing ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Evaluating Production Neural Risk Model...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-white" />
                    <span>Calculate Predictive Risk</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: AI Risk Result & Recommendations (5 Cols) */}
        <div className="lg:col-span-5 space-y-5">
          <div className="p-6 rounded-xl bg-white border border-[#CBD5E1] shadow-sm space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#CBD5E1]">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#087F6A]" />
                <h2 className="text-sm font-extrabold text-[#0B1120] uppercase tracking-wider font-mono">
                  2. AI Risk Evaluation Result
                </h2>
              </div>
              <span className="text-xs font-mono font-bold text-[#334155] bg-[#F8FAFC] px-2.5 py-1 rounded-md border border-[#CBD5E1] shadow-sm">
                {analysisResult.analyzedAt}
              </span>
            </div>

            {/* Primary KPI Card: Delay Risk % & Status */}
            <div className={`p-5 rounded-xl border space-y-3 shadow-sm ${
              analysisResult.delayRiskPercent >= 70
                ? 'bg-rose-50 border-rose-300'
                : analysisResult.delayRiskPercent >= 40
                ? 'bg-amber-50 border-amber-300'
                : 'bg-emerald-50 border-emerald-300'
            }`}>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs font-mono uppercase font-bold tracking-wider text-[#334155]">
                    CALCULATED DELAY RISK
                  </div>
                  <div className={`text-4xl font-black font-mono mt-0.5 tracking-tight ${
                    analysisResult.delayRiskPercent >= 70
                      ? 'text-rose-700'
                      : analysisResult.delayRiskPercent >= 40
                      ? 'text-amber-700'
                      : 'text-[#087F6A]'
                  }`}>
                    {analysisResult.delayRiskPercent}%
                  </div>
                </div>

                <div className="text-right">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold font-mono uppercase border shadow-sm ${
                    analysisResult.delayRiskPercent >= 70
                      ? 'bg-rose-100 text-rose-900 border-rose-300'
                      : analysisResult.delayRiskPercent >= 40
                      ? 'bg-amber-100 text-amber-900 border-amber-300'
                      : 'bg-emerald-100 text-[#065F46] border-emerald-300'
                  }`}>
                    {analysisResult.productionRiskLevel} Risk
                  </span>
                  <div className="text-xs text-[#334155] font-mono font-medium mt-1.5">
                    Quality Risk: <span className="text-[#0B1120] font-bold">{analysisResult.qualityRiskLevel}</span>
                  </div>
                </div>
              </div>

              {/* Progress visual bar */}
              <div className="w-full bg-[#CBD5E1] h-2.5 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 ${
                    analysisResult.delayRiskPercent >= 70
                      ? 'bg-rose-600'
                      : analysisResult.delayRiskPercent >= 40
                      ? 'bg-amber-600'
                      : 'bg-[#087F6A]'
                  }`}
                  style={{ width: `${analysisResult.delayRiskPercent}%` }}
                />
              </div>
            </div>

            {/* Capacity Gap Indicator */}
            <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#CBD5E1] space-y-2 shadow-sm">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono font-bold text-[#334155]">PRODUCTION CAPACITY GAP</span>
                <span className={`font-mono font-bold text-sm ${analysisResult.capacityGap > 0 ? 'text-amber-800' : 'text-[#065F46]'}`}>
                  {analysisResult.capacityGap > 0 
                    ? `-${analysisResult.capacityGap.toLocaleString()} pcs Deficit` 
                    : '✓ Zero Deficit (Capacity Balanced)'}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#CBD5E1] text-xs text-[#334155] font-mono">
                <div>
                  <span className="text-[#475569] font-medium">Projected Run:</span> <strong className="text-[#0B1120]">{analysisResult.projectedOutput.toLocaleString()} pcs</strong>
                </div>
                <div>
                  <span className="text-[#475569] font-medium">Committed Order:</span> <strong className="text-[#0B1120]">{form.orderQuantity.toLocaleString()} pcs</strong>
                </div>
              </div>
            </div>

            {/* AI Explanation */}
            <div className="space-y-1.5">
              <div className="text-xs font-mono font-bold text-[#334155] uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#087F6A]" />
                <span>AI Risk Synthesis & Explanation</span>
              </div>
              <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#CBD5E1] text-xs text-[#0B1120] leading-relaxed font-medium shadow-sm">
                {analysisResult.aiExplanation}
              </div>
            </div>

            {/* Recommended Action Checklist */}
            <div className="space-y-2">
              <div className="text-xs font-mono font-bold text-[#334155] uppercase tracking-wider">
                Recommended Actions:
              </div>
              <div className="space-y-1.5">
                {analysisResult.recommendedActions.map((act, idx) => (
                  <div key={idx} className="p-2.5 rounded-md bg-emerald-50/70 border border-emerald-300 text-xs text-[#0B1120] flex items-start gap-2 shadow-sm font-medium">
                    <CheckCircle2 className="w-4 h-4 text-[#087F6A] shrink-0 mt-0.5" />
                    <span>{act}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Dynamic Capacity Matching Transition Button */}
            {analysisResult.capacityGap > 0 ? (
              <div className="pt-2 border-t border-[#CBD5E1] space-y-2">
                <div className="text-xs text-amber-900 font-mono flex items-center gap-1.5 font-bold">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                  <span>Deficit of {analysisResult.capacityGap.toLocaleString()} pcs requires peer delegation.</span>
                </div>
                <button
                  type="button"
                  onClick={handleFindCapacity}
                  className="w-full py-3 rounded-md bg-[#087F6A] hover:bg-[#066653] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer hover:shadow-md hover:-translate-y-0.5"
                >
                  <Zap className="w-4 h-4 fill-white" />
                  <span>Find Verified Capacity ({analysisResult.capacityGap.toLocaleString()} pcs) →</span>
                </button>
              </div>
            ) : (
              <div className="pt-2 border-t border-[#CBD5E1]">
                <button
                  type="button"
                  onClick={() => onNavigate('forecast')}
                  className="w-full py-3 rounded-md bg-[#F8FAFC] hover:bg-[#EEF3F8] border border-[#CBD5E1] text-[#0B1120] font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm hover:shadow"
                >
                  <span>View 14-Day Delivery Forecast</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#334155]" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Root Cause Key Factors Matrix */}
      <div className="p-6 rounded-xl bg-white border border-[#CBD5E1] shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#CBD5E1]">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#087F6A]" />
            <h3 className="text-sm font-extrabold text-[#0B1120] uppercase tracking-wider font-mono">
              Live Neural Factor Weights (Root-Cause Correlation)
            </h3>
          </div>
          <span className="text-xs text-[#334155] font-mono font-medium">
            Directly derived from active form variables
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          {analysisResult.keyFactors.map((factor, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-[#F8FAFC] border border-[#CBD5E1] space-y-2 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-[#334155] font-mono text-xs uppercase font-bold">{factor.label}</span>
                <span className={`w-2.5 h-2.5 rounded-full ${
                  factor.severity === 'red' ? 'bg-rose-500 ring-2 ring-rose-200' :
                  factor.severity === 'amber' ? 'bg-amber-500 ring-2 ring-amber-200' :
                  'bg-emerald-500 ring-2 ring-emerald-200'
                }`} />
              </div>
              <div className="font-extrabold text-[#0B1120] text-sm">
                {factor.impact}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
