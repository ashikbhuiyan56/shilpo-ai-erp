import React from 'react';
import { 
  ShoppingBag, 
  Activity, 
  Boxes, 
  ShoppingCart, 
  Truck, 
  DollarSign, 
  Users, 
  Settings as SettingsIcon,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  Search,
  Filter,
  Plus,
  ShieldCheck,
  Building2,
  Clock
} from 'lucide-react';
import { SAMPLE_ORDERS, SAMPLE_LINES } from '../../../data/mockData';
import { DemoTab } from '../../../types';
import { Badge } from '../../common/Badge';

interface DemoSecondaryModulesProps {
  tab: DemoTab;
  onNavigate: (tab: DemoTab) => void;
}

export const DemoSecondaryModules: React.FC<DemoSecondaryModulesProps> = ({
  tab,
  onNavigate,
}) => {
  // Orders View
  if (tab === 'orders') {
    return (
      <div className="space-y-6 pb-12">
        <div className="flex flex-wrap items-center justify-between gap-4 p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-[0_1px_3px_rgba(15,23,42,0.08)]">
          <div>
            <h1 className="text-2xl font-bold text-[#0B1120] flex items-center gap-2 tracking-tight">
              <ShoppingBag className="w-5 h-5 text-[#087F6A]" />
              <span>Garment Orders Management</span>
            </h1>
            <p className="text-sm text-[#334155] mt-1.5 leading-relaxed">
              Tech-pack parameters, BOM tracking, cutting approval, and delivery risk tracking across active POs.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button className="px-4 py-2.5 rounded-xl bg-[#087F6A] hover:bg-[#066653] text-white font-bold text-xs flex items-center gap-2 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 cursor-pointer">
              <Plus className="w-4 h-4" />
              <span>New Buyer Order</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {SAMPLE_ORDERS.map((ord) => (
            <div key={ord.id} className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-[0_1px_3px_rgba(15,23,42,0.08)] hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 space-y-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2.5">
                    <span className="text-lg font-bold text-[#0B1120] font-mono">{ord.orderNumber}</span>
                    <span className="text-xs px-2.5 py-0.5 rounded-md bg-[#F8FAFC] text-[#1E293B] border border-[#CBD5E1] font-semibold shadow-2xs">{ord.buyer}</span>
                    <span className={`text-xs px-2.5 py-0.5 rounded-full font-mono font-bold border shadow-2xs ${
                      ord.riskScore > 70 ? 'bg-rose-50 text-rose-700 border-rose-200' : 'bg-emerald-50 text-[#065F46] border-emerald-200'
                    }`}>
                      Risk: {ord.riskScore}%
                    </span>
                  </div>
                  <div className="text-xs text-[#475569] mt-1.5">
                    Style: <strong className="text-[#0B1120] font-semibold">{ord.style}</strong> · Category: {ord.category}
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs font-mono font-bold text-[#475569] uppercase tracking-wider">ORDER QUANTITY</div>
                  <div className="text-2xl font-extrabold text-[#0B1120] font-mono mt-0.5">{ord.quantity.toLocaleString()} pcs</div>
                  <div className="text-xs text-[#475569] font-mono font-medium mt-0.5">Cutoff: {ord.targetShipDate}</div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono font-semibold text-[#334155]">
                  <span>Production Progress ({ord.completedUnits.toLocaleString()} / {ord.quantity.toLocaleString()} pcs)</span>
                  <span className="text-[#087F6A] font-bold">{Math.round((ord.completedUnits / ord.quantity) * 100)}%</span>
                </div>
                <div className="w-full bg-[#E2E8F0] h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-[#087F6A] h-full transition-all duration-500" 
                    style={{ width: `${(ord.completedUnits / ord.quantity) * 100}%` }} 
                  />
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between pt-3 border-t border-[#F1F5F9] text-xs">
                <div className="text-[#475569]">
                  Assigned Lines: <span className="text-[#0B1120] font-mono font-bold">{ord.assignedLines.join(', ')}</span>
                </div>
                <div className="flex items-center gap-3">
                  {ord.riskScore > 70 && (
                    <button
                      onClick={() => onNavigate('capacity')}
                      className="text-rose-600 hover:text-rose-700 font-bold flex items-center gap-1.5 cursor-pointer transition-colors"
                    >
                      <span>Match Capacity Buffer</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                  <button
                    onClick={() => onNavigate('forecast')}
                    className="text-[#087F6A] hover:text-[#066653] font-bold flex items-center gap-1.5 cursor-pointer transition-colors"
                  >
                    <span>View Forecast</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Production Lines View
  if (tab === 'production') {
    return (
      <div className="space-y-6 pb-12">
        <div className="flex flex-wrap items-center justify-between gap-4 p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-[0_1px_3px_rgba(15,23,42,0.08)]">
          <div>
            <h1 className="text-2xl font-bold text-[#0B1120] flex items-center gap-2 tracking-tight">
              <Activity className="w-5 h-5 text-[#087F6A]" />
              <span>Sewing Lines & Machine Balances</span>
            </h1>
            <p className="text-sm text-[#334155] mt-1.5 leading-relaxed">
              Real-time Standard Minute Value (SMV) tracking, operator pitch times, bottleneck detection, and target output.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {SAMPLE_LINES.map((line) => (
            <div key={line.id} className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-[0_1px_3px_rgba(15,23,42,0.08)] hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 space-y-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-[#F1F5F9]">
                  <div>
                    <h3 className="text-base font-bold text-[#0B1120]">{line.name}</h3>
                    <div className="text-xs font-mono text-[#087F6A] font-semibold mt-0.5">{line.type}</div>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-mono font-bold border shadow-2xs ${
                    line.efficiency > 85 ? 'bg-emerald-50 text-[#065F46] border-emerald-200' : 'bg-amber-50 text-amber-800 border-amber-200'
                  }`}>
                    {line.efficiency}% SMV Eff.
                  </span>
                </div>

                <div className="space-y-2 text-xs pt-3">
                  <div className="flex justify-between text-[#475569]">
                    <span>Active Order</span>
                    <span className="text-[#0B1120] font-mono font-bold">{line.activeOrder}</span>
                  </div>
                  <div className="flex justify-between text-[#475569]">
                    <span>Hourly Rate</span>
                    <span className="text-[#0B1120] font-mono font-medium">{line.currentHourly} pcs/hr (Target: {line.targetHourly})</span>
                  </div>
                  <div className="flex justify-between text-[#475569]">
                    <span>Operators / Line</span>
                    <span className="text-[#0B1120] font-mono font-medium">{line.operators} Workers</span>
                  </div>
                  <div className="flex justify-between text-[#475569]">
                    <span>Defect Rate</span>
                    <span className={`font-mono font-bold ${line.defectRate > 2.0 ? 'text-rose-600' : 'text-[#087F6A]'}`}>
                      {line.defectRate}%
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-[#F1F5F9] flex items-center justify-between">
                <span className="text-xs text-[#475569] font-mono font-medium">Status: {line.status}</span>
                <button
                  onClick={() => onNavigate('quality')}
                  className="text-xs text-[#087F6A] hover:text-[#066653] font-bold cursor-pointer transition-colors"
                >
                  Inspect Line QC →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Inventory & Store View
  if (tab === 'inventory') {
    return (
      <div className="space-y-6 pb-12">
        <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-[0_1px_3px_rgba(15,23,42,0.08)]">
          <h1 className="text-2xl font-bold text-[#0B1120] flex items-center gap-2 tracking-tight">
            <Boxes className="w-5 h-5 text-[#087F6A]" />
            <span>Fabric Inventory & Roll Shade Lots</span>
          </h1>
          <p className="text-sm text-[#334155] mt-1.5 leading-relaxed">
            Roll-by-roll fabric shrinkage grouping, GSM inspection, yarn lot allocation, and trim store balances.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-[0_1px_3px_rgba(15,23,42,0.08)] hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 space-y-2">
            <div className="text-xs font-mono text-[#475569] font-bold uppercase tracking-wider">RAW FABRIC ROLLS IN STORE</div>
            <div className="text-3xl font-extrabold text-[#0B1120] font-mono">1,840 Rolls</div>
            <p className="text-xs text-[#334155] font-medium">38,000 kg single jersey & French terry</p>
          </div>
          <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-[0_1px_3px_rgba(15,23,42,0.08)] hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 space-y-2">
            <div className="text-xs font-mono text-[#475569] font-bold uppercase tracking-wider">SHADE GROUPING CLUSTERS</div>
            <div className="text-3xl font-extrabold text-[#087F6A] font-mono">Group A / B / C</div>
            <p className="text-xs text-[#334155] font-medium">Automatic spectrometer binning active</p>
          </div>
          <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-[0_1px_3px_rgba(15,23,42,0.08)] hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 space-y-2">
            <div className="text-xs font-mono text-[#475569] font-bold uppercase tracking-wider">TRIM & ACCESSORY STOCK</div>
            <div className="text-3xl font-extrabold text-[#0B1120] font-mono">99.2% Matched</div>
            <p className="text-xs text-[#334155] font-medium">YKK zippers, labels, and thread cones in stock</p>
          </div>
        </div>
      </div>
    );
  }

  // Procurement View
  if (tab === 'procurement') {
    return (
      <div className="space-y-6 pb-12">
        <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-[0_1px_3px_rgba(15,23,42,0.08)]">
          <h1 className="text-2xl font-bold text-[#0B1120] flex items-center gap-2 tracking-tight">
            <ShoppingCart className="w-5 h-5 text-[#087F6A]" />
            <span>Procurement, Spinning & BOM Tracking</span>
          </h1>
          <p className="text-sm text-[#334155] mt-1.5 leading-relaxed">
            Supplier lead times, spinning mill yarn deliveries, dyehouse lab dip approvals, and LC milestone tracking.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-[0_1px_3px_rgba(15,23,42,0.08)] space-y-4">
          <h3 className="text-base font-bold text-[#0B1120]">Active Purchase Orders & Supplier Milestones</h3>
          <div className="space-y-3 text-xs">
            <div className="p-4.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex flex-wrap sm:flex-nowrap items-center justify-between gap-3 shadow-2xs">
              <div>
                <div className="font-bold text-[#0B1120] text-sm">PO-9821 · 180 GSM Combed Cotton Yarn</div>
                <div className="text-xs text-[#475569] mt-0.5">Supplier: Square Textiles Ltd. · Qty: 12,000 kg</div>
              </div>
              <span className="text-xs font-mono font-bold text-[#087F6A] bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-200 shadow-2xs">
                Delivered & Inspected
              </span>
            </div>

            <div className="p-4.5 rounded-xl bg-rose-50/70 border border-rose-200 flex flex-wrap sm:flex-nowrap items-center justify-between gap-3 shadow-2xs">
              <div>
                <div className="font-bold text-rose-950 text-sm">PO-9824 · Reactive Dye Navy 180 GSM Jersey (For #BD-2048)</div>
                <div className="text-xs text-rose-700 mt-0.5">Supplier: Shasha Denim & Knit Dyeing · Qty: 8,500 kg</div>
              </div>
              <span className="text-xs font-mono font-bold text-rose-800 bg-rose-100/90 px-3 py-1 rounded-lg border border-rose-300 shadow-2xs">
                +3 Days Delayed (Risk Source)
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Logistics View
  if (tab === 'logistics') {
    return (
      <div className="space-y-6 pb-12">
        <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-[0_1px_3px_rgba(15,23,42,0.08)]">
          <h1 className="text-2xl font-bold text-[#0B1120] flex items-center gap-2 tracking-tight">
            <Truck className="w-5 h-5 text-[#087F6A]" />
            <span>Logistics, Chattogram Port & C&F Status</span>
          </h1>
          <p className="text-sm text-[#334155] mt-1.5 leading-relaxed">
            Vessel booking windows, container packing lists, customs documentation, and Chittagong Port feeder vessel connectivity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-[0_1px_3px_rgba(15,23,42,0.08)] hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 space-y-3.5">
            <h3 className="text-base font-bold text-[#0B1120]">Shipment Schedule: Order #BD-2070</h3>
            <div className="space-y-2 text-xs text-[#334155]">
              <div className="flex justify-between border-b border-[#F1F5F9] py-2">
                <span className="text-[#475569] font-medium">Buyer</span>
                <span className="font-bold text-[#0B1120]">Metro Fashion Group</span>
              </div>
              <div className="flex justify-between border-b border-[#F1F5F9] py-2">
                <span className="text-[#475569] font-medium">Vessel Feed</span>
                <span className="font-mono text-[#087F6A] font-bold">MSC EMERALD (Chattogram Port)</span>
              </div>
              <div className="flex justify-between border-b border-[#F1F5F9] py-2">
                <span className="text-[#475569] font-medium">Vessel Cutoff</span>
                <span className="font-mono text-[#0B1120] font-semibold">Tomorrow, 18:00 BST</span>
              </div>
              <div className="flex justify-between border-b border-[#F1F5F9] py-2">
                <span className="text-[#475569] font-medium">Packing Status</span>
                <span className="font-bold text-[#087F6A]">100% Cartons Scanned (25,000 pcs)</span>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-[0_1px_3px_rgba(15,23,42,0.08)] hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 space-y-3.5">
            <h3 className="text-base font-bold text-[#0B1120]">Shipment Schedule: Order #BD-2048</h3>
            <div className="space-y-2 text-xs text-[#334155]">
              <div className="flex justify-between border-b border-[#F1F5F9] py-2">
                <span className="text-[#475569] font-medium">Buyer</span>
                <span className="font-bold text-[#0B1120]">Nordic Apparel Co.</span>
              </div>
              <div className="flex justify-between border-b border-[#F1F5F9] py-2">
                <span className="text-[#475569] font-medium">Vessel Feed</span>
                <span className="font-mono text-[#0B1120] font-semibold">MAERSK SINGAPORE</span>
              </div>
              <div className="flex justify-between border-b border-[#F1F5F9] py-2">
                <span className="text-[#475569] font-medium">Cutoff Status</span>
                <span className="font-bold text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded-md border border-rose-200 shadow-2xs">
                  At Risk Without Capacity Buffer
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Finance View
  if (tab === 'finance') {
    return (
      <div className="space-y-6 pb-12">
        <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-[0_1px_3px_rgba(15,23,42,0.08)]">
          <h1 className="text-2xl font-bold text-[#0B1120] flex items-center gap-2 tracking-tight">
            <DollarSign className="w-5 h-5 text-[#087F6A]" />
            <span>Finance, CM Margin & LC Settlements</span>
          </h1>
          <p className="text-sm text-[#334155] mt-1.5 leading-relaxed">
            Cost of Making (CM) profitability by line, Back-to-Back Letters of Credit (LC), and penalty risk calculations.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-[0_1px_3px_rgba(15,23,42,0.08)] hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 space-y-1.5">
            <div className="text-xs font-mono text-[#475569] font-bold uppercase tracking-wider">AVERAGE CM MARGIN</div>
            <div className="text-3xl font-extrabold text-[#087F6A] font-mono mt-1">$0.84 / pc</div>
            <div className="text-xs text-[#334155] font-medium mt-1">Healthy factory margin target</div>
          </div>
          <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-[0_1px_3px_rgba(15,23,42,0.08)] hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 space-y-1.5">
            <div className="text-xs font-mono text-[#475569] font-bold uppercase tracking-wider">AIR-FREIGHT PENALTY SAVED</div>
            <div className="text-3xl font-extrabold text-[#0B1120] font-mono mt-1">$42,800</div>
            <div className="text-xs text-[#087F6A] font-semibold mt-1">By proactive delay prediction</div>
          </div>
          <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-[0_1px_3px_rgba(15,23,42,0.08)] hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 space-y-1.5">
            <div className="text-xs font-mono text-[#475569] font-bold uppercase tracking-wider">OPEN B2B LC EXPOSURE</div>
            <div className="text-3xl font-extrabold text-[#0B1120] font-mono mt-1">$1.45M</div>
            <div className="text-xs text-[#334155] font-medium mt-1">Standard Chartered / Eastern Bank</div>
          </div>
        </div>
      </div>
    );
  }

  // HR & Payroll View
  if (tab === 'hr-payroll') {
    return (
      <div className="space-y-6 pb-12">
        <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-[0_1px_3px_rgba(15,23,42,0.08)]">
          <h1 className="text-2xl font-bold text-[#0B1120] flex items-center gap-2 tracking-tight">
            <Users className="w-5 h-5 text-[#087F6A]" />
            <span>HR, Biometric Attendance & Wage Compliance</span>
          </h1>
          <p className="text-sm text-[#334155] mt-1.5 leading-relaxed">
            Gazette minimum wage grade structures, overtime (OT) limits, and digital payment disbursement logs.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-[0_1px_3px_rgba(15,23,42,0.08)] space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-base font-bold text-[#0B1120]">Shift A Biometric Attendance Summary</h3>
            <span className="text-xs font-mono font-bold text-[#087F6A] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 shadow-2xs">
              98.4% Present
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] shadow-2xs">
              <div className="text-xs text-[#475569] font-medium">Total Operators</div>
              <div className="font-bold text-[#0B1120] text-lg mt-1">540 Workers</div>
            </div>
            <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] shadow-2xs">
              <div className="text-xs text-[#475569] font-medium">Active Sewing Lines</div>
              <div className="font-bold text-[#087F6A] text-lg mt-1">8 Lines</div>
            </div>
            <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] shadow-2xs">
              <div className="text-xs text-[#475569] font-medium">OT Hours Cap</div>
              <div className="font-bold text-[#0B1120] text-lg mt-1">&lt; 2 hrs/day (Compliant)</div>
            </div>
            <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] shadow-2xs">
              <div className="text-xs text-[#475569] font-medium">MFS Disbursement</div>
              <div className="font-bold text-[#087F6A] text-lg mt-1">bKash / Nagad 100%</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Settings View
  return (
    <div className="space-y-6 pb-12">
      <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-[0_1px_3px_rgba(15,23,42,0.08)]">
        <h1 className="text-2xl font-bold text-[#0B1120] flex items-center gap-2 tracking-tight">
          <SettingsIcon className="w-5 h-5 text-[#087F6A]" />
          <span>Factory & Network Configurations</span>
        </h1>
        <p className="text-sm text-[#334155] mt-1.5 leading-relaxed">
          Machine telemetry connectors, edge camera settings, API integrations, and capacity privacy thresholds.
        </p>
      </div>

      <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-[0_1px_3px_rgba(15,23,42,0.08)] space-y-4 text-xs">
        <div className="flex flex-wrap items-center justify-between pb-3.5 border-b border-[#F1F5F9] gap-3">
          <div>
            <div className="font-bold text-sm text-[#0B1120]">Edge QC Vision Camera Sensor</div>
            <div className="text-xs text-[#475569] mt-0.5">Model: MobileNetV3-RMG-QC-v2 on RTSP 1080p</div>
          </div>
          <span className="text-[#087F6A] font-mono font-bold bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200 shadow-2xs text-xs">
            Connected
          </span>
        </div>

        <div className="flex flex-wrap items-center justify-between pb-3.5 border-b border-[#F1F5F9] gap-3">
          <div>
            <div className="font-bold text-sm text-[#0B1120]">Capacity Matching Privacy Shield</div>
            <div className="text-xs text-[#475569] mt-0.5">Shield factory identity until mutual consent is granted</div>
          </div>
          <span className="text-[#087F6A] font-mono font-bold bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200 shadow-2xs text-xs">
            Enabled (Zero-Knowledge)
          </span>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="font-bold text-sm text-[#0B1120]">Interactive Telemetry Stream Mode</div>
            <div className="text-xs text-[#475569] mt-0.5">Simulate shop-floor IoT data streams for interactive demonstration</div>
          </div>
          <span className="text-[#087F6A] font-mono font-bold bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200 shadow-2xs text-xs">
            Active
          </span>
        </div>
      </div>
    </div>
  );
};
