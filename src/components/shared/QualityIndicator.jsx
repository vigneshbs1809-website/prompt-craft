import { cn } from '@/lib/utils';
import { getQualityLevel } from '@/services/ai/ruleEngine';
import { Sparkles, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function QualityIndicator({ score, showLabel = true, size = 'default' }) {
  const quality = getQualityLevel(score);

  const sizeClasses = {
    sm: 'h-1.5',
    default: 'h-2.5',
    lg: 'h-3.5',
  };

  const getBarColor = () => {
    if (score >= 81) return 'bg-indigo-600';
    if (score >= 61) return 'bg-teal-500';
    if (score >= 31) return 'bg-amber-500';
    return 'bg-rose-500';
  };

  return (
    <div className="w-full space-y-1.5">
      {showLabel && (
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 font-semibold">
            {score >= 61 ? (
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            ) : score >= 31 ? (
              <Sparkles className="h-4 w-4 text-amber-500" />
            ) : (
              <AlertCircle className="h-4 w-4 text-rose-500" />
            )}
            <span className={cn('text-xs font-bold uppercase tracking-wide', quality.color)}>
              {quality.label}
            </span>
          </div>
          <span className="font-mono font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200">
            {score}/100
          </span>
        </div>
      )}
      <div className={cn('w-full overflow-hidden rounded-full bg-slate-100 border border-slate-200/60', sizeClasses[size])}>
        <div
          className={cn('h-full rounded-full transition-all duration-500 ease-out', getBarColor())}
          style={{ width: `${Math.max(score, 4)}%` }}
        />
      </div>
      {showLabel && (
        <p className="text-[11px] text-slate-500 leading-normal pt-0.5">{quality.description}</p>
      )}
    </div>
  );
}

