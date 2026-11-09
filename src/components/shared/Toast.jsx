import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useApp } from '@/context/AppContext';

export default function Toast() {
  const { state } = useApp();
  const notifications = state.notifications || [];

  if (notifications.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm pointer-events-none">
      {notifications.map((n) => {
        const isSuccess = n.type === 'success';
        const isError = n.type === 'error';

        return (
          <div
            key={n.id}
            className={cn(
              'pointer-events-auto flex items-center gap-2.5 rounded-xl border px-4 py-3 shadow-lg backdrop-blur-md transition-all animate-in slide-in-from-bottom-3',
              isSuccess && 'border-emerald-200 bg-emerald-50/95 text-emerald-900',
              isError && 'border-rose-200 bg-rose-50/95 text-rose-900',
              !isSuccess && !isError && 'border-slate-200 bg-white/95 text-slate-800'
            )}
          >
            {isSuccess ? (
              <CheckCircle2 className="h-4 w-4 text-emerald-600 flex-shrink-0" />
            ) : isError ? (
              <AlertCircle className="h-4 w-4 text-rose-600 flex-shrink-0" />
            ) : (
              <Info className="h-4 w-4 text-indigo-600 flex-shrink-0" />
            )}
            <p className="text-xs font-medium flex-1">{n.message}</p>
          </div>
        );
      })}
    </div>
  );
}

