/**
 * Prompt Assembler
 * Constructs prompts from guided builder fields.
 */

import { categoryFields } from '../data/categories.js';

/**
 * Assemble a prompt from builder fields
 */
export function assemblePrompt(category, fields) {
  if (!category || !fields) return '';

  const config = categoryFields[category];
  if (!config) return '';

  const parts = [];
  const fieldDefs = config.fields;

  // Build prompt from filled fields
  for (const fieldDef of fieldDefs) {
    const value = fields[fieldDef.id];
    if (!value || value.trim().length === 0) continue;

    switch (category) {
      case 'writing':
        addWritingPart(parts, fieldDef.id, value);
        break;
      case 'coding':
        addCodingPart(parts, fieldDef.id, value);
        break;
      case 'education':
        addEducationPart(parts, fieldDef.id, value);
        break;
      case 'research':
        addResearchPart(parts, fieldDef.id, value);
        break;
      case 'creative':
        addCreativePart(parts, fieldDef.id, value);
        break;
      case 'business':
        addBusinessPart(parts, fieldDef.id, value);
        break;
      case 'brainstorm':
        addBrainstormPart(parts, fieldDef.id, value);
        break;
      default:
        parts.push(value);
    }
  }

  return parts.join(' ').replace(/\s+/g, ' ').trim();
}

function addWritingPart(parts, fieldId, value) {
  switch (fieldId) {
    case 'contentType': parts.push(`Write a ${value}`); break;
    case 'topic': parts.push(`about ${value}.`); break;
    case 'audience': parts.push(`The target audience is ${value}.`); break;
    case 'tone': parts.push(`Use a ${value} tone.`); break;
    case 'length': parts.push(`The length should be approximately ${value}.`); break;
    case 'keyPoints': parts.push(`Make sure to cover these key points: ${value}.`); break;
    case 'constraints': parts.push(`Important: ${value}.`); break;
  }
}

function addCodingPart(parts, fieldId, value) {
  switch (fieldId) {
    case 'task': parts.push(value); break;
    case 'language': parts.push(`Use ${value}.`); break;
    case 'context': parts.push(`Context: ${value}.`); break;
    case 'input': parts.push(`Expected input/output: ${value}.`); break;
    case 'constraints': parts.push(`Requirements: ${value}.`); break;
    case 'experience': parts.push(`Please explain at a ${value} level.`); break;
  }
}

function addEducationPart(parts, fieldId, value) {
  switch (fieldId) {
    case 'goal': parts.push(value); break;
    case 'subject': parts.push(`in the subject of ${value}.`); break;
    case 'level': parts.push(`My current level is: ${value}.`); break;
    case 'format': parts.push(`Please present this as ${value}.`); break;
    case 'specifics': parts.push(`Focus specifically on: ${value}.`); break;
    case 'constraints': parts.push(`Additional requirements: ${value}.`); break;
  }
}

function addResearchPart(parts, fieldId, value) {
  switch (fieldId) {
    case 'question': parts.push(value); break;
    case 'scope': parts.push(`Scope: ${value}.`); break;
    case 'depth': parts.push(`Provide a ${value}.`); break;
    case 'sources': parts.push(`Draw from: ${value}.`); break;
    case 'format': parts.push(`Format the output as: ${value}.`); break;
    case 'perspective': parts.push(`Analyze from a ${value}.`); break;
  }
}

function addCreativePart(parts, fieldId, value) {
  switch (fieldId) {
    case 'type': parts.push(`Create a ${value}`); break;
    case 'theme': parts.push(`about/with the theme of ${value}.`); break;
    case 'mood': parts.push(`The mood should be ${value}.`); break;
    case 'style': parts.push(`Write in the style of ${value}.`); break;
    case 'elements': parts.push(`Include these elements: ${value}.`); break;
    case 'constraints': parts.push(`Constraints: ${value}.`); break;
  }
}

function addBusinessPart(parts, fieldId, value) {
  switch (fieldId) {
    case 'task': parts.push(value); break;
    case 'context': parts.push(`Context: ${value}.`); break;
    case 'audience': parts.push(`This is for: ${value}.`); break;
    case 'keyInfo': parts.push(`Key information to include: ${value}.`); break;
    case 'tone': parts.push(`Use a ${value} tone.`); break;
    case 'format': parts.push(`Format: ${value}.`); break;
  }
}

function addBrainstormPart(parts, fieldId, value) {
  switch (fieldId) {
    case 'challenge': parts.push(`Brainstorm solutions for: ${value}.`); break;
    case 'domain': parts.push(`Domain: ${value}.`); break;
    case 'constraints': parts.push(`Constraints: ${value}.`); break;
    case 'quantity': parts.push(`Generate ${value}.`); break;
    case 'style': parts.push(`Approach: ${value}.`); break;
    case 'existing': parts.push(`Already tried: ${value}.`); break;
  }
}

/**
 * Get completion percentage for builder fields
 */
export function getFieldCompletion(category, fields) {
  const config = categoryFields[category];
  if (!config) return { filled: 0, total: 0, percentage: 0, requiredMet: true };

  const total = config.fields.length;
  const filled = config.fields.filter(f => fields[f.id] && fields[f.id].trim().length > 0).length;
  const requiredMet = config.fields
    .filter(f => f.required)
    .every(f => fields[f.id] && fields[f.id].trim().length > 0);

  return {
    filled,
    total,
    percentage: Math.round((filled / total) * 100),
    requiredMet,
  };
}
