import { Loader2 } from 'lucide-react';

interface LoadingStateProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function LoadingState({
  message = 'Loading...',
  size = 'md',
}: LoadingStateProps) {
  const sizes: Record<string, { icon: number; text: string }> = {
    sm: { icon: 16, text: 'text-xs' },
    md: { icon: 24, text: 'text-sm' },
    lg: { icon: 32, text: 'text-base' },
  };

  return (
    <div className="flex flex-col items-center justify-center gap-3 py-12">
      <Loader2
        size={sizes[size].icon}
        className="animate-spin text-[#8B83FF]"
      />
      <p className={`${sizes[size].text} text-[#9AA6C2]`}>{message}</p>
    </div>
  );
}
