// src/api/pokemon.api.ts
import api from './api'
import type {
  Pokemon,
  CreatePokemonInput,
  UpdatePokemonInput
} from '../types/pokemon.types'

// =====================================
// Interfaces genéricas de respuestas
// =====================================
interface ApiListResponse<T> {
  success: boolean
  data: T[]
}

interface ApiSingleResponse<T> {
  success: boolean
  data: T
}

// =====================================
// Obtener todos los Pokémon
// Retorna arreglo directo de Pokémon
// =====================================
export const getAllPokemon = (): Promise<Pokemon[]> =>
  api
    .get<ApiListResponse<Pokemon>>('/pokemon')
    .then(res => res.data.data)

// =====================================
// Obtener un Pokémon por su ID
// =====================================
export const getPokemonById = (id: number): Promise<Pokemon> =>
  api
    .get<ApiSingleResponse<Pokemon>>(`/pokemon/${id}`)
    .then(res => res.data.data)

// =====================================
// Crear un Pokémon
// Puede enviar JSON o FormData
// Si usas FormData puedes incluir archivo imagen
// =====================================
export const createPokemon = (
  data: CreatePokemonInput | FormData
): Promise<Pokemon> => {
  // Detectamos si es FormData para enviar correctamente
  const headers = data instanceof FormData
    ? { 'Content-Type': 'multipart/form-data' }
    : {}

  return api
    .post<ApiSingleResponse<Pokemon>>('/pokemon', data, { headers })
    .then(res => res.data.data)
}

// =====================================
// Actualizar un Pokémon
// Puede enviar JSON o FormData
// =====================================
export const updatePokemon = (
  id: number,
  data: UpdatePokemonInput | FormData
): Promise<Pokemon> => {
  const headers = data instanceof FormData
    ? { 'Content-Type': 'multipart/form-data' }
    : {}

  return api
    .put<ApiSingleResponse<Pokemon>>(`/pokemon/${id}`, data, { headers })
    .then(res => res.data.data)
}

// =====================================
// Eliminar un Pokémon por su ID
// =====================================
export const deletePokemon = (id: number): Promise<void> =>
  api
    .delete<void>(`/pokemon/${id}`)
    .then(() => undefined)

