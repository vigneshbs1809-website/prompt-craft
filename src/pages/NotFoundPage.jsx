import { Link } from 'react-router-dom';
import { Compass, ArrowLeft } from 'lucide-react';
import PageContainer from '@/components/layout/PageContainer';

export default function NotFoundPage() {
  return (
    <PageContainer className="py-20 text-center space-y-5">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
        <Compass className="h-7 w-7" />
      </div>
      <div className="space-y-1">
        <h1 className="text-3xl font-extrabold text-slate-900">Page Not Found</h1>
        <p className="text-sm text-slate-500 max-w-sm mx-auto">
          The requested page does not exist in PromptCraft.
        </p>
      </div>
      <Link
        to="/"
        className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-semibold text-white hover:bg-indigo-700 transition-colors cursor-pointer"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Return to Home</span>
      </Link>
    </PageContainer>
  );
}

