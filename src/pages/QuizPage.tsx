import { useState } from 'react'
import QuestionScreen from '../components/QuestionScreen'
import ResultScreen from '../components/ResultScreen'
import StartScreen from '../components/StartScreen'
import { drawQuestions, type Question } from '../lib/questions'
import { QUIZ_LENGTH, saveResult } from '../lib/results'

type Stage = 'start' | 'quiz' | 'done'

export default function QuizPage() {
  const [stage, setStage] = useState<Stage>('start')
  const [nick, setNick] = useState('')
  const [questions, setQuestions] = useState<Question[]>([])
  const [index, setIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [saveFailed, setSaveFailed] = useState(false)

  function start(name: string) {
    setNick(name)
    setQuestions(drawQuestions(QUIZ_LENGTH))
    setIndex(0)
    setScore(0)
    setStage('quiz')
  }

  async function finish(finalScore: number) {
    setStage('done')
    setSaveFailed(false)
    try {
      await saveResult(nick, finalScore, questions.length)
    } catch (err) {
      console.error(err)
      setSaveFailed(true)
    }
  }

  function answer(choice: number) {
    const nextScore = score + (choice === questions[index].correct ? 1 : 0)
    setScore(nextScore)
    window.scrollTo(0, 0)
    if (index + 1 < questions.length) setIndex(index + 1)
    else finish(nextScore)
  }

  if (stage === 'start') return <StartScreen onStart={start} />

  if (stage === 'quiz') {
    return (
      <QuestionScreen
        key={index}
        question={questions[index]}
        number={index + 1}
        total={questions.length}
        onAnswer={answer}
      />
    )
  }

  return (
    <ResultScreen
      nick={nick}
      score={score}
      total={questions.length}
      saveFailed={saveFailed}
      onRetrySave={() => finish(score)}
    />
  )
}
