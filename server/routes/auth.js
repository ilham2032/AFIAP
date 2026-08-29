import bcrypt from 'bcryptjs'
import { Router } from 'express'
import jwt from 'jsonwebtoken'
import db from '../db.js'

const router = Router()
const JWT_SECRET = process.env.JWT_SECRET || 'afiap-dev-secret-change-in-production'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const isValidDateOfBirth = (value) => {
  const match = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(value)
  if (!match) return false

  const day = Number(match[1])
  const month = Number(match[2])
  const year = Number(match[3])

  if (month < 1 || month > 12 || day < 1 || day > 31) return false

  const date = new Date(year, month - 1, day)
  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day &&
    date <= new Date()
  )
}

const toPublicUser = (user) => ({
  id: user.id,
  name: user.name,
  surname: user.surname,
  email: user.email,
  dateOfBirth: user.date_of_birth,
})

const authenticate = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization
    const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null

    if (!token) {
      return res.status(401).json({ message: 'Not authenticated.' })
    }

    const payload = jwt.verify(token, JWT_SECRET)
    const user = db.prepare('SELECT * FROM users WHERE id = ?').get(payload.userId)

    if (!user) {
      return res.status(401).json({ message: 'Not authenticated.' })
    }

    req.user = user
    return next()
  } catch {
    return res.status(401).json({ message: 'Not authenticated.' })
  }
}

router.post('/signup', async (req, res) => {
  try {
    const { name, surname, dateOfBirth, email, password, repeatPassword } = req.body

    if (!name?.trim() || !surname?.trim() || !dateOfBirth || !email || !password || !repeatPassword) {
      return res.status(400).json({ message: 'All fields are required.' })
    }

    if (!emailPattern.test(email)) {
      return res.status(400).json({ message: 'Please enter a valid email address.' })
    }

    if (!isValidDateOfBirth(dateOfBirth)) {
      return res.status(400).json({ message: 'Date of birth must be in DD/MM/YYYY format.' })
    }

    if (password.length < 8) {
      return res.status(400).json({ message: 'Password must be at least 8 characters.' })
    }

    if (password !== repeatPassword) {
      return res.status(400).json({ message: 'Passwords do not match.' })
    }

    const normalizedEmail = email.trim().toLowerCase()
    const existingUser = db.prepare('SELECT id FROM users WHERE email = ?').get(normalizedEmail)

    if (existingUser) {
      return res.status(409).json({ message: 'An account with this email already exists.' })
    }

    const passwordHash = await bcrypt.hash(password, 10)

    const result = db
      .prepare(
        'INSERT INTO users (name, surname, date_of_birth, email, password_hash) VALUES (?, ?, ?, ?, ?)',
      )
      .run(name.trim(), surname.trim(), dateOfBirth, normalizedEmail, passwordHash)

    const user = db.prepare('SELECT * FROM users WHERE id = ?').get(result.lastInsertRowid)
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' })

    return res.status(201).json({
      message: 'Account created successfully.',
      token,
      user: toPublicUser(user),
    })
  } catch {
    return res.status(500).json({ message: 'Something went wrong. Please try again.' })
  }
})

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' })
    }

    const normalizedEmail = email.trim().toLowerCase()
    const user = db.prepare('SELECT * FROM users WHERE email = ?').get(normalizedEmail)

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password.' })
    }

    const isValidPassword = await bcrypt.compare(password, user.password_hash)

    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid email or password.' })
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' })

    return res.json({
      message: 'Signed in successfully.',
      token,
      user: toPublicUser(user),
    })
  } catch {
    return res.status(500).json({ message: 'Something went wrong. Please try again.' })
  }
})

router.get('/me', authenticate, (req, res) => {
  return res.json({ user: toPublicUser(req.user) })
})

router.put('/profile', authenticate, async (req, res) => {
  try {
    const { name, surname, dateOfBirth, email, password, repeatPassword } = req.body

    if (!name?.trim() || !surname?.trim() || !dateOfBirth || !email) {
      return res.status(400).json({ message: 'Name, surname, date of birth, and email are required.' })
    }

    if (!emailPattern.test(email)) {
      return res.status(400).json({ message: 'Please enter a valid email address.' })
    }

    if (!isValidDateOfBirth(dateOfBirth)) {
      return res.status(400).json({ message: 'Date of birth must be in DD/MM/YYYY format.' })
    }

    const normalizedEmail = email.trim().toLowerCase()
    const existingUser = db
      .prepare('SELECT id FROM users WHERE email = ? AND id != ?')
      .get(normalizedEmail, req.user.id)

    if (existingUser) {
      return res.status(409).json({ message: 'An account with this email already exists.' })
    }

    let passwordHash = req.user.password_hash

    if (password || repeatPassword) {
      if (!password || !repeatPassword) {
        return res.status(400).json({ message: 'Enter and confirm your new password.' })
      }

      if (password.length < 8) {
        return res.status(400).json({ message: 'Password must be at least 8 characters.' })
      }

      if (password !== repeatPassword) {
        return res.status(400).json({ message: 'Passwords do not match.' })
      }

      passwordHash = await bcrypt.hash(password, 10)
    }

    db.prepare(
      'UPDATE users SET name = ?, surname = ?, date_of_birth = ?, email = ?, password_hash = ? WHERE id = ?',
    ).run(name.trim(), surname.trim(), dateOfBirth, normalizedEmail, passwordHash, req.user.id)

    const updatedUser = db.prepare('SELECT * FROM users WHERE id = ?').get(req.user.id)

    return res.json({
      message: 'Profile updated successfully.',
      user: toPublicUser(updatedUser),
    })
  } catch {
    return res.status(500).json({ message: 'Something went wrong. Please try again.' })
  }
})

export default router
