export const APP_NAME = 'PromptCraft';
export const APP_TAGLINE = 'Learn to write better AI prompts';
export const APP_DESCRIPTION = 'A human-centric prompt guidance interface that helps non-expert users communicate more effectively with generative AI systems.';

export const STORAGE_KEYS = {
  PROMPT_HISTORY: 'promptcraft_history',
  USER_PREFERENCES: 'promptcraft_preferences',
  SAVED_PROMPTS: 'promptcraft_saved',
};

export const QUALITY_LEVELS = {
  LOW: { label: 'Getting Started', color: 'danger', min: 0, max: 30 },
  MEDIUM: { label: 'Good Foundation', color: 'accent', min: 31, max: 60 },
  HIGH: { label: 'Well-Structured', color: 'secondary', min: 61, max: 80 },
  EXCELLENT: { label: 'Excellent', color: 'primary', min: 81, max: 100 },
};

export const PROMPT_DIMENSIONS = {
  specificity: {
    label: 'Specificity',
    description: 'How specific and detailed is your request?',
    icon: 'Target',
  },
  context: {
    label: 'Context',
    description: 'Have you provided enough background information?',
    icon: 'Info',
  },
  clarity: {
    label: 'Clarity',
    description: 'Is your prompt clear and unambiguous?',
    icon: 'Eye',
  },
  structure: {
    label: 'Structure',
    description: 'Is your prompt well-organized?',
    icon: 'LayoutList',
  },
  actionability: {
    label: 'Actionability',
    description: 'Does the AI know exactly what to do?',
    icon: 'Zap',
  },
};

export const CATEGORIES = [
  { id: 'writing', label: 'Writing & Content', icon: 'PenLine', color: 'primary' },
  { id: 'coding', label: 'Programming & Technical', icon: 'Code', color: 'secondary' },
  { id: 'education', label: 'Education & Learning', icon: 'GraduationCap', color: 'accent' },
  { id: 'research', label: 'Research & Analysis', icon: 'Search', color: 'primary' },
  { id: 'creative', label: 'Creative & Artistic', icon: 'Palette', color: 'danger' },
  { id: 'business', label: 'Professional & Business', icon: 'Briefcase', color: 'secondary' },
  { id: 'brainstorm', label: 'Brainstorming & Ideation', icon: 'Lightbulb', color: 'accent' },
];

export const MAX_HISTORY_ITEMS = 50;
export const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models';
