import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {
  fetchCurrentUser,
  login as loginRequest,
  signup as signupRequest,
  updateProfile as updateProfileRequest,
  type LoginPayload,
  type SignupPayload,
  type UpdateProfilePayload,
  type User,
} from '../lib/auth'
import { AuthContext } from './auth-context'

const TOKEN_KEY = 'afiap_auth_token'

const hasStoredToken = () =>
  typeof window !== 'undefined' && !!localStorage.getItem(TOKEN_KEY)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(hasStoredToken)

  const persistSession = useCallback((token: string, nextUser: User) => {
    localStorage.setItem(TOKEN_KEY, token)
    setUser(nextUser)
    setIsLoading(false)
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY)
    setUser(null)
    setIsLoading(false)
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
    if (!token) return

    let cancelled = false

    fetchCurrentUser(token)
      .then((currentUser) => {
        if (!cancelled) setUser(currentUser)
      })
      .catch(() => {
        localStorage.removeItem(TOKEN_KEY)
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [])

  const value = useMemo(
    () => ({ user, isLoading, login, signup, updateProfile, logout }),
    [user, isLoading, login, signup, updateProfile, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
