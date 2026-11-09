import { useState } from 'react';
import {
  BookOpen,
  Puzzle,
  AlertTriangle,
  Layers,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Lightbulb,
  ExternalLink
} from 'lucide-react';
import PageContainer from '@/components/layout/PageContainer';
import BeforeAfterToggle from '@/components/shared/BeforeAfterToggle';
import CopyButton from '@/components/shared/CopyButton';
import TipCard from '@/components/shared/TipCard';
import learningContent from '@/data/learningContent';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

const tabs = [
  { id: 'anatomy', label: 'Prompt Anatomy', icon: Puzzle },
  { id: 'mistakes', label: 'Common Mistakes', icon: AlertTriangle },
  { id: 'patterns', label: 'Academic Patterns', icon: Layers },
  { id: 'tips', label: 'Quick Rules', icon: Sparkles },
];

export default function LearningHubPage() {
  const [activeTab, setActiveTab] = useState('anatomy');

  const { promptAnatomy, commonMistakes, promptPatterns, tips } = learningContent;

  return (
    <PageContainer className="space-y-8 pb-16">
      {/* Title */}
      <div className="border-b border-slate-200 pb-5">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-semibold text-amber-800 mb-2">
          <BookOpen className="h-3.5 w-3.5" />
          <span>AI Literacy & Scaffolded Learning</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Interactive Learning Hub
        </h1>
        <p className="text-sm text-slate-600 mt-1 max-w-2xl">
          Move from trial-and-error prompting to systematic prompt engineering. Grounded in peer-reviewed HCI literature (Vanderbilt, CHI 2023).
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 gap-2 overflow-x-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-semibold transition-all whitespace-nowrap cursor-pointer',
                isActive
                  ? 'border-indigo-600 text-indigo-700 bg-indigo-50/50'
                  : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
              )}
            >
              <Icon className={cn('h-4 w-4', isActive ? 'text-indigo-600' : 'text-slate-400')} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: PROMPT ANATOMY */}
      {activeTab === 'anatomy' && (
        <div className="space-y-6 animate-in fade-in">
          <div className="max-w-2xl space-y-1">
            <h2 className="text-lg font-bold text-slate-900">{promptAnatomy.title}</h2>
            <p className="text-xs text-slate-600">{promptAnatomy.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {promptAnatomy.sections.map((section, idx) => (
              <div
                key={section.id}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-3.5 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-indigo-50 px-2 py-0.5 text-[10px] font-bold text-indigo-700">
                      Block #{idx + 1}
                    </span>
                    <span className="text-xs font-semibold text-slate-400">{section.pattern}</span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900">{section.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{section.explanation}</p>
                </div>

                {/* Example box */}
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <div className="rounded-lg bg-rose-50/60 p-2.5 text-xs text-rose-900 space-y-0.5">
                    <span className="text-[10px] font-bold uppercase text-rose-700 block">Naive:</span>
                    <p className="font-mono text-[11px]">{section.example.bad}</p>
                  </div>

                  <div className="rounded-lg bg-emerald-50/60 p-2.5 text-xs text-emerald-900 space-y-0.5">
                    <span className="text-[10px] font-bold uppercase text-emerald-700 block">Structured:</span>
                    <p className="font-mono text-[11px]">{section.example.good}</p>
                  </div>

                  <p className="text-[11px] text-slate-500 pt-1 italic">
                    💡 {section.example.improvement}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: COMMON MISTAKES */}
      {activeTab === 'mistakes' && (
        <div className="space-y-6 animate-in fade-in">
          <div className="max-w-2xl space-y-1">
            <h2 className="text-lg font-bold text-slate-900">{commonMistakes.title}</h2>
            <p className="text-xs text-slate-600">{commonMistakes.description}</p>
          </div>

          <div className="space-y-6">
            {commonMistakes.mistakes.map((m) => (
              <div key={m.id} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-slate-100 pb-3">
                  <div>
                    <h3 className="text-base font-bold text-slate-900">{m.title}</h3>
                    <p className="text-xs text-slate-600 mt-0.5">{m.description}</p>
                  </div>
                  <span className="self-start sm:self-center rounded-full bg-rose-100 px-2.5 py-0.5 text-xs font-bold text-rose-800">
                    Avoid
                  </span>
                </div>

                <BeforeAfterToggle
                  before={m.before}
                  after={m.after}
                  explanation={m.fix}
                  principle="Correction Technique"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: PROMPT PATTERNS */}
      {activeTab === 'patterns' && (
        <div className="space-y-6 animate-in fade-in">
          <div className="max-w-2xl space-y-1">
            <h2 className="text-lg font-bold text-slate-900">{promptPatterns.title}</h2>
            <p className="text-xs text-slate-600">{promptPatterns.description}</p>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {promptPatterns.patterns.map((p) => (
              <div
                key={p.id}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div className="space-y-1">
                    <div className="inline-flex items-center gap-2">
                      <span className="rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-bold text-indigo-800">
                        Pattern
                      </span>
                      <h3 className="text-base font-bold text-slate-900">{p.name}</h3>
                    </div>
                    <p className="text-xs text-slate-600">{p.description}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Structure Syntax */}
                  <div className="space-y-1.5">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                      Standard Formula
                    </span>
                    <div className="rounded-xl bg-slate-900 p-3 font-mono text-xs text-emerald-400">
                      {p.structure}
                    </div>
                  </div>

                  {/* Concrete Example */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                        Real-World Application
                      </span>
                      <CopyButton text={p.example} />
                    </div>
                    <div className="rounded-xl bg-slate-50 border border-slate-200 p-3 font-mono text-xs text-slate-800 leading-relaxed">
                      {p.example}
                    </div>
                  </div>
                </div>

                {/* Why it works */}
                <div className="rounded-xl bg-indigo-50/70 border border-indigo-100 p-3 text-xs text-indigo-950 space-y-1">
                  <span className="font-bold flex items-center gap-1.5 text-indigo-900">
                    <Lightbulb className="h-3.5 w-3.5 text-indigo-600" />
                    HCI Cognitive Rationale:
                  </span>
                  <p className="leading-relaxed">{p.whyItWorks}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: QUICK RULES */}
      {activeTab === 'tips' && (
        <div className="space-y-6 animate-in fade-in">
          <div className="max-w-2xl space-y-1">
            <h2 className="text-lg font-bold text-slate-900">{tips.title}</h2>
            <p className="text-xs text-slate-600">{tips.description}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {tips.items.map((item, idx) => (
              <div
                key={item.id}
                className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs hover:border-indigo-200 transition-all space-y-2 flex flex-col justify-between"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                      Rule #{idx + 1}
                    </span>
                    <span className="text-[10px] font-semibold text-slate-400 capitalize">
                      {item.category}
                    </span>
                  </div>
                  <p className="text-xs text-slate-800 leading-relaxed">{item.tip}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </PageContainer>
  );
}

