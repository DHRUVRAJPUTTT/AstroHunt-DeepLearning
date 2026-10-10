import type { ReactNode } from 'react';
import { Card } from './Card';

interface StatCardProps {
  label: string;
  value: string | number;
  subtitle?: string;
  icon?: ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  className?: string;
}

export function StatCard({
  label,
  value,
  subtitle,
  icon,
  className = '',
}: StatCardProps) {
  return (
    <Card className={`p-5 ${className}`} hover glow="purple">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-xs font-medium text-[#9AA6C2] uppercase tracking-wider">
            {label}
          </p>
          <p className="text-2xl font-bold text-[#F5F7FF] tracking-tight">
            {typeof value === 'number' ? value.toLocaleString() : value}
          </p>
          {subtitle && (
            <p className="text-xs text-[#9AA6C2]">{subtitle}</p>
          )}
        </div>
        {icon && (
          <div className="p-2.5 bg-[#8B83FF]/10 rounded-lg text-[#8B83FF]">
            {icon}
          </div>
        )}
      </div>
    </Card>
  );
}
