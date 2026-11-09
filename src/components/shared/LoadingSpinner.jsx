import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

export default function LoadingSpinner({ size = 'default', text, className }) {
  const sizes = {
    sm: 'h-4 w-4',
    default: 'h-6 w-6',
    lg: 'h-8 w-8',
  };

  return (
    <div className={cn('flex items-center justify-center gap-2.5 py-4', className)}>
      <Loader2 className={cn('animate-spin text-indigo-600', sizes[size])} />
      {text && <span className="text-xs font-medium text-slate-600">{text}</span>}
    </div>
  );
}

