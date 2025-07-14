/**
 * Categorías posibles para un movimiento Pokémon.
 *
 * Nota importante:
 * Usamos 'físico', 'especial', 'estado' en minúsculas
 * para coincidir EXACTAMENTE con el enum en PostgreSQL y evitar conversiones.
 *
 * Si quieres que el frontend muestre con mayúsculas,
 * puedes usar un helper: `capitalize(categoria)`.
 */
export type CategoriaMovimiento = 'físico' | 'especial' | 'estado';

/**
 * Movimiento completo (como lo devuelve el backend).
 *
 * Incluye todos los campos, IDs y timestamps.
 * Se utiliza para representar los movimientos de un Pokémon que puede aprender o usar.
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
  tipo: string;               // Tipo del movimiento (ej: 'Fuego', 'Agua').
  categoria: CategoriaMovimiento; // Categoría del movimiento ('físico', 'especial', 'estado').
  poder?: number | null;      // Poder del movimiento (opcional, nulo para movimientos de estado).
  precision?: number | null;  // Precisión del movimiento (opcional, nulo si no tiene valor aplicable).
  pp: number;                // Puntos de poder (PP) del movimiento.
  descripcion: string;       // Descripción del movimiento.
}

/**
 * Datos para actualizar un movimiento parcialmente (PATCH).
 *
 * Todos los campos son opcionales para permitir actualizar solo los necesarios.
 * Ideal para casos donde se actualizan parcialmente los datos de un movimiento.
 */
export type UpdateMovimientoInput = Partial<CreateMovimientoInput>;

/**
 * Función para validar que los valores de poder, precisión y PP sean apropiados.
 * Los valores de poder y precisión deben ser números positivos (si existen).
 * Los PP deben ser mayores que 0.
 */
export const validateMovimiento = (movimiento: CreateMovimientoInput): boolean => {
  if (movimiento.poder && (movimiento.poder < 0 || movimiento.poder > 255)) {
    console.error('El poder debe ser un valor entre 0 y 255.');
    return false;
  }
  
  if (movimiento.precision && (movimiento.precision < 0 || movimiento.precision > 100)) {
    console.error('La precisión debe ser un valor entre 0 y 100.');
    return false;
  }

  if (movimiento.pp <= 0) {
    console.error('Los PP deben ser mayores que 0.');
    return false;
  }

  return true;
};
