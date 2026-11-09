import { useState, useCallback, useMemo } from 'react';
import { assemblePrompt, getFieldCompletion } from '@/services/promptAssembler';

export function usePromptBuilder(initialCategory = 'writing') {
  const [category, setCategory] = useState(initialCategory);
  const [fields, setFields] = useState({});
  const [isDetailedMode, setIsDetailedMode] = useState(false);

  const updateField = useCallback((fieldId, value) => {
    setFields(prev => ({ ...prev, [fieldId]: value }));
  }, []);

  const resetFields = useCallback(() => {
    setFields({});
  }, []);

  const changeCategory = useCallback((newCategory) => {
    setCategory(newCategory);
    setFields({});
  }, []);

  const setEntireFields = useCallback((newFields) => {
    setFields(newFields);
  }, []);

  const assembledPrompt = useMemo(() => {
    return assemblePrompt(category, fields);
  }, [category, fields]);

  const completion = useMemo(() => {
    return getFieldCompletion(category, fields);
  }, [category, fields]);

  const toggleMode = useCallback(() => {
    setIsDetailedMode(prev => !prev);
  }, []);

  return {
    category,
    fields,
    isDetailedMode,
    assembledPrompt,
    completion,
    setCategory: changeCategory,
    updateField,
    resetFields,
    setEntireFields,
    toggleMode,
  };
}

export default usePromptBuilder;

