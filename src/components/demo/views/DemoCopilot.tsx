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
      <div className="flex flex-wrap items-center justify-between gap-4 p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-[#172033] flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#087F6A]" />
              <span>ShilpoAI Operations Copilot</span>
            </h1>
            <Badge variant="emerald" dot>
              GEMINI RMG REASONING ENGINE
            </Badge>
          </div>
          <p className="text-xs text-[#64748B] mt-1">
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
          className="px-3.5 py-2 rounded-lg bg-white hover:bg-[#F1F5F9] border border-[#CBD5E1] text-xs font-semibold text-[#334155] flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Clear Chat</span>
        </button>
      </div>

      {/* Suggested Prompt Chips */}
      <div className="space-y-2">
        <div className="text-[11px] font-mono text-[#64748B] uppercase tracking-wider">
          Suggested Operational Queries:
        </div>
        <div className="flex flex-wrap gap-2">
          {promptChips.map((chip, idx) => (
            <button
              key={idx}
              onClick={() => handleSendPrompt(chip)}
              className="px-3.5 py-2 rounded-xl bg-white hover:bg-emerald-50 border border-[#E2E8F0] hover:border-emerald-300 text-xs text-[#334155] hover:text-[#065F46] transition-all text-left cursor-pointer shadow-2xs font-medium"
            >
              {chip}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Thread Container */}
      <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs min-h-[440px] flex flex-col justify-between space-y-4">
        {/* Messages */}
        <div className="space-y-4 overflow-y-auto max-h-[500px] pr-2">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex gap-3 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.sender === 'assistant' && (
                <div className="w-8 h-8 rounded-xl bg-emerald-50 text-[#087F6A] border border-emerald-200 flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div className={`max-w-2xl space-y-3 ${m.sender === 'user' ? 'items-end' : 'items-start'}`}>
                <div
                  className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-[#087F6A] text-white font-medium rounded-tr-none shadow-xs'
                      : 'bg-[#F8FAFC] text-[#172033] border border-[#E2E8F0] rounded-tl-none'
                  }`}
                >
                  {m.text}
                </div>

                {/* Structured Interactive Card for Assistant Responses */}
                {m.card && (
                  <div className="p-5 rounded-xl bg-white border border-[#E2E8F0] space-y-3 text-xs shadow-xs">
                    <div className="flex items-center justify-between pb-2 border-b border-[#F1F5F9]">
                      <span className="font-bold text-[#172033] flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-[#087F6A]" />
                        {m.card.title}
                      </span>
                      <span className="text-[10px] font-mono text-[#64748B]">STRUCTURED INSIGHT</span>
                    </div>

                    {m.card.metrics && (
                      <div className="grid grid-cols-3 gap-2">
                        {m.card.metrics.map((met, mi) => (
                          <div key={mi} className="p-2.5 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-center">
                            <div className="text-[10px] text-[#64748B] font-mono">{met.label}</div>
                            <div className={`font-mono font-bold text-sm mt-0.5 ${
                              met.color === 'rose' ? 'text-rose-600' : met.color === 'amber' ? 'text-amber-600' : met.color === 'emerald' ? 'text-[#087F6A]' : 'text-[#172033]'
                            }`}>
                              {met.value}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {m.card.recommendation && (
                      <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-[#065F46] text-xs">
                        <strong>Recommendation:</strong> {m.card.recommendation}
                      </div>
                    )}

                    {m.card.actionLabel && m.card.actionTab && (
                      <div className="pt-1">
                        <button
                          onClick={() => onNavigate(m.card!.actionTab!)}
                          className="px-3.5 py-2 rounded-lg bg-[#087F6A] hover:bg-[#066653] text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                        >
                          <span>{m.card.actionLabel}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>
                )}

                <div className={`text-[10px] font-mono text-[#94A3B8] ${m.sender === 'user' ? 'text-right' : 'text-left'}`}>
                  {m.timestamp}
                </div>
              </div>

              {m.sender === 'user' && (
                <div className="w-8 h-8 rounded-xl bg-[#F1F5F9] text-[#334155] border border-[#CBD5E1] flex items-center justify-center shrink-0">
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
          className="pt-4 border-t border-[#F1F5F9] flex items-center gap-2"
        >
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            placeholder="Ask ShilpoAI Copilot about line speeds, delay predictions, defect patterns, or capacity..."
            className="flex-1 px-4 py-3 rounded-xl bg-white border border-[#CBD5E1] text-xs sm:text-sm text-[#172033] placeholder-[#94A3B8] focus:outline-none focus:border-[#087F6A] focus:ring-1 focus:ring-[#087F6A]"
          />
          <button
            type="submit"
            disabled={!inputQuery.trim()}
            className="px-5 py-3 rounded-xl bg-[#087F6A] hover:bg-[#066653] disabled:opacity-40 text-white font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
          >
            <span>Send</span>
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
