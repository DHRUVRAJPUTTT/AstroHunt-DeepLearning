import type { ReactNode } from 'react';
import { FileX } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
}

export function EmptyState({
  title,
  description,
  icon,
  action,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
      <div className="p-4 rounded-full bg-[#121A2E] text-[#9AA6C2]">
        {icon || <FileX size={32} />}
      </div>
      <div className="space-y-1">
        <h3 className="text-lg font-semibold text-[#F5F7FF]">{title}</h3>
        {description && (
          <p className="text-sm text-[#9AA6C2] max-w-md">{description}</p>
        )}
      </div>
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}
