import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { supabase } from '../lib/supabase'

const AuthContext = createContext(null)
export const useAuth = () => useContext(AuthContext)

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  const loadProfile = useCallback(async (userId) => {
    if (!userId) return setProfile(null)
    const { data } = await supabase.from('profiles').select('*').eq('id', userId).maybeSingle()
    setProfile(data || null)
  }, [])

  useEffect(() => {
    let active = true
    supabase.auth.getSession().then(async ({ data }) => {
      if (!active) return
      setSession(data.session)
      await loadProfile(data.session?.user.id)
      if (active) setLoading(false)
    })
    const { data: sub } = supabase.auth.onAuthStateChange((_event, next) => {
      setSession(next)
      if (!next) setProfile(null)
      else loadProfile(next.user.id)
    })
    return () => { active = false; sub.subscription.unsubscribe() }
  }, [loadProfile])

  const saveProfile = useCallback(async (values) => {
    const row = { id: session.user.id, ...values }
    const { data, error } = await supabase.from('profiles').upsert(row).select().single()
    if (!error) setProfile(data)
    return { data, error }
  }, [session])

  const value = useMemo(() => ({
    session, user: session?.user ?? null, profile, loading, saveProfile,
    signOut: () => supabase.auth.signOut(),
  }), [session, profile, loading, saveProfile])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
