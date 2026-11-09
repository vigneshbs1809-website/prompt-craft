import { useState, useEffect } from 'react';
import {
  Wand2,
  RotateCcw,
  Sliders,
  Sparkles,
  Info,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Lightbulb,
  ArrowRight,
  Code,
  PenLine,
  GraduationCap,
  Search,
  Palette,
  Briefcase
} from 'lucide-react';
import PageContainer from '@/components/layout/PageContainer';
import PromptPreview from '@/components/shared/PromptPreview';
import QualityIndicator from '@/components/shared/QualityIndicator';
import TipCard from '@/components/shared/TipCard';
import { usePromptBuilder } from '@/hooks/usePromptBuilder';
import { usePromptAnalysis } from '@/hooks/usePromptAnalysis';
import { categoryFields } from '@/data/categories';
import { CATEGORIES } from '@/utils/constants';
import { cn } from '@/lib/utils';
import { useApp } from '@/context/AppContext';

export default function BuilderPage() {
  const { notify } = useApp();
  const {
    category,
    fields,
    isDetailedMode,
    assembledPrompt,
    completion,
    setCategory,
    updateField,
    resetFields,
    toggleMode,
  } = usePromptBuilder('writing');

  const { analysis, isAnalyzing, analyze } = usePromptAnalysis();
  const [activeHint, setActiveHint] = useState(null);

  // Analyze prompt in real time whenever it changes
  useEffect(() => {
    analyze(assembledPrompt);
  }, [assembledPrompt, analyze]);

  const currentCategoryConfig = categoryFields[category] || { fields: [] };
  const allFields = currentCategoryConfig.fields;
  // If in quick mode, show only the first 3 essential fields; otherwise show all
  const displayedFields = isDetailedMode ? allFields : allFields.slice(0, 3);

  const categoryIcons = {
    writing: PenLine,
    coding: Code,
    education: GraduationCap,
    research: Search,
    creative: Palette,
    business: Briefcase,
    brainstorm: Lightbulb,
  };

  return (
    <PageContainer className="space-y-8 pb-16">
      {/* Page Title & Intro */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-semibold text-indigo-700 mb-2">
            <Wand2 className="h-3.5 w-3.5" />
            <span>Interactive Scaffolding</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Guided Prompt Builder
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Construct high-precision prompts by answering intuitive questions. Guided signifiers ensure you supply role, context, constraints, and output formats.
          </p>
        </div>

        {/* Quick vs Detailed Mode Toggle */}
        <div className="flex items-center gap-2 self-start sm:self-center bg-slate-100 p-1 rounded-xl border border-slate-200">
          <button
            type="button"
            onClick={toggleMode}
            className={cn(
              'inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer',
              !isDetailedMode ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            )}
          >
            <span>Quick Mode</span>
            <span className="text-[10px] bg-slate-200 px-1.5 py-0.2 rounded text-slate-600">3 fields</span>
          </button>
          <button
            type="button"
            onClick={toggleMode}
            className={cn(
              'inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer',
              isDetailedMode ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            )}
          >
            <Sliders className="h-3 w-3" />
            <span>Detailed Mode</span>
            <span className="text-[10px] bg-indigo-500/40 px-1.5 py-0.2 rounded text-white">Full</span>
          </button>
        </div>
      </div>

      {/* Category Selection Tabs */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Step 1: Choose Your Domain or Task
        </label>
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
          {CATEGORIES.map((cat) => {
            const Icon = categoryIcons[cat.id] || Sparkles;
            const isSelected = category === cat.id;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setCategory(cat.id)}
                className={cn(
                  'flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold whitespace-nowrap transition-all border cursor-pointer',
                  isSelected
                    ? 'border-indigo-600 bg-indigo-50/80 text-indigo-700 shadow-xs ring-2 ring-indigo-500/20'
                    : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:border-slate-300'
                )}
              >
                <Icon className={cn('h-4 w-4', isSelected ? 'text-indigo-600' : 'text-slate-400')} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Two Column Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Input Scaffolding Form */}
        <div className="lg:col-span-7 space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Step 2: Fill In Guided Fields</h3>
                <p className="text-xs text-slate-500">
                  {completion.filled} of {displayedFields.length} fields provided
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  resetFields();
                  notify('Cleared all builder fields', 'info');
                }}
                className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-rose-600 transition-colors cursor-pointer"
                title="Reset form"
              >
                <RotateCcw className="h-3 w-3" />
                <span>Clear All</span>
              </button>
            </div>

            {/* Form Fields */}
            <div className="space-y-4">
              {displayedFields.map((f) => {
                const value = fields[f.id] || '';
                const isHintOpen = activeHint === f.id;

                return (
                  <div key={f.id} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <label htmlFor={f.id} className="font-semibold text-slate-700 flex items-center gap-1.5">
                        <span>{f.label}</span>
                        {f.required && (
                          <span className="text-rose-500 text-xs" title="Recommended for minimum quality">*</span>
                        )}
                      </label>

                      {f.hint && (
                        <button
                          type="button"
                          onClick={() => setActiveHint(isHintOpen ? null : f.id)}
                          className="inline-flex items-center gap-1 text-[11px] text-indigo-600 hover:text-indigo-800 cursor-pointer font-medium"
                        >
                          <Info className="h-3 w-3" />
                          <span>Why this matters</span>
                        </button>
                      )}
                    </div>

                    {isHintOpen && (
                      <div className="rounded-lg bg-indigo-50/70 border border-indigo-100 p-2.5 text-xs text-indigo-900 leading-relaxed animate-in fade-in">
                        <p>{f.hint}</p>
                      </div>
                    )}

                    <input
                      id={f.id}
                      type="text"
                      value={value}
                      onChange={(e) => updateField(f.id, e.target.value)}
                      placeholder={f.placeholder}
                      className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all shadow-2xs"
                    />
                  </div>
                );
              })}
            </div>

            {/* Quick-to-detailed toggle prompt */}
            {!isDetailedMode && (
              <div className="pt-2 text-center">
                <button
                  type="button"
                  onClick={toggleMode}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-800 cursor-pointer"
                >
                  <span>Need more control? Switch to Detailed Mode (+{allFields.length - 3} fields)</span>
                  <ChevronDown className="h-3.5 w-3.5" />
                </button>
              </div>
            )}
          </div>

          {/* Educational Tip */}
          <TipCard
            title="The Persona + Task Metaphor"
            content="Specifying the subject and audience immediately frames the generative model's internal temperature and vocabulary, producing responses with up to 40% higher relevance compared to vague one-liners."
            variant="info"
          />
        </div>

        {/* Right Column: Live Output & Real-Time Analysis */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-20">
          {/* Live Preview Card */}
          <PromptPreview
            prompt={assembledPrompt}
            category={category}
            score={analysis?.score}
          />

          {/* Quality Analysis Card */}
          {assembledPrompt && (
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                <div className="flex items-center gap-1.5">
                  <Sparkles className="h-4 w-4 text-indigo-600" />
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                    Prompt Quality Analysis
                  </h4>
                </div>
                <span className="text-[10px] text-slate-400 font-mono">
                  {isAnalyzing ? 'Analyzing...' : 'Real-Time'}
                </span>
              </div>

              {/* Overall Score */}
              <QualityIndicator score={analysis?.score || 0} />

              {/* Dimension Breakdown */}
              {analysis?.dimensions && (
                <div className="space-y-2.5 pt-2 border-t border-slate-100">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    Quality Dimensions
                  </span>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {Object.entries(analysis.dimensions).map(([dim, score]) => (
                      <div key={dim} className="rounded-lg bg-slate-50 p-2 border border-slate-100">
                        <div className="flex justify-between text-[11px] font-semibold text-slate-600 capitalize">
                          <span>{dim}</span>
                          <span className="font-mono text-indigo-600">{score}%</span>
                        </div>
                        <div className="mt-1 h-1 w-full bg-slate-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-indigo-500 rounded-full transition-all duration-300"
                            style={{ width: `${score}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Actionable suggestions */}
              {analysis?.suggestions && analysis.suggestions.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    Suggested Next Steps
                  </span>
                  <div className="space-y-1.5 max-h-48 overflow-y-auto">
                    {analysis.suggestions.slice(0, 2).map((s, idx) => (
                      <div key={idx} className="rounded-lg bg-amber-50/70 border border-amber-200/60 p-2 text-xs text-amber-950">
                        <span className="font-semibold text-amber-900 block">{s.issue}</span>
                        <span className="text-[11px] text-amber-800 mt-0.5 block">{s.suggestion}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </PageContainer>
  );
}

