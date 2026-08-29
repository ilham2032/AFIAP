import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link } from 'react-router'
import { inputClass, labelClass } from '../lib/form'
import { submitPartnerApplication } from '../lib/partners'

const BecomePartner = () => {
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [email, setEmail] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')
    setIsSubmitting(true)

    try {
      await submitPartnerApplication({ name, surname, email, companyName })
      setSubmitted(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to submit your application.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <section className="bg-[#0a1628]">
        <div className="mx-auto max-w-[1170px] px-5 py-14 lg:px-6 lg:py-16">
          <Link to="/" className="text-sm font-semibold text-blue-300 hover:text-white hover:underline">
            ← Back to home
          </Link>
          <p className="mt-6 text-xs font-bold uppercase tracking-widest text-blue-400">Partnership</p>
          <h1 className="font-display mt-3 text-4xl text-white sm:text-5xl">Become a partner</h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-blue-200">
            Join AFIAP&apos;s partner network and collaborate with Azerbaijan&apos;s first IT assistance platform.
            Submit your details and our team will review your application.
          </p>
        </div>
      </section>

      <section className="bg-white px-5 py-16 lg:px-6 lg:py-20">
        <div className="mx-auto grid max-w-[1170px] gap-12 lg:grid-cols-5 lg:gap-16">
          <div className="space-y-6 lg:col-span-2">
            <div>
              <h2 className="text-xl font-bold text-[#0a1628]">Why partner with AFIAP?</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                We work with institutions, technology providers, and organizations that share our mission
                to strengthen IT education and services across Azerbaijan.
              </p>
            </div>

            <ul className="space-y-3">
              {[
                'Reach students, businesses, and institutions through our platform',
                'Collaborate on education, innovation, and technology projects',
                'Gain visibility alongside established AFIAP partners',
              ].map((point) => (
                <li
                  key={point}
                  className="flex gap-3 rounded-xl border border-blue-100 bg-[#f4f7fc] px-5 py-4"
                >
                  <span className="font-bold text-blue-700">✓</span>
                  <span className="text-sm font-medium leading-6 text-slate-700">{point}</span>
                </li>
              ))}
            </ul>

            <p className="text-sm text-slate-600">
              Questions before applying?{' '}
              <Link to="/contact" className="font-semibold text-blue-800 hover:underline">
                Contact our team
              </Link>
            </p>
          </div>

          <div className="lg:col-span-3">
            {submitted ? (
              <div className="rounded-2xl border border-blue-100 bg-[#f4f7fc] p-10 text-center">
                <p className="text-xs font-bold uppercase tracking-widest text-blue-700">Application received</p>
                <h2 className="mt-3 text-2xl font-bold text-[#0a1628]">Thank you for your interest</h2>
                <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-600">
                  We have received your partner application for <strong>{companyName}</strong>.
                  Our team will review your details and contact you at <strong>{email}</strong>.
                </p>
                <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <Link to="/" className="btn-primary">
                    Back to home
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false)
                      setName('')
                      setSurname('')
                      setEmail('')
                      setCompanyName('')
                    }}
                    className="btn-outline"
                  >
                    Submit another application
                  </button>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="rounded-2xl border border-blue-100 bg-white p-8 shadow-sm lg:p-10"
              >
                <h2 className="text-xl font-bold text-[#0a1628]">Partner registration</h2>
                <p className="mt-2 text-sm text-slate-600">
                  Fill in your details below. All fields are required.
                </p>

                {error && (
                  <p className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {error}
                  </p>
                )}

                <div className="mt-8 grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="partner-name" className={labelClass}>
                      Name
                    </label>
                    <input
                      id="partner-name"
                      name="name"
                      type="text"
                      autoComplete="given-name"
                      required
                      minLength={2}
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      className={inputClass}
                      placeholder="Your first name"
                    />
                  </div>

                  <div>
                    <label htmlFor="partner-surname" className={labelClass}>
                      Surname
                    </label>
                    <input
                      id="partner-surname"
                      name="surname"
                      type="text"
                      autoComplete="family-name"
                      required
                      minLength={2}
                      value={surname}
                      onChange={(event) => setSurname(event.target.value)}
                      className={inputClass}
                      placeholder="Your surname"
                    />
                  </div>
                </div>

                <div className="mt-5">
                  <label htmlFor="partner-email" className={labelClass}>
                    Email
                  </label>
                  <input
                    id="partner-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className={inputClass}
                    placeholder="you@company.com"
                  />
                </div>

                <div className="mt-5">
                  <label htmlFor="partner-company" className={labelClass}>
                    Company name
                  </label>
                  <input
                    id="partner-company"
                    name="companyName"
                    type="text"
                    autoComplete="organization"
                    required
                    minLength={2}
                    value={companyName}
                    onChange={(event) => setCompanyName(event.target.value)}
                    className={inputClass}
                    placeholder="Your organization"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary mt-8 w-full sm:w-auto disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSubmitting ? 'Submitting…' : 'Submit application'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  )
}

export default BecomePartner
