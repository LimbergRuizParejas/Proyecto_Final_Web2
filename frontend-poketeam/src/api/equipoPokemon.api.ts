import api from './api'
import type { EquipoPokemonInput, EquipoPokemon } from '../types/equipoPokemon.types'

/**
 * .
 * @param teamId - 
 * @param data -
 * @returns 
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
 * 
 * @param id - 
 * @returns 
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
 * 
 * @param id - 
 * @param data - 
 * @returns 
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
 * .
 * @param id - 
 * @returns 
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
 * 
 * @param teamId - 
 * @returns 
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
