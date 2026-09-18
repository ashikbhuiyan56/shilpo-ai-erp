import React, { useState } from 'react';
import { 
  TrendingUp, 
  AlertTriangle, 
  Calendar, 
  ArrowRight, 
  Sparkles, 
  Zap, 
  CheckCircle2, 
  Activity, 
  Sliders, 
  Clock 
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend 
} from 'recharts';
import { DemoTab } from '../../../types';
import { Badge } from '../../common/Badge';

interface DemoProductionForecastProps {
  onNavigate: (tab: DemoTab) => void;
}

export const DemoProductionForecast: React.FC<DemoProductionForecastProps> = ({
  onNavigate,
}) => {
  const [capacityMatchActive, setCapacityMatchActive] = useState(false);
  const [extraLineAllocated, setExtraLineAllocated] = useState(false);

  // Trajectory forecast curve
  const forecastData = [
    { day: 'Today', required: 12000, projected: 10500, withMatch: 12000 },
    { day: '+1 Day', required: 24000, projected: 21200, withMatch: 24500 },
    { day: '+3 Days', required: 48000, projected: 41800, withMatch: 49000 },
    { day: '+7 Days', required: 96000, projected: 82000, withMatch: 97500 },
    { day: '+14 Days (Cutoff)', required: 160000, projected: 139000, withMatch: 162000 },
  ];

  const calculatedDelayDays = capacityMatchActive ? 0.0 : extraLineAllocated ? 1.1 : 2.4;

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-[0_1px_3px_rgba(15,23,42,0.08)]">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-bold text-[#0B1120] tracking-tight flex items-center gap-2.5">
              <TrendingUp className="w-5 h-5 text-[#087F6A]" />
              <span>Production Forecast & Delivery Trajectory</span>
            </h1>
            <Badge variant={capacityMatchActive ? 'emerald' : 'amber'} dot>
              {capacityMatchActive ? 'SCHEDULE RESTORED (0.0D DELAY)' : '2.4-DAY DELAY PROJECTED'}
            </Badge>
          </div>
          <p className="text-sm text-[#334155] font-medium mt-1 leading-relaxed">
            Predictive time-series simulation evaluating SMV velocity, fabric intake timelines, and line constraints across 14-day production windows.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('capacity')}
            className="px-4 py-2.5 rounded-xl bg-[#087F6A] hover:bg-[#066653] text-white font-bold text-xs flex items-center gap-2 transition-all duration-200 hover:-translate-y-0.5 shadow-sm hover:shadow-md cursor-pointer"
          >
            <Zap className="w-4 h-4" />
            <span>Open Capacity Match Engine</span>
          </button>
        </div>
      </div>

      {/* Trajectory Simulation Status Banner */}
      <div className={`p-6 rounded-2xl border transition-all shadow-sm ${
        calculatedDelayDays === 0
          ? 'bg-emerald-50/70 border-emerald-300/80'
          : 'bg-rose-50/70 border-rose-300/80'
      }`}>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className={`p-3 rounded-xl border shadow-2xs ${
              calculatedDelayDays === 0 
                ? 'bg-emerald-100 text-[#065F46] border-emerald-300/80' 
                : 'bg-rose-100 text-rose-800 border-rose-300/80'
            }`}>
              {calculatedDelayDays === 0 ? <CheckCircle2 className="w-6 h-6" /> : <AlertTriangle className="w-6 h-6" />}
            </div>
            <div>
              <div className="text-xs font-mono font-extrabold uppercase tracking-wider text-[#475569]">
                AI PREDICTIVE TRAJECTORY STATUS
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-[#0B1120] tracking-tight">
                {calculatedDelayDays === 0
                  ? 'Delivery Trajectory: 100% On-Time (Vessel Window Protected)'
                  : `Current Trajectory: Potential ${calculatedDelayDays}-Day Shipment Delay`}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-6 text-right">
            <div>
              <div className="text-xs font-mono font-semibold text-[#475569]">PROJECTED OUTPUT DEFICIT</div>
              <div className="text-2xl font-black text-[#0B1120] font-mono">
                {capacityMatchActive ? '0 pcs' : '21,000 pcs'}
              </div>
            </div>
            <div>
              <div className="text-xs font-mono font-semibold text-[#475569]">REMEDY STATUS</div>
              <div className={`text-2xl font-black font-mono ${capacityMatchActive ? 'text-[#087F6A]' : 'text-rose-700'}`}>
                {capacityMatchActive ? 'RESOLVED' : 'AT RISK'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trajectory Chart (Expected vs Required vs With Matched Capacity) */}
      <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-[0_1px_3px_rgba(15,23,42,0.08)] space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h3 className="text-base font-extrabold text-[#0B1120] tracking-tight">14-Day Cumulative Production Velocity (Units)</h3>
            <p className="text-xs text-[#334155] font-medium">Comparing unassisted vs. AI capacity-matched production run</p>
          </div>
          <div className="flex items-center gap-4 text-xs font-mono">
            <span className="flex items-center gap-1.5 text-[#475569] font-bold">
              <span className="w-2.5 h-2.5 rounded-full bg-[#94A3B8]" /> Required Pace
            </span>
            <span className="flex items-center gap-1.5 text-rose-700 font-extrabold">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-600" /> Unassisted Pace (-2.4d)
            </span>
            <span className="flex items-center gap-1.5 text-[#087F6A] font-extrabold">
              <span className="w-2.5 h-2.5 rounded-full bg-[#087F6A]" /> With Capacity Match
            </span>
          </div>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={forecastData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
              <XAxis dataKey="day" stroke="#CBD5E1" tick={{ fill: '#475569', fontSize: 11, fontWeight: 500 }} />
              <YAxis stroke="#CBD5E1" tick={{ fill: '#475569', fontSize: 11, fontWeight: 500 }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#FFFFFF', 
                  borderColor: '#CBD5E1', 
                  borderRadius: '10px', 
                  fontSize: '12px', 
                  fontWeight: 600,
                  color: '#0B1120', 
                  boxShadow: '0 4px 6px -1px rgba(0,0,0,0.08)' 
                }} 
              />
              <Line type="monotone" dataKey="required" name="Required Pace" stroke="#94A3B8" strokeDasharray="5 5" strokeWidth={2} dot={{ fill: '#94A3B8', r: 3 }} />
              <Line type="monotone" dataKey="projected" name="Current Trajectory" stroke="#E11D48" strokeWidth={2.5} dot={{ fill: '#E11D48', r: 4 }} />
              <Line type="monotone" dataKey="withMatch" name="Capacity Matched" stroke="#087F6A" strokeWidth={2.5} dot={{ fill: '#087F6A', r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Interactive Scenario & Remediation Simulator Controls */}
      <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-[0_1px_3px_rgba(15,23,42,0.08)] space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-[#F1F5F9]">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-[#087F6A]" />
            <h3 className="text-base font-extrabold text-[#0B1120] tracking-tight">Interactive Line Balancing & Action Simulator</h3>
          </div>
          <span className="text-xs font-mono font-semibold text-[#475569]">Test remediation vectors in real time</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Action 1: Internal Line Shift */}
          <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#CBD5E1] flex items-center justify-between shadow-2xs">
            <div>
              <div className="text-xs font-bold text-[#0B1120]">Reallocate Line 04 (Internal Shift)</div>
              <p className="text-xs text-[#334155] font-medium mt-0.5">
                Shifts 4,000 units capacity from Basic T-Shirt line. Recovers 1.3 days.
              </p>
            </div>
            <button
              onClick={() => setExtraLineAllocated(!extraLineAllocated)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer shadow-2xs hover:shadow-xs ${
                extraLineAllocated
                  ? 'bg-[#087F6A] text-white shadow-sm'
                  : 'bg-white border border-[#CBD5E1] text-[#0B1120] hover:bg-[#F1F5F9]'
              }`}
            >
              {extraLineAllocated ? 'Allocated ✓' : 'Simulate Shift'}
            </button>
          </div>

          {/* Action 2: Activate Verified Peer Capacity */}
          <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-300/80 flex items-center justify-between shadow-2xs">
            <div>
              <div className="text-xs font-extrabold text-[#065F46]">
                Activate Peer Capacity Network (Partner #BD-017)
              </div>
              <p className="text-xs text-[#334155] font-medium mt-0.5">
                Routes 18,000 units to Gazipur Unit 3. Recovers 2.4 days (Full On-Time).
              </p>
            </div>
            <button
              onClick={() => setCapacityMatchActive(!capacityMatchActive)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer shadow-2xs hover:shadow-xs ${
                capacityMatchActive
                  ? 'bg-[#087F6A] text-white shadow-sm'
                  : 'bg-white border border-[#087F6A] text-[#087F6A] hover:bg-emerald-50'
              }`}
            >
              {capacityMatchActive ? 'Matching Active ✓' : 'Engage Network'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
