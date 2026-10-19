import { useEffect, useState } from 'react'
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
    <main>
      <h1>Losowanie</h1>
      <p className="muted">
        Wyniki z wybranego dnia z co najmniej {DRAW_MIN_SCORE}/{QUIZ_LENGTH} pkt.
      </p>

      <label htmlFor="day">Dzień</label>
      <input id="day" type="date" value={day} onChange={(e) => setDay(e.target.value)} />

      {loading && <p className="muted">Ładowanie…</p>}
      {error && <p className="error">{error}</p>}

      {!loading && !error && (
        <>
          <p>Kwalifikujące się wyniki: {results.length}</p>
          <button onClick={draw} disabled={results.length === 0}>
            {winner ? 'Losuj ponownie' : 'Losuj'}
          </button>
          <button onClick={() => load(day)}>Odśwież</button>

          {winner && (
            <div className="winner">
              <p className="muted">Zwycięzca</p>
              <h2>{winner.nick}</h2>
              <p>
                {winner.score}/{winner.total} pkt
                {winner.createdAt && ` · ${winner.createdAt.toDate().toLocaleTimeString('pl-PL')}`}
              </p>
            </div>
          )}

          {results.length > 0 && (
            <ul className="results">
              {results.map((r) => (
                <li key={r.id} className={r.id === winner?.id ? 'highlight' : undefined}>
                  {r.nick} — {r.score}/{r.total}
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </main>
  )
}
