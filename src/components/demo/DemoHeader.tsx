import React, { useState } from 'react';
import { 
  Building2, 
  Search, 
  Bell, 
  ArrowLeft, 
  Clock, 
  Sparkles, 
  ChevronDown, 
  AlertTriangle, 
  X,
  Presentation,
  CheckCircle2,
  ChevronRight,
  RefreshCw
} from 'lucide-react';
import { DemoTab } from '../../types';

interface DemoHeaderProps {
  activeTab: DemoTab;
  onTabChange: (tab: DemoTab) => void;
  onBackToPublic: () => void;
  onStartPresentation: () => void;
  selectedFactory: string;
  onFactoryChange: (factory: string) => void;
}

export const DemoHeader: React.FC<DemoHeaderProps> = ({
  activeTab,
  onTabChange,
  onBackToPublic,
  onStartPresentation,
  selectedFactory,
  onFactoryChange,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showFactoryDropdown, setShowFactoryDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const getTabBreadcrumb = () => {
    switch (activeTab) {
      case 'overview': return 'Executive Overview';
      case 'data-entry': return 'Factory Data Entry Sandbox';
      case 'risk-center': return 'AI Risk Command Center';
      case 'quality': return 'AI Quality Intelligence Scanner';
      case 'forecast': return 'Production 14-Day Forecast';
      case 'capacity': return 'Capacity Matching Network';
      case 'copilot': return 'ShilpoAI Copilot Assistant';
      case 'trust': return 'Trust & Compliance Audit';
      case 'orders': return 'Orders Management';
      case 'production': return 'Production Lines Telemetry';
      case 'inventory': return 'Inventory & Materials Store';
      case 'procurement': return 'Procurement & BOM Tracking';
      case 'logistics': return 'Logistics & Port Feeder Pacing';
      case 'finance': return 'Finance & CM Margin Optimization';
      case 'hr-payroll': return 'HR & Wage Compliance';
      case 'settings': return 'Factory Configuration & Settings';
      default: return 'Command Center';
    }
  };

  const searchItems = [
    { label: 'Factory Data Entry Sandbox', tab: 'data-entry' as DemoTab, sub: 'Adjust live orders, capacity & calculate risk' },
    { label: 'Order #BD-2048 (Nordic Knit Polo)', tab: 'orders' as DemoTab, sub: '78% Delay Risk · Line 02 & 04' },
    { label: 'Order #BD-2051 (Zara Casual Shirts)', tab: 'orders' as DemoTab, sub: '95% SMV Efficiency · Line 01 & 03' },
    { label: 'Line 02 (Knit Polo Bottleneck)', tab: 'production' as DemoTab, sub: 'Efficiency 76.4% · Inspection Flagged' },
    { label: 'Capacity Match #BD-017 (18k units)', tab: 'capacity' as DemoTab, sub: 'Available in 3 Days · Gazipur Hub' },
    { label: 'AI Quality Scanner (Anomaly Inspection)', tab: 'quality' as DemoTab, sub: 'Line 02 Collar Stitch Defect Alert' },
    { label: 'Port Feeder Cutoff (Chattogram)', tab: 'logistics' as DemoTab, sub: 'Feeder Vessel Cutoff in 14 Days' },
    { label: 'B2B LC Settlements & CM Margin', tab: 'finance' as DemoTab, sub: 'CM Margin $0.84/pc · SCB Bank' },
  ];

  const filteredSearchItems = searchQuery.trim()
    ? searchItems.filter(item => 
        item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.sub.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : searchItems.slice(0, 4);

  const factories = [
    { name: 'Apex Horizon Apparels - Unit 2', location: 'Gazipur Industrial Zone', lines: 18 },
    { name: 'Elegance Denim Mills Ltd.', location: 'Hemayetpur, Savar', lines: 12 },
    { name: 'Meghna Eco Knitwear Composite', location: 'Fatullah, Narayanganj', lines: 24 },
  ];

  const handleManualRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 500);
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-[#E2E8F0] px-4 sm:px-6 py-2.5 shadow-xs">
      <div className="flex items-center justify-between gap-4">
        {/* Left Side: Breadcrumb & Factory Selector */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <button
            onClick={onBackToPublic}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold text-[#172033] hover:text-[#087F6A] bg-[#F8FAFC] hover:bg-[#EEF3F8] border border-[#E2E8F0] transition-colors cursor-pointer shrink-0"
            title="Return to Public Website"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#64748B]" />
            <span className="hidden sm:inline">Landing Page</span>
          </button>

          {/* Breadcrumbs */}
          <div className="hidden xl:flex items-center gap-1.5 text-xs text-[#64748B] shrink-0">
            <span className="font-medium hover:text-[#172033] cursor-pointer" onClick={() => onTabChange('overview')}>
              ERP Dashboard
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-[#94A3B8]" />
            <span className="font-semibold text-[#172033] truncate max-w-[140px] 2xl:max-w-[200px]">
              {getTabBreadcrumb()}
            </span>
          </div>

          {/* Factory Selector Dropdown */}
          <div className="relative shrink-0">
            <button
              onClick={() => setShowFactoryDropdown(!showFactoryDropdown)}
              className="flex items-center gap-2 px-2.5 sm:px-3 py-1.5 rounded-lg bg-[#F8FAFC] hover:bg-[#EEF3F8] border border-[#E2E8F0] text-xs font-semibold text-[#172033] transition-colors cursor-pointer"
            >
              <Building2 className="w-3.5 h-3.5 text-[#087F6A] shrink-0" />
              <span className="truncate max-w-[110px] sm:max-w-[160px] md:max-w-[200px]">
                {selectedFactory}
              </span>
              <ChevronDown className="w-3 h-3 text-[#64748B] shrink-0" />
            </button>

            {showFactoryDropdown && (
              <div className="absolute top-full left-0 mt-1.5 w-72 bg-white border border-[#E2E8F0] rounded-xl shadow-lg p-1.5 z-50 animate-fadeIn">
                <div className="p-2 text-[10px] font-mono text-[#64748B] uppercase border-b border-[#E2E8F0]">
                  Switch Active Production Facility
                </div>
                {factories.map((f) => (
                  <button
                    key={f.name}
                    onClick={() => {
                      onFactoryChange(f.name);
                      setShowFactoryDropdown(false);
                    }}
                    className={`w-full text-left p-2 rounded-lg text-xs transition-colors flex flex-col ${
                      selectedFactory === f.name
                        ? 'bg-emerald-50 text-[#065F46] font-semibold border border-emerald-200'
                        : 'text-[#172033] hover:bg-[#F1F5F9]'
                    }`}
                  >
                    <span className="font-bold">{f.name}</span>
                    <span className="text-[10px] text-[#64748B]">{f.location} · {f.lines} Active Sewing Lines</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Live Demo Data Badge */}
          <div className="hidden 2xl:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[#065F46] text-[11px] font-medium shrink-0 whitespace-nowrap">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-bold">LIVE DEMO</span>
            <span className="text-emerald-700/60 font-sans">• Telemetry</span>
          </div>
        </div>

        {/* Center/Right Actions */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* Shift & Efficiency Status */}
          <div className="hidden xl:flex items-center gap-2 text-xs font-mono text-[#64748B] bg-[#F8FAFC] px-2.5 py-1.5 rounded-lg border border-[#E2E8F0] shrink-0 whitespace-nowrap">
            <Clock className="w-3.5 h-3.5 text-[#087F6A] shrink-0" />
            <span className="whitespace-nowrap">Shift 1 (10:45 AM)</span>
            <span className="text-[#087F6A] font-bold whitespace-nowrap">89.4% SMV</span>
          </div>

          {/* Quick Search */}
          <div className="hidden md:flex items-center relative">
            <Search className="w-3.5 h-3.5 text-[#94A3B8] absolute left-2.5 z-10" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSearchResults(true);
              }}
              onFocus={() => setShowSearchResults(true)}
              placeholder="Search orders, lines..."
              className="pl-8 pr-10 py-1.5 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-xs text-[#172033] placeholder-[#94A3B8] focus:outline-none focus:border-[#087F6A] focus:ring-1 focus:ring-[#087F6A] w-36 lg:w-44 xl:w-52 transition-all"
            />
            <span className="hidden lg:inline-block absolute right-2 text-[10px] font-mono text-[#94A3B8] bg-white px-1.5 py-0.5 rounded border border-[#E2E8F0]">
              ⌘K
            </span>

            {showSearchResults && (
              <div 
                className="absolute top-full left-0 mt-1.5 w-80 bg-white border border-[#E2E8F0] rounded-xl shadow-xl p-2 z-50 animate-fadeIn"
                onMouseLeave={() => setShowSearchResults(false)}
              >
                <div className="flex items-center justify-between px-2 py-1 text-[10px] font-mono text-[#64748B] border-b border-[#E2E8F0] uppercase">
                  <span>Factory Quick Search</span>
                  <span className="text-[#087F6A]">Jump to Module</span>
                </div>
                <div className="space-y-1 mt-1 max-h-64 overflow-y-auto">
                  {filteredSearchItems.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        onTabChange(item.tab);
                        setShowSearchResults(false);
                        setSearchQuery('');
                      }}
                      className="w-full text-left p-2 rounded-lg text-xs hover:bg-emerald-50 hover:text-[#065F46] border border-transparent transition-all flex flex-col group cursor-pointer"
                    >
                      <span className="font-semibold text-[#172033] group-hover:text-[#065F46]">
                        {item.label}
                      </span>
                      <span className="text-[10px] text-[#64748B] font-mono">
                        {item.sub}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Telemetry Refresh */}
          <button
            onClick={handleManualRefresh}
            className="p-2 rounded-lg bg-[#F8FAFC] hover:bg-[#EEF3F8] text-[#64748B] hover:text-[#172033] border border-[#E2E8F0] transition-colors cursor-pointer"
            title="Refresh Real-time Telemetry"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-[#087F6A]' : ''}`} />
          </button>

          {/* Presentation Mode Button */}
          <button
            onClick={onStartPresentation}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#F8FAFC] hover:bg-[#EEF3F8] text-xs font-semibold text-[#172033] border border-[#E2E8F0] transition-colors cursor-pointer"
            title="Open Executive Presentation Deck"
          >
            <Presentation className="w-3.5 h-3.5 text-[#087F6A]" />
            <span>Deck</span>
          </button>

          {/* Notifications Trigger */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 rounded-lg bg-[#F8FAFC] hover:bg-[#EEF3F8] text-[#64748B] hover:text-[#172033] border border-[#E2E8F0] relative transition-colors cursor-pointer"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white" />
            </button>

            {showNotifications && (
              <div className="absolute top-full right-0 mt-2 w-80 bg-white border border-[#E2E8F0] rounded-xl shadow-xl p-3 z-50 space-y-2 animate-fadeIn">
                <div className="flex items-center justify-between pb-2 border-b border-[#E2E8F0] text-xs font-semibold text-[#172033]">
                  <span>Factory Intelligence Alerts</span>
                  <button onClick={() => setShowNotifications(false)} className="text-[#94A3B8] hover:text-[#172033]">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div
                  onClick={() => {
                    onTabChange('risk-center');
                    setShowNotifications(false);
                  }}
                  className="p-2.5 rounded-lg bg-rose-50/70 border border-rose-200 text-xs space-y-1 cursor-pointer hover:bg-rose-100/70 transition-colors"
                >
                  <div className="flex items-center justify-between text-rose-800 font-bold">
                    <span className="flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5 text-rose-600" /> High Delay Risk
                    </span>
                    <span className="text-[10px] font-mono text-rose-600">Just Now</span>
                  </div>
                  <p className="text-[#334155] text-[11px] leading-relaxed">
                    Order #BD-2048 delay probability reached 78%. Recommended action: Activate verified capacity match.
                  </p>
                </div>

                <div
                  onClick={() => {
                    onTabChange('quality');
                    setShowNotifications(false);
                  }}
                  className="p-2.5 rounded-lg bg-blue-50/70 border border-blue-200 text-xs space-y-1 cursor-pointer hover:bg-blue-100/70 transition-colors"
                >
                  <div className="flex items-center justify-between text-blue-800 font-bold">
                    <span className="flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-blue-600" /> QC Pattern Detected
                    </span>
                    <span className="text-[10px] font-mono text-blue-600">15m ago</span>
                  </div>
                  <p className="text-[#334155] text-[11px] leading-relaxed">
                    Line 02 collar stitch irregularity flagged on organic cotton polo batch (confidence 94.2%).
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* User Profile Avatar */}
          <div className="flex items-center gap-2 pl-2 border-l border-[#E2E8F0] shrink-0">
            <div className="w-8 h-8 rounded-full bg-emerald-100 text-[#087F6A] font-bold text-xs flex items-center justify-center border border-emerald-200 shrink-0">
              TA
            </div>
            <div className="hidden xl:flex flex-col text-left whitespace-nowrap">
              <span className="text-xs font-bold text-[#172033] leading-tight">Engr. Tanvir</span>
              <span className="text-[10px] text-[#64748B]">Operations Head</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
