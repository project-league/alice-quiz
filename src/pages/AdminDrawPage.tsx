import { useEffect, useState } from 'react'
import ArrowIcon from '../components/ArrowIcon'
import Screen from '../components/Screen'
import { DRAW_MIN_SCORE, QUIZ_LENGTH, dayKey, getEligibleResults, type QuizResult } from '../lib/results'

export default function AdminDrawPage() {
  const [day, setDay] = useState(dayKey())
  const [results, setResults] = useState<QuizResult[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [winner, setWinner] = useState<QuizResult | null>(null)

  async function load(forDay: string) {
    setLoading(true)
    setError(null)
    setWinner(null)
    try {
      setResults(await getEligibleResults(forDay))
    } catch (err) {
      console.error(err)
      setError('Nie udało się pobrać wyników.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load(day)
  }, [day])

  function draw() {
    setWinner(results[Math.floor(Math.random() * results.length)])
  }

  return (
    <Screen>
      <p className="eyebrow">
        <span className="eyebrow-line" />
        Panel losowania
      </p>
      <h1 className="display">
        Losowanie <em>nagrody</em>
      </h1>
      <p className="lead">
        Wyniki z wybranego dnia z co najmniej {DRAW_MIN_SCORE}/{QUIZ_LENGTH} pkt.
      </p>

      <div className="admin-controls">
        <div>
          <label htmlFor="day" className="field-label">
            Dzień
          </label>
          <div className="field" style={{ marginTop: 8 }}>
            <input id="day" type="date" value={day} onChange={(e) => setDay(e.target.value)} />
          </div>
        </div>
        <button type="button" className="btn-secondary" onClick={() => load(day)}>
          Odśwież
        </button>
      </div>

      {loading && <p className="status">Ładowanie…</p>}
      {error && <p className="status error">{error}</p>}

      {!loading && !error && (
        <>
          <p className="admin-count">
            Kwalifikujące się wyniki: <strong>{results.length}</strong>
          </p>

          {winner && (
            <div className="winner" aria-live="polite">
              <span className="score-label">Zwycięzca</span>
              <p className="winner-name">{winner.nick}</p>
              <p className="winner-meta">
                {winner.score}/{winner.total} pkt
                {winner.createdAt && ` · ${winner.createdAt.toDate().toLocaleTimeString('pl-PL')}`}
              </p>
            </div>
          )}

          <button type="button" className="btn-primary" onClick={draw} disabled={results.length === 0}>
            {winner ? 'Losuj ponownie' : 'Losuj zwycięzcę'} <ArrowIcon />
          </button>

          {results.length > 0 && (
            <ul className="results-list">
              {results.map((r) => (
                <li key={r.id} className={r.id === winner?.id ? 'is-winner' : undefined}>
                  <span className="nick">{r.nick}</span>
                  <span>
                    {r.score}/{r.total}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </Screen>
  )
}
