import { useCallback, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'
import { BEDTIME_PROMPTS, FEELING_PROMPTS } from '../lib/content'
import { formatDate, todayISO } from '../lib/dates'
import { ErrorNote, PageHead } from '../components/ui'

const blank = (prompts) => Object.fromEntries(prompts.map(([k]) => [k, '']))

export default function Journal() {
  const { user } = useAuth()
  const [feelings, setFeelings] = useState(blank(FEELING_PROMPTS))
  const [bedtime, setBedtime] = useState(blank(BEDTIME_PROMPTS))
  const [entries, setEntries] = useState([])
  const [error, setError] = useState('')
  const [saved, setSaved] = useState(false)

  const load = useCallback(async () => {
    const { data } = await supabase.from('journal_entries').select('*').eq('user_id', user.id).order('created_at', { ascending: false }).limit(8)
    setEntries(data || [])
  }, [user.id])
  useEffect(() => { load() }, [load])

  const clean = (o) => Object.fromEntries(Object.entries(o).filter(([, v]) => v.trim()).map(([k, v]) => [k, v.trim()]))

  const save = async () => {
    setError(''); setSaved(false)
    const f = clean(feelings), b = clean(bedtime)
    if (!Object.keys(f).length && !Object.keys(b).length) return setError('Write at least one answer first.')
    const { error: err } = await supabase.from('journal_entries').insert({ user_id: user.id, entry_date: todayISO(), feelings: f, bedtime: b })
    if (err) return setError(err.message)
    setFeelings(blank(FEELING_PROMPTS)); setBedtime(blank(BEDTIME_PROMPTS)); setSaved(true)
    load()
  }

  const remove = async (id) => {
    setEntries((list) => list.filter((e) => e.id !== id))
    await supabase.from('journal_entries').delete().eq('id', id)
  }

  const field = (prompts, state, set) => prompts.map(([key, label]) => (
    <div key={key}>
      <label className="fl" htmlFor={key}>{label}</label>
      <textarea id={key} className="short" value={state[key]} onChange={(e) => set({ ...state, [key]: e.target.value })} />
    </div>
  ))

  return (
    <>
      <PageHead eyebrow="Personal growth" title="Reflect without judging" text="Understand yourself without constantly criticizing yourself." />
      <div className="grid">
        <section className="card static">
          <h2>Name the feeling</h2>
          {field(FEELING_PROMPTS, feelings, setFeelings)}
          <h3 className="mt">Before bed</h3>
          {field(BEDTIME_PROMPTS, bedtime, setBedtime)}
          <ErrorNote message={error} />
          <div className="row mt">
            <button className="btn" onClick={save}>Save entry</button>
            {saved && <span className="ok" role="status">✓ Entry saved</span>}
          </div>
        </section>

        <section className="card static">
          <h2>Evidence of progress</h2>
          {entries.length === 0 && <p className="muted">Your saved entries appear here. At the end of the month, compare them with where you started.</p>}
          {entries.map((e) => (
            <article className="entry" key={e.id}>
              <div className="blk-h"><span className="tag">{formatDate(e.entry_date)}</span><button className="btn ghost" onClick={() => remove(e.id)} aria-label="Delete entry">Delete</button></div>
              {[...FEELING_PROMPTS.map((p) => [p[1], e.feelings[p[0]]]), ...BEDTIME_PROMPTS.map((p) => [p[1], e.bedtime[p[0]]])]
                .filter(([, v]) => v)
                .map(([q, v]) => <p key={q}><span className="meta">{q}</span><br />{v}</p>)}
            </article>
          ))}
        </section>
      </div>
    </>
  )
}
