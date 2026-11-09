/**
 * Storage Service
 * Handles localStorage persistence for prompt history and user preferences.
 */

import { STORAGE_KEYS, MAX_HISTORY_ITEMS } from '../utils/constants.js';

/**
 * Save a prompt to history
 */
export function saveToHistory(entry) {
  try {
    const history = getHistory();
    const newEntry = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 7),
      timestamp: new Date().toISOString(),
      ...entry,
    };
    history.unshift(newEntry);
    
    // Limit history size
    if (history.length > MAX_HISTORY_ITEMS) {
      history.splice(MAX_HISTORY_ITEMS);
    }
    
    localStorage.setItem(STORAGE_KEYS.PROMPT_HISTORY, JSON.stringify(history));
    return newEntry;
  } catch (error) {
    console.error('Failed to save to history:', error);
    return null;
  }
}

/**
 * Get prompt history
 */
export function getHistory() {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.PROMPT_HISTORY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

/**
 * Delete a history entry
 */
export function deleteFromHistory(id) {
  try {
    const history = getHistory().filter(item => item.id !== id);
    localStorage.setItem(STORAGE_KEYS.PROMPT_HISTORY, JSON.stringify(history));
    return true;
  } catch {
    return false;
  }
}

/**
 * Clear all history
 */
export function clearHistory() {
  try {
    localStorage.removeItem(STORAGE_KEYS.PROMPT_HISTORY);
    return true;
  } catch {
    return false;
  }
}

/**
 * Save user preferences
 */
export function savePreferences(prefs) {
  try {
    const existing = getPreferences();
    const updated = { ...existing, ...prefs };
    localStorage.setItem(STORAGE_KEYS.USER_PREFERENCES, JSON.stringify(updated));
    return updated;
  } catch {
    return null;
  }
}

/**
 * Get user preferences
 */
export function getPreferences() {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.USER_PREFERENCES);
    return stored ? JSON.parse(stored) : { theme: 'light' };
  } catch {
    return { theme: 'light' };
  }
}

/**
 * Export history as JSON text
 */
export function exportHistory() {
  const history = getHistory();
  return JSON.stringify(history, null, 2);
}
