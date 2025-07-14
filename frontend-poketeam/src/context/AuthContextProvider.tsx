// src/context/AuthContextProvider.tsx
import { useState, useEffect } from 'react'
import type { ReactNode } from 'react'
import { AuthContext } from './AuthContext'
import { loginUser } from '../api/auth.api'
import type { User } from '../types/user.types'
import type { AxiosResponse } from 'axios'

interface Props {
  children: ReactNode
}

const AuthContextProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (err) {
        console.error('🚨 Error al parsear usuario en localStorage:', err)
        localStorage.removeItem('user')
      }
    }
    setLoading(false)
  }, [])

  const login = async (username: string, password: string) => {
    try {
      const res: AxiosResponse<{ success: boolean; msg: string; data: { user: User; token: string } }> = await loginUser({ username, password })
      console.log('🔑 Login response:', res.data)

      // ✅ Adaptado a tu AuthResponse { success, msg, data: { user, token } }
      const { user: userData, token } = res.data.data

      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(userData))
      setUser(userData)
    } catch (err) {
      console.error('❌ Error al hacer login:', err)
      alert('Error al iniciar sesión. Verifica tus credenciales.')
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
    console.log('👋 Sesión cerrada')
  }

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider
