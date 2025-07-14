
import api from './api'
import type { Equipo, CreateEquipoInput, UpdateEquipoInput } from '../types/equipo.types'

interface ApiResponse<T> {
  success: boolean
  data: T
}


export const getAllTeams = async (): Promise<Equipo[]> => {
  console.log('[API] GET /equipos')
  const res = await api.get<ApiResponse<Equipo[]>>('/equipos')
  return res.data.data
}


export const getEquiposByUsuario = async (usuarioId: number): Promise<Equipo[]> => {
  console.log(`[API] GET /equipos/user/${usuarioId}`)
  const res = await api.get<ApiResponse<Equipo[]>>(`/equipos/user/${usuarioId}`)
  return res.data.data
}


export const getEquipoById = async (id: number): Promise<Equipo> => {
  console.log(`[API] GET /equipos/${id}`)
  const res = await api.get<ApiResponse<Equipo>>(`/equipos/${id}`)
  return res.data.data
}


export const createEquipo = async (data: CreateEquipoInput): Promise<Equipo> => {
  console.log('[API] POST /equipos', data)
  const res = await api.post<ApiResponse<Equipo>>('/equipos', data)
  return res.data.data
}


export const updateEquipo = async (id: number, data: UpdateEquipoInput): Promise<Equipo> => {
  console.log(`[API] PATCH /equipos/${id}`, data)
  const res = await api.patch<ApiResponse<Equipo>>(`/equipos/${id}`, data)
  return res.data.data
}


export const deleteEquipo = async (id: number): Promise<void> => {
  console.log(`[API] DELETE /equipos/${id}`)
  await api.delete<ApiResponse<void>>(`/equipos/${id}`)
}
