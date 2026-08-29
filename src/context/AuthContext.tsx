import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { fetchCurrentUser, login as loginRequest, signup as signupRequest, updateProfile as updateProfileRequest, type LoginPayload, type SignupPayload, type UpdateProfilePayload, type User } from '../lib/auth'

type AuthContextValue = {
  user: User | null
  isLoading: boolean
  login: (payload: LoginPayload) => Promise<void>
  signup: (payload: SignupPayload) => Promise<void>
  updateProfile: (payload: UpdateProfilePayload) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)
const TOKEN_KEY = 'afiap_auth_token'

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const persistSession = useCallback((token: string, nextUser: User) => {
    localStorage.setItem(TOKEN_KEY, token)
    setUser(nextUser)
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY)
    setUser(null)
  }, [])

  const login = useCallback(async (payload: LoginPayload) => {
    const response = await loginRequest(payload)
    persistSession(response.token, response.user)
  }, [persistSession])

  const signup = useCallback(async (payload: SignupPayload) => {
    const response = await signupRequest(payload)
    persistSession(response.token, response.user)
  }, [persistSession])

  const updateProfile = useCallback(async (payload: UpdateProfilePayload) => {
    const response = await updateProfileRequest(payload)
    setUser(response.user)
  }, [])

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY)

    if (!token) {
      setIsLoading(false)
      return
    }

    fetchCurrentUser(token)
      .then(setUser)
      .catch(() => localStorage.removeItem(TOKEN_KEY))
      .finally(() => setIsLoading(false))
  }, [])

  const value = useMemo(
    () => ({ user, isLoading, login, signup, updateProfile, logout }),
    [user, isLoading, login, signup, updateProfile, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }

  return context
}
