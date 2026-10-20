import { useAuth } from '../context/AuthContext'
import { useWeekChecklist } from '../hooks/useChecklist'
import { WEEK_ONE } from '../lib/content'
import { dayNumber } from '../lib/dates'
import { Checkbox, ErrorNote, PageHead, ProgressBar, Stat } from '../components/ui'

const LABELS = ['Speak', 'Tech', 'Reflect']

export default function Week() {
  const { user, profile } = useAuth()
  const { done, error, toggle, reset } = useWeekChecklist(user.id)
  const count = Object.values(done).filter(Boolean).length
  const day = dayNumber(profile.start_date)
  const current = day <= 7 ? day - 1 : -1

  return (
    <>
      <PageHead eyebrow="First seven days" title="Week 1 checklist" text="You don’t have to wait until you feel motivated to begin.">
        <Stat value={`${count} / 21`} label="tasks done" />
      </PageHead>
      <ProgressBar value={(count / 21) * 100} />
      <ErrorNote message={error} />
      <div className="grid mt">
        {WEEK_ONE.map((tasks, d) => (
          <article key={d} className={`card ${d === current ? 'now' : ''}`}>
            <h3 className="blk-h">Day {d + 1}{d === current && <span className="tag p">today</span>}</h3>
            <ul className="chk">
              {tasks.map((text, t) => (
                <Checkbox key={t} checked={done[`${d}-${t}`]} onChange={(v) => toggle(`${d}-${t}`, v)}>
                  <b>{LABELS[t]}:</b> {text}
                </Checkbox>
              ))}
            </ul>
          </article>
        ))}
      </div>
      <div className="row mt"><button className="btn secondary" onClick={reset}>Reset checklist</button></div>
    </>
  )
}
