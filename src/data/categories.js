export const categoryFields = {
  writing: {
    fields: [
      { id: 'contentType', label: 'Type of Content', placeholder: 'e.g., Blog post, Email, Essay, Social media caption, Story', hint: 'What kind of text do you want the AI to create?', required: true },
      { id: 'topic', label: 'Topic or Subject', placeholder: 'e.g., Benefits of remote work for small businesses', hint: 'What should the content be about? Be as specific as possible.', required: true },
      { id: 'audience', label: 'Target Audience', placeholder: 'e.g., College students, Marketing professionals, General public', hint: 'Who will read this? The AI adjusts language and tone based on the audience.' },
      { id: 'tone', label: 'Tone & Style', placeholder: 'e.g., Professional, Casual, Humorous, Academic, Persuasive', hint: 'How should the writing feel? This shapes word choice and sentence structure.' },
      { id: 'length', label: 'Desired Length', placeholder: 'e.g., 500 words, 3 paragraphs, A brief summary', hint: 'How long should the output be? Specific lengths give better results.' },
      { id: 'keyPoints', label: 'Key Points to Include', placeholder: 'e.g., Cost savings, Flexibility, Work-life balance, Productivity tools', hint: 'List the main ideas or arguments that must be covered.' },
      { id: 'constraints', label: 'Things to Avoid', placeholder: 'e.g., No jargon, Avoid technical terms, Don\'t use bullet points', hint: 'Are there specific things the AI should NOT include?' },
    ],
  },
  coding: {
    fields: [
      { id: 'task', label: 'What do you need?', placeholder: 'e.g., Write a function, Debug this code, Explain this concept, Refactor', hint: 'What specific programming task should the AI help with?', required: true },
      { id: 'language', label: 'Programming Language', placeholder: 'e.g., Python, JavaScript, Java, C++, SQL', hint: 'Specify the language so the AI writes compatible code.', required: true },
      { id: 'context', label: 'Context & Details', placeholder: 'e.g., I\'m building a REST API with Express.js that needs user authentication', hint: 'What\'s the bigger picture? What framework/tools are you using?' },
      { id: 'input', label: 'Input/Output Expected', placeholder: 'e.g., Takes a list of numbers, returns the sorted list without duplicates', hint: 'What goes in and what should come out? Examples help a lot.' },
      { id: 'constraints', label: 'Requirements & Constraints', placeholder: 'e.g., Must handle edge cases, Use no external libraries, O(n) time complexity', hint: 'Any specific requirements for performance, style, or compatibility?' },
      { id: 'experience', label: 'Your Experience Level', placeholder: 'e.g., Beginner - please explain step by step, Intermediate, Advanced', hint: 'This helps the AI adjust explanation depth and complexity.' },
    ],
  },
  education: {
    fields: [
      { id: 'goal', label: 'Learning Goal', placeholder: 'e.g., Understand quantum computing basics, Prepare for a history exam', hint: 'What do you want to learn or accomplish?', required: true },
      { id: 'subject', label: 'Subject Area', placeholder: 'e.g., Physics, Mathematics, History, Computer Science', hint: 'Which academic subject or field?', required: true },
      { id: 'level', label: 'Current Knowledge Level', placeholder: 'e.g., High school student, Undergraduate, Complete beginner', hint: 'How much do you already know? This shapes the complexity of explanations.' },
      { id: 'format', label: 'Preferred Format', placeholder: 'e.g., Step-by-step explanation, Quiz questions, Summary notes, Analogies', hint: 'How do you learn best? Tell the AI your preferred format.' },
      { id: 'specifics', label: 'Specific Topics', placeholder: 'e.g., Focus on wave-particle duality and superposition', hint: 'Which specific sub-topics should be covered?' },
      { id: 'constraints', label: 'Additional Requirements', placeholder: 'e.g., Use simple analogies, Include practice problems, Avoid formulas', hint: 'Any preferences for how the content should be presented?' },
    ],
  },
  research: {
    fields: [
      { id: 'question', label: 'Research Question', placeholder: 'e.g., What are the environmental impacts of electric vehicles?', hint: 'What question are you trying to answer?', required: true },
      { id: 'scope', label: 'Scope & Focus', placeholder: 'e.g., Focus on manufacturing emissions and battery disposal, 2020-2024 data', hint: 'Define boundaries to get focused, relevant results.' },
      { id: 'depth', label: 'Analysis Depth', placeholder: 'e.g., Overview, Detailed analysis, Literature review style, Comparative study', hint: 'How deep should the analysis go?' },
      { id: 'sources', label: 'Preferred Sources', placeholder: 'e.g., Academic papers, Industry reports, Government data', hint: 'What types of evidence should the AI draw on?' },
      { id: 'format', label: 'Output Format', placeholder: 'e.g., Structured report with sections, Bullet-point summary, Annotated bibliography', hint: 'How should the research be organized and presented?' },
      { id: 'perspective', label: 'Perspective', placeholder: 'e.g., Balanced view, Environmental focus, Economic perspective', hint: 'From what angle should the topic be analyzed?' },
    ],
  },
  creative: {
    fields: [
      { id: 'type', label: 'Creative Type', placeholder: 'e.g., Short story, Poem, Song lyrics, Character description, World-building', hint: 'What type of creative content do you want?', required: true },
      { id: 'theme', label: 'Theme or Concept', placeholder: 'e.g., A detective story set in a cyberpunk city, A poem about nostalgia', hint: 'What\'s the core idea or theme?', required: true },
      { id: 'mood', label: 'Mood & Atmosphere', placeholder: 'e.g., Dark and mysterious, Lighthearted, Whimsical, Intense, Melancholic', hint: 'What emotion should the creative work evoke?' },
      { id: 'style', label: 'Style Inspiration', placeholder: 'e.g., Write like Neil Gaiman, In the style of Studio Ghibli, Minimalist prose', hint: 'Any stylistic references? This gives the AI a creative direction.' },
      { id: 'elements', label: 'Key Elements', placeholder: 'e.g., Include a plot twist, Use vivid imagery, Feature a mentor character', hint: 'Specific elements that must appear in the creative work.' },
      { id: 'constraints', label: 'Constraints', placeholder: 'e.g., Under 1000 words, No violence, Keep it appropriate for all ages', hint: 'Any restrictions on content, length, or style?' },
    ],
  },
  business: {
    fields: [
      { id: 'task', label: 'Business Task', placeholder: 'e.g., Write a project proposal, Create meeting agenda, Draft investor pitch', hint: 'What professional document or task do you need help with?', required: true },
      { id: 'context', label: 'Business Context', placeholder: 'e.g., SaaS startup seeking Series A, Marketing department quarterly review', hint: 'What\'s the business situation? This helps the AI use appropriate language.' },
      { id: 'audience', label: 'Target Audience', placeholder: 'e.g., C-suite executives, Potential investors, Team members, Clients', hint: 'Who will receive this? The AI adapts formality and detail level.' },
      { id: 'keyInfo', label: 'Key Information', placeholder: 'e.g., Revenue grew 40% YoY, Team of 15 engineers, Launching in Q2', hint: 'What specific data, facts, or details should be included?' },
      { id: 'tone', label: 'Professional Tone', placeholder: 'e.g., Formal, Confident, Collaborative, Data-driven, Visionary', hint: 'What professional tone is appropriate for this context?' },
      { id: 'format', label: 'Output Format', placeholder: 'e.g., One-page memo, Slide deck outline, Email format, Report with sections', hint: 'How should the output be structured?' },
    ],
  },
  brainstorm: {
    fields: [
      { id: 'challenge', label: 'Challenge or Problem', placeholder: 'e.g., How can we reduce customer churn? Name ideas for a bakery app', hint: 'What problem are you trying to solve or what do you need ideas for?', required: true },
      { id: 'domain', label: 'Domain or Field', placeholder: 'e.g., Mobile app design, Restaurant business, Education technology', hint: 'What field or industry is this related to?' },
      { id: 'constraints', label: 'Constraints', placeholder: 'e.g., Budget under $1000, Must be implementable in 2 weeks, For teenagers', hint: 'Any limitations that ideas must work within?' },
      { id: 'quantity', label: 'Number of Ideas', placeholder: 'e.g., Give me 10 ideas, Top 5 creative solutions, 3 unconventional approaches', hint: 'How many ideas do you want? Asking for more encourages creative variety.' },
      { id: 'style', label: 'Brainstorming Style', placeholder: 'e.g., Wild and unconventional, Practical and actionable, Mix of both', hint: 'Should the ideas be practical or creative? This shapes the brainstorming approach.' },
      { id: 'existing', label: 'What\'s Already Been Tried', placeholder: 'e.g., We\'ve tried social media ads and email campaigns', hint: 'What approaches have already been tried? This helps the AI suggest fresh ideas.' },
    ],
  },
};

export default categoryFields;
