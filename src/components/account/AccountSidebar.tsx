import { NavLink, useNavigate } from 'react-router'
import { useAuth } from '../../hooks/useAuth'

const sidebarLinkClass = ({ isActive }: { isActive: boolean }) =>
  `block rounded-xl px-4 py-3 text-sm font-semibold transition ${
    isActive
      ? 'bg-blue-800 text-white'
      : 'text-slate-700 hover:bg-[#f4f7fc] hover:text-blue-800'
  }`

const accountLinks = [
  { to: '/account/services', label: 'Services' },
  { to: '/account/learn', label: 'AFIAP Learn' },
  { to: '/account/contact', label: 'Contact AFIAP' },
  { to: '/account/ai', label: 'AFIAP AI' },
  { to: '/account/settings', label: 'Settings' },
]

const AccountSidebar = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <aside className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm lg:sticky lg:top-24 lg:p-6">
      <div className="border-b border-blue-100 pb-5">
        <p className="text-xs font-bold uppercase tracking-widest text-blue-700">Account center</p>
        <h2 className="mt-2 text-lg font-bold text-[#0a1628]">
          {user?.name} {user?.surname}
        </h2>
        <p className="mt-1 text-sm text-slate-600">{user?.email}</p>
      </div>

      <nav className="mt-5 space-y-1">
        {accountLinks.map((link) => (
          <NavLink key={link.to} to={link.to} className={sidebarLinkClass}>
            {link.label}
          </NavLink>
        ))}
      </nav>

      <button
        type="button"
        onClick={handleLogout}
        className="btn-outline mt-6 w-full !border-red-200 !text-red-700 hover:!bg-red-50"
      >
        Log out
      </button>
    </aside>
  )
}

export default AccountSidebar
