// src/context/AuthProvider.tsx
import { useState, useEffect } from 'react'
import { AuthContext } from './AuthContext'
import type { User } from '../types/user.types'
import { loginUser } from '../api/auth.api'
import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem('user')
    if (stored) {
      try {
        setUser(JSON.parse(stored))
      } catch (err) {
        console.error('🚨 Error al parsear usuario:', err)
        localStorage.removeItem('user')
      }
    }
    setLoading(false)
  }, [])

  const login = async (username: string, password: string) => {
    try {
      const res = await loginUser({ username, password })
      console.log('🔑 Login response:', res.data)

      const { user, token } = res.data.data

      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))
      setUser(user)
    } catch (err) {
      console.error('❌ Error al iniciar sesión:', err)
      throw err
    }
  }

  const logout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    setUser(null)
    console.log('👋 Usuario cerró sesión')
  }

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
