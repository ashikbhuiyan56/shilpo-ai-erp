import React from 'react';
import { User, Cpu, BookOpen, Layers, Award, Sparkles } from 'lucide-react';
import { TEAM_MEMBERS } from '../../data/mockData';
import { Badge } from '../common/Badge';

export const TeamSection: React.FC = () => {
  return (
    <section id="team" className="py-24 bg-[#19042b] border-t border-purple-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <Badge variant="purple" dot>
            Founding Leadership
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Built by RMG Practitioners & AI Researchers
          </h2>
          <p className="text-purple-200/80 text-base sm:text-lg">
            Built from Bangladesh RMG-native customer discovery and operational pain points.
          </p>
        </div>

        {/* 3 Founders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {TEAM_MEMBERS.map((member, idx) => (
            <div
              key={idx}
              className="p-8 rounded-2xl bg-gradient-to-b from-[#24063d] to-[#160327] border border-purple-900/50 hover:border-purple-500/50 transition-all flex flex-col justify-between shadow-lg"
            >
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-600/30 via-purple-950 to-indigo-600/30 border border-purple-500/40 flex items-center justify-center text-purple-300 font-bold text-xl">
                    {member.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                  </div>
                  <div>
                    <span className="text-xs font-mono font-bold text-purple-400 uppercase tracking-wider">
                      {member.role}
                    </span>
                    <h3 className="text-lg font-bold text-white leading-snug">
                      {member.name}
                    </h3>
                    {member.title && (
                      <div className="text-[11px] text-purple-200/70 mt-0.5 leading-tight">
                        {member.title}
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-900/60 mb-4">
                  <div className="text-[11px] font-mono text-purple-300/70 uppercase">Focus Areas:</div>
                  <div className="text-xs font-semibold text-purple-200 mt-0.5">
                    {member.domain}
                  </div>
                </div>

                <p className="text-xs text-purple-200/80 leading-relaxed">
                  {member.bio}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-purple-900/40 flex items-center justify-between text-[11px] font-mono text-purple-400/70">
                <span>Dhaka, Bangladesh</span>
                <span className="text-purple-300 font-bengali">শিল্পAI Team</span>
              </div>
            </div>
          ))}
        </div>

        {/* Commitment Banner */}
        <div className="p-6 rounded-2xl bg-[#220639] border border-purple-800/50 text-center max-w-2xl mx-auto shadow-md">
          <p className="text-xs sm:text-sm text-purple-200 italic">
            “Our mission is to empower Bangladesh garment manufacturers with predictive machine intelligence, protecting factory margins while elevating national export trust.”
          </p>
        </div>
      </div>
    </section>
  );
};
