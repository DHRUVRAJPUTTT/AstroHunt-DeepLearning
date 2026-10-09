interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'demo' | 'purple';
  size?: 'sm' | 'md';
  className?: string;
  pulse?: boolean;
}

export function Badge({
  children,
  variant = 'default',
  size = 'sm',
  className = '',
  pulse = false,
}: BadgeProps) {
  const variants: Record<string, string> = {
    default: 'bg-[#1e2a45] text-[#9AA6C2] border-[#2a3352]',
    success: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    warning: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
    danger: 'bg-red-500/15 text-red-400 border-red-500/30',
    info: 'bg-[#63E4E8]/15 text-[#63E4E8] border-[#63E4E8]/30',
    demo: 'bg-[#8B83FF]/15 text-[#8B83FF] border-[#8B83FF]/30',
    purple: 'bg-purple-600/20 text-purple-300 border-purple-500/40',
  };

  const sizes: Record<string, string> = {
    sm: 'px-2 py-0.5 text-[10px]',
    md: 'px-3 py-1 text-xs',
  };

  return (
    <span
      className={`
        inline-flex items-center gap-1.5 font-medium rounded-full border
        ${variants[variant] || variants.default} ${sizes[size]} ${className}
      `}
    >
      {pulse && (
        <span className="relative flex h-1.5 w-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-current" />
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-current" />
        </span>
      )}
      {children}
    </span>
  );
}
