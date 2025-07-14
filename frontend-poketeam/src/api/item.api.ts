import api from './api'
import type { Item } from '../types/item.types'

// Tipo genérico para la respuesta estandarizada
interface ApiResponse<T> {
  success: boolean
  msg?: string
  data: T
}

// ==========================
// Obtener todos los ítems
// ==========================
export const getItems = async (): Promise<Item[]> => {
  try {
    const response = await api.get<ApiResponse<Item[]>>('/items')
    return response.data.data
  } catch (err) {
    console.error('❌ Error al obtener los ítems:', err)
    throw new Error('No se pudieron cargar los ítems')
  }
}

// ==========================
// Obtener un ítem por ID
// ==========================
export const getItemById = async (id: number): Promise<Item> => {
  try {
    const response = await api.get<ApiResponse<Item>>(`/items/${id}`)
    return response.data.data
  } catch (err) {
    console.error(`❌ Error al obtener el ítem con ID ${id}:`, err)
    throw new Error(`No se pudo obtener el ítem con ID ${id}`)
  }
}

// ==========================
// Crear un nuevo ítem
// ==========================
export const createItem = async (data: FormData): Promise<Item> => {
  try {
    const response = await api.post<ApiResponse<Item>>('/items', data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    return response.data.data
  } catch (err) {
    console.error('❌ Error al crear el ítem:', err)
    throw new Error('No se pudo crear el ítem')
  }
}

// ==========================
// Actualizar un ítem
// ==========================
export const updateItem = async (id: number, data: FormData): Promise<Item> => {
  try {
    const response = await api.put<ApiResponse<Item>>(`/items/${id}`, data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    return response.data.data
  } catch (err) {
    console.error(`❌ Error al actualizar el ítem con ID ${id}:`, err)
    throw new Error(`No se pudo actualizar el ítem con ID ${id}`)
  }
}

// ==========================
// Eliminar un ítem
// ==========================
export const deleteItem = async (id: number): Promise<void> => {
  try {
    await api.delete<ApiResponse<void>>(`/items/${id}`)
  } catch (err) {
    console.error(`❌ Error al eliminar el ítem con ID ${id}:`, err)
    throw new Error(`No se pudo eliminar el ítem con ID ${id}`)
  }
}
