import { useState } from 'react';
import {
  History,
  Trash2,
  Download,
  Copy,
  Check,
  Sparkles,
  Wand2,
  FileText,
  AlertCircle
} from 'lucide-react';
import PageContainer from '@/components/layout/PageContainer';
import CopyButton from '@/components/shared/CopyButton';
import QualityIndicator from '@/components/shared/QualityIndicator';
import { useApp } from '@/context/AppContext';
import { exportHistory } from '@/services/storageService';
import { cn } from '@/lib/utils';

export default function HistoryPage() {
  const { state, removeFromHistory, clearAllHistory, notify } = useApp();
  const history = state.history || [];
  const [filter, setFilter] = useState('all');

  const filteredHistory = history.filter((item) => {
    if (filter === 'all') return true;
    if (filter === 'builder') return item.source === 'Builder';
    if (filter === 'improver') return item.source === 'Improver';
    return true;
  });

  const handleExport = () => {
    if (history.length === 0) return;
    const jsonStr = exportHistory();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `promptcraft-history-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    notify('Exported history as JSON file!', 'success');
  };

  const handleClear = () => {
    if (window.confirm('Are you sure you want to clear your entire prompt history? This cannot be undone.')) {
      clearAllHistory();
      notify('Cleared all prompt history', 'info');
    }
  };

  return (
    <PageContainer className="space-y-8 pb-16">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-700 mb-2">
            <History className="h-3.5 w-3.5" />
            <span>Local Activity & Continuity</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Prompt History & Saved Library
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Review, copy, and export prompts you created with the builder or improver. Stored securely in your local browser sandbox.
          </p>
        </div>

        {/* Global Actions */}
        {history.length > 0 && (
          <div className="flex items-center gap-2 self-start sm:self-center">
            <button
              type="button"
              onClick={handleExport}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-all cursor-pointer shadow-2xs"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Export JSON</span>
            </button>
            <button
              type="button"
              onClick={handleClear}
              className="inline-flex items-center gap-1.5 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-700 hover:bg-rose-100 transition-all cursor-pointer shadow-2xs"
            >
              <Trash2 className="h-3.5 w-3.5" />
              <span>Clear All</span>
            </button>
          </div>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-2">
        <div className="flex gap-2 text-xs font-semibold">
          <button
            type="button"
            onClick={() => setFilter('all')}
            className={cn(
              'rounded-lg px-3 py-1.5 transition-colors cursor-pointer',
              filter === 'all' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-500 hover:text-slate-900'
            )}
          >
            All ({history.length})
          </button>
          <button
            type="button"
            onClick={() => setFilter('builder')}
            className={cn(
              'rounded-lg px-3 py-1.5 transition-colors cursor-pointer',
              filter === 'builder' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-500 hover:text-slate-900'
            )}
          >
            Builder ({history.filter((h) => h.source === 'Builder').length})
          </button>
          <button
            type="button"
            onClick={() => setFilter('improver')}
            className={cn(
              'rounded-lg px-3 py-1.5 transition-colors cursor-pointer',
              filter === 'improver' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-500 hover:text-slate-900'
            )}
          >
            Improver ({history.filter((h) => h.source === 'Improver').length})
          </button>
        </div>
      </div>

      {/* List */}
      {filteredHistory.length === 0 ? (
        <div className="rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/50 p-12 text-center space-y-3">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-400">
            <FileText className="h-6 w-6" />
          </div>
          <h4 className="text-sm font-semibold text-slate-700">No Prompts in History</h4>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Prompts you construct in the Guided Builder or optimize in the Prompt Improver can be saved here for quick recall.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredHistory.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-3 transition-all hover:border-slate-300"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
                <div className="flex items-center gap-2 text-xs">
                  <span
                    className={cn(
                      'rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider',
                      item.source === 'Builder'
                        ? 'bg-indigo-50 text-indigo-700 border border-indigo-200/50'
                        : 'bg-teal-50 text-teal-700 border border-teal-200/50'
                    )}
                  >
                    {item.source || 'Builder'}
                  </span>
                  <span className="text-slate-400 font-mono text-[11px]">
                    {new Date(item.timestamp).toLocaleString(undefined, {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                  {item.category && (
                    <span className="text-[11px] font-semibold text-slate-500 capitalize">
                      • {item.category}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <CopyButton text={item.prompt} />
                  <button
                    type="button"
                    onClick={() => {
                      removeFromHistory(item.id);
                      notify('Removed item from history', 'info');
                    }}
                    className="p-1.5 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                    title="Delete item"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              {/* Original prompt reference if improver */}
              {item.originalPrompt && (
                <div className="rounded-lg bg-slate-50 p-2 text-xs text-slate-600 border border-slate-100 font-mono text-[11px]">
                  <span className="font-bold text-slate-500 block text-[10px] uppercase font-sans">
                    Original Input:
                  </span>
                  {item.originalPrompt}
                </div>
              )}

              {/* Main Prompt */}
              <div className="rounded-xl bg-slate-900 p-3.5 font-mono text-xs text-emerald-400 leading-relaxed overflow-x-auto">
                {item.prompt}
              </div>

              {/* Quality score if available */}
              {item.score > 0 && (
                <div className="pt-1 max-w-xs">
                  <QualityIndicator score={item.score} size="sm" showLabel={false} />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </PageContainer>
  );
}

