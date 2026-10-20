export const ProgressBar = ({ value }) => (
  <div className="bar" role="progressbar" aria-valuenow={Math.round(value)} aria-valuemin={0} aria-valuemax={100}>
    <i style={{ width: `${value}%` }} />
  </div>
)

export const Stat = ({ value, label }) => (
  <div className="stat"><b>{value}</b><span>{label}</span></div>
)

export const PageHead = ({ eyebrow, title, text, children }) => (
  <div className="hero">
    <div>
      <div className="eyebrow">{eyebrow}</div>
      <h1>{title}</h1>
      {text && <p className="muted">{text}</p>}
    </div>
    {children}
  </div>
)

export const Checkbox = ({ checked, onChange, children }) => (
  <li>
    <label>
      <input type="checkbox" checked={!!checked} onChange={(e) => onChange(e.target.checked)} />
      <span>{children}</span>
    </label>
  </li>
)

export const ErrorNote = ({ message }) =>
  message ? <p className="err" role="alert">⚠ {message}</p> : null
