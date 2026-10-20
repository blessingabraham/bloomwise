import { NavLink, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Logo from './Logo'

const TABS = [['/', 'Today'], ['/week', 'Week 1'], ['/speak', 'Speak'], ['/journal', 'Journal'], ['/roadmap', 'Roadmap']]

export default function Layout() {
  const { signOut } = useAuth()
  return (
    <div className="app">
      <header className="top">
        <Logo />
        <div className="row">
          <NavLink to="/onboarding" className="btn ghost">Edit plan</NavLink>
          <button className="btn ghost" onClick={signOut}>Sign out</button>
        </div>
      </header>
      <nav className="tabs" aria-label="Main">
        {TABS.map(([to, label]) => (
          <NavLink key={to} to={to} end={to === '/'} className={({ isActive }) => (isActive ? 'active' : '')}>{label}</NavLink>
        ))}
      </nav>
      <Outlet />
    </div>
  )
}
