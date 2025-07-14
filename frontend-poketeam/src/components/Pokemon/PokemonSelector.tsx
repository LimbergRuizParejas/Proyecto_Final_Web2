import type { Pokemon } from '../../types/pokemon.types'

interface PokemonSelectorProps {
  selectedPokemon: Pokemon
  onChange?: (pokemon: Pokemon) => void
}

const PokemonSelector = ({ selectedPokemon, onChange }: PokemonSelectorProps) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow space-y-3">
      <h2 className="text-xl font-bold text-gray-800">Pokémon seleccionado</h2>
      
      <div className="flex items-center space-x-4">
        <img
          src={selectedPokemon.imagen ? `/${selectedPokemon.imagen}` : '/placeholder.png'}
          alt={selectedPokemon.nombre}
          className="w-20 h-20 object-contain"
        />
        <div>
          <p className="text-lg font-semibold">{selectedPokemon.nombre}</p>
          <div className="flex gap-2 mt-1">
            <span className="px-2 py-1 rounded bg-blue-100 text-blue-800 text-sm">
              {selectedPokemon.tipo1}
            </span>
            {selectedPokemon.tipo2 && (
              <span className="px-2 py-1 rounded bg-green-100 text-green-800 text-sm">
                {selectedPokemon.tipo2}
              </span>
            )}
          </div>
        </div>
      </div>

      {onChange && (
        <button
          onClick={() =>
            onChange({
              ...selectedPokemon,
              nombre: 'Pikachu',
              imagen: 'uploads/pokemon/pikachu.png', 
              tipo1: 'Eléctrico',
              tipo2: null,
              habilidades: ['Static'],
              descripcion: 'El ratón eléctrico más famoso.',
              stats: {
                hp: 35, atk: 55, def: 40, sp_atk: 50, sp_def: 50, speed: 90
              },
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              id: selectedPokemon.id, 
            })
          }
          className="mt-2 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded transition"
        >
          Cambiar a Pikachu (demo)
        </button>
      )}
    </div>
  )
}

export default PokemonSelector
