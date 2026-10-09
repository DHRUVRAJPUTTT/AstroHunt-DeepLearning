import { Badge } from './Badge';

interface DemoIndicatorProps {
  className?: string;
}

export function DemoIndicator({ className = '' }: DemoIndicatorProps) {
  return (
    <div
      className={`flex items-center gap-2 ${className}`}
      title="Running in demo mode — results are simulated. Connect to the backend for real ML inference."
    >
      <Badge variant="demo" pulse>
        Demo Mode
      </Badge>
    </div>
  );
}
