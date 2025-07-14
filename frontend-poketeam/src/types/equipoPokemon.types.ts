// src/types/equipoPokemon.types.ts

import type { Movimiento } from './movimiento.types'
import type { Pokemon } from './pokemon.types'

// Definición de las estadísticas base, EVs, IVs o finales de un Pokémon
export interface EVsIVs {
  hp: number;  // Puntos de vida (Health Points)
  atk: number; // Ataque físico (Attack)
  def: number; // Defensa física (Defense)
  spa: number; // Ataque especial (Special Attack)
  spd: number; // Defensa especial (Special Defense)
  spe: number; // Velocidad (Speed)
}

// Datos requeridos para crear o editar un Pokémon en el equipo
export interface EquipoPokemonInput {
  pokemonId: number;               // ID del Pokémon base
  itemId: number;                  // ID del ítem equipado (puede ser null si no tiene ítem)
  apodo: string;                   // Nombre personalizado del Pokémon (nickname)
  habilidad: string;               // Nombre de la habilidad elegida para el Pokémon
  naturaleza: string;              // Naturaleza del Pokémon (por ejemplo, "Adamant", "Modest")
  evs: EVsIVs;                     // Valores de esfuerzo (EVs) que incrementan las estadísticas
  ivs: EVsIVs;                     // Valores individuales (IVs) que determinan el potencial del Pokémon
  movimientos: Movimiento[];       // Lista de movimientos asignados al Pokémon
}

// Datos extendidos de un Pokémon en el equipo (incluye metadata y estadísticas finales)
export interface EquipoPokemon extends EquipoPokemonInput {
  id: number;                      // ID único del registro EquipoPokemon
  teamId: number;                  // ID del equipo al que pertenece este Pokémon
  statsFinales: EVsIVs;            // Estadísticas finales calculadas con IVs, EVs y naturaleza
  createdAt: string;               // Timestamp de creación en formato ISO
  updatedAt: string;               // Timestamp de última modificación en formato ISO
  pokemon: Pokemon;                // Objeto completo del Pokémon (incluye imagen, tipos, nombre, etc.)
}

// Validaciones adicionales para asegurar que los valores de EVs y IVs sean correctos
export const validateEVsAndIVs = (evs: EVsIVs, ivs: EVsIVs): boolean => {
  const validEVRange = (ev: number) => ev >= 0 && ev <= 252;  // Rango válido de EVs (0 a 252)
  const validIVRange = (iv: number) => iv >= 0 && iv <= 31;    // Rango válido de IVs (0 a 31)

  // Validar EVs
  for (const stat in evs) {
    if (!validEVRange(evs[stat as keyof EVsIVs])) {
      console.error(`Invalid EV value for ${stat}: ${evs[stat as keyof EVsIVs]}. EV values must be between 0 and 252.`);
      return false;  // Si un EV no está en el rango, se detiene la validación
    }
  }

  // Validar IVs
  for (const stat in ivs) {
    if (!validIVRange(ivs[stat as keyof EVsIVs])) {
      console.error(`Invalid IV value for ${stat}: ${ivs[stat as keyof EVsIVs]}. IV values must be between 0 and 31.`);
      return false;  // Si un IV no está en el rango, se detiene la validación
    }
  }

  // Si todos los valores de EVs y IVs son válidos, retorna true
  return true;
};

