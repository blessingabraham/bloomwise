import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { ONBOARDING } from '../lib/content'
import { todayISO } from '../lib/dates'
import { LogoMark } from '../components/Logo'
import { ErrorNote } from '../components/ui'

export default function Onboarding() {
  const { profile, saveProfile } = useAuth()
  const navigate = useNavigate()
  const editing = Boolean(profile)
  const [step, setStep] = useState(0) // 0 = name, 1..3 = questions
  const [values, setValues] = useState({
    display_name: profile?.display_name || '',
    schedule: profile?.schedule,
    daily_minutes: profile?.daily_minutes,
    focus: profile?.focus,
  })
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const q = step > 0 ? ONBOARDING[step - 1] : null

  const next = async () => {
    setError('')
    if (step === 0 && !values.display_name.trim()) return setError('Enter your name to begin.')
    if (q && values[q.key] === undefined) return setError('Choose one option to continue.')
    if (step < ONBOARDING.length) return setStep(step + 1)
    setBusy(true)
    const { error: err } = await saveProfile({
      display_name: values.display_name.trim(),
      schedule: values.schedule,
      daily_minutes: values.daily_minutes,
      focus: values.focus,
      start_date: profile?.start_date || todayISO(),
      hard_mode: profile?.hard_mode || false,
    })
    setBusy(false)
    if (err) return setError(err.message)
    navigate('/', { replace: true })
  }

  return (
    <main className="gate">
      <div className="glass-card">
        <div className="badge"><div className="ring"><LogoMark size={44} /></div></div>
        <div className="eyebrow">{step === 0 ? (editing ? 'Edit your plan' : 'Welcome') : `Step ${step} of ${ONBOARDING.length}`}</div>
        {step === 0 ? (
          <>
            <h1>What should we call you?</h1>
            <label className="pill">
              <span>Name</span>
              <input value={values.display_name} maxLength={30} autoFocus onChange={(e) => setValues({ ...values, display_name: e.target.value })} onKeyDown={(e) => e.key === 'Enter' && next()} />
            </label>
          </>
        ) : (
          <>
            <h2>{q.question}</h2>
            <div className="chips">
              {q.options.map(([val, label]) => (
                <button key={val} type="button" className="chip" aria-pressed={values[q.key] === val} onClick={() => setValues({ ...values, [q.key]: val })}>{label}</button>
              ))}
            </div>
          </>
        )}
        <ErrorNote message={error} />
        <div className="row mt">
          <button className="btn" onClick={next} disabled={busy}>{step === ONBOARDING.length ? (busy ? 'Saving…' : 'Build my timetable') : 'Continue'}</button>
          {step > 0 && <button className="btn ghost" onClick={() => setStep(step - 1)}>Back</button>}
          {editing && step === 0 && <button className="btn ghost" onClick={() => navigate('/')}>Cancel</button>}
        </div>
      </div>
    </main>
  )
}
