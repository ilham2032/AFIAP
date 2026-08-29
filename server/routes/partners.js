import express from 'express'
import db from '../db.js'
import { sendPartnerApplicationEmail } from '../lib/partnerEmail.js'

const router = express.Router()

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const normalizeText = (value) => value.trim().replace(/\s+/g, ' ')

router.post('/apply', async (req, res) => {
  try {
    const name = normalizeText(String(req.body?.name ?? ''))
    const surname = normalizeText(String(req.body?.surname ?? ''))
    const email = normalizeText(String(req.body?.email ?? '')).toLowerCase()
    const companyName = normalizeText(String(req.body?.companyName ?? ''))

    if (name.length < 2) {
      return res.status(400).json({ message: 'Please enter your name.' })
    }

    if (surname.length < 2) {
      return res.status(400).json({ message: 'Please enter your surname.' })
    }

    if (!emailPattern.test(email)) {
      return res.status(400).json({ message: 'Please enter a valid email address.' })
    }

    if (companyName.length < 2) {
      return res.status(400).json({ message: 'Please enter your company name.' })
    }

    const insert = db.prepare(`
      INSERT INTO partner_applications (name, surname, email, company_name)
      VALUES (?, ?, ?, ?)
    `)

    const result = insert.run(name, surname, email, companyName)
    const emailResult = await sendPartnerApplicationEmail({ name, surname, email, companyName })

    if (!emailResult.emailSent) {
      console.warn(
        '[partners] Application saved (id=%s) but email not sent from server.',
        result.lastInsertRowid,
      )
    }

    return res.status(201).json({
      message: emailResult.emailSent
        ? 'Your partner application has been submitted successfully. Our team will contact you soon.'
        : 'Your partner application has been received. Our team will contact you soon.',
      emailSent: emailResult.emailSent,
    })
  } catch (error) {
    console.error('[partners] Failed to process application:', error)
    return res.status(500).json({ message: 'Unable to submit your application. Please try again later.' })
  }
})

export default router
