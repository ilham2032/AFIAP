const PARTNER_EMAIL = process.env.PARTNER_EMAIL_TO || 'firstitassistance@gmail.com'

const isSuccess = (value) => value === true || value === 'true'

export const sendPartnerApplicationEmail = async ({
  name,
  surname,
  email,
  companyName,
}) => {
  const fullName = `${name} ${surname}`
  const submittedAt = new Date().toLocaleString('en-GB', { timeZone: 'Asia/Baku' })

  const smtpResult = await sendViaSmtp({ fullName, name, surname, email, companyName, submittedAt })
  if (smtpResult) return smtpResult

  const web3Result = await sendViaWeb3Forms({ fullName, name, surname, email, companyName, submittedAt })
  if (web3Result) return web3Result

  const formSubmitResult = await sendViaFormSubmit({
    fullName,
    name,
    surname,
    email,
    companyName,
    submittedAt,
  })
  if (formSubmitResult) return formSubmitResult

  return { emailSent: false }
}

const sendViaSmtp = async ({ fullName, name, surname, email, companyName, submittedAt }) => {
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS
  if (!user || !pass) return null

  const nodemailer = await import('nodemailer')
  const transporter = nodemailer.default.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === 'true',
    auth: { user, pass },
  })

  const text = [
    'New AFIAP partner application',
    '',
    `Name: ${fullName}`,
    `Email: ${email}`,
    `Company: ${companyName}`,
    `Submitted: ${submittedAt} (Baku time)`,
  ].join('\n')

  const html = `
    <div style="font-family:Arial,sans-serif;line-height:1.6;color:#0a1628;max-width:560px">
      <h2 style="margin:0 0 16px;color:#1e40af">New AFIAP partner application</h2>
      <table style="width:100%;border-collapse:collapse">
        <tr><td style="padding:8px 0;font-weight:600;width:120px">Name</td><td>${fullName}</td></tr>
        <tr><td style="padding:8px 0;font-weight:600">Email</td><td><a href="mailto:${email}">${email}</a></td></tr>
        <tr><td style="padding:8px 0;font-weight:600">Company</td><td>${companyName}</td></tr>
        <tr><td style="padding:8px 0;font-weight:600">Submitted</td><td>${submittedAt} (Baku time)</td></tr>
      </table>
    </div>
  `

  try {
    await transporter.sendMail({
      from: `"AFIAP Partner Applications" <${user}>`,
      to: PARTNER_EMAIL,
      replyTo: email,
      subject: `Partner application — ${companyName} (${fullName})`,
      text,
      html,
    })
    return { emailSent: true, provider: 'smtp' }
  } catch (error) {
    console.error('[partners] SMTP email failed:', error)
    return null
  }
}

const sendViaWeb3Forms = async ({ fullName, name, surname, email, companyName, submittedAt }) => {
  const accessKey = process.env.WEB3FORMS_ACCESS_KEY
  if (!accessKey) return null

  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: accessKey,
        subject: `AFIAP Partner Application — ${companyName}`,
        from_name: 'AFIAP Partner Form',
        name: fullName,
        email,
        company: companyName,
        message: [
          'New AFIAP partner application',
          '',
          `Name: ${fullName}`,
          `Email: ${email}`,
          `Company: ${companyName}`,
          `Submitted: ${submittedAt} (Baku time)`,
        ].join('\n'),
      }),
    })

    const data = await response.json()
    if (response.ok && isSuccess(data.success)) {
      return { emailSent: true, provider: 'web3forms' }
    }

    console.error('[partners] Web3Forms failed:', data)
    return null
  } catch (error) {
    console.error('[partners] Web3Forms error:', error)
    return null
  }
}

const sendViaFormSubmit = async ({ fullName, name, surname, email, companyName }) => {
  const siteOrigin = process.env.SITE_ORIGIN || 'http://localhost:5173'
  const sitePath = process.env.SITE_PARTNER_PATH || '/become-a-partner'

  try {
    const response = await fetch(
      `https://formsubmit.co/ajax/${encodeURIComponent(PARTNER_EMAIL)}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Origin: siteOrigin,
          Referer: `${siteOrigin}${sitePath}`,
        },
        body: JSON.stringify({
          _subject: `AFIAP Partner Application — ${companyName}`,
          _template: 'table',
          _captcha: 'false',
          Name: name,
          Surname: surname,
          Email: email,
          'Company name': companyName,
          'Full name': fullName,
        }),
      },
    )

    const data = await response.json()
    if (response.ok && isSuccess(data.success)) {
      return { emailSent: true, provider: 'formsubmit' }
    }

    console.error('[partners] FormSubmit failed:', data)
    return null
  } catch (error) {
    console.error('[partners] FormSubmit error:', error)
    return null
  }
}
