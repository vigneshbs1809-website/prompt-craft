import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LayoutTemplate,
  Search,
  BookOpen,
  Wand2,
  Check,
  Tag,
  Info,
  ChevronDown,
  ChevronUp,
  SlidersHorizontal,
  ExternalLink
} from 'lucide-react';
import PageContainer from '@/components/layout/PageContainer';
import CopyButton from '@/components/shared/CopyButton';
import templates from '@/data/templates';
import { CATEGORIES } from '@/utils/constants';
import { cn } from '@/lib/utils';
import { useApp } from '@/context/AppContext';

export default function TemplatesPage() {
  const navigate = useNavigate();
  const { notify } = useApp();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedTemplateId, setExpandedTemplateId] = useState(null);
  const [variableValues, setVariableValues] = useState({});

  // Filter templates
  const filteredTemplates = useMemo(() => {
    return templates.filter((tpl) => {
      const matchesCategory = selectedCategory === 'all' || tpl.category === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === '' ||
        tpl.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tpl.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tpl.template.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleVariableChange = (templateId, varKey, value) => {
    setVariableValues((prev) => ({
      ...prev,
      [templateId]: {
        ...(prev[templateId] || {}),
        [varKey]: value,
      },
    }));
  };

  const getCustomizedPrompt = (tpl) => {
    let result = tpl.template;
    const currentVars = variableValues[tpl.id] || {};
    for (const [key, defaultVal] of Object.entries(tpl.variables || {})) {
      const val = currentVars[key] || `{${key}}`;
      result = result.replaceAll(`{${key}}`, val);
    }
    return result;
  };

  return (
    <PageContainer className="space-y-8 pb-16">
      {/* Title */}
      <div className="border-b border-slate-200 pb-5">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-semibold text-indigo-700 mb-2">
          <LayoutTemplate className="h-3.5 w-3.5" />
          <span>Research-Backed Scaffolding</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Annotated Prompt Templates
        </h1>
        <p className="text-sm text-slate-600 mt-1 max-w-2xl">
          Pre-engineered templates with educational annotations. Rather than blank fill-ins, each variable explains <em>why</em> that parameter is included and how it steers model performance.
        </p>
      </div>

      {/* Controls: Search & Category Filter */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search templates by keyword, role, or task..."
              className="w-full rounded-xl border border-slate-300 bg-white pl-10 pr-4 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 shadow-2xs"
            />
          </div>

          <span className="text-xs text-slate-500 self-center">
            Showing <strong className="text-slate-800">{filteredTemplates.length}</strong> templates
          </span>
        </div>

        {/* Category Pills */}
        <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            className={cn(
              'rounded-lg px-3 py-1.5 text-xs font-semibold transition-all border cursor-pointer',
              selectedCategory === 'all'
                ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
            )}
          >
            All Categories
          </button>
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setSelectedCategory(c.id)}
              className={cn(
                'rounded-lg px-3 py-1.5 text-xs font-semibold whitespace-nowrap transition-all border cursor-pointer',
                selectedCategory === c.id
                  ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                  : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
              )}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Template Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {filteredTemplates.map((tpl) => {
          const isExpanded = expandedTemplateId === tpl.id;
          const customizedPrompt = getCustomizedPrompt(tpl);
          const currentVars = variableValues[tpl.id] || {};

          return (
            <div
              key={tpl.id}
              className="rounded-2xl border border-slate-200 bg-white shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col justify-between"
            >
              {/* Card Header */}
              <div className="p-5 border-b border-slate-100 space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-600">
                    {tpl.category}
                  </span>
                  <span
                    className={cn(
                      'rounded-full px-2 py-0.5 text-[10px] font-semibold capitalize',
                      tpl.difficulty === 'beginner' ? 'bg-emerald-100 text-emerald-800' : 'bg-indigo-100 text-indigo-800'
                    )}
                  >
                    {tpl.difficulty}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900">{tpl.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{tpl.description}</p>
              </div>

              {/* Template Body */}
              <div className="p-5 space-y-4">
                <div className="rounded-xl bg-slate-900 p-3.5 font-mono text-xs text-emerald-400 leading-relaxed overflow-x-auto">
                  {customizedPrompt}
                </div>

                {/* Inline Variable Editor */}
                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={() => setExpandedTemplateId(isExpanded ? null : tpl.id)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-800 cursor-pointer"
                  >
                    <SlidersHorizontal className="h-3.5 w-3.5" />
                    <span>{isExpanded ? 'Hide Variable Customizer' : 'Customize Template Variables'}</span>
                    {isExpanded ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
                  </button>

                  {isExpanded && (
                    <div className="rounded-xl border border-indigo-100 bg-indigo-50/40 p-4 space-y-3.5 animate-in fade-in">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-900 block">
                        Customize Placeholders
                      </span>

                      {Object.entries(tpl.variables || {}).map(([varKey, description]) => (
                        <div key={varKey} className="space-y-1">
                          <div className="flex items-center justify-between text-xs">
                            <label className="font-mono font-bold text-slate-700">{`{${varKey}}`}</label>
                            <span className="text-[10px] text-slate-500">{description}</span>
                          </div>
                          <input
                            type="text"
                            value={currentVars[varKey] || ''}
                            onChange={(e) => handleVariableChange(tpl.id, varKey, e.target.value)}
                            placeholder={`e.g. ${description}`}
                            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                          />
                          {tpl.annotations?.[varKey] && (
                            <p className="text-[10px] text-indigo-800 leading-tight">
                              💡 <strong>HCI Insight:</strong> {tpl.annotations[varKey]}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="border-t border-slate-100 bg-slate-50/70 p-3.5 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => {
                    navigate('/builder');
                    notify(`Loaded ${tpl.title} context into builder`, 'info');
                  }}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <Wand2 className="h-3.5 w-3.5 text-indigo-600" />
                  <span>Open in Builder</span>
                </button>

                <CopyButton text={customizedPrompt} variant="primary" label="Copy Customized" />
              </div>
            </div>
          );
        })}
      </div>
    </PageContainer>
  );
}

