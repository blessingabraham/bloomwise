import { useEffect, useRef, useState } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'
import { useDebouncedSave } from '../hooks/useDebouncedSave'
import { FRAMEWORK, SPEAK_TOPICS } from '../lib/content'
import { todayISO } from '../lib/dates'
import { PageHead } from '../components/ui'

const EMPTY = { point: '', reason: '', example: '', conclusion: '' }

export default function Speak() {
  const { user } = useAuth()
  const [draft, setDraft] = useState(EMPTY)
  const [vocab, setVocab] = useState('')
  const [ready, setReady] = useState(false)
  const [topic, setTopic] = useState('')
  const [left, setLeft] = useState(null)
  const timer = useRef(null)
  const date = todayISO()

  useEffect(() => {
    Promise.all([
      supabase.from('speaking_drafts').select('point,reason,example,conclusion').eq('user_id', user.id).maybeSingle(),
      supabase.from('vocab_logs').select('words').eq('user_id', user.id).eq('log_date', date).maybeSingle(),
    ]).then(([d, v]) => {
      if (d.data) setDraft(d.data)
      if (v.data) setVocab(v.data.words)
      setReady(true)
    })
    return () => clearInterval(timer.current)
  }, [user.id, date])

  useDebouncedSave(draft, (value) =>
    supabase.from('speaking_drafts').upsert({ user_id: user.id, ...value, updated_at: new Date().toISOString() }), ready)
  useDebouncedSave(vocab, (words) =>
    supabase.from('vocab_logs').upsert({ user_id: user.id, log_date: date, words }), ready)

  const startTimer = () => {
    clearInterval(timer.current)
    setLeft(120)
    timer.current = setInterval(() => setLeft((s) => {
      if (s <= 1) { clearInterval(timer.current); return 0 }
      return s - 1
    }), 1000)
  }

  const joined = FRAMEWORK.map(([k]) => draft[k].trim()).filter(Boolean).join(' ')
  const clock = left === null ? '2:00' : left === 0 ? '✓ Well done' : `${Math.floor(left / 60)}:${String(left % 60).padStart(2, '0')}`

  return (
    <>
      <PageHead eyebrow="Communication" title="Speak clearly" text="Fluency is organizing your thoughts, not big grammar or speed." />
      <div className="grid">
        <section className="card static">
          <h2>Point, reason, example, conclusion</h2>
          {FRAMEWORK.map(([key, label, hint], i) => (
            <div key={key}>
              <label className="fl" htmlFor={key}><em>{i + 1}</em> {label}: {hint}</label>
              <textarea id={key} value={draft[key]} onChange={(e) => setDraft({ ...draft, [key]: e.target.value })} />
            </div>
          ))}
          <h3 className="mt">Your answer</h3>
          <div className="preview">{joined || 'Your four parts will join here as one organised answer.'}</div>
        </section>

        <section className="card static">
          <h2>Two-minute speaking round</h2>
          <p className="muted">{topic ? `Topic: ${topic}` : 'Choose a topic, then speak. Finish your thought before fixing grammar.'}</p>
          <div className="timer" aria-live="polite">{clock}</div>
          <div className="row centered">
            <button className="btn" onClick={startTimer}>{left === null ? 'Start' : 'Restart'}</button>
            <button className="btn secondary" onClick={() => setTopic(SPEAK_TOPICS[Math.floor(Math.random() * SPEAK_TOPICS.length)])}>New topic</button>
          </div>
          <p className="meta mt">Afterwards, listen back and choose just one thing to improve.</p>
          <h3 className="mt">Three words today</h3>
          <label className="fl" htmlFor="vocab">Use each one in a sentence of your own</label>
          <textarea id="vocab" value={vocab} onChange={(e) => setVocab(e.target.value)} />
        </section>
      </div>
    </>
  )
}
