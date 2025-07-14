import api from './api'
import type { User } from '../types/user.types'

interface ApiResponse<T> {
  success: boolean
  data: T
  msg?: string
}


export const getAllUsers = () => {
  console.log('[API] GET /users')
  return api.get<ApiResponse<User[]>>('/users')
}


export const deleteUser = (id: number) => {
  console.log(`[API] DELETE /users/${id}`)
  return api.delete<ApiResponse<void>>(`/users/${id}`)
}


export const updateUserPassword = (id: number, password: string) => {
  console.log(`[API] PATCH /users/${id}/password`, { password })
  return api.patch<ApiResponse<void>>(`/users/${id}/password`, { password })
}


export const toggleUserRole = (id: number) => {
  console.log(`[API] PATCH /users/${id}/rol`)
  return api.patch<ApiResponse<{ id: number; rol: string }>>(`/users/${id}/rol`)
}
