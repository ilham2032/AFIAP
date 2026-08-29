export type PartnerApplicationPayload = {
  name: string
  surname: string
  email: string
  companyName: string
}

export type PartnerApplicationResponse = {
  message: string
  emailSent: boolean
}

const PARTNER_EMAIL = 'firstitassistance@gmail.com'
const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY ?? ''

const apiBase = import.meta.env.VITE_API_URL?.replace(/\/$/, '') ?? ''

const isSuccess = (value: unknown) => value === true || value === 'true'

const parseErrorMessage = async (response: Response) => {
  try {
    const data = (await response.json()) as { message?: string }
    return data.message ?? 'Unable to submit your application.'
  } catch {
    return 'Unable to submit your application.'
  }
}

const submitViaWeb3Forms = async (
  payload: PartnerApplicationPayload,
): Promise<PartnerApplicationResponse> => {
  if (!WEB3FORMS_KEY) {
    throw new Error('WEB3FORMS_NOT_CONFIGURED')
  }

  const response = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      access_key: WEB3FORMS_KEY,
      subject: `AFIAP Partner Application — ${payload.companyName}`,
      from_name: 'AFIAP Partner Form',
      name: `${payload.name} ${payload.surname}`,
      email: payload.email,
      company: payload.companyName,
      message: [
        'New AFIAP partner application',
        '',
        `Name: ${payload.name} ${payload.surname}`,
        `Email: ${payload.email}`,
        `Company: ${payload.companyName}`,
      ].join('\n'),
    }),
  })

  const data = (await response.json()) as { success?: boolean | string; message?: string }

  if (!response.ok || !isSuccess(data.success)) {
    throw new Error(data.message ?? 'Unable to send your application by email.')
  }

  return {
    message: 'Your partner application has been submitted successfully. Our team will contact you soon.',
    emailSent: true,
  }
}

const submitViaFormSubmit = async (
  payload: PartnerApplicationPayload,
): Promise<PartnerApplicationResponse> => {
  const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(PARTNER_EMAIL)}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      _subject: `AFIAP Partner Application — ${payload.companyName}`,
      _template: 'table',
      _captcha: 'false',
      Name: payload.name,
      Surname: payload.surname,
      Email: payload.email,
      'Company name': payload.companyName,
    }),
  })

  const data = (await response.json()) as { success?: boolean | string; message?: string }

  if (!response.ok || !isSuccess(data.success)) {
    throw new Error(
      data.message ?? 'Unable to send your application by email. Please try again or contact us directly.',
    )
  }

  return {
    message: 'Your partner application has been submitted successfully. Our team will contact you soon.',
    emailSent: true,
  }
}

const submitViaApi = async (
  payload: PartnerApplicationPayload,
): Promise<PartnerApplicationResponse> => {
  const response = await fetch(`${apiBase}/api/partners/apply`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  if (response.status === 400) {
    throw new Error(await parseErrorMessage(response))
  }

  if (!response.ok) {
    throw new Error('API_UNAVAILABLE')
  }

  return response.json() as Promise<PartnerApplicationResponse>
}

const isValidationError = (message: string) =>
  message.includes('Please enter') || message.includes('valid email')

const sendEmailFromClient = async (
  payload: PartnerApplicationPayload,
): Promise<PartnerApplicationResponse> => {
  if (WEB3FORMS_KEY) {
    try {
      return await submitViaWeb3Forms(payload)
    } catch (error) {
      if (error instanceof Error && error.message !== 'WEB3FORMS_NOT_CONFIGURED') {
        console.warn('[partners] Web3Forms failed, trying FormSubmit:', error.message)
      }
    }
  }

  return submitViaFormSubmit(payload)
}

export const submitPartnerApplication = async (
  payload: PartnerApplicationPayload,
): Promise<PartnerApplicationResponse> => {
  let apiResult: PartnerApplicationResponse | null = null

  try {
    apiResult = await submitViaApi(payload)
    if (apiResult.emailSent) {
      return apiResult
    }
  } catch (error) {
    if (error instanceof Error && isValidationError(error.message)) {
      throw error
    }
  }

  const emailResult = await sendEmailFromClient(payload)

  return {
    message: emailResult.message,
    emailSent: true,
  }
}
