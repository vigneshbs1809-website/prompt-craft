import { cn } from '@/lib/utils';

export default function PageContainer({ children, className, maxWidth = 'max-w-7xl' }) {
  return (
    <main className={cn('mx-auto px-4 py-8 sm:px-6 lg:px-8 flex-1 w-full', maxWidth, className)}>
      {children}
    </main>
  );
}

