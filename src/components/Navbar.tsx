import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router'
import logo from '../assets/afiap-logo.png'
import { useAuth } from '../hooks/useAuth'

const navItems = [
  { to: '/', end: true, label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/afiap-learn', label: 'AFIAP Learn' },
  { to: '/faq', label: 'FAQ' },
  { to: '/contact', label: 'Contact' },
]

const desktopLinkClass = ({ isActive }: { isActive: boolean }) =>
  `text-sm font-semibold transition-colors ${
    isActive ? 'text-blue-800' : 'text-slate-700 hover:text-blue-800'
  }`

const mobileLinkClass = ({ isActive }: { isActive: boolean }) =>
  `block rounded-xl px-4 py-3.5 text-base font-semibold transition ${
    isActive
      ? 'bg-blue-800 text-white shadow-sm'
      : 'bg-[#f4f7fc] text-[#0a1628] hover:bg-blue-50'
  }`

const Navbar = () => {
  const { user } = useAuth()
  const [mobileOpen, setMobileOpen] = useState(false)
  const closeMobile = () => setMobileOpen(false)

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  return (
    <header className="sticky top-0 z-50 border-b border-blue-100 bg-white">
      <div className="mx-auto flex h-[72px] max-w-[1170px] items-center justify-between gap-3 px-4 sm:h-[84px] sm:gap-4 sm:px-5 lg:px-6">
        <Link to="/" onClick={closeMobile} className="flex min-w-0 shrink items-center">
          <img
            src={logo}
            alt="AFIAP — Azerbaijan's First IT Assistance Platform"
            className="h-10 w-auto max-w-[10.5rem] object-contain object-left sm:h-12 sm:max-w-[14rem] lg:h-14 lg:max-w-[17rem]"
          />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.end} className={desktopLinkClass}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          {user ? (
            <Link to="/account" className="btn-primary !px-5 !py-2.5">
              Account center
            </Link>
          ) : (
            <>
              <Link to="/login" className="btn-outline !px-5 !py-2.5">Log in</Link>
              <Link to="/signup" className="btn-primary !px-5 !py-2.5">Sign up</Link>
            </>
          )}
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen((open) => !open)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-blue-100 bg-[#f4f7fc] text-[#0a1628] transition hover:border-blue-200 hover:bg-blue-50 lg:hidden"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
            {mobileOpen ? <path d="M18 6 6 18M6 6l12 12" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 top-[72px] z-40 sm:top-[84px] lg:hidden">
          <button
            type="button"
            aria-label="Close menu overlay"
            className="absolute inset-0 bg-[#0a1628]/40 backdrop-blur-[1px]"
            onClick={closeMobile}
          />

          <div className="relative max-h-[calc(100vh-72px)] overflow-y-auto border-t border-blue-100 bg-white px-4 py-5 shadow-lg sm:max-h-[calc(100vh-84px)] sm:px-5">
            <div className="mb-4">
              <p className="text-xs font-bold uppercase tracking-widest text-blue-700">Menu</p>
              {user && (
                <p className="mt-1 text-sm font-semibold text-slate-700">
                  Signed in as {user.name} {user.surname}
                </p>
              )}
            </div>

            <nav className="grid gap-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  onClick={closeMobile}
                  className={mobileLinkClass}
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>

            <div className="mt-5 border-t border-blue-100 pt-5">
              {user ? (
                <Link to="/account" onClick={closeMobile} className="btn-primary w-full justify-center">
                  Account center
                </Link>
              ) : (
                <div className="grid gap-3">
                  <Link to="/login" onClick={closeMobile} className="btn-outline w-full justify-center">
                    Log in
                  </Link>
                  <Link to="/signup" onClick={closeMobile} className="btn-primary w-full justify-center">
                    Sign up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar
