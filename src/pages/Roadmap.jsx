import { MONTHS, RULES } from '../lib/content'
import { PageHead } from '../components/ui'

export default function Roadmap() {
  return (
    <>
      <PageHead eyebrow="90 days, one path" title="C# and backend roadmap" text="Learning milestones, not deadlines. Move on when you can explain and practise the concepts." />
      <div className="grid">
        {MONTHS.map(([title, text], i) => (
          <article className="card" key={title}>
            <span className="tag p">Month {i + 1}</span>
            <h2 className="mt">{title}</h2>
            <p className="muted">{text}</p>
          </article>
        ))}
      </div>
      <section className="card static mt">
        <h2>Learn a little. Write code. Explain what you wrote. Fix your mistakes. Repeat.</h2>
      </section>
      <section className="card static mt">
        <h2>Your rules for the next 30 days</h2>
        <ol className="steps">{RULES.map((r) => <li key={r}>{r}</li>)}</ol>
      </section>
      <blockquote className="quote">
        You do not need to become a completely different woman to deserve a good future. We are building skills, not trying to prove that you are good enough as a person.
      </blockquote>
    </>
  )
}
