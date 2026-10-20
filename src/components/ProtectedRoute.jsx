import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

/** Requires a session; sends brand-new users to onboarding first. */
export default function ProtectedRoute() {
  const { session, profile, loading } = useAuth()
  const { pathname } = useLocation()
  if (loading) return <p className="center-note" role="status">Loading…</p>
  if (!session) return <Navigate to="/auth" replace />
  if (!profile && pathname !== '/onboarding') return <Navigate to="/onboarding" replace />
  return <Outlet />
}
