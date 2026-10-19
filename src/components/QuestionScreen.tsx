import { useState } from 'react'
import type { Question } from '../lib/questions'
import ArrowIcon from './ArrowIcon'
import Screen from './Screen'

type Props = {
  question: Question
  number: number
  total: number
  onAnswer: (choice: number) => void
}

const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F']

export default function QuestionScreen({ question, number, total, onAnswer }: Props) {
  const [selected, setSelected] = useState<number | null>(null)
  const percent = Math.round((number / total) * 100)
  const isLast = number === total

  return (
    <Screen className="question">
      <div className="progress-head">
        <span>
          Pytanie {number} z {total}
        </span>
        <span>{percent}%</span>
      </div>
      <div className="progress" role="progressbar" aria-valuenow={percent} aria-valuemin={0} aria-valuemax={100}>
        <div className="progress-fill" style={{ width: `${percent}%` }} />
      </div>

      <h1 className="question-title">{question.question}</h1>

      <div className="answers" role="radiogroup" aria-label="Odpowiedzi">
        {question.answers.map((answer, i) => (
          <button
            key={i}
            type="button"
            role="radio"
            aria-checked={selected === i}
            className="answer"
            onClick={() => setSelected(i)}
          >
            <span className="answer-letter">{LETTERS[i]}</span>
            <span className="answer-text">{answer}</span>
            <span className="answer-radio" />
          </button>
        ))}
      </div>

      <button
        type="button"
        className="btn-primary question-next"
        disabled={selected === null}
        onClick={() => selected !== null && onAnswer(selected)}
      >
        {isLast ? 'Zobacz wynik' : 'Następne pytanie'} <ArrowIcon />
      </button>
    </Screen>
  )
}
