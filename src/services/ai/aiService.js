/**
 * Unified AI Service
 * Provides a single interface for prompt improvement and analysis.
 * Automatically falls back from Gemini API to rule-based engine.
 */

import { isGeminiAvailable, improvePromptWithGemini, analyzePromptWithGemini } from './geminiService.js';
import { analyzePromptWithRules, improvePromptWithRules, getQualityLevel } from './ruleEngine.js';

let aiMode = null; // Will be set on first use

/**
 * Get the current AI mode
 */
export function getAIMode() {
  if (aiMode !== null) return aiMode;
  aiMode = isGeminiAvailable() ? 'ai' : 'offline';
  return aiMode;
}

/**
 * Check if AI-powered features are available
 */
export function isAIPowered() {
  return getAIMode() === 'ai';
}

/**
 * Improve a prompt with explanations
 * Tries Gemini first, falls back to rule-based
 */
export async function improvePrompt(userPrompt) {
  if (!userPrompt || userPrompt.trim().length === 0) {
    return { improved: '', changes: [], mode: 'error', error: 'Please enter a prompt to improve.' };
  }

  // Try AI first
  if (isGeminiAvailable()) {
    try {
      const result = await improvePromptWithGemini(userPrompt);
      return { ...result, mode: 'ai' };
    } catch (error) {
      console.warn('Gemini API failed, falling back to rule-based engine:', error.message);
    }
  }

  // Fallback to rule-based
  const result = improvePromptWithRules(userPrompt);
  return { ...result, mode: 'offline' };
}

/**
 * Analyze a prompt's quality
 * Tries Gemini first, falls back to rule-based
 */
export async function analyzePrompt(userPrompt) {
  if (!userPrompt || userPrompt.trim().length === 0) {
    return { score: 0, dimensions: {}, suggestions: [], mode: 'error' };
  }

  // Try AI first
  if (isGeminiAvailable()) {
    try {
      const result = await analyzePromptWithGemini(userPrompt);
      // Normalize the response
      const dimensions = {};
      for (const [key, val] of Object.entries(result.dimensions || {})) {
        dimensions[key] = typeof val === 'object' ? val.score : val;
      }
      const score = result.overallScore || calculateAverage(dimensions);
      return {
        score,
        dimensions,
        suggestions: result.suggestions || [],
        strengths: result.strengths || [],
        qualityLevel: getQualityLevel(score),
        mode: 'ai',
        feedback: result.dimensions, // Keep detailed feedback
      };
    } catch (error) {
      console.warn('Gemini analysis failed, falling back to rules:', error.message);
    }
  }

  // Fallback to rule-based
  const result = analyzePromptWithRules(userPrompt);
  return {
    ...result,
    qualityLevel: getQualityLevel(result.score),
    mode: 'offline',
  };
}

function calculateAverage(dimensions) {
  const values = Object.values(dimensions).filter(v => typeof v === 'number');
  if (values.length === 0) return 0;
  return Math.round(values.reduce((a, b) => a + b, 0) / values.length);
}

export { getQualityLevel };
