/**
 * Rule-Based Prompt Improvement Engine
 * Provides offline prompt analysis and improvement without requiring AI API access.
 * Uses pattern matching and heuristic rules based on established prompt engineering research.
 */

const IMPROVEMENT_RULES = [
  {
    id: 'add-specificity',
    name: 'Add Specificity',
    check: (prompt) => {
      const vaguePhrases = ['something', 'stuff', 'things', 'help me', 'tell me about', 'write about', 'anything', 'whatever'];
      const lower = prompt.toLowerCase();
      return vaguePhrases.some(phrase => lower.includes(phrase)) || prompt.split(' ').length < 8;
    },
    suggest: (prompt) => ({
      issue: 'Your prompt is quite vague.',
      explanation: 'Specific prompts get specific answers. Vague prompts force the AI to guess what you want, often leading to generic responses that miss the mark.',
      principle: 'Specificity',
      suggestion: 'Add details about: exactly WHAT you want, the specific TOPIC, and any particular REQUIREMENTS.',
      priority: 'high',
    }),
  },
  {
    id: 'add-context',
    name: 'Add Context',
    check: (prompt) => {
      const contextIndicators = ['because', 'since', 'given that', 'considering', 'for my', 'i am', 'i\'m', 'my goal', 'the purpose', 'background', 'context'];
      const lower = prompt.toLowerCase();
      return !contextIndicators.some(indicator => lower.includes(indicator)) && prompt.split(' ').length < 25;
    },
    suggest: () => ({
      issue: 'Your prompt lacks context.',
      explanation: 'Context helps the AI understand your situation, goal, and constraints. Without it, the AI makes assumptions that may not match your needs.',
      principle: 'Context Pattern',
      suggestion: 'Add background information: Why do you need this? Who is it for? What\'s the situation?',
      priority: 'high',
    }),
  },
  {
    id: 'add-audience',
    name: 'Specify Audience',
    check: (prompt) => {
      const audienceIndicators = ['for', 'audience', 'readers', 'users', 'students', 'professionals', 'beginners', 'experts', 'children', 'adults', 'targeted at', 'aimed at', 'written for'];
      const lower = prompt.toLowerCase();
      return !audienceIndicators.some(indicator => lower.includes(indicator));
    },
    suggest: () => ({
      issue: 'No target audience specified.',
      explanation: 'The same topic explained to a 10-year-old vs. a PhD researcher produces completely different content. Specifying your audience automatically adjusts complexity, vocabulary, and depth.',
      principle: 'Audience Pattern',
      suggestion: 'Add who this is for: "for beginners", "for a technical audience", "for my boss", etc.',
      priority: 'medium',
    }),
  },
  {
    id: 'add-format',
    name: 'Specify Output Format',
    check: (prompt) => {
      const formatIndicators = ['table', 'list', 'bullet', 'step', 'paragraph', 'code', 'json', 'format', 'structure', 'organize', 'sections', 'outline', 'summary', 'numbered'];
      const lower = prompt.toLowerCase();
      return !formatIndicators.some(indicator => lower.includes(indicator));
    },
    suggest: () => ({
      issue: 'No output format specified.',
      explanation: 'Without format guidance, the AI chooses for you — and it might not match your needs. A comparison might come as paragraphs when you wanted a table.',
      principle: 'Template Pattern',
      suggestion: 'Specify how you want the output: as a table, bullet points, numbered steps, code block, essay, etc.',
      priority: 'medium',
    }),
  },
  {
    id: 'add-constraints',
    name: 'Add Constraints',
    check: (prompt) => {
      const constraintIndicators = ['don\'t', 'do not', 'avoid', 'without', 'limit', 'maximum', 'minimum', 'under', 'no more than', 'at most', 'at least', 'words', 'keep it', 'must not', 'should not'];
      const lower = prompt.toLowerCase();
      return !constraintIndicators.some(indicator => lower.includes(indicator));
    },
    suggest: () => ({
      issue: 'No constraints or boundaries set.',
      explanation: 'Constraints focus the AI\'s response and prevent information overload. They tell the AI what to exclude, which is just as important as what to include.',
      principle: 'Constraint Pattern',
      suggestion: 'Add boundaries: word limits, topics to avoid, complexity level, or things to exclude.',
      priority: 'low',
    }),
  },
  {
    id: 'add-role',
    name: 'Assign a Role',
    check: (prompt) => {
      const roleIndicators = ['act as', 'you are', 'as a', 'pretend', 'imagine you', 'role of', 'expert in', 'specialist', 'professional'];
      const lower = prompt.toLowerCase();
      return !roleIndicators.some(indicator => lower.includes(indicator));
    },
    suggest: () => ({
      issue: 'No role or expertise specified.',
      explanation: 'Assigning a role activates domain-specific knowledge in the AI. "Act as a senior developer" produces different code quality than a generic request.',
      principle: 'Persona Pattern',
      suggestion: 'Start with: "Act as a [role/expert]..." to set the AI\'s expertise level.',
      priority: 'medium',
    }),
  },
  {
    id: 'add-action-verb',
    name: 'Use Action Verbs',
    check: (prompt) => {
      const actionVerbs = ['write', 'create', 'explain', 'analyze', 'compare', 'list', 'describe', 'generate', 'design', 'develop', 'summarize', 'evaluate', 'draft', 'compose', 'build', 'outline', 'review', 'suggest', 'provide', 'make'];
      const firstWords = prompt.toLowerCase().split(' ').slice(0, 3);
      return !actionVerbs.some(verb => firstWords.some(word => word.startsWith(verb)));
    },
    suggest: () => ({
      issue: 'Prompt doesn\'t start with a clear action.',
      explanation: 'Starting with an action verb tells the AI exactly what type of output to produce. "Explain X" vs "Compare X" vs "List X" produce very different responses.',
      principle: 'Task Specification',
      suggestion: 'Start with a clear action verb: Write, Explain, Compare, Analyze, List, Create, Summarize.',
      priority: 'medium',
    }),
  },
  {
    id: 'search-engine-style',
    name: 'Not a Search Query',
    check: (prompt) => {
      const words = prompt.trim().split(/\s+/);
      const hasNoPunctuation = !/[.?!,;:]/.test(prompt);
      return words.length <= 5 && hasNoPunctuation;
    },
    suggest: () => ({
      issue: 'This looks like a search engine query, not an AI prompt.',
      explanation: 'AI is not a search engine. It can understand complex instructions, hold conversations, and create nuanced content — but only if you give it complete sentences with context.',
      principle: 'Conversational Prompting',
      suggestion: 'Rewrite as a complete sentence or paragraph. Include what you want, why, and how you want it formatted.',
      priority: 'high',
    }),
  },
];

