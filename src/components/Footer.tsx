import { Link } from 'react-router'
import logo from '../assets/afiap-logo.png'
import { services } from '../data/site'

const Footer = () => {
  return (
    <footer className="bg-[#0a1628] text-blue-200">
      <div className="mx-auto grid max-w-[1170px] gap-10 px-5 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:px-6">
        <div className="space-y-4 sm:col-span-2 lg:col-span-1">
          <Link to="/">
            <img src={logo} alt="AFIAP" className="h-20 w-auto max-w-[280px] sm:h-24 sm:max-w-[320px]" />
          </Link>
          <p className="text-sm leading-7 text-blue-300">
            Azerbaijan&apos;s first IT assistance platform — web development, robotics, AI, and software solutions.
          </p>
        </div>
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wide text-white">Company</h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link to="/about" className="hover:text-white">About</Link></li>
            <li><Link to="/business" className="hover:text-white">Business</Link></li>
            <li><Link to="/afiap-learn" className="hover:text-white">AFIAP Learn</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wide text-white">Services</h3>
          <ul className="mt-4 space-y-2 text-sm">
            {services.slice(0, 4).map((s) => (
              <li key={s.slug}>
                <Link to={`/services/${s.slug}`} className="hover:text-white">{s.title}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wide text-white">Contact</h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link to="/contact" className="hover:text-white">Contact us</Link></li>
            <li><Link to="/faq" className="hover:text-white">FAQ</Link></li>
            <li><Link to="/login" className="hover:text-white">Login</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-blue-800/40 py-5 text-center text-sm text-blue-400">
        © {new Date().getFullYear()} AFIAP. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer
