import { useNavigate } from 'react-router-dom'
import type { Equipo, EquipoPokemon } from '../../types/equipo.types'

interface Props {
  equipo: Equipo
}

const TeamCard = ({ equipo }: Props) => {
  const navigate = useNavigate()

  // Asegura obtener siempre los pokémones y maneja correctamente las propiedades
  const pokemones: EquipoPokemon[] = equipo.pokemones || equipo.equipoPokemon || []

  console.log('🔍 Renderizando TeamCard para:', equipo)
  console.log('➡️ Pokémones del equipo:', pokemones)

  const handleClick = () => {
    if (equipo?.id) {
      navigate(`/team/${equipo.id}`)
    } else {
      console.warn('⚠️ Equipo sin ID válido:', equipo)
    }
  }

  return (
    <div
      onClick={handleClick}
      className="border border-gray-300 p-4 rounded-lg shadow hover:shadow-md cursor-pointer transition"
    >
      <h2 className="text-lg font-bold mb-3 text-center">
        {equipo.name || equipo.nombre || 'Equipo sin nombre'}
      </h2>

      {/* Mostrar Pokémones del equipo */}
      {pokemones.length > 0 ? (
        <div className="flex flex-wrap justify-center gap-2">
          {pokemones.map((poke) => {
            // Verificar si la imagen existe en el backend y generar la URL correspondiente
            const pokeImageUrl = poke.pokemon?.imagen
              ? poke.pokemon.imagen.startsWith('/')
                ? `http://localhost:3000${poke.pokemon.imagen}`  // Si la imagen está en el backend, la cargamos desde la ruta
                : poke.pokemon.imagen  // Si la imagen es una URL completa
              : `http://localhost:3000/uploads/pokemons/${poke.pokemonId}.png`  // Si no, usamos la imagen por ID

            return (
              <div key={poke.id} className="flex flex-col items-center">
                <img
                  src={pokeImageUrl}  // Usamos la URL correcta para la imagen
                  alt={poke.pokemon?.nombre || `Pokémon ${poke.pokemonId}`}  // Nombre o ID si no hay nombre
                  className="w-12 h-12 object-contain rounded shadow"
                />
                <span className="text-xs mt-1 font-medium">
                  {poke.pokemon?.nombre || `ID ${poke.pokemonId}`}
                </span>
              </div>
            )
          })}
        </div>
      ) : (
        <p className="text-center text-gray-500 italic mt-2">
      Click para ver tu equipo
        </p>
      )}
    </div>
  )
}

export default TeamCard
