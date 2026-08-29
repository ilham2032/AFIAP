import 'dotenv/config'
import cors from 'cors'
import express from 'express'
import authRoutes from './routes/auth.js'
import partnerRoutes from './routes/partners.js'

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())
app.use('/api/auth', authRoutes)
app.use('/api/partners', partnerRoutes)

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' })
})

app.listen(PORT, () => {
  console.log(`AFIAP API running at http://localhost:${PORT}`)
})
