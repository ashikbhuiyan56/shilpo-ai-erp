import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  CheckCircle2, 
  FileCheck, 
  Hash, 
  ArrowRight, 
  Sparkles, 
  RotateCcw,
  Check,
  AlertCircle
} from 'lucide-react';
import { SAMPLE_AUDIT_EVENTS } from '../../../data/mockData';
import { DemoTab } from '../../../types';
import { Badge } from '../../common/Badge';

interface DemoTrustAuditProps {
  onNavigate: (tab: DemoTab) => void;
}

export const DemoTrustAudit: React.FC<DemoTrustAuditProps> = ({ onNavigate }) => {
  const [events, setEvents] = useState(SAMPLE_AUDIT_EVENTS);
  const [verifyingId, setVerifyingId] = useState<string | null>(null);
  const [verifiedMap, setVerifiedMap] = useState<Record<string, boolean>>({});

  const handleVerifyHash = (eventId: string) => {
    setVerifyingId(eventId);
    setTimeout(() => {
      setVerifyingId(null);
      setVerifiedMap((prev) => ({ ...prev, [eventId]: true }));
    }, 600);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-[#172033] flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#087F6A]" />
              <span>Trust & Cryptographic Audit Center</span>
            </h1>
            <Badge variant="blue" dot>
              IMMUTABLE CHAIN-OF-CUSTODY
            </Badge>
          </div>
          <p className="text-xs text-[#64748B] mt-1">
            Optional blockchain-backed auditability for verifiable production events, ESG proof, and tamper-resistant buyer certification.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="text-xs font-mono text-[#065F46] bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200 flex items-center gap-1.5 font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#087F6A]" />
            <span>State: All Block Hashes Valid (100%)</span>
          </div>
        </div>
      </div>

      {/* 4 Trust Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs">
          <div className="text-[10px] font-mono text-[#64748B] uppercase tracking-wider">TOTAL VERIFIED EVENTS</div>
          <div className="text-2xl font-bold text-[#172033] font-mono mt-1">1,420 Blocks</div>
          <div className="text-xs text-[#087F6A] font-semibold mt-0.5">Sha-256 Merkle Root</div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs">
          <div className="text-[10px] font-mono text-[#64748B] uppercase tracking-wider">BUYER AUDIT READINESS</div>
          <div className="text-2xl font-bold text-[#087F6A] font-mono mt-1">100% Pass</div>
          <div className="text-xs text-[#64748B] mt-0.5">Export Compliance</div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs">
          <div className="text-[10px] font-mono text-[#64748B] uppercase tracking-wider">TAMPER ATTEMPTS DETECTED</div>
          <div className="text-2xl font-bold text-[#172033] font-mono mt-1">0</div>
          <div className="text-xs text-[#087F6A] font-semibold mt-0.5">Zero Anomaly Drift</div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs">
          <div className="text-[10px] font-mono text-[#64748B] uppercase tracking-wider">PRIVACY COMPLIANCE</div>
          <div className="text-2xl font-bold text-[#172033] font-mono mt-1">ZK-Proof</div>
          <div className="text-xs text-[#64748B] mt-0.5">Commercial confidentiality</div>
        </div>
      </div>

      {/* Cryptographic Event Stream */}
      <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#F1F5F9]">
          <div>
            <h3 className="text-sm font-bold text-[#172033]">Immutable Event Ledger Timeline</h3>
            <p className="text-xs text-[#64748B] font-mono">Real-time production milestone hashes verified against smart contract state</p>
          </div>
          <span className="text-xs font-mono text-[#64748B]">Block Height #89,420</span>
        </div>

        <div className="space-y-3">
          {events.map((evt) => {
            const isVerified = verifiedMap[evt.id];
            const isVerifying = verifyingId === evt.id;
            return (
              <div
                key={evt.id}
                className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#CBD5E1] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-[#172033]">
                      {evt.action}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white text-[#334155] border border-[#E2E8F0]">
                      {evt.orderNumber}
                    </span>
                  </div>

                  <div className="text-xs text-[#64748B]">
                    Logged by: <span className="text-[#334155] font-medium">{evt.operator}</span> · {evt.timestamp}
                  </div>

                  <div className="flex items-center gap-2 text-[11px] font-mono text-[#087F6A] pt-0.5">
                    <Hash className="w-3 h-3 text-[#087F6A] shrink-0" />
                    <span className="truncate max-w-[260px] sm:max-w-md">{evt.hash}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {isVerified ? (
                    <div className="px-3 py-1.5 rounded-lg bg-emerald-50 text-[#065F46] border border-emerald-200 text-xs font-mono font-bold flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-[#087F6A]" />
                      <span>Hash Verified ✓</span>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleVerifyHash(evt.id)}
                      disabled={isVerifying}
                      className="px-3 py-1.5 rounded-lg bg-white border border-[#CBD5E1] hover:bg-[#F1F5F9] text-xs font-semibold text-[#334155] flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <ShieldCheck className={`w-3.5 h-3.5 ${isVerifying ? 'animate-spin text-[#087F6A]' : ''}`} />
                      <span>{isVerifying ? 'Validating Proof...' : 'Verify Cryptographic Proof'}</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
