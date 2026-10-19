import { useState, type FormEvent } from 'react'
import { drawQuestions, type Question } from '../lib/questions'
import { QUIZ_LENGTH, saveResult } from '../lib/results'

type Stage = 'start' | 'quiz' | 'done'
type SaveState = 'saving' | 'saved' | 'error'

export default function QuizPage() {
  const [stage, setStage] = useState<Stage>('start')
  const [nick, setNick] = useState('')
  const [questions, setQuestions] = useState<Question[]>([])
  const [index, setIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [saveState, setSaveState] = useState<SaveState>('saving')

  function start(e: FormEvent) {
    e.preventDefault()
    setQuestions(drawQuestions(QUIZ_LENGTH))
    setIndex(0)
    setScore(0)
    setStage('quiz')
  }

  async function finish(finalScore: number) {
    setStage('done')
    setSaveState('saving')
    try {
      await saveResult(nick.trim(), finalScore, questions.length)
      setSaveState('saved')
    } catch (err) {
      console.error(err)
      setSaveState('error')
    }
  }

  function answer(choice: number) {
    const nextScore = score + (choice === questions[index].correct ? 1 : 0)
    setScore(nextScore)
    if (index + 1 < questions.length) setIndex(index + 1)
    else finish(nextScore)
  }

  if (stage === 'start') {
    return (
      <main>
        <h1>Alice Madness Quiz</h1>
        <p>{QUIZ_LENGTH} losowych pytań. Wpisz nick i zaczynamy.</p>
        <form onSubmit={start}>
          <label htmlFor="nick">Nick</label>
          <input
            id="nick"
            value={nick}
            onChange={(e) => setNick(e.target.value)}
            maxLength={30}
            required
            autoFocus
          />
          <button type="submit" disabled={!nick.trim()}>
            Start
          </button>
        </form>
      </main>
    )
  }

  if (stage === 'quiz') {
    const q = questions[index]
    return (
      <main>
        <p className="muted">
          Pytanie {index + 1} / {questions.length}
        </p>
        <h2>{q.question}</h2>
        <div className="answers">
          {q.answers.map((a, i) => (
            <button key={i} onClick={() => answer(i)}>
              {a}
            </button>
          ))}
        </div>
      </main>
    )
  }

  return (
    <main>
      <h1>
        {score} / {questions.length}
      </h1>
      <p>Dzięki, {nick.trim()}!</p>
      {saveState === 'saving' && <p className="muted">Zapisywanie wyniku…</p>}
      {saveState === 'saved' && <p className="muted">Wynik zapisany.</p>}
      {saveState === 'error' && (
        <p className="error">
          Nie udało się zapisać wyniku.{' '}
          <button onClick={() => finish(score)}>Spróbuj ponownie</button>
        </p>
      )}
      <button onClick={() => setStage('start')}>Zagraj jeszcze raz</button>
    </main>
  )
}
