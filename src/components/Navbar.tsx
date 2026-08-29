import { useState } from 'react'
import { Link, NavLink } from 'react-router'
import logo from '../assets/afiap-logo.png'
import { useAuth } from '../context/AuthContext'

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `text-sm font-semibold transition-colors ${
    isActive ? 'text-blue-800' : 'text-slate-700 hover:text-blue-800'
  }`

const Navbar = () => {
  const { user } = useAuth()
  const [mobileOpen, setMobileOpen] = useState(false)
  const closeMobile = () => setMobileOpen(false)

  return (
    <header className="sticky top-0 z-50 border-b border-blue-100 bg-white">
      <div className="mx-auto flex h-[84px] max-w-[1170px] items-center justify-between gap-4 px-5 lg:px-6">
        <Link to="/" onClick={closeMobile} className="flex shrink-0 items-center">
          <img
            src={logo}
            alt="AFIAP — Azerbaijan's First IT Assistance Platform"
            className="h-11 w-auto max-w-[12rem] object-contain object-left sm:h-12 sm:max-w-[14rem] lg:h-14 lg:max-w-[17rem]"
          />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          <NavLink to="/" end className={navLinkClass}>Home</NavLink>
          <NavLink to="/about" className={navLinkClass}>About</NavLink>
          <NavLink to="/services" className={navLinkClass}>Services</NavLink>
          <NavLink to="/afiap-learn" className={navLinkClass}>AFIAP Learn</NavLink>
          <NavLink to="/faq" className={navLinkClass}>FAQ</NavLink>
          <NavLink to="/contact" className={navLinkClass}>Contact</NavLink>
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
          onClick={() => setMobileOpen((o) => !o)}
          className="rounded p-2 text-blue-950 lg:hidden"
          aria-label="Menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
            {mobileOpen ? <path d="M18 6 6 18M6 6l12 12" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-blue-100 bg-white px-5 py-4 lg:hidden">
          <nav className="flex flex-col gap-3">
            <NavLink to="/" end onClick={closeMobile} className={navLinkClass}>Home</NavLink>
            <NavLink to="/about" onClick={closeMobile} className={navLinkClass}>About</NavLink>
            <NavLink to="/services" onClick={closeMobile} className={navLinkClass}>Services</NavLink>
            <NavLink to="/afiap-learn" onClick={closeMobile} className={navLinkClass}>AFIAP Learn</NavLink>
            <NavLink to="/faq" onClick={closeMobile} className={navLinkClass}>FAQ</NavLink>
            <NavLink to="/contact" onClick={closeMobile} className={navLinkClass}>Contact</NavLink>
            {user ? (
              <Link to="/account" onClick={closeMobile} className="btn-primary justify-center">
                Account center
              </Link>
            ) : (
              <>
                <Link to="/login" onClick={closeMobile} className="btn-outline justify-center">Log in</Link>
                <Link to="/signup" onClick={closeMobile} className="btn-primary justify-center">Sign up</Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}

export default Navbar
