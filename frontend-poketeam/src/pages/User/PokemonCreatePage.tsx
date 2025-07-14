import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getAllPokemon } from '../../api/pokemon.api'
import { getItems } from '../../api/item.api'
import { addPokemonToEquipo, getTeamPokemons } from '../../api/equipoPokemon.api'
import PokemonForm from '../../components/Pokemon/PokemonForm'
import type { Pokemon } from '../../types/pokemon.types'
import type { Item } from '../../types/item.types'
import type { Movimiento } from '../../types/movimiento.types'
import type { EquipoPokemonFormData } from '../../components/Pokemon/PokemonForm'
import type { EquipoPokemonInput, EquipoPokemon } from '../../types/equipoPokemon.types'

const PokemonCreatePage = () => {
  const { teamId } = useParams<{ teamId: string }>()
  const navigate = useNavigate()

  const [pokemonList, setPokemonList] = useState<Pokemon[]>([])
  const [itemList, setItemList] = useState<Item[]>([])
  const [teamPokemons, setTeamPokemons] = useState<EquipoPokemon[]>([]) // Mantén el tipo EquipoPokemon
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string>('')

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError('')
      try {
        const [pokemonRes, itemRes, teamRes] = await Promise.all([
          getAllPokemon(),
          getItems(),
          getTeamPokemons(Number(teamId)) // Obtiene los Pokémon del equipo
        ])
        setPokemonList(pokemonRes)
        setItemList(itemRes)
        setTeamPokemons(teamRes) // Guarda los Pokémon actuales del equipo
      } catch (err) {
        console.error('❌ Error al cargar datos:', err)
        setError('No se pudieron cargar los datos. Intenta más tarde.')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [teamId])

  // Convertir los Pokémon de EquipoPokemon a Pokémon para mostrar
  const teamPokemonsAsPokemon = teamPokemons.map((ep) => ({
    id: ep.pokemon.id,
    nombre: ep.pokemon.nombre,
    tipo1: ep.pokemon.tipo1,
    tipo2: ep.pokemon.tipo2,
    habilidades: ep.pokemon.habilidades,
    imagen: ep.pokemon.imagen,
    movimientos: ep.pokemon.movimientos,
    stats: ep.pokemon.stats,
    createdAt: ep.pokemon.createdAt,
    updatedAt: ep.pokemon.updatedAt,
  })) as Pokemon[]

  // Validación: el equipo puede tener entre 1 y 6 Pokémon
  const isMaxPokemonReached = teamPokemonsAsPokemon.length >= 6

  const handleSubmit = async (data: EquipoPokemonFormData) => {
    if (!teamId) {
      alert('ID del equipo no proporcionado.')
      return
    }

    // Validar si el equipo ya tiene 6 Pokémon
    if (isMaxPokemonReached) {
      alert('El equipo ya tiene 6 Pokémon. No puedes agregar más.')
      return
    }

    // Convertimos string[] a Movimiento[]
    const movimientosInput: Movimiento[] = data.movimientos.map((nombre) => ({
      id: 0,
      nombre,
      tipo: '',
      categoria: 'estado',
      poder: null,
      precision: null,
      pp: 0,
      descripcion: '',
      createdAt: '',
      updatedAt: '',
    }))

    const payload: EquipoPokemonInput = {
      pokemonId: data.pokemonId,
      itemId: data.itemId || 0,
      habilidad: data.habilidad || '',
      naturaleza: data.naturaleza,
      apodo: data.apodo,
      movimientos: movimientosInput,
      evs: {
        hp: data.evHp,
        atk: data.evAtk,
        def: data.evDef,
        spa: data.evSpa,
        spd: data.evSpd,
        spe: data.evSpe,
      },
      ivs: {
        hp: data.ivHp,
        atk: data.ivAtk,
        def: data.ivDef,
        spa: data.ivSpa,
        spd: data.ivSpd,
        spe: data.ivSpe,
      },
    }

    setSaving(true)
    try {
      await addPokemonToEquipo(Number(teamId), payload)
      alert('✅ Pokémon agregado al equipo con éxito.')
      navigate(`/team/${teamId}`)
    } catch (err) {
      console.error('❌ Error al agregar Pokémon:', err)
      alert('Ocurrió un error al agregar el Pokémon al equipo.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <p className="p-6 text-center">🔄 Cargando datos...</p>
  }

  if (error) {
    return <p className="p-6 text-center text-red-600">{error}</p>
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">Agregar Pokémon al equipo</h1>

      {/* Validación del máximo de Pokémon */}
      {isMaxPokemonReached && (
        <p className="text-red-600 mb-4 text-center">
          El equipo ya tiene el máximo de Pokémon (6). No se pueden agregar más.
        </p>
      )}

      <PokemonForm
        onSubmit={handleSubmit}
        pokemonList={pokemonList}
        itemList={itemList}
        loading={saving}
        maxPokemonReached={isMaxPokemonReached}
      />
    </div>
  )
}

export default PokemonCreatePage
