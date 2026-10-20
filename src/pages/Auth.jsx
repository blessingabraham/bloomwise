import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { LogoMark } from '../components/Logo'
import { ErrorNote } from '../components/ui'

export default function Auth() {
  const [mode, setMode] = useState('signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    setError(''); setNotice(''); setBusy(true)
    const creds = { email: email.trim(), password }
    const { data, error: err } = mode === 'signin'
      ? await supabase.auth.signInWithPassword(creds)
      : await supabase.auth.signUp(creds)
    setBusy(false)
    if (err) return setError(err.message)
    if (mode === 'signup' && !data.session) setNotice('Check your email to confirm your account, then sign in.')
  }

  return (
    <main className="gate">
      <div className="glass-card">
        <div className="badge">
          <div className="ring"><LogoMark size={44} /></div>
          <div className="brand">Bloomwise</div>
        </div>
        <h1 className="center">{mode === 'signin' ? 'Welcome back' : 'Start your 30 days'}</h1>
        <p className="muted center">Communication, C# and kindness to yourself, one day at a time.</p>
        <form onSubmit={submit} className="stack">
          <label className="pill">
            <span>Email</span>
            <input type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <label className="pill">
            <span>Password</span>
            <input type="password" required minLength={6} autoComplete={mode === 'signin' ? 'current-password' : 'new-password'} value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          <ErrorNote message={error} />
          {notice && <p className="ok" role="status">✓ {notice}</p>}
          <button className="btn" disabled={busy}>{busy ? 'One moment…' : mode === 'signin' ? 'Sign in' : 'Create account'}</button>
        </form>
        <button className="btn ghost wide" onClick={() => { setMode(mode === 'signin' ? 'signup' : 'signin'); setError(''); setNotice('') }}>
          {mode === 'signin' ? 'New here? Create an account' : 'Have an account? Sign in'}
        </button>
      </div>
    </main>
  )
}
