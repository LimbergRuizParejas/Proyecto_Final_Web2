/**
 * Representa las estadísticas base de un Pokémon.
 * 
 * - hp: Puntos de vida
 * - atk: Ataque físico
 * - def: Defensa física
 * - sp_atk: Ataque especial
 * - sp_def: Defensa especial
 * - speed: Velocidad
 */
export interface Stats {
  hp: number;
  atk: number;
  def: number;
  sp_atk: number;
  sp_def: number;
  speed: number;
}

/**
 * Categorías posibles para un movimiento Pokémon.
 *
 * Usamos 'físico', 'especial', 'estado' en minúsculas
 * para coincidir EXACTAMENTE con el enum en PostgreSQL y evitar conversiones.
 */
export type CategoriaMovimiento = 'físico' | 'especial' | 'estado';

/**
 * Movimiento completo (como lo devuelve el backend).
 *
 * Incluye todos los campos, IDs y timestamps.
 */
export interface Movimiento {
  id: number;                  // ID único para identificar el movimiento.
  nombre: string;              // Nombre del movimiento (ej: 'Lanzallamas', 'Placaje').
  tipo: string;                // Tipo del movimiento (ej: 'Fuego', 'Agua', 'Eléctrico').
  categoria: CategoriaMovimiento; // Categoría del movimiento (físico, especial o estado).
  poder?: number | null;       // Poder del movimiento, puede ser nulo para movimientos de estado.
  precision?: number | null;   // Precisión del movimiento, puede ser nulo si no tiene valor aplicable.
  pp: number;                 // Puntos de poder (PP) del movimiento.
  descripcion: string;        // Descripción del movimiento (qué hace el movimiento).
  createdAt: string;          // Fecha de creación en formato ISO (timestamp).
  updatedAt: string;          // Fecha de última actualización en formato ISO (timestamp).
}

/**
 * Datos para crear un movimiento nuevo (POST).
 *
 * Similar a Movimiento, pero sin id ni timestamps.
 * Se utiliza cuando se va a crear un movimiento desde el frontend.
 */
export interface CreateMovimientoInput {
  nombre: string;             // Nombre del movimiento.
  tipo: string;               // Tipo del movimiento.
  categoria: CategoriaMovimiento; // Categoría del movimiento.
  poder?: number | null;      // Poder del movimiento (opcional, nulo para movimientos de estado).
  precision?: number | null;  // Precisión del movimiento (opcional).
  pp: number;                // Puntos de poder (PP) del movimiento.
  descripcion: string;       // Descripción del movimiento.
}

/**
 * Datos para actualización parcial de un movimiento (PATCH).
 *
 * Todos los campos son opcionales para permitir actualizar solo los necesarios.
 * Ideal para casos donde se actualizan parcialmente los datos de un movimiento.
 */
export type UpdateMovimientoInput = Partial<CreateMovimientoInput>;

/**
 * Representa un Pokémon completo recibido desde la API o guardado en base de datos.
 * 
 * Incluye sus movimientos posibles (para el teambuilder).
 */
export interface Pokemon {
  id: number;               // ID único
  nombre: string;           // Nombre del Pokémon
  tipo1: string;            // Tipo primario (ej: Agua, Fuego)
  tipo2?: string | null;    // Tipo secundario (opcional)
  habilidades: string[];    // Array de habilidades
  imagen: string;           // Ruta o URL a la imagen
  descripcion: string;      // Descripción del Pokémon
  stats: Stats;             // Estadísticas base
  movimientos: Movimiento[]; // Lista de movimientos que puede aprender
  createdAt: string;
  updatedAt: string;
}

/**
 * Datos para la creación de un Pokémon.
 * 
 * Puede omitirse movimientos, ya que suelen establecerse aparte en la tabla intermedia.
 * Se usa cuando se crea un nuevo Pokémon desde el frontend.
 */
export interface CreatePokemonInput {
  nombre: string;
  tipo1: string;
  tipo2?: string | null;
  habilidades: string[];
  imagen: string;
  descripcion: string;
  stats: Stats;
}

/**
 * Datos para actualización parcial de un Pokémon.
 * 
 * Todos los campos son opcionales para permitir actualizar solo los necesarios.
 * Ideal para casos donde se actualizan parcialmente los datos del Pokémon.
 */
export type UpdatePokemonInput = Partial<CreatePokemonInput>;

