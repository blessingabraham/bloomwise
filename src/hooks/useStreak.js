import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { addDays, todayISO } from '../lib/dates'
import { DAY_COUNTS_AT } from '../lib/plan'

/** Consecutive days (ending today or yesterday) with enough tasks done. */
export function useStreak(userId, doneToday) {
  const [streak, setStreak] = useState(0)

  useEffect(() => {
    let active = true
    const since = addDays(todayISO(), -120)
    supabase.from('daily_progress').select('progress_date').eq('user_id', userId).eq('done', true).gte('progress_date', since)
      .then(({ data }) => {
        if (!active || !data) return
        const counts = {}
        data.forEach((r) => { counts[r.progress_date] = (counts[r.progress_date] || 0) + 1 })
        const ok = (d) => (counts[d] || 0) >= DAY_COUNTS_AT
        let day = todayISO()
        if (!ok(day)) day = addDays(day, -1)
        let n = 0
        while (ok(day)) { n++; day = addDays(day, -1) }
        setStreak(n)
      })
    return () => { active = false }
  }, [userId, doneToday])

  return streak
}
