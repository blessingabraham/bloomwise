import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_ANON_KEY

export const isConfigured = Boolean(url && key)

// A placeholder keeps the app from crashing before .env is filled in;
// App.jsx shows a setup notice instead.
export const supabase = createClient(url || 'http://localhost', key || 'missing-key')
