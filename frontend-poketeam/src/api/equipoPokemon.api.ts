import api from './api'
import type { EquipoPokemonInput, EquipoPokemon } from '../types/equipoPokemon.types'

/**
 * ✅ Agrega un Pokémon a un equipo específico.
 * @param teamId - ID del equipo
 * @param data - Datos del Pokémon a agregar
 * @returns El registro creado de EquipoPokemon
 */
export const addPokemonToEquipo = async (teamId: number, data: EquipoPokemonInput): Promise<EquipoPokemon> => {
  try {
    const response = await api.post<{ success: boolean; data: EquipoPokemon }>(
      `/equipo-pokemon/equipo/${teamId}`,
      data
    )
    if (!response.data.success) {
      throw new Error('No se pudo agregar el Pokémon al equipo.')
    }
    return response.data.data
  } catch (error) {
    console.error('❌ Error al agregar Pokémon:', error)
    throw new Error(error instanceof Error ? error.message : 'Error desconocido al agregar Pokémon.')
  }
}

/**
 * ✅ Obtiene un Pokémon del equipo por su ID.
 * @param id - ID del registro EquipoPokemon
 * @returns Detalle del EquipoPokemon
 */
export const getEquipoPokemonById = async (id: number): Promise<EquipoPokemon> => {
  try {
    const response = await api.get<{ success: boolean; data: EquipoPokemon }>(`/equipo-pokemon/${id}`)
    if (!response.data.success) {
      throw new Error('No se pudo obtener el Pokémon.')
    }
    return response.data.data
  } catch (error) {
    console.error('❌ Error al obtener el Pokémon:', error)
    throw new Error(error instanceof Error ? error.message : 'Error desconocido al obtener el Pokémon.')
  }
}

/**
 * ✅ Edita un Pokémon dentro del equipo.
 * @param id - ID del registro EquipoPokemon
 * @param data - Nuevos datos para actualizar
 * @returns El registro actualizado
 */
export const updateEquipoPokemon = async (id: number, data: EquipoPokemonInput): Promise<EquipoPokemon> => {
  try {
    const response = await api.put<{ success: boolean; data: EquipoPokemon }>(
      `/equipo-pokemon/${id}`,
      data
    )
    if (!response.data.success) {
      throw new Error('No se pudo actualizar el Pokémon.')
    }
    return response.data.data
  } catch (error) {
    console.error('❌ Error al actualizar Pokémon:', error)
    throw new Error(error instanceof Error ? error.message : 'Error desconocido al actualizar Pokémon.')
  }
}

/**
 * ✅ Elimina un Pokémon del equipo.
 * @param id - ID del registro EquipoPokemon
 * @returns true si la operación fue exitosa
 */
export const deleteEquipoPokemon = async (id: number): Promise<boolean> => {
  try {
    const response = await api.delete<{ success: boolean }>(`/equipo-pokemon/${id}`)
    if (!response.data.success) {
      throw new Error('No se pudo eliminar el Pokémon.')
    }
    return response.data.success
  } catch (error) {
    console.error('❌ Error al eliminar Pokémon:', error)
    throw new Error(error instanceof Error ? error.message : 'Error desconocido al eliminar Pokémon.')
  }
}

/**
 * ✅ Obtiene todos los Pokémon de un equipo.
 * @param teamId - ID del equipo
 * @returns Lista de los Pokémon que pertenecen al equipo
 */
export const getTeamPokemons = async (teamId: number): Promise<EquipoPokemon[]> => {
  try {
    const response = await api.get<{ success: boolean; data: EquipoPokemon[] }>(
      `/equipo-pokemon/equipo/${teamId}`
    )
    if (!response.data.success) {
      throw new Error('No se pudieron obtener los Pokémon del equipo.')
    }
    return response.data.data
  } catch (error) {
    console.error('❌ Error al obtener los Pokémon del equipo:', error)
    throw new Error(error instanceof Error ? error.message : 'Error desconocido al obtener los Pokémon del equipo.')
  }
}
