export type User = {
  id: number
  name: string
  surname: string
  email: string
  dateOfBirth: string
}

export type AuthResponse = {
  message: string
  token: string
  user: User
}

export type SignupPayload = {
  name: string
  surname: string
  dateOfBirth: string
  email: string
  password: string
  repeatPassword: string
}

export type LoginPayload = {
  email: string
  password: string
}

export type UpdateProfilePayload = {
  name: string
  surname: string
  dateOfBirth: string
  email: string
  password?: string
  repeatPassword?: string
}

export type ProfileResponse = {
  message: string
  user: User
}

const TOKEN_KEY = 'afiap_auth_token'

const getAuthHeaders = () => {
  const token = localStorage.getItem(TOKEN_KEY)
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  }
}

const parseError = async (response: Response) => {
  try {
    const data = await response.json()
    return data.message || 'Something went wrong. Please try again.'
  } catch {
    return 'Something went wrong. Please try again.'
  }
}

export const signup = async (payload: SignupPayload): Promise<AuthResponse> => {
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    throw new Error(await parseError(response))
  }

  return response.json()
}

export const login = async (payload: LoginPayload): Promise<AuthResponse> => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    throw new Error(await parseError(response))
  }

  return response.json()
}

export const fetchCurrentUser = async (token: string): Promise<User> => {
  const response = await fetch('/api/auth/me', {
    headers: { Authorization: `Bearer ${token}` },
  })

  if (!response.ok) {
    throw new Error(await parseError(response))
  }

  const data = await response.json()
  return data.user
}

export const updateProfile = async (payload: UpdateProfilePayload): Promise<ProfileResponse> => {
  const response = await fetch('/api/auth/profile', {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    throw new Error(await parseError(response))
  }

  return response.json()
}
