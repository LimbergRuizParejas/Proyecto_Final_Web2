import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getEquipoPokemonById, updateEquipoPokemon } from '../../api/equipoPokemon.api'
import type { EquipoPokemon } from '../../types/equipoPokemon.types'
import type { Pokemon } from '../../types/pokemon.types'
import type { Movimiento } from '../../types/movimiento.types'
import PokemonSelector from '../../components/Pokemon/PokemonSelector'
import MoveSelector from '../../components/Pokemon/MoveSelector'
import EVIVEditor from '../../components/Pokemon/EVIVEditor'
import StatsDisplay from '../../components/Pokemon/StatsDisplay'
import { calcularTodosLosStats } from '../../utils/stat.service'

const PokemonConfigPage = () => {
  const { pokemonId } = useParams<{ pokemonId: string }>()
  const [equipoPokemon, setEquipoPokemon] = useState<EquipoPokemon | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string>('')

  useEffect(() => {
    const fetchData = async () => {
      if (!pokemonId) return
      setLoading(true)
      setError('')

      console.log(`🔄 Comenzando la carga de datos para el Pokémon con ID: ${pokemonId}`)

      try {
        const data = await getEquipoPokemonById(Number(pokemonId))
        console.log('✅ EquipoPokemon cargado:', data)

        // Verifica que los valores de IVs y EVs no sean undefined
        const validEVs = data.evs || { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }
        const validIVs = data.ivs || { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 }

        // Si existe, calculamos las stats con los valores de IVs, EVs y naturaleza
        if (data.pokemon?.stats) {
          console.log('✅ Calculando stats con los datos:', {
            base: data.pokemon.stats,
            ivs: validIVs,
            evs: validEVs,
            naturaleza: data.naturaleza
          })

          const stats = calcularTodosLosStats({
            base: data.pokemon.stats,  // Stats base del Pokémon
            ivs: validIVs,             // IVs del Pokémon
            evs: validEVs,             // EVs del Pokémon
            naturaleza: data.naturaleza,
            nivel: 100                 // Usamos el nivel 100 para calcular las stats finales
          })
          console.log('✅ Stats calculados:', stats)
          data.statsFinales = stats // Stats calculados y asignados
        }

        setEquipoPokemon(data)
      } catch (err) {
        console.error('❌ Error al cargar EquipoPokemon:', err)
        setError('No se pudo cargar el Pokémon. Intenta más tarde.')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [pokemonId])

  const handlePokemonChange = (pokemon: Pokemon) => {
    if (!equipoPokemon) return
    console.log('✅ Pokémon cambiado:', pokemon)
    setEquipoPokemon({ ...equipoPokemon, pokemon })
  }

  const handleMovimientosChange = (movimientos: Movimiento[]) => {
    if (!equipoPokemon) return
    console.log('✅ Movimientos cambiados:', movimientos)
    setEquipoPokemon({ ...equipoPokemon, movimientos })
  }

  const handleEVIVChange = (
    evs: EquipoPokemon['evs'],
    ivs: EquipoPokemon['ivs'],
    naturaleza: string
  ) => {
    if (!equipoPokemon) return
    console.log('✅ EVs, IVs y Naturaleza cambiados:', evs, ivs, naturaleza)

    // Verificar si IVs y EVs son válidos
    const validEVs = evs || { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }
    const validIVs = ivs || { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 }

    const nuevosStats = equipoPokemon.pokemon?.stats
      ? calcularTodosLosStats({
          base: equipoPokemon.pokemon.stats,
          ivs: validIVs, // Usamos valores por defecto si son undefined
          evs: validEVs, // Usamos valores por defecto si son undefined
          naturaleza,
          nivel: 100
        })
      : undefined

    setEquipoPokemon({ ...equipoPokemon, evs, ivs, naturaleza, statsFinales: nuevosStats })
  }

  const handleSave = async () => {
    if (!equipoPokemon) return
    setSaving(true)
    console.log('🔄 Guardando cambios para el Pokémon:', equipoPokemon.pokemonId)

    try {
      const payload = {
        itemId: equipoPokemon.itemId,
        pokemonId: equipoPokemon.pokemonId,
        habilidad: equipoPokemon.habilidad,
        naturaleza: equipoPokemon.naturaleza,
        movimientos: equipoPokemon.movimientos,
        evs: equipoPokemon.evs,
        ivs: equipoPokemon.ivs,
        apodo: equipoPokemon.apodo || ''
      }
      console.log('✅ Payload a guardar:', payload)

      await updateEquipoPokemon(equipoPokemon.id, payload)
      console.log('✅ Pokémon actualizado correctamente')
      alert('✅ Pokémon actualizado correctamente')
    } catch (err) {
      console.error('❌ Error al actualizar el Pokémon:', err)
      alert('Ocurrió un error al guardar los cambios.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <p className="p-4 text-center">🔄 Cargando Pokémon...</p>
  }

  if (error) {
    return <p className="p-4 text-center text-red-600">{error}</p>
  }

  if (!equipoPokemon) {
    return <p className="p-4 text-center text-red-600">No se encontró el Pokémon.</p>
  }

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-center mb-4">
        Personalizando Pokémon ID #{equipoPokemon.pokemonId}
      </h1>

      <PokemonSelector
        selectedPokemon={equipoPokemon.pokemon}
        onChange={handlePokemonChange}
      />

      <MoveSelector
        equipoPokemon={equipoPokemon}
        onChange={handleMovimientosChange}
      />

      <EVIVEditor
        equipoPokemon={equipoPokemon}
        onChange={handleEVIVChange}
      />

      {equipoPokemon.statsFinales ? (
        <StatsDisplay equipoPokemon={equipoPokemon} />
      ) : (
        <p className="text-center text-gray-500 italic">⚠️ Stats no disponibles aún.</p>
      )}

      <div className="flex justify-center">
        <button
          onClick={handleSave}
          disabled={saving}
          className={`bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 transition ${saving ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {saving ? 'Guardando...' : 'Guardar cambios'}
        </button>
      </div>
    </div>
  )
}

export default PokemonConfigPage
