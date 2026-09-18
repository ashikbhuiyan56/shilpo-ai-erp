import React, { useState } from 'react';
import { 
  Sparkles, 
  Send, 
  Bot, 
  User, 
  ArrowRight, 
  AlertTriangle, 
  CheckCircle2, 
  Activity, 
  Network, 
  Zap,
  RotateCcw
} from 'lucide-react';
import { DemoTab } from '../../../types';
import { Badge } from '../../common/Badge';

interface DemoCopilotProps {
  onNavigate: (tab: DemoTab) => void;
}

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  card?: {
    type: 'risk' | 'lines' | 'defects' | 'priorities';
    title: string;
    metrics?: { label: string; value: string; color?: string }[];
    recommendation?: string;
    actionLabel?: string;
    actionTab?: DemoTab;
  };
}

export const DemoCopilot: React.FC<DemoCopilotProps> = ({ onNavigate }) => {
  const [inputQuery, setInputQuery] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'msg-1',
      sender: 'assistant',
      text: 'Hello! I am your ShilpoAI Operational Copilot. I analyze shop-floor telemetry, order velocity, defect anomalies, and capacity network balances across your Bangladesh factory lines in real time.',
      timestamp: '10:45 AM',
    },
    {
      id: 'msg-2',
      sender: 'user',
      text: 'Which orders are at risk this week?',
      timestamp: '10:46 AM',
    },
    {
      id: 'msg-3',
      sender: 'assistant',
      text: 'Analysis complete: Order #BD-2048 (Nordic Apparel - 45,000 pcs Polo) is currently the only critical batch flagged with a 78% probability of delay.',
      timestamp: '10:46 AM',
      card: {
        type: 'risk',
        title: 'Order #BD-2048 Risk Profile',
        metrics: [
          { label: 'Delay Risk', value: '78%', color: 'rose' },
          { label: 'Projected Slippage', value: '2.4 Days', color: 'rose' },
          { label: 'Shortfall Volume', value: '18,000 pcs', color: 'amber' },
        ],
        recommendation: 'Activate verified capacity matching with Partner #BD-017 in Gazipur (94% Compatibility).',
        actionLabel: 'Open Capacity Match Engine',
        actionTab: 'capacity',
      },
    },
  ]);

  const promptChips = [
    'Which orders are at risk this week?',
    'Why is Order #BD-2048 delayed?',
    'Which production lines have spare capacity?',
    'What caused the increase in defects on Line 02?',
    'What should I prioritize today?',
  ];

  const handleSendPrompt = (promptText: string) => {
    if (!promptText.trim()) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: promptText,
      timestamp: 'Just now',
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');

    // Generate intelligent contextual response
    setTimeout(() => {
      let assistantMsg: Message;

      if (promptText.toLowerCase().includes('why is order #bd-2048 delayed') || promptText.toLowerCase().includes('why')) {
        assistantMsg = {
          id: `ai-${Date.now()}`,
          sender: 'assistant',
          text: 'Order #BD-2048 suffered a 3-day raw material delay on dyed 180 GSM single jersey fabric. Combined with Line 02 operating at 76.4% SMV efficiency, the line cannot produce the remaining 26,500 units before vessel cut-off without external buffer.',
          timestamp: 'Just now',
          card: {
            type: 'risk',
            title: 'Root Cause Breakdown: Order #BD-2048',
            metrics: [
              { label: 'Fabric Delay', value: '+3.0 Days', color: 'rose' },
              { label: 'Line 02 Efficiency', value: '76.4%', color: 'amber' },
              { label: 'Vessel Cutoff', value: 'Sep 08, 2026', color: 'neutral' },
            ],
            recommendation: 'Offload 18,000 units to verified peer partner or rebalance Line 04 sewing stations.',
            actionLabel: 'Launch Line Balancing Simulator',
            actionTab: 'forecast',
          },
        };
      } else if (promptText.toLowerCase().includes('spare capacity') || promptText.toLowerCase().includes('lines')) {
        assistantMsg = {
          id: `ai-${Date.now()}`,
          sender: 'assistant',
          text: 'Line 04 (Basic Crew Neck) is currently operating at 91% efficiency with 4,000 units of buffer headroom before next batch setup. Additionally, 4 verified peer factories in Gazipur offer 80,000 units of instant capacity.',
          timestamp: 'Just now',
          card: {
            type: 'lines',
            title: 'Available Capacity Overview',
            metrics: [
              { label: 'Line 04 Internal Headroom', value: '4,000 pcs', color: 'emerald' },
              { label: 'Gazipur Peer Network', value: '80,000 pcs', color: 'emerald' },
              { label: 'Average Match Time', value: '< 4 Hours', color: 'blue' },
            ],
            recommendation: 'Internal shift recovers 1.3 days; Peer network recovers full 2.4 days.',
            actionLabel: 'View Verified Capacity Network',
            actionTab: 'capacity',
          },
        };
      } else if (promptText.toLowerCase().includes('defects') || promptText.toLowerCase().includes('line 02')) {
        assistantMsg = {
          id: `ai-${Date.now()}`,
          sender: 'assistant',
          text: 'Line 02 defect rate increased to 2.8% due to needle tension instability on workstation S08 during collar attachment on 180 GSM jersey.',
          timestamp: 'Just now',
          card: {
            type: 'defects',
            title: 'Line 02 Quality Diagnostic',
            metrics: [
              { label: 'Line Defect Rate', value: '2.8%', color: 'amber' },
              { label: 'Primary Anomaly', value: 'Stitch Irregularity', color: 'rose' },
              { label: 'AI Confidence', value: '94%', color: 'emerald' },
            ],
            recommendation: 'Re-calibrate needle tension on L02-S08 and replace needle size to 12/80.',
            actionLabel: 'Open AI Quality Inspector',
            actionTab: 'quality',
          },
        };
      } else {
        assistantMsg = {
          id: `ai-${Date.now()}`,
          sender: 'assistant',
          text: 'Here is your executive operational priority checklist for Shift A:',
          timestamp: 'Just now',
          card: {
            type: 'priorities',
            title: 'Shift A Operational Priorities',
            metrics: [
              { label: 'Priority 1', value: 'Resolve #BD-2048 Deficit', color: 'rose' },
              { label: 'Priority 2', value: 'Calibrate Line 02 Collar Tension', color: 'amber' },
              { label: 'Priority 3', value: 'Verify 850 pcs AQL 1.5 Final Batch', color: 'emerald' },
            ],
            recommendation: 'Activating peer capacity on #BD-2048 secures 100% on-time delivery metric for Nordic Apparel.',
            actionLabel: 'Go to AI Risk Center',
            actionTab: 'risk-center',
          },
        };
      }

      setMessages((prev) => [...prev, assistantMsg]);
    }, 500);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-[0_1px_3px_rgba(15,23,42,0.08)]">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-bold text-[#0B1120] flex items-center gap-2 tracking-tight">
              <Sparkles className="w-5 h-5 text-[#087F6A]" />
              <span>ShilpoAI Operations Copilot</span>
            </h1>
            <Badge variant="emerald" dot>
              GEMINI RMG REASONING ENGINE
            </Badge>
          </div>
          <p className="text-sm text-[#334155] mt-1.5 leading-relaxed">
            Conversational factory intelligence assistant trained on Bangladesh apparel manufacturing workflows, SMV line balancing, and capacity heuristics.
          </p>
        </div>

        <button
          onClick={() => {
            setMessages([
              {
                id: 'reset',
                sender: 'assistant',
                text: 'Conversation reset. How can I assist your factory operations today?',
                timestamp: 'Just now',
              },
            ]);
          }}
          className="px-4 py-2.5 rounded-xl bg-white hover:bg-[#F8FAFC] border border-[#CBD5E1] text-xs font-semibold text-[#1E293B] flex items-center gap-1.5 shadow-2xs hover:shadow-xs transition-all cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Clear Chat</span>
        </button>
      </div>

      {/* Suggested Prompt Chips */}
      <div className="space-y-2">
        <div className="text-xs font-mono font-bold text-[#334155] uppercase tracking-wider">
          Suggested Operational Queries:
        </div>
        <div className="flex flex-wrap gap-2">
          {promptChips.map((chip, idx) => (
            <button
              key={idx}
              onClick={() => handleSendPrompt(chip)}
              className="px-4 py-2.5 rounded-xl bg-white hover:bg-emerald-50/70 border border-[#CBD5E1] hover:border-[#087F6A]/50 text-xs text-[#1E293B] hover:text-[#065F46] transition-all text-left cursor-pointer shadow-2xs hover:shadow-xs font-medium"
            >
              {chip}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Thread Container */}
      <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-[0_1px_3px_rgba(15,23,42,0.08)] min-h-[460px] flex flex-col justify-between space-y-5">
        {/* Messages */}
        <div className="space-y-5 overflow-y-auto max-h-[520px] pr-2">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex gap-3.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.sender === 'assistant' && (
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#087F6A] border border-emerald-200 flex items-center justify-center shrink-0 shadow-2xs">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div className={`max-w-2xl space-y-3 ${m.sender === 'user' ? 'items-end' : 'items-start'}`}>
                <div
                  className={`p-4.5 rounded-2xl text-sm leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-[#087F6A] text-white font-medium rounded-tr-none shadow-sm'
                      : 'bg-[#F8FAFC] text-[#0B1120] border border-[#E2E8F0] rounded-tl-none shadow-2xs font-normal'
                  }`}
                >
                  {m.text}
                </div>

                {/* Structured Interactive Card for Assistant Responses */}
                {m.card && (
                  <div className="p-5 rounded-xl bg-white border border-[#CBD5E1] space-y-3.5 text-xs shadow-sm">
                    <div className="flex items-center justify-between pb-2.5 border-b border-[#F1F5F9]">
                      <span className="font-bold text-[#0B1120] text-sm flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-[#087F6A]" />
                        {m.card.title}
                      </span>
                      <span className="text-xs font-mono font-bold text-[#087F6A] bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">STRUCTURED INSIGHT</span>
                    </div>

                    {m.card.metrics && (
                      <div className="grid grid-cols-3 gap-2.5">
                        {m.card.metrics.map((met, mi) => (
                          <div key={mi} className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-center shadow-2xs">
                            <div className="text-xs text-[#475569] font-mono font-medium">{met.label}</div>
                            <div className={`font-mono font-bold text-lg mt-1 ${
                              met.color === 'rose' ? 'text-rose-600' : met.color === 'amber' ? 'text-amber-600' : met.color === 'emerald' ? 'text-[#087F6A]' : 'text-[#0B1120]'
                            }`}>
                              {met.value}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {m.card.recommendation && (
                      <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-[#065F46] text-xs leading-relaxed font-medium">
                        <strong className="font-bold text-[#065F46]">Recommendation:</strong> {m.card.recommendation}
                      </div>
                    )}

                    {m.card.actionLabel && m.card.actionTab && (
                      <div className="pt-1">
                        <button
                          onClick={() => onNavigate(m.card!.actionTab!)}
                          className="px-4 py-2.5 rounded-xl bg-[#087F6A] hover:bg-[#066653] text-white font-bold text-xs flex items-center gap-2 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 cursor-pointer shadow-sm"
                        >
                          <span>{m.card.actionLabel}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>
                )}

                <div className={`text-xs font-mono text-[#64748B] ${m.sender === 'user' ? 'text-right' : 'text-left'}`}>
                  {m.timestamp}
                </div>
              </div>

              {m.sender === 'user' && (
                <div className="w-9 h-9 rounded-xl bg-[#F1F5F9] text-[#1E293B] border border-[#CBD5E1] flex items-center justify-center shrink-0 shadow-2xs">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendPrompt(inputQuery);
          }}
          className="pt-4 border-t border-[#F1F5F9] flex items-center gap-2.5"
        >
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            placeholder="Ask ShilpoAI Copilot about line speeds, delay predictions, defect patterns, or capacity..."
            className="flex-1 px-4 py-3 rounded-xl bg-white border border-[#CBD5E1] text-sm text-[#0B1120] placeholder-[#64748B] focus:outline-none focus:ring-2 focus:ring-[#087F6A]/20 focus:border-[#087F6A] shadow-2xs font-medium"
          />
          <button
            type="submit"
            disabled={!inputQuery.trim()}
            className="px-5 py-3 rounded-xl bg-[#087F6A] hover:bg-[#066653] disabled:opacity-40 text-white font-bold text-xs flex items-center gap-2 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 cursor-pointer shadow-sm"
          >
            <span>Send</span>
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
