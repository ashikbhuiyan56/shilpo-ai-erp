import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Activity, 
  AlertTriangle, 
  CheckCircle2, 
  TrendingUp, 
  Boxes, 
  Truck, 
  ArrowRight,
  Sparkles,
  Zap,
  RefreshCw,
  Sliders,
  Calendar,
  Download,
  GitCompare,
  Clock,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  PackageCheck
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { SAMPLE_ORDERS, SAMPLE_LINES } from '../../../data/mockData';
import { DemoTab } from '../../../types';

interface DemoOverviewProps {
  onNavigate: (tab: DemoTab) => void;
  selectedFactory: string;
}

export const DemoOverview: React.FC<DemoOverviewProps> = ({
  onNavigate,
  selectedFactory,
}) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [productionMultiplier, setProductionMultiplier] = useState(1);
  const [activeCockpitTab, setActiveCockpitTab] = useState<'risk' | 'lines' | 'capacity'>('risk');
  const [dateRange, setDateRange] = useState<'today' | '7d' | '30d' | 'quarter'>('today');
  const [chartPeriod, setChartPeriod] = useState<'7d' | '30d' | '3m'>('7d');
  const [lastUpdated, setLastUpdated] = useState('10:45 AM (Just now)');

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setProductionMultiplier(1 + Math.random() * 0.05);
      const now = new Date();
      setLastUpdated(`${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} (Just now)`);
    }, 400);
  };

  // Hourly / Daily production data
  const productionTrendData = [
    { label: '08:00', actual: 1100, planned: 1200 },
    { label: '09:00', actual: 1450, planned: 1500 },
    { label: '10:00', actual: Math.round(1680 * productionMultiplier), planned: 1600 },
    { label: '11:00', actual: Math.round(1820 * productionMultiplier), planned: 1750 },
    { label: '12:00', actual: 1400, planned: 1500 },
    { label: '13:00', actual: 1720, planned: 1700 },
    { label: '14:00', actual: Math.round(1910 * productionMultiplier), planned: 1800 },
    { label: '15:00', actual: 1780, planned: 1750 },
    { label: '16:00', actual: 1620, planned: 1700 },
  ];

  // Factory Line Efficiency Data
  const lineEfficiencyData = [
    { name: 'Line 01', actual: 95, target: 85, fill: '#087F6A' },
    { name: 'Line 02', actual: 76, target: 85, fill: '#F59E0B' }, // bottleneck
    { name: 'Line 03', actual: 97, target: 85, fill: '#087F6A' },
    { name: 'Line 04', actual: 88, target: 85, fill: '#0D9488' },
  ];

  // Order status distribution
  const orderStatusPie = [
    { name: 'In Production', value: 2, color: '#087F6A' },
    { name: 'Pending Approvals', value: 1, color: '#2563EB' },
    { name: 'Completed & Packed', value: 1, color: '#10B981' },
    { name: 'At Delay Risk', value: 1, color: '#E11D48' },
  ];

  // Inventory alert items
  const inventoryAlerts = [
    { item: '180 GSM Jersey Knit (Navy)', required: '4,200 kg', available: '1,800 kg', severity: 'Critical', line: 'Line 02' },
    { item: 'YKK #5 Nylon Coil Zippers', required: '22,000 pcs', available: '14,000 pcs', severity: 'Moderate', line: 'Line 04' },
    { item: 'OEKO-TEX Care Labels', required: '45,000 pcs', available: '42,000 pcs', severity: 'Low', line: 'Line 01' },
  ];

  // Sparkline data helpers
  const sparklineOrders = [{ v: 3 }, { v: 4 }, { v: 4 }, { v: 5 }, { v: 5 }];
  const sparklineEfficiency = [{ v: 88 }, { v: 89 }, { v: 91 }, { v: 90 }, { v: 92.4 }];
  const sparklineDelivery = [{ v: 94 }, { v: 95 }, { v: 95 }, { v: 97 }, { v: 96.8 }];
  const sparklineOutput = [{ v: 11000 }, { v: 11500 }, { v: 12100 }, { v: 12300 }, { v: 12480 }];
  const sparklineInventory = [{ v: 810 }, { v: 825 }, { v: 830 }, { v: 838 }, { v: 842 }];
  const sparklineRisks = [{ v: 3 }, { v: 2 }, { v: 2 }, { v: 1 }, { v: 1 }];

  return (
    <div className="space-y-6 pb-12">
      {/* =========================================================================
          1. HEADER SECTION (Good morning, Factory Manager)
          ========================================================================= */}
      <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <h1 className="text-2xl font-bold text-[#172033] tracking-tight">
                Good morning, Factory Manager
              </h1>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-[#065F46] border border-emerald-200 text-xs font-semibold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>DEMO DATA</span>
              </span>
            </div>
            <p className="text-sm text-[#64748B] mt-1">
              Here's what's happening across your production network at <strong className="text-[#172033]">{selectedFactory}</strong> today.
            </p>
          </div>

          {/* Action Toolbar */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* Date Range Selector */}
            <div className="inline-flex rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] p-0.5 text-xs font-semibold text-[#64748B]">
              <button
                onClick={() => setDateRange('today')}
                className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                  dateRange === 'today' ? 'bg-white text-[#172033] shadow-xs font-bold' : 'hover:text-[#172033]'
                }`}
              >
                Today
              </button>
              <button
                onClick={() => setDateRange('7d')}
                className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                  dateRange === '7d' ? 'bg-white text-[#172033] shadow-xs font-bold' : 'hover:text-[#172033]'
                }`}
              >
                7 Days
              </button>
              <button
                onClick={() => setDateRange('30d')}
                className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                  dateRange === '30d' ? 'bg-white text-[#172033] shadow-xs font-bold' : 'hover:text-[#172033]'
                }`}
              >
                Month
              </button>
              <button
                onClick={() => setDateRange('quarter')}
                className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                  dateRange === 'quarter' ? 'bg-white text-[#172033] shadow-xs font-bold' : 'hover:text-[#172033]'
                }`}
              >
                Q3 2026
              </button>
            </div>

            {/* Compare Button */}
            <button
              onClick={() => onNavigate('forecast')}
              className="px-3 py-2 rounded-lg bg-[#F8FAFC] hover:bg-[#EEF3F8] border border-[#E2E8F0] text-xs font-semibold text-[#172033] flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Compare with Historical Factory Pacing"
            >
              <GitCompare className="w-3.5 h-3.5 text-[#64748B]" />
              <span className="hidden sm:inline">Compare</span>
            </button>

            {/* Export Report */}
            <button
              onClick={() => alert('Exporting Production Shift Report (PDF/Excel) with verified chain-of-custody data...')}
              className="px-3 py-2 rounded-lg bg-[#F8FAFC] hover:bg-[#EEF3F8] border border-[#E2E8F0] text-xs font-semibold text-[#172033] flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Export Report"
            >
              <Download className="w-3.5 h-3.5 text-[#64748B]" />
              <span className="hidden sm:inline">Export</span>
            </button>

            {/* Refresh Button */}
            <button
              onClick={handleRefresh}
              className="px-3 py-2 rounded-lg bg-[#F8FAFC] hover:bg-[#EEF3F8] border border-[#E2E8F0] text-xs font-semibold text-[#172033] flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Refresh Shop Floor Telemetry"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-[#087F6A] ${isRefreshing ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>

            {/* Factory Data Entry Sandbox Shortcut */}
            <button
              onClick={() => onNavigate('data-entry')}
              className="px-3.5 py-2 rounded-lg bg-[#087F6A] hover:bg-[#066653] text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-all cursor-pointer"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Data Entry Sandbox</span>
            </button>
          </div>
        </div>

        {/* Sub-bar: Last updated & Live status */}
        <div className="mt-4 pt-3 border-t border-[#F1F5F9] flex flex-wrap items-center justify-between text-xs text-[#64748B]">
          <div className="flex items-center gap-2 font-mono text-[11px]">
            <Clock className="w-3.5 h-3.5 text-[#087F6A]" />
            <span>Last Telemetry Sync: <strong className="text-[#172033] font-semibold">{lastUpdated}</strong></span>
            <span className="text-[#CBD5E1]">|</span>
            <span>Active Shifts: <strong>Shift 01 & 02</strong></span>
          </div>
          <div className="text-[11px] font-mono text-[#087F6A] font-semibold">
            All 18 Shop-Floor IoT Readers Active
          </div>
        </div>
      </div>

      {/* =========================================================================
          2. SIX MAIN KPI CARDS (Light Mode, Pristine Spacing & Sparklines)
          ========================================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {/* KPI 1: Active Orders (Emerald #087F6A) */}
        <div 
          onClick={() => onNavigate('orders')}
          className="p-4 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs hover:border-[#CBD5E1] hover:shadow-sm transition-all cursor-pointer flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-full bg-emerald-50 text-[#087F6A] flex items-center justify-center border border-emerald-100">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-[#065F46] border border-emerald-200">
              +2 vs Prev
            </span>
          </div>
          <div className="mt-3">
            <div className="text-xs font-semibold text-[#64748B]">Active Orders</div>
            <div className="text-2xl font-bold text-[#172033] tracking-tight mt-0.5">5 POs</div>
            <div className="text-[11px] text-[#64748B] mt-0.5">180,000 units total</div>
          </div>
          <div className="h-7 mt-3 flex items-end">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sparklineOrders}>
                <Line type="monotone" dataKey="v" stroke="#087F6A" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* KPI 2: Production Efficiency (Blue #2563EB) */}
        <div 
          onClick={() => onNavigate('production')}
          className="p-4 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs hover:border-[#CBD5E1] hover:shadow-sm transition-all cursor-pointer flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-full bg-blue-50 text-[#2563EB] flex items-center justify-center border border-blue-100">
              <Activity className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
              +3.8%
            </span>
          </div>
          <div className="mt-3">
            <div className="text-xs font-semibold text-[#64748B]">Production Efficiency</div>
            <div className="text-2xl font-bold text-[#172033] tracking-tight mt-0.5">92.4%</div>
            <div className="text-[11px] text-[#64748B] mt-0.5">SMV Benchmark: 85%</div>
          </div>
          <div className="h-7 mt-3 flex items-end">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sparklineEfficiency}>
                <Line type="monotone" dataKey="v" stroke="#2563EB" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* KPI 3: On-Time Delivery Rate (Violet #7C3AED) */}
        <div 
          onClick={() => onNavigate('logistics')}
          className="p-4 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs hover:border-[#CBD5E1] hover:shadow-sm transition-all cursor-pointer flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-full bg-purple-50 text-[#7C3AED] flex items-center justify-center border border-purple-100">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200">
              +1.2%
            </span>
          </div>
          <div className="mt-3">
            <div className="text-xs font-semibold text-[#64748B]">On-Time Delivery</div>
            <div className="text-2xl font-bold text-[#172033] tracking-tight mt-0.5">96.8%</div>
            <div className="text-[11px] text-[#64748B] mt-0.5">OTIF Export Rating</div>
          </div>
          <div className="h-7 mt-3 flex items-end">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sparklineDelivery}>
                <Line type="monotone" dataKey="v" stroke="#7C3AED" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* KPI 4: Total Production Output (Teal #0D9488) */}
        <div 
          onClick={() => onNavigate('production')}
          className="p-4 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs hover:border-[#CBD5E1] hover:shadow-sm transition-all cursor-pointer flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-full bg-teal-50 text-[#0D9488] flex items-center justify-center border border-teal-100">
              <Boxes className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-50 text-teal-700 border border-teal-200">
              +4.2%
            </span>
          </div>
          <div className="mt-3">
            <div className="text-xs font-semibold text-[#64748B]">Today Output</div>
            <div className="text-2xl font-bold text-[#172033] tracking-tight mt-0.5">
              {Math.round(12480 * productionMultiplier).toLocaleString()} <span className="text-xs font-normal text-[#64748B]">pcs</span>
            </div>
            <div className="text-[11px] text-[#64748B] mt-0.5">Daily target: 12,000 pcs</div>
          </div>
          <div className="h-7 mt-3 flex items-end">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sparklineOutput}>
                <Line type="monotone" dataKey="v" stroke="#0D9488" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* KPI 5: Inventory Value (Amber #D97706) */}
        <div 
          onClick={() => onNavigate('inventory')}
          className="p-4 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs hover:border-[#CBD5E1] hover:shadow-sm transition-all cursor-pointer flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-full bg-amber-50 text-[#D97706] flex items-center justify-center border border-amber-100">
              <TrendingUp className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
              Optimal
            </span>
          </div>
          <div className="mt-3">
            <div className="text-xs font-semibold text-[#64748B]">Inventory Value</div>
            <div className="text-2xl font-bold text-[#172033] tracking-tight mt-0.5">$842,000</div>
            <div className="text-[11px] text-[#64748B] mt-0.5">70% trims allocated</div>
          </div>
          <div className="h-7 mt-3 flex items-end">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sparklineInventory}>
                <Line type="monotone" dataKey="v" stroke="#D97706" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* KPI 6: Open Risk Alerts (Rose #E11D48) */}
        <div 
          onClick={() => onNavigate('risk-center')}
          className="p-4 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs hover:border-rose-300 hover:shadow-sm transition-all cursor-pointer flex flex-col justify-between group"
        >
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-full bg-rose-50 text-[#E11D48] flex items-center justify-center border border-rose-100">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200">
              High Priority
            </span>
          </div>
          <div className="mt-3">
            <div className="text-xs font-semibold text-[#64748B]">Open Risk Alerts</div>
            <div className="text-2xl font-bold text-[#E11D48] tracking-tight mt-0.5">1 Alert</div>
            <div className="text-[11px] text-[#64748B] mt-0.5 truncate">Order #BD-2048 (78% Delay)</div>
          </div>
          <div className="h-7 mt-3 flex items-end">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sparklineRisks}>
                <Line type="monotone" dataKey="v" stroke="#E11D48" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* =========================================================================
          3. ANALYTICS CARDS (Production Performance & Order Status)
          ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Production Performance Card (8 Cols) */}
        <div className="lg:col-span-8 p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#F1F5F9]">
              <div>
                <h3 className="text-base font-bold text-[#172033]">Production Pacing & Hourly Trajectory</h3>
                <p className="text-xs text-[#64748B] mt-0.5">
                  Actual shop-floor piece output vs target line allocation across all sewing lines.
                </p>
              </div>

              {/* Filter Tabs */}
              <div className="flex items-center gap-1 bg-[#F8FAFC] p-1 rounded-lg border border-[#E2E8F0] text-xs font-semibold text-[#64748B]">
                <button
                  onClick={() => setChartPeriod('7d')}
                  className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                    chartPeriod === '7d' ? 'bg-white text-[#172033] shadow-xs' : 'hover:text-[#172033]'
                  }`}
                >
                  Hourly
                </button>
                <button
                  onClick={() => setChartPeriod('30d')}
                  className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                    chartPeriod === '30d' ? 'bg-white text-[#172033] shadow-xs' : 'hover:text-[#172033]'
                  }`}
                >
                  Daily (7D)
                </button>
                <button
                  onClick={() => setChartPeriod('3m')}
                  className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                    chartPeriod === '3m' ? 'bg-white text-[#172033] shadow-xs' : 'hover:text-[#172033]'
                  }`}
                >
                  Monthly (3M)
                </button>
              </div>
            </div>

            {/* Recharts Area Chart */}
            <div className="h-72 w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={productionTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="actualGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#087F6A" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#087F6A" stopOpacity={0.0} />
                    </linearGradient>
                    <linearGradient id="plannedGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563EB" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#2563EB" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                  <XAxis 
                    dataKey="label" 
                    tick={{ fill: '#64748B', fontSize: 11 }} 
                    stroke="#E2E8F0" 
                  />
                  <YAxis 
                    tick={{ fill: '#64748B', fontSize: 11 }} 
                    stroke="#E2E8F0"
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#FFFFFF', 
                      borderRadius: '12px', 
                      border: '1px solid #E2E8F0',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.08)',
                      fontSize: '12px',
                      color: '#172033'
                    }} 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="actual" 
                    stroke="#087F6A" 
                    strokeWidth={2.5} 
                    fill="url(#actualGrad)" 
                    name="Actual Pieces"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="planned" 
                    stroke="#2563EB" 
                    strokeWidth={2} 
                    strokeDasharray="4 4"
                    fill="url(#plannedGrad)" 
                    name="Target Line Plan"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Performance Summary Footnote */}
          <div className="mt-4 pt-3 border-t border-[#F1F5F9] flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#087F6A]" />
                <span className="font-semibold text-[#172033]">Actual Output: 12,480 pcs</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#2563EB]" />
                <span className="text-[#64748B]">Target Planned: 12,000 pcs</span>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded bg-emerald-50 text-[#065F46] font-bold">
              Target Achievement: 104.0%
            </span>
          </div>
        </div>

        {/* Order Status Donut Card (4 Cols) */}
        <div className="lg:col-span-4 p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#F1F5F9]">
              <div>
                <h3 className="text-base font-bold text-[#172033]">Active Order Status</h3>
                <p className="text-xs text-[#64748B]">Breakdown across 5 active buyer orders</p>
              </div>
              <button 
                onClick={() => onNavigate('orders')}
                className="text-xs font-semibold text-[#087F6A] hover:underline"
              >
                View All
              </button>
            </div>

            <div className="h-52 w-full mt-2 relative flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={orderStatusPie}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={75}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {orderStatusPie.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#FFFFFF', 
                      borderRadius: '8px', 
                      border: '1px solid #E2E8F0',
                      fontSize: '11px' 
                    }} 
                  />
                </PieChart>
              </ResponsiveContainer>
              {/* Donut Center text */}
              <div className="absolute text-center pointer-events-none">
                <div className="text-2xl font-black text-[#172033]">5</div>
                <div className="text-[10px] text-[#64748B] font-medium uppercase tracking-wider">Orders</div>
              </div>
            </div>

            {/* Donut Legend */}
            <div className="space-y-2 mt-2">
              {orderStatusPie.map((item) => (
                <div key={item.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-[#64748B]">{item.name}</span>
                  </div>
                  <span className="font-bold text-[#172033]">{item.value} PO</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#F1F5F9] text-xs text-[#64748B]">
            <span className="font-semibold text-rose-600">1 Order at delay risk:</span> #BD-2048 (78% risk score)
          </div>
        </div>
      </div>

      {/* =========================================================================
          4. SECONDARY ANALYTICS (Factory Efficiency, Inventory Alerts, Shipment Progress)
          ========================================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card 1: Factory Line Efficiency Bar Chart */}
        <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#F1F5F9]">
              <div>
                <h3 className="text-sm font-bold text-[#172033]">Factory Sewing Efficiency</h3>
                <p className="text-xs text-[#64748B]">SMV rating per line vs 85% benchmark</p>
              </div>
              <button 
                onClick={() => onNavigate('production')}
                className="text-xs font-semibold text-[#087F6A] hover:underline"
              >
                Lines
              </button>
            </div>

            <div className="h-44 w-full mt-3">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={lineEfficiencyData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                  <XAxis dataKey="name" tick={{ fill: '#64748B', fontSize: 11 }} stroke="#E2E8F0" />
                  <YAxis tick={{ fill: '#64748B', fontSize: 11 }} stroke="#E2E8F0" domain={[0, 100]} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#FFFFFF', 
                      borderRadius: '8px', 
                      border: '1px solid #E2E8F0',
                      fontSize: '11px' 
                    }} 
                  />
                  <Bar dataKey="actual" radius={[4, 4, 0, 0]}>
                    {lineEfficiencyData.map((entry, index) => (
                      <Cell key={`bar-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-[#F1F5F9] text-xs flex items-center justify-between">
            <span className="text-[#64748B]">Line 02 operating at 76% (bottleneck)</span>
            <button 
              onClick={() => onNavigate('capacity')}
              className="text-[#087F6A] font-bold hover:underline text-[11px]"
            >
              Buffer Match →
            </button>
          </div>
        </div>

        {/* Card 2: Inventory Low Stock Alerts */}
        <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#F1F5F9]">
              <div>
                <h3 className="text-sm font-bold text-[#172033]">Raw Material Shortages</h3>
                <p className="text-xs text-[#64748B]">Fabric & trims requiring warehouse restock</p>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 font-bold text-[10px] border border-rose-200">
                2 Items Critical
              </span>
            </div>

            <div className="space-y-3 mt-3">
              {inventoryAlerts.map((mat, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-[#172033]">{mat.item}</span>
                    <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded ${
                      mat.severity === 'Critical' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {mat.severity}
                    </span>
                  </div>
                  <div className="flex justify-between text-[11px] text-[#64748B]">
                    <span>Allocated: {mat.line}</span>
                    <span className="font-mono text-[#172033]">{mat.available} / {mat.required}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-[#F1F5F9] flex justify-between items-center text-xs">
            <span className="text-[#64748B]">Warehouse: Gazipur Main Hub</span>
            <button
              onClick={() => onNavigate('inventory')}
              className="text-[#087F6A] font-bold hover:underline"
            >
              View Inventory Store →
            </button>
          </div>
        </div>

        {/* Card 3: Shipment Progress & Port Pacing */}
        <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#F1F5F9]">
              <div>
                <h3 className="text-sm font-bold text-[#172033]">Export Logistics & Port Pacing</h3>
                <p className="text-xs text-[#64748B]">Chattogram port feeder vessel cutoffs</p>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-[#065F46] font-bold text-[10px] border border-emerald-200">
                98.2% OTIF
              </span>
            </div>

            <div className="space-y-3 mt-3">
              <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-2 text-xs">
                <div className="flex items-center justify-between font-semibold text-[#172033]">
                  <span>Order #BD-2070 · Denim Pants</span>
                  <span className="text-[#087F6A]">Port Ready</span>
                </div>
                <div className="w-full bg-[#E2E8F0] h-2 rounded-full overflow-hidden">
                  <div className="bg-[#087F6A] h-full rounded-full w-[95%]" />
                </div>
                <div className="flex justify-between text-[11px] text-[#64748B]">
                  <span>Vessel Cutoff: In 3 Days</span>
                  <span>19,000 / 20,000 pcs inspected</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-2 text-xs">
                <div className="flex items-center justify-between font-semibold text-[#172033]">
                  <span>Order #BD-2048 · Knit Polo</span>
                  <span className="text-rose-600 font-bold">2.4 Days Behind</span>
                </div>
                <div className="w-full bg-[#E2E8F0] h-2 rounded-full overflow-hidden">
                  <div className="bg-rose-500 h-full rounded-full w-[41%]" />
                </div>
                <div className="flex justify-between text-[11px] text-[#64748B]">
                  <span>Feeder: MSC Maersk Lines</span>
                  <span>18,500 / 45,000 pcs produced</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-[#F1F5F9] flex justify-between items-center text-xs">
            <span className="text-[#64748B]">Chittagong Port Terminal</span>
            <button
              onClick={() => onNavigate('logistics')}
              className="text-[#087F6A] font-bold hover:underline"
            >
              Logistics Center →
            </button>
          </div>
        </div>
      </div>

      {/* =========================================================================
          5. INTERACTIVE SHOP-FLOOR SIMULATION COCKPIT
          ========================================================================= */}
      <div className="rounded-2xl bg-white border border-[#E2E8F0] shadow-xs overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-[#E2E8F0] flex flex-wrap items-center justify-between gap-3 bg-[#F8FAFC]">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#087F6A] animate-ping" />
              <span className="text-xs font-mono font-bold text-[#172033] uppercase tracking-wider">
                Live RMG Operational Simulation
              </span>
            </div>
            <div className="hidden sm:block text-xs text-[#64748B] font-mono">
              | AI Telemetry Node #BD-RMG-02
            </div>
          </div>

          {/* Interactive Cockpit Switcher Tabs */}
          <div className="flex items-center gap-1.5 p-1 rounded-lg bg-white border border-[#E2E8F0] text-xs">
            <button
              onClick={() => setActiveCockpitTab('risk')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                activeCockpitTab === 'risk'
                  ? 'bg-emerald-50 text-[#065F46] font-bold border border-emerald-200'
                  : 'text-[#64748B] hover:text-[#172033]'
              }`}
            >
              Predictive Risk
            </button>
            <button
              onClick={() => setActiveCockpitTab('lines')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                activeCockpitTab === 'lines'
                  ? 'bg-emerald-50 text-[#065F46] font-bold border border-emerald-200'
                  : 'text-[#64748B] hover:text-[#172033]'
              }`}
            >
              Active Sewing Lines
            </button>
            <button
              onClick={() => setActiveCockpitTab('capacity')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                activeCockpitTab === 'capacity'
                  ? 'bg-emerald-50 text-[#065F46] font-bold border border-emerald-200'
                  : 'text-[#64748B] hover:text-[#172033]'
              }`}
            >
              Capacity Match
            </button>
          </div>
        </div>

        {/* Cockpit Content Area */}
        <div className="p-5 sm:p-6">
          {activeCockpitTab === 'risk' && (
            <div className="p-5 rounded-xl bg-rose-50/50 border border-rose-200 space-y-4">
              <div className="flex flex-wrap items-start justify-between gap-3 pb-3 border-b border-rose-200/80">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-rose-100 text-rose-700 border border-rose-200">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-mono font-bold text-rose-800 flex items-center gap-2">
                      <span>PREDICTIVE DELAY ALERT</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-rose-200 text-rose-900 font-bold">HIGH PRIORITY</span>
                    </div>
                    <div className="text-base font-bold text-[#172033] mt-0.5">Order #BD-2048 · Organic Cotton Polo (45,000 pcs)</div>
                    <div className="text-xs text-[#64748B]">Buyer: Nordic Apparel Co. · Target Delivery: In 14 Days</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-[#64748B] font-mono">Calculated Delay Risk</div>
                  <div className="text-3xl font-black text-rose-600 font-mono">78%</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                <div className="bg-white p-3 rounded-xl border border-[#E2E8F0]">
                  <div className="text-[#64748B] font-mono text-[11px]">Root Cause Detected:</div>
                  <div className="font-semibold text-[#172033] mt-1">Fabric Dye-Lot delay (+3 days) + Line 02 SMV bottleneck (76.4%).</div>
                </div>
                <div className="bg-white p-3 rounded-xl border border-[#E2E8F0]">
                  <div className="text-[#64748B] font-mono text-[11px]">Shipment Impact:</div>
                  <div className="font-semibold text-rose-700 mt-1">2.4 Days Behind Chattogram Port Feeder Cutoff.</div>
                </div>
                <div className="bg-white p-3 rounded-xl border border-[#E2E8F0]">
                  <div className="text-[#64748B] font-mono text-[11px]">AI Recommendation:</div>
                  <div className="font-semibold text-[#087F6A] mt-1">Allocate 18,000 units to Verified Partner #BD-017.</div>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-rose-200/80">
                <div className="text-xs text-[#172033] font-mono flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-[#087F6A]" />
                  <span>Action recovers <strong className="text-[#087F6A]">2.4 days</strong> and eliminates air-freight penalties</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onNavigate('capacity')}
                    className="px-4 py-2 rounded-lg bg-[#087F6A] hover:bg-[#066653] text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition-all cursor-pointer"
                  >
                    <span>Activate Verified Capacity</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => onNavigate('risk-center')}
                    className="px-3.5 py-2 rounded-lg bg-white hover:bg-[#F8FAFC] border border-[#E2E8F0] text-[#172033] text-xs font-semibold cursor-pointer"
                  >
                    Full Risk Matrix
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeCockpitTab === 'lines' && (
            <div className="space-y-3">
              <div className="text-xs font-mono text-[#64748B] flex justify-between items-center px-1">
                <span>ACTIVE SEWING LINES ({selectedFactory})</span>
                <span>EFFICIENCY (SMV) & HOURLY PACING</span>
              </div>
              {[
                { name: 'Line 01 (Woven Shirts)', order: 'BD-2051', eff: 95, target: '160/hr', status: 'Running', color: 'emerald' },
                { name: 'Line 02 (Knit Polo)', order: 'BD-2048', eff: 76, target: '220/hr', status: 'Bottleneck', color: 'amber' },
                { name: 'Line 03 (Woven Twill)', order: 'BD-2051', eff: 97, target: '175/hr', status: 'Running', color: 'emerald' },
                { name: 'Line 04 (Denim 5-Pocket)', order: 'BD-2070', eff: 88, target: '140/hr', status: 'Optimal', color: 'teal' },
              ].map((line, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div>
                    <div className="font-bold text-[#172033]">{line.name}</div>
                    <div className="text-[#64748B] text-[11px]">Allocated Order #{line.order} · Pacing: {line.target}</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-xs font-bold text-[#172033]">{line.eff}% Efficiency</div>
                      <div className={`text-[10px] font-bold ${
                        line.status === 'Bottleneck' ? 'text-amber-700' : 'text-[#087F6A]'
                      }`}>
                        {line.status}
                      </div>
                    </div>
                    <button
                      onClick={() => onNavigate('production')}
                      className="px-2.5 py-1 rounded bg-white hover:bg-[#EEF3F8] border border-[#E2E8F0] text-[11px] font-semibold text-[#172033]"
                    >
                      Line Telemetry
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeCockpitTab === 'capacity' && (
            <div className="p-5 rounded-xl bg-emerald-50/50 border border-emerald-200 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span className="font-bold text-[#172033] text-sm">Verified Peer Capacity Matches</span>
                </div>
                <span className="text-xs font-mono font-bold text-[#065F46]">4 Partners Online in Gazipur Hub</span>
              </div>
              <p className="text-xs text-[#64748B]">
                Immediate certified RMG subcontract capacity available for Order #BD-2048 surplus production (18,000 pcs).
              </p>
              <div className="pt-2 flex items-center gap-3">
                <button
                  onClick={() => onNavigate('capacity')}
                  className="px-4 py-2 rounded-lg bg-[#087F6A] hover:bg-[#066653] text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-all cursor-pointer"
                >
                  <span>Open Capacity Matching Network</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
