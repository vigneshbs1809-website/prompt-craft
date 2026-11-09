import CopyButton from './CopyButton';
import { cn } from '@/lib/utils';
import { FileText, Save, Check, Sparkles, ExternalLink } from 'lucide-react';
import { useState } from 'react';
import { useApp } from '@/context/AppContext';

export default function PromptPreview({
  prompt,
  title = 'Live Prompt Output',
  className,
  showCopy = true,
  category = 'general',
  score = null,
}) {
  const { addToHistory, notify } = useApp();
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    if (!prompt || prompt.trim().length === 0) return;
    addToHistory({
      prompt,
      category,
      score: score || 0,
      source: 'Builder',
    });
    setSaved(true);
    notify('Prompt saved to your local history!', 'success');
    setTimeout(() => setSaved(false), 2000);
  };

  if (!prompt || prompt.trim().length === 0) {
    return (
      <div className={cn('rounded-xl border-2 border-dashed border-slate-200 bg-slate-50/50 p-8 text-center', className)}>
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-400">
          <FileText className="h-6 w-6" />
        </div>
        <h4 className="mt-3 text-sm font-semibold text-slate-700">Your Prompt Appears Here in Real-Time</h4>
        <p className="mt-1 text-xs text-slate-500 max-w-sm mx-auto">
          As you fill in the guided fields on the left, this panel synthesizes an engineered, context-rich prompt.
        </p>
      </div>
    );
  }

  const wordCount = prompt.trim().split(/\s+/).length;
  const charCount = prompt.length;

  return (
    <div className={cn('rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden flex flex-col', className)}>
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 bg-slate-50/70 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">{title}</h3>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleSave}
            className={cn(
              'inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-semibold transition-all border cursor-pointer',
              saved
                ? 'border-emerald-300 bg-emerald-50 text-emerald-700'
                : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
            )}
            title="Save to local history"
          >
            {saved ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Save className="h-3.5 w-3.5" />}
            <span>{saved ? 'Saved' : 'Save'}</span>
          </button>
          {showCopy && <CopyButton text={prompt} variant="primary" />}
        </div>
      </div>

      {/* Prompt Body */}
      <div className="p-4 flex-1">
        <div className="rounded-lg bg-slate-900 p-4 font-mono text-xs text-emerald-400 leading-relaxed overflow-x-auto selection:bg-indigo-500 selection:text-white">
          <p className="whitespace-pre-wrap">{prompt}</p>
        </div>
      </div>

      {/* Meta Footer */}
      <div className="border-t border-slate-100 bg-slate-50/60 px-4 py-2 flex items-center justify-between text-[11px] text-slate-500 font-mono">
        <div className="flex items-center gap-3">
          <span>{wordCount} words</span>
          <span>•</span>
          <span>{charCount} characters</span>
        </div>
        <span className="text-slate-400">Ready to paste into ChatGPT, Claude, or Gemini</span>
      </div>
    </div>
  );
}

