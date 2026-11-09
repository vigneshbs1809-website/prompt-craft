import { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
  HelpCircle,
  Lightbulb,
  Cpu,
  Layers,
  Save,
  Check,
  TrendingUp,
  FileQuestion
} from 'lucide-react';
import PageContainer from '@/components/layout/PageContainer';
import CopyButton from '@/components/shared/CopyButton';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import TipCard from '@/components/shared/TipCard';
import QualityIndicator from '@/components/shared/QualityIndicator';
import { useAIService } from '@/hooks/useAIService';
import { analyzePromptWithRules } from '@/services/ai/ruleEngine';
import { useApp } from '@/context/AppContext';
import { cn } from '@/lib/utils';

const sampleWeakPrompts = [
  { label: 'Marketing Email', text: 'Write an email about our new product.' },
  { label: 'Python Code', text: 'Write python code to sort list.' },
  { label: 'Study Aid', text: 'Explain gravity.' },
  { label: 'Blog Post', text: 'Write a blog post about artificial intelligence.' },
  { label: 'Job Search', text: 'Help me with my resume for software jobs.' },
];

export default function ImproverPage() {
  const { addToHistory, notify } = useApp();
  const [inputPrompt, setInputPrompt] = useState('');
  const { result, isLoading, error, aiMode, improve, reset } = useAIService();
  const [saved, setSaved] = useState(false);

  // Quality of original vs improved
  const originalAnalysis = inputPrompt ? analyzePromptWithRules(inputPrompt) : null;
  const improvedAnalysis = result?.improved ? analyzePromptWithRules(result.improved) : null;

  const handleImprove = (e) => {
    e?.preventDefault();
    if (!inputPrompt.trim()) return;
    improve(inputPrompt);
  };

  const handleSaveImproved = () => {
    if (!result?.improved) return;
    addToHistory({
      prompt: result.improved,
      originalPrompt: inputPrompt,
      category: 'improver',
      score: improvedAnalysis?.score || 80,
      source: 'Improver',
    });
    setSaved(true);
    notify('Improved prompt saved to your history!', 'success');
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <PageContainer className="space-y-8 pb-16">
      {/* Page Title */}
      <div className="border-b border-slate-200 pb-5">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-teal-50 px-2.5 py-0.5 text-xs font-semibold text-teal-700 mb-2">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Explainable AI (XAI) Optimization</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Intelligent Prompt Improver
        </h1>
        <p className="text-sm text-slate-600 mt-1 max-w-2xl">
          Paste any rough, unrefined prompt below. Our dual-engine analyzes deficiencies, adds structural dimensions, and explains <em>why</em> each change makes your prompt more effective.
        </p>
      </div>

      {/* Main Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Input Column */}
        <div className="lg:col-span-6 space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <label htmlFor="prompt-input" className="text-sm font-bold text-slate-900">
                Your Starting Prompt
              </label>

              {inputPrompt && (
                <button
                  type="button"
                  onClick={() => {
                    setInputPrompt('');
                    reset();
                  }}
                  className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-rose-600 cursor-pointer"
                >
                  <RotateCcw className="h-3 w-3" />
                  <span>Clear</span>
                </button>
              )}
            </div>

            <textarea
              id="prompt-input"
              value={inputPrompt}
              onChange={(e) => setInputPrompt(e.target.value)}
              placeholder="e.g. Write a marketing email for my bakery app..."
              rows={5}
              className="w-full rounded-xl border border-slate-300 p-3.5 text-xs font-mono text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 shadow-2xs resize-y"
            />

            {/* Quick Sample Prompts */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-semibold text-slate-500">Or try a weak sample prompt:</span>
              <div className="flex flex-wrap gap-1.5">
                {sampleWeakPrompts.map((sample) => (
                  <button
                    key={sample.label}
                    type="button"
                    onClick={() => {
                      setInputPrompt(sample.text);
                      reset();
                    }}
                    className="rounded-lg bg-slate-100 hover:bg-slate-200 px-2.5 py-1 text-[11px] font-medium text-slate-700 transition-colors cursor-pointer border border-slate-200"
                  >
                    {sample.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Quality of Original */}
            {originalAnalysis && inputPrompt.trim().length > 0 && (
              <div className="rounded-xl bg-slate-50 border border-slate-200/80 p-3 space-y-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  Initial Quality Baseline
                </span>
                <QualityIndicator score={originalAnalysis.score} size="sm" />
              </div>
            )}

            {/* Action Button */}
            <button
              type="button"
              onClick={handleImprove}
              disabled={isLoading || !inputPrompt.trim()}
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {isLoading ? (
                <>
                  <LoadingSpinner size="sm" />
                  <span>Analyzing & Reconstructing...</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  <span>Improve Prompt & Explain Why</span>
                </>
              )}
            </button>
          </div>

          <TipCard
            title="The 'Illusion of Natural Language' Trap"
            content="Research (Zamfirescu-Pereira et al., CHI 2023) shows novices write prompts as if talking to a human colleague who shares implicit background assumptions. Generative models possess no context until you explicitly define boundaries, formats, and intent."
            variant="default"
          />
        </div>

        {/* Output Column: Results & Itemized Explanations */}
        <div className="lg:col-span-6 space-y-6">
          {error && (
            <div className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-xs text-rose-900">
              <span className="font-bold">Error:</span> {error}
            </div>
          )}

          {isLoading && (
            <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-xs space-y-3">
              <LoadingSpinner size="lg" />
              <h4 className="text-sm font-semibold text-slate-800">Synthesizing Prompt Architecture...</h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Applying Persona patterns, constraint bounds, and formatting structures based on HCI guidelines.
              </p>
            </div>
          )}

          {!isLoading && !result && (
            <div className="rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/50 p-12 text-center space-y-3">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-400">
                <FileQuestion className="h-6 w-6" />
              </div>
              <h4 className="text-sm font-semibold text-slate-700">No Improvement Requested Yet</h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Type or select a prompt on the left and click "Improve Prompt & Explain Why" to see the upgraded version with itemized learning notes.
              </p>
            </div>
          )}

          {result?.improved && (
            <div className="space-y-6 animate-in fade-in">
              {/* Upgraded Prompt Card */}
              <div className="rounded-2xl border border-teal-200 bg-white shadow-xs overflow-hidden">
                <div className="flex items-center justify-between border-b border-teal-100 bg-teal-50/80 px-4 py-2.5">
                  <div className="flex items-center gap-2">
                    <span className="flex h-2 w-2 rounded-full bg-teal-500 animate-pulse" />
                    <h3 className="text-xs font-bold uppercase tracking-wider text-teal-900">
                      Optimized Prompt
                    </h3>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleSaveImproved}
                      className={cn(
                        'inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-semibold transition-all border cursor-pointer',
                        saved
                          ? 'border-emerald-300 bg-emerald-50 text-emerald-700'
                          : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                      )}
                    >
                      {saved ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Save className="h-3.5 w-3.5" />}
                      <span>{saved ? 'Saved' : 'Save'}</span>
                    </button>
                    <CopyButton text={result.improved} variant="primary" label="Copy Improved" />
                  </div>
                </div>

                <div className="p-4">
                  <div className="rounded-xl bg-slate-900 p-4 font-mono text-xs text-teal-300 leading-relaxed overflow-x-auto">
                    {result.improved}
                  </div>
                </div>

                {/* Score Comparison */}
                {improvedAnalysis && originalAnalysis && (
                  <div className="border-t border-slate-100 bg-slate-50/60 px-4 py-3 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 text-slate-600">
                      <TrendingUp className="h-4 w-4 text-emerald-600" />
                      <span>Quality Rating Gain:</span>
                    </div>
                    <div className="flex items-center gap-2 font-mono font-bold">
                      <span className="text-slate-400 line-through">{originalAnalysis.score}%</span>
                      <ArrowRight className="h-3 w-3 text-emerald-500" />
                      <span className="text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-200">
                        {improvedAnalysis.score}%
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Itemized Educational Breakdown */}
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                  <div className="flex items-center gap-1.5">
                    <HelpCircle className="h-4 w-4 text-indigo-600" />
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                      Explainable Breakdown: Why Each Change Matters
                    </h4>
                  </div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200/50">
                    {result.changes?.length || 0} Improvements
                  </span>
                </div>

                {result.overallExplanation && (
                  <p className="text-xs text-slate-600 italic bg-slate-50 p-3 rounded-lg border border-slate-100">
                    "{result.overallExplanation}"
                  </p>
                )}

                <div className="space-y-3">
                  {result.changes?.map((ch, idx) => (
                    <div key={idx} className="rounded-xl border border-slate-200 bg-slate-50/50 p-3.5 space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-800 flex items-center gap-1.5">
                          <CheckCircle2 className="h-3.5 w-3.5 text-teal-600" />
                          <span>Change #{idx + 1}</span>
                        </span>
                        {ch.principle && (
                          <span className="rounded-full bg-indigo-100 text-indigo-800 px-2 py-0.5 text-[10px] font-bold">
                            {ch.principle}
                          </span>
                        )}
                      </div>

                      <div className="rounded-lg bg-white p-2.5 border border-slate-200 font-mono text-[11px] text-slate-700">
                        {ch.improved}
                      </div>

                      <p className="text-slate-600 leading-relaxed text-[11px] pt-1">
                        <span className="font-semibold text-slate-900">Why this helps: </span>
                        {ch.reason}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </PageContainer>
  );
}

