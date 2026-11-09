import { Lightbulb, ChevronDown, ChevronUp, Sparkles, AlertTriangle, Info } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export default function TipCard({
  title,
  content,
  expandable = true,
  defaultExpanded = false,
  variant = 'default',
  badge = 'HCI Tip',
}) {
  const [expanded, setExpanded] = useState(defaultExpanded);

  const variants = {
    default: 'border-amber-200/80 bg-amber-50/70 text-amber-900',
    info: 'border-indigo-200/80 bg-indigo-50/70 text-indigo-900',
    success: 'border-emerald-200/80 bg-emerald-50/70 text-emerald-900',
    warning: 'border-rose-200/80 bg-rose-50/70 text-rose-900',
  };

  const icons = {
    default: <Lightbulb className="h-4 w-4 text-amber-600 flex-shrink-0" />,
    info: <Info className="h-4 w-4 text-indigo-600 flex-shrink-0" />,
    success: <Sparkles className="h-4 w-4 text-emerald-600 flex-shrink-0" />,
    warning: <AlertTriangle className="h-4 w-4 text-rose-600 flex-shrink-0" />,
  };

  return (
    <div className={cn('rounded-xl border p-3.5 transition-all shadow-xs', variants[variant])}>
      <div
        onClick={() => expandable && setExpanded(!expanded)}
        className={cn(
          'flex w-full items-center justify-between gap-2.5',
          expandable && 'cursor-pointer select-none'
        )}
      >
        <div className="flex items-center gap-2 min-w-0">
          {icons[variant]}
          <span className="text-xs font-semibold uppercase tracking-wider opacity-75">{badge}:</span>
          <span className="text-sm font-semibold truncate text-slate-800">{title}</span>
        </div>
        {expandable && (
          <button type="button" className="text-slate-400 hover:text-slate-600 p-0.5">
            {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
        )}
      </div>
      {(!expandable || expanded) && (
        <div className="mt-2.5 pl-6 text-xs leading-relaxed text-slate-700 border-t border-slate-200/50 pt-2">
          {content}
        </div>
      )}
    </div>
  );
}

