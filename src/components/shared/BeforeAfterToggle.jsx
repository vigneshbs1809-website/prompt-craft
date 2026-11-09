import { useState } from 'react';
import { ArrowRight, Sparkles, XCircle, CheckCircle, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import CopyButton from './CopyButton';

export default function BeforeAfterToggle({
  before,
  after,
  beforeLabel = 'Weak / Naive Prompt',
  afterLabel = 'Guided / Effective Prompt',
  explanation,
  principle,
}) {
  const [activeTab, setActiveTab] = useState('split'); // 'before', 'after', or 'split'

  return (
    <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-xs">
      {/* Header Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 bg-slate-50/80 px-4 py-2.5">
        <div className="flex items-center gap-1.5 bg-slate-200/70 p-0.5 rounded-lg text-xs font-semibold">
          <button
            type="button"
            onClick={() => setActiveTab('split')}
            className={cn(
              'rounded-md px-2.5 py-1 transition-all',
              activeTab === 'split' ? 'bg-white text-slate-800 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            )}
          >
            Side-by-Side
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('before')}
            className={cn(
              'rounded-md px-2.5 py-1 transition-all',
              activeTab === 'before' ? 'bg-rose-100 text-rose-800' : 'text-slate-600 hover:text-slate-900'
            )}
          >
            Before Only
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('after')}
            className={cn(
              'rounded-md px-2.5 py-1 transition-all',
              activeTab === 'after' ? 'bg-emerald-100 text-emerald-800' : 'text-slate-600 hover:text-slate-900'
            )}
          >
            After Only
          </button>
        </div>

        {principle && (
          <span className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-[11px] font-semibold text-indigo-700 border border-indigo-200/60">
            {principle}
          </span>
        )}
      </div>

      {/* Content Area */}
      <div className="p-4">
        {activeTab === 'split' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Before Box */}
            <div className="rounded-lg border border-rose-200 bg-rose-50/40 p-3.5 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-rose-700">
                  <span className="flex items-center gap-1">
                    <XCircle className="h-3.5 w-3.5 text-rose-500" />
                    {beforeLabel}
                  </span>
                  <span className="text-[10px] uppercase tracking-wide bg-rose-100 text-rose-700 px-1.5 py-0.5 rounded">Vague</span>
                </div>
                <p className="font-mono text-xs text-rose-950 whitespace-pre-wrap leading-relaxed">{before}</p>
              </div>
              <div className="pt-3 flex justify-end">
                <CopyButton text={before} label="Copy Before" />
              </div>
            </div>

            {/* After Box */}
            <div className="rounded-lg border border-emerald-200 bg-emerald-50/40 p-3.5 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-emerald-700">
                  <span className="flex items-center gap-1">
                    <CheckCircle className="h-3.5 w-3.5 text-emerald-600" />
                    {afterLabel}
                  </span>
                  <span className="text-[10px] uppercase tracking-wide bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded">Structured</span>
                </div>
                <p className="font-mono text-xs text-emerald-950 whitespace-pre-wrap leading-relaxed">{after}</p>
              </div>
              <div className="pt-3 flex justify-end">
                <CopyButton text={after} variant="primary" label="Copy Improved" />
              </div>
            </div>
          </div>
        ) : activeTab === 'before' ? (
          <div className="rounded-lg border border-rose-200 bg-rose-50/50 p-4 space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-rose-700">
              <span className="flex items-center gap-1.5">
                <XCircle className="h-4 w-4 text-rose-500" />
                {beforeLabel}
              </span>
              <CopyButton text={before} />
            </div>
            <p className="font-mono text-xs text-rose-950 whitespace-pre-wrap leading-relaxed">{before}</p>
          </div>
        ) : (
          <div className="rounded-lg border border-emerald-200 bg-emerald-50/50 p-4 space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-emerald-700">
              <span className="flex items-center gap-1.5">
                <CheckCircle className="h-4 w-4 text-emerald-600" />
                {afterLabel}
              </span>
              <CopyButton text={after} variant="primary" />
            </div>
            <p className="font-mono text-xs text-emerald-950 whitespace-pre-wrap leading-relaxed">{after}</p>
          </div>
        )}

        {/* Educational Why It Works */}
        {explanation && (
          <div className="mt-4 rounded-lg bg-indigo-50/80 border border-indigo-100 p-3 text-xs leading-relaxed text-indigo-950">
            <div className="flex items-center gap-1.5 font-bold text-indigo-900 mb-1">
              <HelpCircle className="h-3.5 w-3.5 text-indigo-600" />
              <span>Learnability Note: Why This Matters</span>
            </div>
            <p>{explanation}</p>
          </div>
        )}
      </div>
    </div>
  );
}

