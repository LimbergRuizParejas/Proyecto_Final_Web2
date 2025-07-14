import { natures } from './natures'

export type StatName = 'hp' | 'atk' | 'def' | 'sp_atk' | 'sp_def' | 'speed'

interface EVsIVs {
  hp: number;
  atk: number;
  def: number;
  sp_atk: number;
  sp_def: number;
  speed: number;
}

interface CalculoStatsInput {
  base: Record<StatName, number>
  ivs: EVsIVs
  evs: EVsIVs
  naturaleza: string
  nivel: number
}

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

  if (nature) {
    if (nature.aumenta === stat) {
      modificador = 1.1
    } else if (nature.disminuye === stat) {
      modificador = 0.9
    }
  }

  if (stat === 'hp') {
    return Math.floor(((2 * base + iv + Math.floor(ev / 4)) * nivel) / 100 + nivel + 10)
  } else {
    return Math.floor(((((2 * base + iv + Math.floor(ev / 4)) * nivel) / 100) + 5) * modificador)
  }
}

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

  const validEVs = evs || { hp: 0, atk: 0, def: 0, sp_atk: 0, sp_def: 0, speed: 0 }
  const validIVs = ivs || { hp: 31, atk: 31, def: 31, sp_atk: 31, sp_def: 31, speed: 31 }

  for (const stat of Object.keys(statsFinales) as StatName[]) {
    statsFinales[stat] = calcularStat(base[stat], validIVs[stat], validEVs[stat], nivel, naturaleza, stat)
  }

  return statsFinales
}
