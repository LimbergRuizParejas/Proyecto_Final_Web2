
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../api/auth.api'
import type { LoginInput, User } from '../types/user.types'

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null)
  const navigate = useNavigate()

  
  useEffect(() => {
    const stored = localStorage.getItem('user')
    if (stored) {
      try {
        const parsed: User = JSON.parse(stored)
        setUser(parsed)
        console.log('✅ Usuario cargado desde localStorage:', parsed)
      } catch (err) {
        console.error('🚨 Error al parsear usuario en localStorage:', err)
        localStorage.removeItem('user')
      }
    }
  }, [])

  
  const login = async ({ username, password }: LoginInput) => {
    try {
      const res = await loginUser({ username, password })
      const { user, token } = res.data.data

      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))
      setUser(user)
      console.log('✅ Login exitoso:', user)

      // Redirige según rol
      if (user.rol === 'admin') {
        navigate('/admin')
      } else {
        navigate('/home')
      }
    } catch (err) {
      console.error('🚨 Error al iniciar sesión:', err)
      alert('Credenciales inválidas o error en el servidor.')
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
    console.log('👋 Usuario cerró sesión.')
    navigate('/login')
  }

  return { user, login, logout }
}
