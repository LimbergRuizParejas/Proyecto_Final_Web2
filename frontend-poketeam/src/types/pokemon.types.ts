export interface Stats {
  hp: number;
  atk: number;
  def: number;
  sp_atk: number;
  sp_def: number;
  speed: number;
}

export type CategoriaMovimiento = 'físico' | 'especial' | 'estado';

export interface Movimiento {
  id: number;
  nombre: string;
  tipo: string;
  categoria: CategoriaMovimiento;
  poder?: number | null;
  precision?: number | null;
  pp: number;
  descripcion: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateMovimientoInput {
  nombre: string;
  tipo: string;
  categoria: CategoriaMovimiento;
  poder?: number | null;
  precision?: number | null;
  pp: number;
  descripcion: string;
}

export type UpdateMovimientoInput = Partial<CreateMovimientoInput>;

export interface Pokemon {
  id: number;
  nombre: string;
  tipo1: string;
  tipo2?: string | null;
  habilidades: string[];
  imagen: string;
  descripcion: string;
  stats: Stats;
  movimientos: Movimiento[];
  createdAt: string;
  updatedAt: string;
}

export interface CreatePokemonInput {
  nombre: string;
  tipo1: string;
  tipo2?: string | null;
  habilidades: string[];
  imagen: string;
  descripcion: string;
  stats: Stats;
}

export type UpdatePokemonInput = Partial<CreatePokemonInput>;
