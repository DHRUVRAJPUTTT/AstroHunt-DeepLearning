import { useState, useEffect, useCallback } from 'react';
import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-react';

// ─── Toast Types ────────────────────────────────────────────────────────────

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface ToastMessage {
  id: string;
  type: ToastType;
  title: string;
  description?: string;
}

// ─── Global toast state ─────────────────────────────────────────────────────

let toastListeners: Array<(toasts: ToastMessage[]) => void> = [];
let toasts: ToastMessage[] = [];

function notifyListeners() {
  toastListeners.forEach((fn) => fn([...toasts]));
}

export function toast(type: ToastType, title: string, description?: string) {
  const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
  toasts = [...toasts, { id, type, title, description }];
  notifyListeners();

  setTimeout(() => {
    toasts = toasts.filter((t) => t.id !== id);
    notifyListeners();
  }, 5000);
}

// ─── Toast Container ────────────────────────────────────────────────────────

export function ToastContainer() {
  const [items, setItems] = useState<ToastMessage[]>([]);

  useEffect(() => {
    toastListeners.push(setItems);
    return () => {
      toastListeners = toastListeners.filter((fn) => fn !== setItems);
    };
  }, []);

  const dismiss = useCallback((id: string) => {
    toasts = toasts.filter((t) => t.id !== id);
    notifyListeners();
  }, []);

  if (items.length === 0) return null;

  const icons: Record<ToastType, typeof CheckCircle> = {
    success: CheckCircle,
    error: XCircle,
    warning: AlertTriangle,
    info: Info,
  };

  const colors: Record<ToastType, string> = {
    success: 'border-emerald-500/40 bg-emerald-500/10',
    error: 'border-red-500/40 bg-red-500/10',
    warning: 'border-amber-500/40 bg-amber-500/10',
    info: 'border-[#63E4E8]/40 bg-[#63E4E8]/10',
  };

  const iconColors: Record<ToastType, string> = {
    success: 'text-emerald-400',
    error: 'text-red-400',
    warning: 'text-amber-400',
    info: 'text-[#63E4E8]',
  };

  return (
    <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 max-w-sm">
      {items.map((t) => {
        const Icon = icons[t.type];
        return (
          <div
            key={t.id}
            className={`
              flex items-start gap-3 px-4 py-3 rounded-lg border backdrop-blur-md
              shadow-xl animate-in slide-in-from-right-5
              ${colors[t.type]}
            `}
            role="alert"
          >
            <Icon size={18} className={`mt-0.5 shrink-0 ${iconColors[t.type]}`} />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-[#F5F7FF]">{t.title}</p>
              {t.description && (
                <p className="text-xs text-[#9AA6C2] mt-0.5">{t.description}</p>
              )}
            </div>
            <button
              onClick={() => dismiss(t.id)}
              className="shrink-0 text-[#9AA6C2] hover:text-[#F5F7FF] transition-colors"
              aria-label="Dismiss notification"
            >
              <X size={14} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
