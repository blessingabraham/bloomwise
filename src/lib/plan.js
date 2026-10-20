import { BEDTIME_PROMPTS } from './content'

const SPLITS = { 30: [10, 15, 5], 60: [15, 35, 10], 90: [20, 50, 15], 120: [25, 70, 15], 180: [30, 110, 20] }

const SLOTS = {
  fixed: ['Before work · 7:00', 'After work · 19:30', 'Evening · 20:30', 'Before bed · 22:00'],
  shift: ['After waking up', 'Before your shift', 'After your shift', 'Before sleep'],
  flex: ['Morning · 9:00', 'Afternoon · 15:00', 'Evening · 18:00', 'Before bed · 22:00'],
}

/** Build the four daily blocks from the person’s onboarding answers. */
export function buildPlan({ schedule = 'flex', daily_minutes = 60, focus = 'both' } = {}) {
  let [speak, code, reflect] = SPLITS[daily_minutes] || SPLITS[60]
  if (daily_minutes > 30) {
    if (focus === 'speak') { speak += 5; code -= 5 }
    if (focus === 'tech') { speak -= 5; code += 5 }
  }
  const morning = Math.max(5, Math.round(speak / 3))
  const evening = Math.max(5, speak - morning)
  const t = SLOTS[schedule] || SLOTS.flex

  return [
    { id: 'm', name: 'Train your mind', time: t[0], minutes: morning, items: ['Read one or two pages of a book or article', 'Write down one thing you learned', 'Speak aloud for two minutes about your plans for the day'] },
    { id: 'e', name: 'Train your communication', time: t[1], minutes: evening, items: ['Learn three useful words or expressions', 'Write a short paragraph about a topic', 'Explain the topic aloud without reading it', 'Record yourself (twice a week) and listen back'] },
    { id: 's', name: 'Train your technical ability', time: t[2], minutes: code, items: ['Review what you learned previously', 'Learn one small C# concept', 'Write code yourself, don’t just watch', 'Fix one error or finish one exercise'] },
    { id: 'b', name: 'Reflect without judging', time: t[3], minutes: reflect, items: BEDTIME_PROMPTS.map((p) => p[1]) },
  ]
}

/** The 30-minute minimum for difficult days. */
export const MINIMUM_PLAN = [
  { id: 'x1', name: 'Speak', minutes: 10, items: ['Speak aloud for 10 minutes, or explain the code you wrote'] },
  { id: 'x2', name: 'Code', minutes: 15, items: ['One small C# exercise, written by you'] },
  { id: 'x3', name: 'Reflect', minutes: 5, items: ['Answer: what I learned, what was difficult, what I’ll do tomorrow'] },
]

export const DAY_COUNTS_AT = 3 // tasks done for a day to count toward the streak
