import { Link } from 'react-router-dom'
import type { EquipoPokemon } from '../../types/equipoPokemon.types'

interface Props {
  pokemon: EquipoPokemon
}

const PokemonSlot = ({ pokemon }: Props) => {
  // Construimos la URL correcta para la imagen
  const pokeImageUrl = pokemon.pokemon?.imagen
    ? `http://localhost:3000/uploads/pokemons/${pokemon.pokemon.imagen}`  // Usar imagen desde el backend
    : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.pokemonId}.png`  // Fallback en caso de que no exista imagen en el servidor

  return (
    <div className="bg-white rounded-lg shadow p-4 flex items-center justify-between hover:shadow-md transition">
      <div className="flex items-center space-x-4">
        {/* Imagen del Pokémon */}
        <img
          src={pokeImageUrl}  // Usamos la URL correcta
          alt={pokemon.apodo || pokemon.pokemon?.nombre || 'Pokémon'}
          className="w-16 h-16 object-contain"
        />
        <div>
          {/* Nombre o apodo del Pokémon */}
          <p className="font-semibold text-lg">
            {pokemon.apodo || pokemon.pokemon?.nombre || 'Sin nombre'}
          </p>
          {/* ID del Pokémon */}
          <p className="text-sm text-gray-500">ID: {pokemon.pokemonId}</p>
          {/* Naturaleza del Pokémon */}
          <p className="text-sm text-gray-500">
            Naturaleza:{' '}
            <span className="font-medium">{pokemon.naturaleza || '—'}</span>
          </p>
        </div>
      </div>
      {/* Enlace para editar el Pokémon */}
      <Link
        to={`/pokemon/${pokemon.id}`}
        className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded text-sm"
      >
        Editar
      </Link>
    </div>
  )
}

export default PokemonSlot
