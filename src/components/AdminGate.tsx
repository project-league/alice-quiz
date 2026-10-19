import { useState, type FormEvent, type ReactNode } from 'react'
import ArrowIcon from './ArrowIcon'
import Screen from './Screen'

// Weak protection only: the hash ships in the bundle and Firestore still allows reading results.
const PASSWORD_HASH = import.meta.env.VITE_ADMIN_PASSWORD_HASH as string | undefined
const STORAGE_KEY = 'admin-unlocked'

async function sha256(text: string): Promise<string> {
  const bytes = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text))
  return [...new Uint8Array(bytes)].map((b) => b.toString(16).padStart(2, '0')).join('')
}

function readUnlocked(): boolean {
  try {
    return sessionStorage.getItem(STORAGE_KEY) === PASSWORD_HASH
  } catch {
    return false
  }
}

export default function AdminGate({ children }: { children: ReactNode }) {
  const [unlocked, setUnlocked] = useState(readUnlocked)
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)

  if (unlocked) return <>{children}</>

  async function submit(e: FormEvent) {
    e.preventDefault()
    if (!PASSWORD_HASH || (await sha256(password)) !== PASSWORD_HASH) {
      setError(true)
      return
    }
    try {
      sessionStorage.setItem(STORAGE_KEY, PASSWORD_HASH)
    } catch {
      // Private mode etc. — stays unlocked until reload.
    }
    setUnlocked(true)
  }

  return (
    <Screen className="start">
      <p className="eyebrow">
        <span className="eyebrow-line" />
        Panel losowania
      </p>
      <h1 className="display">
        Dostęp <em>tylko dla organizatorów</em>
      </h1>

      <form onSubmit={submit} className="start-form">
        <label htmlFor="admin-password" className="field-label">
          Hasło
        </label>
        <div className="field" style={{ marginTop: 12 }}>
          <span className="field-chevron" aria-hidden>›</span>
          <input
            id="admin-password"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
              setError(false)
            }}
            autoComplete="current-password"
            required
          />
          <span className="field-chevron" aria-hidden>‹</span>
        </div>
        {error && (
          <p className="save-error" role="alert">
            {PASSWORD_HASH ? 'Nieprawidłowe hasło.' : 'Hasło admina nie jest skonfigurowane.'}
          </p>
        )}
        <button type="submit" className="btn-primary">
          Wejdź <ArrowIcon />
        </button>
      </form>
    </Screen>
  )
}
