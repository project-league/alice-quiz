import { useState, type FormEvent } from 'react'
import { QUIZ_LENGTH } from '../lib/results'
import ArrowIcon from './ArrowIcon'
import Screen from './Screen'

export default function StartScreen({ onStart }: { onStart: (nick: string) => void }) {
  const [nick, setNick] = useState('')

  function submit(e: FormEvent) {
    e.preventDefault()
    if (nick.trim()) onStart(nick.trim())
  }

  return (
    <Screen className="start">
      <p className="eyebrow">
        <span className="eyebrow-line" />
        Quiz · {QUIZ_LENGTH} pytań
      </p>
      <h1 className="display">
        Sprawdź jak dobrze znasz świat z gry <em>Alice: Madness Returns.</em>
      </h1>
      <p className="lead">Najlepsze wyniki wezmą udział w wieczornym losowaniu.</p>

      <form onSubmit={submit} className="start-form">
        <label htmlFor="nick" className="field-label">
          Twój nick lub nazwa z Instagrama
        </label>
        <p className="field-hint">Użyjemy go, żeby oznaczyć Cię w przypadku wygranej.</p>
        <div className="field">
          <span className="field-chevron" aria-hidden>›</span>
          <input
            id="nick"
            value={nick}
            onChange={(e) => setNick(e.target.value)}
            placeholder="Wpisz nick lub @nazwę"
            maxLength={30}
            autoComplete="off"
            autoCapitalize="off"
            required
          />
          <span className="field-chevron" aria-hidden>‹</span>
        </div>
        <button type="submit" className="btn-primary">
          Rozpocznij quiz <ArrowIcon />
        </button>
      </form>
    </Screen>
  )
}