/**
 * Analyze a prompt and return improvement suggestions
 */
export function analyzePromptWithRules(prompt) {
  if (!prompt || typeof prompt !== 'string') {
    return { suggestions: [], score: 0, dimensions: getEmptyDimensions() };
  }

  const trimmed = prompt.trim();
  if (trimmed.length === 0) {
    return { suggestions: [], score: 0, dimensions: getEmptyDimensions() };
  }

  const suggestions = [];
  
  for (const rule of IMPROVEMENT_RULES) {
    if (rule.check(trimmed)) {
      suggestions.push({
        ruleId: rule.id,
        ...rule.suggest(trimmed),
      });
    }
  }

  const dimensions = analyzeDimensions(trimmed);
  const score = calculateScore(dimensions);

  return { suggestions, score, dimensions };
}

/**
 * Generate an improved version of the prompt using rules
 */
export function improvePromptWithRules(prompt) {
  if (!prompt || prompt.trim().length === 0) {
    return { improved: '', changes: [] };
  }

  const trimmed = prompt.trim();
  const analysis = analyzePromptWithRules(trimmed);
  const changes = [];
  let improved = trimmed;

  // Apply improvements based on detected issues
  const highPriority = analysis.suggestions.filter(s => s.priority === 'high');
  const mediumPriority = analysis.suggestions.filter(s => s.priority === 'medium');

  // Build improved prompt
  let additions = [];

  if (highPriority.some(s => s.ruleId === 'search-engine-style')) {
    // Complete rewrite for search-style queries
    improved = `Please provide a detailed explanation about ${trimmed}. Include key concepts, practical examples, and organize the information in a clear structure.`;
    changes.push({
      type: 'rewrite',
      original: trimmed,
      improved: improved,
      reason: 'Converted search-style query into a structured AI prompt with clear instructions.',
      principle: 'Conversational Prompting',
    });
  } else {
    // Incremental improvements
    if (analysis.suggestions.some(s => s.ruleId === 'add-role') && !analysis.suggestions.some(s => s.ruleId === 'search-engine-style')) {
      const rolePrefix = 'Act as a knowledgeable expert. ';
      improved = rolePrefix + improved;
      changes.push({
        type: 'addition',
        original: '(no role specified)',
        improved: rolePrefix.trim(),
        reason: 'Added a role assignment to activate domain-specific knowledge.',
        principle: 'Persona Pattern',
      });
    }

    if (analysis.suggestions.some(s => s.ruleId === 'add-format')) {
      additions.push('Please organize your response with clear sections and use bullet points for key information.');
      changes.push({
        type: 'addition',
        original: '(no format specified)',
        improved: 'Added format guidance',
        reason: 'Added output format instructions so the response structure matches your needs.',
        principle: 'Template Pattern',
      });
    }

    if (analysis.suggestions.some(s => s.ruleId === 'add-constraints')) {
      additions.push('Keep the response focused and concise.');
      changes.push({
        type: 'addition',
        original: '(no constraints)',
        improved: 'Added focus constraint',
        reason: 'Added constraints to prevent information overload and keep the response targeted.',
        principle: 'Constraint Pattern',
      });
    }

    if (additions.length > 0) {
      improved = improved + ' ' + additions.join(' ');
    }
  }

  return { improved, changes, analysis };
}

