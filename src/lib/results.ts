import { addDoc, collection, getDocs, query, serverTimestamp, where, type Timestamp } from 'firebase/firestore'
import { db } from './firebase'

export const QUIZ_LENGTH = 10
export const DRAW_MIN_SCORE = 7

export type QuizResult = {
  id: string
  nick: string
  score: number
  total: number
  day: string
  createdAt: Timestamp | null
}

const results = collection(db, 'results')

/** Calendar day (YYYY-MM-DD) in Polish time, so "today" doesn't flip at UTC midnight. */
export function dayKey(date = new Date()): string {
  return new Intl.DateTimeFormat('sv-SE', { timeZone: 'Europe/Warsaw' }).format(date)
}

export async function saveResult(nick: string, score: number, total: number) {
  await addDoc(results, {
    nick,
    score,
    total,
    day: dayKey(),
    createdAt: serverTimestamp(),
  })
}

/** Results for a given day with at least DRAW_MIN_SCORE points. */
export async function getEligibleResults(day: string): Promise<QuizResult[]> {
  // Filter by score client-side: equality + range on different fields would need a composite index.
  const snap = await getDocs(query(results, where('day', '==', day)))
  return snap.docs
    .map((d) => ({ id: d.id, ...d.data() }) as QuizResult)
    .filter((r) => r.score >= DRAW_MIN_SCORE)
    .sort((a, b) => (a.createdAt?.toMillis() ?? 0) - (b.createdAt?.toMillis() ?? 0))
}
