import { Sparkles, Heart, GraduationCap, Compass, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white mt-auto">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600 text-white">
                <Sparkles className="h-4 w-4" />
              </div>
              <span className="text-base font-bold text-slate-900">PromptCraft</span>
            </div>
            <p className="text-sm text-slate-600 max-w-md leading-relaxed">
              An intelligent, interactive prompt-guidance environment designed specifically for non-expert users of Generative AI. Grounded in Donald Norman's affordance theory, Nielsen's heuristics, and Vygotsky's scaffolded learnability.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-500 pt-1">
              <GraduationCap className="h-4 w-4 text-indigo-600" />
              <span>College Capstone / HCI Research Implementation</span>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-3">Core Modules</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><Link to="/builder" className="hover:text-indigo-600 transition-colors">Prompt Builder</Link></li>
              <li><Link to="/improver" className="hover:text-indigo-600 transition-colors">Prompt Improver</Link></li>
              <li><Link to="/templates" className="hover:text-indigo-600 transition-colors">Annotated Templates</Link></li>
              <li><Link to="/learn" className="hover:text-indigo-600 transition-colors">Learning Hub</Link></li>
              <li><Link to="/history" className="hover:text-indigo-600 transition-colors">Saved Prompts</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-3">HCI Principles</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li className="flex items-center gap-1.5"><Compass className="h-3.5 w-3.5 text-teal-600" /> Perceived Affordances</li>
              <li className="flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5 text-teal-600" /> Progressive Disclosure</li>
              <li className="flex items-center gap-1.5"><Heart className="h-3.5 w-3.5 text-teal-600" /> Explainable Feedback</li>
              <li className="text-xs text-slate-500 pt-2">System Usability Scale (SUS) benchmarked design</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <p>© 2026 PromptCraft Research Project. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with human-centered care for non-expert AI literacy.
          </p>
        </div>
      </div>
    </footer>
  );
}

