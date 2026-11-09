import { Link, useLocation } from 'react-router-dom';
import { Sparkles, Menu, X, Wand2, BookOpen, LayoutTemplate, History, HelpCircle } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { isAIPowered } from '@/services/ai/aiService';

const navLinks = [
  { path: '/', label: 'Home', icon: Sparkles },
  { path: '/builder', label: 'Prompt Builder', icon: Wand2 },
  { path: '/improver', label: 'Prompt Improver', icon: Sparkles },
  { path: '/templates', label: 'Templates', icon: LayoutTemplate },
  { path: '/learn', label: 'Learning Hub', icon: BookOpen },
  { path: '/history', label: 'History', icon: History },
];

export default function Header() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const aiActive = isAIPowered();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo & Tagline */}
        <Link to="/" className="flex items-center gap-3 transition-opacity hover:opacity-90">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-teal-400 shadow-md shadow-indigo-500/20">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold tracking-tight text-slate-900">PromptCraft</span>
              <span className="rounded-full bg-indigo-50 px-2 py-0.5 text-[10px] font-semibold text-indigo-700 border border-indigo-200/60">
                HCI v1.0
              </span>
            </div>
            <span className="text-xs text-slate-500 font-medium hidden sm:inline">Human-Centric Prompt Guidance</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1.5 md:flex">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  'flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-150',
                  isActive
                    ? 'bg-indigo-50 text-indigo-700 shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                )}
              >
                <Icon className={cn('h-4 w-4', isActive ? 'text-indigo-600' : 'text-slate-400')} />
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Status Badge & Actions */}
        <div className="hidden lg:flex items-center gap-3">
          <div className="flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 border border-slate-200">
            <span className={cn('h-2 w-2 rounded-full', aiActive ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500')} />
            <span>{aiActive ? 'Gemini Live' : 'Rule-Engine (Offline)'}</span>
          </div>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 md:hidden"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="border-t border-slate-200 bg-white px-4 py-3 md:hidden shadow-lg animate-in slide-in-from-top-2">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3.5 py-2.5 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-indigo-50 text-indigo-700 font-semibold'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  )}
                >
                  <Icon className={cn('h-4 w-4', isActive ? 'text-indigo-600' : 'text-slate-400')} />
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}

