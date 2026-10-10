import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: 'purple' | 'cyan' | 'none';
}

export function Card({
  children,
  className = '',
  hover = false,
  glow = 'none',
}: CardProps) {
  const glowStyles: Record<string, string> = {
    none: '',
    purple: 'hover:shadow-[#8B83FF]/10 hover:border-[#8B83FF]/30',
    cyan: 'hover:shadow-[#63E4E8]/10 hover:border-[#63E4E8]/30',
  };

  return (
    <div
      className={`
        bg-[#121A2E]/80 backdrop-blur-sm border border-[#1e2a45] rounded-xl
        ${hover ? 'transition-all duration-300 hover:bg-[#151f38] cursor-pointer hover:shadow-lg' : ''}
        ${glowStyles[glow]}
        ${className}
      `}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`px-6 pt-6 pb-2 ${className}`}>{children}</div>
  );
}

export function CardContent({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`px-6 pb-6 ${className}`}>{children}</div>;
}
