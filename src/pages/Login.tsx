import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useNavigate } from 'react-router'
import { useAuth } from '../context/AuthContext'
import { inputClass, labelClass } from '../lib/form'

const Login = () => {
  const { login, user } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (user) navigate('/account', { replace: true })
  }, [user, navigate])

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')
    setIsSubmitting(true)

    try {
      await login({ email, password })
      navigate('/account')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to sign in.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <section className="bg-[#0a1628]">
        <div className="mx-auto max-w-[1170px] px-5 py-14 lg:px-6 lg:py-16">
          <p className="text-xs font-bold uppercase tracking-widest text-blue-400">Account</p>
          <h1 className="font-display mt-3 text-4xl text-white sm:text-5xl">Log in</h1>
          <p className="mt-4 max-w-xl text-base leading-7 text-blue-200">
            Welcome back. Sign in to access your AFIAP account.
          </p>
        </div>
      </section>

      <section className="bg-white px-5 py-16 lg:px-6 lg:py-20">
        <div className="mx-auto max-w-md">
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-blue-100 bg-white p-8 shadow-sm lg:p-10"
          >
            <h2 className="text-xl font-bold text-[#0a1628]">Sign in to your account</h2>
            <p className="mt-2 text-sm text-slate-600">Enter the email and password you used during registration.</p>

            {error && (
              <p className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </p>
            )}

            <div className="mt-8 space-y-5">
              <div>
                <label htmlFor="email" className={labelClass}>Email</label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className={inputClass}
                  placeholder="you@company.com"
                />
              </div>
              <div>
                <label htmlFor="password" className={labelClass}>Password</label>
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className={inputClass}
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <button type="submit" disabled={isSubmitting} className="btn-primary mt-8 w-full disabled:opacity-70">
              {isSubmitting ? 'Signing in...' : 'Log in'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-600">
            Don&apos;t have an account?{' '}
            <Link to="/signup" className="font-semibold text-blue-800 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </section>
    </>
  )
}

export default Login
