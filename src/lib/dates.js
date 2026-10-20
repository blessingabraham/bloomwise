const pad = (n) => String(n).padStart(2, '0')

export const toISO = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
export const todayISO = () => toISO(new Date())

/** Day 1 is the start date. */
export function dayNumber(startISO) {
  if (!startISO) return 1
  const ms = new Date(todayISO()) - new Date(startISO)
  return Math.max(1, Math.floor(ms / 864e5) + 1)
}

export function addDays(iso, delta) {
  const d = new Date(iso + 'T00:00:00')
  d.setDate(d.getDate() + delta)
  return toISO(d)
}

export const formatDate = (iso) =>
  new Date(iso + 'T00:00:00').toLocaleDateString(undefined, { day: 'numeric', month: 'short' })
