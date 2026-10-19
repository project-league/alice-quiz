import ArrowIcon from './ArrowIcon'
import Screen from './Screen'

const INSTAGRAM_URL = 'https://www.instagram.com/glitch.space/'

type Props = {
  nick: string
  score: number
  total: number
  saveFailed: boolean
  onRetrySave: () => void
}

function verdict(score: number, total: number) {
  const ratio = score / total
  if (ratio >= 0.9)
    return { title: 'Władasz', accent: 'Krainą Czarów', text: 'perfekcyjnie — szaleństwo nie ma przed Tobą tajemnic.' }
  if (ratio >= 0.7)
    return { title: 'Kroczysz pewnie', accent: 'przez Krainę', text: 'świetnie — niewiele ścieżek tej krainy jest Ci obcych.' }
  if (ratio >= 0.4)
    return {
      title: 'Słyszysz szept',
      accent: 'Krainy Czarów',
      text: 'nieźle — pamięć bywa zdradliwa, ale wciąż prowadzi Cię właściwym tropem.',
    }
  return { title: 'Gubisz się', accent: 'w Krainie Czarów', text: 'Kraina potrafi zmylić — może czas na kolejną wizytę?' }
}

export default function ResultScreen({ nick, score, total, saveFailed, onRetrySave }: Props) {
  const v = verdict(score, total)

  return (
    <Screen className="result">
      <div className="score-ring">
        <span className="score-value">
          {score}/{total}
        </span>
        <span className="score-label">Twój wynik</span>
      </div>

      <h1 className="display result-title">
        {v.title} <em>{v.accent}</em>
      </h1>
      <p className="lead">
        <strong>{nick}</strong>, {v.text}
      </p>

      <hr className="divider" />

      <p className="lead">
        Wieczorem odbędzie się <span className="highlight">losowanie nagrody</span> wśród najlepszych wyników.
        Sprawdź Stories profilu Glitch Space, żeby nie przegapić wyniku.
      </p>

      {saveFailed && (
        <p className="save-error">
          Nie udało się zapisać wyniku.{' '}
          <button type="button" className="link-button" onClick={onRetrySave}>
            Spróbuj ponownie
          </button>
        </p>
      )}

      <a className="btn-primary" href={INSTAGRAM_URL} target="_blank" rel="noreferrer">
        Przejdź na Instagram <ArrowIcon />
      </a>
    </Screen>
  )
}
