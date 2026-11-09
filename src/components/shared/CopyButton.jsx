import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function CopyButton({ text, className, variant = 'default', label = 'Copy' }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all duration-150 cursor-pointer shadow-xs',
        variant === 'default' &&
          (copied
            ? 'border border-emerald-300 bg-emerald-50 text-emerald-700'
            : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:border-slate-300'),
        variant === 'primary' &&
          (copied
            ? 'bg-emerald-600 text-white'
            : 'bg-indigo-600 text-white hover:bg-indigo-700'),
        className
      )}
      title={copied ? 'Copied to clipboard!' : 'Copy prompt text'}
    >
      {copied ? (
        <>
          <Check className="h-3.5 w-3.5 text-emerald-600" />
          <span>Copied!</span>
        </>
      ) : (
        <>
          <Copy className="h-3.5 w-3.5 text-slate-500" />
          <span>{label}</span>
        </>
      )}
    </button>
  );
}

