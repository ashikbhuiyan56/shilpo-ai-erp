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
    <aside className="w-64 bg-white border-r border-[#E2E8F0] flex flex-col justify-between overflow-y-auto shrink-0 py-4 px-3 shadow-xs">
      <div className="space-y-5">
        {/* Brand & Workspace in Sidebar */}
        <div className="px-2">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#087F6A] to-[#0D9488] text-white flex items-center justify-center font-bold font-bengali text-base shadow-sm shadow-emerald-700/20">
              শি
            </div>
            <div>
              <div className="text-sm font-bold text-[#172033] flex items-center gap-1">
                <span className="font-bengali text-[#087F6A]">শিল্প</span>
                <span className="font-extrabold text-[#172033]">AI</span>
                <span className="text-[11px] px-1.5 py-0.2 bg-emerald-50 text-[#087F6A] font-bold rounded border border-emerald-200 ml-1">
                  ERP
                </span>
              </div>
              <div className="text-[9px] font-mono text-[#64748B] tracking-wider uppercase">
                Enterprise RMG OS
              </div>
            </div>
          </div>

          {/* Workspace Switcher / Factory Card */}
          <div className="mt-3 p-2.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-xs">
            <div className="flex items-center justify-between text-[10px] font-medium text-[#64748B]">
              <span className="flex items-center gap-1 font-semibold text-[#172033]">
                <Building2 className="w-3 h-3 text-[#087F6A]" />
                Apex Horizon Mills
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-emerald-100" />
            </div>
            <div className="text-[10px] font-mono text-[#087F6A] font-semibold mt-1 flex items-center gap-1">
              <span>ONLINE</span>
              <span className="text-[#94A3B8]">•</span>
              <span className="text-[#64748B]">SHIFT 01 (08:00 - 16:30)</span>
            </div>
          </div>
        </div>

        {/* Navigation Item Groups */}
        <div className="space-y-4">
          {navigationGroups.map((group) => (
            <div key={group.label} className="space-y-0.5">
              <div className="px-2.5 py-1 text-[10px] font-mono font-bold text-[#94A3B8] uppercase tracking-wider">
                {group.label}
              </div>
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onTabChange(item.id)}
                    className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-xs transition-all cursor-pointer ${
                      isActive
                        ? 'bg-emerald-50 text-[#065F46] font-semibold shadow-xs border border-emerald-200/80'
                        : 'text-[#64748B] hover:text-[#172033] hover:bg-[#F1F5F9] font-medium'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-[#087F6A]' : 'text-[#94A3B8]'}`} />
                      <span className="truncate">{item.label}</span>
                    </div>
                    {item.badge && (
                      <span
                        className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wider ${
                          item.badgeColor === 'red'
                            ? 'bg-rose-50 text-rose-700 border border-rose-200'
                            : item.badgeColor === 'emerald'
                            ? 'bg-emerald-50 text-[#065F46] border border-emerald-200'
                            : item.badgeColor === 'blue'
                            ? 'bg-blue-50 text-blue-700 border border-blue-200'
                            : 'bg-slate-100 text-[#475569] border border-[#E2E8F0]'
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
      <div className="mt-4 pt-3 border-t border-[#E2E8F0] space-y-3">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-emerald-100 text-[#087F6A] border border-emerald-200 font-bold text-xs flex items-center justify-center">
              TA
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xs font-bold text-[#172033] leading-tight">Engr. Tanvir Ahmed</span>
              <span className="text-[10px] text-[#64748B] truncate max-w-[130px]">VP of Operations</span>
            </div>
          </div>
          <span className="w-2 h-2 rounded-full bg-emerald-500" title="Online" />
        </div>

        {/* Shift Pacing Micro Indicator */}
        <div className="p-2.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-[11px] space-y-1">
          <div className="flex items-center justify-between text-[#64748B] font-mono text-[10px]">
            <span>DAY TARGET PACING</span>
            <span className="font-bold text-[#087F6A]">96.4%</span>
          </div>
          <div className="w-full bg-[#E2E8F0] h-1.5 rounded-full overflow-hidden">
            <div className="bg-[#087F6A] h-full rounded-full w-[96.4%]" />
          </div>
        </div>
      </div>
    </aside>
  );
};
