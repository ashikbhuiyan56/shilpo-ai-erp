import React from 'react';
import { CheckCircle2, Clock, MapPin, ArrowRight, Sparkles } from 'lucide-react';
import { ROADMAP_STAGES } from '../../data/mockData';
import { Badge } from '../common/Badge';

export const RoadmapSection: React.FC = () => {
  return (
    <section id="roadmap" className="py-24 bg-[#19042b] border-t border-purple-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <Badge variant="purple" dot>
            Product Evolution
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Execution & Rollout Roadmap
          </h2>
          <p className="text-purple-200/80 text-base sm:text-lg">
            From focused shop-floor pilots to becoming the standard operating infrastructure for Bangladesh RMG.
          </p>
        </div>

        {/* Roadmap Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ROADMAP_STAGES.map((stage, idx) => {
            const isCompleted = stage.status === 'completed';
            const isCurrent = stage.status === 'current';
            return (
              <div
                key={idx}
                className={`p-6 rounded-2xl border flex flex-col justify-between transition-all ${
                  isCurrent
                    ? 'bg-gradient-to-b from-[#330854]/60 to-[#1b042f] border-purple-500 shadow-xl shadow-purple-900/30'
                    : isCompleted
                    ? 'bg-[#220638]/70 border-purple-900/40'
                    : 'bg-[#1e0532]/50 border-purple-950/60 opacity-90'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono font-bold text-purple-300">
                      {stage.phase}
                    </span>
                    {isCurrent ? (
                      <Badge variant="purple" dot className="text-[10px]">
                        ACTIVE
                      </Badge>
                    ) : isCompleted ? (
                      <Badge variant="neutral" className="text-[10px]">
                        DONE
                      </Badge>
                    ) : (
                      <Badge variant="purple" className="text-[10px]">
                        PLANNED
                      </Badge>
                    )}
                  </div>

                  <div className="text-[11px] font-mono text-purple-400 font-medium mb-1">
                    {stage.period}
                  </div>

                  <h3 className="text-base font-bold text-white mb-4">
                    {stage.title}
                  </h3>

                  <ul className="space-y-2.5 text-xs text-purple-200/90">
                    {stage.items.map((item, itemIdx) => (
                      <li key={itemIdx} className="flex items-start gap-2">
                        <CheckCircle2
                          className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${
                            isCurrent ? 'text-purple-400' : isCompleted ? 'text-slate-400' : 'text-purple-400/80'
                          }`}
                        />
                        <span className="leading-snug">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 mt-6 border-t border-purple-900/40 text-[10px] font-mono text-purple-400/60">
                  Milestone Goal: {idx + 1} of 4
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
