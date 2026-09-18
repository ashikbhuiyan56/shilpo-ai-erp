import React from 'react';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Activity, 
  Boxes, 
  ShoppingCart, 
  ShieldAlert, 
  Network, 
  Truck, 
  DollarSign, 
  Users, 
  Sparkles, 
  ShieldCheck, 
  Settings, 
  TrendingUp, 
  Scan,
  Sliders,
  Building2,
  CheckCircle2
} from 'lucide-react';
import { DemoTab } from '../../types';
import { ShilpoLogo } from '../common/ShilpoLogo';

interface DemoSidebarProps {
  activeTab: DemoTab;
  onTabChange: (tab: DemoTab) => void;
}

export const DemoSidebar: React.FC<DemoSidebarProps> = ({
  activeTab,
  onTabChange,
}) => {
  const navigationGroups = [
    {
      label: 'MAIN',
      items: [
        { id: 'overview' as DemoTab, label: 'Executive Overview', icon: LayoutDashboard, badge: 'Live', badgeColor: 'emerald' },
        { id: 'data-entry' as DemoTab, label: 'Factory Data Entry', icon: Sliders, badge: 'Sandbox', badgeColor: 'emerald' },
      ],
    },
    {
      label: 'NETWORK',
      items: [
        { id: 'capacity' as DemoTab, label: 'Capacity Network', icon: Network, badge: 'Match', badgeColor: 'emerald' },
      ],
    },
    {
      label: 'INTELLIGENCE',
      items: [
        { id: 'risk-center' as DemoTab, label: 'AI Risk Center', icon: ShieldAlert, badge: '1 Alert', badgeColor: 'red' },
        { id: 'quality' as DemoTab, label: 'Quality Intelligence', icon: Scan, badge: 'AI QC', badgeColor: 'blue' },
        { id: 'forecast' as DemoTab, label: 'Production Forecast', icon: TrendingUp },
        { id: 'copilot' as DemoTab, label: 'ShilpoAI Copilot', icon: Sparkles, badge: 'AI', badgeColor: 'blue' },
        { id: 'trust' as DemoTab, label: 'Trust & Audit', icon: ShieldCheck },
      ],
    },
    {
      label: 'OPERATIONS',
      items: [
        { id: 'orders' as DemoTab, label: 'Orders Management', icon: ShoppingBag },
        { id: 'production' as DemoTab, label: 'Production Lines', icon: Activity },
        { id: 'inventory' as DemoTab, label: 'Inventory & Store', icon: Boxes },
        { id: 'procurement' as DemoTab, label: 'Procurement & BOM', icon: ShoppingCart },
        { id: 'logistics' as DemoTab, label: 'Logistics & Ports', icon: Truck },
        { id: 'finance' as DemoTab, label: 'Finance & CM Margin', icon: DollarSign },
        { id: 'hr-payroll' as DemoTab, label: 'HR & Wage Compliance', icon: Users },
      ],
    },
    {
      label: 'SYSTEM',
      items: [
        { id: 'settings' as DemoTab, label: 'Factory Settings', icon: Settings },
      ],
    },
  ];

  return (
    <aside className="w-64 bg-white border-r border-[#CBD5E1] flex flex-col justify-between overflow-y-auto shrink-0 py-4 px-3 shadow-[0_1px_3px_rgba(15,23,42,0.08)]">
      <div className="space-y-5">
        {/* Brand & Workspace in Sidebar */}
        <div className="px-2">
          <div className="flex items-center gap-2.5">
            <ShilpoLogo className="w-9 h-9" />
            <div>
              <div className="text-sm font-bold text-[#0B1120] flex items-center gap-1">
                <span className="font-bengali text-[#087F6A] font-bold">শিল্প</span>
                <span className="font-extrabold text-[#0B1120]">AI</span>
                <span className="text-[11px] px-1.5 py-0.5 bg-emerald-50 text-[#065F46] font-bold rounded-md border border-emerald-300 ml-1">
                  ERP
                </span>
              </div>
              <div className="text-[10px] font-mono text-[#475569] font-semibold tracking-wider uppercase">
                Enterprise RMG OS
              </div>
            </div>
          </div>

          {/* Workspace Switcher / Factory Card */}
          <div className="mt-3 p-3 rounded-xl bg-[#F8FAFC] border border-[#CBD5E1] text-xs shadow-sm">
            <div className="flex items-center justify-between text-xs font-medium text-[#334155]">
              <span className="flex items-center gap-1.5 font-bold text-[#0B1120]">
                <Building2 className="w-4 h-4 text-[#087F6A]" />
                Apex Horizon Mills
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-emerald-200" />
            </div>
            <div className="text-[11px] font-mono font-bold mt-2 flex items-center gap-2">
              <span className="px-1.5 py-0.5 rounded-md bg-emerald-100 text-[#065F46] font-extrabold">ONLINE</span>
              <span className="text-[#94A3B8]">•</span>
              <span className="text-[#334155] font-semibold">SHIFT 01 (08:00 - 16:30)</span>
            </div>
          </div>
        </div>

        {/* Navigation Item Groups */}
        <div className="space-y-4">
          {navigationGroups.map((group) => (
            <div key={group.label} className="space-y-1">
              <div className="px-2.5 py-1 text-[11px] font-mono font-bold text-[#64748B] uppercase tracking-wider">
                {group.label}
              </div>
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onTabChange(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-md text-xs transition-all duration-150 cursor-pointer ${
                      isActive
                        ? 'bg-[#087F6A] text-white font-bold shadow-sm'
                        : 'text-[#334155] hover:text-[#0B1120] hover:bg-[#F1F5F9] font-medium'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className={`w-4 h-4 transition-colors ${isActive ? 'text-white' : 'text-[#64748B]'}`} />
                      <span className="truncate text-xs font-semibold">{item.label}</span>
                    </div>
                    {item.badge && (
                      <span
                        className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                          isActive
                            ? 'bg-white/20 text-white border border-white/30'
                            : item.badgeColor === 'red'
                            ? 'bg-rose-50 text-rose-700 border border-rose-300 font-extrabold'
                            : item.badgeColor === 'emerald'
                            ? 'bg-emerald-50 text-[#065F46] border border-emerald-300'
                            : item.badgeColor === 'blue'
                            ? 'bg-blue-50 text-blue-800 border border-blue-300'
                            : 'bg-slate-100 text-[#1E293B] border border-slate-300'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom User Card in Sidebar */}
      <div className="mt-4 pt-3 border-t border-[#CBD5E1] space-y-3">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-emerald-100 text-[#087F6A] border border-emerald-300 font-extrabold text-xs flex items-center justify-center shadow-sm">
              TA
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xs font-bold text-[#0B1120] leading-tight">Engr. Tanvir Ahmed</span>
              <span className="text-[11px] text-[#475569] font-medium truncate max-w-[130px]">VP of Operations</span>
            </div>
          </div>
          <span className="w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-emerald-200" title="Online" />
        </div>

        {/* Shift Pacing Micro Indicator */}
        <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#CBD5E1] space-y-2 shadow-sm">
          <div className="flex items-center justify-between text-[#334155] font-mono text-[11px]">
            <span className="font-semibold uppercase">Day Target Pacing</span>
            <span className="font-extrabold text-[#087F6A]">96.4%</span>
          </div>
          <div className="w-full bg-[#CBD5E1] h-1.5 rounded-full overflow-hidden">
            <div className="bg-[#087F6A] h-full rounded-full w-[96.4%]" />
          </div>
        </div>
      </div>
    </aside>
  );
};
