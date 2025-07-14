import api from './api'
import type {
  Movimiento,
  CreateMovimientoInput,
  UpdateMovimientoInput
} from '../types/movimiento.types'

interface ApiResponse<T> {
  success: boolean
  msg?: string
  data: T
}

/**
 * Obtiene la lista de todos los movimientos.
 * @returns Un array de objetos de tipo `Movimiento`.
 */
export const getMovimientos = async (): Promise<Movimiento[]> => {
  try {
    const { data } = await api.get<ApiResponse<Movimiento[]>>('/movimientos')
    if (!data.success) {
      throw new Error(data.msg || 'Error al obtener los movimientos.')
    }
    return data.data
  } catch (error) {
    console.error('❌ Error al obtener los movimientos:', error)
    throw new Error(error instanceof Error ? error.message : 'Error desconocido')
  }
}

/**
 * Obtiene los detalles de un movimiento específico por su ID.
 * @param id - ID del movimiento.
 * @returns Un objeto de tipo `Movimiento`.
 */
export const getMovimientoById = async (id: number): Promise<Movimiento> => {
  try {
    const { data } = await api.get<ApiResponse<Movimiento>>(`/movimientos/${id}`)
    if (!data.success) {
      throw new Error(data.msg || 'Error al obtener el movimiento.')
    }
    return data.data
  } catch (error) {
    console.error('❌ Error al obtener el movimiento:', error)
    throw new Error(error instanceof Error ? error.message : 'Error desconocido')
  }
}

/**
 * Crea un nuevo movimiento.
 * @param data - Los datos del nuevo movimiento.
 * @returns El movimiento creado.
 */
export const createMovimiento = async (data: CreateMovimientoInput): Promise<Movimiento> => {
  try {
    const { data: response } = await api.post<ApiResponse<Movimiento>>('/movimientos', data)
    if (!response.success) {
      throw new Error(response.msg || 'Error al crear el movimiento.')
    }
    return response.data
  } catch (error) {
    console.error('❌ Error al crear el movimiento:', error)
    throw new Error(error instanceof Error ? error.message : 'Error desconocido')
  }
}

/**
 * Actualiza un movimiento existente.
 * @param id - ID del movimiento a actualizar.
 * @param data - Los datos a actualizar.
 * @returns El movimiento actualizado.
 */
export const updateMovimiento = async (id: number, data: UpdateMovimientoInput): Promise<Movimiento> => {
  try {
    const { data: response } = await api.put<ApiResponse<Movimiento>>(`/movimientos/${id}`, data)
    if (!response.success) {
      throw new Error(response.msg || 'Error al actualizar el movimiento.')
    }
    return response.data
  } catch (error) {
    console.error('❌ Error al actualizar el movimiento:', error)
    throw new Error(error instanceof Error ? error.message : 'Error desconocido')
  }
}

/**
 * Elimina un movimiento.
 * @param id - ID del movimiento a eliminar.
 * @returns Void si la operación fue exitosa.
 */
export const deleteMovimiento = async (id: number): Promise<void> => {
  try {
    const { data } = await api.delete<ApiResponse<void>>(`/movimientos/${id}`)
    if (!data.success) {
      throw new Error(data.msg || 'Error al eliminar el movimiento.')
    }
  } catch (error) {
    console.error('❌ Error al eliminar el movimiento:', error)
    throw new Error(error instanceof Error ? error.message : 'Error desconocido')
  }
}
