import React from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  intensity?: 'low' | 'medium' | 'high';
}

export function GlassCard({ children, className, intensity = 'medium', ...props }: GlassCardProps) {
  const intensities = {
    low: 'bg-white/[0.02]',
    medium: 'bg-white/5',
    high: 'bg-white/10',
  };

  return (
    <div 
      className={cn(
        "glass-card",
        intensities[intensity],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
