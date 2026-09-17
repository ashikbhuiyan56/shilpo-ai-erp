import React from 'react';
import { Clock, TrendingUp, Sparkles, ArrowRight, ShieldCheck, Factory } from 'lucide-react';
import { Badge } from '../common/Badge';

export const WhyNowSection: React.FC = () => {
  const cards = [
    {
      badge: 'MACRO TAILWIND',
      title: 'WHY NOW?',
      icon: Clock,
      color: 'emerald',
      content:
        'Bangladesh’s apparel industry is actively transitioning from manual volume-driven manufacturing toward predictive, traceable, and verifiable digital operations to meet stringent global ESG mandates.',
    },
    {
      badge: 'MARKET SCALE',
      title: 'WHY THIS MARKET?',
      icon: TrendingUp,
      color: 'blue',
      content:
        'A $39.35B RMG export sector commanding 80.62% of national exports and 3,500+ export-oriented factories creates a massive, concentrated operational software opportunity with high willingness to reduce lead-time risk.',
    },
    {
      badge: 'UNFAIR ADVANTAGE',
      title: 'WHY US?',
      icon: Sparkles,
      color: 'purple',
      content:
        'A Bangladesh RMG-native team combining deep industrial operations discovery with machine learning systems architecture to deliver an ERP that executes, predicts, matches capacity, and builds verifiable trust.',
    },
  ];

  return (
    <section id="why-now" className="py-24 bg-[#19042b] border-t border-purple-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <Badge variant="purple" dot>
            Strategic Conviction
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Why now. Why this market. Why us.
          </h2>
          <p className="text-purple-200/80 text-base sm:text-lg">
            The confluence of industrial scale, buyer compliance pressures, and generative predictive AI makes this the pivotal moment for <span className="font-bengali text-purple-400 font-bold">শিল্পAI ERP</span>.
          </p>
        </div>

        {/* 3 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                className="p-8 rounded-2xl bg-gradient-to-b from-[#25063f] to-[#18032a] border border-purple-800/50 hover:border-purple-500/60 transition-all flex flex-col justify-between shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="p-3 rounded-xl bg-purple-950/80 border border-purple-800/60 text-purple-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-mono font-bold text-purple-300/70">
                      {card.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-extrabold text-white mb-4">
                    {card.title}
                  </h3>

                  <p className="text-sm text-purple-100/90 leading-relaxed">
                    {card.content}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-purple-900/40 text-xs font-mono text-purple-300 flex items-center gap-1.5">
                  <Factory className="w-3.5 h-3.5" />
                  <span>Aligned with BGMEA 2030 Vision</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
