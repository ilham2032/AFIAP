import { useState } from 'react'
import type { FormEvent } from 'react'
import { contactInfo } from '../../data/site'
import { inputClass, labelClass } from '../../lib/form'

const AccountContact = () => {
  const [submitted, setSubmitted] = useState(false)
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm lg:p-8">
      <p className="text-xs font-bold uppercase tracking-widest text-blue-700">Contact AFIAP</p>
      <h1 className="mt-2 text-2xl font-bold text-[#0a1628] sm:text-3xl">Get in touch with our team</h1>
      <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
        Send a message directly from your account. {contactInfo.responseTime}
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-blue-100 bg-[#f4f7fc] p-4">
          <p className="text-xs font-bold uppercase tracking-widest text-blue-700">Email</p>
          <a href={`mailto:${contactInfo.email}`} className="mt-1 block text-sm font-semibold text-[#0a1628] hover:text-blue-800">
            {contactInfo.email}
          </a>
        </div>
        <div className="rounded-xl border border-blue-100 bg-[#f4f7fc] p-4">
          <p className="text-xs font-bold uppercase tracking-widest text-blue-700">Phone</p>
          <a href={`tel:${contactInfo.phone.replace(/\s/g, '')}`} className="mt-1 block text-sm font-semibold text-[#0a1628] hover:text-blue-800">
            {contactInfo.phone}
          </a>
        </div>
      </div>

      {submitted ? (
        <div className="mt-8 rounded-xl border border-blue-100 bg-[#f4f7fc] p-6 text-center">
          <h2 className="text-lg font-bold text-[#0a1628]">Message sent</h2>
          <p className="mt-2 text-sm text-slate-600">Our team will get back to you as soon as possible.</p>
          <button type="button" onClick={() => setSubmitted(false)} className="btn-primary mt-5">
            Send another message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label htmlFor="subject" className={labelClass}>Subject</label>
            <input
              id="subject"
              type="text"
              required
              value={subject}
              onChange={(event) => setSubject(event.target.value)}
              className={inputClass}
              placeholder="How can we help?"
            />
          </div>
          <div>
            <label htmlFor="message" className={labelClass}>Message</label>
            <textarea
              id="message"
              rows={6}
              required
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              className={`${inputClass} resize-none`}
              placeholder="Write your message..."
            />
          </div>
          <button type="submit" className="btn-primary">Send message</button>
        </form>
      )}
    </div>
  )
}

export default AccountContact
