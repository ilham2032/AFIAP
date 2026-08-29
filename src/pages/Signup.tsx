import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useNavigate } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import { formatDateInput, inputClass, isValidDateOfBirth, labelClass } from '../lib/form'

const Signup = () => {
  const { signup, user } = useAuth()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (user) navigate('/account', { replace: true })
  }, [user, navigate])

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')

    if (!isValidDateOfBirth(dateOfBirth)) {
      setError('Date of birth must be in DD/MM/YYYY format.')
      return
    }

    if (password !== repeatPassword) {
      setError('Passwords do not match.')
      return
    }

    setIsSubmitting(true)

    try {
      await signup({ name, surname, dateOfBirth, email, password, repeatPassword })
      navigate('/account')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to create account.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <section className="bg-[#0a1628]">
        <div className="mx-auto max-w-[1170px] px-5 py-14 lg:px-6 lg:py-16">
          <p className="text-xs font-bold uppercase tracking-widest text-blue-400">Account</p>
          <h1 className="font-display mt-3 text-4xl text-white sm:text-5xl">Sign up</h1>
          <p className="mt-4 max-w-xl text-base leading-7 text-blue-200">
            Create your AFIAP account to access courses, project tools, and client support.
          </p>
        </div>
      </section>

      <section className="bg-white px-5 py-16 lg:px-6 lg:py-20">
        <div className="mx-auto max-w-xl">
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-blue-100 bg-white p-8 shadow-sm lg:p-10"
          >
            <h2 className="text-xl font-bold text-[#0a1628]">Create your account</h2>
            <p className="mt-2 text-sm text-slate-600">Fill in your details below to register with AFIAP.</p>

            {error && (
              <p className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </p>
            )}

            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className={labelClass}>Name</label>
                <input
                  id="name"
                  type="text"
                  required
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className={inputClass}
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="surname" className={labelClass}>Surname</label>
                <input
                  id="surname"
                  type="text"
                  required
                  value={surname}
                  onChange={(event) => setSurname(event.target.value)}
                  className={inputClass}
                  placeholder="Your surname"
                />
              </div>
            </div>

            <div className="mt-5">
              <label htmlFor="dateOfBirth" className={labelClass}>Date of birth</label>
              <input
                id="dateOfBirth"
                type="text"
                required
                inputMode="numeric"
                value={dateOfBirth}
                onChange={(event) => setDateOfBirth(formatDateInput(event.target.value))}
                className={inputClass}
                placeholder="DD/MM/YYYY"
                maxLength={10}
              />
            </div>

            <div className="mt-5">
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

            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="password" className={labelClass}>Password</label>
                <input
                  id="password"
                  type="password"
                  required
                  minLength={8}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className={inputClass}
                  placeholder="At least 8 characters"
                />
              </div>
              <div>
                <label htmlFor="repeatPassword" className={labelClass}>Repeat password</label>
                <input
                  id="repeatPassword"
                  type="password"
                  required
                  minLength={8}
                  value={repeatPassword}
                  onChange={(event) => setRepeatPassword(event.target.value)}
                  className={inputClass}
                  placeholder="Repeat password"
                />
              </div>
            </div>

            <button type="submit" disabled={isSubmitting} className="btn-primary mt-8 w-full disabled:opacity-70">
              {isSubmitting ? 'Creating account...' : 'Create account'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-600">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-blue-800 hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </section>
    </>
  )
}

export default Signup
