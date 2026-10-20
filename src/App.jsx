import { Navigate, Route, Routes } from 'react-router-dom'
import { isConfigured } from './lib/supabase'
import { useAuth } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Layout from './components/Layout'
import Auth from './pages/Auth'
import Onboarding from './pages/Onboarding'
import Today from './pages/Today'
import Week from './pages/Week'
import Speak from './pages/Speak'
import Journal from './pages/Journal'
import Roadmap from './pages/Roadmap'
import Logo from './components/Logo'

function SetupNotice() {
  return (
    <main className="gate">
      <div className="card static setup">
        <Logo />
        <h1>Connect Supabase</h1>
        <p>Copy <code>.env.example</code> to <code>.env</code>, add your project URL and anon key, then restart <code>npm run dev</code>. Run <code>supabase/schema.sql</code> in the Supabase SQL editor first.</p>
      </div>
    </main>
  )
}

export default function App() {
  const { session } = useAuth()
  if (!isConfigured) return <SetupNotice />

  return (
    <Routes>
      <Route path="/auth" element={session ? <Navigate to="/" replace /> : <Auth />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/onboarding" element={<Onboarding />} />
        <Route element={<Layout />}>
          <Route index element={<Today />} />
          <Route path="week" element={<Week />} />
          <Route path="speak" element={<Speak />} />
          <Route path="journal" element={<Journal />} />
          <Route path="roadmap" element={<Roadmap />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
