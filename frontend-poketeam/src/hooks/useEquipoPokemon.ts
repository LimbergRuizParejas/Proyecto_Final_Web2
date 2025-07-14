import { useEffect, useState } from 'react'
import { getEquipoPokemonById } from '../api/equipoPokemon.api'
import type { EquipoPokemon } from '../types/equipoPokemon.types'

export const useEquipoPokemon = (pokemonId: number) => {
  const [equipoPokemon, setEquipoPokemon] = useState<EquipoPokemon | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchEquipoPokemon = async () => {
      try {
        setLoading(true)
        // Llamamos a la API para obtener el Pokémon, asumimos que la respuesta es directamente un EquipoPokemon
        const res = await getEquipoPokemonById(pokemonId)
        console.log('✅ EquipoPokemon cargado:', res)

        // Establecemos el estado con los datos del Pokémon
        setEquipoPokemon(res) 
      } catch (err) {
        console.error('❌ Error al cargar EquipoPokemon:', err)
        setEquipoPokemon(null) // En caso de error, dejamos el estado como null
      } finally {
        setLoading(false) // Finalizamos el estado de carga
      }
    }

    fetchEquipoPokemon() // Llamamos a la función para obtener los datos
  }, [pokemonId]) // El efecto se vuelve a ejecutar solo cuando cambie pokemonId

  return { equipoPokemon, loading } // Retornamos el estado y el estado de carga
}
