/**
 * Google Gemini API Service
 * Handles communication with the Gemini API for intelligent prompt improvement.
 * Falls back to rule-based engine when API is unavailable.
 */

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_MODEL = import.meta.env.VITE_GEMINI_MODEL || 'gemini-2.0-flash';
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

/**
 * Check if Gemini API is configured and available
 */
export function isGeminiAvailable() {
  return Boolean(GEMINI_API_KEY && GEMINI_API_KEY.trim().length > 0);
}

/**
 * Call Gemini API with a prompt
 */
async function callGemini(systemInstruction, userPrompt) {
  if (!isGeminiAvailable()) {
    throw new Error('Gemini API key not configured');
  }

  const response = await fetch(`${API_URL}?key=${GEMINI_API_KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      system_instruction: {
        parts: [{ text: systemInstruction }],
      },
      contents: [
        {
          role: 'user',
          parts: [{ text: userPrompt }],
        },
      ],
      generationConfig: {
        temperature: 0.7,
        topP: 0.9,
        topK: 40,
        maxOutputTokens: 2048,
        responseMimeType: 'application/json',
      },
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Gemini API error (${response.status}): ${error}`);
  }

  const data = await response.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  
  if (!text) {
    throw new Error('No response from Gemini API');
  }

  return JSON.parse(text);
}

/**
 * Improve a prompt using Gemini AI
 */
export async function improvePromptWithGemini(userPrompt) {
  const systemInstruction = `You are an expert prompt engineer and educator. Your job is to improve user prompts AND explain WHY each change makes the prompt better.

You must return valid JSON with this exact structure:
{
  "improved": "the improved prompt text",
  "changes": [
    {
      "type": "addition|modification|restructure",
      "original": "what was there before (or 'not present')",
      "improved": "what you changed it to",
      "reason": "plain-language explanation of why this change improves the prompt",
      "principle": "the prompt engineering principle used (e.g., 'Persona Pattern', 'Specificity', 'Context Pattern', 'Chain-of-Thought', 'Template Pattern', 'Constraint Pattern')"
    }
  ],
  "overallExplanation": "A 1-2 sentence summary of the key improvements made"
}

Rules:
- Make meaningful improvements, not just rewording
- Each change must have a clear educational explanation
- Use simple, non-technical language in explanations
- Reference established prompt engineering principles
- Keep the improved prompt natural and readable
- Don't over-complicate simple requests
- Limit to 3-5 most impactful changes`;

  return await callGemini(systemInstruction, `Please improve this prompt and explain your changes:\n\n"${userPrompt}"`);
}

/**
 * Analyze a prompt's quality using Gemini AI
 */
export async function analyzePromptWithGemini(userPrompt) {
  const systemInstruction = `You are a prompt quality analyst. Evaluate the given prompt across quality dimensions.

Return valid JSON with this exact structure:
{
  "dimensions": {
    "specificity": { "score": 0-100, "feedback": "specific feedback about the specificity" },
    "context": { "score": 0-100, "feedback": "specific feedback about context provided" },
    "clarity": { "score": 0-100, "feedback": "specific feedback about clarity" },
    "structure": { "score": 0-100, "feedback": "specific feedback about structure" },
    "actionability": { "score": 0-100, "feedback": "specific feedback about actionability" }
  },
  "overallScore": 0-100,
  "strengths": ["list of things the prompt does well"],
  "suggestions": [
    {
      "issue": "what could be improved",
      "suggestion": "how to improve it",
      "priority": "high|medium|low"
    }
  ]
}

Be constructive and educational. Explain WHY each dimension scores the way it does.`;

  return await callGemini(systemInstruction, `Analyze this prompt's quality:\n\n"${userPrompt}"`);
}
