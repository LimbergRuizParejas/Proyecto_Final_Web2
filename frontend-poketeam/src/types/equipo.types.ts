
import type { EquipoPokemon } from './equipoPokemon.types'


export interface Equipo {
  id: number


  nombre?: string
  name?: string


  usuarioId?: number
  userId?: number

 
  pokemones?: EquipoPokemon[]
  equipoPokemon?: EquipoPokemon[] 

  createdAt: string
  updatedAt: string
}

export interface CreateEquipoInput {
  nombre: string
  usuarioId: number
}


export interface UpdateEquipoInput {
  nombre?: string
}


export type { EquipoPokemon }
