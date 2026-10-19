import bank from '../data/questions.json'

export type Question = {
  id: string
  question: string
  answers: string[]
  correct: number
}

const allQuestions = bank as Question[]

/** Fisher–Yates shuffle, returns a new array. */
function shuffle<T>(items: T[]): T[] {
  const a = [...items]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function drawQuestions(count: number): Question[] {
  return shuffle(allQuestions).slice(0, count)
}
