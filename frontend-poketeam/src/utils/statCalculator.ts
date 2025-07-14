// src/utils/stat.service.ts
import { natures } from './natures'

// Definir los nombres de las estadísticas que se van a calcular
export type StatName = 'hp' | 'atk' | 'def' | 'sp_atk' | 'sp_def' | 'speed'

// Interfaz para los valores de IVs y EVs
interface EVsIVs {
  hp: number;  // Puntos de vida
  atk: number; // Ataque físico
  def: number; // Defensa física
  sp_atk: number; // Ataque especial
  sp_def: number; // Defensa especial
  speed: number; // Velocidad
}

interface CalculoStatsInput {
  base: Record<StatName, number>  // Estadísticas base (hp, atk, etc.)
  ivs: EVsIVs                    // IVs del Pokémon (valores individuales)
  evs: EVsIVs                    // EVs del Pokémon (puntos de esfuerzo)
  naturaleza: string             // Naturaleza del Pokémon
  nivel: number                  // Nivel del Pokémon (normalmente 100)
}

/**
 * Función para calcular una sola estadística (HP, ataque, defensa, etc.)
 */
export const calcularStat = (
  base: number,
  iv: number,
  ev: number,
  nivel: number,
  naturaleza: string,
  stat: StatName
): number => {
  const nature = natures.find((n) => n.nombre === naturaleza)
  let modificador = 1

  // Ajuste del modificador por naturaleza
  if (nature) {
    if (nature.aumenta === stat) {
      modificador = 1.1
    } else if (nature.disminuye === stat) {
      modificador = 0.9
    }
  }

  // Cálculo para HP (vida)
  if (stat === 'hp') {
    return Math.floor(((2 * base + iv + Math.floor(ev / 4)) * nivel) / 100 + nivel + 10)
  } else {
    // Cálculo para otras estadísticas (ataque, defensa, etc.)
    return Math.floor(((((2 * base + iv + Math.floor(ev / 4)) * nivel) / 100) + 5) * modificador)
  }
}

/**
 * Función para calcular todas las estadísticas del Pokémon a partir de sus valores base, IVs, EVs, naturaleza y nivel.
 */
export const calcularTodosLosStats = ({
  base,
  ivs,
  evs,
  naturaleza,
  nivel
}: CalculoStatsInput): EVsIVs => {
  const statsFinales: EVsIVs = {
    hp: 0,
    atk: 0,
    def: 0,
    sp_atk: 0,
    sp_def: 0,
    speed: 0
  }

  // Validar que los valores de IVs y EVs no sean undefined
  const validEVs = evs || { hp: 0, atk: 0, def: 0, sp_atk: 0, sp_def: 0, speed: 0 }
  const validIVs = ivs || { hp: 31, atk: 31, def: 31, sp_atk: 31, sp_def: 31, speed: 31 }

  // Iteramos sobre todas las estadísticas y las calculamos
  for (const stat of Object.keys(statsFinales) as StatName[]) {
    statsFinales[stat] = calcularStat(base[stat], validIVs[stat], validEVs[stat], nivel, naturaleza, stat)
  }

  return statsFinales
}
