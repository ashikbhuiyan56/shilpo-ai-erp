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
    emerald: 'bg-emerald-50 text-[#065F46] border-emerald-200',
    blue: 'bg-blue-50 text-blue-700 border-blue-200',
    amber: 'bg-amber-50 text-amber-700 border-amber-200',
    red: 'bg-rose-50 text-rose-700 border-rose-200',
    purple: 'bg-purple-50 text-purple-700 border-purple-200',
    neutral: 'bg-[#F1F5F9] text-[#475569] border-[#E2E8F0]',
  };

  const dotStyles = {
    emerald: 'bg-[#087F6A]',
    blue: 'bg-blue-600',
    amber: 'bg-amber-600',
    red: 'bg-rose-600',
    purple: 'bg-purple-600',
    neutral: 'bg-slate-400',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border tracking-wide ${styles[variant]} ${className}`}
    >
      {dot && <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${dotStyles[variant]}`} />}
      {children}
    </span>
  );
};
