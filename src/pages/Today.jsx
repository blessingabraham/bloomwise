import { useAuth } from '../context/AuthContext'
import { useDailyChecklist } from '../hooks/useChecklist'
import { useStreak } from '../hooks/useStreak'
import { buildPlan, MINIMUM_PLAN } from '../lib/plan'
import { WEEK_ONE } from '../lib/content'
import { dayNumber, todayISO } from '../lib/dates'
import { Checkbox, ErrorNote, PageHead, ProgressBar, Stat } from '../components/ui'

export default function Today() {
  const { user, profile, saveProfile } = useAuth()
  const date = todayISO()
  const { done, error, toggle } = useDailyChecklist(user.id, date)

  const hard = profile.hard_mode
  const blocks = hard ? MINIMUM_PLAN : buildPlan(profile)
  const total = blocks.reduce((n, b) => n + b.items.length, 0)
  const complete = blocks.reduce((n, b) => n + b.items.filter((_, i) => done[b.id + i]).length, 0)
  const pct = (complete / total) * 100
  const minutes = blocks.reduce((n, b) => n + b.minutes, 0)
  const streak = useStreak(user.id, complete)
  const day = dayNumber(profile.start_date)
  const [speak, tech, reflect] = WEEK_ONE[(day - 1) % 7]

  return (
    <>
      <PageHead eyebrow={`Day ${Math.min(day, 30)} of 30`} title={`Good to see you, ${profile.display_name}.`} text="Consistency matters more than a perfect routine.">
        <div className="stats">
          <Stat value={`${Math.round(pct)}%`} label="today" />
          <Stat value={streak} label="day streak" />
          <Stat value={minutes} label="minutes planned" />
        </div>
      </PageHead>

      <section className="card static gap">
        <div className="eyebrow">Today’s focus</div>
        <p><b>Speak:</b> {speak}</p>
        <p><b>Tech:</b> {tech}</p>
        <p><b>Reflect:</b> {reflect}</p>
        <ProgressBar value={pct} />
        <div className="hard">
          <button className="sw" role="switch" aria-checked={hard} aria-label="Difficult day mode" onClick={() => saveProfile({ ...profile, hard_mode: !hard })} />
          <span>Difficult day mode: {hard ? 'on, just the 30-minute minimum' : 'off'}</span>
        </div>
        <ErrorNote message={error} />
      </section>

      <div className="grid">
        {blocks.map((b) => {
          const count = b.items.filter((_, i) => done[b.id + i]).length
          const finished = count === b.items.length
          return (
            <article className="card" key={b.id}>
              <div className="blk-h">
                <h3>{b.name}</h3>
                <span className={`tag ${finished ? 's' : 'p'}`}>{finished ? '✓ done' : `${b.minutes} min`}</span>
              </div>
              {b.time && <p className="meta">{b.time}</p>}
              <ul className="chk">
                {b.items.map((text, i) => (
                  <Checkbox key={i} checked={done[b.id + i]} onChange={(v) => toggle(b.id + i, v)}>{text}</Checkbox>
                ))}
              </ul>
            </article>
          )
        })}
      </div>
      <p className="meta mt">Protect your sleep, and allow time to rest, eat, work and enjoy yourself. Your routine should support your life, not become another source of pressure.</p>
    </>
  )
}
