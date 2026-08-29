import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { useAuth } from '../../context/AuthContext'
import { formatDateInput, inputClass, isValidDateOfBirth, labelClass } from '../../lib/form'

const AccountSettings = () => {
  const { user, updateProfile } = useAuth()
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (!user) return
    setName(user.name)
    setSurname(user.surname)
    setDateOfBirth(user.dateOfBirth)
    setEmail(user.email)
  }, [user])

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')
    setSuccess('')

    if (!isValidDateOfBirth(dateOfBirth)) {
      setError('Date of birth must be in DD/MM/YYYY format.')
      return
    }

    if ((password || repeatPassword) && password !== repeatPassword) {
      setError('Passwords do not match.')
      return
    }

    setIsSubmitting(true)

    try {
      await updateProfile({
        name,
        surname,
        dateOfBirth,
        email,
        ...(password ? { password, repeatPassword } : {}),
      })
      setPassword('')
      setRepeatPassword('')
      setSuccess('Your account details were updated successfully.')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to update profile.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm lg:p-8">
      <p className="text-xs font-bold uppercase tracking-widest text-blue-700">Settings</p>
      <h1 className="mt-2 text-2xl font-bold text-[#0a1628] sm:text-3xl">Account settings</h1>
      <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
        Update your personal details and change your password when needed.
      </p>

      {error && (
        <p className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      )}

      {success && (
        <p className="mt-5 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
          {success}
        </p>
      )}

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className={labelClass}>Name</label>
            <input
              id="name"
              type="text"
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
              className={inputClass}
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
            />
          </div>
        </div>

        <div>
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

        <div>
          <label htmlFor="email" className={labelClass}>Email</label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className={inputClass}
          />
        </div>

        <div className="border-t border-blue-100 pt-5">
          <h2 className="text-lg font-bold text-[#0a1628]">Change password</h2>
          <p className="mt-1 text-sm text-slate-600">Leave blank to keep your current password.</p>

          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="password" className={labelClass}>New password</label>
              <input
                id="password"
                type="password"
                minLength={8}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className={inputClass}
                placeholder="At least 8 characters"
              />
            </div>
            <div>
              <label htmlFor="repeatPassword" className={labelClass}>Repeat new password</label>
              <input
                id="repeatPassword"
                type="password"
                minLength={8}
                value={repeatPassword}
                onChange={(event) => setRepeatPassword(event.target.value)}
                className={inputClass}
                placeholder="Repeat password"
              />
            </div>
          </div>
        </div>

        <button type="submit" disabled={isSubmitting} className="btn-primary disabled:opacity-70">
          {isSubmitting ? 'Saving changes...' : 'Save changes'}
        </button>
      </form>
    </div>
  )
}

export default AccountSettings
