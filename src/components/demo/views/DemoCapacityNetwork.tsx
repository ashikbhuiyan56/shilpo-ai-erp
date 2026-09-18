import React, { useState, useMemo } from 'react';
import { 
  Network, 
  ShieldCheck, 
  Lock, 
  Unlock, 
  CheckCircle2, 
  ArrowRight, 
  MapPin, 
  Layers, 
  Sparkles, 
  Building2, 
  DollarSign, 
  Users, 
  Zap,
  Filter,
  Search,
  Plus,
  FileText,
  Clock,
  Truck,
  Check,
  AlertCircle,
  Sliders,
  RefreshCw,
  Award,
  ChevronRight,
  ExternalLink,
  Shield,
  Send,
  X
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { SAMPLE_CAPACITY_PARTNERS, SAMPLE_ORDERS } from '../../../data/mockData';
import { DemoTab, CapacityPartner } from '../../../types';
import { Badge } from '../../common/Badge';

interface SubcontractOrder {
  id: string;
  orderNumber: string;
  buyer: string;
  partnerId: string;
  partnerName: string;
  partnerLocation: string;
  units: number;
  ratePerPiece: number;
  totalEscrowAmount: number;
  aqlStandard: string;
  deliveryDate: string;
  status: 'Escrow Locked' | 'Fabric Inward' | 'Sewing in Progress' | 'Inline QC Passed' | 'Final Inspection' | 'Ready for Dispatch';
  progress: number;
  signedAt: string;
  txHash: string;
}

export interface SubcontractRequestPayload {
  orderNumber: string;
  buyer: string;
  category: string;
  deficitUnits: number;
  targetDays: number;
  suggestedRate: number;
  source: 'factory_data_entry';
}

interface DemoCapacityNetworkProps {
  onNavigate: (tab: DemoTab) => void;
  subcontractRequest?: SubcontractRequestPayload | null;
}

export const DemoCapacityNetwork: React.FC<DemoCapacityNetworkProps> = ({ 
  onNavigate,
  subcontractRequest 
}) => {
  // State for all verified capacity partners
  const [partners, setPartners] = useState<CapacityPartner[]>(SAMPLE_CAPACITY_PARTNERS);

  // Filters
  const [selectedHub, setSelectedHub] = useState<'all' | 'Gazipur' | 'Savar' | 'Narayanganj' | 'Chittagong'>('all');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'Knitwear' | 'Woven' | 'Denim' | 'Activewear'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Selected Order for delegation / matching
  const [selectedOrderId, setSelectedOrderId] = useState<string>(
    subcontractRequest ? 'ord-1' : 'ord-1'
  );
  const [allocatedUnits, setAllocatedUnits] = useState<number>(
    subcontractRequest ? subcontractRequest.deficitUnits : 18000
  );
  const [targetRate, setTargetRate] = useState<number>(
    subcontractRequest ? subcontractRequest.suggestedRate : 2.15
  );
  const [targetDays, setTargetDays] = useState<number>(
    subcontractRequest ? subcontractRequest.targetDays : 12
  );
  const [aqlLevel, setAqlLevel] = useState<string>('AQL 1.5');

  // Selected Partner for active view / interaction
  const [selectedPartnerId, setSelectedPartnerId] = useState<string>('partner-1');

  // Interactive multi-stage confidential handshake states
  const [handshakeStep, setHandshakeStep] = useState<Record<string, 'idle' | 'requesting' | 'mutual_consent' | 'unlocked' | 'contract_signed'>>({
    'partner-1': 'idle',
  });

  // Active Signed Subcontracts
  const [activeSubcontracts, setActiveSubcontracts] = useState<SubcontractOrder[]>([
    {
      id: 'sub-892',
      orderNumber: '#BD-2029',
      buyer: 'Zara Inditex',
      partnerId: 'partner-2',
      partnerName: 'Beximco Industrial Park Unit 9',
      partnerLocation: 'Kashimpur, Gazipur',
      units: 22000,
      ratePerPiece: 2.10,
      totalEscrowAmount: 46200,
      aqlStandard: 'AQL 1.5',
      deliveryDate: 'Sep 14, 2026',
      status: 'Inline QC Passed',
      progress: 68,
      signedAt: '2026-08-28 11:20 UTC',
      txHash: '0x3f98a71b80921cb914e7a892b192834091a82b9c7',
    }
  ]);

  // Modals & Drawers
  const [isBroadcastModalOpen, setIsBroadcastModalOpen] = useState(false);
  const [isContractModalOpen, setIsContractModalOpen] = useState(false);
  const [selectedContract, setSelectedContract] = useState<SubcontractOrder | null>(null);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  // New RFP Broadcast Form
  const [rfpForm, setRfpForm] = useState({
    alias: 'Apex Precision Apparels Unit 4',
    location: 'Gazipur Industrial Zone, Dhaka',
    specialization: 'Knitwear',
    availableUnits: 20000,
    minOrderQty: 5000,
    availableFrom: 'Immediate (Within 48h)',
    certifications: 'WRAP Gold, Sedex SMETA, OEKO-TEX',
    smvRating: 4.8,
  });

  // Selected base order
  const currentOrder = SAMPLE_ORDERS.find((o) => o.id === selectedOrderId) || SAMPLE_ORDERS[0];
  
  // Active selected partner
  const activePartner = partners.find((p) => p.id === selectedPartnerId) || partners[0];
  const partnerStatus = handshakeStep[activePartner.id] || 'idle';

  // Dynamic filter of partners
  const filteredPartners = useMemo(() => {
    return partners.filter((p) => {
      const matchHub = selectedHub === 'all' || p.location.toLowerCase().includes(selectedHub.toLowerCase());
      const matchCategory = selectedCategory === 'all' || p.specialization.toLowerCase().includes(selectedCategory.toLowerCase());
      const matchSearch = searchQuery.trim() === '' || 
        p.alias.toLowerCase().includes(searchQuery.toLowerCase()) || 
        (p.realName && p.realName.toLowerCase().includes(searchQuery.toLowerCase())) ||
        p.specialization.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.location.toLowerCase().includes(searchQuery.toLowerCase());
      return matchHub && matchCategory && matchSearch;
    });
  }, [partners, selectedHub, selectedCategory, searchQuery]);

  // Dynamic compatibility score calculation based on current order
  const calculateDynamicScore = (partner: CapacityPartner) => {
    let score = partner.compatibilityScore;
    if (partner.specialization.toLowerCase() === currentOrder.category.toLowerCase()) {
      score = Math.min(99, score + 4);
    } else {
      score = Math.max(65, score - 8);
    }
    if (allocatedUnits <= partner.availableUnits) {
      score = Math.min(99, score + 2);
    }
    return score;
  };

  const showNotification = (msg: string) => {
    setSuccessToast(msg);
    setTimeout(() => {
      setSuccessToast(null);
    }, 4500);
  };

  // Step 1: Initiate Confidential RFQ Handshake
  const handleInitiateMatch = (partnerId: string) => {
    setHandshakeStep((prev) => ({ ...prev, [partnerId]: 'requesting' }));

    setTimeout(() => {
      setHandshakeStep((prev) => ({ ...prev, [partnerId]: 'mutual_consent' }));
      setTimeout(() => {
        setHandshakeStep((prev) => ({ ...prev, [partnerId]: 'unlocked' }));
        showNotification(`Mutual consent verified! Identity unlocked for ${activePartner.realName || activePartner.alias}`);
        try {
          confetti({
            particleCount: 40,
            spread: 45,
            origin: { y: 0.6 },
            colors: ['#087F6A', '#34d399', '#6ee7b7'],
          });
        } catch (e) {
          // safe
        }
      }, 800);
    }, 800);
  };

  // Step 2: Finalize Digital Subcontract & Lock Escrow
  const handleSignAndLockEscrow = () => {
    const totalAmount = allocatedUnits * targetRate;
    const newTxHash = '0x' + Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
    
    const newContract: SubcontractOrder = {
      id: `sub-${Math.floor(100 + Math.random() * 900)}`,
      orderNumber: currentOrder.orderNumber,
      buyer: currentOrder.buyer,
      partnerId: activePartner.id,
      partnerName: activePartner.realName || activePartner.alias,
      partnerLocation: activePartner.location,
      units: allocatedUnits,
      ratePerPiece: targetRate,
      totalEscrowAmount: totalAmount,
      aqlStandard: aqlLevel,
      deliveryDate: 'Sep 12, 2026',
      status: 'Escrow Locked',
      progress: 10,
      signedAt: new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC',
      txHash: newTxHash,
    };

    setActiveSubcontracts((prev) => [newContract, ...prev]);
    setHandshakeStep((prev) => ({ ...prev, [activePartner.id]: 'contract_signed' }));

    // Deduct available capacity from partner
    setPartners((prev) =>
      prev.map((p) => {
        if (p.id === activePartner.id) {
          return {
            ...p,
            availableUnits: Math.max(0, p.availableUnits - allocatedUnits),
          };
        }
        return p;
      })
    );

    setSelectedContract(newContract);
    setIsContractModalOpen(true);
    showNotification(`Subcontract successfully bound! $${totalAmount.toLocaleString()} USD locked in escrow.`);

    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.5 },
        colors: ['#087F6A', '#10b981', '#3b82f6'],
      });
    } catch (e) {
      // safe
    }
  };

  // Step 3: Advance Milestone in Subcontract Order
  const handleAdvanceMilestone = (subcontractId: string) => {
    setActiveSubcontracts((prev) =>
      prev.map((sub) => {
        if (sub.id === subcontractId) {
          if (sub.status === 'Escrow Locked') return { ...sub, status: 'Fabric Inward', progress: 30 };
          if (sub.status === 'Fabric Inward') return { ...sub, status: 'Sewing in Progress', progress: 55 };
          if (sub.status === 'Sewing in Progress') return { ...sub, status: 'Inline QC Passed', progress: 75 };
          if (sub.status === 'Inline QC Passed') return { ...sub, status: 'Final Inspection', progress: 90 };
          if (sub.status === 'Final Inspection') return { ...sub, status: 'Ready for Dispatch', progress: 100 };
        }
        return sub;
      })
    );
    showNotification('Subcontract production milestone updated successfully!');
  };

  // Step 4: Add New Broadcasted Line Capacity
  const handleCreateBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    const newPartner: CapacityPartner = {
      id: `partner-${Math.floor(200 + Math.random() * 800)}`,
      alias: `Verified Partner #BD-${Math.floor(100 + Math.random() * 900)}`,
      realName: rfpForm.alias,
      location: rfpForm.location,
      specialization: rfpForm.specialization,
      availableUnits: Number(rfpForm.availableUnits) || 15000,
      availableFrom: rfpForm.availableFrom,
      compatibilityScore: 92,
      verificationStatus: 'BGMEA Verified',
      certifications: rfpForm.certifications.split(',').map((c) => c.trim()),
      smvRating: Number(rfpForm.smvRating) || 4.7,
      minOrderQty: Number(rfpForm.minOrderQty) || 5000,
      isUnlocked: true,
    };

    setPartners((prev) => [newPartner, ...prev]);
    setSelectedPartnerId(newPartner.id);
    setIsBroadcastModalOpen(false);
    showNotification(`New factory capacity (${newPartner.availableUnits.toLocaleString()} pcs) broadcasted to the verified network!`);
  };

  // Reset demo handshake
  const handleResetMatch = (partnerId: string) => {
    setHandshakeStep((prev) => ({ ...prev, [partnerId]: 'idle' }));
    showNotification('Handshake state reset. You can re-negotiate anytime.');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Toast Alert */}
      {successToast && (
        <div className="fixed top-20 right-6 z-50 p-4 rounded-2xl bg-white border border-emerald-300 text-[#172033] shadow-xl flex items-center gap-3 animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 text-[#087F6A] shrink-0" />
          <div className="text-xs font-semibold">{successToast}</div>
          <button 
            onClick={() => setSuccessToast(null)}
            className="text-[#64748B] hover:text-[#172033] ml-2 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Triggered from Factory Data Entry Banner */}
      {subcontractRequest && (
        <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 shadow-md flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-100 text-[#065F46] border border-emerald-300 shrink-0">
              <Zap className="w-5 h-5 fill-[#087F6A]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-[#065F46] uppercase tracking-wider">
                  AI DATA ENTRY CAPACITY TRIGGER
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-md bg-emerald-100 text-[#065F46] font-mono font-bold border border-emerald-300">
                  {subcontractRequest.category} · {subcontractRequest.deficitUnits.toLocaleString()} PCS DEFICIT
                </span>
              </div>
              <div className="text-sm font-bold text-[#0B1120] mt-1">
                Routing Overflow for Order #{subcontractRequest.orderNumber} ({subcontractRequest.buyer}) · Target Deadline: {subcontractRequest.targetDays} Days
              </div>
              <div className="text-xs text-[#334155] mt-1">
                Full Flow: Order requirement → Matching Engine → Verified Peer #BD-017 (94% Compatibility) → Request Match → Mutual Consent → Lock Escrow.
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate('data-entry')}
              className="px-4 py-2 rounded-xl bg-white hover:bg-[#F8FAFC] hover:shadow-md border border-[#CBD5E1] text-[#1E293B] text-xs font-semibold shadow-sm transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
            >
              ← Edit Data Inputs
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-[0_1px_3px_rgba(15,23,42,0.08)]">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-extrabold text-[#0B1120] flex items-center gap-2.5">
              <Network className="w-6 h-6 text-[#087F6A]" />
              <span>Verified Capacity Network</span>
            </h1>
            <div className="px-3 py-1 rounded-full border border-emerald-200 bg-emerald-50 text-xs font-bold text-[#065F46] uppercase tracking-wider">
              4 ACTIVE INDUSTRIAL HUBS
            </div>
          </div>
          <p className="text-sm text-[#334155] mt-1.5">
            Zero-knowledge peer capacity matching, instant subcontracting allocation, and smart milestone escrow for export garment factories.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setIsBroadcastModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-[#087F6A] hover:bg-[#066653] text-white text-xs font-bold flex items-center gap-2 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>List / Broadcast Capacity</span>
          </button>

          <button
            onClick={() => onNavigate('trust')}
            className="px-4 py-2.5 rounded-xl bg-white hover:bg-[#F8FAFC] border border-[#CBD5E1] text-xs font-semibold text-[#1E293B] flex items-center gap-2 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4 text-[#087F6A]" />
            <span>Compliance Proofs</span>
          </button>
        </div>
      </div>

      {/* Interactive Order Delegation Configurator Bar */}
      <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-[0_1px_3px_rgba(15,23,42,0.08)] space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3.5 border-b border-[#F1F5F9]">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-[#087F6A]" />
            <span className="text-xs font-mono font-bold text-[#0B1120] uppercase tracking-wider">
              Step 1: Configure Order Subcontracting & Deficit Allocation
            </span>
          </div>
          <span className="text-xs text-[#334155] font-mono">
            Directly binds capacity into factory production schedule
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 text-xs">
          {/* 1. Select Order */}
          <div className="space-y-1.5">
            <label className="text-xs font-mono text-[#334155] font-bold">SELECT ORDER TO ALLOCATE</label>
            <select
              value={selectedOrderId}
              onChange={(e) => {
                const ordId = e.target.value;
                setSelectedOrderId(ordId);
                const found = SAMPLE_ORDERS.find((o) => o.id === ordId);
                if (found) {
                  if (found.id === 'ord-1') setAllocatedUnits(18000);
                  else setAllocatedUnits(Math.round(found.quantity * 0.4));
                }
              }}
              className="w-full px-3 py-2.5 rounded-xl bg-white border border-[#CBD5E1] text-[#0B1120] font-mono text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#087F6A]/20 focus:border-[#087F6A] shadow-2xs cursor-pointer"
            >
              {SAMPLE_ORDERS.map((ord) => (
                <option key={ord.id} value={ord.id} className="bg-white text-[#0B1120]">
                  {ord.orderNumber} · {ord.buyer} ({ord.category} - {ord.quantity.toLocaleString()} pcs)
                </option>
              ))}
            </select>
          </div>

          {/* 2. Units to Outsource */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-mono text-[#334155] font-bold">UNITS TO OUTSOURCE</label>
              <span className="text-[#087F6A] font-mono font-bold">{allocatedUnits.toLocaleString()} pcs</span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="1000"
                max="50000"
                step="1000"
                value={allocatedUnits}
                onChange={(e) => setAllocatedUnits(Number(e.target.value) || 1000)}
                className="w-full px-3 py-2.5 rounded-xl bg-white border border-[#CBD5E1] text-[#0B1120] font-mono text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#087F6A]/20 focus:border-[#087F6A] shadow-2xs"
              />
            </div>
            {/* Quick presets */}
            <div className="flex items-center gap-1.5 pt-0.5">
              {[5000, 10000, 18000, 25000].map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setAllocatedUnits(preset)}
                  className={`px-2 py-1 rounded-md text-xs font-mono font-semibold transition-all cursor-pointer ${
                    allocatedUnits === preset ? 'bg-emerald-50 text-[#065F46] border border-emerald-300 font-bold shadow-2xs' : 'bg-[#F1F5F9] text-[#334155] hover:text-[#0B1120] hover:bg-[#E2E8F0]'
                  }`}
                >
                  {preset / 1000}k
                </button>
              ))}
            </div>
          </div>

          {/* 3. Target Delivery Window */}
          <div className="space-y-1.5">
            <label className="text-xs font-mono text-[#334155] font-bold">TARGET DELIVERY WINDOW</label>
            <select
              value={targetDays}
              onChange={(e) => setTargetDays(Number(e.target.value))}
              className="w-full px-3 py-2.5 rounded-xl bg-white border border-[#CBD5E1] text-[#0B1120] font-mono text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#087F6A]/20 focus:border-[#087F6A] shadow-2xs cursor-pointer"
            >
              <option value={7}>Express (7 Days)</option>
              <option value={12}>Standard (12 Days)</option>
              <option value={16}>Extended (16 Days)</option>
              <option value={21}>Flexible (21 Days)</option>
            </select>
          </div>

          {/* 4. Target Escrow Rate */}
          <div className="space-y-1.5">
            <label className="text-xs font-mono text-[#334155] font-bold">TARGET RATE / PIECE (USD)</label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-[#475569] font-mono font-bold">$</span>
              <input
                type="number"
                step="0.05"
                min="0.50"
                max="20.00"
                value={targetRate}
                onChange={(e) => setTargetRate(Number(e.target.value) || 2.0)}
                className="w-full pl-7 pr-3 py-2.5 rounded-xl bg-white border border-[#CBD5E1] text-[#0B1120] font-mono text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#087F6A]/20 focus:border-[#087F6A] shadow-2xs"
              />
            </div>
            <div className="text-xs text-[#334155] font-mono font-medium">
              Total Escrow: ${(allocatedUnits * targetRate).toLocaleString()}
            </div>
          </div>

          {/* 5. Quality Standard (AQL) */}
          <div className="space-y-1.5">
            <label className="text-xs font-mono text-[#334155] font-bold">QUALITY AUDIT STANDARD</label>
            <select
              value={aqlLevel}
              onChange={(e) => setAqlLevel(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-white border border-[#CBD5E1] text-[#0B1120] font-mono text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#087F6A]/20 focus:border-[#087F6A] shadow-2xs cursor-pointer"
            >
              <option value="AQL 1.0">AQL 1.0 (Luxury / Zero-Defect)</option>
              <option value="AQL 1.5">AQL 1.5 (Standard Export)</option>
              <option value="AQL 2.5">AQL 2.5 (Basic Garments)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Hub Filter & Search Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-[#E2E8F0] shadow-[0_1px_3px_rgba(15,23,42,0.08)]">
        {/* Hub Tabs */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs font-mono text-[#334155] mr-2 flex items-center gap-1 font-bold">
            <MapPin className="w-4 h-4 text-[#087F6A]" /> HUB:
          </span>
          {(['all', 'Gazipur', 'Savar', 'Narayanganj', 'Chittagong'] as const).map((hub) => (
            <button
              key={hub}
              onClick={() => setSelectedHub(hub)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                selectedHub === hub
                  ? 'bg-[#087F6A] text-white shadow-sm'
                  : 'bg-[#F1F5F9] text-[#1E293B] hover:bg-[#E2E8F0]'
              }`}
            >
              {hub === 'all' ? 'All Hubs' : hub}
            </button>
          ))}
        </div>

        {/* Category & Search */}
        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value as any)}
            className="px-3.5 py-2 rounded-xl bg-white border border-[#CBD5E1] text-xs font-medium text-[#0B1120] focus:outline-none focus:ring-2 focus:ring-[#087F6A]/20 focus:border-[#087F6A] shadow-2xs cursor-pointer"
          >
            <option value="all">All Categories</option>
            <option value="Knitwear">Knitwear</option>
            <option value="Woven">Woven</option>
            <option value="Denim">Denim</option>
            <option value="Activewear">Activewear</option>
          </select>

          {/* Search Input */}
          <div className="relative flex-1 sm:w-60">
            <Search className="w-4 h-4 text-[#64748B] absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search partner or cert..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-white border border-[#CBD5E1] text-xs font-medium text-[#0B1120] placeholder-[#64748B] focus:outline-none focus:ring-2 focus:ring-[#087F6A]/20 focus:border-[#087F6A] shadow-2xs"
            />
          </div>
        </div>
      </div>

      {/* Network Overview Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-[#E2E8F0] shadow-[0_1px_3px_rgba(15,23,42,0.08)] hover:shadow-md transition-all duration-200 hover:-translate-y-0.5">
          <div className="text-xs font-semibold text-[#334155] uppercase tracking-wider">AVAILABLE NETWORK CAPACITY</div>
          <div className="text-3xl font-extrabold text-[#087F6A] font-mono mt-1.5">
            {partners.reduce((sum, p) => sum + p.availableUnits, 0).toLocaleString()} pcs
          </div>
          <div className="text-xs font-medium text-[#475569] mt-1">Across {partners.length} Verified Facilities</div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#E2E8F0] shadow-[0_1px_3px_rgba(15,23,42,0.08)] hover:shadow-md transition-all duration-200 hover:-translate-y-0.5">
          <div className="text-xs font-semibold text-[#334155] uppercase tracking-wider">MATCH LATENCY</div>
          <div className="text-3xl font-extrabold text-[#0B1120] font-mono mt-1.5">&lt; 4 Hours</div>
          <div className="text-xs font-semibold text-[#087F6A] mt-1">vs 4–7 days opaque brokerage</div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#E2E8F0] shadow-[0_1px_3px_rgba(15,23,42,0.08)] hover:shadow-md transition-all duration-200 hover:-translate-y-0.5">
          <div className="text-xs font-semibold text-[#334155] uppercase tracking-wider">COMPLIANCE ASSURANCE</div>
          <div className="text-3xl font-extrabold text-[#0B1120] font-mono mt-1.5">100% Verified</div>
          <div className="text-xs font-medium text-[#475569] mt-1">Sedex / WRAP / Accord Audited</div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#E2E8F0] shadow-[0_1px_3px_rgba(15,23,42,0.08)] hover:shadow-md transition-all duration-200 hover:-translate-y-0.5">
          <div className="text-xs font-semibold text-[#334155] uppercase tracking-wider">PRIVACY PROTOCOL</div>
          <div className="text-3xl font-extrabold text-[#087F6A] font-mono mt-1.5">Zero-Knowledge</div>
          <div className="text-xs font-medium text-[#475569] mt-1">Shielded until mutual consent</div>
        </div>
      </div>

      {/* Peer Matching Grid + Handshake Console */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Available Peer Capacity Cards */}
        <div className="lg:col-span-6 space-y-3">
          <div className="flex items-center justify-between px-1">
            <div className="text-xs font-mono font-bold text-[#334155] uppercase tracking-wider">
              VERIFIED PEER CANDIDATES ({filteredPartners.length})
            </div>
            <span className="text-xs text-[#087F6A] font-mono font-bold">
              Targeting: {currentOrder.category} ({allocatedUnits.toLocaleString()} pcs)
            </span>
          </div>

          {filteredPartners.length === 0 ? (
            <div className="p-8 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm text-center text-[#334155] text-sm">
              No peer factories match the current hub or search filter. Try selecting "All Hubs" or broadcast a new RFP.
            </div>
          ) : (
            filteredPartners.map((p) => {
              const isSelected = p.id === selectedPartnerId;
              const state = handshakeStep[p.id] || 'idle';
              const dynamicScore = calculateDynamicScore(p);

              return (
                <div
                  key={p.id}
                  onClick={() => setSelectedPartnerId(p.id)}
                  className={`p-5 rounded-2xl border cursor-pointer transition-all duration-200 hover:-translate-y-0.5 ${
                    isSelected
                      ? 'bg-emerald-50/40 border-[#087F6A] ring-2 ring-[#087F6A]/20 shadow-md'
                      : 'bg-white border-[#E2E8F0] shadow-sm hover:shadow-lg hover:border-[#CBD5E1]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-[#087F6A] shadow-2xs">
                        <Building2 className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-[#0B1120] flex items-center gap-2">
                          <span>{state !== 'idle' && state !== 'requesting' && p.realName ? p.realName : p.alias}</span>
                          {state === 'contract_signed' ? (
                            <span className="text-xs font-mono px-2.5 py-0.5 rounded-md bg-emerald-100 text-[#065F46] border border-emerald-300 flex items-center gap-1 font-bold">
                              <Check className="w-3 h-3" /> CONTRACT BOUND
                            </span>
                          ) : state === 'unlocked' || state === 'mutual_consent' ? (
                            <span className="text-xs font-mono px-2.5 py-0.5 rounded-md bg-emerald-100 text-[#065F46] border border-emerald-300 flex items-center gap-1 font-bold">
                              <Unlock className="w-3 h-3" /> UNLOCKED
                            </span>
                          ) : (
                            <span className="text-xs font-mono px-2.5 py-0.5 rounded-md bg-[#F1F5F9] text-[#334155] flex items-center gap-1 border border-[#CBD5E1] font-semibold">
                              <Lock className="w-3 h-3 text-[#475569]" /> SHIELDED ID
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-[#334155] font-mono flex items-center gap-1.5 mt-0.5">
                          <MapPin className="w-3.5 h-3.5 text-[#087F6A]" />
                          <span>{p.location}</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-mono font-bold text-[#065F46] bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                        {dynamicScore}% Compatibility
                      </span>
                      <div className="text-xs text-[#475569] font-mono mt-1 font-medium">{p.availableFrom}</div>
                    </div>
                  </div>

                  {/* Certifications preview */}
                  <div className="flex flex-wrap gap-1.5 mb-3.5">
                    {p.certifications.map((cert) => (
                      <span
                        key={cert}
                        className="px-2.5 py-0.5 rounded-md bg-[#F8FAFC] border border-[#CBD5E1] text-xs text-[#1E293B] font-mono font-semibold"
                      >
                        {cert}
                      </span>
                    ))}
                  </div>

                  <div className="grid grid-cols-3 gap-2 pt-3 border-t border-[#F1F5F9] text-xs">
                    <div>
                      <div className="text-xs font-semibold text-[#334155] font-mono uppercase">AVAILABLE CAP.</div>
                      <div className="text-sm font-bold text-[#0B1120] font-mono mt-0.5">{p.availableUnits.toLocaleString()} pcs</div>
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-[#334155] font-mono uppercase">SPECIALTY</div>
                      <div className="text-sm font-semibold text-[#0B1120] mt-0.5">{p.specialization}</div>
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-[#334155] font-mono uppercase">SMV RATING</div>
                      <div className="text-sm font-bold text-[#087F6A] font-mono mt-0.5">{p.smvRating} / 5.0 ★</div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Right: Handshake & Matching Execution Console */}
        <div className="lg:col-span-6 p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-[0_1px_3px_rgba(15,23,42,0.08)] space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#F1F5F9]">
              <div>
                <span className="text-xs font-mono text-[#087F6A] font-bold uppercase tracking-wider">
                  CONFIDENTIAL PEER MATCH CONSOLE
                </span>
                <h3 className="text-xl font-bold text-[#0B1120] mt-1">
                  Target Candidate: {partnerStatus !== 'idle' && partnerStatus !== 'requesting' && activePartner.realName ? activePartner.realName : activePartner.alias}
                </h3>
              </div>
              <div className="flex items-center gap-2">
                {partnerStatus !== 'idle' && (
                  <button
                    onClick={() => handleResetMatch(activePartner.id)}
                    title="Reset match state"
                    className="p-2 rounded-xl bg-[#F8FAFC] hover:bg-[#F1F5F9] text-[#334155] hover:text-[#0B1120] border border-[#CBD5E1] text-xs transition-colors cursor-pointer shadow-2xs"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                )}
                <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-[#087F6A] shadow-2xs">
                  {partnerStatus === 'unlocked' || partnerStatus === 'contract_signed' ? <Unlock className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
                </div>
              </div>
            </div>

            {/* Privacy Shielding Statement */}
            <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-xs text-[#1E293B] flex items-start gap-2.5 shadow-2xs">
              <ShieldCheck className="w-4 h-4 text-[#087F6A] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#0B1120]">Zero-Knowledge Guarantee:</strong> Commercial rates, proprietary tech packs, and customer identity remain cryptographically blinded until both authorized factory representatives accept mutual terms.
              </div>
            </div>

            {/* Match Criteria Breakdown for Current Order */}
            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-2 border-b border-[#F1F5F9] text-[#334155]">
                <span className="font-medium">Selected Order Subcontract</span>
                <span className="text-[#0B1120] font-mono font-bold text-sm">
                  {currentOrder.orderNumber} · {currentOrder.buyer} ({currentOrder.category})
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-[#F1F5F9] text-[#334155]">
                <span className="font-medium">Requested Allocation</span>
                <span className="text-[#087F6A] font-mono font-bold text-sm">
                  {allocatedUnits.toLocaleString()} units @ ${targetRate.toFixed(2)}/pc
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-[#F1F5F9] text-[#334155]">
                <span className="font-medium">Total Smart Escrow Bond</span>
                <span className="text-[#0B1120] font-mono font-bold text-sm">
                  ${(allocatedUnits * targetRate).toLocaleString()} USD
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-[#F1F5F9] text-[#334155]">
                <span className="font-medium">Delivery Window & Quality</span>
                <span className="text-[#0B1120] font-mono font-semibold text-xs">
                  {targetDays} Days · {aqlLevel} Standard
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-[#F1F5F9] text-[#334155]">
                <span className="font-medium">Production Fit Score</span>
                <span className="text-[#087F6A] font-mono font-bold text-sm">
                  {calculateDynamicScore(activePartner)}% (Machine & Skill Fit)
                </span>
              </div>
            </div>

            {/* Multi-Stage Handshake Progress Visualization */}
            {partnerStatus !== 'idle' && (
              <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-3 shadow-sm animate-fadeIn">
                <div className="text-xs font-bold text-[#0B1120] flex items-center justify-between">
                  <span>Capacity Handshake Status</span>
                  <span className="text-[#065F46] font-mono text-xs font-bold">
                    {partnerStatus === 'requesting'
                      ? 'Step 1/4: Encrypted Spec Transmitted...'
                      : partnerStatus === 'mutual_consent'
                      ? 'Step 2/4: Mutual Consent Confirmed'
                      : partnerStatus === 'unlocked'
                      ? 'Step 3/4: NDA & Identity Disclosed'
                      : 'Step 4/4: Smart Escrow Bound & Signed'}
                  </span>
                </div>
                <div className="w-full bg-[#E2E8F0] h-2.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-[#087F6A] h-full transition-all duration-700" 
                    style={{
                      width:
                        partnerStatus === 'requesting'
                          ? '25%'
                          : partnerStatus === 'mutual_consent'
                          ? '50%'
                          : partnerStatus === 'unlocked'
                          ? '75%'
                          : '100%',
                    }}
                  />
                </div>
                {(partnerStatus === 'unlocked' || partnerStatus === 'contract_signed') && (
                  <div className="text-xs text-[#065F46] font-mono space-y-1">
                    <div className="font-bold">✓ Identity Verified: {activePartner.realName || activePartner.alias}</div>
                    <div className="text-xs text-[#334155]">
                      Location: {activePartner.location} · Managing Director: M. S. Rahman · Audit Certs: {activePartner.certifications.join(', ')}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Action Trigger Buttons */}
          <div className="pt-4 border-t border-[#F1F5F9] space-y-3">
            {partnerStatus === 'contract_signed' ? (
              <div className="space-y-2">
                <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-center text-xs text-[#065F46] font-bold flex items-center justify-center gap-2 shadow-2xs">
                  <CheckCircle2 className="w-4 h-4 text-[#087F6A]" />
                  <span>Subcontract Legally Bound & Escrow Locked (Delay Reduced to 0.0 Days)</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      const found = activeSubcontracts.find((s) => s.orderNumber === currentOrder.orderNumber) || activeSubcontracts[0];
                      setSelectedContract(found);
                      setIsContractModalOpen(true);
                    }}
                    className="py-2.5 rounded-xl bg-white hover:bg-[#F8FAFC] border border-[#CBD5E1] text-[#1E293B] text-xs font-semibold transition-all duration-200 hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer shadow-sm hover:shadow-md"
                  >
                    <FileText className="w-4 h-4 text-[#087F6A]" />
                    <span>View Digital Contract</span>
                  </button>
                  <button
                    onClick={() => onNavigate('forecast')}
                    className="py-2.5 rounded-xl bg-[#087F6A] hover:bg-[#066653] text-white text-xs font-bold transition-all duration-200 hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer shadow-sm hover:shadow-md"
                  >
                    <span>Verify 14-Day Delivery</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : partnerStatus === 'unlocked' ? (
              <div className="space-y-2">
                <div className="text-xs text-[#334155] font-medium">
                  Ready to lock capacity and execute smart escrow deposit:
                </div>
                <button
                  onClick={handleSignAndLockEscrow}
                  className="w-full py-3.5 rounded-xl bg-[#087F6A] hover:bg-[#066653] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
                >
                  <Shield className="w-4 h-4 fill-white" />
                  <span>Sign Subcontract & Lock Escrow (${(allocatedUnits * targetRate).toLocaleString()} USD)</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => handleInitiateMatch(activePartner.id)}
                disabled={partnerStatus === 'requesting' || partnerStatus === 'mutual_consent'}
                className="w-full py-3.5 rounded-xl bg-[#087F6A] hover:bg-[#066653] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 cursor-pointer disabled:opacity-50"
              >
                <Zap className="w-4 h-4 fill-white" />
                <span>
                  {partnerStatus === 'requesting'
                    ? 'Transmitting Encrypted RFQ...'
                    : partnerStatus === 'mutual_consent'
                    ? 'Verifying Mutual Consent...'
                    : `Request Verified Match (${allocatedUnits.toLocaleString()} units)`}
                </span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Active Subcontract Tracking Console */}
      <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-[0_1px_3px_rgba(15,23,42,0.08)] space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#F1F5F9]">
          <div className="flex items-center gap-2.5">
            <Truck className="w-5 h-5 text-[#087F6A]" />
            <h3 className="text-base font-bold text-[#0B1120]">Active Subcontracted Production Orders ({activeSubcontracts.length})</h3>
          </div>
          <span className="text-xs font-mono text-[#334155]">
            Real-time Milestone Monitoring & Smart Escrow Payouts
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[860px] text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#CBD5E1] text-[#334155] font-mono bg-[#F8FAFC]">
                <th className="py-3 px-3.5 font-bold whitespace-nowrap">Subcontract ID</th>
                <th className="py-3 px-3.5 font-bold">Order / Buyer</th>
                <th className="py-3 px-3.5 font-bold">Allocated Partner</th>
                <th className="py-3 px-3.5 font-bold whitespace-nowrap">Units & Escrow</th>
                <th className="py-3 px-3.5 font-bold whitespace-nowrap">Target Date</th>
                <th className="py-3 px-3.5 font-bold whitespace-nowrap">Live Status</th>
                <th className="py-3 px-3.5 font-bold whitespace-nowrap">Progress</th>
                <th className="py-3 px-3.5 text-right font-bold whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1F5F9]">
              {activeSubcontracts.map((sub) => (
                <tr key={sub.id} className="hover:bg-[#F8FAFC] transition-colors">
                  <td className="py-3.5 px-3.5 font-mono text-[#087F6A] font-bold whitespace-nowrap">{sub.id}</td>
                  <td className="py-3.5 px-3.5">
                    <div className="font-bold text-[#0B1120] font-mono text-xs">{sub.orderNumber}</div>
                    <div className="text-xs text-[#334155] font-medium">{sub.buyer}</div>
                  </td>
                  <td className="py-3.5 px-3.5">
                    <div className="font-semibold text-[#0B1120]">{sub.partnerName}</div>
                    <div className="text-xs font-mono text-[#475569]">{sub.partnerLocation}</div>
                  </td>
                  <td className="py-3.5 px-3.5 font-mono whitespace-nowrap">
                    <div className="text-[#0B1120] font-bold text-xs">{sub.units.toLocaleString()} pcs</div>
                    <div className="text-xs text-[#087F6A] font-bold">${sub.totalEscrowAmount.toLocaleString()} USD</div>
                  </td>
                  <td className="py-3.5 px-3.5 font-mono text-[#1E293B] font-medium whitespace-nowrap">{sub.deliveryDate}</td>
                  <td className="py-3.5 px-3.5 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-emerald-50 text-[#065F46] border border-emerald-200 whitespace-nowrap shadow-2xs shrink-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                      <span>{sub.status}</span>
                    </span>
                  </td>
                  <td className="py-3.5 px-3.5 w-32 whitespace-nowrap">
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-mono font-semibold text-[#334155]">
                        <span>{sub.progress}%</span>
                      </div>
                      <div className="w-full bg-[#E2E8F0] h-2 rounded-full overflow-hidden">
                        <div 
                          className="bg-[#087F6A] h-full transition-all duration-500" 
                          style={{ width: `${sub.progress}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-3.5 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleAdvanceMilestone(sub.id)}
                        className="px-2.5 py-1 rounded-lg bg-[#F1F5F9] hover:bg-[#E2E8F0] border border-[#CBD5E1] text-xs font-mono text-[#065F46] font-bold transition-all hover:shadow-2xs cursor-pointer"
                        title="Simulate next QC milestone"
                      >
                        + Milestone
                      </button>
                      <button
                        onClick={() => {
                          setSelectedContract(sub);
                          setIsContractModalOpen(true);
                        }}
                        className="px-3 py-1 rounded-lg bg-white hover:bg-[#F8FAFC] border border-[#CBD5E1] text-xs text-[#1E293B] font-semibold shadow-2xs hover:shadow-xs transition-all cursor-pointer"
                      >
                        Contract
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Broadcast New Capacity Request / Offer */}
      {isBroadcastModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fadeIn">
          <div className="w-full max-w-lg rounded-2xl bg-white border border-[#E2E8F0] p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#F1F5F9]">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-emerald-50 text-[#087F6A] border border-emerald-200">
                  <Network className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#0B1120]">Broadcast Factory Capacity / Request</h3>
                  <p className="text-xs text-[#334155]">Share spare sewing lines or request peer production</p>
                </div>
              </div>
              <button
                onClick={() => setIsBroadcastModalOpen(false)}
                className="p-1 rounded-lg text-[#64748B] hover:text-[#0B1120] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateBroadcast} className="space-y-4 text-xs">
              <div>
                <label className="text-xs font-mono text-[#334155] font-bold">FACTORY NAME / DISCLOSED ENTITY</label>
                <input
                  type="text"
                  required
                  value={rfpForm.alias}
                  onChange={(e) => setRfpForm({ ...rfpForm, alias: e.target.value })}
                  className="w-full px-3 py-2.5 mt-1 rounded-xl bg-white border border-[#CBD5E1] text-[#0B1120] font-medium focus:outline-none focus:ring-2 focus:ring-[#087F6A]/20 focus:border-[#087F6A] shadow-2xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-mono text-[#334155] font-bold">REGION / HUB</label>
                  <input
                    type="text"
                    required
                    value={rfpForm.location}
                    onChange={(e) => setRfpForm({ ...rfpForm, location: e.target.value })}
                    className="w-full px-3 py-2.5 mt-1 rounded-xl bg-white border border-[#CBD5E1] text-[#0B1120] font-medium focus:outline-none focus:ring-2 focus:ring-[#087F6A]/20 focus:border-[#087F6A] shadow-2xs"
                  />
                </div>
                <div>
                  <label className="text-xs font-mono text-[#334155] font-bold">PRODUCT SPECIALIZATION</label>
                  <select
                    value={rfpForm.specialization}
                    onChange={(e) => setRfpForm({ ...rfpForm, specialization: e.target.value })}
                    className="w-full px-3 py-2.5 mt-1 rounded-xl bg-white border border-[#CBD5E1] text-[#0B1120] font-medium focus:outline-none focus:ring-2 focus:ring-[#087F6A]/20 focus:border-[#087F6A] shadow-2xs cursor-pointer"
                  >
                    <option value="Knitwear">Knitwear</option>
                    <option value="Woven">Woven</option>
                    <option value="Denim">Denim</option>
                    <option value="Activewear">Activewear</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-mono text-[#334155] font-bold">AVAILABLE UNITS (PCS)</label>
                  <input
                    type="number"
                    min="1000"
                    step="1000"
                    required
                    value={rfpForm.availableUnits}
                    onChange={(e) => setRfpForm({ ...rfpForm, availableUnits: Number(e.target.value) })}
                    className="w-full px-3 py-2.5 mt-1 rounded-xl bg-white border border-[#CBD5E1] text-[#0B1120] font-mono font-semibold focus:outline-none focus:ring-2 focus:ring-[#087F6A]/20 focus:border-[#087F6A] shadow-2xs"
                  />
                </div>
                <div>
                  <label className="text-xs font-mono text-[#334155] font-bold">AVAILABLE FROM</label>
                  <input
                    type="text"
                    value={rfpForm.availableFrom}
                    onChange={(e) => setRfpForm({ ...rfpForm, availableFrom: e.target.value })}
                    className="w-full px-3 py-2.5 mt-1 rounded-xl bg-white border border-[#CBD5E1] text-[#0B1120] font-medium focus:outline-none focus:ring-2 focus:ring-[#087F6A]/20 focus:border-[#087F6A] shadow-2xs"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-mono text-[#334155] font-bold">CERTIFICATIONS (COMMA SEPARATED)</label>
                <input
                  type="text"
                  value={rfpForm.certifications}
                  onChange={(e) => setRfpForm({ ...rfpForm, certifications: e.target.value })}
                  className="w-full px-3 py-2.5 mt-1 rounded-xl bg-white border border-[#CBD5E1] text-[#0B1120] font-mono focus:outline-none focus:ring-2 focus:ring-[#087F6A]/20 focus:border-[#087F6A] shadow-2xs"
                />
              </div>

              <div className="pt-3 border-t border-[#F1F5F9] flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsBroadcastModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-[#F1F5F9] text-[#1E293B] hover:bg-[#E2E8F0] font-semibold cursor-pointer transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#087F6A] hover:bg-[#066653] text-white font-bold flex items-center gap-2 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Broadcast to Network</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: View Digital Subcontract & Smart Escrow Agreement */}
      {isContractModalOpen && selectedContract && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fadeIn">
          <div className="w-full max-w-2xl rounded-2xl bg-white border border-[#E2E8F0] p-6 space-y-5 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-[#F1F5F9]">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-emerald-50 text-[#087F6A] border border-emerald-200">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#0B1120]">Digital Garment Subcontract & Escrow Bond</h3>
                  <p className="text-xs font-mono text-[#087F6A] font-semibold">ID: {selectedContract.id} · Smart Contract Protocol</p>
                </div>
              </div>
              <button
                onClick={() => setIsContractModalOpen(false)}
                className="p-1 rounded-lg text-[#64748B] hover:text-[#0B1120] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-2 shadow-2xs">
                <div className="text-xs font-mono text-[#334155] uppercase font-bold">BINDING CONTRACT TERMS</div>
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div>
                    <span className="text-[#475569] font-medium">Primary Order:</span>
                    <div className="font-bold text-[#0B1120] font-mono text-xs">{selectedContract.orderNumber} ({selectedContract.buyer})</div>
                  </div>
                  <div>
                    <span className="text-[#475569] font-medium">Executing Peer Facility:</span>
                    <div className="font-bold text-[#065F46]">{selectedContract.partnerName}</div>
                  </div>
                  <div>
                    <span className="text-[#475569] font-medium">Allocated Volume:</span>
                    <div className="font-bold text-[#0B1120] font-mono text-xs">{selectedContract.units.toLocaleString()} pcs</div>
                  </div>
                  <div>
                    <span className="text-[#475569] font-medium">Agreed Unit Price:</span>
                    <div className="font-bold text-[#087F6A] font-mono text-xs">${selectedContract.ratePerPiece.toFixed(2)} / pc</div>
                  </div>
                  <div>
                    <span className="text-[#475569] font-medium">Total Smart Escrow:</span>
                    <div className="font-bold text-[#0B1120] font-mono text-sm">${selectedContract.totalEscrowAmount.toLocaleString()} USD</div>
                  </div>
                  <div>
                    <span className="text-[#475569] font-medium">AQL Quality Requirement:</span>
                    <div className="font-bold text-[#0B1120] font-mono text-xs">{selectedContract.aqlStandard} Standard</div>
                  </div>
                </div>
              </div>

              {/* Milestone Escrow Schedule */}
              <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-2.5 shadow-2xs">
                <div className="text-xs font-mono text-[#334155] uppercase font-bold">AUTOMATED ESCROW PAYOUT SCHEDULE</div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs p-2.5 rounded-lg bg-white border border-[#CBD5E1]">
                    <span className="text-[#1E293B] font-medium">1. Raw Material Inward Verification (30%)</span>
                    <span className="font-mono text-[#087F6A] font-bold">${(selectedContract.totalEscrowAmount * 0.3).toLocaleString()} USD</span>
                  </div>
                  <div className="flex items-center justify-between text-xs p-2.5 rounded-lg bg-white border border-[#CBD5E1]">
                    <span className="text-[#1E293B] font-medium">2. Inline QC Pass & AQL 1.5 Milestone (40%)</span>
                    <span className="font-mono text-[#087F6A] font-bold">${(selectedContract.totalEscrowAmount * 0.4).toLocaleString()} USD</span>
                  </div>
                  <div className="flex items-center justify-between text-xs p-2.5 rounded-lg bg-white border border-[#CBD5E1]">
                    <span className="text-[#1E293B] font-medium">3. Final Packaging & Export Gate Dispatch (30%)</span>
                    <span className="font-mono text-[#087F6A] font-bold">${(selectedContract.totalEscrowAmount * 0.3).toLocaleString()} USD</span>
                  </div>
                </div>
              </div>

              {/* Cryptographic Signature */}
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 font-mono text-xs space-y-1">
                <div className="text-[#065F46] font-bold">CRYPTOGRAPHIC DIGITAL SIGNATURE:</div>
                <div className="text-[#1E293B] break-all">{selectedContract.txHash}</div>
                <div className="text-[#475569] pt-1">Signed Timestamp: {selectedContract.signedAt}</div>
              </div>
            </div>

            <div className="pt-3 border-t border-[#F1F5F9] flex items-center justify-between">
              <span className="text-xs font-mono text-[#334155] font-medium">BGMEA Verified Smart Agreement</span>
              <button
                onClick={() => setIsContractModalOpen(false)}
                className="px-4 py-2.5 rounded-xl bg-[#087F6A] hover:bg-[#066653] text-white font-bold text-xs shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
              >
                Close Agreement View
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
