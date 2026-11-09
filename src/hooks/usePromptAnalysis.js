import { useState, useCallback, useRef } from 'react';
import { analyzePrompt } from '@/services/ai/aiService';

export function usePromptAnalysis() {
  const [analysis, setAnalysis] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState(null);
  const debounceRef = useRef(null);

  const analyze = useCallback((prompt) => {
    if (!prompt || prompt.trim().length < 3) {
      setAnalysis(null);
      setError(null);
      return;
    }

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(async () => {
      setIsAnalyzing(true);
      setError(null);
      try {
        const result = await analyzePrompt(prompt);
        setAnalysis(result);
      } catch (err) {
        setError(err.message);
        setAnalysis(null);
      } finally {
        setIsAnalyzing(false);
      }
    }, 400);
  }, []);

  const resetAnalysis = useCallback(() => {
    setAnalysis(null);
    setError(null);
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
  }, []);

  return {
    analysis,
    isAnalyzing,
    error,
    analyze,
    resetAnalysis,
  };
}

export default usePromptAnalysis;

