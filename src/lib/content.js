// All copy from the 30-day plan lives here so pages stay presentational.

export const WEEK_ONE = [
  ['Introduce yourself and explain your goals for the next year.', 'Complete your C# “About Me” console program.', 'What do I want to change, and why?'],
  ['Explain what a variable is as if teaching a beginner.', 'Practise variables, data types, and output.', 'What was difficult for me today?'],
  ['Describe something that made you happy or frustrated.', 'Practise if/else statements with real examples.', 'How did I communicate my feelings?'],
  ['Explain the difference between a class and a method in simple language.', 'Practise calling methods and creating a class.', 'What can I explain better now?'],
  ['Give your opinion on a topic and support it with reasons.', 'Build a small program using methods and conditions.', 'Where did I hesitate, and what helped?'],
  ['Record a three-minute explanation of something you learned.', 'Review the week’s code and fix one bug independently.', 'What progress can I prove?'],
  ['Summarize your week without reading notes.', 'Redo one exercise from memory, then rest.', 'What should I repeat or improve next week?'],
]

export const SPEAK_TOPICS = [
  'What I learned today',
  'Something I disagree with and why',
  'A problem I want to solve',
  'What confidence means to me',
  'How a particular technology works',
  'Something I wish people understood about me',
]

export const FEELING_PROMPTS = [
  ['felt', 'Today, I felt … because …'],
  ['wanted', 'What I wanted to say was …'],
  ['needed', 'What I needed at that moment was …'],
  ['next', 'Next time, I can communicate this by saying …'],
]

export const BEDTIME_PROMPTS = [
  ['learned', 'What did I learn today?'],
  ['difficult', 'What did I find difficult?'],
  ['tomorrow', 'What is one thing I will do tomorrow?'],
]

export const FRAMEWORK = [
  ['point', 'Point', 'State your main idea.'],
  ['reason', 'Reason', 'Explain why you think so.'],
  ['example', 'Example', 'Give an example that makes your point understandable.'],
  ['conclusion', 'Conclusion', 'Summarize what you want the listener to understand.'],
]

export const MONTHS = [
  ['C# foundation', 'Variables, data types, conditions, loops, methods, classes, objects, lists, and debugging. Build small console programs and understand your own code.'],
  ['Build programs properly', 'Object-oriented programming, collections, error handling, and working with data. Build a small student or expense management application.'],
  ['Begin backend development', 'ASP.NET Core Web API, HTTP, REST APIs, and SQL/database fundamentals. Build and test a simple API.'],
]

export const RULES = [
  'Stop comparing your beginning to someone else’s middle. Learn from them without using their progress to punish yourself.',
  'Don’t abandon a skill because it becomes difficult. Debugging, confusion, and asking questions are normal parts of programming.',
  'Create evidence of progress: save your code, keep your journal, and record yourself speaking.',
  'Don’t wait to feel confident before practising. Confidence often follows repeated experience.',
  'Rest without guilt. A sustainable routine will take you further than an intense one you abandon after four days.',
]

export const ONBOARDING = [
  { key: 'schedule', question: 'What does your typical day look like?', options: [['fixed', 'Work or fixed daytime responsibilities'], ['shift', 'Evening or overnight shifts'], ['flex', 'Mostly flexible']] },
  { key: 'daily_minutes', question: 'How much time can you realistically commit each day?', options: [[30, '30 minutes'], [60, '1 hour'], [90, '1.5 hours'], [120, '2 hours'], [180, '3 hours']] },
  { key: 'focus', question: 'Which area feels most urgent?', options: [['both', 'Both'], ['speak', 'Speaking and expressing myself'], ['tech', 'C# and backend development']] },
]
