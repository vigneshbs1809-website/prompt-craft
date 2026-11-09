import { useState, useCallback } from 'react';
import { improvePrompt, getAIMode } from '@/services/ai/aiService';

export function useAIService() {
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const improve = useCallback(async (prompt) => {
    if (!prompt || prompt.trim().length === 0) {
      setError('Please enter a prompt to improve.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const improved = await improvePrompt(prompt);
      setResult(improved);
    } catch (err) {
      setError(err.message || 'Failed to improve prompt. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setResult(null);
    setError(null);
  }, []);

  return {
    result,
    isLoading,
    error,
    aiMode: getAIMode(),
    improve,
    reset,
  };
}

export default useAIService;

