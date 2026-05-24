'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { AxiosError } from 'axios'
import apiClient, { setAccessToken } from '../lib/apiClient'

interface User {
  id: string
  email: string
  username?: string
}

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(false) 
  const router = useRouter()

  const login = async (email: string, password: string) => {
    try {
      const { data } = await apiClient.post<{ accessToken: string; user: User }>(
        '/auth/login',
        { email, password }
      )
      setUser(data.user)           
      setAccessToken(data.accessToken)
      console.log(data)
      router.push('/todos')
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>
      console.log("Error detail:", axiosError.response?.data)
      throw new Error(axiosError.response?.data?.message || 'Login failed')
    }
  }

  const logout = async () => {
    try {
      await apiClient.post('/auth/logout')
      setUser(null)
      setAccessToken(null)
      router.push('/login')
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}