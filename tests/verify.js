import { analyzePromptWithRules, improvePromptWithRules, getQualityLevel } from '../src/services/ai/ruleEngine.js';
import { assemblePrompt, getFieldCompletion } from '../src/services/promptAssembler.js';

console.log('🧪 Starting PromptCraft Automated Verification Suite...\n');

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✅ PASS: ${message}`);
    passed++;
  } else {
    console.error(`  ❌ FAIL: ${message}`);
    failed++;
  }
}

// TEST 1: Rule Engine Analysis of Vague Prompt
console.log('Test Group 1: Rule Engine Heuristics');
const vaguePrompt = 'Write something about dogs';
const vagueAnalysis = analyzePromptWithRules(vaguePrompt);

assert(vagueAnalysis.score < 50, `Vague prompt score is appropriately low (${vagueAnalysis.score}/100)`);
assert(vagueAnalysis.suggestions.length > 0, `Identified ${vagueAnalysis.suggestions.length} improvement opportunities`);
assert(vagueAnalysis.dimensions.specificity <= 50, 'Specificity detected as low');

// TEST 2: High Quality Structured Prompt
const structuredPrompt = 'Act as an expert veterinarian. Write a 300-word informative guide explaining the symptoms and preventative care for canine arthritis in senior Golden Retrievers. Format the advice with bullet points for daily care and a bold warning section for emergency signs. Avoid clinical jargon and use an empathetic tone.';
const strongAnalysis = analyzePromptWithRules(structuredPrompt);

assert(strongAnalysis.score >= 60, `Structured prompt receives high score (${strongAnalysis.score}/100)`);
assert(strongAnalysis.dimensions.context > 40, 'Context detected properly');
assert(strongAnalysis.dimensions.structure > 50, 'Structure detected properly');

// TEST 3: Rule-Based Improvement
console.log('\nTest Group 2: Rule-Based Improvement Engine');
const improvedResult = improvePromptWithRules('marketing email bakery app');
assert(improvedResult.improved.length > 'marketing email bakery app'.length, 'Prompt length expanded with structural guidance');
assert(improvedResult.changes.length > 0, `Generated ${improvedResult.changes.length} explicit change explanations`);

// TEST 4: Prompt Assembler
console.log('\nTest Group 3: Prompt Assembler');
const writingFields = {
  contentType: 'blog post',
  topic: 'renewable solar energy adoption in apartment complexes',
  audience: 'urban tenants and landlords',
  tone: 'informative and persuasive',
  length: '600 words',
};
const assembled = assemblePrompt('writing', writingFields);

assert(assembled.includes('Write a blog post'), 'Assembled prompt contains content type');
assert(assembled.includes('renewable solar energy adoption'), 'Assembled prompt contains topic');
assert(assembled.includes('urban tenants and landlords'), 'Assembled prompt contains audience');
assert(assembled.includes('informative and persuasive'), 'Assembled prompt contains tone');

const completion = getFieldCompletion('writing', writingFields);
assert(completion.filled === 5, `Correctly counted 5 filled fields`);
assert(completion.requiredMet === true, `Required fields met check passed`);

// TEST 5: Quality Level Mapping
console.log('\nTest Group 4: Quality Level Mapping');
const lowLvl = getQualityLevel(20);
const midLvl = getQualityLevel(50);
const highLvl = getQualityLevel(75);
const excLvl = getQualityLevel(95);

assert(lowLvl.label === 'Getting Started', 'Score 20 maps to Getting Started');
assert(midLvl.label === 'Good Foundation', 'Score 50 maps to Good Foundation');
assert(highLvl.label === 'Well-Structured', 'Score 75 maps to Well-Structured');
assert(excLvl.label === 'Excellent', 'Score 95 maps to Excellent');

console.log(`\n========================================`);
console.log(`Test Results: ${passed} Passed, ${failed} Failed`);
console.log(`========================================\n`);

if (failed > 0) process.exit(1);

