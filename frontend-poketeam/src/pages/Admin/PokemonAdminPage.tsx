import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAllPokemon, deletePokemon } from '../../api/pokemon.api'
import type { Pokemon } from '../../types/pokemon.types'

const PokemonAdminPage = () => {
  const [pokemones, setPokemones] = useState<Pokemon[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const BASE_URL = (import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000').replace(/\/$/, '')

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError('')
        const data = await getAllPokemon()
        setPokemones(data)
      } catch (err) {
        console.error('❌ Error al cargar Pokémon:', err)
        setError('No se pudo cargar la lista de Pokémon.')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleDelete = async (id: number) => {
    if (!confirm('¿Estás seguro de eliminar este Pokémon?')) return
    try {
      await deletePokemon(id)
      setPokemones(prev => prev.filter(p => p.id !== id))
      alert('✅ Pokémon eliminado correctamente.')
    } catch (err) {
      console.error('❌ Error al eliminar Pokémon:', err)
      alert('Error al eliminar Pokémon.')
    }
  }

  const handleEdit = (id: number) => navigate(`/admin/pokemon/${id}/edit`)
  const handleCreate = () => navigate('/admin/pokemon/new')

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Administración de Pokémon</h1>

      <button
        onClick={handleCreate}
        className="mb-6 bg-green-600 hover:bg-green-700 focus:ring-2 focus:ring-green-400 text-white px-4 py-2 rounded transition"
      >
        ➕ Crear Pokémon
      </button>

      {loading && <p className="text-center text-lg text-blue-600">🔄 Cargando Pokémon...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading && !error && pokemones.length === 0 && (
        <p className="text-center text-gray-600">No hay Pokémon registrados.</p>
      )}

      {!loading && !error && pokemones.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 shadow-sm text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 border-b">Imagen</th>
                <th className="py-2 px-4 border-b">Nombre</th>
                <th className="py-2 px-4 border-b">Tipo(s)</th>
                <th className="py-2 px-4 border-b">Habilidades</th>
                <th className="py-2 px-4 border-b">Stats</th>
                <th className="py-2 px-4 border-b">Descripción</th>
                <th className="py-2 px-4 border-b">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {pokemones.map((poke) => {
                const stats = poke.stats || { hp: '-', atk: '-', def: '-', sp_atk: '-', sp_def: '-', speed: '-' }
                const habilidades = poke.habilidades?.length ? poke.habilidades.join(', ') : '-'

                const imgSrc = poke.imagen
                  ? `${BASE_URL}/${poke.imagen.replace(/^\//, '')}`
                  : '/placeholder.png'  // imagen local estática en public/

                return (
                  <tr key={poke.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-2 px-4 border-b text-center">
                      <img
                        src={imgSrc}
                        alt={`Imagen de ${poke.nombre || 'Pokémon'}`}
                        className="w-16 h-16 object-contain mx-auto rounded shadow"
                      />
                    </td>
                    <td className="py-2 px-4 border-b font-semibold">{poke.nombre || '-'}</td>
                    <td className="py-2 px-4 border-b">
                      {poke.tipo1}{poke.tipo2 ? ` / ${poke.tipo2}` : ''}
                    </td>
                    <td className="py-2 px-4 border-b">{habilidades}</td>
                    <td className="py-2 px-4 border-b whitespace-nowrap">
                      HP:{stats.hp} Atk:{stats.atk} Def:{stats.def}<br />
                      SpA:{stats.sp_atk} SpD:{stats.sp_def} Spe:{stats.speed}
                    </td>
                    <td className="py-2 px-4 border-b max-w-xs truncate" title={poke.descripcion || ''}>
                      {poke.descripcion || '-'}
                    </td>
                    <td className="py-2 px-4 border-b space-x-2">
                      <button
                        onClick={() => handleEdit(poke.id)}
                        className="bg-yellow-400 hover:bg-yellow-500 focus:ring-2 focus:ring-yellow-300 text-white px-3 py-1 rounded transition"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(poke.id)}
                        className="bg-red-600 hover:bg-red-700 focus:ring-2 focus:ring-red-400 text-white px-3 py-1 rounded transition"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default PokemonAdminPage
