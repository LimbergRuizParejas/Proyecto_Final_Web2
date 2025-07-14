import { useEffect, useState } from 'react'
import { getAllPokemon } from '../api/pokemon.api'
import type { Pokemon } from '../types/pokemon.types'

export const usePokemon = () => {
  const [pokemones, setPokemones] = useState<Pokemon[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
       
        const res = await getAllPokemon()

        console.log('[usePokemon] API response:', res) 

        
        setPokemones(res) 
      } catch (err) {
        console.error('Error al obtener Pokémon:', err)
        setPokemones([]) // Establecemos una lista vacía si ocurre un error
      } finally {
        setLoading(false)
      }
    }

    fetchPokemon()
  }, [])

  return { pokemones, loading }
}
