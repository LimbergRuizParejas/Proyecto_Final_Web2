import type { Equipo } from '../../types/equipo.types'

interface Props {
  equipo: Equipo
}

const EquipoResumen = ({ equipo }: Props) => {
  // Aseguramos que los Pokémon del equipo estén disponibles en caso de que falten.
  const pokemones = equipo.pokemones || equipo.equipoPokemon || []

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Resumen del equipo</h2>

      <div className="space-y-2 text-gray-800">
        {/* Nombre del equipo */}
        <p>
          <span className="font-medium">Nombre del equipo:</span>{' '}
          {equipo.nombre || equipo.name || '-'}
        </p>

        {/* ID del equipo */}
        <p>
          <span className="font-medium">ID:</span> {equipo.id}
        </p>

        {/* ID del usuario asociado */}
        <p>
          <span className="font-medium">Usuario ID:</span>{' '}
          {equipo.usuarioId || equipo.userId || '-'}
        </p>

        {/* Fecha de creación */}
        <p>
          <span className="font-medium">Creado:</span>{' '}
          {equipo.createdAt
            ? new Date(equipo.createdAt).toLocaleString()
            : '-'}
        </p>

        {/* Fecha de actualización */}
        <p>
          <span className="font-medium">Actualizado:</span>{' '}
          {equipo.updatedAt
            ? new Date(equipo.updatedAt).toLocaleString()
            : '-'}
        </p>

        {/* Muestra la lista de Pokémon si existen */}
        {pokemones.length > 0 ? (
          <div>
            <p className="font-medium mt-4 mb-2">Pokémones del equipo:</p>
            <div className="flex flex-wrap gap-4">
              {pokemones.map((poke, index) => {
                // Ruta para la imagen del Pokémon
             const pokeImageUrl = poke.pokemon?.imagen
  ? `http://localhost:3000/uploads/pokemons/${poke.pokemon.imagen}`  // Si tiene imagen, carga la URL desde el backend
  : `http://localhost:3000/uploads/pokemons/${poke.pokemonId}.png`  // Si no, carga la imagen por defecto usando el ID

                return (
                  <div
                    key={`${poke.pokemonId}-${index}`}  // Usamos una combinación de pokemonId y el índice para evitar problemas con claves duplicadas
                    className="flex flex-col items-center bg-gray-50 p-2 rounded shadow-sm"
                  >
                    <img
                      src={pokeImageUrl}  // Usamos la URL correcta
                      alt={poke.pokemon?.nombre || `Pokémon ${poke.pokemonId}`}  // Nombre o ID si no hay nombre
                      className="w-14 h-14 object-contain mx-auto rounded shadow"
                    />
                    <span className="text-xs mt-1 font-medium">
                      {poke.pokemon?.nombre || `ID ${poke.pokemonId}`}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        ) : (
          <p className="italic text-gray-500 mt-4">
            Este equipo no tiene Pokémon registrados.
          </p>
        )}
      </div>
    </div>
  )
}

export default EquipoResumen
