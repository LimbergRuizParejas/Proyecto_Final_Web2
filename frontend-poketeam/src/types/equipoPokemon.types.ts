// src/types/equipoPokemon.types.ts

import type { Movimiento } from './movimiento.types'
import type { Pokemon } from './pokemon.types'

export interface EVsIVs {
  hp: number;  
  atk: number; 
  def: number; 
  spa: number; 
  spd: number; 
  spe: number; 
}

export interface EquipoPokemonInput {
  pokemonId: number;               
  itemId: number;                  
  apodo: string;                   
  habilidad: string;               
  naturaleza: string;              
  evs: EVsIVs;                     
  ivs: EVsIVs;                     
  movimientos: Movimiento[];       
}

export interface EquipoPokemon extends EquipoPokemonInput {
  id: number;                      
  teamId: number;                  
  statsFinales: EVsIVs;            
  createdAt: string;               
  updatedAt: string;               
  pokemon: Pokemon;                
}

export const validateEVsAndIVs = (evs: EVsIVs, ivs: EVsIVs): boolean => {
  const validEVRange = (ev: number) => ev >= 0 && ev <= 252;  
  const validIVRange = (iv: number) => iv >= 0 && iv <= 31;    

  for (const stat in evs) {
    if (!validEVRange(evs[stat as keyof EVsIVs])) {
      console.error(`Invalid EV value for ${stat}: ${evs[stat as keyof EVsIVs]}. EV values must be between 0 and 252.`);
      return false;  
    }
  }

  for (const stat in ivs) {
    if (!validIVRange(ivs[stat as keyof EVsIVs])) {
      console.error(`Invalid IV value for ${stat}: ${ivs[stat as keyof EVsIVs]}. IV values must be between 0 and 31.`);
      return false;  
    }
  }

  return true;
};
