import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link } from 'react-router'
import { contactInfo } from '../data/site'

const inputClass =
  'mt-1.5 w-full rounded-xl border border-blue-100 bg-white px-4 py-2.5 text-slate-800 outline-none transition focus:border-blue-800 focus:ring-2 focus:ring-blue-800/10'

const contactItems = [
  {
    label: 'Email',
    value: contactInfo.email,
    href: `mailto:${contactInfo.email}`,
  },
  {
    label: 'Phone',
    value: contactInfo.phone,
    href: `tel:${contactInfo.phone.replace(/\s/g, '')}`,
  },
  {
    label: 'Location',
    value: contactInfo.location,
  },
  {
    label: 'Working hours',
    value: contactInfo.hours,
  },
]

const Contact = () => {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <>
      <section className="bg-[#0a1628]">
        <div className="mx-auto max-w-[1170px] px-5 py-14 lg:px-6 lg:py-16">
          <p className="text-xs font-bold uppercase tracking-widest text-blue-400">Get in touch</p>
          <h1 className="font-display mt-3 text-4xl text-white sm:text-5xl">Contact us</h1>
          <p className="mt-4 max-w-xl text-base leading-7 text-blue-200">
            Have a question or ready to start a project? Send us a message and our team will get back to you.
          </p>
        </div>
      </section>

      <section className="bg-white px-5 py-16 lg:px-6 lg:py-20">
        <div className="mx-auto grid max-w-[1170px] gap-12 lg:grid-cols-5 lg:gap-16">
          <div className="space-y-6 lg:col-span-2">
            <div>
              <h2 className="text-xl font-bold text-[#0a1628]">Contact information</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">{contactInfo.responseTime}</p>
            </div>

            <div className="space-y-4">
              {contactItems.map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl border border-blue-100 bg-[#f4f7fc] px-5 py-4"
                >
                  <p className="text-xs font-bold uppercase tracking-widest text-blue-700">{item.label}</p>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="mt-1 block text-sm font-semibold text-[#0a1628] hover:text-blue-800"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="mt-1 text-sm font-semibold text-[#0a1628]">{item.value}</p>
                  )}
                </div>
              ))}
            </div>

            <p className="text-sm text-slate-600">
              Prefer reading first?{' '}
              <Link to="/faq" className="font-semibold text-blue-800 hover:underline">
                Visit our FAQ
              </Link>
            </p>
          </div>

          <div className="lg:col-span-3">
            {submitted ? (
              <div className="rounded-2xl border border-blue-100 bg-[#f4f7fc] p-10 text-center">
                <p className="text-xs font-bold uppercase tracking-widest text-blue-700">Message sent</p>
                <h2 className="mt-3 text-2xl font-bold text-[#0a1628]">Thank you for reaching out</h2>
                <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-600">
                  We have received your message and will respond as soon as possible.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="btn-primary mt-8"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="rounded-2xl border border-blue-100 bg-white p-8 shadow-sm lg:p-10"
              >
                <h2 className="text-xl font-bold text-[#0a1628]">Send a message</h2>
                <p className="mt-2 text-sm text-slate-600">
                  Fill in the form below and we will get back to you shortly.
                </p>

                <div className="mt-8 grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-slate-700">
                      Full name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      className={inputClass}
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-slate-700">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className={inputClass}
                      placeholder="you@company.com"
                    />
                  </div>
                </div>

                <div className="mt-5">
                  <label htmlFor="subject" className="block text-sm font-semibold text-slate-700">
                    Subject
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    className={inputClass}
                    placeholder="How can we help?"
                  />
                </div>

                <div className="mt-5">
                  <label htmlFor="message" className="block text-sm font-semibold text-slate-700">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    required
                    className={`${inputClass} resize-none`}
                    placeholder="Tell us about your project or question..."
                  />
                </div>

                <button type="submit" className="btn-primary mt-8 w-full sm:w-auto">
                  Send message
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  )
}

export default Contact