function analyzeDimensions(prompt) {
  const words = prompt.split(/\s+/);
  const lower = prompt.toLowerCase();
  const sentences = prompt.split(/[.!?]+/).filter(s => s.trim().length > 0);

  // Specificity (0-100)
  let specificity = 20;
  if (words.length > 10) specificity += 15;
  if (words.length > 25) specificity += 15;
  if (words.length > 50) specificity += 10;
  if (/\d+/.test(prompt)) specificity += 10; // Contains numbers
  if (/["']/.test(prompt)) specificity += 5; // Contains quoted text
  const specificWords = ['specific', 'exactly', 'precisely', 'particular', 'detailed'];
  if (specificWords.some(w => lower.includes(w))) specificity += 10;
  if (words.length > 5 && !['something', 'stuff', 'things'].some(w => lower.includes(w))) specificity += 15;

  // Context (0-100)
  let context = 20;
  const contextWords = ['because', 'since', 'given', 'considering', 'for my', 'for ', 'i am', 'i\'m', 'my goal', 'background', 'context', 'situation', 'purpose', 'need', 'target', 'audience', 'about'];
  const contextCount = contextWords.filter(w => lower.includes(w)).length;
  context += Math.min(45, contextCount * 12);
  if (sentences.length > 2) context += 15;
  if (words.length > 30) context += 15;

  // Clarity (0-100)
  let clarity = 30;
  const actionVerbs = ['write', 'create', 'explain', 'analyze', 'compare', 'list', 'describe', 'generate', 'summarize', 'evaluate', 'draft', 'design', 'review', 'develop', 'build'];
  if (actionVerbs.some(v => lower.includes(v))) clarity += 20;
  if (sentences.length >= 1 && sentences.length <= 5) clarity += 15;
  if (/[.!?]$/.test(prompt.trim())) clarity += 10; // Ends with punctuation
  if (words.length >= 8) clarity += 10;
  const vagueWords = ['maybe', 'kind of', 'sort of', 'i guess', 'whatever', 'idk'];
  if (!vagueWords.some(w => lower.includes(w))) clarity += 15;

  // Structure (0-100)
  let structure = 20;
  if (/\n/.test(prompt)) structure += 15; // Has line breaks
  if (/[:-]/.test(prompt)) structure += 10; // Has colons or dashes
  if (/\d+[.)\s]/.test(prompt)) structure += 15; // Has numbered items
  const structureWords = ['first', 'second', 'then', 'finally', 'step', 'section', 'part'];
  if (structureWords.some(w => lower.includes(w))) structure += 15;
  if (sentences.length > 1) structure += 10;
  const formatWords = ['table', 'list', 'bullet', 'format', 'organize', 'structure', 'sections', 'outline'];
  if (formatWords.some(w => lower.includes(w))) structure += 15;

  // Actionability (0-100)
  let actionability = 20;
  if (actionVerbs.some(v => {
    const firstWords = lower.split(' ').slice(0, 3).join(' ');
    return firstWords.includes(v);
  })) actionability += 25;
  const outcomeWords = ['result', 'output', 'produce', 'return', 'give me', 'provide', 'deliver', 'include'];
  if (outcomeWords.some(w => lower.includes(w))) actionability += 15;
  const audienceWords = ['for', 'audience', 'reader', 'user', 'student', 'beginner'];
  if (audienceWords.some(w => lower.includes(w))) actionability += 10;
  if (words.length > 15) actionability += 10;
  if (/\?/.test(prompt)) actionability += 5; // Has a question

  return {
    specificity: Math.min(100, specificity),
    context: Math.min(100, context),
    clarity: Math.min(100, clarity),
    structure: Math.min(100, structure),
    actionability: Math.min(100, actionability),
  };
}

function calculateScore(dimensions) {
  const weights = {
    specificity: 0.25,
    context: 0.2,
    clarity: 0.25,
    structure: 0.15,
    actionability: 0.15,
  };

  let score = 0;
  for (const [dim, weight] of Object.entries(weights)) {
    score += (dimensions[dim] || 0) * weight;
  }

  return Math.round(score);
}

function getEmptyDimensions() {
  return {
    specificity: 0,
    context: 0,
    clarity: 0,
    structure: 0,
    actionability: 0,
  };
}

export function getQualityLevel(score) {
  if (score >= 81) return { label: 'Excellent', color: 'text-primary-600', bg: 'bg-primary-100', description: 'This prompt is well-crafted and should produce high-quality results.' };
  if (score >= 61) return { label: 'Well-Structured', color: 'text-secondary-600', bg: 'bg-secondary-100', description: 'Good prompt! A few more details could make it even better.' };
  if (score >= 31) return { label: 'Good Foundation', color: 'text-accent-600', bg: 'bg-accent-100', description: 'You have a good starting point. Adding specifics will improve results significantly.' };
  return { label: 'Getting Started', color: 'text-danger-600', bg: 'bg-danger-100', description: 'This prompt is very basic. Adding details, context, and structure will dramatically improve AI responses.' };
}
