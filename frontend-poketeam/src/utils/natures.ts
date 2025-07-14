// src/utils/natures.ts

// Define la estructura de una naturaleza para un Pokémon.
export interface Naturaleza {
  nombre: string          // Nombre de la naturaleza (ej: 'Hardy', 'Lonely')
  aumenta: string | null  // Stat que aumenta con esta naturaleza (ej: 'atk', 'def')
  disminuye: string | null // Stat que disminuye con esta naturaleza (ej: 'spd', 'speed')
}

// Arreglo que contiene todas las naturalezas disponibles en el juego.
export const natures: Naturaleza[] = [
  { nombre: 'Hardy', aumenta: null, disminuye: null },
  { nombre: 'Lonely', aumenta: 'atk', disminuye: 'def' },
  { nombre: 'Brave', aumenta: 'atk', disminuye: 'speed' },
  { nombre: 'Adamant', aumenta: 'atk', disminuye: 'sp_atk' },
  { nombre: 'Naughty', aumenta: 'atk', disminuye: 'sp_def' },
  { nombre: 'Bold', aumenta: 'def', disminuye: 'atk' },
  { nombre: 'Docile', aumenta: null, disminuye: null },
  { nombre: 'Relaxed', aumenta: 'def', disminuye: 'speed' },
  { nombre: 'Impish', aumenta: 'def', disminuye: 'sp_atk' },
  { nombre: 'Lax', aumenta: 'def', disminuye: 'sp_def' },
  { nombre: 'Timid', aumenta: 'speed', disminuye: 'atk' },
  { nombre: 'Hasty', aumenta: 'speed', disminuye: 'def' },
  { nombre: 'Serious', aumenta: null, disminuye: null },
  { nombre: 'Jolly', aumenta: 'speed', disminuye: 'sp_atk' },
  { nombre: 'Naive', aumenta: 'speed', disminuye: 'sp_def' },
  { nombre: 'Modest', aumenta: 'sp_atk', disminuye: 'atk' },
  { nombre: 'Mild', aumenta: 'sp_atk', disminuye: 'def' },
  { nombre: 'Quiet', aumenta: 'sp_atk', disminuye: 'speed' },
  { nombre: 'Bashful', aumenta: null, disminuye: null },
  { nombre: 'Rash', aumenta: 'sp_atk', disminuye: 'sp_def' },
  { nombre: 'Calm', aumenta: 'sp_def', disminuye: 'atk' },
  { nombre: 'Gentle', aumenta: 'sp_def', disminuye: 'def' },
  { nombre: 'Sassy', aumenta: 'sp_def', disminuye: 'speed' },
  { nombre: 'Careful', aumenta: 'sp_def', disminuye: 'sp_atk' },
  { nombre: 'Quirky', aumenta: null, disminuye: null }
]
