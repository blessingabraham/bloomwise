import { useCallback, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

/**
 * Generic checklist persisted in Supabase with optimistic updates.
 * `scope` adds filter/insert columns, e.g. { progress_date: '2026-10-20' }.
 */
export function useChecklist({ table, userId, scope = {}, conflict }) {
  const [done, setDone] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const scopeKey = JSON.stringify(scope)

  useEffect(() => {
    let active = true
    setLoading(true)
    let q = supabase.from(table).select('task_key, done').eq('user_id', userId)
    Object.entries(scope).forEach(([k, v]) => { q = q.eq(k, v) })
    q.then(({ data, error: err }) => {
      if (!active) return
      if (err) setError(err.message)
      setDone(Object.fromEntries((data || []).map((r) => [r.task_key, r.done])))
      setLoading(false)
    })
    return () => { active = false }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [table, userId, scopeKey])

  const toggle = useCallback(async (taskKey, value) => {
    setDone((d) => ({ ...d, [taskKey]: value }))
    const { error: err } = await supabase
      .from(table)
      .upsert({ user_id: userId, ...scope, task_key: taskKey, done: value }, { onConflict: conflict })
    if (err) {
      setError(err.message)
      setDone((d) => ({ ...d, [taskKey]: !value }))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [table, userId, scopeKey, conflict])

  const reset = useCallback(async () => {
    setDone({})
    await supabase.from(table).delete().eq('user_id', userId)
  }, [table, userId])

  return { done, loading, error, toggle, reset }
}

export const useDailyChecklist = (userId, date) =>
  useChecklist({ table: 'daily_progress', userId, scope: { progress_date: date }, conflict: 'user_id,progress_date,task_key' })

export const useWeekChecklist = (userId) =>
  useChecklist({ table: 'week_progress', userId, conflict: 'user_id,task_key' })
