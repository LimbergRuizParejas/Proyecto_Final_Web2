import type { Pokemon } from '../../types/pokemon.types'

const PokemonCard = ({ pokemon }: { pokemon: Pokemon }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 text-center hover:shadow-lg transition-shadow duration-200">
      {/* Si la imagen está ausente, se muestra una imagen por defecto */}
      <img
        src={pokemon.imagen || '/default_image_url.png'}  // Cambié el fallback por un path relativo o URL válida
        alt={pokemon.nombre}
        className="w-20 h-20 mx-auto mb-4 rounded-full object-cover"
      />
      <h3 className="text-lg font-semibold text-gray-800">{pokemon.nombre}</h3>
      
      <div className="flex justify-center gap-2 mt-2">
        {/* Tipo 1 */}
        <span className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm font-medium">{pokemon.tipo1}</span>
        
        {/* Si tipo2 existe, se muestra también */}
        {pokemon.tipo2 && (
          <span className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm font-medium">{pokemon.tipo2}</span>
        )}
      </div>
    </div>
  )
}

export default PokemonCard
