import { Link } from 'react-router-dom';
import {
  Sparkles,
  Wand2,
  BookOpen,
  LayoutTemplate,
  History,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Compass,
  Lightbulb,
  Cpu,
  Layers,
  GraduationCap,
  Award
} from 'lucide-react';
import PageContainer from '@/components/layout/PageContainer';
import BeforeAfterToggle from '@/components/shared/BeforeAfterToggle';

export default function HomePage() {
  return (
    <div className="space-y-16 pb-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-indigo-50/70 via-white to-white pt-10 pb-12 border-b border-slate-100">
        <PageContainer className="relative">
          <div className="mx-auto max-w-3xl text-center space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-indigo-100/80 px-3.5 py-1 text-xs font-semibold text-indigo-800 border border-indigo-200/60 shadow-xs">
              <Sparkles className="h-3.5 w-3.5 text-indigo-600" />
              <span>Human-Centric Computing & AI Accessibility</span>
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl leading-[1.15]">
              Communicate with AI{' '}
              <span className="bg-gradient-to-r from-indigo-600 via-indigo-500 to-teal-500 bg-clip-text text-transparent">
                Confidently & Clearly
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
              You shouldn't need a computer science degree to get great results from Generative AI. PromptCraft transforms vague thoughts into high-performing prompts while teaching you <em>why</em> each structure works.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <Link
                to="/builder"
                className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 transition-all hover:shadow-md cursor-pointer"
              >
                <Wand2 className="h-4 w-4" />
                <span>Start Guided Builder</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/improver"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-xs hover:bg-slate-50 transition-all cursor-pointer"
              >
                <Sparkles className="h-4 w-4 text-indigo-600" />
                <span>Improve Existing Prompt</span>
              </Link>
            </div>

            {/* Quick Stats/Trust badges */}
            <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left border-t border-slate-200/60 mt-8">
              <div className="space-y-0.5">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Paradigm</span>
                <p className="text-sm font-bold text-slate-800">Learn, Don't Automate</p>
              </div>
              <div className="space-y-0.5">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Foundation</span>
                <p className="text-sm font-bold text-slate-800">Norman's Affordances</p>
              </div>
              <div className="space-y-0.5">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Engine</span>
                <p className="text-sm font-bold text-slate-800">Gemini 2.0 + Rules</p>
              </div>
              <div className="space-y-0.5">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Evaluation</span>
                <p className="text-sm font-bold text-slate-800">SUS Benchmarked</p>
              </div>
            </div>
          </div>
        </PageContainer>
      </section>

      {/* The Core Problem & Solution (Interactive Demonstration) */}
      <PageContainer className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">The Human-Centric Difference</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Why Most Prompts Fail (And How We Fix It)</h2>
          <p className="text-sm text-slate-600">
            Non-experts typically use natural-language shorthand like Google searches. Look at the structural gap below:
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <BeforeAfterToggle
            before="Write a marketing email for my bakery app."
            after="Act as a digital marketing specialist for culinary startups. Write a 150-word promotional launch email announcing our new artisan bakery pre-order app to young urban professionals. Use an inviting, warm tone. Highlight 3 key benefits: zero morning wait times, locally sourced ingredients, and a 20% first-order discount. End with a clear call-to-action button: 'Claim Your Fresh Pastry'."
            explanation="The improved prompt implements 5 key HCI prompt dimensions: Persona (specialist role), Audience (urban professionals), Length constraint (150 words), Specific benefits (3 distinct points), and an Actionable CTA format."
            principle="Persona + Constraint + Output Formatting"
          />
        </div>
      </PageContainer>

      {/* Feature Grid */}
      <PageContainer className="space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">Core Features</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Empowering Non-Experts at Every Step</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs hover:shadow-md transition-all space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                <Wand2 className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Guided Prompt Builder</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Step-by-step contextual input fields categorized across Writing, Coding, Education, Research, and Business. Progressive disclosure prevents cognitive overload.
              </p>
            </div>
            <Link
              to="/builder"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-700 pt-2"
            >
              <span>Build a prompt</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Card 2 */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs hover:shadow-md transition-all space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-50 text-teal-600">
                <Sparkles className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Intelligent Prompt Improver</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Paste any rough prompt and receive an enhanced version along with itemized explanations detailing why each change was made and which prompt pattern it applies.
              </p>
            </div>
            <Link
              to="/improver"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-600 hover:text-teal-700 pt-2"
            >
              <span>Improve a prompt</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Card 3 */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs hover:shadow-md transition-all space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                <BookOpen className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Interactive Learning Hub</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Master prompt anatomy, avoid common rookie mistakes, and learn foundational prompt engineering patterns derived from published HCI and Vanderbilt research.
              </p>
            </div>
            <Link
              to="/learn"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-600 hover:text-amber-700 pt-2"
            >
              <span>Explore lessons</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </PageContainer>

      {/* HCI Principles Banner */}
      <section className="bg-slate-900 text-white py-14">
        <PageContainer>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider">
                <Compass className="h-4 w-4" />
                <span>Norman's Affordances</span>
              </div>
              <h3 className="text-base font-bold">Clear Action Possibilities</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Rather than an ambiguous empty text box, every form field provides visible signifiers, helpful placeholders, and contextual explanations of expected inputs.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-teal-400 text-xs font-bold uppercase tracking-wider">
                <ShieldCheck className="h-4 w-4" />
                <span>Progressive Disclosure</span>
              </div>
              <h3 className="text-base font-bold">Scaffolded Complexity</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Start with 2-3 essential fields. Unlock advanced modifiers (constraints, output formats, audience framing) on-demand as your familiarity grows.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
                <GraduationCap className="h-4 w-4" />
                <span>Explainable AI (XAI)</span>
              </div>
              <h3 className="text-base font-bold">Learnable Feedback</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Never accept a "black box" rewrite. PromptCraft transparently annotates its suggestions so users gradually become autonomous, skilled prompt writers.
              </p>
            </div>
          </div>
        </PageContainer>
      </section>
    </div>
  );
}

