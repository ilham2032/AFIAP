import { createContext } from 'react'
import type { LoginPayload, SignupPayload, UpdateProfilePayload, User } from '../lib/auth'

export type AuthContextValue = {
  user: User | null
  isLoading: boolean
  login: (payload: LoginPayload) => Promise<void>
  signup: (payload: SignupPayload) => Promise<void>
  updateProfile: (payload: UpdateProfilePayload) => Promise<void>
  logout: () => void
}

export const AuthContext = createContext<AuthContextValue | null>(null)
