import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'emerald' | 'blue' | 'amber' | 'red' | 'purple' | 'neutral';
  className?: string;
  dot?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'emerald',
  className = '',
  dot = false,
}) => {
  const styles = {
    emerald: 'bg-emerald-50 text-[#065F46] border-emerald-300/80 shadow-2xs',
    blue: 'bg-blue-50 text-blue-800 border-blue-300/80 shadow-2xs',
    amber: 'bg-amber-50 text-amber-800 border-amber-300/80 shadow-2xs',
    red: 'bg-rose-50 text-rose-800 border-rose-300/80 shadow-2xs',
    purple: 'bg-purple-50 text-purple-800 border-purple-300/80 shadow-2xs',
    neutral: 'bg-slate-100 text-[#1E293B] border-slate-300/80 shadow-2xs',
  };

  const dotStyles = {
    emerald: 'bg-[#087F6A]',
    blue: 'bg-blue-600',
    amber: 'bg-amber-600',
    red: 'bg-rose-600',
    purple: 'bg-purple-600',
    neutral: 'bg-slate-600',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold border tracking-wide transition-colors ${styles[variant]} ${className}`}
    >
      {dot && <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${dotStyles[variant]}`} />}
      {children}
    </span>
  );
};
