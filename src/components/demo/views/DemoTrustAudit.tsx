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
      <div className="flex flex-wrap items-center justify-between gap-4 p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-[0_1px_3px_rgba(15,23,42,0.08)]">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-bold text-[#0B1120] flex items-center gap-2 tracking-tight">
              <ShieldCheck className="w-5 h-5 text-[#087F6A]" />
              <span>Trust & Cryptographic Audit Center</span>
            </h1>
            <Badge variant="blue" dot>
              IMMUTABLE CHAIN-OF-CUSTODY
            </Badge>
          </div>
          <p className="text-sm text-[#334155] mt-1.5 leading-relaxed">
            Optional blockchain-backed auditability for verifiable production events, ESG proof, and tamper-resistant buyer certification.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="text-xs font-mono text-[#065F46] bg-emerald-50 px-3.5 py-1.5 rounded-xl border border-emerald-200 flex items-center gap-2 font-bold shadow-2xs">
            <CheckCircle2 className="w-4 h-4 text-[#087F6A]" />
            <span>State: All Block Hashes Valid (100%)</span>
          </div>
        </div>
      </div>

      {/* 4 Trust Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-[#E2E8F0] shadow-[0_1px_3px_rgba(15,23,42,0.08)] hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
          <div className="text-xs font-mono text-[#475569] font-bold uppercase tracking-wider">TOTAL VERIFIED EVENTS</div>
          <div className="text-3xl font-extrabold text-[#0B1120] font-mono mt-1.5">1,420</div>
          <div className="text-xs text-[#087F6A] font-bold mt-1">Sha-256 Merkle Root</div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#E2E8F0] shadow-[0_1px_3px_rgba(15,23,42,0.08)] hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
          <div className="text-xs font-mono text-[#475569] font-bold uppercase tracking-wider">BUYER AUDIT READINESS</div>
          <div className="text-3xl font-extrabold text-[#087F6A] font-mono mt-1.5">100% Pass</div>
          <div className="text-xs text-[#334155] font-medium mt-1">Export Compliance Ready</div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#E2E8F0] shadow-[0_1px_3px_rgba(15,23,42,0.08)] hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
          <div className="text-xs font-mono text-[#475569] font-bold uppercase tracking-wider">TAMPER ATTEMPTS DETECTED</div>
          <div className="text-3xl font-extrabold text-[#0B1120] font-mono mt-1.5">0</div>
          <div className="text-xs text-[#087F6A] font-bold mt-1">Zero Anomaly Drift</div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#E2E8F0] shadow-[0_1px_3px_rgba(15,23,42,0.08)] hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
          <div className="text-xs font-mono text-[#475569] font-bold uppercase tracking-wider">PRIVACY COMPLIANCE</div>
          <div className="text-3xl font-extrabold text-[#0B1120] font-mono mt-1.5">ZK-Proof</div>
          <div className="text-xs text-[#334155] font-medium mt-1">Commercial confidentiality</div>
        </div>
      </div>

      {/* Cryptographic Event Stream */}
      <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-[0_1px_3px_rgba(15,23,42,0.08)] space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#F1F5F9]">
          <div>
            <h3 className="text-base font-bold text-[#0B1120]">Immutable Event Ledger Timeline</h3>
            <p className="text-xs text-[#334155] font-mono mt-0.5">Real-time production milestone hashes verified against smart contract state</p>
          </div>
          <span className="text-xs font-mono font-bold text-[#334155] bg-[#F1F5F9] px-2.5 py-1 rounded-lg border border-[#CBD5E1]">Block Height #89,420</span>
        </div>

        <div className="space-y-3">
          {events.map((evt) => {
            const isVerified = verifiedMap[evt.id];
            const isVerifying = verifyingId === evt.id;
            return (
              <div
                key={evt.id}
                className="p-4.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#CBD5E1] hover:shadow-2xs transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3.5"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-mono font-bold text-[#0B1120]">
                      {evt.action}
                    </span>
                    <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded-md bg-white text-[#1E293B] border border-[#CBD5E1] shadow-2xs">
                      {evt.orderNumber}
                    </span>
                  </div>

                  <div className="text-xs text-[#475569]">
                    Logged by: <span className="text-[#0B1120] font-semibold">{evt.operator}</span> · {evt.timestamp}
                  </div>

                  <div className="flex items-center gap-2 text-xs font-mono text-[#087F6A] font-semibold pt-0.5">
                    <Hash className="w-3.5 h-3.5 text-[#087F6A] shrink-0" />
                    <span className="truncate max-w-[260px] sm:max-w-md">{evt.hash}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {isVerified ? (
                    <div className="px-3.5 py-2 rounded-xl bg-emerald-50 text-[#065F46] border border-emerald-200 text-xs font-mono font-bold flex items-center gap-1.5 shadow-2xs">
                      <Check className="w-4 h-4 text-[#087F6A]" />
                      <span>Hash Verified ✓</span>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleVerifyHash(evt.id)}
                      disabled={isVerifying}
                      className="px-3.5 py-2 rounded-xl bg-white border border-[#CBD5E1] hover:bg-[#F8FAFC] text-xs font-semibold text-[#1E293B] flex items-center gap-2 shadow-2xs hover:shadow-xs transition-all cursor-pointer"
                    >
                      <ShieldCheck className={`w-4 h-4 text-[#087F6A] ${isVerifying ? 'animate-spin' : ''}`} />
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
